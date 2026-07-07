import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import {
  DraftPhase,
  DraftStatus,
  GameRole,
  MatchResult,
  RecommendationType,
  TeamSide,
} from '../generated/prisma/enums.js';
import { RecommendationsService } from '../recommendations/recommendations.service.js';
import { AddDraftBanDto } from './dto/add-draft-ban.dto.js';
import { AddDraftPickDto } from './dto/add-draft-pick.dto.js';
import { CreateDraftSessionDto } from './dto/create-draft-session.dto.js';
import { FindDraftSessionsQueryDto } from './dto/find-draft-sessions-query.dto.js';
import { SaveDraftReviewDto } from './dto/save-draft-review.dto.js';
import { SaveMatchOutcomeDto } from './dto/save-match-outcome.dto.js';

const DEV_USER_EMAIL = `dev@wise-rift.local`;

@Injectable()
export class DraftSessionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly recommendationsService: RecommendationsService,
  ) {}

  async create(createDraftSessionDto: CreateDraftSessionDto) {
    if (createDraftSessionDto.role === GameRole.UNKNOWN) {
      throw new BadRequestException(`Draft session role cannot be UNKNOWN`);
    }

    const devUser = await this.findDevUser();

    const activePatch = await this.prismaService.patch.findFirst({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: {
        releasedAt: `desc`,
      },
    });

    if (!activePatch) {
      throw new NotFoundException(`Active patch not found`);
    }

    const intendedChampionKey =
      createDraftSessionDto.intendedChampionKey?.trim().toLowerCase() ?? null;

    const intendedChampion = intendedChampionKey
      ? await this.prismaService.champion.findFirst({
          where: {
            deletedAt: null,
            key: intendedChampionKey,
          },
        })
      : null;

    if (intendedChampionKey && !intendedChampion) {
      throw new NotFoundException(`Champion not found: ${intendedChampionKey}`);
    }

    return this.prismaService.draftSession.create({
      data: {
        userId: devUser.id,
        patchId: activePatch.id,
        role: createDraftSessionDto.role,
        intendedChampionId: intendedChampion?.id ?? null,
        queueType: createDraftSessionDto.queueType ?? null,
        notes: createDraftSessionDto.notes?.trim() || null,
      },
      include: this.getDraftSessionInclude(),
    });
  }

  async findAll(query: FindDraftSessionsQueryDto) {
    if (query.status === DraftStatus.DELETED) {
      throw new BadRequestException(`Cannot query deleted draft session`);
    }

    const devUser = await this.findDevUser();

    return this.prismaService.draftSession.findMany({
      where: {
        deletedAt: null,
        userId: devUser.id,
        status: query.status ?? {
          notIn: [DraftStatus.DELETED, DraftStatus.ARCHIVED],
        },
        role: query.role,
      },
      take: query.limit ?? 20,
      include: this.getDraftSessionInclude(),
      orderBy: {
        createdAt: `desc`,
      },
    });
  }

  async findOne(id: string) {
    const devUser = await this.findDevUser();

    const draftSession = await this.prismaService.draftSession.findFirst({
      where: {
        id,
        userId: devUser.id,
        deletedAt: null,
        status: {
          not: DraftStatus.DELETED,
        },
      },
      include: this.getDraftSessionInclude(),
    });

    if (!draftSession) {
      throw new NotFoundException(`Draft session not found`);
    }

    return draftSession;
  }

  async addBan(id: string, addDraftBanDto: AddDraftBanDto) {
    const draftSession = await this.findOne(id);

    this.ensureDraftSessionEditable(draftSession);

    const championKey = addDraftBanDto.championKey.trim().toLowerCase();

    const champion = await this.prismaService.champion.findFirst({
      where: {
        deletedAt: null,
        key: championKey,
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion not found: ${championKey}`);
    }

    await this.prismaService.draftBan.upsert({
      where: {
        draftSessionId_championId: {
          draftSessionId: draftSession.id,
          championId: champion.id,
        },
      },
      update: {
        teamSide: addDraftBanDto.teamSide,
        orderIndex: addDraftBanDto.orderIndex ?? null,
        reason: addDraftBanDto.reason?.trim() || null,
        deletedAt: null,
      },
      create: {
        draftSessionId: draftSession.id,
        userId: draftSession.userId,
        championId: champion.id,
        teamSide: addDraftBanDto.teamSide,
        orderIndex: addDraftBanDto.orderIndex ?? null,
        reason: addDraftBanDto.reason?.trim() || null,
      },
    });

    return this.findOne(id);
  }

  async addPick(id: string, addDraftPickDto: AddDraftPickDto) {
    const draftSession = await this.findOne(id);

    this.ensureDraftSessionEditable(draftSession);

    const championKey = addDraftPickDto.championKey.trim().toLowerCase();

    const champion = await this.prismaService.champion.findFirst({
      where: {
        deletedAt: null,
        key: championKey,
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion not found: ${championKey}`);
    }

    const existingBan = await this.prismaService.draftBan.findFirst({
      where: {
        draftSessionId: draftSession.id,
        championId: champion.id,
        deletedAt: null,
      },
    });

    if (existingBan) {
      throw new BadRequestException(
        `Champion is already banned: ${championKey}`,
      );
    }

    await this.prismaService.draftPick.upsert({
      where: {
        draftSessionId_championId: {
          draftSessionId: draftSession.id,
          championId: champion.id,
        },
      },
      update: {
        teamSide: addDraftPickDto.teamSide,
        role: addDraftPickDto.role ?? null,
        playerSlot: addDraftPickDto.playerSlot ?? null,
        orderIndex: addDraftPickDto.orderIndex ?? null,
        isUserPick: addDraftPickDto.isUserPick ?? null,
        deletedAt: null,
      },
      create: {
        draftSessionId: draftSession.id,
        userId: draftSession.userId,
        championId: champion.id,
        teamSide: addDraftPickDto.teamSide,
        role: addDraftPickDto.role ?? null,
        playerSlot: addDraftPickDto.playerSlot ?? null,
        orderIndex: addDraftPickDto.orderIndex ?? null,
        isUserPick: addDraftPickDto.isUserPick ?? null,
      },
    });

    return this.findOne(id);
  }

  async createDraftSessionRecommendation(id: string) {
    const draftSession = await this.findOne(id);

    this.ensureDraftSessionEditable(draftSession);

    const allyPicks = draftSession.draftPicks
      .filter((pick) => pick.teamSide === TeamSide.MY_TEAM)
      .map((pick) => ({
        championKey: pick.champion.key,
        role: pick.role ?? GameRole.UNKNOWN,
      }));

    const enemyPicks = draftSession.draftPicks
      .filter((pick) => pick.teamSide === TeamSide.ENEMY)
      .map((pick) => ({
        championKey: pick.champion.key,
        role: pick.role ?? GameRole.UNKNOWN,
      }));

    const bannedChampionKeys = draftSession.draftBans.map(
      (ban) => ban.champion.key,
    );

    const recommendation =
      await this.recommendationsService.createDraftRecommendation(
        {
          role: draftSession.role,
          intendedChampionKey: draftSession.intendedChampion?.key ?? undefined,
          allyPicks,
          enemyPicks,
          bannedChampionKeys,
        },
        draftSession.patchId,
      );

    const savedRecommendation =
      await this.prismaService.recommendationResult.create({
        data: {
          draftSessionId: draftSession.id,
          userId: draftSession.userId,
          patchId: draftSession.patchId,
          type: RecommendationType.PICK,
          inputSnapshot: recommendation.inputSnapshot,
          resultItems: recommendation.resultItems,
          scoreBreakdown: recommendation.scoreBreakdown,
          reasonCodes: recommendation.reasonCodes,
          confidence: recommendation.confidence,
          aiExplanationId: null,
        },
      });

    return {
      recommendationResult: savedRecommendation,
      recommendation,
    };
  }

  async findDraftRecommendationResults(draftSessionId: string) {
    const devUser = await this.findDevUser();

    const draftSession = await this.prismaService.draftSession.findFirst({
      where: {
        deletedAt: null,
        id: draftSessionId,
        userId: devUser.id,
        status: {
          not: DraftStatus.DELETED,
        },
      },
      select: {
        id: true,
      },
    });

    if (!draftSession) {
      throw new NotFoundException(`Draft session not found`);
    }

    return this.prismaService.recommendationResult.findMany({
      where: {
        deletedAt: null,
        draftSessionId: draftSession.id,
      },
      orderBy: {
        createdAt: `desc`,
      },
    });
  }

  async saveMatchOutcome(
    draftSessionId: string,
    saveMatchOutcomeDto: SaveMatchOutcomeDto,
  ) {
    const draftSession = await this.findOne(draftSessionId);

    this.ensureDraftSessionEditable(draftSession);

    const myChampionKey = saveMatchOutcomeDto.myChampionKey
      .trim()
      .toLowerCase();

    const champion = await this.prismaService.champion.findFirst({
      where: {
        deletedAt: null,
        key: myChampionKey,
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion not found: ${myChampionKey}`);
    }

    const matchOutcome = await this.prismaService.matchOutcome.upsert({
      where: {
        draftSessionId: draftSession.id,
      },
      update: {
        result: saveMatchOutcomeDto.result ?? MatchResult.UNKNOWN,
        myChampionId: champion.id,
        kills: saveMatchOutcomeDto.kills ?? null,
        deaths: saveMatchOutcomeDto.deaths ?? null,
        assists: saveMatchOutcomeDto.assists ?? null,
        notes: saveMatchOutcomeDto.notes?.trim() || null,
        deletedAt: null,
      },
      create: {
        draftSessionId: draftSession.id,
        userId: draftSession.userId,
        result: saveMatchOutcomeDto.result ?? MatchResult.UNKNOWN,
        myChampionId: champion.id,
        kills: saveMatchOutcomeDto.kills ?? null,
        deaths: saveMatchOutcomeDto.deaths ?? null,
        assists: saveMatchOutcomeDto.assists ?? null,
        notes: saveMatchOutcomeDto.notes?.trim() || null,
      },
    });

    return matchOutcome;
  }

  async getMatchOutcome(draftSessionId: string) {
    const draftSession = await this.findOne(draftSessionId);

    const matchOutcome = await this.prismaService.matchOutcome.findFirst({
      where: {
        deletedAt: null,
        draftSessionId: draftSession.id,
      },
      include: {
        myChampion: true,
      },
    });

    return matchOutcome;
  }

  async saveDraftSessionReview(
    draftSessionId: string,
    saveDraftReviewDto: SaveDraftReviewDto,
  ) {
    const draftSession = await this.findOne(draftSessionId);

    this.ensureDraftSessionEditable(draftSession);

    const summary: Prisma.InputJsonObject = {
      result: saveDraftReviewDto.summary.result,
      role: saveDraftReviewDto.summary.role,
      intendedChampionKey:
        saveDraftReviewDto.summary.intendedChampionKey || null,
      playedChampionKey: saveDraftReviewDto.summary.playedChampionKey || null,
      totalRecommendations: saveDraftReviewDto.summary.totalRecommendations,
      latestRecommendationId:
        saveDraftReviewDto.summary.latestRecommendationId || null,
      draftScore: saveDraftReviewDto.summary.draftScore,
      outcomeScore: saveDraftReviewDto.summary.outcomeScore,
      overallScore: saveDraftReviewDto.summary.overallScore,
      verdict: saveDraftReviewDto.summary.verdict,
      confidence: saveDraftReviewDto.summary.confidence,
      reasonCodes: saveDraftReviewDto.summary.reasonCodes,
    };

    const whatWentWell = saveDraftReviewDto.whatWentWell
      ? {
          items: saveDraftReviewDto.whatWentWell.items.map((item) => ({
            code: item.code,
            title: item.title,
            description: item.description,
            relatedChampionKeys: item.relatedChampionKeys,
            relatedTagKeys: item.relatedTagKeys,
            impact: item.impact,
          })),
        }
      : Prisma.DbNull;

    const whatToImprove = saveDraftReviewDto.whatToImprove
      ? {
          items: saveDraftReviewDto.whatToImprove.items.map((item) => ({
            code: item.code,
            title: item.title,
            description: item.description,
            suggestedAction: item.suggestedAction,
            relatedChampionKeys: item.relatedChampionKeys,
            relatedTagKeys: item.relatedTagKeys,
            priority: item.priority,
          })),
        }
      : Prisma.DbNull;

    const recommendationAccuracy = saveDraftReviewDto.recommendationAccuracy
      ? {
          latestRecommendationId:
            saveDraftReviewDto.recommendationAccuracy.latestRecommendationId ||
            null,
          recommendedChampionKey:
            saveDraftReviewDto.recommendationAccuracy.recommendedChampionKey ||
            null,
          playedChampionKey:
            saveDraftReviewDto.recommendationAccuracy.playedChampionKey || null,
          followedRecommendation:
            saveDraftReviewDto.recommendationAccuracy.followedRecommendation ??
            null,
          recommendedChampionRank:
            saveDraftReviewDto.recommendationAccuracy.recommendedChampionRank ??
            null,
          recommendedChampionScore:
            saveDraftReviewDto.recommendationAccuracy
              .recommendedChampionScore ?? null,
          playedChampionRank:
            saveDraftReviewDto.recommendationAccuracy.playedChampionRank ??
            null,
          playedChampionScore:
            saveDraftReviewDto.recommendationAccuracy.playedChampionScore ??
            null,
          accuracyScore:
            saveDraftReviewDto.recommendationAccuracy.accuracyScore,
          confidence: saveDraftReviewDto.recommendationAccuracy.confidence,
          reasonCodes: saveDraftReviewDto.recommendationAccuracy.reasonCodes,
          notes: saveDraftReviewDto.recommendationAccuracy.notes || null,
        }
      : Prisma.DbNull;

    const draftReview = await this.prismaService.draftReview.upsert({
      where: {
        draftSessionId: draftSession.id,
      },
      update: {
        summary,
        whatWentWell,
        whatToImprove,
        recommendationAccuracy,
        aiSummary: saveDraftReviewDto.aiSummary || null,
        deletedAt: null,
      },
      create: {
        draftSessionId: draftSession.id,
        userId: draftSession.userId,
        summary,
        whatWentWell,
        whatToImprove,
        recommendationAccuracy,
        aiSummary: saveDraftReviewDto.aiSummary || null,
      },
    });

    return draftReview;
  }

  async getDraftSessionReview(draftSessionId: string) {
    const draftSession = await this.findOne(draftSessionId);

    const draftReview = await this.prismaService.draftReview.findFirst({
      where: {
        deletedAt: null,
        draftSessionId: draftSession.id,
      },
    });

    if (!draftReview) {
      throw new NotFoundException(`Draft review not found`);
    }

    return draftReview;
  }

  async completeDraftSession(draftSessionId: string) {
    const draftSession = await this.findOne(draftSessionId);

    if (draftSession.status === DraftStatus.ARCHIVED) {
      throw new BadRequestException(`Draft session archived`);
    }

    if (draftSession.status === DraftStatus.COMPLETED) {
      return draftSession;
    }

    const matchOutcome = await this.prismaService.matchOutcome.findFirst({
      where: {
        draftSessionId: draftSession.id,
        deletedAt: null,
      },
    });

    if (!matchOutcome) {
      throw new BadRequestException(`Draft session match outcome not found`);
    }

    return this.prismaService.draftSession.update({
      where: {
        id: draftSession.id,
      },
      data: {
        phase: DraftPhase.COMPLETED,
        status: DraftStatus.COMPLETED,
        completedAt: new Date(),
      },
      include: this.getDraftSessionInclude(),
    });
  }

  async archiveDraftSession(draftSessionId: string) {
    const draftSession = await this.findOne(draftSessionId);

    if (draftSession.status === DraftStatus.ARCHIVED) {
      return draftSession;
    }

    return this.prismaService.draftSession.update({
      where: {
        id: draftSession.id,
      },
      data: {
        phase: DraftPhase.ARCHIVED,
        status: DraftStatus.ARCHIVED,
        archivedAt: new Date(),
      },
      include: this.getDraftSessionInclude(),
    });
  }

  async restoreArchivedDraftSession(draftSessionId: string) {
    const draftSession = await this.findOne(draftSessionId);

    if (draftSession.status !== DraftStatus.ARCHIVED) {
      return draftSession;
    }

    const restoredPhase = draftSession.completedAt
      ? DraftPhase.COMPLETED
      : DraftPhase.SETUP;

    const restoredStatus = draftSession.completedAt
      ? DraftStatus.COMPLETED
      : DraftStatus.ACTIVE;

    return this.prismaService.draftSession.update({
      where: {
        id: draftSession.id,
      },
      data: {
        phase: restoredPhase,
        status: restoredStatus,
        archivedAt: null,
      },
      include: this.getDraftSessionInclude(),
    });
  }

  private async findDevUser() {
    const devUser = await this.prismaService.user.findFirst({
      where: {
        deletedAt: null,
        email: DEV_USER_EMAIL,
      },
    });

    if (!devUser) {
      throw new NotFoundException(`Dev user not found`);
    }

    return devUser;
  }

  private getDraftSessionInclude() {
    return {
      user: true,
      patch: true,
      intendedChampion: true,
      draftBans: {
        where: {
          deletedAt: null,
        },
        include: {
          champion: true,
        },
        orderBy: {
          orderIndex: `asc`,
        },
      },
      draftPicks: {
        where: {
          deletedAt: null,
        },
        include: {
          champion: true,
        },
        orderBy: {
          orderIndex: `asc`,
        },
      },
      recommendationResults: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: `desc`,
        },
      },
      matchOutcome: {
        include: {
          myChampion: true,
        },
      },
      draftReview: true,
    } as const;
  }

  private ensureDraftSessionEditable(draftSession: { status: DraftStatus }) {
    if (draftSession.status === DraftStatus.COMPLETED) {
      throw new BadRequestException(`Draft session completed`);
    }

    if (draftSession.status === DraftStatus.ARCHIVED) {
      throw new BadRequestException(`Draft session archived`);
    }
  }
}
