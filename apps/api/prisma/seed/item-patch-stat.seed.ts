import { PrismaClient } from '../../src/generated/prisma/client.js';

type ItemPatchStatSeed = {
  key: string;
  cost?: number;
  abilityPower?: number;
  attackDamage?: number;
  health?: number;
  mana?: number;
  abilityHaste?: number;
  critRate?: number;
  attackSpeed?: number;
  armorPenetration?: number;
  magicPenetration?: number;
  antiHealValue?: number;
  shieldPower?: number;
  movementSpeed?: number;
  magicVamp?: number;
  manaRegen?: number;
  healShieldPower?: number;
  effectDescription?: string;
};

const itemPatchStatSeeds: ItemPatchStatSeed[] = [
  // LOW TIER
  {
    key: 'sapphire-crystal',
    cost: 500,
    mana: 100,
    abilityHaste: 5,
    effectDescription:
      'Nạp Năng Lượng: Tăng Năng Lượng tối đa thêm 5 mỗi lần sử dụng Năng Lượng. Tối đa 250 Năng Lượng.',
  },
  {
    key: 'ruby-crystal',
    cost: 500,
    health: 150,
  },
  {
    key: 'amplifying-tome',
    cost: 500,
    abilityPower: 25,
  },
  {
    key: 'ring-of-revelation',
    cost: 400,
    abilityHaste: 10,
  },
  {
    key: 'dagger',
    cost: 500,
    attackDamage: 12,
  },

  // MIDDLE TIER
  {
    key: 'mejais-soulstealer',
    cost: 1800,
    health: 70,
    abilityPower: 25,
    magicPenetration: 7,
    movementSpeed: 10,
    effectDescription:
      'Vinh Quang: Nhận tối đa 30 cộng dồn khi tham gia hạ gục tướng. Hoảng Sợ: Nhận 5 Sức Mạnh Phép Thuật với mỗi cộng dồn. Khi đạt ít nhất 10 cộng dồn, nhận 10% Tốc Độ Di Chuyển.',
  },
  {
    key: 'tear-of-the-goddess',
    cost: 900,
    mana: 300,
    abilityHaste: 10,
    effectDescription:
      'Kinh Ngạc: 10% Năng Lượng sử dụng được hồi lại. Nạp Năng Lượng: Tăng Năng Lượng tối đa thêm 7 mỗi lần sử dụng Năng Lượng. Tối đa 700 Năng Lượng.',
  },
  {
    key: 'aether-wisp',
    cost: 950,
    movementSpeed: 5,
    effectDescription: 'Linh Hồn: +5% Tốc Độ Di Chuyển.',
  },
  {
    key: 'lost-chapter',
    cost: 900,
    abilityPower: 30,
    mana: 200,
  },
  {
    key: 'fiendish-codex',
    cost: 1000,
    abilityPower: 35,
    abilityHaste: 10,
  },
  {
    key: 'blasting-wand',
    cost: 800,
    abilityPower: 40,
  },
  {
    key: 'needlessly-large-rod',
    cost: 1500,
    abilityPower: 60,
  },
  {
    key: 'haunting-guise',
    cost: 900,
    health: 100,
    abilityPower: 30,
  },
  {
    key: 'catalyst-of-aeons',
    cost: 1100,
    health: 200,
    mana: 300,
    effectDescription:
      'Vĩnh Hằng: Hồi Năng Lượng tương đương 15% sát thương nhận vào từ tướng địch. Hồi Máu tương đương 20% Năng Lượng sử dụng. Tối đa 15 Máu mỗi lần.',
  },
  {
    key: 'sheen',
    cost: 800,
    abilityHaste: 10,
    effectDescription:
      'Kiếm Phép: Sau khi sử dụng kỹ năng, đòn đánh thường kế tiếp trong 10 giây gây thêm sát thương vật lý tương đương 100% Sức Mạnh Công Kích cơ bản.',
  },
  {
    key: 'oblivion-orb',
    cost: 900,
    abilityPower: 35,
    antiHealValue: 40,
    effectDescription:
      'Vết Thương Sâu: Gây sát thương phép lên tướng địch khiến chúng nhận 40% Vết Thương Sâu trong 3 giây.',
  },
  {
    key: 'prophets-pendant',
    cost: 1000,
    abilityPower: 30,
    magicPenetration: 12,
    effectDescription: 'Điềm Gở: +12 Xuyên Kháng Phép.',
  },
  {
    key: 'hextech-alternator',
    cost: 1400,
    health: 150,
    abilityPower: 25,
    effectDescription:
      'Khởi Động: Kỹ năng gây sát thương và đòn đánh cường hóa lên tướng gây thêm 25-60 sát thương phép. 20 giây hồi chiêu.',
  },
  {
    key: 'forbidden-idol',
    cost: 900,
    health: 100,
    manaRegen: 25,
    abilityHaste: 10,
    healShieldPower: 4,
  },
  {
    key: 'nashors-talon',
    cost: 800,
    abilityPower: 30,
    attackDamage: 15,
    effectDescription:
      'Mũi Kim Ma Thuật: Nhận 15 Sức Mạnh Công Kích hoặc 30 Sức Mạnh Phép Thuật thích ứng.',
  },
  {
    key: 'stinger',
    cost: 1200,
    attackSpeed: 30,
    abilityHaste: 10,
  },
  {
    key: 'kindlegem',
    cost: 1000,
    health: 175,
    abilityHaste: 10,
  },
  {
    key: 'recurve-bow',
    cost: 1400,
    effectDescription:
      'Cường Lực: Các đòn đánh cơ bản gây thêm 15 sát thương vật lý trên đòn đánh đối với mục tiêu.',
  },
  {
    key: 'giants-belt',
    cost: 1000,
    health: 300,
  },

  // HIGH TIER
  {
    key: 'rabadons-deathcap',
    cost: 3400,
    abilityPower: 100,
    magicPenetration: 7,
    effectDescription:
      'Quá Đà: Tăng Sức Mạnh Phép Thuật thêm 20-45% tùy theo cấp.',
  },
  {
    key: 'ludens-echo',
    cost: 2900,
    abilityPower: 85,
    mana: 300,
    abilityHaste: 20,
    magicPenetration: 7,
    effectDescription:
      'Vọng Âm Bất Hòa: Khi đạt đủ 100 điểm Bất Hòa, kỹ năng gây sát thương tiếp theo hoặc đòn tấn công được cường hóa gây thêm 110 sát thương phép + 10% Sức Mạnh Phép Thuật lên mục tiêu và tối đa 3 kẻ địch xung quanh.',
  },
  {
    key: 'morellonomicon',
    cost: 2600,
    abilityPower: 75,
    health: 150,
    abilityHaste: 20,
    magicPenetration: 7,
    antiHealValue: 50,
    effectDescription:
      'Tai Họa: Gây sát thương phép lên tướng địch và tạo hiệu ứng 50% Vết Thương Sâu trong 3 giây.',
  },
  {
    key: 'rylais-crystal-scepter',
    cost: 2700,
    abilityPower: 65,
    health: 300,
    magicPenetration: 7,
    effectDescription:
      'Băng Giá: Kỹ năng kích hoạt gây sát thương và đòn tấn công được cường hóa làm chậm kẻ địch 30% trong 0.75 giây.',
  },
  {
    key: 'liandrys-torment',
    cost: 3000,
    abilityPower: 75,
    health: 250,
    magicPenetration: 7,
    effectDescription:
      'Thống Khổ: Kỹ năng gây sát thương và đòn đánh được cường hóa gây 0.6%-3% Máu Tối Đa của mục tiêu thành sát thương phép mỗi giây trong 3 giây.',
  },
  {
    key: 'rod-of-ages',
    cost: 2800,
    abilityPower: 60,
    health: 250,
    mana: 300,
    magicPenetration: 7,
    effectDescription:
      'Vĩnh Hằng: Hồi Năng Lượng từ sát thương nhận vào và hồi Máu từ Năng Lượng sử dụng. Cựu Binh: Mỗi cộng dồn tăng 25 Máu, 10 Năng Lượng và 6 Sức Mạnh Phép Thuật. Tối đa 10 cộng dồn.',
  },
  {
    key: 'lich-bane',
    cost: 2800,
    abilityPower: 80,
    magicPenetration: 7,
    abilityHaste: 10,
    movementSpeed: 5,
    effectDescription:
      'Tai Ương: +5% Tốc Độ Di Chuyển. Kiếm Phép: Sau khi sử dụng kỹ năng, đòn đánh thường kế tiếp gây thêm sát thương phép bằng 75% Sức Mạnh Công Kích cơ bản + 50% Sức Mạnh Phép Thuật.',
  },
  {
    key: 'archangels-staff',
    cost: 2950,
    abilityPower: 35,
    magicPenetration: 7,
    mana: 500,
    abilityHaste: 20,
    effectDescription:
      'Kinh Ngạc: Tăng Sức Mạnh Phép Thuật tương đương 1% Năng Lượng tối đa và hồi lại 25% tổng Năng Lượng tiêu hao. Nạp Năng Lượng: Tăng Năng Lượng tối đa thêm 18 mỗi lần sử dụng Năng Lượng, tối đa 700, sau đó biến đổi thành Seraph’s Embrace.',
  },
  {
    key: 'nashors-tooth',
    cost: 2800,
    attackSpeed: 45,
    abilityHaste: 20,
    abilityPower: 50,
    attackDamage: 25,
    effectDescription:
      'Nanh Ma Thuật: Nhận 25 Sức Mạnh Công Kích hoặc 50 Sức Mạnh Phép Thuật thích ứng. Gặm Nhấm: Đòn đánh gây sát thương thích ứng trên đòn đánh.',
  },
  {
    key: 'infinity-orb',
    cost: 2900,
    abilityPower: 80,
    magicPenetration: 7,
    movementSpeed: 5,
    effectDescription:
      'Định Mệnh: +5% Tốc Độ Di Chuyển. Cân Bằng: +15 Xuyên Kháng Phép. Tử Thần Cận Kề: Kỹ năng và đòn tấn công được cường hóa gây thêm 20% Chí Mạng lên kẻ địch dưới 35% Máu. Tia Sét Trời Giáng: Khi mục tiêu bị hạ gục trong 3 giây sau khi bị áp dụng hiệu ứng, gây sát thương phép xung quanh.',
  },
  {
    key: 'crown-of-the-shattered-queen',
    cost: 3000,
    abilityPower: 60,
    magicPenetration: 7,
    mana: 200,
    abilityHaste: 20,
    effectDescription:
      'Hộ Thể: Chặn kỹ năng gây hại tiếp theo. Sau khi khiên vỡ, giảm sát thương nhận phải 40% trong 1 giây. Điềm Tĩnh: Tăng thêm 20 Sức Mạnh Phép Thuật khi có Hộ Thể.',
  },
  {
    key: 'cosmic-drive',
    cost: 3000,
    abilityPower: 75,
    magicPenetration: 7,
    abilityHaste: 30,
    movementSpeed: 5,
    effectDescription:
      'Siêu Động Cơ: +5% Tốc Độ Di Chuyển. Pháp Vũ Đồng Hành: Gây sát thương bằng kỹ năng kích hoạt hoặc đòn đánh cường hóa lên tướng địch tăng Tốc Độ Di Chuyển dựa trên Điểm Hồi Kỹ Năng từ trang bị.',
  },
  {
    key: 'riftmaker',
    cost: 3200,
    abilityPower: 80,
    health: 150,
    abilityHaste: 15,
    magicPenetration: 7,
    magicVamp: 11,
    effectDescription:
      'Đồng Hóa: +11% Hút Máu Phép. Tha Hóa Hư Không: Khi giao tranh với tướng địch, nhận cộng dồn tăng sát thương phép. Ở cộng dồn tối đa, sát thương phép tăng thêm trở thành sát thương chuẩn.',
  },
  {
    key: 'oceanids-trident',
    cost: 2600,
    health: 200,
    abilityPower: 75,
    magicPenetration: 7,
    shieldPower: 60,
    effectDescription:
      'Vũ Khí Chết Chóc: Gây sát thương bằng kỹ năng lên tướng địch làm giảm lượng lá chắn chúng nhận được trong 3 giây. Kỹ năng diện rộng tối đa 45%, kỹ năng đơn mục tiêu tối đa 60%.',
  },
  {
    key: 'horizon-focus',
    cost: 2900,
    abilityPower: 80,
    abilityHaste: 20,
    magicPenetration: 7,
    effectDescription:
      'Bộc Phát: Gây sát thương lên tướng địch bằng kỹ năng từ tầm xa 600 đơn vị làm lộ diện chúng trong 8 giây và tăng sát thương gây lên chúng thêm 9%. Tập Trung: Làm lộ diện tướng địch quanh mục tiêu.',
  },
  {
    key: 'psychic-projector',
    cost: 3200,
    health: 300,
    abilityPower: 60,
    magicPenetration: 7,
    abilityHaste: 15,
    effectDescription:
      'Chuyển Hóa: Nhận Sức Mạnh Phép Thuật tương đương 3.5% Máu cộng thêm. Ảo Ảnh: Khi có ít nhất 950 Máu cộng thêm, nhận một phần Sức Mạnh Phép Thuật dưới dạng Giáp và Kháng Phép.',
  },
  {
    key: 'awakened-soulstealer',
    cost: 3000,
    health: 150,
    abilityPower: 65,
    magicPenetration: 15,
    abilityHaste: 20,
    effectDescription:
      'Săn Hồn: +15 Xuyên Kháng Phép. Linh Hồn Lang Thang: Khi tham gia hạ gục tướng địch sau khi gây sát thương, thời gian hồi chiêu được giảm 25%, đánh cắp Tốc Độ Di Chuyển cơ bản và Điểm Hồi Kỹ Năng của chúng cho đến khi chúng hồi sinh.',
  },
  {
    key: 'malignance',
    cost: 2900,
    abilityPower: 80,
    magicPenetration: 7,
    mana: 400,
    abilityHaste: 20,
    effectDescription:
      'Ai Oán: Chiêu Cuối nhận 20 Điểm Hồi Kỹ Năng. Màn Sương Căm Hận: Gây sát thương lên tướng bằng Chiêu Cuối thiêu đốt mặt đất dưới chân chúng và giảm Kháng Phép của chúng đi 10.',
  },
  {
    key: 'bandle-fantasy',
    cost: 3000,
    abilityPower: 85,
    magicPenetration: 7,
    mana: 300,
    abilityHaste: 20,
    effectDescription:
      'Bẫy Lửa: Gây sát thương lên tướng địch bằng kỹ năng kích hoạt tạo bẫy dưới chân chúng. Sau thời gian ngắn, bẫy gây 105 + 15% Sức Mạnh Phép Thuật sát thương phép.',
  },
  {
    key: 'guinsoos-rageblade',
    cost: 3100,
    attackSpeed: 30,
    movementSpeed: 5,
    abilityPower: 50,
    attackDamage: 25,
    effectDescription:
      'Xung Điện: +5% Tốc Độ Di Chuyển. Hỗn Loạn: Nhận 25 Sức Mạnh Công Kích hoặc 50 Sức Mạnh Phép Thuật thích ứng. Thịnh Nộ: Đòn đánh gây thêm sát thương phép nhưng không thể Chí Mạng. Nhát Chém Cuồng Nộ: Đòn đánh thường tăng Tốc Độ Đánh, cộng dồn tối đa 4 lần.',
  },
];

export async function seedItemPatchStats(
  prisma: PrismaClient,
  patchId: string,
) {
  console.log('SEEDING ITEMS PATCH STATS...');

  for (const patchStatSeed of itemPatchStatSeeds) {
    const item = await prisma.item.findUnique({
      where: {
        key: patchStatSeed.key,
      },
    });

    if (!item) {
      throw new Error(
        `Cannot seed item patch stat. Missing item: ${patchStatSeed.key}`,
      );
    }

    await prisma.itemPatchStat.upsert({
      where: {
        patchId_itemId: {
          patchId,
          itemId: item.id,
        },
      },
      update: {
        cost: patchStatSeed.cost,
        abilityPower: patchStatSeed.abilityPower,
        attackDamage: patchStatSeed.attackDamage,
        health: patchStatSeed.health,
        mana: patchStatSeed.mana,
        abilityHaste: patchStatSeed.abilityHaste,
        critRate: patchStatSeed.critRate,
        attackSpeed: patchStatSeed.attackSpeed,
        armorPenetration: patchStatSeed.armorPenetration,
        magicPenetration: patchStatSeed.magicPenetration,
        antiHealValue: patchStatSeed.antiHealValue,
        shieldPower: patchStatSeed.shieldPower,
        movementSpeed: patchStatSeed.movementSpeed,
        magicVamp: patchStatSeed.magicVamp,
        manaRegen: patchStatSeed.manaRegen,
        healShieldPower: patchStatSeed.healShieldPower,
        effectDescription: patchStatSeed.effectDescription,
      },
      create: {
        patchId,
        itemId: item.id,
        cost: patchStatSeed.cost,
        abilityPower: patchStatSeed.abilityPower,
        attackDamage: patchStatSeed.attackDamage,
        health: patchStatSeed.health,
        mana: patchStatSeed.mana,
        abilityHaste: patchStatSeed.abilityHaste,
        critRate: patchStatSeed.critRate,
        attackSpeed: patchStatSeed.attackSpeed,
        armorPenetration: patchStatSeed.armorPenetration,
        magicPenetration: patchStatSeed.magicPenetration,
        antiHealValue: patchStatSeed.antiHealValue,
        shieldPower: patchStatSeed.shieldPower,
        movementSpeed: patchStatSeed.movementSpeed,
        magicVamp: patchStatSeed.magicVamp,
        manaRegen: patchStatSeed.manaRegen,
        healShieldPower: patchStatSeed.healShieldPower,
        effectDescription: patchStatSeed.effectDescription,
      },
    });

    console.log(`SEEDED ITEM PATCH STAT: ${patchStatSeed.key}`);
  }
}
