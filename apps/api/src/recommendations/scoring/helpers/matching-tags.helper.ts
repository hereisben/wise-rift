import { MatchingTagsContext } from '../../../common/types/draft-recommendation-scoring.types.js';

export function getMatchingTagsContext(
  tags: string[],
  targetTags: Set<string>,
): MatchingTagsContext {
  const matchingTags = [...new Set(tags)].filter((tag) => targetTags.has(tag));

  return {
    matchingTags,
    matchingTagsCount: matchingTags.length,
  };
}
