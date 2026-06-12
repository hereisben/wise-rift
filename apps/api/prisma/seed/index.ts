import { PrismaPg } from '@prisma/adapter-pg';
import env from '../../src/config/env.js';
import { PrismaClient } from '../../src/generated/prisma/client.js';
import { seedChampions } from './champion.seed.js';
import { seedGameTags } from './game-tag.seed.js';
import { seedItems } from './item.seed.js';
import { seedPatch } from './patch.seed.js';
import { seedSpells } from './spell.seed.js';

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Start seeding Wise Rift data...`);

  const patch = await seedPatch(prisma);
  await seedGameTags(prisma);
  await seedChampions(prisma);
  await seedItems(prisma, patch.id);
  await seedSpells(prisma, patch.id);
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
