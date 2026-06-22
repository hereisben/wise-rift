import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { ConfidenceLevel } from '../generated/prisma/enums.js';
import { CreateDraftRecommendationDto } from './dto/create-draft-recommendation.dto.js';

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
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
      createDraftRecommendationDto.intendedChampionKey ?? null;

    const allyChampionKeys =
      createDraftRecommendationDto.allyChampionKeys ?? [];

    const enemyChampionKeys =
      createDraftRecommendationDto.enemyChampionKeys ?? [];

    const bannedChampionKeys =
      createDraftRecommendationDto.bannedChampionKeys ?? [];

    const role = createDraftRecommendationDto.role;

    const championKeys = [
      intendedChampionKey,
      ...allyChampionKeys,
      ...enemyChampionKeys,
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
            role,
            patchId: activePatch.id,
            deletedAt: null,
          },
        },
        championMatchupProfiles: {
          where: {
            role,
            patchId: activePatch.id,
            deletedAt: null,
          },
        },
        championSynergyProfiles: {
          where: {
            role,
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

    const allyChampions = allyChampionKeys
      .map((championKey) => championsByKey.get(championKey))
      .filter(isDefined);

    const enemyChampions = enemyChampionKeys
      .map((championKey) => championsByKey.get(championKey))
      .filter(isDefined);

    const bannedChampions = bannedChampionKeys
      .map((championKey) => championsByKey.get(championKey))
      .filter(isDefined);

    return {
      inputSnapshot: createDraftRecommendationDto,
      draftContext: {
        patch: {
          id: activePatch.id,
          version: activePatch.version,
          name: activePatch.name,
          isActive: activePatch.isActive,
        },
        role,
        intendedChampion,
        allyChampions,
        enemyChampions,
        bannedChampions,
      },
      resultItems: [],
      scoreBreakdown: null,
      reasonCodes: [],
      confidence: ConfidenceLevel.UNKNOWN,
    };
  }
}
