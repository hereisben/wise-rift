import { PrismaClient } from '../../src/generated/prisma/client.js';
import {
  DataQualityLevel,
  GameRole,
} from '../../src/generated/prisma/enums.js';

type ChampionSynergyProfileSeed = {
  championKey: string;
  role: GameRole;
  goodWithTags: string[];
  providesTags: string[];
  needsTags: string[];
  teamRiskTags: string[];
  synergyNotes?: string | null;
  dataQuality?: DataQualityLevel;
};

const championSynergyProfileSeeds: ChampionSynergyProfileSeed[] = [];

export async function seedChampionSynergyProfiles(
  prisma: PrismaClient,
  patchId: string,
) {
  console.log(`Seeding champion synergy profiles...`);

  for (const championSynergyProfileSeed of championSynergyProfileSeeds) {
    const champion = await prisma.champion.findUnique({
      where: {
        key: championSynergyProfileSeed.championKey,
      },
    });

    if (!champion || champion.deletedAt) {
      throw new Error(
        `Champion not found or deleted: ${championSynergyProfileSeed.championKey}`,
      );
    }

    await prisma.championSynergyProfile.upsert({
      where: {
        championId_patchId_role: {
          championId: champion.id,
          patchId,
          role: championSynergyProfileSeed.role,
        },
      },
      update: {
        goodWithTags: championSynergyProfileSeed.goodWithTags,
        providesTags: championSynergyProfileSeed.providesTags,
        needsTags: championSynergyProfileSeed.needsTags,
        teamRiskTags: championSynergyProfileSeed.teamRiskTags,
        synergyNotes: championSynergyProfileSeed.synergyNotes ?? null,
        dataQuality:
          championSynergyProfileSeed.dataQuality ?? DataQualityLevel.MINIMAL,
        deletedAt: null,
      },
      create: {
        championId: champion.id,
        patchId,
        role: championSynergyProfileSeed.role,
        goodWithTags: championSynergyProfileSeed.goodWithTags,
        providesTags: championSynergyProfileSeed.providesTags,
        needsTags: championSynergyProfileSeed.needsTags,
        teamRiskTags: championSynergyProfileSeed.teamRiskTags,
        synergyNotes: championSynergyProfileSeed.synergyNotes ?? null,
        dataQuality:
          championSynergyProfileSeed.dataQuality ?? DataQualityLevel.MINIMAL,
      },
    });

    console.log(
      `Seeded ${champion.name}'s synergy profile for patch ${patchId}`,
    );
  }

  console.log(`SEEDED CHAMPIONS SYNERGY PROFILES`);
}
