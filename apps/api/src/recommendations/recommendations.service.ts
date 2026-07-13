import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChampionPoolService } from '../champion-pool/champion-pool.service.js';
import {
  ChampionBuildProfileForDraft,
  ChampionMatchupProfileForDraft,
  ChampionSynergyProfileForDraft,
  ChampionWithActivePatchProfiles,
  DraftChampionContext,
  NormalizedDraftChampionPick,
} from '../common/types/draft-recommendation-champion.type.js';
import { DraftRecommendationResponse } from '../common/types/draft-recommendation-response.type.js';
import { isDefined } from '../common/utils/is-defined.util.js';
import { PrismaService } from '../database/prisma.service.js';
import { GameRole } from '../generated/prisma/enums.js';
import {
  CreateDraftRecommendationDto,
  DraftChampionPickDto,
} from './dto/create-draft-recommendation.dto.js';
import { DraftRecommendationScoringService } from './scoring/draft-recommendation-scoring.service.js';

function normalizeDraftPicks(
  picks: DraftChampionPickDto[] | undefined,
): NormalizedDraftChampionPick[] {
  return (picks ?? [])
    .filter((pick) => pick.championKey.trim().length > 0)
    .map((pick) => ({
      championKey: pick.championKey.trim().toLowerCase(),
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
    selectedBuildProfile: findChampionBuildProfileWithRole(champion, pick.role),
    selectedMatchupProfile: findChampionMatchupProfileWithRole(
      champion,
      pick.role,
    ),
    selectedSynergyProfile: findChampionSynergyProfileWithRole(
      champion,
      pick.role,
    ),
  };
}

function findDuplicateValues(values: string[]): string[] {
  const seenValues = new Set<string>();
  const duplicateValues = new Set<string>();

  for (const value of values) {
    if (seenValues.has(value)) {
      duplicateValues.add(value);
      continue;
    }

    seenValues.add(value);
  }

  return [...duplicateValues];
}

function validateNoDuplicateValues(values: string[], label: string) {
  const duplicateValues = findDuplicateValues(values);

  if (duplicateValues.length > 0) {
    throw new BadRequestException(
      `${label} contains duplicate champion keys: ${duplicateValues.join(', ')}`,
    );
  }
}

function findOverlappingValues(
  firstValues: string[],
  secondValues: string[],
): string[] {
  const secondValueSet = new Set(secondValues);

  return firstValues.filter((value) => secondValueSet.has(value));
}

function validateNoOverlap(
  firstValues: string[],
  secondValues: string[],
  message: string,
) {
  const overlappingValues = findOverlappingValues(firstValues, secondValues);

  if (overlappingValues.length > 0) {
    throw new BadRequestException(
      `${message}: ${[...new Set(overlappingValues)].join(', ')}`,
    );
  }
}

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly draftRecommendationScoringService: DraftRecommendationScoringService,
    private readonly championPoolService: ChampionPoolService,
  ) {}

  getHealthCheck() {
    return {
      module: `recommendations`,
      status: `ok`,
    };
  }

  async createDraftRecommendation(
    createDraftRecommendationDto: CreateDraftRecommendationDto,
    patchId: string,
  ): Promise<DraftRecommendationResponse> {
    const patch = await this.prismaService.patch.findFirst({
      where: {
        deletedAt: null,
        id: patchId,
      },
    });

    if (!patch) {
      throw new NotFoundException(`Patch not found`);
    }

    const intendedChampionKey =
      createDraftRecommendationDto.intendedChampionKey?.trim().toLowerCase() ||
      null;

    const allyPicks = normalizeDraftPicks(
      createDraftRecommendationDto.allyPicks,
    );

    const allyChampionKeys = allyPicks.map((pick) => pick.championKey);

    validateNoDuplicateValues(allyChampionKeys, `Ally picks`);

    const enemyPicks = normalizeDraftPicks(
      createDraftRecommendationDto.enemyPicks,
    );

    const enemyChampionKeys = enemyPicks.map((pick) => pick.championKey);

    validateNoDuplicateValues(enemyChampionKeys, `Enemy picks`);

    const bannedChampionKeys = (
      createDraftRecommendationDto.bannedChampionKeys ?? []
    )
      .map((key) => key.trim().toLowerCase())
      .filter((key) => key.length > 0);

    validateNoDuplicateValues(bannedChampionKeys, `Banned champions`);

    validateNoOverlap(
      allyChampionKeys,
      enemyChampionKeys,
      `Champion cannot be picked by both teams`,
    );

    validateNoOverlap(
      allyChampionKeys,
      bannedChampionKeys,
      `Ally champion cannot be banned`,
    );

    validateNoOverlap(
      enemyChampionKeys,
      bannedChampionKeys,
      `Enemy champion cannot be banned`,
    );

    const reasonCodes: string[] = [];

    if (
      intendedChampionKey &&
      bannedChampionKeys.includes(intendedChampionKey)
    ) {
      reasonCodes.push(`INTENDED_CHAMPION_BANNED`);
    }

    if (
      intendedChampionKey &&
      enemyChampionKeys.includes(intendedChampionKey)
    ) {
      reasonCodes.push(`INTENDED_CHAMPION_PICKED_BY_ENEMY`);
    }

    const role = createDraftRecommendationDto.role;

    if (role === GameRole.UNKNOWN) {
      throw new BadRequestException(`Recommendation role cannot be UNKNOWN`);
    }

    const intendedChampionAllyPick = intendedChampionKey
      ? (allyPicks.find((pick) => pick.championKey === intendedChampionKey) ??
        null)
      : null;

    const isIntendedChampionPickedByDifferentAllyRole =
      intendedChampionAllyPick !== null &&
      intendedChampionAllyPick.role !== GameRole.UNKNOWN &&
      intendedChampionAllyPick.role !== role;

    if (isIntendedChampionPickedByDifferentAllyRole) {
      reasonCodes.push(`INTENDED_CHAMPION_PICKED_BY_ALLY`);
    }

    const isIntendedChampionUnavailable =
      intendedChampionKey !== null &&
      (bannedChampionKeys.includes(intendedChampionKey) ||
        enemyChampionKeys.includes(intendedChampionKey) ||
        isIntendedChampionPickedByDifferentAllyRole);

    const effectiveIntendedChampionKey = isIntendedChampionUnavailable
      ? null
      : intendedChampionKey;

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
            patchId: patch.id,
            deletedAt: null,
          },
        },
        championMatchupProfiles: {
          where: {
            patchId: patch.id,
            deletedAt: null,
          },
        },
        championSynergyProfiles: {
          where: {
            patchId: patch.id,
            deletedAt: null,
          },
        },
      },
    });

    const championsByKey = new Map(
      champions.map((champion) => [champion.key, champion] as const),
    );

    if (intendedChampionKey && !championsByKey.has(intendedChampionKey)) {
      throw new NotFoundException(`Champion not found: ${intendedChampionKey}`);
    }

    const allyChampions = allyPicks.map((pick) => {
      const champion = championsByKey.get(pick.championKey);

      if (!champion) {
        throw new NotFoundException(
          `Ally champion not found: ${pick.championKey}`,
        );
      }

      return champion;
    });

    const enemyChampions = enemyPicks.map((pick) => {
      const champion = championsByKey.get(pick.championKey);

      if (!champion) {
        throw new NotFoundException(
          `Enemy champion not found: ${pick.championKey}`,
        );
      }

      return champion;
    });

    for (const bannedChampionKey of bannedChampionKeys) {
      if (!championsByKey.has(bannedChampionKey)) {
        throw new NotFoundException(
          `Banned champion not found: ${bannedChampionKey}`,
        );
      }
    }

    const allyChampionContexts = allyPicks.map((pick, index) =>
      buildDraftChampionContext(pick, allyChampions[index]),
    );

    const enemyChampionContexts = enemyPicks.map((pick, index) =>
      buildDraftChampionContext(pick, enemyChampions[index]),
    );

    const candidateChampions = await this.prismaService.champion.findMany({
      where: {
        deletedAt: null,
        roles: {
          has: role,
        },
      },
      include: {
        championBuildProfiles: {
          where: {
            deletedAt: null,
            patchId: patch.id,
          },
        },
        championMatchupProfiles: {
          where: {
            deletedAt: null,
            patchId: patch.id,
          },
        },
        championSynergyProfiles: {
          where: {
            deletedAt: null,
            patchId: patch.id,
          },
        },
      },
    });

    const candidateContexts = candidateChampions.map((candidateChampion) =>
      buildDraftChampionContext(
        { championKey: candidateChampion.key, role },
        candidateChampion,
      ),
    );

    const championPool = await this.championPoolService.getMyChampionPool();

    const championPoolEntries =
      await this.prismaService.championPoolEntry.findMany({
        where: {
          deletedAt: null,
          championPoolId: championPool.id,
        },
        select: {
          championId: true,
          preferredRole: true,
          comfortLevel: true,
        },
      });

    const scoringResult =
      this.draftRecommendationScoringService.scoreDraftRecommendations({
        role,
        effectiveIntendedChampionKey,
        allyChampionKeys,
        enemyChampionKeys,
        bannedChampionKeys,
        allyChampionContexts,
        enemyChampionContexts,
        candidateContexts,
        championPoolEntries,
      });

    return {
      inputSnapshot: {
        role,
        intendedChampionKey,
        effectiveIntendedChampionKey,
        allyPicks,
        enemyPicks,
        bannedChampionKeys,
      },
      resultItems: scoringResult.resultItems,
      bestItem: scoringResult.bestItem,
      scoreBreakdown: scoringResult.scoreBreakdown,
      reasonCodes: [...reasonCodes, ...scoringResult.reasonCodes],
      confidence: scoringResult.confidence,
    };
  }
}
