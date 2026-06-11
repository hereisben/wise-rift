import { PrismaClient } from '../../src/generated/prisma/client.js';

export async function seedPatch(prisma: PrismaClient) {
  await prisma.patch.deleteMany({
    where: {
      version: {
        not: '7.1',
      },
    },
  });

  const patch = await prisma.patch.upsert({
    where: {
      version: `7.1`,
    },
    update: {
      name: `Patch 7.1`,
      isActive: true,
      releasedAt: new Date('2026-06-11T00:00:00.000Z'),
    },
    create: {
      version: `7.1`,
      name: 'Patch 7.1',
      isActive: true,
      releasedAt: new Date('2026-06-11T00:00:00.000Z'),
    },
  });

  await prisma.patch.updateMany({
    where: {
      version: {
        not: '7.1',
      },
    },
    data: {
      isActive: false,
    },
  });

  console.log(`Seeded patch: ${patch.version}`);

  return patch;
}
