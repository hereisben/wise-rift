import { PrismaClient } from '../../src/generated/prisma/client.js';
import {
  DataQualityLevel,
  GameRole,
} from '../../src/generated/prisma/enums.js';

type ChampionMatchupProfileSeed = {
  championKey: string;
  role: GameRole;
  goodIntoTags: string[];
  weakIntoTags: string[];
  banRiskTags: string[];
  laneNotes?: string | null;
  dataQuality?: DataQualityLevel;
};

const championMatchupProfileSeeds: ChampionMatchupProfileSeed[] = [];

export async function seedChampionMatchupProfiles(
  prisma: PrismaClient,
  patchId: string,
) {
  console.log(`Seeding champion matchup profiles...`);

  for (const championMatchupProfileSeed of championMatchupProfileSeeds) {
    const champion = await prisma.champion.findUnique({
      where: {
        key: championMatchupProfileSeed.championKey,
      },
    });

    if (!champion || champion.deletedAt) {
      throw new Error(
        `Champion not found or deleted: ${championMatchupProfileSeed.championKey}`,
      );
    }

    await prisma.championMatchupProfile.upsert({
      where: {
        championId_patchId_role: {
          championId: champion.id,
          patchId,
          role: championMatchupProfileSeed.role,
        },
      },
      update: {
        goodIntoTags: championMatchupProfileSeed.goodIntoTags,
        weakIntoTags: championMatchupProfileSeed.weakIntoTags,
        banRiskTags: championMatchupProfileSeed.banRiskTags,
        laneNotes: championMatchupProfileSeed.laneNotes ?? null,
        dataQuality:
          championMatchupProfileSeed.dataQuality ?? DataQualityLevel.MINIMAL,
        deletedAt: null,
      },
      create: {
        championId: champion.id,
        patchId,
        role: championMatchupProfileSeed.role,
        goodIntoTags: championMatchupProfileSeed.goodIntoTags,
        weakIntoTags: championMatchupProfileSeed.weakIntoTags,
        banRiskTags: championMatchupProfileSeed.banRiskTags,
        laneNotes: championMatchupProfileSeed.laneNotes ?? null,
        dataQuality:
          championMatchupProfileSeed.dataQuality ?? DataQualityLevel.MINIMAL,
      },
    });

    console.log(
      `Seeded ${champion.name}'s matchup profile for patch ${patchId}`,
    );
  }

  console.log(`SEEDED CHAMPIONS MATCHUP PROFILES`);
}
