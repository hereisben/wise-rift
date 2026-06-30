import { PrismaPg } from '@prisma/adapter-pg';
import env from '../../src/config/env.js';
import { PrismaClient } from '../../src/generated/prisma/client.js';
import { seedChampionBuildProfiles } from './champion-build-profile.seed.js';
import { seedChampionMatchupProfiles } from './champion-matchup-profile.seed.js';
import { seedChampionPatchStats } from './champion-patch-stat.seed.js';
import { seedChampionSkills } from './champion-skill.seed.js';
import { seedChampionSynergyProfiles } from './champion-synergy-profile.seed.js';
import { seedChampions } from './champion.seed.js';
import { seedGameTags } from './game-tag.seed.js';
import { seedItemPatchStats } from './item-patch-stat.seed.js';
import { seedItems } from './item.seed.js';
import { seedPatch } from './patch.seed.js';
import { seedRunesPatchStats } from './rune-patch-stat.seed.js';
import { seedRunes } from './rune.seed.js';
import { seedSpellsPatchStats } from './spell-patch-stat.seed.js';
import { seedSpells } from './spell.seed.js';
import { seedUsers } from './user.seed.js';

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Start seeding Wise Rift data...`);

  const patch = await seedPatch(prisma);

  await seedUsers(prisma);
  await seedGameTags(prisma);
  await seedChampions(prisma);
  await seedChampionPatchStats(prisma, patch.id);
  await seedChampionSkills(prisma, patch.id);
  await seedItems(prisma);
  await seedItemPatchStats(prisma, patch.id);
  await seedSpells(prisma);
  await seedSpellsPatchStats(prisma, patch.id);
  await seedRunes(prisma);
  await seedRunesPatchStats(prisma, patch.id);
  await seedChampionBuildProfiles(prisma, patch.id);
  await seedChampionMatchupProfiles(prisma, patch.id);
  await seedChampionSynergyProfiles(prisma, patch.id);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log(`Seeding completed`);
  })
  .catch(async (error) => {
    console.error(`Seeding failed: `, error);
    await prisma.$disconnect();
    process.exit(1);
  });
