import { Prisma, PrismaClient } from './../../src/generated/prisma/client.js';

type ChampionPatchStatSeed = {
  championKey: string;
  baseHealth?: number | null;
  baseArmor?: number | null;
  baseMana?: number | null;
  baseMagicResist: number;
  baseAttackDamage?: number | null;
  baseAbilityPower?: number | null;
  attackSpeed?: number | null;
  moveSpeed?: number | null;
  healthGrowth?: number | null;
  manaGrowth?: number | null;
  armorGrowth?: number | null;
  magicResistGrowth?: number | null;
  attackDamageGrowth?: number | null;
  attackSpeedGrowth?: number | null;
  scalingProfile?: Prisma.InputJsonValue;
  laneProfile?: Prisma.InputJsonValue;
  teamProfile?: Prisma.InputJsonValue;
  metaScore?: number | null;
};

const championPatchStatSeeds: ChampionPatchStatSeed[] = [
  {
    championKey: `aatrox`,

    baseHealth: 630,
    baseArmor: 46,
    baseMagicResist: 40,
    baseAttackDamage: 62,
    baseAbilityPower: 0,
    attackSpeed: 0.73,
    moveSpeed: 355,

    healthGrowth: 136,
    armorGrowth: 4,
    magicResistGrowth: 2,
    attackDamageGrowth: 5,
    attackSpeedGrowth: 0.007857,

    scalingProfile: {
      levelStats: [
        {
          level: 1,
          health: 630,
          healthRegenPer5s: 6,
          armor: 46,
          magicResist: 40,
          moveSpeed: 355,
          attackDamage: 62,
          attackSpeed: 0.73,
        },
        {
          level: 2,
          health: 766,
          healthRegenPer5s: 7,
          armor: 50,
          magicResist: 42,
          moveSpeed: 355,
          attackDamage: 67,
          attackSpeed: 0.74,
        },
        {
          level: 3,
          health: 902,
          healthRegenPer5s: 8,
          armor: 54,
          magicResist: 44,
          moveSpeed: 355,
          attackDamage: 72,
          attackSpeed: 0.75,
        },
        {
          level: 4,
          health: 1038,
          healthRegenPer5s: 9,
          armor: 58,
          magicResist: 46,
          moveSpeed: 355,
          attackDamage: 77,
          attackSpeed: 0.75,
        },
        {
          level: 5,
          health: 1174,
          healthRegenPer5s: 10,
          armor: 62,
          magicResist: 48,
          moveSpeed: 355,
          attackDamage: 82,
          attackSpeed: 0.76,
        },
        {
          level: 6,
          health: 1310,
          healthRegenPer5s: 11,
          armor: 66,
          magicResist: 50,
          moveSpeed: 355,
          attackDamage: 87,
          attackSpeed: 0.77,
        },
        {
          level: 7,
          health: 1446,
          healthRegenPer5s: 12,
          armor: 70,
          magicResist: 52,
          moveSpeed: 355,
          attackDamage: 92,
          attackSpeed: 0.78,
        },
        {
          level: 8,
          health: 1582,
          healthRegenPer5s: 13,
          armor: 74,
          magicResist: 54,
          moveSpeed: 355,
          attackDamage: 97,
          attackSpeed: 0.79,
        },
        {
          level: 9,
          health: 1718,
          healthRegenPer5s: 14,
          armor: 78,
          magicResist: 56,
          moveSpeed: 355,
          attackDamage: 102,
          attackSpeed: 0.79,
        },
        {
          level: 10,
          health: 1854,
          healthRegenPer5s: 15,
          armor: 82,
          magicResist: 58,
          moveSpeed: 355,
          attackDamage: 107,
          attackSpeed: 0.8,
        },
        {
          level: 11,
          health: 1990,
          healthRegenPer5s: 16,
          armor: 86,
          magicResist: 60,
          moveSpeed: 355,
          attackDamage: 112,
          attackSpeed: 0.81,
        },
        {
          level: 12,
          health: 2126,
          healthRegenPer5s: 17,
          armor: 90,
          magicResist: 62,
          moveSpeed: 355,
          attackDamage: 117,
          attackSpeed: 0.82,
        },
        {
          level: 13,
          health: 2262,
          healthRegenPer5s: 18,
          armor: 94,
          magicResist: 64,
          moveSpeed: 355,
          attackDamage: 122,
          attackSpeed: 0.82,
        },
        {
          level: 14,
          health: 2398,
          healthRegenPer5s: 19,
          armor: 98,
          magicResist: 66,
          moveSpeed: 355,
          attackDamage: 127,
          attackSpeed: 0.83,
        },
        {
          level: 15,
          health: 2534,
          healthRegenPer5s: 20,
          armor: 102,
          magicResist: 68,
          moveSpeed: 355,
          attackDamage: 132,
          attackSpeed: 0.84,
        },
      ],
    },

    laneProfile: {
      preferredRoles: [`TOP`],
      tradingPattern: `skillshot_combo`,
      sustainLevel: `high`,
      allInThreat: `high`,
      waveClear: `medium`,
      mobility: `medium`,
    },

    teamProfile: {
      provides: [`FRONTLINE`, `AREA_DAMAGE`, `KNOCK_UP`, `SUSTAIN`],
      needs: [`ENGAGE_SETUP`, `ANTI_HEAL_PROTECTION`],
      weakAgainst: [`ANTI_HEAL`, `KITE`, `HIGH_MOBILITY`, `POINT_AND_CLICK_CC`],
    },
  },
];

export async function seedChampionPatchStats(
  prisma: PrismaClient,
  patchId: string,
) {}
