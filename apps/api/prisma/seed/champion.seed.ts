import { GameRole, PrismaClient } from '../../src/generated/prisma/client.js';

export async function seedChampion(prisma: PrismaClient) {
  const champions = [
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
      strengths: [`pick_potential`, `mobility`, `burst_damage`],
      weaknesses: [`weak_when_behind`, `skillshot_dependent`],
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
      strengths: ['scaling_damage', 'mobility', 'teamfight_followup'],
      weaknesses: ['hard_to_play', 'weak_into_point_click_cc'],
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
      strengths: ['wave_clear', 'scaling_damage', 'zone_control'],
      weaknesses: ['low_mobility', 'vulnerable_to_dive'],
    },
  ];

  for (const championData of champions) {
    const champion = await prisma.champion.upsert({
      where: {
        key: championData.key,
      },
      update: {
        name: championData.name,
        title: championData.title,
        titleVi: championData.titleVi,
        roles: championData.roles,
        damageType: championData.damageType,
        rangeType: championData.rangeType,
        difficulty: championData.difficulty,
        resourceType: championData.resourceType,
        classTags: championData.classTags,
        playstyleTags: championData.playstyleTags,
        utilityTags: championData.utilityTags,
        riskTags: championData.riskTags,
        strengths: championData.strengths,
        weaknesses: championData.weaknesses,
      },
      create: championData,
    });

    console.log(`Seeded champion: ${champion.name}`);
  }
}
