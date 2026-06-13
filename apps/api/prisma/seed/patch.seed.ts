import { PrismaClient } from '../../src/generated/prisma/client.js';

const ACTIVE_PATCH_VERSION = `7.1g`;
const ACTIVE_PATCH_NAME = `Patch 7.1g`;
const ACTIVE_PATCH_RELEASED_AT = new Date(`2026-06-13T00:00:00.000Z`);
const ACTIVE_PATCH_NOTES = `Manual Wise Rift data snapshot for Wild Rift patch 7.1g.`;

export async function seedPatch(prisma: PrismaClient) {
  const patch = await prisma.patch.upsert({
    where: {
      version: ACTIVE_PATCH_VERSION,
    },
    update: {
      name: ACTIVE_PATCH_NAME,
      isActive: true,
      releasedAt: ACTIVE_PATCH_RELEASED_AT,
      notes: ACTIVE_PATCH_NOTES,
    },
    create: {
      version: ACTIVE_PATCH_VERSION,
      name: ACTIVE_PATCH_NAME,
      isActive: true,
      releasedAt: ACTIVE_PATCH_RELEASED_AT,
      notes: ACTIVE_PATCH_NOTES,
    },
  });

  await prisma.patch.updateMany({
    where: {
      version: {
        not: ACTIVE_PATCH_VERSION,
      },
      deletedAt: null,
    },
    data: {
      isActive: false,
    },
  });

  console.log(`Seeded patch: ${patch.version}`);

  return patch;
}
