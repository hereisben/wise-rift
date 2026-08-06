import { Prisma, PrismaClient } from '../../src/generated/prisma/client.js';
import {
  DataQualityLevel,
  SpellEffectType,
  TargetType,
} from '../../src/generated/prisma/enums.js';

type SpellPatchStatSeed = {
  key: string;
  isAvailable?: boolean;
  cooldownSeconds?: number | null;
  chargeRechargeSeconds?: number | null;
  maxCharges?: number | null;
  effectTypes: SpellEffectType[];
  targetTypes: TargetType[];
  castData?: Prisma.InputJsonValue | null;
  passiveData?: Prisma.InputJsonValue | null;
  upgradeData?: Prisma.InputJsonValue | null;
  notes?: string | null;
  dataQuality?: DataQualityLevel;
};

const spellPatchStatSeeds: SpellPatchStatSeed[] = [
  {
    key: `ghost`,
    cooldownSeconds: 90,
    effectTypes: [
      SpellEffectType.MOVEMENT_SPEED,
      SpellEffectType.DURATION_EXTENSION,
      SpellEffectType.EFFECT_REFRESH,
    ],
    targetTypes: [TargetType.SELF],
    castData: {
      effects: [
        {
          type: `MOVEMENT_SPEED`,
          initialValue: null,
          decaysToPercent: 25,
          durationSeconds: 8,
        },
      ],
      takedownInteraction: {
        durationExtensionSeconds: 6,
        refreshesEffect: true,
        refreshCap: `ORIGINAL_AMOUNT`,
      },
    },
    passiveData: null,
    upgradeData: null,
    dataQuality: DataQualityLevel.PARTIAL,
  },
  {
    key: `heal`,
    cooldownSeconds: 100,
    effectTypes: [SpellEffectType.HEAL, SpellEffectType.MOVEMENT_SPEED],
    targetTypes: [TargetType.SELF, TargetType.ALLY],
    castData: {
      effects: [
        {
          type: `HEAL`,
          targets: [`SELF`, `MOST_WOUNDED_NEARBY_ALLY_CHAMPION`],
          value: {
            minimum: 110,
            maximum: 400,
            scalingType: `CHAMPION_LEVEL`,
          },
        },
        {
          type: `MOVEMENT_SPEED`,
          targets: [`SELF`, `SELECTED_ALLY`],
          value: {
            percent: 30,
          },
          durationSeconds: 2,
        },
      ],
      repeatedApplication: {
        affectedByRecentHeal: true,
        effectivenessMultiplier: 0.5,
        recentEffectWindowSeconds: null,
      },
    },
    passiveData: null,
    upgradeData: null,
    dataQuality: DataQualityLevel.PARTIAL,
  },
  {
    key: `barrier`,
    cooldownSeconds: 100,
    effectTypes: [SpellEffectType.SHIELD],
    targetTypes: [TargetType.SELF],
    castData: {
      effects: [
        {
          type: `SHIELD`,
          value: {
            minimum: 120,
            maximum: 560,
            scalingType: `CHAMPION_LEVEL`,
          },
          durationSeconds: 2.5,
        },
      ],
    },
    passiveData: null,
    upgradeData: null,
    dataQuality: DataQualityLevel.COMPLETE,
  },
  {
    key: `exhaust`,
    cooldownSeconds: 100,
    effectTypes: [SpellEffectType.SLOW, SpellEffectType.DAMAGE_REDUCTION],
    targetTypes: [TargetType.CHAMPION],
    castData: {
      effects: [
        {
          type: `SLOW`,
          targets: [`ENEMY_CHAMPION`],
          value: {
            percent: 35,
          },
          durationSeconds: 2.5,
        },
        {
          type: `DAMAGE_REDUCTION`,
          targets: [`ENEMY_CHAMPION`],
          value: {
            percent: 40,
          },
          durationSeconds: 2.5,
        },
      ],
    },
    passiveData: null,
    upgradeData: null,
    dataQuality: DataQualityLevel.COMPLETE,
  },
  {
    key: `cleanse`,
    cooldownSeconds: 110,
    effectTypes: [
      SpellEffectType.CLEANSE,
      SpellEffectType.CROWD_CONTROL_IMMUNITY,
    ],
    targetTypes: [TargetType.SELF],
    castData: {
      effects: [
        {
          type: `CLEANSE`,
          targets: [`SELF`],
          removes: [`DISABLE`, `SPELL_DEBUFF`],
        },
        {
          type: `CROWD_CONTROL_IMMUNITY`,
          targets: [`SELF`],
          durationSeconds: 0.25,
        },
      ],
    },
    passiveData: null,
    upgradeData: null,
    dataQuality: DataQualityLevel.COMPLETE,
  },
  {
    key: `flash`,
    cooldownSeconds: 150,
    effectTypes: [SpellEffectType.TELEPORT],
    targetTypes: [TargetType.LOCATION],
    castData: {
      effects: [
        {
          type: `TELEPORT`,
          directionMode: `FORWARD_OR_AIMED_DIRECTION`,
          distance: null,
        },
      ],
    },
    passiveData: null,
    upgradeData: null,
    dataQuality: DataQualityLevel.PARTIAL,
  },
  {
    key: `ignite`,
    cooldownSeconds: 100,
    effectTypes: [SpellEffectType.TRUE_DAMAGE, SpellEffectType.ANTI_HEAL],
    targetTypes: [TargetType.CHAMPION],
    castData: {
      effects: [
        {
          type: `TRUE_DAMAGE`,
          targets: [`ENEMY_CHAMPION`],
          value: {
            minimum: 72,
            maximum: 380,
            scalingType: `CHAMPION_LEVEL`,
          },
          deliveryType: `DAMAGE_OVER_TIME`,
          durationSeconds: 5,
        },
        {
          type: `ANTI_HEAL`,
          targets: [`ENEMY_CHAMPION`],
          value: {
            percent: 60,
          },
          durationSeconds: 5,
        },
      ],
    },
    passiveData: null,
    upgradeData: null,
    dataQuality: DataQualityLevel.COMPLETE,
  },
  {
    key: `smite`,
    cooldownSeconds: 10,
    chargeRechargeSeconds: 45,
    maxCharges: 2,
    effectTypes: [
      SpellEffectType.TRUE_DAMAGE,
      SpellEffectType.HEAL,
      SpellEffectType.GOLD_MODIFIER,
      SpellEffectType.EXPERIENCE_MODIFIER,
      SpellEffectType.MONSTER_DAMAGE_AMPLIFICATION,
      SpellEffectType.HEALTH_REGENERATION,
      SpellEffectType.MANA_REGENERATION,
      SpellEffectType.MOVEMENT_SPEED_STEAL,
      SpellEffectType.CHARGE_SYSTEM,
      SpellEffectType.UPGRADE,
    ],
    targetTypes: [
      TargetType.CHAMPION,
      TargetType.MINION,
      TargetType.MONSTER,
      TargetType.EPIC_MONSTER,
    ],
    castData: {
      effects: [
        {
          type: `TRUE_DAMAGE`,
          targets: [`MONSTER`, `EPIC_MONSTER`, `ENEMY_MINION`],
          value: {
            flat: 600,
          },
        },
        {
          type: `HEAL`,
          targets: [`SELF`],
          conditions: {
            smiteTargetType: `MONSTER`,
          },
          displayedValue: 127,
          value: {
            flat: 70,
            percent: 10,
            percentOf: `HEALTH`,
            formula: `70 + 10% Health`,
          },
        },
      ],
    },
    passiveData: {
      name: `Jungle Expertise`,
      effects: [
        {
          type: `GOLD_MODIFIER`,
          source: `MONSTER_KILL`,
          value: {
            percent: 20,
          },
          endsAtSeconds: 660,
        },
        {
          type: `EXPERIENCE_MODIFIER`,
          source: `MONSTER_KILL`,
          value: {
            percent: 20,
          },
        },
        {
          type: `GOLD_MODIFIER`,
          source: `MINION_KILL`,
          value: {
            percent: -60,
          },
          temporary: true,
        },
        {
          type: `EXPERIENCE_MODIFIER`,
          source: `MINION_KILL`,
          value: {
            percent: -60,
          },
          temporary: true,
        },
        {
          type: `MONSTER_DAMAGE_AMPLIFICATION`,
          damageType: `ATTACK_DAMAGE`,
          value: {
            percent: 15,
          },
          decayStartsAtSeconds: 120,
          removedAtSeconds: 300,
        },
        {
          type: `MONSTER_DAMAGE_AMPLIFICATION`,
          damageType: `ABILITY_DAMAGE`,
          value: {
            percent: 30,
          },
        },
        {
          type: `HEALTH_REGENERATION`,
          trigger: `AFTER_DAMAGING_MONSTER`,
          targets: [`SELF`],
          value: {
            flat: 40,
          },
          durationSeconds: 5,
        },
        {
          type: `MANA_REGENERATION`,
          condition: `WHILE_IN_JUNGLE_OR_RIVER`,
          targets: [`SELF`],
          value: {
            flat: 4,
          },
          intervalSeconds: 1,
        },
      ],
    },
    upgradeData: {
      upgradesTo: {
        key: `chilling-smite`,
        name: `Chilling Smite`,
        nameVi: `Trừng Phạt Tái Tê`,
      },
      requirement: {
        type: `USE_COUNT`,
        requiredUses: 3,
      },
      cooldownSeconds: 10,
      effects: [
        {
          type: `TRUE_DAMAGE`,
          targets: [`LARGE_MONSTER`, `EPIC_MONSTER`, `MINION`],
          value: {
            flat: 1000,
          },
        },
        {
          type: `HEAL`,
          targets: [`SELF`],
          conditions: {
            smiteTargetType: `MONSTER`,
          },
          displayedValue: 152,
          value: {
            flat: 70,
            percent: 10,
            percentOf: `HEALTH`,
            formula: `70 + 10% Health`,
          },
        },
        {
          type: `TRUE_DAMAGE`,
          targets: [`ENEMY_CHAMPION`],
          value: {
            flat: 40,
          },
        },
        {
          type: `MOVEMENT_SPEED_STEAL`,
          targets: [`ENEMY_CHAMPION`],
          value: {
            percent: 25,
          },
          durationSeconds: 2,
        },
      ],
    },
    dataQuality: DataQualityLevel.PARTIAL,
  },
  {
    key: `teleport`,
    cooldownSeconds: 150,
    effectTypes: [SpellEffectType.TELEPORT],
    targetTypes: [TargetType.ALLY, TargetType.STRUCTURE, TargetType.WARD],
    castData: {
      channelDurationSeconds: 3.5,
      effects: [
        {
          type: `TELEPORT`,
          validTargets: [`ALLIED_CHAMPION`, `ALLIED_STRUCTURE`, `ALLIED_WARD`],
        },
      ],
      restrictions: {
        excludesEnemyInhibitorAreas: true,
        structureOnlyUntilSeconds: 360,
      },
    },
    passiveData: null,
    upgradeData: null,
    dataQuality: DataQualityLevel.COMPLETE,
  },
];

export async function seedSpellsPatchStats(
  prisma: PrismaClient,
  patchId: string,
) {
  console.log(`SEEDING SPELLS PATCH STATS...`);
  for (const spellPatchStatSeed of spellPatchStatSeeds) {
    const spell = await prisma.spell.findUnique({
      where: {
        key: spellPatchStatSeed.key,
      },
    });

    if (!spell) {
      throw new Error(
        `Cannot seed spell patch stat. Missing spell: ${spellPatchStatSeed.key}`,
      );
    }

    await prisma.spellPatchStat.upsert({
      where: {
        spellId_patchId: {
          patchId,
          spellId: spell.id,
        },
      },
      update: {
        isAvailable: spellPatchStatSeed.isAvailable ?? true,

        cooldownSeconds: spellPatchStatSeed.cooldownSeconds ?? null,
        chargeRechargeSeconds: spellPatchStatSeed.chargeRechargeSeconds ?? null,
        maxCharges: spellPatchStatSeed.maxCharges ?? null,

        effectTypes: spellPatchStatSeed.effectTypes,
        targetTypes: spellPatchStatSeed.targetTypes,

        castData: spellPatchStatSeed.castData ?? Prisma.DbNull,
        passiveData: spellPatchStatSeed.passiveData ?? Prisma.DbNull,
        upgradeData: spellPatchStatSeed.upgradeData ?? Prisma.DbNull,

        notes: spellPatchStatSeed.notes ?? null,
        dataQuality: spellPatchStatSeed.dataQuality ?? DataQualityLevel.MINIMAL,

        deletedAt: null,
      },
      create: {
        patchId,
        spellId: spell.id,

        isAvailable: spellPatchStatSeed.isAvailable ?? true,

        cooldownSeconds: spellPatchStatSeed.cooldownSeconds ?? null,
        chargeRechargeSeconds: spellPatchStatSeed.chargeRechargeSeconds ?? null,
        maxCharges: spellPatchStatSeed.maxCharges ?? null,

        effectTypes: spellPatchStatSeed.effectTypes,
        targetTypes: spellPatchStatSeed.targetTypes,

        castData: spellPatchStatSeed.castData ?? Prisma.DbNull,
        passiveData: spellPatchStatSeed.passiveData ?? Prisma.DbNull,
        upgradeData: spellPatchStatSeed.upgradeData ?? Prisma.DbNull,

        notes: spellPatchStatSeed.notes ?? null,
        dataQuality: spellPatchStatSeed.dataQuality ?? DataQualityLevel.MINIMAL,
      },
    });

    console.log(`Seeded spell patch stat: ${spellPatchStatSeed.key}`);
  }

  console.log(`SEEDED SPELL PATCH STATS`);
}
