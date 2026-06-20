import { PrismaClient } from '../../src/generated/prisma/client.js';
import {
  DataQualityLevel,
  GamePlan,
  GameRole,
} from '../../src/generated/prisma/enums.js';

type ChampionBuildProfileSeed = {
  profileKey: string;
  championKey: string;
  role: GameRole;
  gamePlan: GamePlan[];
  coreItemKeys: string[];
  situationalItemKeys: string[];
  recommendedRuneKeys: string[];
  recommendedSpellKeys: string[];
  playStyleTags: string[];
  buildTags: string[];
  notes?: string | null;
  dataQuality?: DataQualityLevel;
};

const championBuildProfileSeeds: ChampionBuildProfileSeed[] = [];

export async function seedChampionBuildProfiles(
  prisma: PrismaClient,
  patchId: string,
) {
  console.log(`Seeding champion build profiles...`);

  for (const championBuildProfileSeed of championBuildProfileSeeds) {
    const champion = await prisma.champion.findUnique({
      where: {
        key: championBuildProfileSeed.championKey,
      },
    });

    if (!champion || champion.deletedAt) {
      throw new Error(
        `Champion not found or deleted: ${championBuildProfileSeed.championKey}`,
      );
    }

    await prisma.championBuildProfile.upsert({
      where: {
        championId_patchId_role_profileKey: {
          championId: champion.id,
          patchId,
          role: championBuildProfileSeed.role,
          profileKey: championBuildProfileSeed.profileKey,
        },
      },
      update: {
        gamePlan: championBuildProfileSeed.gamePlan,
        coreItemKeys: championBuildProfileSeed.coreItemKeys,
        situationalItemKeys: championBuildProfileSeed.situationalItemKeys,
        recommendedRuneKeys: championBuildProfileSeed.recommendedRuneKeys,
        recommendedSpellKeys: championBuildProfileSeed.recommendedSpellKeys,
        playStyleTags: championBuildProfileSeed.playStyleTags,
        buildTags: championBuildProfileSeed.buildTags,
        notes: championBuildProfileSeed.notes ?? null,
        dataQuality:
          championBuildProfileSeed.dataQuality ?? DataQualityLevel.MINIMAL,
        deletedAt: null,
      },
      create: {
        profileKey: championBuildProfileSeed.profileKey,
        championId: champion.id,
        patchId,
        role: championBuildProfileSeed.role,
        gamePlan: championBuildProfileSeed.gamePlan,
        coreItemKeys: championBuildProfileSeed.coreItemKeys,
        situationalItemKeys: championBuildProfileSeed.situationalItemKeys,
        recommendedRuneKeys: championBuildProfileSeed.recommendedRuneKeys,
        recommendedSpellKeys: championBuildProfileSeed.recommendedSpellKeys,
        playStyleTags: championBuildProfileSeed.playStyleTags,
        buildTags: championBuildProfileSeed.buildTags,
        notes: championBuildProfileSeed.notes ?? null,
        dataQuality:
          championBuildProfileSeed.dataQuality ?? DataQualityLevel.MINIMAL,
      },
    });

    console.log(`Seeded ${champion.name}'s build profile for patch ${patchId}`);
  }

  console.log(`SEEDED CHAMPIONS BUILD PROFILES`);
}
