import type { DraftRecommendationResultItemExplanation } from '../../../common/types/draft-recommendation-scoring.types.js';

export function buildCandidateExplanation(
  championName: string,
  reasonCodes: string[],
): DraftRecommendationResultItemExplanation {
  const highlights: string[] = [];
  const warnings: string[] = [];

  if (reasonCodes.includes(`ROLE_PROFILE_MATCH`)) {
    highlights.push(`Fits the selected role profile`);
  }

  if (reasonCodes.includes(`INTENDED_CHAMPION`)) {
    highlights.push(`Matches the intended champion selection`);
  }

  if (reasonCodes.includes(`MATCHUP_STRONGLY_FAVORABLE`)) {
    highlights.push(`Strong matchup signals into the enemy draft`);
  } else if (reasonCodes.includes(`MATCHUP_SLIGHTLY_FAVORABLE`)) {
    highlights.push(`Slightly favorable matchup signals into the enemy draft`);
  } else if (reasonCodes.includes(`MATCHUP_MIXED`)) {
    warnings.push(`Mixed matchup signals into the enemy draft`);
  } else if (reasonCodes.includes(`MATCHUP_SLIGHTLY_UNFAVORABLE`)) {
    warnings.push(`Slightly unfavorable matchup signals into the enemy draft`);
  } else if (reasonCodes.includes(`MATCHUP_STRONGLY_UNFAVORABLE`)) {
    warnings.push(`Strong unfavorable matchup signals into the enemy draft`);
  }

  if (reasonCodes.includes(`STRONG_TEAM_SYNERGY`)) {
    highlights.push(`Strong synergy with the current ally draft`);
  } else if (reasonCodes.includes(`GOOD_TEAM_SYNERGY`)) {
    highlights.push(`Useful synergy with the current ally draft`);
  }

  if (reasonCodes.includes(`HIGH_DRAFT_RISK`)) {
    warnings.push(`High draft risk based on current team context`);
  } else if (reasonCodes.includes(`LOW_DRAFT_RISK`)) {
    warnings.push(`Some draft risk is present`);
  }

  if (reasonCodes.includes(`HAS_BUILD_PROFILE`)) {
    highlights.push(`Has a role-specific build profile`);
  }

  if (reasonCodes.includes(`CHAMPION_POOL`)) {
    highlights.push(`Is in champion pool`);
  }

  const title =
    warnings.length === 0
      ? `${championName} is a strong draft option`
      : `${championName} is playable with some caveats`;

  const summary =
    highlights.length > 0
      ? `${championName} is recommended because ${highlights
          .map((highlight) => highlight.toLowerCase())
          .join(`, `)}.`
      : `${championName} is a possible draft option, but the current scoring evidence is limited.`;

  return {
    title,
    summary,
    highlights,
    warnings,
  };
}
