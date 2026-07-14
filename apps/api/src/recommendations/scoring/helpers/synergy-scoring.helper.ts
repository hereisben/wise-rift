import { DraftChampionContext } from '../../../common/types/draft-recommendation-champion.type.js';
import { MatchingTagsContext } from '../../../common/types/draft-recommendation-scoring.types.js';
import { DRAFT_RECOMMENDATION_SCORING_WEIGHTS } from '../draft-recommendation-scoring.constants.js';
import { getMatchingTagsContext } from './matching-tags.helper.js';

type SynergyScoreResult = {
  synergyScore: number;
  matchedGoodWithTagsContext: MatchingTagsContext;
  matchedNeedsTagsContext: MatchingTagsContext;
  matchedTeamRiskTagsContext: MatchingTagsContext;
};

export function calculateSynergyScore(
  candidateContext: DraftChampionContext,
  allyTeamTags: Set<string>,
): SynergyScoreResult {
  const synergyProfileTags = getChampionSynergyProfileTags(candidateContext);

  const matchedGoodWithTagsContext = getMatchingTagsContext(
    synergyProfileTags.goodWithTags,
    allyTeamTags,
  );

  const matchedNeedsTagsContext = getMatchingTagsContext(
    synergyProfileTags.needsTags,
    allyTeamTags,
  );

  const matchedTeamRiskTagsContext = getMatchingTagsContext(
    synergyProfileTags.teamRiskTags,
    allyTeamTags,
  );

  const synergyScore =
    (matchedGoodWithTagsContext.matchingTagsCount +
      matchedNeedsTagsContext.matchingTagsCount) *
    DRAFT_RECOMMENDATION_SCORING_WEIGHTS.GOOD_SYNERGY_TAG;

  return {
    synergyScore,
    matchedGoodWithTagsContext,
    matchedNeedsTagsContext,
    matchedTeamRiskTagsContext,
  };
}

function getChampionSynergyProfileTags(
  candidateContext: DraftChampionContext,
): {
  goodWithTags: string[];
  needsTags: string[];
  teamRiskTags: string[];
} {
  return {
    goodWithTags: candidateContext.selectedSynergyProfile?.goodWithTags ?? [],
    needsTags: candidateContext.selectedSynergyProfile?.needsTags ?? [],
    teamRiskTags: candidateContext.selectedSynergyProfile?.teamRiskTags ?? [],
  };
}
