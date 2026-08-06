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

const spellSeeds: SpellSeed[] = [
  {
    key: `ghost`,
    name: `Ghost`,
    nameVi: `Tốc Hành`,
    description: `Gain a large burst of Movement Speed that decays to 25% bonus Movement Speed for 8 seconds. With each takedown, Ghost's duration is extended by 6 seconds, refreshing its effects up to the original amount.`,
    descriptionVi: `Tăng mạnh Tốc Độ Di Chuyển, sau đó giảm dần còn 25% Tốc Độ Di Chuyển cộng thêm trong 8 giây. Với mỗi lần hạ gục, thời gian tác dụng của Tốc Hành được kéo dài thêm 6 giây và hiệu ứng được làm mới, tối đa bằng mức ban đầu.`,
    tags: [`MOBILITY`, `CHASE`, `ESCAPE`],
    goodFor: [`EXTENDED_FIGHT`, `ROAMING`, `CHASE`],
    badFor: [`ANTI_BURST`],
  },
  {
    key: `heal`,
    name: `Heal`,
    nameVi: `Hồi Máu`,
    description: `Restore 110 Health (110–400) to you and the most wounded nearby allied champion, and grant both of you 30% bonus Movement Speed for 2 seconds. Healing is halved for champions recently affected by Heal.`,
    descriptionVi: `Hồi 110 Máu, tăng dần đến 400 theo cấp, cho bản thân và tướng đồng minh thấp máu nhất ở gần. Cả hai được tăng 30% Tốc Độ Di Chuyển trong 2 giây. Hiệu quả hồi máu bị giảm một nửa đối với tướng vừa chịu tác dụng của Hồi Máu.`,
    tags: [`HEALING`, `UTILITY`, `MOVEMENT_SPEED`],
    goodFor: [`DUO_LANE`, `SURVIVABILITY`, `TEAM_SUPPORT`],
    badFor: [`ANTI_HEAL`, `BURST_DAMAGE`],
  },
  {
    key: `barrier`,
    name: `Barrier`,
    nameVi: `Lá Chắn`,
    description: `Gain a shield that absorbs 120 damage, scaling up to 560, for 2.5 seconds.`,
    descriptionVi: `Nhận một Lá Chắn hấp thụ 120 sát thương, tăng dần đến 560 theo cấp, trong 2.5 giây.`,
    tags: [`SHIELD`, `DEFENSE`, `SURVIVABILITY`],
    goodFor: [`ANTI_BURST`, `LANE_SURVIVAL`, `SQUISHY_CHAMPION`],
    badFor: [`LONG_FIGHT`, `TRUE_DAMAGE`],
  },
  {
    key: `exhaust`,
    name: `Exhaust`,
    nameVi: `Kiệt Sức`,
    description: `Exhaust the target enemy champion, reducing their Movement Speed by 35% and their damage dealt by 40% for 2.5 seconds.`,
    descriptionVi: `Làm kiệt sức tướng địch chỉ định, giảm 35% Tốc Độ Di Chuyển và giảm 40% sát thương chúng gây ra trong 2.5 giây.`,
    tags: [`DAMAGE_REDUCTION`, `SLOW`, `DEFENSE`],
    goodFor: [`ANTI_ASSASSIN`, `ANTI_BURST`, `PEEL`],
    badFor: [`LONG_RANGE_POKE`, `CLEANSE`],
  },
  {
    key: `cleanse`,
    name: `Cleanse`,
    nameVi: `Thanh Tẩy`,
    description: `Remove disables, including summoner spell debuffs, affecting your champion and grant immunity to disables for 0.25 seconds.`,
    descriptionVi: `Loại bỏ các hiệu ứng khống chế, bao gồm cả bùa hại từ phép bổ trợ, đang ảnh hưởng lên tướng của bạn và cho miễn nhiễm khống chế trong 0.25 giây.`,
    tags: [`CLEANSE`, `ANTI_CC`, `DEFENSE`],
    goodFor: [`CROWD_CONTROL`, `PICK_COMPOSITION`, `LANE_SURVIVAL`],
    badFor: [`LOW_CC`, `RAW_DAMAGE`],
  },
  {
    key: `flash`,
    name: `Flash`,
    nameVi: `Tốc Biến`,
    description: `Teleport a short distance forward or towards the aimed direction.`,
    descriptionVi: `Dịch chuyển một khoảng ngắn về phía trước hoặc theo hướng chỉ định.`,
    tags: [`MOBILITY`, `ENGAGE`, `ESCAPE`],
    goodFor: [`PLAYMAKING`, `ESCAPE`, `ENGAGE`],
    badFor: [],
  },
  {
    key: `ignite`,
    name: `Ignite`,
    nameVi: `Thiêu Đốt`,
    description: `Ignite the target enemy champion, dealing 72 true damage, scaling up to 380, over 5 seconds and applying 60% Grievous Wounds for the duration. Grievous Wounds reduces the effectiveness of healing and regeneration effects.`,
    descriptionVi: `Thiêu đốt tướng địch chỉ định, gây 72 Sát Thương Chuẩn, tăng dần đến 380 theo cấp, trong 5 giây và áp dụng 60% Vết Thương Sâu trong suốt thời gian hiệu lực. Vết Thương Sâu làm giảm hiệu quả của các hiệu ứng hồi máu và hồi phục.`,
    tags: [`TRUE_DAMAGE`, `ANTI_HEAL`, `KILL_PRESSURE`],
    goodFor: [`LANE_KILL_PRESSURE`, `ANTI_HEAL`, `BURST_DAMAGE`],
    badFor: [`LONG_RANGE_SAFE_PLAY`, `SHIELDING`],
  },
  {
    key: `smite`,
    name: `Smite`,
    nameVi: `Trừng Phạt`,
    description: `Deal 600 true damage to monsters, epic monsters, or enemy minions. Smiting a monster restores Health. Smite upgrades to Chilling Smite after 3 uses. Jungle Expertise grants bonus gold and experience from monster kills, increases damage against monsters, restores Health after damaging monsters, and restores Mana while in the jungle or river.`,
    descriptionVi: `Gây 600 Sát Thương Chuẩn lên quái, quái khủng hoặc lính địch. Trừng Phạt quái sẽ hồi Máu. Sau 3 lần sử dụng, Trừng Phạt sẽ nâng cấp thành Trừng Phạt Tái Tê. Nội tại Thông Thạo Đi Rừng tăng Vàng và Kinh Nghiệm nhận được từ quái, tăng sát thương lên quái, hồi Máu sau khi gây sát thương lên quái và hồi Năng Lượng khi ở trong rừng hoặc sông.`,
    tags: [`JUNGLE`, `TRUE_DAMAGE`, `OBJECTIVE_CONTROL`],
    goodFor: [`JUNGLE_CLEAR`, `OBJECTIVE_CONTROL`, `EPIC_MONSTER`],
    badFor: [`NON_JUNGLE_ROLE`],
  },
  {
    key: `teleport`,
    name: `Teleport`,
    nameVi: `Dịch Chuyển`,
    description: `After channeling for 3.5 seconds, teleport your champion to an allied champion, structure, or ward, excluding areas in range of enemy inhibitors. You can only teleport to structures during the first 6 minutes of the game.`,
    descriptionVi: `Sau khi vận trong 3.5 giây, dịch chuyển tướng của bạn đến một tướng, công trình hoặc mắt đồng minh, ngoại trừ các khu vực trong phạm vi nhà lính của đối phương. Trong 6 phút đầu trận, bạn chỉ có thể dịch chuyển đến công trình.`,
    tags: [`MAP_PRESSURE`, `ROAMING`, `MACRO`],
    goodFor: [`SPLIT_PUSH`, `MAP_PRESSURE`, `SIDE_LANE`],
    badFor: [`EARLY_COMBAT`, `LANE_KILL_PRESSURE`],
  },
];

export async function seedSpells(prisma: PrismaClient) {
  console.log(`SEEDING SPELLS...`);
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

  console.log(`SEEDED SPELLS`);
}
