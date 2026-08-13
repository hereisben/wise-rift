export type RuneReplacementCandidateScore = {
  runeKey: string;
  score: number;
  goodAgainstChampionKeys: string[];
  reasonCodes: string[];
};

export type RuneReplacementGroupScoringResult = {
  baseline: RuneReplacementCandidateScore;
  alternatives: RuneReplacementCandidateScore[];
};
