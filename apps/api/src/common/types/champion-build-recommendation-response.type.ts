import type { Prisma } from '../../generated/prisma/client.js';
import {
  GamePlan,
  GameRole,
  ItemCategory,
  RuneEffectType,
  RunePath,
  RuneSlot,
  RuneStatType,
  RuneTriggerType,
  SpellEffectType,
  TargetType,
} from '../../generated/prisma/enums.js';
import { DraftChampionContext } from './draft-recommendation-champion.type.js';

export type ChampionBuildRecommendationInput = {
  championKey: string;
  role: GameRole;
  recommendedGamePlan: GamePlan;
  allyChampionContexts?: DraftChampionContext[];
  enemyChampionContexts?: DraftChampionContext[];
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
  description: string;
  descriptionVi: string;
  reasonCodes: string[];
};

export type ItemBuildRecommendationEntry = BuildRecommendationEntry & {
  category: ItemCategory[];
  cost: number | null;
  stats: ItemBuildRecommendationStats;
  effectDescription: string | null;
};

export type SpellBuildRecommendationStats = {
  cooldownSeconds: number | null;
  chargeRechargeSeconds: number | null;
  maxCharges: number | null;
  castData: Prisma.JsonValue | null;
  passiveData: Prisma.JsonValue | null;
  upgradeData: Prisma.JsonValue | null;
};

export type SpellBuildRecommendationEntry = BuildRecommendationEntry & {
  effectTypes: SpellEffectType[];
  targetTypes: TargetType[];
  stats: SpellBuildRecommendationStats;
};

export type RuneBuildRecommendationStats = {
  effectTypes: RuneEffectType[];
  triggerTypes: RuneTriggerType[];
  targetTypes: TargetType[];
  baseValue: number | null;
  scalingValue: number | null;
  cooldown: number | null;
  duration: number | null;
  maxStacks: number | null;
  statTypes: RuneStatType[];
  statBonuses: Prisma.JsonValue | null;
};

export type RuneBuildRecommendationEntry = BuildRecommendationEntry & {
  path: RunePath;
  slot: RuneSlot;
  stats: RuneBuildRecommendationStats;
};

export type ChampionBuildRecommendationResponse = {
  championKey: string;
  role: GameRole;
  gamePlan: GamePlan[];
  coreItems: ItemBuildRecommendationEntry[];
  bootItems: ItemBuildRecommendationEntry[];
  situationalItems: ItemBuildRecommendationEntry[];
  recommendedRunes: RuneBuildRecommendationEntry[];
  recommendedSpells: SpellBuildRecommendationEntry[];
  reasonCodes: string[];
};
