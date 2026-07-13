import { DraftChampionContext } from '../../../common/types/draft-recommendation-champion.type.js';
import {
  DraftRecommendationChampionPoolEntry,
  DraftRecommendationContext,
} from '../../../common/types/draft-recommendation-scoring.types.js';
import { CHAMPION_POOL_SCORING } from '../draft-recommendation-scoring.constants.js';

type ChampionPoolScoreResult = {
  isInChampionPool: boolean;
  championPoolScore: number;
  championPoolComfortLevel: number | null;
};

export function calculateChampionPoolScore(
  draftRecommendationContext: DraftRecommendationContext,
  candidateContext: DraftChampionContext,
  championPoolEntries: DraftRecommendationChampionPoolEntry[],
): ChampionPoolScoreResult {
  const selectedChampPoolEntry = getSelectedChampPoolEntry(
    draftRecommendationContext,
    candidateContext,
    championPoolEntries,
  );

  if (!selectedChampPoolEntry) {
    return {
      isInChampionPool: false,
      championPoolScore: 0,
      championPoolComfortLevel: null,
    };
  }

  let championPoolScore = 0;
  const maxScore = CHAMPION_POOL_SCORING.MAX_SCORE;
  const comfortLevel = selectedChampPoolEntry.comfortLevel;

  if (
    selectedChampPoolEntry.preferredRole === draftRecommendationContext.role
  ) {
    const addedSameRoleScore =
      championPoolScore + CHAMPION_POOL_SCORING.SAME_ROLE_BASE_BONUS;

    championPoolScore = Math.min(maxScore, addedSameRoleScore);

    if (comfortLevel !== null) {
      const addedSameRoleComfortScore =
        championPoolScore +
        comfortLevel * CHAMPION_POOL_SCORING.SAME_ROLE_COMFORT_MULTIPLIER;

      championPoolScore = Math.min(maxScore, addedSameRoleComfortScore);
    }
  } else {
    const addedOffRoleScore =
      championPoolScore + CHAMPION_POOL_SCORING.OFF_ROLE_BASE_BONUS;

    championPoolScore = Math.min(maxScore, addedOffRoleScore);

    if (comfortLevel !== null) {
      const addedOffRoleComfortScore =
        championPoolScore +
        comfortLevel * CHAMPION_POOL_SCORING.OFF_ROLE_COMFORT_MULTIPLIER;

      championPoolScore = Math.min(maxScore, addedOffRoleComfortScore);
    }
  }

  return {
    isInChampionPool: true,
    championPoolScore,
    championPoolComfortLevel: comfortLevel,
  };
}

function getSelectedChampPoolEntry(
  draftRecommendationContext: DraftRecommendationContext,
  candidateContext: DraftChampionContext,
  championPoolEntries: DraftRecommendationChampionPoolEntry[],
): DraftRecommendationChampionPoolEntry | null {
  let selectedChampPoolEntry: DraftRecommendationChampionPoolEntry | null =
    null;
  for (const championPoolEntry of championPoolEntries) {
    if (candidateContext.champion.id !== championPoolEntry.championId) {
      continue;
    }

    if (championPoolEntry.preferredRole === draftRecommendationContext.role) {
      return championPoolEntry;
    }

    if (selectedChampPoolEntry === null) {
      selectedChampPoolEntry = championPoolEntry;
      continue;
    }

    if (
      championPoolEntry.comfortLevel !== null &&
      (selectedChampPoolEntry.comfortLevel === null ||
        championPoolEntry.comfortLevel > selectedChampPoolEntry.comfortLevel)
    ) {
      selectedChampPoolEntry = championPoolEntry;
    }
  }

  return selectedChampPoolEntry;
}
