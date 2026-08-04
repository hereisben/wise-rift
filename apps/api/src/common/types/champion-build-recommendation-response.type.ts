import {
  GamePlan,
  GameRole,
  ItemCategory,
} from '../../generated/prisma/enums.js';
import { NormalizedDraftChampionPick } from './draft-recommendation-champion.type.js';

export type ChampionBuildRecommendationInput = {
  championKey: string;
  role: GameRole;
  recommendedGamePlan: GamePlan;
  allyPicks?: NormalizedDraftChampionPick[];
  enemyPicks?: NormalizedDraftChampionPick[];
};

export type ItemBuildRecommendationStats = {
  abilityPower: number | null;
  attackDamage: number | null;
  armor: number | null;
  magicResist: number | null;
  health: number | null;
  mana: number | null;
  abilityHaste: number | null;
  critRate: number | null;
  attackSpeed: number | null;

  flatArmorPenetration: number | null;
  percentArmorPenetration: number | null;
  flatMagicPenetration: number | null;
  percentMagicPenetration: number | null;

  physicalVamp: number | null;
  magicVamp: number | null;
  omniVamp: number | null;

  healthRegen: number | null;
  manaRegen: number | null;
  healShieldPower: number | null;
  tenacity: number | null;
  slowResistance: number | null;

  flatMovementSpeed: number | null;
  percentMovementSpeed: number | null;

  antiHealValue: number | null;
  shieldPower: number | null;
};

export type BuildRecommendationEntry = {
  key: string;
  name: string;
  nameVi: string;
  reasonCodes: string[];
};

export type ItemBuildRecommendationEntry = BuildRecommendationEntry & {
  description: string;
  descriptionVi: string;
  category: ItemCategory[];
  cost: number | null;
  stats: ItemBuildRecommendationStats;
  effectDescription: string | null;
};

export type ChampionBuildRecommendationResponse = {
  championKey: string;
  role: GameRole;
  gamePlan: GamePlan[];
  coreItems: ItemBuildRecommendationEntry[];
  bootItems: ItemBuildRecommendationEntry[];
  situationalItems: ItemBuildRecommendationEntry[];
  recommendedRunes: BuildRecommendationEntry[];
  recommendedSpells: BuildRecommendationEntry[];
  reasonCodes: string[];
};
