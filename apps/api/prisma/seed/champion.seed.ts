import { GameRole, PrismaClient } from '../../src/generated/prisma/client.js';

type ChampionSeed = {
  key: string;
  name: string;
  title?: string;
  titleVi?: string;
  roles: GameRole[];
  damageType: string;
  rangeType: string;
  difficulty: string;
  resourceType: string;
  classTags: string[];
  playstyleTags: string[];
  utilityTags: string[];
  riskTags: string[];
  strengths: string[];
  weaknesses: string[];
};

const championSeeds: ChampionSeed[] = [
  {
    key: `aatrox`,
    name: `Aatrox`,
    title: `The Darkin Blade`,
    titleVi: `Quỷ Kiếm Darkin`,
    roles: [GameRole.TOP],
    damageType: `PHYSICAL`,
    rangeType: `MELEE`,
    difficulty: `MEDIUM`,
    resourceType: `NONE`,
    classTags: [`FIGHTER`, `BRUISER`],
    playstyleTags: [`SUSTAIN`, `DRAIN_TANK`, `TEAMFIGHT`],
    utilityTags: [`KNOCK_UP`, `SLOW`, `DASH`, `FEAR`],
    riskTags: [`SKILLSHOT_RELIANT`, `HEALING_RELIANT`, `KITEABLE`],
    strengths: [`SUSTAIN`, `EXTENDED_FIGHT`, `TEAMFIGHT`, `AREA_DAMAGE`],
    weaknesses: [`ANTI_HEAL`, `HIGH_MOBILITY`, `KITE`, `POINT_AND_CLICK_CC`],
  },
  {
    key: `ahri`,
    name: `Ahri`,
    title: `The Nine-Tailed Fox`,
    titleVi: `Hồ Ly Chín Đuôi`,
    roles: [GameRole.MID],
    damageType: `MAGIC`,
    rangeType: `RANGED`,
    difficulty: `MEDIUM`,
    resourceType: `MANA`,
    classTags: [`MAGE`, `ASSASSIN`],
    playstyleTags: [`BURST`, `PICK`, `MOBILITY`],
    utilityTags: [`CHARM`, `DASH`],
    riskTags: [`SKILLSHOT_RELIANT`, `SQUISHY`],
    strengths: [`PICK_POTENTIAL`, `MOBILITY`, `BURST_DAMAGE`],
    weaknesses: [`WEAK_WHEN_BEHIND`, `SKILLSHOT_RELIANT`],
  },
  {
    key: `akali`,
    name: `Akali`,
    title: `The Rogue Assassin`,
    titleVi: `Sát Thủ Đơn Độc`,
    roles: [GameRole.MID, GameRole.TOP],
    damageType: `MAGIC`,
    rangeType: `MELEE`,
    difficulty: `HIGH`,
    resourceType: `ENERGY`,
    classTags: [`ASSASSIN`],
    playstyleTags: [`BURST`, `MOBILITY`, `PICK`],
    utilityTags: [`DASH`, `STEALTH`, `SLOW`, `EXECUTE`],
    riskTags: [`HIGH_EXECUTION`, `CC_VULNERABLE`, `ENERGY_RELIANT`],
    strengths: [
      `BURST_DAMAGE`,
      `MOBILITY`,
      `KILL_PRESSURE`,
      `OUTPLAY_POTENTIAL`,
    ],
    weaknesses: [`POINT_AND_CLICK_CC`, `REVEAL`, `HARD_TO_PLAY`],
  },
  {
    key: 'yasuo',
    name: 'Yasuo',
    title: 'The Unforgiven',
    titleVi: `Kẻ Bất Dung Thứ`,
    roles: [GameRole.MID],
    damageType: 'PHYSICAL',
    rangeType: 'MELEE',
    difficulty: 'HIGH',
    resourceType: 'FLOW',
    classTags: ['FIGHTER', 'SKIRMISHER'],
    playstyleTags: ['DPS', 'MOBILITY', 'SCALING'],
    utilityTags: ['KNOCK_UP', 'WIND_WALL'],
    riskTags: ['MELEE_MID', 'HIGH_EXECUTION', 'CC_VULNERABLE'],
    strengths: ['SCALING_DAMAGE', 'MOBILITY', 'TEAMFIGHT_FOLLOWUP'],
    weaknesses: ['HARD_TO_PLAY', 'WEAK_INTO_POINT_CLICK_CC'],
  },
  {
    key: 'viktor',
    name: 'Viktor',
    title: 'The Machine Herald',
    titleVi: `Sứ Giả Máy Móc`,
    roles: [GameRole.MID],
    damageType: 'MAGIC',
    rangeType: 'RANGED',
    difficulty: 'MEDIUM',
    resourceType: 'MANA',
    classTags: ['MAGE', 'CONTROL_MAGE'],
    playstyleTags: ['SCALING', 'POKE', 'ZONE_CONTROL'],
    utilityTags: ['SLOW', 'ZONE_CONTROL'],
    riskTags: ['LOW_MOBILITY', 'SQUISHY'],
    strengths: ['WAVE_CLEAR', 'SCALING_DAMAGE', 'ZONE_CONTROL'],
    weaknesses: ['LOW_MOBILITY', 'VULNERABLE_TO_DIVE'],
  },
];

export async function seedChampions(prisma: PrismaClient) {
  for (const championSeed of championSeeds) {
    const champion = await prisma.champion.upsert({
      where: {
        key: championSeed.key,
      },
      update: {
        name: championSeed.name,
        title: championSeed.title,
        titleVi: championSeed.titleVi,
        roles: championSeed.roles,
        damageType: championSeed.damageType,
        rangeType: championSeed.rangeType,
        difficulty: championSeed.difficulty,
        resourceType: championSeed.resourceType,
        classTags: championSeed.classTags ?? [],
        playstyleTags: championSeed.playstyleTags ?? [],
        utilityTags: championSeed.utilityTags ?? [],
        riskTags: championSeed.riskTags ?? [],
        strengths: championSeed.strengths ?? [],
        weaknesses: championSeed.weaknesses ?? [],
        deletedAt: null,
        archivedAt: null,
      },
      create: championSeed,
    });

    console.log(`Seeded champion: ${champion.name}`);
  }

  console.log(`SEEDED CHAMPIONS`);
}
