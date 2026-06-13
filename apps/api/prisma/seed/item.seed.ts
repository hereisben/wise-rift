import { PrismaClient } from '../../src/generated/prisma/client.js';
import { ItemCategory } from './../../src/generated/prisma/enums.js';

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

export async function seedItems(prisma: PrismaClient) {
  console.log('SEEDING ITEMS...');

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

  console.log('SEEDED ITEMS');
}
