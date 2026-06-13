import { PrismaClient } from './../../src/generated/prisma/client.js';

type SpellPatchStatSeed = {
  key: string;
  cooldownSeconds?: number;
  duration?: number;
  damageValue?: number;
  shieldValue?: number;
  healValue?: number;
};

const spellPatchStatSeeds: SpellPatchStatSeed[] = [
  {
    key: `ghost`,
    cooldownSeconds: 90,
    duration: 8,
  },
  {
    key: `heal`,
    cooldownSeconds: 100,
    duration: 2,
    healValue: 110,
  },
  {
    key: `barrier`,
    cooldownSeconds: 100,
    duration: 2.5,
    shieldValue: 120,
  },
  {
    key: `exhaust`,
    cooldownSeconds: 100,
    duration: 2.5,
  },
  {
    key: `cleanse`,
    cooldownSeconds: 110,
    duration: 0.25,
  },
  {
    key: `flash`,
    cooldownSeconds: 150,
  },
  {
    key: `ignite`,
    cooldownSeconds: 100,
    duration: 5,
    damageValue: 72,
  },
  {
    key: `smite`,
    cooldownSeconds: 10,
    damageValue: 600,
    healValue: 127,
  },
  {
    key: `teleport`,
    cooldownSeconds: 150,
    duration: 3.5,
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
        cooldownSeconds: spellPatchStatSeed.cooldownSeconds,
        duration: spellPatchStatSeed.duration,
        damageValue: spellPatchStatSeed.damageValue,
        shieldValue: spellPatchStatSeed.shieldValue,
        healValue: spellPatchStatSeed.healValue,
        deletedAt: null,
      },
      create: {
        patchId,
        spellId: spell.id,
        cooldownSeconds: spellPatchStatSeed.cooldownSeconds,
        duration: spellPatchStatSeed.duration,
        damageValue: spellPatchStatSeed.damageValue,
        shieldValue: spellPatchStatSeed.shieldValue,
        healValue: spellPatchStatSeed.healValue,
      },
    });

    console.log(`Seeded spell patch stat: ${spellPatchStatSeed.key}`);
  }

  console.log(`SEEDED SPELLS`);
}
