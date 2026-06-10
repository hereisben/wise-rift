import { PrismaClient } from '../../src/generated/prisma/client.js';

export async function seedPatch(prisma: PrismaClient) {
  const patch = await prisma.patch.upsert({
    where: {
      version: `6.1`,
    },
    update: {
      name: `MVP Test Patch`,
      isActive: true,
      releasedAt: new Date('2026-06-10T00:00:00.000Z'),
    },
    create: {
      version: `6.1`,
      name: 'MVP Test Patch',
      isActive: true,
      releasedAt: new Date('2026-06-10T00:00:00.000Z'),
    },
  });

  console.log(`Seeded patch: ${patch.version}`);

  return patch;
}
