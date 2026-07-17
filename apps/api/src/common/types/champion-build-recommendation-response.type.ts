import { GamePlan, GameRole } from '../../generated/prisma/enums.js';
import { NormalizedDraftChampionPick } from './draft-recommendation-champion.type.js';

export type ChampionBuildRecommendationInput = {
  championKey: string;
  role: GameRole;
  recommendedGamePlan: GamePlan;
  allyPicks?: NormalizedDraftChampionPick[];
  enemyPicks?: NormalizedDraftChampionPick[];
};

export type BuildRecommendationEntry = {
  key: string;
  name: string;
  nameVi: string;
  reasonCodes: string[];
};

export type ChampionBuildRecommendationResponse = {
  championKey: string;
  role: GameRole;
  gamePlan: GamePlan[];
  coreItems: BuildRecommendationEntry[];
  situationalItems: BuildRecommendationEntry[];
  boots: BuildRecommendationEntry[];
  enchant: BuildRecommendationEntry | null;
  recommendedRunes: BuildRecommendationEntry[];
  recommendedSpells: BuildRecommendationEntry[];
  reasonCodes: string[];
};
