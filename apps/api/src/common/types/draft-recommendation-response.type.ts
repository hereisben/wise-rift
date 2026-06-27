import { ConfidenceLevel, GameRole } from '../../generated/prisma/client.js';
import { NormalizedDraftChampionPick } from './draft-recommendation-champion.type.js';
import {
  DraftRecommendationResultItem,
  DraftRecommendationScoringResultBreakdown,
} from './draft-recommendation-scoring.types.js';

export type DraftRecommendationInputSnapshot = {
  role: GameRole;
  intendedChampionKey: string | null;
  effectiveIntendedChampionKey: string | null;
  allyPicks: NormalizedDraftChampionPick[];
  enemyPicks: NormalizedDraftChampionPick[];
  bannedChampionKeys: string[];
};

export type DraftRecommendationResponse = {
  inputSnapshot: DraftRecommendationInputSnapshot;
  resultItems: DraftRecommendationResultItem[];
  bestItem: DraftRecommendationResultItem | null;
  scoreBreakdown: DraftRecommendationScoringResultBreakdown;
  reasonCodes: string[];
  confidence: ConfidenceLevel;
};
