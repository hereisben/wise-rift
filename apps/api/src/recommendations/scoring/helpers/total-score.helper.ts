import { DraftRecommendationResultItemScoreBreakdown } from '../../../common/types/draft-recommendation-scoring.types.js';
import { DRAFT_RECOMMENDATION_SCORE_LIMITS } from '../draft-recommendation-scoring.constants.js';

type TotalScoreResult = {
  totalBeforeClamp: number;
  totalScore: number;
};

export function calculateTotalScore(
  scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
): TotalScoreResult {
  const totalBeforeClamp =
    scoreBreakdown.roleFitScore +
    scoreBreakdown.intendedChampionBonus +
    scoreBreakdown.matchupScore +
    scoreBreakdown.synergyScore +
    scoreBreakdown.buildProfileScore +
    scoreBreakdown.riskPenalty +
    scoreBreakdown.dataQualityPenalty +
    scoreBreakdown.championPoolScore;

  const totalScore = clampScore(totalBeforeClamp);

  return {
    totalBeforeClamp,
    totalScore,
  };
}

function clampScore(score: number): number {
  return Math.max(
    DRAFT_RECOMMENDATION_SCORE_LIMITS.MIN_SCORE,
    Math.min(DRAFT_RECOMMENDATION_SCORE_LIMITS.MAX_SCORE, score),
  );
}
