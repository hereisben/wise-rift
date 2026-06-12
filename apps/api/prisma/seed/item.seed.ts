import { PrismaClient } from '../../src/generated/prisma/client.js';
import { ItemCategory } from './../../dist/src/generated/prisma/enums.js';

type ItemSeed = {
  key: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  category: ItemCategory[];
  tags: string[];
  goodAgainst: string[];
  weakAgainst: string[];
  componentItemKeys?: string[];
  buildsIntoItemKeys?: string[];
};

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

const itemSeeds: ItemSeed[] = [
  // LOW TIER
  {
    key: 'sapphire-crystal',
    name: 'Sapphire Crystal',
    nameVi: 'Lam Ngọc',
    description:
      'Basic mana component. Grants mana and ability haste, and stacks bonus mana when spending mana.',
    descriptionVi:
      'Trang bị thành phần cung cấp Năng Lượng và Điểm Hồi Kỹ Năng. Nạp Năng Lượng tăng Năng Lượng tối đa khi sử dụng Năng Lượng.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['MANA', 'ABILITY_HASTE', 'SCALING_MANA'],
    goodAgainst: [],
    weakAgainst: [],
    buildsIntoItemKeys: ['tear-of-the-goddess'],
  },
  {
    key: 'ruby-crystal',
    name: 'Ruby Crystal',
    nameVi: 'Hồng Ngọc',
    description: 'Basic health component.',
    descriptionVi: 'Trang bị thành phần cung cấp Máu Tối Đa.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['HEALTH'],
    goodAgainst: ['BURST_DAMAGE'],
    weakAgainst: [],
    buildsIntoItemKeys: [
      'catalyst-of-aeons',
      'hextech-alternator',
      'kindlegem',
      'liandrys-torment',
    ],
  },
  {
    key: 'amplifying-tome',
    name: 'Amplifying Tome',
    nameVi: 'Sách Cũ',
    description: 'Basic ability power component.',
    descriptionVi: 'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['ABILITY_POWER', 'MAGIC_DAMAGE'],
    goodAgainst: [],
    weakAgainst: [],
    buildsIntoItemKeys: [
      'mejais-soulstealer',
      'aether-wisp',
      'lost-chapter',
      'fiendish-codex',
      'blasting-wand',
      'needlessly-large-rod',
      'haunting-guise',
      'oblivion-orb',
      'prophets-pendant',
      'hextech-alternator',
      'psychic-projector',
    ],
  },
  {
    key: 'ring-of-revelation',
    name: 'Ring of Revelation',
    nameVi: 'Nhẫn Thiên Khải',
    description: 'Basic ability haste component.',
    descriptionVi: 'Trang bị thành phần cung cấp Điểm Hồi Kỹ Năng.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['ABILITY_HASTE'],
    goodAgainst: [],
    weakAgainst: [],
    buildsIntoItemKeys: [
      'ludens-echo',
      'archangels-staff',
      'crown-of-the-shattered-queen',
      'horizon-focus',
      'malignance',
      'bandle-fantasy',
      'forbidden-idol',
      'sheen',
    ],
  },
  {
    key: 'dagger',
    name: 'Dagger',
    nameVi: 'Dao Găm',
    description: 'Basic attack damage component.',
    descriptionVi: 'Trang bị thành phần cung cấp Sức Mạnh Công Kích.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['ATTACK_DAMAGE'],
    goodAgainst: [],
    weakAgainst: [],
    buildsIntoItemKeys: ['stinger', 'recurve-bow'],
  },

  // MIDDLE TIER
  {
    key: 'mejais-soulstealer',
    name: "Mejai's Soulstealer",
    nameVi: 'Sách Chiêu Hồn Mejai',
    description:
      'Snowball magic item that gains Glory stacks from champion takedowns and loses stacks on death.',
    descriptionVi:
      'Vinh Quang: Nhận tối đa 30 cộng dồn khi tham gia hạ gục tướng. Bị mất 10 cộng dồn khi hy sinh. Hoảng Sợ: Nhận Sức Mạnh Phép Thuật theo cộng dồn và nhận thêm Tốc Độ Di Chuyển khi đạt ít nhất 10 cộng dồn.',
    category: [ItemCategory.MIDDLE_TIER, ItemCategory.MAGIC],
    tags: ['ABILITY_POWER', 'MAGIC_PENETRATION', 'SNOWBALL', 'MOVEMENT_SPEED'],
    goodAgainst: ['LOW_CC', 'LOW_BURST', 'SNOWBALL_GAME'],
    weakAgainst: ['ASSASSIN', 'BURST_DAMAGE', 'PICK_COMPOSITION'],
    componentItemKeys: ['amplifying-tome'],
  },
  {
    key: 'tear-of-the-goddess',
    name: 'Tear of the Goddess',
    nameVi: 'Nước Mắt Nữ Thần',
    description:
      'Mana scaling component that increases maximum mana when spending mana.',
    descriptionVi:
      'Kinh Ngạc: Hồi lại một phần Năng Lượng đã sử dụng. Nạp Năng Lượng: Tăng Năng Lượng tối đa khi sử dụng Năng Lượng, tối đa 700.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['MANA', 'ABILITY_HASTE', 'SCALING_MANA'],
    goodAgainst: ['LONG_FIGHT', 'MANA_HUNGRY_CHAMPION'],
    weakAgainst: ['EARLY_BURST'],
    componentItemKeys: ['sapphire-crystal'],
    buildsIntoItemKeys: ['archangels-staff'],
  },
  {
    key: 'aether-wisp',
    name: 'Aether Wisp',
    nameVi: 'Linh Hồn Lạc Lõng',
    description: 'Magic component that grants movement speed.',
    descriptionVi: 'Linh Hồn: Nhận thêm Tốc Độ Di Chuyển.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['MOVEMENT_SPEED', 'ABILITY_POWER'],
    goodAgainst: ['SKILL_SHOT', 'POKE'],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome'],
    buildsIntoItemKeys: ['lich-bane', 'infinity-orb', 'cosmic-drive'],
  },
  {
    key: 'lost-chapter',
    name: 'Lost Chapter',
    nameVi: 'Bí Chương Thất Truyền',
    description: 'Mana and ability power component.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật và Năng Lượng Tối Đa.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MANA'],
    goodAgainst: ['MANA_HUNGRY_CHAMPION'],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome'],
    buildsIntoItemKeys: [
      'ludens-echo',
      'archangels-staff',
      'crown-of-the-shattered-queen',
      'malignance',
      'bandle-fantasy',
    ],
  },
  {
    key: 'fiendish-codex',
    name: 'Fiendish Codex',
    nameVi: 'Sách Quỷ',
    description: 'Ability power and ability haste component.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật và Điểm Hồi Kỹ Năng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'ABILITY_HASTE'],
    goodAgainst: ['ABILITY_RELIANT_CHAMPION'],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome'],
    buildsIntoItemKeys: [
      'morellonomicon',
      'crown-of-the-shattered-queen',
      'cosmic-drive',
      'riftmaker',
      'horizon-focus',
      'awakened-soulstealer',
      'malignance',
    ],
  },
  {
    key: 'blasting-wand',
    name: 'Blasting Wand',
    nameVi: 'Gậy Bùng Nổ',
    description: 'Ability power component.',
    descriptionVi: 'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_DAMAGE'],
    goodAgainst: [],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome'],
    buildsIntoItemKeys: [
      'rabadons-deathcap',
      'ludens-echo',
      'rylais-crystal-scepter',
      'liandrys-torment',
      'rod-of-ages',
      'oceanids-trident',
      'horizon-focus',
      'bandle-fantasy',
    ],
  },
  {
    key: 'needlessly-large-rod',
    name: 'Needlessly Large Rod',
    nameVi: 'Gậy Quá Khổ',
    description: 'Large ability power component.',
    descriptionVi:
      'Trang bị thành phần cung cấp lượng lớn Sức Mạnh Phép Thuật.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_DAMAGE'],
    goodAgainst: [],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome'],
    buildsIntoItemKeys: ['rabadons-deathcap'],
  },
  {
    key: 'haunting-guise',
    name: 'Haunting Guise',
    nameVi: 'Mặt Nạ Ma Ám',
    description: 'Health and ability power component.',
    descriptionVi:
      'Trang bị thành phần cung cấp Máu Tối Đa và Sức Mạnh Phép Thuật.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'HEALTH'],
    goodAgainst: ['BURST_DAMAGE'],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome'],
    buildsIntoItemKeys: [
      'liandrys-torment',
      'oceanids-trident',
      'psychic-projector',
    ],
  },
  {
    key: 'catalyst-of-aeons',
    name: 'Catalyst of Aeons',
    nameVi: 'Đá Vĩnh Hằng',
    description:
      'Health and mana component that restores mana from damage taken and health from mana spent.',
    descriptionVi:
      'Vĩnh Hằng: Hồi lại Năng Lượng dựa trên sát thương nhận vào từ tướng địch. Hồi Máu dựa trên Năng Lượng sử dụng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'MANA', 'SUSTAIN'],
    goodAgainst: ['POKE', 'LONG_FIGHT'],
    weakAgainst: ['BURST_DAMAGE'],
    componentItemKeys: ['ruby-crystal'],
    buildsIntoItemKeys: ['rod-of-ages'],
  },
  {
    key: 'sheen',
    name: 'Sheen',
    nameVi: 'Thủy Kiếm',
    description:
      'Ability haste component with Spellblade effect after using an ability.',
    descriptionVi:
      'Kiếm Phép: Sau khi sử dụng kỹ năng, đòn đánh thường kế tiếp gây thêm sát thương vật lý dựa trên Sức Mạnh Công Kích cơ bản.',
    category: [ItemCategory.MIDDLE_TIER, ItemCategory.COMPONENT],
    tags: ['ABILITY_HASTE', 'SPELLBLADE', 'ON_HIT'],
    goodAgainst: ['MELEE_TRADING', 'SPELLBLADE_CHAMPION'],
    weakAgainst: ['DISENGAGE'],
    componentItemKeys: ['ring-of-revelation'],
    buildsIntoItemKeys: ['lich-bane'],
  },
  {
    key: 'oblivion-orb',
    name: 'Oblivion Orb',
    nameVi: 'Ngọc Quên Lãng',
    description:
      'Magic component that applies Grievous Wounds when dealing magic damage to enemy champions.',
    descriptionVi:
      'Vết Thương Sâu: Gây sát thương phép lên tướng địch khiến chúng nhận 40% Vết Thương Sâu trong 3 giây.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'ANTI_HEAL', 'MAGIC_DAMAGE'],
    goodAgainst: ['HEALING', 'SUSTAIN'],
    weakAgainst: ['NO_HEALING_TEAM'],
    componentItemKeys: ['amplifying-tome'],
    buildsIntoItemKeys: ['morellonomicon'],
  },
  {
    key: 'prophets-pendant',
    name: "Prophet's Pendant",
    nameVi: 'Dây Chuyền Tiên Tri',
    description: 'Magic component that grants flat magic penetration.',
    descriptionVi: 'Điềm Gở: Nhận thêm Xuyên Kháng Phép.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_PENETRATION'],
    goodAgainst: ['LOW_MAGIC_RESIST'],
    weakAgainst: ['HIGH_MAGIC_RESIST'],
    componentItemKeys: ['amplifying-tome'],
    buildsIntoItemKeys: ['infinity-orb', 'awakened-soulstealer'],
  },
  {
    key: 'hextech-alternator',
    name: 'Hextech Alternator',
    nameVi: 'Máy Chuyển Pha Hextech',
    description:
      'Health and ability power component that adds bonus magic damage after damaging enemy champions.',
    descriptionVi:
      'Khởi Động: Kỹ năng gây sát thương và đòn đánh cường hóa lên tướng gây thêm sát thương phép.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'HEALTH', 'BURST_DAMAGE'],
    goodAgainst: ['SQUISHY_CHAMPION'],
    weakAgainst: ['HIGH_MAGIC_RESIST'],
    componentItemKeys: ['ruby-crystal', 'amplifying-tome'],
    buildsIntoItemKeys: ['riftmaker'],
  },
  {
    key: 'forbidden-idol',
    name: 'Forbidden Idol',
    nameVi: 'Dị Vật Tai Ương',
    description:
      'Utility component that grants health, mana regeneration, ability haste, and heal/shield power.',
    descriptionVi:
      'Trang bị hỗ trợ cung cấp Máu, Hồi Phục Năng Lượng, Điểm Hồi Kỹ Năng và Sức mạnh Hồi Máu/Lá Chắn.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.SUPPORT,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'MANA_REGEN', 'ABILITY_HASTE', 'HEAL_SHIELD_POWER'],
    goodAgainst: ['POKE', 'SUSTAIN_TEAM'],
    weakAgainst: ['BURST_DAMAGE'],
    componentItemKeys: ['ring-of-revelation'],
  },
  {
    key: 'nashors-talon',
    name: "Nashor's Talon",
    nameVi: 'Vuốt Nashor',
    description: 'Adaptive damage component.',
    descriptionVi:
      'Mũi Kim Ma Thuật: Nhận Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật thích ứng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ADAPTIVE_DAMAGE', 'ON_HIT'],
    goodAgainst: ['ON_HIT_CHAMPION'],
    weakAgainst: [],
    buildsIntoItemKeys: ['nashors-tooth', 'guinsoos-rageblade'],
  },
  {
    key: 'stinger',
    name: 'Stinger',
    nameVi: 'Kiếm Chích',
    description: 'Attack speed and ability haste component.',
    descriptionVi:
      'Trang bị thành phần cung cấp Tốc Độ Đánh và Điểm Hồi Kỹ Năng.',
    category: [ItemCategory.MIDDLE_TIER, ItemCategory.COMPONENT],
    tags: ['ATTACK_SPEED', 'ABILITY_HASTE'],
    goodAgainst: ['ON_HIT_CHAMPION'],
    weakAgainst: [],
    componentItemKeys: ['dagger'],
  },
  {
    key: 'kindlegem',
    name: 'Kindlegem',
    nameVi: 'Hỏa Ngọc',
    description: 'Health and ability haste component.',
    descriptionVi:
      'Trang bị thành phần cung cấp Máu Tối Đa và Điểm Hồi Kỹ Năng.',
    category: [ItemCategory.MIDDLE_TIER, ItemCategory.COMPONENT],
    tags: ['HEALTH', 'ABILITY_HASTE'],
    goodAgainst: ['BURST_DAMAGE'],
    weakAgainst: [],
    componentItemKeys: ['ruby-crystal'],
    buildsIntoItemKeys: ['psychic-projector'],
  },
  {
    key: 'recurve-bow',
    name: 'Recurve Bow',
    nameVi: 'Cung Gỗ',
    description: 'Attack component that adds bonus on-hit physical damage.',
    descriptionVi:
      'Cường Lực: Các đòn đánh cơ bản gây thêm sát thương vật lý trên đòn đánh.',
    category: [ItemCategory.MIDDLE_TIER, ItemCategory.COMPONENT],
    tags: ['ON_HIT', 'ATTACK_SPEED'],
    goodAgainst: ['AUTO_ATTACK_CHAMPION', 'ON_HIT_CHAMPION'],
    weakAgainst: ['ANTI_ATTACK_SPEED'],
    componentItemKeys: ['dagger'],
    buildsIntoItemKeys: ['nashors-tooth', 'guinsoos-rageblade'],
  },
  {
    key: 'giants-belt',
    name: "Giant's Belt",
    nameVi: 'Đai Khổng Lồ',
    description: 'Large health component.',
    descriptionVi: 'Trang bị thành phần cung cấp lượng lớn Máu Tối Đa.',
    category: [ItemCategory.MIDDLE_TIER, ItemCategory.COMPONENT],
    tags: ['HEALTH'],
    goodAgainst: ['BURST_DAMAGE'],
    weakAgainst: [],
    componentItemKeys: ['ruby-crystal'],
    buildsIntoItemKeys: ['rylais-crystal-scepter'],
  },

  // HIGH TIER
  {
    key: 'rabadons-deathcap',
    name: "Rabadon's Deathcap",
    nameVi: 'Mũ Phù Thủy Rabadon',
    description:
      'High ability power item that greatly increases total ability power based on level.',
    descriptionVi: 'Quá Đà: Tăng Sức Mạnh Phép Thuật thêm 20-45% tùy theo cấp.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: ['ABILITY_POWER', 'MAGIC_PENETRATION', 'SCALING', 'BURST_DAMAGE'],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_MAGIC_RESIST'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'EARLY_GAME_PRESSURE'],
    componentItemKeys: ['blasting-wand', 'needlessly-large-rod'],
  },
  {
    key: 'ludens-echo',
    name: "Luden's Echo",
    nameVi: 'Vọng Âm Luden',
    description:
      'Burst and poke magic item that charges Discord through movement and ability use.',
    descriptionVi:
      'Vọng Âm Bất Hòa: Di chuyển và sử dụng kỹ năng tăng điểm Bất Hòa. Khi đạt đủ 100 điểm, kỹ năng gây sát thương tiếp theo hoặc đòn tấn công được cường hóa gây thêm sát thương phép lên mục tiêu và tối đa 3 kẻ địch xung quanh.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'POKE',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'POKE_COMPOSITION'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'TANK'],
    componentItemKeys: ['lost-chapter', 'blasting-wand', 'ring-of-revelation'],
  },
  {
    key: 'morellonomicon',
    name: 'Morellonomicon',
    nameVi: 'Quỷ Thư Morello',
    description:
      'Anti-heal magic item that applies Grievous Wounds when dealing magic damage.',
    descriptionVi:
      'Tai Họa: Gây sát thương phép lên tướng địch và tạo hiệu ứng 50% Vết Thương Sâu trong 3 giây.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'HEALTH',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'ANTI_HEAL',
    ],
    goodAgainst: ['HEALING', 'SUSTAIN', 'ENCHANTER'],
    weakAgainst: ['NO_HEALING_TEAM'],
    componentItemKeys: ['fiendish-codex', 'oblivion-orb'],
  },
  {
    key: 'rylais-crystal-scepter',
    name: "Rylai's Crystal Scepter",
    nameVi: 'Trượng Pha Lê Rylai',
    description:
      'Magic health item that slows enemies with damaging abilities and empowered attacks.',
    descriptionVi:
      'Băng Giá: Kỹ năng kích hoạt gây sát thương và đòn tấn công được cường hóa làm chậm kẻ địch 30% trong 0.75 giây.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: ['ABILITY_POWER', 'HEALTH', 'MAGIC_PENETRATION', 'SLOW', 'UTILITY'],
    goodAgainst: ['MOBILITY', 'MELEE_CHAMPION', 'LOW_RANGE_CHAMPION'],
    weakAgainst: ['LONG_RANGE_POKE'],
    componentItemKeys: ['blasting-wand', 'giants-belt'],
  },
  {
    key: 'liandrys-torment',
    name: "Liandry's Torment",
    nameVi: 'Mặt Nạ Đọa Đày Liandry',
    description:
      'Anti-tank burn item that deals magic damage based on the target maximum health.',
    descriptionVi:
      'Thống Khổ: Kỹ năng gây sát thương và đòn đánh được cường hóa gây sát thương phép theo Máu Tối Đa của mục tiêu mỗi giây trong 3 giây.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'HEALTH',
      'MAGIC_PENETRATION',
      'ANTI_TANK',
      'BURN_DAMAGE',
    ],
    goodAgainst: ['TANK', 'HIGH_HEALTH', 'FRONTLINE'],
    weakAgainst: ['SQUISHY_CHAMPION', 'BURST_DAMAGE'],
    componentItemKeys: ['blasting-wand', 'haunting-guise', 'ruby-crystal'],
  },
  {
    key: 'rod-of-ages',
    name: 'Rod of Ages',
    nameVi: 'Trượng Trường Sinh',
    description:
      'Scaling magic item that grants health, mana, and ability power over time.',
    descriptionVi:
      'Vĩnh Hằng: Hồi Năng Lượng từ sát thương nhận vào và hồi Máu từ Năng Lượng sử dụng. Cựu Binh: Tăng Máu, Năng Lượng và Sức Mạnh Phép Thuật theo cộng dồn, tối đa 10 cộng dồn.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'HEALTH',
      'MANA',
      'MAGIC_PENETRATION',
      'SCALING',
      'SUSTAIN',
    ],
    goodAgainst: ['SCALING_GAME', 'POKE', 'LONG_FIGHT'],
    weakAgainst: ['EARLY_BURST', 'FAST_SNOWBALL'],
    componentItemKeys: ['blasting-wand', 'catalyst-of-aeons'],
  },
  {
    key: 'lich-bane',
    name: 'Lich Bane',
    nameVi: 'Kiếm Tai Ương',
    description:
      'Spellblade magic item that empowers the next basic attack after using an ability.',
    descriptionVi:
      'Tai Ương: Nhận thêm Tốc Độ Di Chuyển. Kiếm Phép: Sau khi sử dụng kỹ năng, đòn đánh thường kế tiếp gây thêm sát thương phép dựa trên Sức Mạnh Công Kích cơ bản và Sức Mạnh Phép Thuật.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MAGIC_PENETRATION',
      'ABILITY_HASTE',
      'MOVEMENT_SPEED',
      'SPELLBLADE',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'MELEE_TRADING'],
    weakAgainst: ['DISENGAGE', 'HIGH_MAGIC_RESIST', 'FRONTLINE'],
    componentItemKeys: ['aether-wisp', 'sheen', 'amplifying-tome'],
  },
  {
    key: 'archangels-staff',
    name: "Archangel's Staff",
    nameVi: 'Quyền Trượng Thiên Thần',
    description:
      "Mana scaling magic item that converts maximum mana into ability power and upgrades into Seraph's Embrace.",
    descriptionVi:
      'Kinh Ngạc: Tăng Sức Mạnh Phép Thuật theo Năng Lượng tối đa và hồi lại một phần tổng Năng Lượng tiêu hao. Nạp Năng Lượng: Tăng Năng Lượng tối đa khi sử dụng Năng Lượng và biến đổi thành Quyền Trượng Đại Thiên Sứ.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'SCALING_MANA',
    ],
    goodAgainst: ['MANA_HUNGRY_CHAMPION', 'SCALING_GAME'],
    weakAgainst: ['EARLY_BURST'],
    componentItemKeys: [
      'lost-chapter',
      'ring-of-revelation',
      'tear-of-the-goddess',
    ],
  },
  {
    key: 'nashors-tooth',
    name: "Nashor's Tooth",
    nameVi: 'Nanh Nashor',
    description:
      'Attack speed on-hit item that grants adaptive damage and on-hit adaptive damage.',
    descriptionVi:
      'Nanh Ma Thuật: Nhận Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật thích ứng. Gặm Nhấm: Đòn đánh gây sát thương thích ứng trên đòn đánh.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC, ItemCategory.ON_HIT],
    tags: ['ATTACK_SPEED', 'ABILITY_HASTE', 'ON_HIT', 'ADAPTIVE_DAMAGE'],
    goodAgainst: ['ON_HIT_CHAMPION', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'BURST_DAMAGE'],
    componentItemKeys: ['nashors-talon', 'recurve-bow'],
  },
  {
    key: 'infinity-orb',
    name: 'Infinity Orb',
    nameVi: 'Ngọc Vô Cực',
    description:
      'Burst magic item that executes low-health enemies and triggers Thunderfall after takedowns.',
    descriptionVi:
      'Định Mệnh: Nhận thêm Tốc Độ Di Chuyển. Cân Bằng: Nhận thêm Xuyên Kháng Phép. Tử Thần Cận Kề: Kỹ năng và đòn tấn công được cường hóa gây thêm Chí Mạng lên kẻ địch dưới 35% Máu. Tia Sét Trời Giáng: Khi tướng địch bị hạ gục sau khi bị áp dụng Tử Thần Cận Kề, gây sát thương phép quanh vị trí mục tiêu.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MAGIC_PENETRATION',
      'MOVEMENT_SPEED',
      'EXECUTE',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_HEALTH_TARGET'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'SHIELDING'],
    componentItemKeys: ['aether-wisp', 'prophets-pendant'],
  },
  {
    key: 'crown-of-the-shattered-queen',
    name: 'Crown of the Shattered Queen',
    nameVi: 'Vương Miện Suy Vong',
    description:
      'Defensive magic item that blocks the next harmful ability and reduces incoming damage briefly.',
    descriptionVi:
      'Hộ Thể: Tạo khiên phép chặn kỹ năng gây hại tiếp theo. Sau khi khiên vỡ, giảm sát thương nhận phải trong 1 giây. Điềm Tĩnh: Tăng Sức Mạnh Phép Thuật khi có Hộ Thể.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'ANTI_BURST',
      'SPELL_SHIELD',
    ],
    goodAgainst: ['ASSASSIN', 'BURST_DAMAGE', 'ENGAGE'],
    weakAgainst: ['POKE', 'LOW_COOLDOWN_HARASS'],
    componentItemKeys: ['lost-chapter', 'fiendish-codex', 'ring-of-revelation'],
  },
  {
    key: 'cosmic-drive',
    name: 'Cosmic Drive',
    nameVi: 'Động Cơ Vũ Trụ',
    description:
      'Ability haste and movement speed magic item that grants movement speed after damaging enemy champions.',
    descriptionVi:
      'Siêu Động Cơ: Nhận thêm Tốc Độ Di Chuyển. Pháp Vũ Đồng Hành: Kỹ năng kích hoạt và đòn đánh được cường hóa tăng Tốc Độ Di Chuyển sau khi gây sát thương lên tướng địch.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'MOVEMENT_SPEED',
      'KITE',
    ],
    goodAgainst: ['MELEE_CHAMPION', 'SKILL_SHOT', 'EXTENDED_FIGHT'],
    weakAgainst: ['POINT_AND_CLICK_CC', 'BURST_DAMAGE'],
    componentItemKeys: ['aether-wisp', 'fiendish-codex'],
  },
  {
    key: 'riftmaker',
    name: 'Riftmaker',
    nameVi: 'Quyền Trượng Ác Thần',
    description:
      'Sustained magic damage item with magic vamp and stacking damage amplification.',
    descriptionVi:
      'Đồng Hóa: Nhận Hút Máu Phép. Tha Hóa Hư Không: Khi giao tranh với tướng địch, nhận cộng dồn tăng sát thương phép. Ở cộng dồn tối đa, sát thương phép tăng thêm trở thành sát thương chuẩn.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'HEALTH',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'MAGIC_VAMP',
      'SUSTAIN_DAMAGE',
      'TRUE_DAMAGE',
    ],
    goodAgainst: ['TANK', 'EXTENDED_FIGHT', 'HIGH_HEALTH'],
    weakAgainst: ['BURST_DAMAGE', 'DISENGAGE'],
    componentItemKeys: ['hextech-alternator', 'fiendish-codex'],
  },
  {
    key: 'oceanids-trident',
    name: "Oceanid's Trident",
    nameVi: 'Đinh Ba Hải Tinh',
    description:
      'Anti-shield magic item that reduces shields after damaging enemy champions with abilities.',
    descriptionVi:
      'Vũ Khí Chết Chóc: Gây sát thương bằng kỹ năng lên tướng địch làm giảm lượng lá chắn chúng nhận được trong 3 giây. Khi gây sát thương lên kẻ địch chưa bị tác động, lá chắn hiện có của chúng cũng bị giảm.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: ['ABILITY_POWER', 'HEALTH', 'MAGIC_PENETRATION', 'ANTI_SHIELD'],
    goodAgainst: ['SHIELDING', 'ENCHANTER'],
    weakAgainst: ['NO_SHIELD_TEAM'],
    componentItemKeys: ['blasting-wand', 'haunting-guise'],
  },
  {
    key: 'horizon-focus',
    name: 'Horizon Focus',
    nameVi: 'Kính Nhắm Ma Pháp',
    description:
      'Long-range burst item that reveals enemies and increases damage dealt to them.',
    descriptionVi:
      'Bộc Phát: Gây sát thương lên tướng địch bằng kỹ năng từ tầm xa làm lộ diện chúng và tăng sát thương gây lên chúng. Tập Trung: Khi Bộc Phát kích hoạt, làm lộ diện các tướng địch quanh mục tiêu.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'POKE',
      'REVEAL',
      'DAMAGE_AMP',
    ],
    goodAgainst: ['POKE_COMPOSITION', 'LONG_RANGE_CHAMPION', 'FOG_OF_WAR'],
    weakAgainst: ['DIVE', 'MELEE_CHAMPION', 'LOW_RANGE_CHAMPION'],
    componentItemKeys: [
      'fiendish-codex',
      'blasting-wand',
      'ring-of-revelation',
    ],
  },
  {
    key: 'psychic-projector',
    name: 'Psychic Projector',
    nameVi: 'Máy Chiếu Tâm Linh',
    description:
      'Health-scaling magic item that converts bonus health into ability power and defensive stats.',
    descriptionVi:
      'Chuyển Hóa: Nhận Sức Mạnh Phép Thuật theo Máu cộng thêm. Ảo Ảnh: Khi có đủ Máu cộng thêm, nhận một phần Sức Mạnh Phép Thuật dưới dạng Giáp và Kháng Phép.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'ABILITY_POWER',
      'HEALTH',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'SCALING_HEALTH',
      'DEFENSIVE',
    ],
    goodAgainst: ['BRUISER', 'EXTENDED_FIGHT', 'MIXED_DAMAGE'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE'],
    componentItemKeys: ['haunting-guise', 'kindlegem', 'amplifying-tome'],
  },
  {
    key: 'awakened-soulstealer',
    name: 'Awakened Soulstealer',
    nameVi: 'Sách Chiêu Hồn Thức Tỉnh',
    description:
      'Snowball magic item that rewards takedowns with cooldown reduction and stolen movement speed/ability haste.',
    descriptionVi:
      'Săn Hồn: Nhận thêm Xuyên Kháng Phép. Linh Hồn Lang Thang: Khi tham gia hạ gục tướng địch sau khi gây sát thương, giảm thời gian hồi chiêu, đánh cắp Tốc Độ Di Chuyển cơ bản và Điểm Hồi Kỹ Năng của chúng cho đến khi chúng hồi sinh.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'HEALTH',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'SNOWBALL',
      'COOLDOWN_RESET',
    ],
    goodAgainst: ['SKIRMISH', 'LOW_DURABILITY_TEAM', 'SNOWBALL_GAME'],
    weakAgainst: ['TANK', 'LOW_KILL_PRESSURE'],
    componentItemKeys: [
      'fiendish-codex',
      'prophets-pendant',
      'ring-of-revelation',
    ],
  },
  {
    key: 'malignance',
    name: 'Malignance',
    nameVi: 'Hỏa Khuẩn',
    description:
      'Ultimate-focused magic item that burns the ground and reduces enemy magic resist after damaging champions with ultimate.',
    descriptionVi:
      'Ai Oán: Chiêu Cuối nhận Điểm Hồi Kỹ Năng. Màn Sương Căm Hận: Gây sát thương lên tướng bằng Chiêu Cuối thiêu đốt mặt đất dưới chân chúng và giảm Kháng Phép.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'ULTIMATE_HASTE',
      'BURN_DAMAGE',
      'MAGIC_RESIST_REDUCTION',
    ],
    goodAgainst: ['ULTIMATE_RELIANT_CHAMPION', 'TEAMFIGHT'],
    weakAgainst: ['LOW_ULTIMATE_VALUE'],
    componentItemKeys: ['lost-chapter', 'fiendish-codex', 'ring-of-revelation'],
  },
  {
    key: 'bandle-fantasy',
    name: 'Bandle Fantasy',
    nameVi: 'Giả Tưởng Bandle',
    description:
      'Trap-based magic item that creates damaging traps under enemies hit by active abilities.',
    descriptionVi:
      'Bẫy Lửa: Gây sát thương lên tướng địch bằng kỹ năng kích hoạt tạo bẫy dưới chân chúng. Sau thời gian ngắn, bẫy gây sát thương phép lên kẻ địch dính bẫy.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'MAGIC_PENETRATION',
      'AREA_DAMAGE',
      'POKE',
    ],
    goodAgainst: ['GROUPED_ENEMIES', 'POKE_COMPOSITION'],
    weakAgainst: ['HIGH_MOBILITY'],
    componentItemKeys: ['lost-chapter', 'blasting-wand', 'ring-of-revelation'],
  },
  {
    key: 'guinsoos-rageblade',
    name: "Guinsoo's Rageblade",
    nameVi: 'Cuồng Đao Guinsoo',
    description:
      'Hybrid on-hit attack speed item that grants adaptive damage and empowers on-hit effects.',
    descriptionVi:
      'Xung Điện: Nhận thêm Tốc Độ Di Chuyển. Hỗn Loạn: Nhận Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật thích ứng. Thịnh Nộ: Đòn đánh gây thêm sát thương phép nhưng không thể Chí Mạng. Nhát Chém Cuồng Nộ: Đòn đánh thường tăng Tốc Độ Đánh và ở cộng dồn tối đa kích hoạt thêm hiệu ứng trên đòn đánh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.HYBRID,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'ATTACK_SPEED',
      'ON_HIT',
      'ADAPTIVE_DAMAGE',
      'MOVEMENT_SPEED',
      'HYBRID_DAMAGE',
    ],
    goodAgainst: ['ON_HIT_CHAMPION', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'BURST_DAMAGE'],
    componentItemKeys: ['nashors-talon', 'recurve-bow'],
  },
];

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

export async function seedItems(prisma: PrismaClient, patchId: string) {
  console.log('Seeding items...');

  for (const itemSeed of itemSeeds) {
    await prisma.item.upsert({
      where: {
        key: itemSeed.key,
      },
      update: {
        name: itemSeed.name,
        nameVi: itemSeed.nameVi,
        description: itemSeed.description,
        descriptionVi: itemSeed.descriptionVi,
        category: itemSeed.category,
        tags: itemSeed.tags,
        goodAgainst: itemSeed.goodAgainst,
        weakAgainst: itemSeed.weakAgainst,
        componentItemKeys: itemSeed.componentItemKeys ?? [],
        buildsIntoItemKeys: itemSeed.buildsIntoItemKeys ?? [],
        archivedAt: null,
        deletedAt: null,
      },
      create: {
        key: itemSeed.key,
        name: itemSeed.name,
        nameVi: itemSeed.nameVi,
        description: itemSeed.description,
        descriptionVi: itemSeed.descriptionVi,
        category: itemSeed.category,
        tags: itemSeed.tags,
        goodAgainst: itemSeed.goodAgainst,
        weakAgainst: itemSeed.weakAgainst,
        componentItemKeys: itemSeed.componentItemKeys ?? [],
        buildsIntoItemKeys: itemSeed.buildsIntoItemKeys ?? [],
      },
    });

    console.log(`Seeded item: ${itemSeed.name}`);
  }

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

    console.log(`Seeded item patch stat: ${patchStatSeed.key}`);
  }

  console.log('Seeded items');
}
