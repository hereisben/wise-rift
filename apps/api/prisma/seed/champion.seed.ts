import { GameRole, PrismaClient } from '../../src/generated/prisma/client.js';

type ChampionSeed = {
  key: string;
  name: string;
  title?: string | null;
  titleVi?: string | null;
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
  // AATROX
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
  // AHRI
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
  // AKALI
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
  // AKSHAN
  {
    key: `akshan`,
    name: `Akshan`,
    title: `The Rogue Sentinel`,
    titleVi: `Vệ Binh Nổi Loạn`,
    roles: [GameRole.MID, GameRole.ADC],
    damageType: `PHYSICAL`,
    rangeType: `RANGED`,
    difficulty: `MEDIUM`,
    resourceType: `MANA`,
    classTags: [`MARKSMAN`, `ASSASSIN`],
    playstyleTags: [`MOBILITY`, `ROAMING`, `PICK`, `ON_HIT_CHAMPION`],
    utilityTags: [`DASH`, `STEALTH`, `REVEAL`, `REVIVE`, `EXECUTE`],
    riskTags: [`HIGH_EXECUTION`, `CC_VULNERABLE`, `SQUISHY`],
    strengths: [`ROAMING`, `PICK_POTENTIAL`, `MOBILITY`, `KILL_PRESSURE`],
    weaknesses: [`POINT_AND_CLICK_CC`, `LOW_DURABILITY_TEAM`, `REVEAL`],
  },
  // ALISTAR
  {
    key: `alistar`,
    name: `Alistar`,
    title: `The Minotaur`,
    titleVi: `Quái Vật Đầu Bò`,
    roles: [GameRole.SUPPORT],
    damageType: `MAGIC`,
    rangeType: `MELEE`,
    difficulty: `LOW`,
    resourceType: `MANA`,
    classTags: [`TANK`, `SUPPORT`],
    playstyleTags: [`ENGAGE`, `PEEL`, `TEAMFIGHT`],
    utilityTags: [`KNOCK_UP`, `KNOCK_BACK`, `STUN`, `HEALING`],
    riskTags: [`LOW_RANGE_CHAMPION`, `ABILITY_RELIANT_CHAMPION`],
    strengths: [`ENGAGE`, `PEEL`, `FRONTLINE`, `DAMAGE_REDUCTION`],
    weaknesses: [`POKE_COMPOSITION`, `DISENGAGE`, `LOW_RANGE_CHAMPION`],
  },
  // AMBESSA
  {
    key: `ambessa`,
    name: `Ambessa`,
    title: `The Matriarch of War`,
    titleVi: `Nữ Tướng Chiến Tranh`,
    roles: [GameRole.TOP],
    damageType: `PHYSICAL`,
    rangeType: `MELEE`,
    difficulty: `HIGH`,
    resourceType: `ENERGY`,
    classTags: [`FIGHTER`, `BRUISER`],
    playstyleTags: [`MOBILITY`, `DRAIN_TANK`, `EXTENDED_FIGHT_CHAMPION`],
    utilityTags: [`DASH`, `SHIELD`, `SLOW`, `STUN`],
    riskTags: [`HIGH_EXECUTION`, `ENERGY_RELIANT`, `KITEABLE`],
    strengths: [`MOBILITY`, `SUSTAIN`, `PERCENT_HEALTH_DAMAGE`, `DIVE`],
    weaknesses: [`POINT_AND_CLICK_CC`, `ANTI_HEAL`, `KITE`, `HARD_TO_PLAY`],
  },
  // AMUMU
  {
    key: `amumu`,
    name: `Amumu`,
    title: `The Sad Mummy`,
    titleVi: `Xác Ướp U Sầu`,
    roles: [GameRole.JUNGLE, GameRole.SUPPORT],
    damageType: `MAGIC`,
    rangeType: `MELEE`,
    difficulty: `LOW`,
    resourceType: `MANA`,
    classTags: [`TANK`, `MAGE`],
    playstyleTags: [`ENGAGE`, `TEAMFIGHT`, `AREA_DAMAGE`],
    utilityTags: [`STUN`, `ROOT`, `PULL`, `SLOW`],
    riskTags: [`SKILLSHOT_RELIANT`, `LOW_MOBILITY`, `KITEABLE`],
    strengths: [`TEAMFIGHT`, `CROWD_CONTROL`, `AREA_DAMAGE`, `ANTI_TANK`],
    weaknesses: [`KITE`, `DISENGAGE`, `HIGH_MOBILITY`],
  },
  // ANNIE
  {
    key: `annie`,
    name: `Annie`,
    title: `The Dark Child`,
    titleVi: `Đứa Trẻ Bóng Tối`,
    roles: [GameRole.MID, GameRole.SUPPORT],
    damageType: `MAGIC`,
    rangeType: `RANGED`,
    difficulty: `LOW`,
    resourceType: `MANA`,
    classTags: [`MAGE`],
    playstyleTags: [`BURST`, `PICK`, `TEAMFIGHT`],
    utilityTags: [`STUN`, `SHIELD`, `SPEED_UP`, `KNOCK_UP`],
    riskTags: [`LOW_MOBILITY`, `SHORT_RANGE_MAGE`, `FLASH_RELIANT`],
    strengths: [`BURST_DAMAGE`, `PICK_POTENTIAL`, `TEAMFIGHT`, `CROWD_CONTROL`],
    weaknesses: [`POKE_COMPOSITION`, `HIGH_MOBILITY`, `LONG_RANGE_CHAMPION`],
  },
  // ASHE
  {
    key: `ashe`,
    name: `Ashe`,
    title: `The Frost Archer`,
    titleVi: `Cung Băng`,
    roles: [GameRole.ADC, GameRole.SUPPORT],
    damageType: `PHYSICAL`,
    rangeType: `RANGED`,
    difficulty: `LOW`,
    resourceType: `MANA`,
    classTags: [`MARKSMAN`],
    playstyleTags: [`POKE`, `KITE`, `PICK`, `AUTO_ATTACK_CHAMPION`],
    utilityTags: [`SLOW`, `STUN`, `REVEAL`],
    riskTags: [`LOW_MOBILITY`, `SQUISHY`, `POSITIONING_RELIANT`],
    strengths: [`KITE`, `PICK_POTENTIAL`, `VISION_CONTROL`, `UTILITY_MARKSMAN`],
    weaknesses: [`DIVE`, `ASSASSIN`, `HIGH_MOBILITY`],
  },
  // AURELION SOL
  {
    key: `aurelion-sol`,
    name: `Aurelion Sol`,
    title: `The Star Forger`,
    titleVi: `Ác Long Thượng Giới`,
    roles: [GameRole.MID],
    damageType: `MAGIC`,
    rangeType: `RANGED`,
    difficulty: `HIGH`,
    resourceType: `MANA`,
    classTags: [`MAGE`],
    playstyleTags: [`SCALING`, `ZONE_CONTROL`, `TEAMFIGHT`],
    utilityTags: [`STUN`, `KNOCK_UP`, `SLOW`, `PULL`],
    riskTags: [
      `WEAK_EARLY_GAME`,
      `POSITIONING_RELIANT`,
      `INTERRUPT_VULNERABLE`,
    ],
    strengths: [`SCALING_GAME`, `AREA_DAMAGE`, `TEAMFIGHT`, `ZONE_CONTROL`],
    weaknesses: [`EARLY_GAME_PRESSURE`, `ASSASSIN`, `POINT_AND_CLICK_CC`],
  },
  // AURORA
  {
    key: `aurora`,
    name: `Aurora`,
    title: `The Witch Between Worlds`,
    titleVi: `Phù Thủy Giữa Hai Thế Giới`,
    roles: [GameRole.MID, GameRole.TOP],
    damageType: `MAGIC`,
    rangeType: `RANGED`,
    difficulty: `MEDIUM`,
    resourceType: `MANA`,
    classTags: [`MAGE`],
    playstyleTags: [`MOBILITY`, `SKIRMISH`, `POKE`, `ZONE_CONTROL`],
    utilityTags: [`SLOW`, `STEALTH`, `DASH`],
    riskTags: [`POSITIONING_RELIANT`, `SQUISHY`, `HIGH_EXECUTION`],
    strengths: [
      `MOBILITY`,
      `ZONE_CONTROL`,
      `PERCENT_HEALTH_DAMAGE`,
      `SKIRMISH`,
    ],
    weaknesses: [`POINT_AND_CLICK_CC`, `BURST_DAMAGE`, `LONG_RANGE_CHAMPION`],
  },
  // YASUO
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
  // VIKTOR
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
        title: championSeed.title ?? null,
        titleVi: championSeed.titleVi ?? null,
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
