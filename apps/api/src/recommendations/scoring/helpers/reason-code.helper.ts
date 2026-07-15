import type {
  DraftRecommendationResultItemScoreBreakdown,
  DraftRecommendationScoringResultBreakdown,
} from '../../../common/types/draft-recommendation-scoring.types.js';

export function buildCandidateReasonCodes(
  scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
): string[] {
  const reasonCodes = [`ROLE_PROFILE_MATCH`];

  if (scoreBreakdown.intendedChampionBonus > 0) {
    reasonCodes.push(`INTENDED_CHAMPION`);
  }

  const matchupReasonCode = buildMatchupReasonCode(scoreBreakdown);

  if (matchupReasonCode) {
    reasonCodes.push(matchupReasonCode);
  }

  const synergyReasonCode = buildSynergyReasonCode(scoreBreakdown);

  if (synergyReasonCode) {
    reasonCodes.push(synergyReasonCode);
  }

  const riskReasonCode = buildRiskReasonCode(scoreBreakdown);

  if (riskReasonCode) {
    reasonCodes.push(riskReasonCode);
  }

  if (scoreBreakdown.buildProfileScore > 0) {
    reasonCodes.push(`HAS_BUILD_PROFILE`);
  }

  if (scoreBreakdown.isInChampionPool === true) {
    reasonCodes.push(`CHAMPION_POOL`);
  }

  return reasonCodes;
}

export function buildRecommendationReasonCodes(
  scoreBreakdown: DraftRecommendationScoringResultBreakdown,
): string[] {
  const reasonCodes: string[] = [];

  if (scoreBreakdown.candidateCount < 1) {
    reasonCodes.push(`NO_CANDIDATES_FOUND`);
    return reasonCodes;
  }

  if (
    scoreBreakdown.candidateCount > 0 &&
    scoreBreakdown.availableCandidateCount < 1
  ) {
    reasonCodes.push(`NO_AVAILABLE_CANDIDATES`);
    return reasonCodes;
  }

  if (scoreBreakdown.recommendedCandidateCount < 1) {
    reasonCodes.push(`NO_RECOMMENDATIONS_FOUND`);
    return reasonCodes;
  }

  reasonCodes.push(`RECOMMENDATIONS_FOUND`);

  return reasonCodes;
}

function buildMatchupReasonCode(
  scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
): string | null {
  const goodMatchupCount = scoreBreakdown.matchedGoodIntoTags.length;
  const weakMatchupCount = scoreBreakdown.matchedWeakIntoTags.length;

  if (goodMatchupCount === 0 && weakMatchupCount === 0) {
    return null;
  }

  const matchupScore = scoreBreakdown.matchupScore;

  if (matchupScore >= 16) {
    return `MATCHUP_STRONGLY_FAVORABLE`;
  }

  if (matchupScore > 0) {
    return `MATCHUP_SLIGHTLY_FAVORABLE`;
  }

  if (matchupScore === 0) {
    return `MATCHUP_MIXED`;
  }

  if (matchupScore <= -20) {
    return `MATCHUP_STRONGLY_UNFAVORABLE`;
  }

  return `MATCHUP_SLIGHTLY_UNFAVORABLE`;
}

function buildSynergyReasonCode(
  scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
): string | null {
  const synergyMatchCount =
    scoreBreakdown.matchedGoodWithTags.length +
    scoreBreakdown.matchedNeedsTags.length;

  if (synergyMatchCount === 0) {
    return null;
  }

  if (scoreBreakdown.synergyScore >= 18) {
    return `STRONG_TEAM_SYNERGY`;
  }

  if (scoreBreakdown.synergyScore >= 12) {
    return `GOOD_TEAM_SYNERGY`;
  }

  return `LIMITED_TEAM_SYNERGY`;
}

function buildRiskReasonCode(
  scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
): string | null {
  const riskMatchCount =
    scoreBreakdown.matchedBanRiskTags.length +
    scoreBreakdown.matchedTeamRiskTags.length;

  if (riskMatchCount === 0) {
    return null;
  }

  if (scoreBreakdown.riskPenalty <= -12) {
    return `HIGH_DRAFT_RISK`;
  }

  return `LOW_DRAFT_RISK`;
}
