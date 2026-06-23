import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { ConfidenceLevel, GameRole } from '../generated/prisma/enums.js';
import {
  CreateDraftRecommendationDto,
  DraftChampionPickDto,
} from './dto/create-draft-recommendation.dto.js';
import {
  ChampionBuildProfileForDraft,
  ChampionMatchupProfileForDraft,
  ChampionSynergyProfileForDraft,
  ChampionWithActivePatchProfiles,
  DraftChampionContext,
  NormalizedDraftChampionPick,
} from './types/draft-recommendation-champion.type.js';

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function normalizeDraftPicks(
  picks: DraftChampionPickDto[] | undefined,
): NormalizedDraftChampionPick[] {
  return (picks ?? [])
    .filter((pick) => pick.championKey.trim().length > 0)
    .map((pick) => ({
      championKey: pick.championKey.trim(),
      role: pick.role ?? GameRole.UNKNOWN,
    }));
}

function findChampionBuildProfileWithRole(
  champion: ChampionWithActivePatchProfiles,
  role: GameRole,
): ChampionBuildProfileForDraft | null {
  if (role === GameRole.UNKNOWN) {
    return null;
  }

  return (
    champion.championBuildProfiles.find((profile) => profile.role === role) ??
    null
  );
}

function findChampionMatchupProfileWithRole(
  champion: ChampionWithActivePatchProfiles,
  role: GameRole,
): ChampionMatchupProfileForDraft | null {
  if (role === GameRole.UNKNOWN) {
    return null;
  }

  return (
    champion.championMatchupProfiles.find((profile) => profile.role === role) ??
    null
  );
}

function findChampionSynergyProfileWithRole(
  champion: ChampionWithActivePatchProfiles,
  role: GameRole,
): ChampionSynergyProfileForDraft | null {
  if (role === GameRole.UNKNOWN) {
    return null;
  }

  return (
    champion.championSynergyProfiles.find((profile) => profile.role === role) ??
    null
  );
}

function buildDraftChampionContext(
  pick: NormalizedDraftChampionPick,
  champion: ChampionWithActivePatchProfiles,
): DraftChampionContext {
  return {
    pick,
    champion,
    championBuildProfile: findChampionBuildProfileWithRole(champion, pick.role),
    championMatchupProfile: findChampionMatchupProfileWithRole(
      champion,
      pick.role,
    ),
    championSynergyProfile: findChampionSynergyProfileWithRole(
      champion,
      pick.role,
    ),
  };
}

@Injectable()
export class RecommendationsService {
  constructor(private readonly prismaService: PrismaService) {}

  getHealthCheck() {
    return {
      module: `recommendations`,
      status: `ok`,
    };
  }

  async createDraftRecommendation(
    createDraftRecommendationDto: CreateDraftRecommendationDto,
  ) {
    const activePatch = await this.prismaService.patch.findFirst({
      where: {
        deletedAt: null,
        isActive: true,
      },
    });

    if (!activePatch) {
      throw new NotFoundException(`Active patch not found`);
    }

    const intendedChampionKey =
      createDraftRecommendationDto.intendedChampionKey?.trim() || null;

    const allyPicks = normalizeDraftPicks(
      createDraftRecommendationDto.allyPicks,
    );

    const enemyPicks = normalizeDraftPicks(
      createDraftRecommendationDto.enemyPicks,
    );

    const bannedChampionKeys = [
      ...new Set(
        (createDraftRecommendationDto.bannedChampionKeys ?? [])
          .map((key) => key.trim())
          .filter((key) => key.length > 0),
      ),
    ];

    const role = createDraftRecommendationDto.role;

    const championKeys = [
      intendedChampionKey,
      ...allyPicks.map((pick) => pick.championKey),
      ...enemyPicks.map((pick) => pick.championKey),
      ...bannedChampionKeys,
    ].filter(isDefined);

    const uniqueChampionKeys = [...new Set(championKeys)];

    const champions = await this.prismaService.champion.findMany({
      where: {
        key: {
          in: uniqueChampionKeys,
        },
        deletedAt: null,
      },
      include: {
        championBuildProfiles: {
          where: {
            patchId: activePatch.id,
            deletedAt: null,
          },
        },
        championMatchupProfiles: {
          where: {
            patchId: activePatch.id,
            deletedAt: null,
          },
        },
        championSynergyProfiles: {
          where: {
            patchId: activePatch.id,
            deletedAt: null,
          },
        },
      },
    });

    const championsByKey = new Map(
      champions.map((champion) => [champion.key, champion] as const),
    );

    const intendedChampion = intendedChampionKey
      ? (championsByKey.get(intendedChampionKey) ?? null)
      : null;

    const allyChampions = allyPicks
      .map((pick) => championsByKey.get(pick.championKey))
      .filter(isDefined);

    const enemyChampions = enemyPicks
      .map((pick) => championsByKey.get(pick.championKey))
      .filter(isDefined);

    const bannedChampions = bannedChampionKeys
      .map((championKey) => championsByKey.get(championKey))
      .filter(isDefined);

    const intendedChampionContext =
      intendedChampion && intendedChampionKey
        ? buildDraftChampionContext(
            { championKey: intendedChampionKey, role },
            intendedChampion,
          )
        : null;

    const allyChampionContexts = allyPicks
      .map((pick) => {
        const champion = championsByKey.get(pick.championKey);

        if (!champion) {
          return null;
        }

        return buildDraftChampionContext(pick, champion);
      })
      .filter(isDefined);

    const enemyChampionContexts = enemyPicks
      .map((pick) => {
        const champion = championsByKey.get(pick.championKey);

        if (!champion) {
          return null;
        }

        return buildDraftChampionContext(pick, champion);
      })
      .filter(isDefined);

    return {
      inputSnapshot: {
        role,
        intendedChampionKey,
        allyPicks,
        enemyPicks,
        bannedChampionKeys,
      },
      draftContext: {
        patch: {
          id: activePatch.id,
          version: activePatch.version,
          name: activePatch.name,
          isActive: activePatch.isActive,
        },
        role,
        intendedChampion,
        intendedChampionContext,
        allyPicks,
        allyChampionContexts,
        allyChampions,
        enemyChampions,
        enemyPicks,
        enemyChampionContexts,
        bannedChampions,
      },
      resultItems: [],
      scoreBreakdown: null,
      reasonCodes: [],
      confidence: ConfidenceLevel.UNKNOWN,
    };
  }
}
