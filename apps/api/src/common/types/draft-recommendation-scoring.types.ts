import { ConfidenceLevel, GameRole } from '../../generated/prisma/client.js';
import { DraftChampionContext } from './draft-recommendation-champion.type.js';

export type DraftRecommendationContext = {
  role: GameRole;
  effectiveIntendedChampionKey: string | null;
  allyChampionKeys: string[];
  enemyChampionKeys: string[];
  bannedChampionKeys: string[];
};

export type DraftRecommendationResultItemScoreBreakdown = {
  roleFitScore: number;
  intendedChampionBonus: number;
  matchupScore: number;
  matchedGoodIntoTags: string[];
  matchedWeakIntoTags: string[];
  matchedBanRiskTags: string[];
  synergyScore: number;
  matchedGoodWithTags: string[];
  matchedNeedsTags: string[];
  matchedTeamRiskTags: string[];
  buildProfileScore: number;
  riskPenalty: number;
  dataQualityPenalty: number;
  totalBeforeClamp: number;
};

export type DraftRecommendationResultItem = {
  championKey: string;
  championName: string;
  role: GameRole;
  totalScore: number;
  confidence: ConfidenceLevel;
  scoreBreakdown: DraftRecommendationResultItemScoreBreakdown;
  reasonCodes: string[];
  explanation: DraftRecommendationResultItemExplanation;
};

export type DraftRecommendationScoringResultBreakdown = {
  candidateCount: number;
  availableCandidateCount: number;
  recommendedCandidateCount: number;
};

export type DraftRecommendationScoringResult = {
  resultItems: DraftRecommendationResultItem[];
  bestItem: DraftRecommendationResultItem | null;
  scoreBreakdown: DraftRecommendationScoringResultBreakdown;
  reasonCodes: string[];
  confidence: ConfidenceLevel;
};

export type DraftRecommendationScoringInput = DraftRecommendationContext & {
  allyChampionContexts: DraftChampionContext[];
  enemyChampionContexts: DraftChampionContext[];
  candidateContexts: DraftChampionContext[];
};

export type MatchingTagsContext = {
  matchingTags: string[];
  matchingTagsCount: number;
};

export type DraftRecommendationResultItemExplanation = {
  title: string;
  summary: string;
  highlights: string[];
  warnings: string[];
};
