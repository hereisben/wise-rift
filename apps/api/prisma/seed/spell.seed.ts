import { PrismaClient } from './../../src/generated/prisma/client.js';

type SpellSeed = {
  key: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  tags: string[];
  goodFor: string[];
  badFor: string[];
};

type SpellPatchStatSeed = {
  key: string;
  cooldownSeconds?: number;
  duration?: number;
  damageValue?: number;
  shieldValue?: number;
  healValue?: number;
};

const spellSeeds: SpellSeed[] = [
  {
    key: `ghost`,
    name: `Ghost`,
    nameVi: `Tốc Hành`,
    description: `Gain a large amount of Movement Speed that decays to 25% bonus Movement Speed over 8 seconds. Takedowns extend the duration by 6 seconds and refresh the effect up to its initial value.`,
    descriptionVi: `Tăng mạnh Tốc Độ Di Chuyển và giảm dần còn 25% Tốc Độ Di Chuyển cộng thêm trong 8 giây. Sau mỗi lần hạ gục, thời gian tác dụng của Tốc Hành sẽ tăng thêm 6 giây và làm mới hiệu ứng, có thể tăng lên tối đa bằng với mức ban đầu.`,
    tags: [`MOBILITY`, `CHASE`, `ESCAPE`],
    goodFor: [`EXTENDED_FIGHT`, `ROAMING`, `CHASE`],
    badFor: [`BURST_PROTECTION`],
  },
  {
    key: `heal`,
    name: `Heal`,
    nameVi: `Hồi Máu`,
    description: `Restore health to yourself and the lowest-health nearby allied champion, and grant both targets bonus Movement Speed for a short duration.`,
    descriptionVi: `Hồi 110 Máu (110 - 400) cho bản thân và tướng đồng minh thấp máu nhất gần đó, đồng thời cả hai được tăng thêm 30% Tốc Độ Di Chuyển trong 2 giây.`,
    tags: [`HEALING`, `UTILITY`, `MOVEMENT_SPEED`],
    goodFor: [`DUO_LANE`, `SURVIVABILITY`, `TEAM_SUPPORT`],
    badFor: [`ANTI_HEAL`, `BURST_DAMAGE`],
  },
  {
    key: `barrier`,
    name: `Barrier`,
    nameVi: `Lá Chắn`,
    description: `Gain a shield that absorbs incoming damage for a short duration.`,
    descriptionVi: `Nhận 1 Lá Chắn hấp thụ 120 sát thương (120 - 560) trong 2.5 giây.`,
    tags: [`SHIELD`, `DEFENSE`, `SURVIVABILITY`],
    goodFor: [`BURST_PROTECTION`, `LANE_SURVIVAL`, `SQUISHY_CHAMPION`],
    badFor: [`LONG_FIGHT`, `TRUE_DAMAGE`],
  },
  {
    key: `exhaust`,
    name: `Exhaust`,
    nameVi: `Kiệt Sức`,
    description: `Exhaust a target enemy champion, slowing them and reducing the damage they deal for a short duration.`,
    descriptionVi: `Làm kiệt sức tướng địch chỉ định, làm chậm 35% và giảm sát thương tướng đó gây ra đi 40% trong 2.5 giây. Lượng làm chậm giảm dần theo thời gian.`,
    tags: [`DAMAGE_REDUCTION`, `SLOW`, `DEFENSE`],
    goodFor: [`ANTI_ASSASSIN`, `ANTI_BURST`, `PEEL`],
    badFor: [`LONG_RANGE_POKE`, `CLEANSE`],
  },
  {
    key: `cleanse`,
    name: `Cleanse`,
    nameVi: `Thanh Tẩy`,
    description: `Remove crowd control effects and summoner spell debuffs affecting your champion, then gain brief crowd control immunity.`,
    descriptionVi: `Loại bỏ các hiệu ứng khống chế, bao gồm cả bùa hại phép bổ trợ, đang ảnh hưởng lên tướng của bạn và cho miễn nhiễm khống chế trong 0.25 giây.`,
    tags: [`CLEANSE`, `ANTI_CC`, `DEFENSE`],
    goodFor: [`CROWD_CONTROL`, `PICK_COMPOSITION`, `LANE_SURVIVAL`],
    badFor: [`LOW_CC`, `RAW_DAMAGE`],
  },
  {
    key: `flash`,
    name: `Flash`,
    nameVi: `Tốc Biến`,
    description: `Teleport a short distance forward or toward the target direction.`,
    descriptionVi: `Dịch chuyển đến một khoảng cách ngắn phía trước hoặc theo hướng chỉ định.`,
    tags: [`MOBILITY`, `ENGAGE`, `ESCAPE`],
    goodFor: [`PLAYMAKING`, `ESCAPE`, `ENGAGE`],
    badFor: [],
  },
  {
    key: `ignite`,
    name: `Ignite`,
    nameVi: `Thiêu Đốt`,
    description: `Ignite an enemy champion, dealing true damage over time, applying Grievous Wounds, and revealing the target.`,
    descriptionVi: `Thiêu đốt tướng địch, gây 72 Sát Thương Chuẩn (72 - 380) trong vòng 5 giây, khiến mục tiêu chịu Vết Thương Sâu và nhận được Tầm Nhìn của chúng.`,
    tags: [`TRUE_DAMAGE`, `ANTI_HEAL`, `KILL_PRESSURE`],
    goodFor: [`LANE_KILL_PRESSURE`, `ANTI_HEAL`, `BURST_DAMAGE`],
    badFor: [`LONG_RANGE_SAFE_PLAY`, `SHIELDING`],
  },
  {
    key: `smite`,
    name: `Smite`,
    nameVi: `Trừng Phạt`,
    description: `Deal true damage to monsters, epic monsters, or enemy minions. Smiting monsters restores health. Smite upgrades after being used against monsters multiple times.`,
    descriptionVi: `Gây 600 sát thương chuẩn lên quái, quái khủng hoặc lính địch. Trừng phạt quái sẽ hồi 127 Máu (70 + 10% Máu). Trừng phạt sẽ nâng thành Trừng Phạt Tái Tê sau 3 lần sử dụng.`,
    tags: [`JUNGLE`, `TRUE_DAMAGE`, `OBJECTIVE_CONTROL`],
    goodFor: [`JUNGLE_CLEAR`, `OBJECTIVE_CONTROL`, `EPIC_MONSTER`],
    badFor: [`NON_JUNGLE_ROLE`],
  },
  {
    key: `teleport`,
    name: `Teleport`,
    nameVi: `Dịch Chuyển`,
    description: `After channeling, teleport to an allied structure, champion, or ward, with early-game targeting restrictions.`,
    descriptionVi: `Sau khi vận trong 3.5 giây, dịch chuyển đến công trình, tướng hoặc mắt đồng minh, ngoại trừ các khu vực trong tầm nhà lính của kẻ địch. Bạn chỉ có thể dịch chuyển đến các công trình trong 6 phút đầu tiên của trận đấu.`,
    tags: [`MAP_PRESSURE`, `ROAMING`, `MACRO`],
    goodFor: [`SPLIT_PUSH`, `MAP_PRESSURE`, `SIDE_LANE`],
    badFor: [`EARLY_COMBAT`, `LANE_KILL_PRESSURE`],
  },
];

const spellPatchStatSeeds: SpellPatchStatSeed[] = [
  {
    key: `ghost`,
    cooldownSeconds: 90,
    duration: 8,
  },
  {
    key: `heal`,
    cooldownSeconds: 100,
    duration: 2,
    healValue: 110,
  },
  {
    key: `barrier`,
    cooldownSeconds: 100,
    duration: 2.5,
    shieldValue: 120,
  },
  {
    key: `exhaust`,
    cooldownSeconds: 100,
    duration: 2.5,
  },
  {
    key: `cleanse`,
    cooldownSeconds: 110,
    duration: 0.25,
  },
  {
    key: `flash`,
    cooldownSeconds: 150,
  },
  {
    key: `ignite`,
    cooldownSeconds: 100,
    duration: 5,
    damageValue: 72,
  },
  {
    key: `smite`,
    cooldownSeconds: 10,
    damageValue: 600,
    healValue: 127,
  },
  {
    key: `teleport`,
    cooldownSeconds: 150,
    duration: 3.5,
  },
];

export async function seedSpells(prisma: PrismaClient, patchId: string) {
  for (const spellSeed of spellSeeds) {
    await prisma.spell.upsert({
      where: {
        key: spellSeed.key,
      },
      update: {
        name: spellSeed.name,
        nameVi: spellSeed.nameVi,
        description: spellSeed.description,
        descriptionVi: spellSeed.descriptionVi,
        tags: spellSeed.tags ?? [],
        goodFor: spellSeed.goodFor ?? [],
        badFor: spellSeed.badFor ?? [],
        deletedAt: null,
      },
      create: {
        key: spellSeed.key,
        name: spellSeed.name,
        nameVi: spellSeed.nameVi,
        description: spellSeed.description,
        descriptionVi: spellSeed.descriptionVi,
        tags: spellSeed.tags ?? [],
        goodFor: spellSeed.goodFor ?? [],
        badFor: spellSeed.badFor ?? [],
      },
    });

    console.log(`Seeded spell ${spellSeed.name}`);
  }

  for (const spellPatchStatSeed of spellPatchStatSeeds) {
    const spell = await prisma.spell.findUnique({
      where: {
        key: spellPatchStatSeed.key,
      },
    });

    if (!spell) {
      throw new Error(
        `Cannot seed spell patch stat. Missing spell: ${spellPatchStatSeed.key}`,
      );
    }

    await prisma.spellPatchStat.upsert({
      where: {
        spellId_patchId: {
          patchId,
          spellId: spell.id,
        },
      },
      update: {
        cooldownSeconds: spellPatchStatSeed.cooldownSeconds,
        duration: spellPatchStatSeed.duration,
        damageValue: spellPatchStatSeed.damageValue,
        shieldValue: spellPatchStatSeed.shieldValue,
        healValue: spellPatchStatSeed.healValue,
        deletedAt: null,
      },
      create: {
        patchId,
        spellId: spell.id,
        cooldownSeconds: spellPatchStatSeed.cooldownSeconds,
        duration: spellPatchStatSeed.duration,
        damageValue: spellPatchStatSeed.damageValue,
        shieldValue: spellPatchStatSeed.shieldValue,
        healValue: spellPatchStatSeed.healValue,
      },
    });

    console.log(`Seeded spell patch stat: ${spellPatchStatSeed.key}`);
  }

  console.log(`Seeded spells`);
}
