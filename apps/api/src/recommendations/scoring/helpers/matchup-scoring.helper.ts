import { DraftChampionContext } from '../../../common/types/draft-recommendation-champion.type.js';
import { MatchingTagsContext } from '../../../common/types/draft-recommendation-scoring.types.js';
import { DRAFT_RECOMMENDATION_SCORING_WEIGHTS } from '../draft-recommendation-scoring.constants.js';
import { getMatchingTagsContext } from './matching-tags.helper.js';

type MatchupScoreResult = {
  matchupScore: number;
  matchedGoodIntoTagsContext: MatchingTagsContext;
  matchedWeakIntoTagsContext: MatchingTagsContext;
  matchedBanRiskTagsContext: MatchingTagsContext;
};

export function calculateMatchupScore(
  candidateContext: DraftChampionContext,
  enemyTeamTags: Set<string>,
): MatchupScoreResult {
  const matchupProfileTags = getChampionMatchupProfileTags(candidateContext);

  const matchedGoodIntoTagsContext = getMatchingTagsContext(
    matchupProfileTags.goodIntoTags,
    enemyTeamTags,
  );

  const matchedWeakIntoTagsContext = getMatchingTagsContext(
    matchupProfileTags.weakIntoTags,
    enemyTeamTags,
  );

  const matchedBanRiskTagsContext = getMatchingTagsContext(
    matchupProfileTags.banRiskTags,
    enemyTeamTags,
  );

  const matchupScore =
    matchedGoodIntoTagsContext.matchingTagsCount *
      DRAFT_RECOMMENDATION_SCORING_WEIGHTS.GOOD_MATCHUP_TAG +
    matchedWeakIntoTagsContext.matchingTagsCount *
      DRAFT_RECOMMENDATION_SCORING_WEIGHTS.WEAK_MATCHUP_TAG;

  return {
    matchupScore,
    matchedGoodIntoTagsContext,
    matchedWeakIntoTagsContext,
    matchedBanRiskTagsContext,
  };
}

function getChampionMatchupProfileTags(
  candidateContext: DraftChampionContext,
): {
  goodIntoTags: string[];
  weakIntoTags: string[];
  banRiskTags: string[];
} {
  return {
    goodIntoTags: candidateContext.selectedMatchupProfile?.goodIntoTags ?? [],
    weakIntoTags: candidateContext.selectedMatchupProfile?.weakIntoTags ?? [],
    banRiskTags: candidateContext.selectedMatchupProfile?.banRiskTags ?? [],
  };
}
