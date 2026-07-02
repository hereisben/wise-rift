import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import {
  DraftStatus,
  GameRole,
  RecommendationType,
  TeamSide,
} from '../generated/prisma/enums.js';
import { RecommendationsService } from '../recommendations/recommendations.service.js';
import { AddDraftBanDto } from './dto/add-draft-ban.dto.js';
import { AddDraftPickDto } from './dto/add-draft-pick.dto.js';
import { CreateDraftSessionDto } from './dto/create-draft-session.dto.js';

const DEV_USER_EMAIL = `dev@wise-rift.local`;

@Injectable()
export class DraftSessionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recommendationsService: RecommendationsService,
  ) {}

  async create(createDraftSessionDto: CreateDraftSessionDto) {
    if (createDraftSessionDto.role === GameRole.UNKNOWN) {
      throw new BadRequestException(`Draft session role cannot be UNKNOWN`);
    }

    const devUser = await this.findDevUser();

    const activePatch = await this.prisma.patch.findFirst({
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
      ? await this.prisma.champion.findFirst({
          where: {
            deletedAt: null,
            key: intendedChampionKey,
          },
        })
      : null;

    if (intendedChampionKey && !intendedChampion) {
      throw new NotFoundException(`Champion not found: ${intendedChampionKey}`);
    }

    return this.prisma.draftSession.create({
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

  async findAll() {
    const devUser = await this.findDevUser();

    return this.prisma.draftSession.findMany({
      where: {
        deletedAt: null,
        userId: devUser.id,
        status: {
          not: DraftStatus.DELETED,
        },
      },
      include: this.getDraftSessionInclude(),
      orderBy: {
        createdAt: `desc`,
      },
    });
  }

  async findOne(id: string) {
    const devUser = await this.findDevUser();

    const draftSession = await this.prisma.draftSession.findFirst({
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
    const devUser = await this.findDevUser();

    const draftSession = await this.prisma.draftSession.findFirst({
      where: {
        deletedAt: null,
        id,
        userId: devUser.id,
        status: {
          not: DraftStatus.DELETED,
        },
      },
    });

    if (!draftSession) {
      throw new NotFoundException(`Draft session not found`);
    }

    const championKey = addDraftBanDto.championKey.trim().toLowerCase();

    const champion = await this.prisma.champion.findFirst({
      where: {
        deletedAt: null,
        key: championKey,
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion not found: ${championKey}`);
    }

    await this.prisma.draftBan.upsert({
      where: {
        draftSessionId_championId: {
          draftSessionId: id,
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
        draftSessionId: id,
        userId: devUser.id,
        championId: champion.id,
        teamSide: addDraftBanDto.teamSide,
        orderIndex: addDraftBanDto.orderIndex ?? null,
        reason: addDraftBanDto.reason?.trim() || null,
      },
    });

    return this.findOne(id);
  }

  async addPick(id: string, addDraftPickDto: AddDraftPickDto) {
    const devUser = await this.findDevUser();

    const draftSession = await this.prisma.draftSession.findFirst({
      where: {
        id,
        userId: devUser.id,
        deletedAt: null,
        status: {
          not: DraftStatus.DELETED,
        },
      },
    });

    if (!draftSession) {
      throw new NotFoundException(`Draft session not found`);
    }

    const championKey = addDraftPickDto.championKey.trim().toLowerCase();

    const champion = await this.prisma.champion.findFirst({
      where: {
        deletedAt: null,
        key: championKey,
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion not found: ${championKey}`);
    }

    const existingBan = await this.prisma.draftBan.findFirst({
      where: {
        draftSessionId: id,
        championId: champion.id,
        deletedAt: null,
      },
    });

    if (existingBan) {
      throw new BadRequestException(
        `Champion is already banned: ${championKey}`,
      );
    }

    await this.prisma.draftPick.upsert({
      where: {
        draftSessionId_championId: {
          draftSessionId: id,
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
        draftSessionId: id,
        userId: devUser.id,
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

    const savedRecommendation = await this.prisma.recommendationResult.create({
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

  private async findDevUser() {
    const devUser = await this.prisma.user.findFirst({
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
    } as const;
  }
}
