import { PrismaClient } from '../../src/generated/prisma/client.js';

const ACTIVE_PATCH_VERSION = `7.2a`;
const ACTIVE_PATCH_NAME = `Patch 7.2a`;
const ACTIVE_PATCH_RELEASED_AT = new Date();
const ACTIVE_PATCH_NOTES = `Manual Wise Rift data snapshot for Wild Rift patch 7.2a.`;

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
      archivedAt: null,
      deletedAt: null,
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
      id: {
        not: patch.id,
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
