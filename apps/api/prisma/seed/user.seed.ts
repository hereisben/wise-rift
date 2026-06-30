import { PrismaClient } from '../../src/generated/prisma/client.js';

type UserSeed = {
  name?: string | null;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
};

const userSeeds: UserSeed[] = [
  {
    name: `Dev User`,
    email: `dev@wise-rift.local`,
    passwordHash: `dev-only-password-hash`,
    avatarUrl: null,
  },
];

export async function seedUsers(prisma: PrismaClient) {
  console.log(`Seeding users...`);

  for (const userSeed of userSeeds) {
    const user = await prisma.user.upsert({
      where: {
        email: userSeed.email,
      },
      update: {
        name: userSeed.name ?? `Unknown Name`,
        passwordHash: userSeed.passwordHash,
        avatarUrl: userSeed.avatarUrl ?? null,
        deletedAt: null,
      },
      create: {
        name: userSeed.name ?? `Unknown Name`,
        email: userSeed.email,
        passwordHash: userSeed.passwordHash,
        avatarUrl: userSeed.avatarUrl ?? null,
      },
    });

    console.log(`Seeded user: ${user.email}`);
  }
}
