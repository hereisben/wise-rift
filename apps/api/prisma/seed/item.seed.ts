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
};

type NormalizedItemSeed = ItemSeed & {
  buildsIntoItemKeys: string[];
};

// BASIC ITEMS

const basicItemSeeds: ItemSeed[] = [
  {
    key: 'boots-of-speed',
    name: 'Boots of Speed',
    nameVi: 'Giày Thường',
    description: 'Basic movement speed component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Tốc Độ Di Chuyển.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.BOOTS,
      ItemCategory.COMPONENT,
    ],
    tags: ['MOVEMENT_SPEED'],
    goodAgainst: [],
    weakAgainst: [],
  },
  {
    key: 'long-sword',
    name: 'Long Sword',
    nameVi: 'Kiếm Dài',
    description: 'Basic attack damage component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Sức Mạnh Công Kích.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['ATTACK_DAMAGE'],
    goodAgainst: [],
    weakAgainst: [],
  },
  {
    key: 'brawlers-gloves',
    name: "Brawler's Gloves",
    nameVi: 'Găng Đấu Tập',
    description: 'Basic critical strike component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Tỉ Lệ Chí Mạng.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['CRITICAL_RATE'],
    goodAgainst: [],
    weakAgainst: [],
  },
  {
    key: 'dagger',
    name: 'Dagger',
    nameVi: 'Dao Găm',
    description: 'Basic attack speed component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Tốc Độ Đánh.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['ATTACK_SPEED'],
    goodAgainst: [],
    weakAgainst: [],
  },
  {
    key: 'shimmering-spark',
    name: 'Shimmering Spark',
    nameVi: 'Tàn Lửa Lấp Lánh',
    description: 'Basic health component that burns nearby enemies.',
    descriptionVi:
      'Trang bị cơ bản cung cấp Máu và gây sát thương phép lên kẻ địch xung quanh.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'BURN_DAMAGE', 'AREA_DAMAGE'],
    goodAgainst: ['MINION_WAVE', 'MELEE_CHAMPION'],
    weakAgainst: ['LONG_RANGE_POKE'],
  },
  {
    key: 'tear-of-the-goddess',
    name: 'Tear of the Goddess',
    nameVi: 'Nước Mắt Nữ Thần',
    description:
      'Mana scaling item that increases maximum mana when mana is spent.',
    descriptionVi: 'Trang bị tăng Năng Lượng tối đa khi sử dụng Năng Lượng.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['MANA', 'ABILITY_HASTE', 'SCALING_MANA'],
    goodAgainst: ['EXTENDED_FIGHT', 'MANA_HUNGRY_CHAMPION'],
    weakAgainst: ['EARLY_BURST'],
  },
  {
    key: 'amplifying-tome',
    name: 'Amplifying Tome',
    nameVi: 'Sách Cũ',
    description: 'Basic ability power component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Sức Mạnh Phép Thuật.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_DAMAGE'],
    goodAgainst: [],
    weakAgainst: [],
  },
  {
    key: 'ruby-crystal',
    name: 'Ruby Crystal',
    nameVi: 'Hồng Ngọc',
    description: 'Basic health component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Máu Tối Đa.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH'],
    goodAgainst: ['BURST_DAMAGE'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE'],
  },
  {
    key: 'cloth-armor',
    name: 'Cloth Armor',
    nameVi: 'Giáp Lụa',
    description: 'Basic armor component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Giáp.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ARMOR'],
    goodAgainst: ['PHYSICAL_DAMAGE', 'AUTO_ATTACK_CHAMPION'],
    weakAgainst: ['MAGIC_DAMAGE'],
  },
  {
    key: 'null-magic-mantle',
    name: 'Null-Magic Mantle',
    nameVi: 'Áo Choàng Kháng Phép',
    description: 'Basic magic resistance component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Kháng Phép.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['MAGIC_RESIST'],
    goodAgainst: ['MAGIC_DAMAGE'],
    weakAgainst: ['PHYSICAL_DAMAGE'],
  },
  {
    key: 'ring-of-revelation',
    name: 'Ring of Revelation',
    nameVi: 'Nhẫn Thiên Khải',
    description: 'Basic ability haste component.',
    descriptionVi: 'Trang bị cơ bản cung cấp Điểm Hồi Kỹ Năng.',
    category: [ItemCategory.LOW_TIER, ItemCategory.COMPONENT],
    tags: ['ABILITY_HASTE'],
    goodAgainst: ['ABILITY_RELIANT_CHAMPION'],
    weakAgainst: [],
  },
  {
    key: 'relic-shield',
    name: 'Relic Shield',
    nameVi: 'Khiên Cổ Vật',
    description:
      'Support starter item that grants gold through Tribute and upgrades into Bulwark of the Mountain.',
    descriptionVi:
      'Trang bị khởi đầu hỗ trợ nhận vàng qua Cống Phẩm và biến đổi thành Pháo Đài Sơn Thạch.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.SUPPORT,
      ItemCategory.COMPONENT,
    ],
    tags: ['SUPPORT_GOLD', 'HEALTH', 'VISION_CONTROL', 'TRANSFORM'],
    goodAgainst: ['LANE_SUSTAIN'],
    weakAgainst: [],
  },
  {
    key: 'spectral-sickle',
    name: 'Spectral Sickle',
    nameVi: 'Lưỡi Liềm Bóng Ma',
    description:
      'Support starter item that grants gold by attacking champions and structures.',
    descriptionVi:
      'Trang bị khởi đầu hỗ trợ nhận vàng khi tấn công tướng và công trình.',
    category: [
      ItemCategory.LOW_TIER,
      ItemCategory.SUPPORT,
      ItemCategory.COMPONENT,
    ],
    tags: ['SUPPORT_GOLD', 'ADAPTIVE_DAMAGE', 'VISION_CONTROL', 'TRANSFORM'],
    goodAgainst: ['POKE'],
    weakAgainst: ['HARD_ENGAGE'],
  },
];

// MIDDLE TIER
const middleTierItemSeeds: ItemSeed[] = [
  {
    key: 'quicksilver-sash',
    name: 'Quicksilver Sash',
    nameVi: 'Khăn Giải Thuật',
    description:
      'Active item that removes crowd control effects and briefly grants crowd control immunity.',
    descriptionVi:
      'Trang bị kích hoạt loại bỏ hiệu ứng khống chế và miễn nhiễm khống chế trong thời gian ngắn.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.ACTIVE,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['CLEANSE', 'MAGIC_RESIST', 'TENACITY', 'SLOW_RESISTANCE'],
    goodAgainst: ['CROWD_CONTROL', 'MAGIC_DAMAGE'],
    weakAgainst: ['KNOCK_UP', 'KNOCK_BACK'],
    componentItemKeys: ['null-magic-mantle'],
  },
  {
    key: 'seekers-armguard',
    name: "Seeker's Armguard",
    nameVi: 'Giáp Tay Seeker',
    description: 'Active defensive magic item that grants temporary stasis.',
    descriptionVi:
      'Trang bị phép phòng thủ có thể kích hoạt trạng thái Bất Động.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.ACTIVE,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'ARMOR', 'STASIS', 'ANTI_BURST'],
    goodAgainst: ['ASSASSIN', 'BURST_DAMAGE'],
    weakAgainst: ['DAMAGE_OVER_TIME'],
    componentItemKeys: ['blasting-wand', 'cloth-armor'],
  },
  {
    key: 'vampiric-scepter',
    name: 'Vampiric Scepter',
    nameVi: 'Trượng Hút Máu',
    description: 'Attack damage component that grants physical vamp.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Công Kích và Hút Máu Vật Lý.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_DAMAGE', 'PHYSICAL_VAMP', 'SUSTAIN'],
    goodAgainst: ['EXTENDED_FIGHT', 'POKE'],
    weakAgainst: ['ANTI_HEAL'],
    componentItemKeys: ['long-sword'],
  },
  {
    key: 'zeal',
    name: 'Zeal',
    nameVi: 'Song Kiếm',
    description:
      'Critical strike and attack speed component that grants movement speed.',
    descriptionVi:
      'Trang bị thành phần cung cấp Chí Mạng, Tốc Độ Đánh và Tốc Độ Di Chuyển.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['CRITICAL_RATE', 'ATTACK_SPEED', 'MOVEMENT_SPEED'],
    goodAgainst: ['KITE', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_ATTACK_SPEED'],
    componentItemKeys: ['brawlers-gloves', 'dagger'],
  },
  {
    key: 'kircheis-shard',
    name: 'Kircheis Shard',
    nameVi: 'Mảnh Kircheis',
    description: 'Attack damage component that empowers Energized attacks.',
    descriptionVi: 'Trang bị thành phần cường hóa đòn đánh Tích Điện.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_DAMAGE', 'ENERGIZED', 'MAGIC_DAMAGE'],
    goodAgainst: ['POKE', 'SQUISHY_CHAMPION'],
    weakAgainst: ['HIGH_MAGIC_RESIST'],
    componentItemKeys: ['long-sword'],
  },
  {
    key: 'serrated-dirk',
    name: 'Serrated Dirk',
    nameVi: 'Dao Hung Tàn',
    description: 'Attack damage component that grants flat armor penetration.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Công Kích và Xuyên Giáp cố định.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_DAMAGE', 'ARMOR_PENETRATION', 'BURST_DAMAGE'],
    goodAgainst: ['LOW_ARMOR', 'SQUISHY_CHAMPION'],
    weakAgainst: ['HIGH_ARMOR'],
    componentItemKeys: ['long-sword'],
  },
  {
    key: 'recurve-bow',
    name: 'Recurve Bow',
    nameVi: 'Cung Gỗ',
    description:
      'Attack speed component that deals bonus physical damage on hit.',
    descriptionVi:
      'Trang bị thành phần cung cấp Tốc Độ Đánh và thêm sát thương vật lý trên đòn đánh.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.ON_HIT,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_SPEED', 'ON_HIT', 'PHYSICAL_DAMAGE'],
    goodAgainst: ['AUTO_ATTACK_CHAMPION', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_ATTACK_SPEED'],
    componentItemKeys: ['dagger', 'dagger'],
  },
  {
    key: 'bf-sword',
    name: 'B.F. Sword',
    nameVi: 'Kiếm B.F.',
    description: 'Large attack damage component.',
    descriptionVi: 'Trang bị thành phần cung cấp lượng lớn Sức Mạnh Công Kích.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_DAMAGE'],
    goodAgainst: [],
    weakAgainst: [],
    componentItemKeys: ['long-sword', 'long-sword'],
  },
  {
    key: 'cloak-of-agility',
    name: 'Cloak of Agility',
    nameVi: 'Áo Choàng Tím',
    description: 'Critical strike component.',
    descriptionVi: 'Trang bị thành phần cung cấp Tỉ Lệ Chí Mạng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['CRITICAL_RATE'],
    goodAgainst: [],
    weakAgainst: [],
    componentItemKeys: ['brawlers-gloves'],
  },
  {
    key: 'last-whisper',
    name: 'Last Whisper',
    nameVi: 'Cung Xanh',
    description:
      'Physical damage component that grants percentage armor penetration.',
    descriptionVi: 'Trang bị thành phần cung cấp Xuyên Giáp theo phần trăm.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ARMOR_PENETRATION', 'ANTI_ARMOR'],
    goodAgainst: ['HIGH_ARMOR', 'TANK'],
    weakAgainst: ['LOW_ARMOR'],
  },
  {
    key: 'executioners-calling',
    name: "Executioner's Calling",
    nameVi: 'Gươm Đồ Tể',
    description: 'Physical damage component that applies Grievous Wounds.',
    descriptionVi:
      'Trang bị thành phần gây Vết Thương Sâu bằng sát thương vật lý.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_DAMAGE', 'ANTI_HEAL'],
    goodAgainst: ['HEALING', 'SUSTAIN'],
    weakAgainst: ['NO_HEALING_TEAM'],
    componentItemKeys: ['long-sword'],
  },
  {
    key: 'phage',
    name: 'Phage',
    nameVi: 'Búa Gỗ',
    description:
      'Attack damage and health component that grants movement speed after attacks.',
    descriptionVi:
      'Trang bị thành phần cung cấp Máu, Sức Mạnh Công Kích và Tốc Độ Di Chuyển sau khi tấn công.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'ATTACK_DAMAGE', 'MOVEMENT_SPEED'],
    goodAgainst: ['KITE', 'MELEE_TRADING'],
    weakAgainst: ['DISENGAGE'],
    componentItemKeys: ['long-sword'],
  },
  {
    key: 'stinger',
    name: 'Stinger',
    nameVi: 'Ngòi Châm',
    description: 'Attack speed component that also grants ability haste.',
    descriptionVi:
      'Trang bị thành phần cung cấp Tốc Độ Đánh và Điểm Hồi Kỹ Năng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_SPEED', 'ABILITY_HASTE'],
    goodAgainst: ['EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_ATTACK_SPEED'],
    componentItemKeys: ['dagger'],
  },
  {
    key: 'caulfields-warhammer',
    name: "Caulfield's Warhammer",
    nameVi: 'Búa Chiến Caulfield',
    description: 'Attack damage component that grants ability haste.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Công Kích và Điểm Hồi Kỹ Năng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_DAMAGE', 'ABILITY_HASTE'],
    goodAgainst: ['ABILITY_RELIANT_CHAMPION'],
    weakAgainst: [],
    componentItemKeys: ['long-sword', 'long-sword'],
  },
  {
    key: 'jaurims-fist',
    name: "Jaurim's Fist",
    nameVi: 'Nắm Đấm Jaurim',
    description: 'Attack damage and health component.',
    descriptionVi: 'Trang bị thành phần cung cấp Máu và Sức Mạnh Công Kích.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'ATTACK_DAMAGE'],
    goodAgainst: ['BURST_DAMAGE'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE'],
    componentItemKeys: ['ruby-crystal', 'long-sword'],
  },
  {
    key: 'hexdrinker',
    name: 'Hexdrinker',
    nameVi: 'Kiếm Răng Cưa',
    description: 'Attack damage and magic resistance component.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Công Kích và Kháng Phép.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_DAMAGE', 'MAGIC_RESIST', 'ANTI_MAGIC_BURST'],
    goodAgainst: ['MAGIC_DAMAGE', 'BURST_DAMAGE'],
    weakAgainst: ['PHYSICAL_DAMAGE'],
    componentItemKeys: ['long-sword', 'null-magic-mantle'],
  },
  {
    key: 'noonquiver',
    name: 'Noonquiver',
    nameVi: 'Nỏ Tử Thủ',
    description: 'Attack damage and attack speed component.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Công Kích và Tốc Độ Đánh.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.COMPONENT,
    ],
    tags: ['ATTACK_DAMAGE', 'ATTACK_SPEED'],
    goodAgainst: ['AUTO_ATTACK_CHAMPION'],
    weakAgainst: ['ANTI_ATTACK_SPEED'],
    componentItemKeys: ['long-sword', 'dagger'],
  },
  {
    key: 'aether-wisp',
    name: 'Aether Wisp',
    nameVi: 'Tinh Linh Lãng Quên',
    description:
      'Ability power component that also grants percentage movement speed.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật và Tốc Độ Di Chuyển.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MOVEMENT_SPEED', 'KITE', 'ROAM'],
    goodAgainst: ['LOW_MOBILITY_CHAMPION'],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome'],
  },
  {
    key: 'lost-chapter',
    name: 'Lost Chapter',
    nameVi: 'Bí Chương Thất Truyền',
    description:
      'Ability power and mana component that restores mana after leveling up.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật, Năng Lượng và hồi Năng Lượng khi lên cấp.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MANA', 'ABILITY_HASTE', 'MANA_RESTORE'],
    goodAgainst: ['MANA_HUNGRY_CHAMPION', 'LANE_SUSTAIN'],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome', 'ring-of-revelation'],
  },
  {
    key: 'fiendish-codex',
    name: 'Fiendish Codex',
    nameVi: 'Sách Quỷ',
    description: 'Ability power component that grants ability haste.',
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
  },
  {
    key: 'blasting-wand',
    name: 'Blasting Wand',
    nameVi: 'Gậy Bùng Nổ',
    description: 'Ability power component.',
    descriptionVi: 'Trang bị thành phần cung cấp thêm Sức Mạnh Phép Thuật.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_DAMAGE'],
    goodAgainst: [],
    weakAgainst: [],
    componentItemKeys: ['amplifying-tome'],
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
  },
  {
    key: 'haunting-guise',
    name: 'Haunting Guise',
    nameVi: 'Mặt Nạ Ma Ám',
    description:
      'Ability power and health component that increases damage during extended combat.',
    descriptionVi:
      'Trang bị thành phần cung cấp Máu, Sức Mạnh Phép Thuật và tăng sát thương khi giao tranh kéo dài.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'HEALTH', 'RAMPING_DAMAGE', 'EXTENDED_FIGHT'],
    goodAgainst: ['TANK', 'EXTENDED_FIGHT'],
    weakAgainst: ['BURST_FIGHT'],
    componentItemKeys: ['ruby-crystal', 'amplifying-tome'],
  },
  {
    key: 'sheen',
    name: 'Sheen',
    nameVi: 'Thủy Kiếm',
    description:
      'Ability haste component that empowers the next attack after casting an ability.',
    descriptionVi:
      'Trang bị thành phần cung cấp Điểm Hồi Kỹ Năng và cường hóa đòn đánh tiếp theo sau khi dùng kỹ năng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.HYBRID,
      ItemCategory.COMPONENT,
    ],
    tags: [
      'ABILITY_HASTE',
      'SPELLBLADE',
      'EMPOWERED_ATTACK',
      'PHYSICAL_DAMAGE',
    ],
    goodAgainst: ['SHORT_TRADE'],
    weakAgainst: ['ABILITY_DOWNTIME'],
    componentItemKeys: ['ring-of-revelation'],
  },
  {
    key: 'oblivion-orb',
    name: 'Oblivion Orb',
    nameVi: 'Quỷ Thư',
    description:
      'Ability power component that applies Grievous Wounds through magic damage.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật và gây Vết Thương Sâu bằng sát thương phép.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_DAMAGE', 'ANTI_HEAL'],
    goodAgainst: ['HEALING', 'SUSTAIN'],
    weakAgainst: ['NO_HEALING_TEAM'],
    componentItemKeys: ['amplifying-tome'],
  },
  {
    key: 'hextech-alternator',
    name: 'Hextech Alternator',
    nameVi: 'Máy Chuyển Hextech',
    description:
      'Ability power component that adds burst magic damage to damaging abilities and empowered attacks.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật và thêm sát thương phép bùng nổ cho kỹ năng gây sát thương hoặc đòn đánh cường hóa.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_DAMAGE', 'BURST_DAMAGE', 'EMPOWERED_ATTACK'],
    goodAgainst: ['SQUISHY_CHAMPION', 'SHORT_TRADE'],
    weakAgainst: ['HIGH_MAGIC_RESIST'],
    componentItemKeys: ['amplifying-tome'],
  },
  {
    key: 'mejais-soulstealer',
    name: "Mejai's Soulstealer",
    nameVi: 'Sách Chiêu Hồn Mejai',
    description:
      'High-risk ability power item that gains permanent combat power from champion takedowns and loses stacks on death.',
    descriptionVi:
      'Trang bị Sức Mạnh Phép Thuật có rủi ro cao, tích lũy sức mạnh từ các điểm hạ gục và mất cộng dồn khi bị hạ.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: [
      'ABILITY_POWER',
      'HEALTH',
      'SNOWBALL',
      'STACKING',
      'TAKEDOWN_REWARD',
      'MOVEMENT_SPEED',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_KILL_PRESSURE'],
    weakAgainst: ['ASSASSIN', 'BURST_DAMAGE', 'HIGH_DEATH_RISK'],
    componentItemKeys: ['amplifying-tome'],
  },
  {
    key: 'nashors-talon',
    name: "Nashor's Talon",
    nameVi: 'Vuốt Nashor',
    description:
      'Adaptive component that grants either attack damage or ability power.',
    descriptionVi:
      'Trang bị thành phần thích ứng, cung cấp Sức Mạnh Công Kích hoặc Sức Mạnh Phép Thuật.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.HYBRID,
      ItemCategory.COMPONENT,
    ],
    tags: ['ADAPTIVE_DAMAGE', 'ATTACK_DAMAGE', 'ABILITY_POWER'],
    goodAgainst: [],
    weakAgainst: [],
  },
  {
    key: 'forbidden-idol',
    name: 'Forbidden Idol',
    nameVi: 'Lư Hương Cấm',
    description:
      'Support component that improves healing, shielding, mana regeneration, and ability haste.',
    descriptionVi:
      'Trang bị thành phần hỗ trợ tăng hiệu quả hồi máu, tạo lá chắn, hồi Năng Lượng và Điểm Hồi Kỹ Năng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'ABILITY_HASTE', 'HEAL_SHIELD_POWER', 'MANA_REGEN'],
    goodAgainst: ['POKE'],
    weakAgainst: ['ANTI_HEAL', 'ANTI_SHIELD'],
    componentItemKeys: ['ring-of-revelation'],
  },
  {
    key: 'fated-ashes',
    name: 'Fated Ashes',
    nameVi: 'Tro Tàn Định Mệnh',
    description:
      'Ability power component that causes damaging abilities to burn enemies over time.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật và khiến kỹ năng gây sát thương thiêu đốt kẻ địch theo thời gian.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_DAMAGE', 'BURN_DAMAGE', 'DAMAGE_OVER_TIME'],
    goodAgainst: ['EXTENDED_FIGHT', 'MONSTER', 'MINION_WAVE'],
    weakAgainst: ['BURST_FIGHT'],
    componentItemKeys: ['amplifying-tome'],
  },
  {
    key: 'void-amethyst',
    name: 'Void Amethyst',
    nameVi: 'Thạch Anh Hư Không',
    description:
      'Ability power component that grants percentage magic penetration.',
    descriptionVi:
      'Trang bị thành phần cung cấp Sức Mạnh Phép Thuật và Xuyên Kháng Phép theo phần trăm.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_PENETRATION', 'ANTI_MAGIC_RESIST'],
    goodAgainst: ['HIGH_MAGIC_RESIST', 'TANK'],
    weakAgainst: ['LOW_MAGIC_RESIST'],
    componentItemKeys: ['amplifying-tome'],
  },
  {
    key: 'verdant-barrier',
    name: 'Verdant Barrier',
    nameVi: 'Ngọc Bảo Hộ',
    description:
      'Defensive ability power component that grants magic resistance and periodically blocks an enemy ability.',
    descriptionVi:
      'Trang bị phép phòng thủ cung cấp Sức Mạnh Phép Thuật, Kháng Phép và định kỳ chặn một kỹ năng của đối phương.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ABILITY_POWER', 'MAGIC_RESIST', 'SPELL_SHIELD', 'ANTI_MAGIC_BURST'],
    goodAgainst: ['MAGIC_DAMAGE', 'BURST_DAMAGE', 'PICK_COMPOSITION'],
    weakAgainst: ['POKE', 'MULTI_HIT'],
    componentItemKeys: ['amplifying-tome', 'null-magic-mantle'],
  },
  {
    key: 'bamis-cinder',
    name: "Bami's Cinder",
    nameVi: 'Tàn Tích Bami',
    description:
      'Health component that continuously burns nearby enemies while in combat.',
    descriptionVi:
      'Trang bị thành phần cung cấp Máu và liên tục thiêu đốt kẻ địch xung quanh khi giao tranh.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'BURN_DAMAGE', 'AREA_DAMAGE', 'WAVE_CLEAR'],
    goodAgainst: ['MINION_WAVE', 'MELEE_CHAMPION', 'MONSTER'],
    weakAgainst: ['LONG_RANGE_POKE'],
    componentItemKeys: ['ruby-crystal', 'shimmering-spark'],
  },
  {
    key: 'spectres-cowl',
    name: "Spectre's Cowl",
    nameVi: 'Áo Choàng Ám Ảnh',
    description:
      'Magic resistance and health component that improves health regeneration after taking champion damage.',
    descriptionVi:
      'Trang bị thành phần cung cấp Máu, Kháng Phép và tăng hồi Máu sau khi chịu sát thương từ tướng địch.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'MAGIC_RESIST', 'HEALTH_REGEN', 'SUSTAIN'],
    goodAgainst: ['MAGIC_DAMAGE', 'POKE'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'ANTI_HEAL'],
    componentItemKeys: ['null-magic-mantle'],
  },
  {
    key: 'kindlegem',
    name: 'Kindlegem',
    nameVi: 'Hỏa Ngọc',
    description: 'Health component that grants ability haste.',
    descriptionVi: 'Trang bị thành phần cung cấp Máu và Điểm Hồi Kỹ Năng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'ABILITY_HASTE'],
    goodAgainst: ['BURST_DAMAGE'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE'],
    componentItemKeys: ['ruby-crystal'],
  },
  {
    key: 'giants-belt',
    name: "Giant's Belt",
    nameVi: 'Đai Khổng Lồ',
    description: 'Large health component.',
    descriptionVi: 'Trang bị thành phần cung cấp lượng lớn Máu.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH'],
    goodAgainst: ['BURST_DAMAGE'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE'],
    componentItemKeys: ['ruby-crystal'],
  },
  {
    key: 'wardens-mail',
    name: "Warden's Mail",
    nameVi: 'Giáp Cai Ngục',
    description:
      'Armor component that temporarily reduces the attack speed of enemies who attack you.',
    descriptionVi:
      'Trang bị thành phần cung cấp Giáp và tạm thời giảm Tốc Độ Đánh của kẻ địch tấn công bạn.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ARMOR', 'ANTI_ATTACK_SPEED', 'AUTO_ATTACK_DEFENSE'],
    goodAgainst: ['AUTO_ATTACK_CHAMPION', 'ATTACK_SPEED'],
    weakAgainst: ['MAGIC_DAMAGE', 'ABILITY_DAMAGE'],
    componentItemKeys: ['cloth-armor'],
  },
  {
    key: 'catalyst-of-aeons',
    name: 'Catalyst of Aeons',
    nameVi: 'Chất Xúc Tác Bảo Hộ',
    description:
      'Health and mana component that restores mana from incoming champion damage and health from mana spent.',
    descriptionVi:
      'Trang bị thành phần cung cấp Máu, Năng Lượng, hồi Năng Lượng khi chịu sát thương từ tướng và hồi Máu khi sử dụng Năng Lượng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'MANA', 'HEALTH_RESTORE', 'MANA_RESTORE', 'SUSTAIN'],
    goodAgainst: ['POKE', 'EXTENDED_FIGHT'],
    weakAgainst: ['MANALESS_CHAMPION', 'BURST_DAMAGE'],
    componentItemKeys: ['ruby-crystal'],
  },
  {
    key: 'chain-vest',
    name: 'Chain Vest',
    nameVi: 'Giáp Lưới',
    description: 'Large armor component.',
    descriptionVi: 'Trang bị thành phần cung cấp lượng lớn Giáp.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ARMOR'],
    goodAgainst: ['PHYSICAL_DAMAGE', 'AUTO_ATTACK_CHAMPION'],
    weakAgainst: ['MAGIC_DAMAGE'],
    componentItemKeys: ['cloth-armor'],
  },
  {
    key: 'bramble-vest',
    name: 'Bramble Vest',
    nameVi: 'Áo Choàng Gai',
    description:
      'Armor component that reflects damage and applies Grievous Wounds when struck by attacks.',
    descriptionVi:
      'Trang bị thành phần cung cấp Giáp, phản lại sát thương và gây Vết Thương Sâu khi bị tấn công.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ARMOR', 'DAMAGE_REFLECT', 'ANTI_HEAL', 'AUTO_ATTACK_DEFENSE'],
    goodAgainst: ['AUTO_ATTACK_CHAMPION', 'HEALING', 'PHYSICAL_DAMAGE'],
    weakAgainst: ['MAGIC_DAMAGE', 'ABILITY_DAMAGE'],
    componentItemKeys: ['cloth-armor'],
  },
  {
    key: 'negatron-cloak',
    name: 'Negatron Cloak',
    nameVi: 'Áo Choàng Bạc',
    description: 'Large magic resistance component.',
    descriptionVi: 'Trang bị thành phần cung cấp lượng lớn Kháng Phép.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['MAGIC_RESIST'],
    goodAgainst: ['MAGIC_DAMAGE', 'MAGIC_BURST'],
    weakAgainst: ['PHYSICAL_DAMAGE'],
    componentItemKeys: ['null-magic-mantle'],
  },
  {
    key: 'glacial-shroud',
    name: 'Glacial Shroud',
    nameVi: 'Áo Choàng Băng Giá',
    description: 'Armor and mana component that grants ability haste.',
    descriptionVi:
      'Trang bị thành phần cung cấp Giáp, Năng Lượng và Điểm Hồi Kỹ Năng.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ARMOR', 'MANA', 'ABILITY_HASTE'],
    goodAgainst: ['PHYSICAL_DAMAGE', 'ABILITY_RELIANT_CHAMPION'],
    weakAgainst: ['MAGIC_DAMAGE'],
    componentItemKeys: ['cloth-armor'],
  },
  {
    key: 'winged-moonplate',
    name: 'Winged Moonplate',
    nameVi: 'Giáp Trăng Có Cánh',
    description: 'Health component that grants percentage movement speed.',
    descriptionVi:
      'Trang bị thành phần cung cấp Máu và Tốc Độ Di Chuyển theo phần trăm.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['HEALTH', 'MOVEMENT_SPEED', 'ROAM', 'ENGAGE'],
    goodAgainst: ['LOW_MOBILITY_CHAMPION', 'KITE_COMPOSITION'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE'],
    componentItemKeys: ['ruby-crystal'],
  },
  {
    key: 'surging-scales',
    name: 'Surging Scales',
    nameVi: 'Vảy Dâng Trào',
    description: 'Armor component that grants slow resistance while in combat.',
    descriptionVi:
      'Trang bị thành phần cung cấp Giáp và Kháng Làm Chậm khi giao tranh.',
    category: [
      ItemCategory.MIDDLE_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.COMPONENT,
    ],
    tags: ['ARMOR', 'SLOW_RESISTANCE', 'EXTENDED_FIGHT'],
    goodAgainst: ['SLOW', 'PHYSICAL_DAMAGE', 'KITE'],
    weakAgainst: ['MAGIC_DAMAGE', 'HARD_CROWD_CONTROL'],
    componentItemKeys: ['cloth-armor', 'cloth-armor'],
  },
];

// HIGH TIER
const highTierItemSeeds: ItemSeed[] = [
  {
    key: 'bloodthirster',
    name: 'Bloodthirster',
    nameVi: 'Huyết Kiếm',
    description:
      'Critical strike item that grants physical vamp and increased sustain from critical attacks.',
    descriptionVi:
      'Trang bị chí mạng cung cấp Hút Máu Vật Lý và tăng khả năng hồi phục từ các đòn đánh chí mạng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'HEALTH',
      'CRITICAL_RATE',
      'PHYSICAL_VAMP',
      'SUSTAIN',
    ],
    goodAgainst: ['POKE', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_HEAL', 'BURST_DAMAGE'],
    componentItemKeys: ['vampiric-scepter', 'cloak-of-agility', 'ruby-crystal'],
  },
  {
    key: 'guardian-angel',
    name: 'Guardian Angel',
    nameVi: 'Giáp Thiên Thần',
    description:
      'Attack damage and armor item that revives the wearer after taking lethal damage.',
    descriptionVi:
      'Trang bị cung cấp Sức Mạnh Công Kích, Giáp và hồi sinh người sử dụng sau khi nhận sát thương chí tử.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: ['ATTACK_DAMAGE', 'ARMOR', 'REVIVE', 'ANTI_BURST', 'SECOND_LIFE'],
    goodAgainst: ['ASSASSIN', 'BURST_DAMAGE', 'DIVE'],
    weakAgainst: ['SUSTAINED_DAMAGE', 'REVIVE_CAMP'],
    componentItemKeys: ['bf-sword', 'chain-vest'],
  },
  {
    key: 'magnetic-blaster',
    name: 'Magnetic Blaster',
    nameVi: 'Đại Bác Từ Trường',
    description:
      'Critical strike and attack speed item that empowers Energized attacks with additional range and bouncing magic damage.',
    descriptionVi:
      'Trang bị chí mạng và Tốc Độ Đánh, cường hóa đòn đánh Tích Điện với tầm đánh xa hơn và sát thương phép nảy lan.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'CRITICAL_RATE',
      'ATTACK_SPEED',
      'MOVEMENT_SPEED',
      'ENERGIZED',
      'ATTACK_RANGE',
      'MAGIC_DAMAGE',
      'AREA_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'MINION_WAVE', 'KITE_COMPOSITION'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'ANTI_ATTACK_SPEED'],
    componentItemKeys: ['zeal', 'kircheis-shard'],
  },
  {
    key: 'blade-of-the-ruined-king',
    name: 'Blade of the Ruined King',
    nameVi: 'Gươm Của Vua Vô Danh',
    description:
      'On-hit item that deals damage based on the target’s current health and steals movement speed.',
    descriptionVi:
      'Trang bị đòn đánh gây sát thương dựa trên Máu hiện tại của mục tiêu và đánh cắp Tốc Độ Di Chuyển.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'ATTACK_SPEED',
      'OMNI_VAMP',
      'ON_HIT',
      'CURRENT_HEALTH_DAMAGE',
      'MOVEMENT_SPEED_STEAL',
      'SUSTAIN',
    ],
    goodAgainst: ['TANK', 'HIGH_HEALTH', 'EXTENDED_FIGHT', 'KITE'],
    weakAgainst: ['HIGH_ARMOR', 'ANTI_HEAL', 'ANTI_ATTACK_SPEED'],
    componentItemKeys: ['vampiric-scepter', 'recurve-bow'],
  },
  {
    key: 'runaans-hurricane',
    name: "Runaan's Hurricane",
    nameVi: 'Cuồng Cung Runaan',
    description:
      'Critical strike and attack speed item that causes attacks to strike additional nearby targets.',
    descriptionVi:
      'Trang bị chí mạng và Tốc Độ Đánh khiến đòn đánh tấn công thêm các mục tiêu gần đó.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'ATTACK_SPEED',
      'CRITICAL_RATE',
      'ON_HIT',
      'MULTI_TARGET',
      'AREA_DAMAGE',
      'WAVE_CLEAR',
    ],
    goodAgainst: ['GROUPED_ENEMIES', 'MINION_WAVE', 'EXTENDED_FIGHT'],
    weakAgainst: ['SINGLE_TARGET_DUEL', 'ANTI_ATTACK_SPEED'],
    componentItemKeys: ['recurve-bow', 'cloak-of-agility'],
  },
  {
    key: 'youmuus-ghostblade',
    name: "Youmuu's Ghostblade",
    nameVi: 'Kiếm Ma Youmuu',
    description:
      'Lethality item that grants high movement speed and bonus attack speed after reaching maximum Momentum.',
    descriptionVi:
      'Trang bị xuyên giáp cung cấp Tốc Độ Di Chuyển cao và thêm Tốc Độ Đánh khi đạt tối đa cộng dồn Động Lực.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'ARMOR_PENETRATION',
      'MOVEMENT_SPEED',
      'ATTACK_SPEED',
      'ROAM',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_ARMOR', 'PICK_COMPOSITION'],
    weakAgainst: ['HIGH_ARMOR', 'HARD_CROWD_CONTROL'],
    componentItemKeys: ['serrated-dirk', 'caulfields-warhammer'],
  },
  {
    key: 'duskblade-of-draktharr',
    name: 'Duskblade of Draktharr',
    nameVi: 'Dạ Kiếm Draktharr',
    description:
      'Assassin item that empowers the first attack against a champion with burst physical damage and a powerful slow.',
    descriptionVi:
      'Trang bị sát thủ cường hóa đòn đánh đầu tiên lên tướng bằng sát thương vật lý bùng nổ và hiệu ứng làm chậm mạnh.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'ARMOR_PENETRATION',
      'BURST_DAMAGE',
      'SLOW',
      'TAKEDOWN_RESET',
      'PICK',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_ARMOR', 'ISOLATED_TARGET'],
    weakAgainst: ['HIGH_ARMOR', 'TANK', 'EXTENDED_FIGHT'],
    componentItemKeys: ['serrated-dirk', 'caulfields-warhammer'],
  },
  {
    key: 'infinity-edge',
    name: 'Infinity Edge',
    nameVi: 'Vô Cực Kiếm',
    description:
      'Critical strike item that significantly increases critical strike damage.',
    descriptionVi:
      'Trang bị chí mạng gia tăng đáng kể sát thương của các đòn chí mạng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'CRITICAL_RATE',
      'CRITICAL_DAMAGE',
      'SCALING',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LATE_GAME'],
    weakAgainst: ['HIGH_ARMOR', 'ANTI_CRIT'],
    componentItemKeys: ['bf-sword', 'cloak-of-agility'],
  },
  {
    key: 'mortal-reminder',
    name: 'Mortal Reminder',
    nameVi: 'Lời Nhắc Tử Vong',
    description:
      'Critical strike item that grants percentage armor penetration and applies Grievous Wounds with physical damage.',
    descriptionVi:
      'Trang bị chí mạng cung cấp Xuyên Giáp theo phần trăm và gây Vết Thương Sâu bằng sát thương vật lý.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'CRITICAL_RATE',
      'ATTACK_SPEED',
      'ARMOR_PENETRATION',
      'ANTI_HEAL',
      'ANTI_ARMOR',
    ],
    goodAgainst: ['HIGH_ARMOR', 'TANK', 'HEALING', 'SUSTAIN'],
    weakAgainst: ['LOW_ARMOR', 'NO_HEALING_TEAM'],
    componentItemKeys: [
      'cloak-of-agility',
      'last-whisper',
      'executioners-calling',
    ],
  },
  {
    key: 'black-cleaver',
    name: 'Black Cleaver',
    nameVi: 'Rìu Đen',
    description:
      'Fighter item that repeatedly reduces enemy armor and grants movement speed when dealing physical damage.',
    descriptionVi:
      'Trang bị đấu sĩ liên tục giảm Giáp của kẻ địch và cung cấp Tốc Độ Di Chuyển khi gây sát thương vật lý.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'ARMOR_REDUCTION',
      'MOVEMENT_SPEED',
      'EXTENDED_FIGHT',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['HIGH_ARMOR', 'TANK', 'EXTENDED_FIGHT'],
    weakAgainst: ['MAGIC_DAMAGE', 'SHORT_BURST_FIGHT'],
    componentItemKeys: ['phage', 'kindlegem', 'long-sword'],
  },
  {
    key: 'manamune',
    name: 'Manamune',
    nameVi: 'Thần Kiếm Manamune',
    description:
      'Mana-scaling physical item that converts maximum mana into attack damage and transforms into Muramana.',
    descriptionVi:
      'Trang bị vật lý tăng sức mạnh theo Năng Lượng, chuyển Năng Lượng tối đa thành Sức Mạnh Công Kích và biến đổi thành Muramana.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'MANA',
      'ABILITY_HASTE',
      'MANA_REFUND',
      'SCALING_MANA',
      'TRANSFORM',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'MANA_HUNGRY_CHAMPION', 'SCALING'],
    weakAgainst: ['EARLY_BURST', 'MANALESS_CHAMPION'],
    componentItemKeys: ['tear-of-the-goddess', 'caulfields-warhammer'],
  },
  {
    key: 'muramana',
    name: 'Muramana',
    nameVi: 'Thần Kiếm Muramana',
    description:
      'Transformed mana item that consumes mana to add physical damage to attacks and abilities.',
    descriptionVi:
      'Trang bị biến đổi sử dụng Năng Lượng để gây thêm sát thương vật lý bằng đòn đánh và kỹ năng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.TRANSFORMED,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'MANA',
      'ABILITY_HASTE',
      'MANA_SCALING',
      'ON_HIT',
      'ABILITY_DAMAGE',
      'PHYSICAL_DAMAGE',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'POKE', 'MANA_HUNGRY_CHAMPION'],
    weakAgainst: ['LOW_MANA', 'MANALESS_CHAMPION'],
    componentItemKeys: ['manamune'],
  },
  {
    key: 'trinity-force',
    name: 'Trinity Force',
    nameVi: 'Tam Hợp Kiếm',
    description:
      'Versatile fighter item that empowers attacks after abilities and grants movement speed while fighting.',
    descriptionVi:
      'Trang bị đấu sĩ đa dụng cường hóa đòn đánh sau khi dùng kỹ năng và tăng Tốc Độ Di Chuyển khi giao tranh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.HYBRID,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ATTACK_SPEED',
      'ABILITY_HASTE',
      'MOVEMENT_SPEED',
      'SPELLBLADE',
      'EMPOWERED_ATTACK',
      'SHORT_TRADE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'KITE', 'SHORT_TRADE'],
    weakAgainst: ['HIGH_ARMOR', 'ANTI_ATTACK_SPEED'],
    componentItemKeys: ['sheen', 'phage', 'stinger'],
  },
  {
    key: 'maw-of-malmortius',
    name: 'Maw of Malmortius',
    nameVi: 'Chùy Gai Malmortius',
    description:
      'Attack damage item that grants magic resistance and a magic shield when health becomes low.',
    descriptionVi:
      'Trang bị Sức Mạnh Công Kích cung cấp Kháng Phép và tạo lá chắn phép khi Máu xuống thấp.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'MAGIC_RESIST',
      'ABILITY_HASTE',
      'MAGIC_SHIELD',
      'LIFELINE',
      'OMNI_VAMP',
      'ANTI_MAGIC_BURST',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'MAGIC_BURST', 'AP_ASSASSIN'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'ANTI_SHIELD'],
    componentItemKeys: ['hexdrinker', 'hexdrinker'],
  },
  {
    key: 'deaths-dance',
    name: "Death's Dance",
    nameVi: 'Vũ Điệu Tử Thần',
    description:
      'Defensive fighter item that delays incoming damage and restores health after champion takedowns.',
    descriptionVi:
      'Trang bị đấu sĩ phòng thủ trì hoãn sát thương nhận vào và hồi Máu sau khi hạ gục tướng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'ARMOR',
      'ABILITY_HASTE',
      'DAMAGE_DELAY',
      'TAKEDOWN_REWARD',
      'HEALTH_RESTORE',
      'ANTI_BURST',
    ],
    goodAgainst: ['BURST_DAMAGE', 'PHYSICAL_DAMAGE', 'EXTENDED_FIGHT'],
    weakAgainst: ['TRUE_DAMAGE', 'ANTI_HEAL', 'NO_TAKEDOWN_FIGHT'],
    componentItemKeys: ['caulfields-warhammer', 'chain-vest'],
  },
  {
    key: 'phantom-dancer',
    name: 'Phantom Dancer',
    nameVi: 'Ma Vũ Song Kiếm',
    description:
      'Critical strike item that grants high attack speed and movement speed during combat.',
    descriptionVi:
      'Trang bị chí mạng cung cấp lượng lớn Tốc Độ Đánh và Tốc Độ Di Chuyển khi giao tranh.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'CRITICAL_RATE',
      'ATTACK_SPEED',
      'MOVEMENT_SPEED',
      'KITE',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: [
      'KITE_COMPOSITION',
      'LOW_MOBILITY_CHAMPION',
      'EXTENDED_FIGHT',
    ],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'BURST_DAMAGE'],
    componentItemKeys: ['zeal', 'long-sword', 'dagger'],
  },
  {
    key: 'nashors-tooth',
    name: "Nashor's Tooth",
    nameVi: 'Nanh Nashor',
    description:
      'Adaptive on-hit item that grants attack speed, ability haste, and bonus damage on attacks.',
    descriptionVi:
      'Trang bị đòn đánh thích ứng cung cấp Tốc Độ Đánh, Điểm Hồi Kỹ Năng và sát thương cộng thêm trên đòn đánh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.HYBRID,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'ADAPTIVE_DAMAGE',
      'ATTACK_DAMAGE',
      'ABILITY_POWER',
      'ATTACK_SPEED',
      'ABILITY_HASTE',
      'ON_HIT',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'HIGH_HEALTH', 'MELEE_CHAMPION'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'BURST_DAMAGE'],
    componentItemKeys: ['nashors-talon', 'recurve-bow'],
  },
  {
    key: 'wits-end',
    name: "Wit's End",
    nameVi: 'Đao Tím',
    description:
      'On-hit attack speed item that grants magic resistance, bonus magic damage, and healing at low health.',
    descriptionVi:
      'Trang bị đòn đánh cung cấp Tốc Độ Đánh, Kháng Phép, sát thương phép cộng thêm và hồi Máu khi còn ít Máu.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'ATTACK_SPEED',
      'MAGIC_RESIST',
      'ON_HIT',
      'MAGIC_DAMAGE',
      'LOW_HEALTH_SUSTAIN',
      'ANTI_MAGIC_DAMAGE',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'EXTENDED_FIGHT', 'AP_CHAMPION'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'ANTI_HEAL', 'ANTI_ATTACK_SPEED'],
    componentItemKeys: ['recurve-bow', 'negatron-cloak'],
  },
  {
    key: 'essence-reaver',
    name: 'Essence Reaver',
    nameVi: 'Lưỡi Hái Linh Hồn',
    description:
      'Critical strike item that empowers attacks after abilities and restores missing mana on hit.',
    descriptionVi:
      'Trang bị chí mạng cường hóa đòn đánh sau khi dùng kỹ năng và hồi Năng Lượng đã mất trên đòn đánh.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'CRITICAL_RATE',
      'ABILITY_HASTE',
      'SPELLBLADE',
      'EMPOWERED_ATTACK',
      'MANA_RESTORE',
      'MOVEMENT_SPEED',
    ],
    goodAgainst: [
      'SHORT_TRADE',
      'MANA_HUNGRY_CHAMPION',
      'ABILITY_RELIANT_CHAMPION',
    ],
    weakAgainst: ['MANALESS_CHAMPION', 'HIGH_ARMOR'],
    componentItemKeys: ['sheen', 'cloak-of-agility', 'long-sword'],
  },
  {
    key: 'seryldas-grudge',
    name: "Serylda's Grudge",
    nameVi: 'Thương Phục Hận Serylda',
    description:
      'Physical penetration item that slows enemies with damaging abilities and applies bleed and Grievous Wounds after repeated slows.',
    descriptionVi:
      'Trang bị xuyên giáp làm chậm kẻ địch bằng kỹ năng gây sát thương, đồng thời gây chảy máu và Vết Thương Sâu sau nhiều lần làm chậm.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'ARMOR_PENETRATION',
      'SLOW',
      'BLEED',
      'ANTI_HEAL',
      'KITE',
    ],
    goodAgainst: [
      'HIGH_ARMOR',
      'HEALING',
      'KITE_COMPOSITION',
      'LOW_MOBILITY_CHAMPION',
    ],
    weakAgainst: ['LOW_ARMOR', 'ABILITY_DOWNTIME'],
    componentItemKeys: ['last-whisper', 'caulfields-warhammer', 'long-sword'],
  },
  {
    key: 'navori-quickblades',
    name: 'Navori Quickblades',
    nameVi: 'Đoản Đao Navori',
    description:
      'Critical strike and attack speed item that reduces basic ability cooldowns through attacks.',
    descriptionVi:
      'Trang bị chí mạng và Tốc Độ Đánh giúp giảm thời gian hồi các kỹ năng cơ bản thông qua đòn đánh.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'CRITICAL_RATE',
      'ATTACK_SPEED',
      'MOVEMENT_SPEED',
      'COOLDOWN_REDUCTION',
      'ABILITY_RELIANT_CHAMPION',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'ABILITY_DOWNTIME'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'BURST_DAMAGE'],
    componentItemKeys: ['zeal', 'dagger', 'dagger'],
  },
  {
    key: 'edge-of-night',
    name: 'Edge of Night',
    nameVi: 'Áo Choàng Bóng Tối',
    description:
      'Attack damage and health item that grants armor penetration and blocks the next hostile ability.',
    descriptionVi:
      'Trang bị cung cấp Sức Mạnh Công Kích, Máu, Xuyên Giáp và chặn kỹ năng nguy hiểm tiếp theo của đối phương.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'HEALTH',
      'ARMOR_PENETRATION',
      'SPELL_SHIELD',
      'ANTI_CROWD_CONTROL',
      'ENGAGE',
    ],
    goodAgainst: ['PICK_COMPOSITION', 'CROWD_CONTROL', 'SQUISHY_CHAMPION'],
    weakAgainst: ['POKE', 'MULTI_HIT', 'HIGH_ARMOR'],
    componentItemKeys: ['serrated-dirk', 'jaurims-fist', 'long-sword'],
  },
  {
    key: 'divine-sunderer',
    name: 'Divine Sunderer',
    nameVi: 'Búa Rìu Sát Thần',
    description:
      'Spellblade fighter item that deals maximum-health damage and heals after empowered attacks.',
    descriptionVi:
      'Trang bị đấu sĩ Spellblade gây sát thương theo Máu tối đa của mục tiêu và hồi Máu sau đòn đánh cường hóa.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'SPELLBLADE',
      'EMPOWERED_ATTACK',
      'MAX_HEALTH_DAMAGE',
      'HEAL',
      'ANTI_TANK',
    ],
    goodAgainst: ['TANK', 'HIGH_HEALTH', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_HEAL', 'ABILITY_DOWNTIME', 'SQUISHY_CHAMPION'],
    componentItemKeys: ['sheen', 'kindlegem', 'jaurims-fist'],
  },
  {
    key: 'serpents-fang',
    name: "Serpent's Fang",
    nameVi: 'Kiếm Ác Xà',
    description:
      'Physical assassin item that reduces enemy shields and grants armor penetration.',
    descriptionVi:
      'Trang bị sát thủ vật lý làm giảm hiệu quả lá chắn của kẻ địch và cung cấp Xuyên Giáp.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'ARMOR_PENETRATION',
      'ANTI_SHIELD',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SHIELD', 'SQUISHY_CHAMPION', 'LOW_ARMOR'],
    weakAgainst: ['NO_SHIELD_TEAM', 'HIGH_ARMOR'],
    componentItemKeys: ['serrated-dirk', 'caulfields-warhammer'],
  },
  {
    key: 'chempunk-chainsword',
    name: 'Chempunk Chainsword',
    nameVi: 'Cưa Xích Hóa Kỹ',
    description:
      'Physical fighter item that applies Grievous Wounds and provides health, attack damage, and ability haste.',
    descriptionVi:
      'Trang bị đấu sĩ vật lý gây Vết Thương Sâu và cung cấp Máu, Sức Mạnh Công Kích cùng Điểm Hồi Kỹ Năng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'ANTI_HEAL',
      'SUSTAINED_DAMAGE',
    ],
    goodAgainst: ['HEALING', 'SUSTAIN', 'EXTENDED_FIGHT'],
    weakAgainst: ['NO_HEALING_TEAM', 'HIGH_ARMOR'],
    componentItemKeys: ['executioners-calling', 'caulfields-warhammer'],
  },
  {
    key: 'the-collector',
    name: 'The Collector',
    nameVi: 'Súng Hải Tặc',
    description:
      'Critical strike assassin item that grants armor penetration and executes enemies at low health.',
    descriptionVi:
      'Trang bị sát thủ chí mạng cung cấp Xuyên Giáp và kết liễu kẻ địch khi chúng còn ít Máu.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'CRITICAL_RATE',
      'ARMOR_PENETRATION',
      'EXECUTE',
      'BONUS_GOLD',
      'SNOWBALL',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_ARMOR', 'LOW_HEALTH_TARGET'],
    weakAgainst: ['HIGH_ARMOR', 'TANK'],
    componentItemKeys: ['serrated-dirk', 'cloak-of-agility'],
  },
  {
    key: 'steraks-gage',
    name: "Sterak's Gage",
    nameVi: 'Móng Vuốt Sterak',
    description:
      'Health fighter item that converts base attack damage into bonus attack damage and grants a low-health shield with crowd-control resistance.',
    descriptionVi:
      'Trang bị đấu sĩ cung cấp Máu, chuyển Sức Mạnh Công Kích cơ bản thành Sức Mạnh Công Kích cộng thêm và tạo lá chắn kèm kháng khống chế khi còn ít Máu.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'LIFELINE',
      'SHIELD',
      'TENACITY',
      'CLEANSE',
      'ANTI_BURST',
      'LOW_HEALTH_SURVIVAL',
    ],
    goodAgainst: ['BURST_DAMAGE', 'CROWD_CONTROL', 'DIVE'],
    weakAgainst: ['ANTI_SHIELD', 'PERCENT_HEALTH_DAMAGE', 'TRUE_DAMAGE'],
    componentItemKeys: ['bf-sword', 'jaurims-fist'],
  },
  {
    key: 'spear-of-shojin',
    name: 'Spear of Shojin',
    nameVi: 'Ngọn Giáo Shojin',
    description:
      'Health and attack damage item that grants ability haste and increases ability and passive damage during combat.',
    descriptionVi:
      'Trang bị cung cấp Máu, Sức Mạnh Công Kích, Điểm Hồi Kỹ Năng và tăng sát thương kỹ năng cùng nội tại khi giao tranh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'ABILITY_DAMAGE',
      'RAMPING_DAMAGE',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'ABILITY_RELIANT_CHAMPION', 'MONSTER'],
    weakAgainst: ['BURST_FIGHT', 'ABILITY_DOWNTIME'],
    componentItemKeys: ['jaurims-fist', 'jaurims-fist'],
  },
  {
    key: 'titanic-hydra',
    name: 'Titanic Hydra',
    nameVi: 'Rìu Đại Mãng Xà',
    description:
      'Health and attack damage item that periodically empowers attacks with area physical damage.',
    descriptionVi:
      'Trang bị cung cấp Máu và Sức Mạnh Công Kích, định kỳ cường hóa đòn đánh bằng sát thương vật lý diện rộng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'EMPOWERED_ATTACK',
      'AREA_DAMAGE',
      'WAVE_CLEAR',
      'STRUCTURE_DAMAGE',
      'BONUS_HEALTH_SCALING',
    ],
    goodAgainst: ['GROUPED_ENEMIES', 'MINION_WAVE', 'MELEE_CHAMPION'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE', 'KITE_COMPOSITION'],
    componentItemKeys: ['bamis-cinder', 'jaurims-fist'],
  },
  {
    key: 'terminus',
    name: 'Terminus',
    nameVi: 'Chùy Diệt Vong',
    description:
      'Hybrid on-hit item that grants stacking defenses and alternating armor and magic penetration.',
    descriptionVi:
      'Trang bị đòn đánh lai cung cấp phòng thủ cộng dồn và luân phiên Xuyên Giáp cùng Xuyên Kháng Phép.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.HYBRID,
      ItemCategory.ON_HIT,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'ATTACK_SPEED',
      'ON_HIT',
      'MAGIC_DAMAGE',
      'ARMOR',
      'MAGIC_RESIST',
      'ARMOR_PENETRATION',
      'MAGIC_PENETRATION',
      'STACKING',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['HIGH_ARMOR', 'HIGH_MAGIC_RESIST', 'TANK', 'EXTENDED_FIGHT'],
    weakAgainst: ['BURST_DAMAGE', 'ANTI_ATTACK_SPEED'],
    componentItemKeys: ['recurve-bow', 'bf-sword'],
  },
  {
    key: 'sundered-sky',
    name: 'Sundered Sky',
    nameVi: 'Bầu Trời Vỡ Nát',
    description:
      'Fighter item that periodically empowers the first attack against each champion to critically strike and restore health.',
    descriptionVi:
      'Trang bị đấu sĩ định kỳ cường hóa đòn đánh đầu tiên lên mỗi tướng, khiến đòn đó chí mạng và hồi Máu.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'EMPOWERED_ATTACK',
      'CRITICAL_DAMAGE',
      'HEALTH_RESTORE',
      'SUSTAIN',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'MELEE_CHAMPION', 'BURST_DAMAGE'],
    weakAgainst: ['ANTI_HEAL', 'KITE_COMPOSITION', 'HIGH_ARMOR'],
    componentItemKeys: ['caulfields-warhammer', 'jaurims-fist'],
  },
  {
    key: 'eclipse',
    name: 'Eclipse',
    nameVi: 'Nguyệt Đao',
    description:
      'Attack damage item that deals maximum-health damage and grants a shield after hitting a champion twice.',
    descriptionVi:
      'Trang bị Sức Mạnh Công Kích gây sát thương theo Máu tối đa và tạo lá chắn sau khi đánh trúng tướng hai lần.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'MAX_HEALTH_DAMAGE',
      'SHIELD',
      'SHORT_TRADE',
      'ANTI_TANK',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['TANK', 'HIGH_HEALTH', 'SHORT_TRADE'],
    weakAgainst: ['ANTI_SHIELD', 'ABILITY_DOWNTIME', 'HIGH_ARMOR'],
    componentItemKeys: ['caulfields-warhammer', 'caulfields-warhammer'],
  },
  {
    key: 'soul-transfer',
    name: 'Soul Transfer',
    nameVi: 'Chuyển Giao Linh Hồn',
    description:
      'Critical strike item that summons attacking clones after critical strikes against champions or large monsters.',
    descriptionVi:
      'Trang bị chí mạng triệu hồi phân thân tấn công sau khi chí mạng lên tướng hoặc quái lớn.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'CRITICAL_RATE',
      'ATTACK_SPEED',
      'SUMMON',
      'CLONE',
      'MULTI_TARGET',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['GROUPED_ENEMIES', 'MONSTER', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'BURST_DAMAGE', 'HIGH_ARMOR'],
    componentItemKeys: ['noonquiver', 'cloak-of-agility'],
  },
  {
    key: 'hullbreaker',
    name: 'Hullbreaker',
    nameVi: 'Búa Tiến Công',
    description:
      'Split-push item that empowers repeated attacks against champions, epic monsters, and structures while strengthening nearby siege minions.',
    descriptionVi:
      'Trang bị đẩy lẻ cường hóa các đòn đánh liên tiếp lên tướng, quái khủng và công trình, đồng thời tăng sức chống chịu cho lính công thành gần đó.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'MOVEMENT_SPEED',
      'EMPOWERED_ATTACK',
      'STRUCTURE_DAMAGE',
      'SPLIT_PUSH',
      'MINION_BUFF',
    ],
    goodAgainst: ['STRUCTURE', 'SIDE_LANE', 'LOW_MAP_PRESSURE'],
    weakAgainst: ['TEAMFIGHT', 'WAVE_CLEAR', 'COLLAPSE'],
    componentItemKeys: ['jaurims-fist', 'jaurims-fist'],
  },
  {
    key: 'guinsoos-rageblade',
    name: "Guinsoo's Rageblade",
    nameVi: 'Cuồng Đao Guinsoo',
    description:
      'Adaptive on-hit item that converts critical strike chance into bonus magic damage and repeatedly triggers on-hit effects.',
    descriptionVi:
      'Trang bị đòn đánh thích ứng chuyển Tỉ Lệ Chí Mạng thành sát thương phép cộng thêm và kích hoạt lặp lại các hiệu ứng trên đòn đánh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.HYBRID,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'ADAPTIVE_DAMAGE',
      'ATTACK_DAMAGE',
      'ABILITY_POWER',
      'ATTACK_SPEED',
      'MOVEMENT_SPEED',
      'ON_HIT',
      'MAGIC_DAMAGE',
      'CRITICAL_CONVERSION',
      'STACKING',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'HIGH_HEALTH', 'TANK'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'BURST_DAMAGE'],
    componentItemKeys: ['nashors-talon', 'recurve-bow'],
  },
  {
    key: 'kraken-slayer',
    name: 'Kraken Slayer',
    nameVi: 'Đồ Tể Kraken',
    description:
      'Attack speed item that periodically deals bonus physical damage scaling with the target’s missing health.',
    descriptionVi:
      'Trang bị Tốc Độ Đánh định kỳ gây thêm sát thương vật lý tăng theo lượng Máu đã mất của mục tiêu.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'ATTACK_SPEED',
      'MOVEMENT_SPEED',
      'ON_HIT',
      'MISSING_HEALTH_DAMAGE',
      'EXECUTE',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['LOW_HEALTH_TARGET', 'EXTENDED_FIGHT', 'HIGH_HEALTH'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'HIGH_ARMOR'],
    componentItemKeys: ['noonquiver', 'long-sword', 'dagger'],
  },
  {
    key: 'overlords-bloodmail',
    name: "Overlord's Bloodmail",
    nameVi: 'Huyết Giáp Bá Vương',
    description:
      'Health-scaling fighter item that converts bonus health into attack damage and increases damage while at low health.',
    descriptionVi:
      'Trang bị đấu sĩ tăng sức mạnh theo Máu, chuyển Máu cộng thêm thành Sức Mạnh Công Kích và tăng sát thương khi còn ít Máu.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'BONUS_HEALTH_SCALING',
      'LOW_HEALTH_DAMAGE',
      'SCALING',
      'BRUISER',
    ],
    goodAgainst: ['BURST_DAMAGE', 'EXTENDED_FIGHT'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE', 'EXECUTE', 'ANTI_HEAL'],
    componentItemKeys: ['jaurims-fist', 'jaurims-fist'],
  },
  {
    key: 'experimental-hexplate',
    name: 'Experimental Hexplate',
    nameVi: 'Giáp Thử Nghiệm Hextech',
    description:
      'Fighter item that grants ultimate ability haste and bonus attack and movement speed after casting the ultimate.',
    descriptionVi:
      'Trang bị đấu sĩ cung cấp Điểm Hồi Kỹ Năng cho chiêu cuối và tăng Tốc Độ Đánh cùng Tốc Độ Di Chuyển sau khi sử dụng chiêu cuối.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ATTACK_SPEED',
      'ULTIMATE_HASTE',
      'MOVEMENT_SPEED',
      'ULTIMATE_SYNERGY',
      'ENGAGE',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['KITE_COMPOSITION', 'EXTENDED_FIGHT'],
    weakAgainst: ['ULTIMATE_DOWNTIME', 'ANTI_ATTACK_SPEED'],
    componentItemKeys: ['phage', 'jaurims-fist', 'dagger'],
  },
  {
    key: 'lord-dominiks-regards',
    name: "Lord Dominik's Regards",
    nameVi: 'Nỏ Thần Dominik',
    description:
      'Critical strike item that grants high percentage armor penetration and increased damage against enemies with bonus health.',
    descriptionVi:
      'Trang bị chí mạng cung cấp lượng lớn Xuyên Giáp theo phần trăm và tăng sát thương lên kẻ địch có nhiều Máu cộng thêm.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.PHYSICAL],
    tags: [
      'ATTACK_DAMAGE',
      'CRITICAL_RATE',
      'ARMOR_PENETRATION',
      'BONUS_HEALTH_DAMAGE',
      'ANTI_TANK',
      'ANTI_ARMOR',
    ],
    goodAgainst: ['HIGH_ARMOR', 'HIGH_HEALTH', 'TANK'],
    weakAgainst: ['LOW_ARMOR', 'SQUISHY_CHAMPION'],
    componentItemKeys: ['cloak-of-agility', 'last-whisper', 'long-sword'],
  },
  {
    key: 'stridebreaker',
    name: 'Stridebreaker',
    nameVi: 'Chùy Phản Kích',
    description:
      'Active fighter item that dashes a short distance, damages and slows nearby enemies, and grants movement speed after physical damage.',
    descriptionVi:
      'Trang bị đấu sĩ kích hoạt lướt một đoạn ngắn, gây sát thương và làm chậm kẻ địch xung quanh, đồng thời tăng Tốc Độ Di Chuyển sau khi gây sát thương vật lý.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ATTACK_SPEED',
      'DASH',
      'SLOW',
      'AREA_DAMAGE',
      'MOVEMENT_SPEED',
      'ENGAGE',
      'STICK_TO_TARGET',
    ],
    goodAgainst: [
      'KITE_COMPOSITION',
      'LOW_MOBILITY_CHAMPION',
      'GROUPED_ENEMIES',
    ],
    weakAgainst: ['HARD_CROWD_CONTROL', 'DISENGAGE'],
    componentItemKeys: ['phage', 'jaurims-fist', 'dagger'],
  },
  {
    key: 'goredrinker',
    name: 'Goredrinker',
    nameVi: 'Chùy Hấp Huyết',
    description:
      'Active fighter item that deals area physical damage and restores health based on missing health and enemy champions hit.',
    descriptionVi:
      'Trang bị đấu sĩ kích hoạt gây sát thương vật lý diện rộng và hồi Máu dựa trên lượng Máu đã mất cùng số tướng địch trúng đòn.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'HEALTH',
      'ATTACK_DAMAGE',
      'ABILITY_HASTE',
      'OMNI_VAMP',
      'AREA_DAMAGE',
      'HEALTH_RESTORE',
      'MISSING_HEALTH_HEAL',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['GROUPED_ENEMIES', 'EXTENDED_FIGHT', 'BURST_DAMAGE'],
    weakAgainst: ['ANTI_HEAL', 'KITE_COMPOSITION', 'SINGLE_TARGET_DUEL'],
    componentItemKeys: ['phage', 'jaurims-fist', 'ring-of-revelation'],
  },
  {
    key: 'galeforce',
    name: 'Galeforce',
    nameVi: 'Cung Phong Linh',
    description:
      'Active critical strike item that dashes in a chosen direction and fires missiles at a nearby low-health enemy.',
    descriptionVi:
      'Trang bị chí mạng kích hoạt lướt theo hướng chỉ định và bắn tên lửa vào kẻ địch gần đó có lượng Máu thấp.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'CRITICAL_RATE',
      'ATTACK_SPEED',
      'MOVEMENT_SPEED',
      'DASH',
      'BURST_DAMAGE',
      'EXECUTE',
      'REPOSITION',
    ],
    goodAgainst: ['LOW_HEALTH_TARGET', 'SKILLSHOT', 'KITE_COMPOSITION'],
    weakAgainst: ['HARD_CROWD_CONTROL', 'HIGH_ARMOR', 'DASH_COUNTER'],
    componentItemKeys: ['zeal', 'bf-sword'],
  },
  {
    key: 'mercurial-scimitar',
    name: 'Mercurial Scimitar',
    nameVi: 'Đao Thủy Ngân',
    description:
      'Active physical item that removes crowd control, briefly grants crowd-control immunity, and provides defensive resistance afterward.',
    descriptionVi:
      'Trang bị vật lý kích hoạt loại bỏ hiệu ứng khống chế, miễn nhiễm khống chế trong thời gian ngắn và tăng khả năng kháng hiệu ứng sau đó.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.PHYSICAL,
      ItemCategory.DEFENSIVE,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'ATTACK_DAMAGE',
      'PHYSICAL_VAMP',
      'MAGIC_RESIST',
      'CLEANSE',
      'TENACITY',
      'SLOW_RESISTANCE',
      'ANTI_CROWD_CONTROL',
      'SUSTAIN',
    ],
    goodAgainst: ['CROWD_CONTROL', 'MAGIC_DAMAGE', 'PICK_COMPOSITION'],
    weakAgainst: ['KNOCK_UP', 'KNOCK_BACK', 'PHYSICAL_DAMAGE'],
    componentItemKeys: ['quicksilver-sash', 'vampiric-scepter', 'long-sword'],
  },
  {
    key: 'ludens-echo',
    name: "Luden's Echo",
    nameVi: 'Vọng Âm Luden',
    description:
      'Burst magic item that empowers the next damaging ability or empowered attack with additional area magic damage.',
    descriptionVi:
      'Trang bị phép bùng nổ cường hóa kỹ năng gây sát thương hoặc đòn đánh cường hóa tiếp theo bằng sát thương phép diện rộng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'BURST_DAMAGE',
      'MAGIC_DAMAGE',
      'AREA_DAMAGE',
      'POKE',
      'WAVE_CLEAR',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'GROUPED_ENEMIES', 'MINION_WAVE'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'EXTENDED_FIGHT'],
    componentItemKeys: ['lost-chapter', 'hextech-alternator'],
  },
  {
    key: 'morellonomicon',
    name: 'Morellonomicon',
    nameVi: 'Quỷ Thư Morello',
    description:
      'Ability power item that applies Grievous Wounds when dealing magic damage to enemy champions.',
    descriptionVi:
      'Trang bị Sức Mạnh Phép Thuật gây Vết Thương Sâu khi gây sát thương phép lên tướng địch.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.SUPPORT,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'MAGIC_DAMAGE',
      'ANTI_HEAL',
    ],
    goodAgainst: ['HEALING', 'SUSTAIN', 'EXTENDED_FIGHT'],
    weakAgainst: ['NO_HEALING_TEAM', 'HIGH_MAGIC_RESIST'],
    componentItemKeys: ['oblivion-orb', 'kindlegem', 'amplifying-tome'],
  },
  {
    key: 'rabadons-deathcap',
    name: "Rabadon's Deathcap",
    nameVi: 'Mũ Phù Thủy Rabadon',
    description:
      'Late-game magic item that provides a large amount of ability power and increases total ability power.',
    descriptionVi:
      'Trang bị phép cuối trận cung cấp lượng lớn Sức Mạnh Phép Thuật và gia tăng tổng Sức Mạnh Phép Thuật.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'ABILITY_POWER_AMPLIFICATION',
      'SCALING',
      'LATE_GAME',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LATE_GAME', 'SCALING'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'EARLY_GAME'],
    componentItemKeys: ['needlessly-large-rod', 'needlessly-large-rod'],
  },
  {
    key: 'rylais-crystal-scepter',
    name: "Rylai's Crystal Scepter",
    nameVi: 'Trượng Pha Lê Rylai',
    description:
      'Ability power and health item that causes damaging abilities and empowered attacks to slow enemies.',
    descriptionVi:
      'Trang bị cung cấp Sức Mạnh Phép Thuật và Máu, khiến kỹ năng gây sát thương cùng đòn đánh cường hóa làm chậm kẻ địch.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'SLOW',
      'MAGIC_DAMAGE',
      'KITE',
      'STICK_TO_TARGET',
      'UTILITY',
    ],
    goodAgainst: [
      'LOW_MOBILITY_CHAMPION',
      'KITE_COMPOSITION',
      'EXTENDED_FIGHT',
    ],
    weakAgainst: ['SLOW_RESISTANCE', 'HIGH_MAGIC_RESIST'],
    componentItemKeys: ['blasting-wand', 'giants-belt', 'amplifying-tome'],
  },
  {
    key: 'liandrys-torment',
    name: "Liandry's Torment",
    nameVi: 'Mặt Nạ Đọa Đày Liandry',
    description:
      'Damage-over-time magic item that burns enemies based on maximum health and increases damage during extended combat.',
    descriptionVi:
      'Trang bị phép gây sát thương theo thời gian, thiêu đốt kẻ địch dựa trên Máu tối đa và tăng sát thương khi giao tranh kéo dài.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'MAGIC_DAMAGE',
      'BURN_DAMAGE',
      'DAMAGE_OVER_TIME',
      'MAX_HEALTH_DAMAGE',
      'RAMPING_DAMAGE',
      'ANTI_TANK',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['TANK', 'HIGH_HEALTH', 'EXTENDED_FIGHT'],
    weakAgainst: ['BURST_FIGHT', 'HIGH_MAGIC_RESIST'],
    componentItemKeys: ['fated-ashes', 'haunting-guise'],
  },
  {
    key: 'rod-of-ages',
    name: 'Rod of Ages',
    nameVi: 'Trượng Trường Sinh',
    description:
      'Scaling magic item that grants health, mana, and ability power over time while restoring health and mana during combat.',
    descriptionVi:
      'Trang bị phép tăng tiến theo thời gian, cung cấp Máu, Năng Lượng, Sức Mạnh Phép Thuật và hồi phục tài nguyên trong giao tranh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'MANA',
      'ABILITY_POWER',
      'SCALING',
      'HEALTH_RESTORE',
      'MANA_RESTORE',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'SCALING', 'POKE'],
    weakAgainst: ['EARLY_GAME', 'BURST_DAMAGE', 'MANALESS_CHAMPION'],
    componentItemKeys: ['blasting-wand', 'catalyst-of-aeons'],
  },
  {
    key: 'lich-bane',
    name: 'Lich Bane',
    nameVi: 'Song Kiếm Tai Ương',
    description:
      'Ability power item that empowers the next attack after casting an ability with bonus magic damage.',
    descriptionVi:
      'Trang bị Sức Mạnh Phép Thuật cường hóa đòn đánh tiếp theo sau khi dùng kỹ năng bằng sát thương phép cộng thêm.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC, ItemCategory.HYBRID],
    tags: [
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'MOVEMENT_SPEED',
      'SPELLBLADE',
      'EMPOWERED_ATTACK',
      'MAGIC_DAMAGE',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'SHORT_TRADE', 'LOW_MAGIC_RESIST'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'ABILITY_DOWNTIME'],
    componentItemKeys: ['aether-wisp', 'sheen', 'amplifying-tome'],
  },
  {
    key: 'archangels-staff',
    name: "Archangel's Staff",
    nameVi: 'Quyền Trượng Thiên Thần',
    description:
      'Mana-scaling magic item that converts maximum mana into ability power and transforms into Seraph’s Embrace.',
    descriptionVi:
      'Trang bị phép tăng sức mạnh theo Năng Lượng, chuyển Năng Lượng tối đa thành Sức Mạnh Phép Thuật và biến đổi thành Quyền Trượng Đại Thiên Sứ.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'MANA_REFUND',
      'MANA_SCALING',
      'TRANSFORM',
      'SCALING',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'MANA_HUNGRY_CHAMPION', 'SCALING'],
    weakAgainst: ['EARLY_BURST', 'MANALESS_CHAMPION'],
    componentItemKeys: [
      'tear-of-the-goddess',
      'lost-chapter',
      'fiendish-codex',
    ],
  },
  {
    key: 'seraphs-embrace',
    name: "Seraph's Embrace",
    nameVi: 'Quyền Trượng Đại Thiên Sứ',
    description:
      'Transformed mana item that grants high ability power and mana while creating a shield at low health.',
    descriptionVi:
      'Trang bị biến đổi cung cấp lượng lớn Sức Mạnh Phép Thuật và Năng Lượng, đồng thời tạo lá chắn khi còn ít Máu.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.TRANSFORMED,
    ],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'MANA_SCALING',
      'MANA_REFUND',
      'LIFELINE',
      'SHIELD',
      'ANTI_BURST',
    ],
    goodAgainst: ['BURST_DAMAGE', 'EXTENDED_FIGHT', 'MANA_HUNGRY_CHAMPION'],
    weakAgainst: ['ANTI_SHIELD', 'MANALESS_CHAMPION', 'LOW_MANA'],
    componentItemKeys: ['archangels-staff'],
  },
  {
    key: 'infinity-orb',
    name: 'Infinity Orb',
    nameVi: 'Quả Cầu Vô Cực',
    description:
      'Burst magic item that grants flat magic penetration and increases damage against low-health enemies.',
    descriptionVi:
      'Trang bị phép bùng nổ cung cấp Xuyên Kháng Phép cố định và tăng sát thương lên kẻ địch còn ít Máu.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MAGIC_PENETRATION',
      'MAGIC_DAMAGE',
      'LOW_HEALTH_DAMAGE',
      'EXECUTE',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_HEALTH_TARGET', 'LOW_MAGIC_RESIST'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'TANK'],
    componentItemKeys: ['needlessly-large-rod', 'hextech-alternator'],
  },
  {
    key: 'oceanids-trident',
    name: "Oceanid's Trident",
    nameVi: 'Đinh Ba Hải Linh',
    description:
      'Ability power item that reduces enemy shields when dealing ability damage.',
    descriptionVi:
      'Trang bị Sức Mạnh Phép Thuật làm giảm hiệu quả lá chắn của kẻ địch khi gây sát thương bằng kỹ năng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.SUPPORT,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'ANTI_SHIELD',
      'MAGIC_DAMAGE',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['SHIELD', 'ENCHANTER', 'PROTECT_COMPOSITION'],
    weakAgainst: ['NO_SHIELD_TEAM', 'HIGH_MAGIC_RESIST'],
    componentItemKeys: ['fiendish-codex', 'blasting-wand', 'ruby-crystal'],
  },
  {
    key: 'cosmic-drive',
    name: 'Cosmic Drive',
    nameVi: 'Động Cơ Vũ Trụ',
    description:
      'Ability power item that grants movement speed after dealing magic or true damage to enemy champions.',
    descriptionVi:
      'Trang bị Sức Mạnh Phép Thuật tăng Tốc Độ Di Chuyển sau khi gây sát thương phép hoặc sát thương chuẩn lên tướng địch.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'MOVEMENT_SPEED',
      'KITE',
      'REPOSITION',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: [
      'LOW_MOBILITY_CHAMPION',
      'KITE_COMPOSITION',
      'EXTENDED_FIGHT',
    ],
    weakAgainst: ['HARD_CROWD_CONTROL', 'BURST_DAMAGE'],
    componentItemKeys: ['aether-wisp', 'fiendish-codex', 'kindlegem'],
  },
  {
    key: 'riftmaker',
    name: 'Riftmaker',
    nameVi: 'Quyền Trượng Ác Thần',
    description:
      'Extended-combat magic item that ramps damage, grants omnivamp at maximum strength, and converts bonus health into ability power.',
    descriptionVi:
      'Trang bị phép dành cho giao tranh kéo dài, tăng dần sát thương, cung cấp Hút Máu Toàn Phần khi đạt tối đa và chuyển Máu cộng thêm thành Sức Mạnh Phép Thuật.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'RAMPING_DAMAGE',
      'OMNI_VAMP',
      'BONUS_HEALTH_SCALING',
      'SUSTAIN',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['TANK', 'HIGH_HEALTH', 'EXTENDED_FIGHT'],
    weakAgainst: ['BURST_FIGHT', 'ANTI_HEAL', 'HIGH_MAGIC_RESIST'],
    componentItemKeys: ['fiendish-codex', 'haunting-guise'],
  },
  {
    key: 'horizon-focus',
    name: 'Horizon Focus',
    nameVi: 'Kính Nhắm Ma Pháp',
    description:
      'Long-range magic item that reveals distant targets and increases damage dealt to them.',
    descriptionVi:
      'Trang bị phép tầm xa làm lộ diện mục tiêu trúng kỹ năng từ khoảng cách xa và tăng sát thương gây lên chúng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.UTILITY,
    ],
    tags: [
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'LONG_RANGE',
      'POKE',
      'DAMAGE_AMPLIFICATION',
      'REVEAL',
      'VISION',
    ],
    goodAgainst: ['LONG_RANGE_POKE', 'SQUISHY_CHAMPION', 'STEALTH'],
    weakAgainst: ['MELEE_CHAMPION', 'DIVE', 'HIGH_MAGIC_RESIST'],
    componentItemKeys: ['fiendish-codex', 'fiendish-codex', 'amplifying-tome'],
  },
  {
    key: 'malignance',
    name: 'Malignance',
    nameVi: 'Hỏa Khuẩn',
    description:
      'Ultimate-focused magic item that reduces ultimate cooldown and creates a damaging zone that lowers enemy magic resistance.',
    descriptionVi:
      'Trang bị phép tập trung vào chiêu cuối, giảm thời gian hồi chiêu cuối và tạo vùng sát thương làm giảm Kháng Phép của kẻ địch.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'ULTIMATE_HASTE',
      'ULTIMATE_SYNERGY',
      'MAGIC_DAMAGE',
      'AREA_DAMAGE',
      'MAGIC_RESIST_REDUCTION',
      'DAMAGE_OVER_TIME',
    ],
    goodAgainst: [
      'GROUPED_ENEMIES',
      'HIGH_MAGIC_RESIST',
      'ULTIMATE_RELIANT_CHAMPION',
    ],
    weakAgainst: ['ULTIMATE_DOWNTIME', 'MOBILE_CHAMPION'],
    componentItemKeys: ['lost-chapter', 'blasting-wand'],
  },
  {
    key: 'blackfire-torch',
    name: 'Blackfire Torch',
    nameVi: 'Đuốc Hắc Hỏa',
    description:
      'Damage-over-time magic item that burns enemies with abilities and grants ability power for each affected target.',
    descriptionVi:
      'Trang bị phép gây sát thương theo thời gian, thiêu đốt kẻ địch bằng kỹ năng và tăng Sức Mạnh Phép Thuật theo số mục tiêu bị ảnh hưởng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MANA',
      'ABILITY_HASTE',
      'BURN_DAMAGE',
      'DAMAGE_OVER_TIME',
      'RAMPING_DAMAGE',
      'AREA_DAMAGE',
      'WAVE_CLEAR',
    ],
    goodAgainst: [
      'GROUPED_ENEMIES',
      'EXTENDED_FIGHT',
      'MINION_WAVE',
      'MONSTER',
    ],
    weakAgainst: ['BURST_FIGHT', 'HIGH_MAGIC_RESIST'],
    componentItemKeys: ['fated-ashes', 'lost-chapter'],
  },
  {
    key: 'dusk-and-dawn',
    name: 'Dusk and Dawn',
    nameVi: 'Hoàng Hôn Và Bình Minh',
    description:
      'Hybrid Spellblade item that empowers attacks after abilities and applies on-hit effects an additional time.',
    descriptionVi:
      'Trang bị Spellblade lai cường hóa đòn đánh sau khi dùng kỹ năng và kích hoạt thêm một lần các hiệu ứng trên đòn đánh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.HYBRID,
      ItemCategory.ON_HIT,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'ATTACK_SPEED',
      'ABILITY_HASTE',
      'SPELLBLADE',
      'EMPOWERED_ATTACK',
      'ON_HIT',
      'MAGIC_DAMAGE',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'MELEE_CHAMPION', 'HIGH_HEALTH'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'ABILITY_DOWNTIME', 'BURST_DAMAGE'],
    componentItemKeys: ['blasting-wand', 'sheen', 'kindlegem'],
  },
  {
    key: 'stormsurge',
    name: 'Stormsurge',
    nameVi: 'Bão Tố Cuồng Phong',
    description:
      'Burst magic item that marks enemies after dealing heavy damage and later strikes them with additional magic damage.',
    descriptionVi:
      'Trang bị phép bùng nổ đánh dấu kẻ địch sau khi gây lượng lớn sát thương và sau đó giáng thêm sát thương phép lên chúng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MAGIC_PENETRATION',
      'MOVEMENT_SPEED',
      'BURST_DAMAGE',
      'DELAYED_DAMAGE',
      'BONUS_GOLD',
      'SNOWBALL',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_MAGIC_RESIST', 'LOW_HEALTH_TARGET'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'TANK', 'EXTENDED_FIGHT'],
    componentItemKeys: ['aether-wisp', 'hextech-alternator'],
  },
  {
    key: 'void-staff',
    name: 'Void Staff',
    nameVi: 'Trượng Hư Vô',
    description:
      'Magic damage item that provides a large amount of percentage magic penetration.',
    descriptionVi:
      'Trang bị phép cung cấp lượng lớn Xuyên Kháng Phép theo phần trăm.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.MAGIC],
    tags: [
      'ABILITY_POWER',
      'MAGIC_PENETRATION',
      'ANTI_MAGIC_RESIST',
      'ANTI_TANK',
    ],
    goodAgainst: ['HIGH_MAGIC_RESIST', 'TANK'],
    weakAgainst: ['LOW_MAGIC_RESIST', 'SQUISHY_CHAMPION'],
    componentItemKeys: ['needlessly-large-rod', 'void-amethyst'],
  },
  {
    key: 'cryptbloom',
    name: 'Cryptbloom',
    nameVi: 'Hoa Mộ Địa',
    description:
      'Magic penetration item that creates a healing nova when a recently damaged champion dies.',
    descriptionVi:
      'Trang bị Xuyên Kháng Phép tạo ra một đợt hồi Máu diện rộng khi tướng vừa chịu sát thương bị hạ.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
    ],
    tags: [
      'ABILITY_POWER',
      'MAGIC_PENETRATION',
      'ABILITY_HASTE',
      'TAKEDOWN_REWARD',
      'AREA_HEAL',
      'TEAM_SUSTAIN',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['HIGH_MAGIC_RESIST', 'EXTENDED_FIGHT', 'TEAMFIGHT'],
    weakAgainst: ['LOW_MAGIC_RESIST', 'NO_TAKEDOWN_FIGHT'],
    componentItemKeys: ['fiendish-codex', 'void-amethyst', 'amplifying-tome'],
  },
  {
    key: 'bloodletters-curse',
    name: "Bloodletter's Curse",
    nameVi: 'Lời Nguyền Huyết Tự',
    description:
      'Extended-combat magic item that repeatedly reduces enemy magic resistance when abilities or passives deal magic damage.',
    descriptionVi:
      'Trang bị phép dành cho giao tranh kéo dài, liên tục giảm Kháng Phép của kẻ địch khi kỹ năng hoặc nội tại gây sát thương phép.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.UTILITY,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'MAGIC_RESIST_REDUCTION',
      'STACKING',
      'TEAM_UTILITY',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['HIGH_MAGIC_RESIST', 'TANK', 'EXTENDED_FIGHT'],
    weakAgainst: ['BURST_FIGHT', 'PHYSICAL_DAMAGE'],
    componentItemKeys: ['fiendish-codex', 'haunting-guise'],
  },
  {
    key: 'banshees-veil',
    name: "Banshee's Veil",
    nameVi: 'Mạng Che Banshee',
    description:
      'Defensive magic item that grants ability power, magic resistance, and a periodically refreshing spell shield.',
    descriptionVi:
      'Trang bị phép phòng thủ cung cấp Sức Mạnh Phép Thuật, Kháng Phép và lá chắn kỹ năng được hồi lại theo thời gian.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'ABILITY_POWER',
      'MAGIC_RESIST',
      'SPELL_SHIELD',
      'ANTI_MAGIC_BURST',
      'ANTI_CROWD_CONTROL',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'PICK_COMPOSITION', 'BURST_DAMAGE'],
    weakAgainst: ['POKE', 'MULTI_HIT', 'PHYSICAL_DAMAGE'],
    componentItemKeys: ['verdant-barrier', 'blasting-wand'],
  },
  {
    key: 'hextech-rocketbelt',
    name: 'Hextech Rocketbelt',
    nameVi: 'Đai Tên Lửa Hextech',
    description:
      'Active magic item that grants a short dash and fires a cone of rockets dealing area magic damage.',
    descriptionVi:
      'Trang bị phép kích hoạt cho phép lướt một đoạn ngắn và bắn loạt tên lửa gây sát thương phép diện rộng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'DASH',
      'MAGIC_DAMAGE',
      'AREA_DAMAGE',
      'ENGAGE',
      'REPOSITION',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['SQUISHY_CHAMPION', 'LOW_MOBILITY_CHAMPION', 'SKILLSHOT'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'HARD_CROWD_CONTROL'],
    componentItemKeys: ['hextech-alternator', 'kindlegem', 'amplifying-tome'],
  },
  {
    key: 'zhonyas-hourglass',
    name: "Zhonya's Hourglass",
    nameVi: 'Đồng Hồ Cát Zhonya',
    description:
      'Active defensive magic item that grants armor and temporary invulnerability through stasis.',
    descriptionVi:
      'Trang bị phép phòng thủ cung cấp Giáp và trạng thái bất tử tạm thời thông qua hiệu ứng Bất Động.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.DEFENSIVE,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'ABILITY_POWER',
      'ARMOR',
      'STASIS',
      'INVULNERABLE',
      'ANTI_BURST',
      'OUTPLAY_TOOL',
    ],
    goodAgainst: ['ASSASSIN', 'BURST_DAMAGE', 'DIVE'],
    weakAgainst: ['DAMAGE_OVER_TIME', 'COOLDOWN_WINDOW'],
    componentItemKeys: ['needlessly-large-rod', 'seekers-armguard'],
  },
  {
    key: 'redemption',
    name: 'Redemption',
    nameVi: 'Dây Chuyền Chuộc Tội',
    description:
      'Active support item that heals allied champions in a large area and deals true damage to enemy champions after a delay.',
    descriptionVi:
      'Trang bị hỗ trợ kích hoạt hồi Máu cho tướng đồng minh trong một khu vực rộng và gây sát thương chuẩn lên tướng địch sau một khoảng trễ.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'MANA_REGEN',
      'ABILITY_HASTE',
      'HEAL_SHIELD_POWER',
      'AREA_HEAL',
      'TRUE_DAMAGE',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['POKE', 'TEAMFIGHT', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_HEAL', 'BURST_DAMAGE', 'MOBILE_CHAMPION'],
    componentItemKeys: ['fiendish-codex', 'forbidden-idol'],
  },
  {
    key: 'sunfire-aegis',
    name: 'Sunfire Aegis',
    nameVi: 'Khiên Thái Dương',
    description:
      'Defensive item that continuously burns nearby enemies and increases its damage during extended combat.',
    descriptionVi:
      'Trang bị phòng thủ liên tục thiêu đốt kẻ địch xung quanh và tăng dần sát thương khi giao tranh kéo dài.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'ARMOR',
      'ABILITY_HASTE',
      'BURN_DAMAGE',
      'AREA_DAMAGE',
      'RAMPING_DAMAGE',
      'WAVE_CLEAR',
      'JUNGLE_CLEAR',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: [
      'MELEE_CHAMPION',
      'GROUPED_ENEMIES',
      'MINION_WAVE',
      'MONSTER',
    ],
    weakAgainst: ['LONG_RANGE_POKE', 'MAGIC_DAMAGE'],
    componentItemKeys: ['bamis-cinder', 'ruby-crystal', 'cloth-armor'],
  },
  {
    key: 'randuins-omen',
    name: "Randuin's Omen",
    nameVi: 'Khiên Băng Randuin',
    description:
      'Armor item that reduces incoming critical strike damage and grants movement speed and slow resistance after being critically struck.',
    descriptionVi:
      'Trang bị Giáp giảm sát thương chí mạng nhận vào, đồng thời tăng Tốc Độ Di Chuyển và Kháng Làm Chậm sau khi bị chí mạng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'ARMOR',
      'ANTI_CRIT',
      'MOVEMENT_SPEED',
      'SLOW_RESISTANCE',
      'AUTO_ATTACK_DEFENSE',
    ],
    goodAgainst: ['CRITICAL_STRIKE', 'AUTO_ATTACK_CHAMPION', 'PHYSICAL_DAMAGE'],
    weakAgainst: ['MAGIC_DAMAGE', 'ABILITY_DAMAGE'],
    componentItemKeys: ['giants-belt', 'wardens-mail'],
  },
  {
    key: 'thornmail',
    name: 'Thornmail',
    nameVi: 'Giáp Gai',
    description:
      'Armor item that reflects damage to attackers and applies Grievous Wounds.',
    descriptionVi:
      'Trang bị Giáp phản sát thương lên kẻ tấn công và gây Vết Thương Sâu.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'ARMOR',
      'DAMAGE_REFLECT',
      'ANTI_HEAL',
      'AUTO_ATTACK_DEFENSE',
    ],
    goodAgainst: ['AUTO_ATTACK_CHAMPION', 'HEALING', 'PHYSICAL_DAMAGE'],
    weakAgainst: ['MAGIC_DAMAGE', 'ABILITY_DAMAGE', 'NO_HEALING_TEAM'],
    componentItemKeys: ['chain-vest', 'bramble-vest'],
  },
  {
    key: 'warmogs-armor',
    name: "Warmog's Armor",
    nameVi: 'Giáp Máu Warmog',
    description:
      'High-health defensive item that grants powerful out-of-combat regeneration and increases healing and shielding received.',
    descriptionVi:
      'Trang bị phòng thủ cung cấp lượng lớn Máu, hồi phục mạnh ngoài giao tranh và tăng hiệu quả hồi Máu cùng lá chắn nhận vào.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'HEALTH_REGEN',
      'ABILITY_HASTE',
      'OUT_OF_COMBAT_REGEN',
      'HEAL_SHIELD_AMPLIFICATION',
      'SUSTAIN',
    ],
    goodAgainst: ['POKE', 'SIEGE', 'EXTENDED_FIGHT'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE', 'ANTI_HEAL'],
    componentItemKeys: ['kindlegem', 'giants-belt'],
  },
  {
    key: 'iceborn-gauntlet',
    name: 'Iceborn Gauntlet',
    nameVi: 'Găng Tay Băng Giá',
    description:
      'Defensive Spellblade item that empowers attacks after abilities and creates an area that slows enemies.',
    descriptionVi:
      'Trang bị Spellblade phòng thủ cường hóa đòn đánh sau khi dùng kỹ năng và tạo vùng làm chậm kẻ địch.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.HYBRID,
    ],
    tags: [
      'HEALTH',
      'ARMOR',
      'MANA',
      'ABILITY_HASTE',
      'SPELLBLADE',
      'EMPOWERED_ATTACK',
      'AREA_DAMAGE',
      'SLOW',
      'STICK_TO_TARGET',
      'ANTI_PHYSICAL',
    ],
    goodAgainst: [
      'PHYSICAL_DAMAGE',
      'AUTO_ATTACK_CHAMPION',
      'KITE_COMPOSITION',
    ],
    weakAgainst: ['MAGIC_DAMAGE', 'ABILITY_DOWNTIME'],
    componentItemKeys: ['sheen', 'kindlegem', 'glacial-shroud'],
  },
  {
    key: 'dead-mans-plate',
    name: "Dead Man's Plate",
    nameVi: 'Giáp Liệt Sĩ',
    description:
      'Armor and health item that builds Momentum while moving, then converts it into bonus damage and a strong slow on attack.',
    descriptionVi:
      'Trang bị Máu và Giáp tích lũy Động Lực khi di chuyển, sau đó chuyển thành sát thương cộng thêm và hiệu ứng làm chậm mạnh trên đòn đánh.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'ARMOR',
      'MOVEMENT_SPEED',
      'MOMENTUM',
      'EMPOWERED_ATTACK',
      'MAGIC_DAMAGE',
      'SLOW',
      'ENGAGE',
    ],
    goodAgainst: [
      'LOW_MOBILITY_CHAMPION',
      'KITE_COMPOSITION',
      'PHYSICAL_DAMAGE',
    ],
    weakAgainst: ['MAGIC_DAMAGE', 'SLOW_RESISTANCE', 'HARD_CROWD_CONTROL'],
    componentItemKeys: ['winged-moonplate', 'surging-scales'],
  },
  {
    key: 'zekes-convergence',
    name: "Zeke's Convergence",
    nameVi: 'Tụ Bão Zeke',
    description:
      'Tank support item that creates a slowing blizzard after casting the ultimate and empowers nearby allied attacks.',
    descriptionVi:
      'Trang bị hỗ trợ chống chịu tạo ra bão tuyết làm chậm sau khi dùng chiêu cuối và cường hóa đòn đánh của đồng minh gần đó.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
    ],
    tags: [
      'HEALTH',
      'ARMOR',
      'MANA',
      'ABILITY_HASTE',
      'ULTIMATE_SYNERGY',
      'AREA_DAMAGE',
      'SLOW',
      'ALLY_BUFF',
      'MOVEMENT_SPEED',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['GROUPED_ENEMIES', 'TEAMFIGHT', 'ENGAGE_COMPOSITION'],
    weakAgainst: ['DISENGAGE', 'ULTIMATE_DOWNTIME', 'MAGIC_DAMAGE'],
    componentItemKeys: ['giants-belt', 'glacial-shroud'],
  },
  {
    key: 'winters-approach',
    name: "Winter's Approach",
    nameVi: 'Băng Giáp',
    description:
      'Mana-scaling defensive item that converts maximum mana into health and transforms into Fimbulwinter.',
    descriptionVi:
      'Trang bị phòng thủ tăng sức mạnh theo Năng Lượng, chuyển Năng Lượng tối đa thành Máu và biến đổi thành Fimbulwinter.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'MANA',
      'ABILITY_HASTE',
      'MANA_REFUND',
      'MANA_SCALING',
      'HEALTH_SCALING',
      'TRANSFORM',
      'SCALING',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'MANA_HUNGRY_CHAMPION', 'SCALING'],
    weakAgainst: ['MANALESS_CHAMPION', 'EARLY_BURST'],
    componentItemKeys: ['tear-of-the-goddess', 'giants-belt'],
  },
  {
    key: 'fimbulwinter',
    name: 'Fimbulwinter',
    nameVi: 'Fimbulwinter',
    description:
      'Transformed mana item that grants a shield after slowing or immobilizing enemy champions.',
    descriptionVi:
      'Trang bị biến đổi tạo lá chắn sau khi làm chậm hoặc khống chế bất động tướng địch.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.TRANSFORMED,
    ],
    tags: [
      'HEALTH',
      'MANA',
      'ABILITY_HASTE',
      'MANA_SCALING',
      'SHIELD',
      'CROWD_CONTROL_SYNERGY',
      'ANTI_BURST',
      'TEAMFIGHT',
    ],
    goodAgainst: ['BURST_DAMAGE', 'GROUPED_ENEMIES', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_SHIELD', 'MANALESS_CHAMPION', 'LOW_MANA'],
    componentItemKeys: ['winters-approach'],
  },
  {
    key: 'force-of-nature',
    name: 'Force of Nature',
    nameVi: 'Giáp Thiên Nhiên',
    description:
      'Magic resistance item that gains stacking movement speed and magic damage reduction after taking ability damage.',
    descriptionVi:
      'Trang bị Kháng Phép tích lũy Tốc Độ Di Chuyển và giảm sát thương phép sau khi chịu sát thương kỹ năng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'MAGIC_RESIST',
      'MOVEMENT_SPEED',
      'STACKING',
      'MAGIC_DAMAGE_REDUCTION',
      'ANTI_MAGIC_DAMAGE',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'DAMAGE_OVER_TIME', 'EXTENDED_FIGHT'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'TRUE_DAMAGE', 'BURST_PHYSICAL_DAMAGE'],
    componentItemKeys: ['spectres-cowl', 'winged-moonplate'],
  },
  {
    key: 'frozen-heart',
    name: 'Frozen Heart',
    nameVi: 'Tim Băng',
    description:
      'Armor and mana item that reduces the attack speed of nearby enemies through stacking Chill effects.',
    descriptionVi:
      'Trang bị Giáp và Năng Lượng làm giảm Tốc Độ Đánh của kẻ địch gần đó thông qua hiệu ứng Lạnh cộng dồn.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'ARMOR',
      'MANA',
      'ABILITY_HASTE',
      'ANTI_ATTACK_SPEED',
      'AREA_DEBUFF',
      'AUTO_ATTACK_DEFENSE',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['AUTO_ATTACK_CHAMPION', 'ATTACK_SPEED', 'PHYSICAL_DAMAGE'],
    weakAgainst: ['MAGIC_DAMAGE', 'ABILITY_DAMAGE'],
    componentItemKeys: ['wardens-mail', 'glacial-shroud'],
  },
  {
    key: 'dawnshroud',
    name: 'Dawnshroud',
    nameVi: 'Áo Choàng Bình Minh',
    description:
      'Tank item that reveals nearby enemies, deals magic damage, and increases defenses when immobilization occurs nearby.',
    descriptionVi:
      'Trang bị chống chịu làm lộ diện kẻ địch gần đó, gây sát thương phép và tăng phòng thủ khi hiệu ứng bất động xảy ra ở gần.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
    ],
    tags: [
      'HEALTH',
      'ARMOR',
      'MAGIC_RESIST',
      'CROWD_CONTROL_SYNERGY',
      'REVEAL',
      'VISION',
      'MAGIC_DAMAGE',
      'DEFENSE_AMPLIFICATION',
      'ENGAGE',
    ],
    goodAgainst: ['STEALTH', 'ENGAGE_COMPOSITION', 'DIVE'],
    weakAgainst: ['POKE', 'NO_CROWD_CONTROL_TEAM'],
    componentItemKeys: ['spectres-cowl', 'chain-vest'],
  },
  {
    key: 'amaranths-twinguard',
    name: "Amaranth's Twinguard",
    nameVi: 'Song Sinh Ma Quái',
    description:
      'In-combat defensive item that stacks durability and grants increased size, tenacity, armor, and magic resistance at maximum stacks.',
    descriptionVi:
      'Trang bị phòng thủ trong giao tranh tích lũy sức chống chịu và tăng kích thước, Kháng Hiệu Ứng, Giáp cùng Kháng Phép khi đạt tối đa cộng dồn.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'ARMOR',
      'MAGIC_RESIST',
      'STACKING',
      'TENACITY',
      'DEFENSE_AMPLIFICATION',
      'EXTENDED_FIGHT',
      'FRONTLINE',
    ],
    goodAgainst: ['MIXED_DAMAGE', 'EXTENDED_FIGHT', 'CROWD_CONTROL'],
    weakAgainst: ['BURST_DAMAGE', 'TRUE_DAMAGE'],
    componentItemKeys: ['negatron-cloak', 'surging-scales'],
  },
  {
    key: 'mantle-of-the-twelfth-hour',
    name: 'Mantle of the Twelfth Hour',
    nameVi: 'Áo Choàng Giờ Thứ Mười Hai',
    description:
      'Low-health defensive item that temporarily increases maximum health and grants movement speed and slow resistance.',
    descriptionVi:
      'Trang bị phòng thủ khi thấp Máu, tạm thời tăng Máu tối đa, Tốc Độ Di Chuyển và Kháng Làm Chậm.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'ARMOR',
      'MAGIC_RESIST',
      'LIFELINE',
      'LOW_HEALTH_SURVIVAL',
      'MOVEMENT_SPEED',
      'SLOW_RESISTANCE',
      'ANTI_BURST',
    ],
    goodAgainst: ['BURST_DAMAGE', 'SLOW', 'MIXED_DAMAGE'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE', 'EXECUTE', 'TRUE_DAMAGE'],
    componentItemKeys: ['negatron-cloak', 'surging-scales'],
  },
  {
    key: 'searing-crown',
    name: 'Searing Crown',
    nameVi: 'Vương Miện Rực Cháy',
    description:
      'Armor and health item that burns enemies with attacks and damaging abilities based on their maximum health.',
    descriptionVi:
      'Trang bị Máu và Giáp thiêu đốt kẻ địch bằng đòn đánh cùng kỹ năng gây sát thương dựa trên Máu tối đa của chúng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'ARMOR',
      'BURN_DAMAGE',
      'DAMAGE_OVER_TIME',
      'MAX_HEALTH_DAMAGE',
      'ANTI_TANK',
      'WAVE_CLEAR',
      'JUNGLE_CLEAR',
    ],
    goodAgainst: ['TANK', 'HIGH_HEALTH', 'MINION_WAVE', 'MONSTER'],
    weakAgainst: ['MAGIC_DAMAGE', 'LONG_RANGE_POKE'],
    componentItemKeys: ['bamis-cinder', 'chain-vest'],
  },
  {
    key: 'heartsteel',
    name: 'Heartsteel',
    nameVi: 'Trái Tim Khổng Thần',
    description:
      'High-health tank item that charges a powerful attack near enemy champions and permanently increases maximum health.',
    descriptionVi:
      'Trang bị chống chịu nhiều Máu, tích lực đòn đánh mạnh khi ở gần tướng địch và vĩnh viễn tăng Máu tối đa.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'HEALTH_REGEN',
      'ABILITY_HASTE',
      'EMPOWERED_ATTACK',
      'MAX_HEALTH_DAMAGE',
      'PERMANENT_HEALTH_SCALING',
      'STACKING',
      'SCALING',
    ],
    goodAgainst: ['BURST_DAMAGE', 'EXTENDED_FIGHT', 'MELEE_CHAMPION'],
    weakAgainst: ['PERCENT_HEALTH_DAMAGE', 'ANTI_TANK', 'KITE_COMPOSITION'],
    componentItemKeys: ['kindlegem', 'giants-belt', 'ruby-crystal'],
  },
  {
    key: 'kaenic-rookern',
    name: 'Kaenic Rookern',
    nameVi: 'Kaenic Rookern',
    description:
      'Anti-magic tank item that grants a large magic shield after avoiding magic damage for a period of time.',
    descriptionVi:
      'Trang bị chống phép tạo một lá chắn phép lớn sau khi không chịu sát thương phép trong một khoảng thời gian.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'HEALTH_REGEN',
      'MAGIC_RESIST',
      'MAGIC_SHIELD',
      'OUT_OF_COMBAT_SHIELD',
      'ANTI_MAGIC_BURST',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'MAGIC_BURST', 'POKE'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'ANTI_SHIELD', 'CONTINUOUS_MAGIC_DAMAGE'],
    componentItemKeys: ['spectres-cowl', 'negatron-cloak'],
  },
  {
    key: 'yordle-trap',
    name: 'Yordle Trap',
    nameVi: 'Bẫy Yordle',
    description:
      'Tank support item that rewards displacement crowd control by marking enemies, reducing their defenses, and sharing bonus gold on takedown.',
    descriptionVi:
      'Trang bị hỗ trợ chống chịu thưởng cho hiệu ứng khống chế đẩy hoặc kéo bằng cách đánh dấu mục tiêu, giảm phòng thủ và chia vàng cộng thêm khi hạ gục.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
    ],
    tags: [
      'HEALTH',
      'ARMOR',
      'ABILITY_HASTE',
      'DISPLACEMENT_SYNERGY',
      'ARMOR_REDUCTION',
      'MAGIC_RESIST_REDUCTION',
      'MOVEMENT_SPEED',
      'BONUS_GOLD',
      'TEAM_UTILITY',
    ],
    goodAgainst: [
      'LOW_MOBILITY_CHAMPION',
      'PICK_COMPOSITION',
      'SQUISHY_CHAMPION',
    ],
    weakAgainst: ['NO_DISPLACEMENT_TEAM', 'DISENGAGE'],
    componentItemKeys: ['kindlegem', 'chain-vest'],
  },
  {
    key: 'radiant-virtue',
    name: 'Radiant Virtue',
    nameVi: 'Đức Hạnh Rực Rỡ',
    description:
      'Tank support item that temporarily increases maximum health and heals nearby allies after casting the ultimate.',
    descriptionVi:
      'Trang bị hỗ trợ chống chịu tạm thời tăng Máu tối đa và hồi Máu cho đồng minh xung quanh sau khi dùng chiêu cuối.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
    ],
    tags: [
      'HEALTH',
      'ARMOR',
      'ABILITY_HASTE',
      'ULTIMATE_SYNERGY',
      'MAX_HEALTH_AMPLIFICATION',
      'AREA_HEAL',
      'TEAM_SUSTAIN',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['TEAMFIGHT', 'BURST_DAMAGE', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_HEAL', 'ULTIMATE_DOWNTIME', 'SPLIT_PUSH'],
    componentItemKeys: ['kindlegem', 'chain-vest'],
  },
  {
    key: 'abyssal-mask',
    name: 'Abyssal Mask',
    nameVi: 'Mặt Nạ Vực Thẳm',
    description:
      'Magic resistance tank item that reduces the magic resistance of nearby enemies and gains additional resistance for each affected champion.',
    descriptionVi:
      'Trang bị chống chịu Kháng Phép làm giảm Kháng Phép của kẻ địch gần đó và tăng thêm Kháng Phép theo số tướng bị ảnh hưởng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.UTILITY,
    ],
    tags: [
      'HEALTH',
      'MAGIC_RESIST',
      'ABILITY_HASTE',
      'MAGIC_RESIST_REDUCTION',
      'AREA_DEBUFF',
      'STACKING_DEFENSE',
      'TEAM_UTILITY',
      'ANTI_MAGIC_DAMAGE',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'HIGH_MAGIC_RESIST', 'GROUPED_ENEMIES'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'LONG_RANGE_POKE'],
    componentItemKeys: ['kindlegem', 'negatron-cloak', 'ruby-crystal'],
  },
  {
    key: 'hollow-radiance',
    name: 'Hollow Radiance',
    nameVi: 'Hào Quang Rỗng',
    description:
      'Magic resistance tank item that burns nearby enemies during combat and creates an area explosion after killing units.',
    descriptionVi:
      'Trang bị chống chịu Kháng Phép thiêu đốt kẻ địch xung quanh khi giao tranh và tạo vụ nổ diện rộng sau khi hạ đơn vị.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'MAGIC_RESIST',
      'ABILITY_HASTE',
      'BURN_DAMAGE',
      'AREA_DAMAGE',
      'WAVE_CLEAR',
      'JUNGLE_CLEAR',
      'ANTI_MAGIC_DAMAGE',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'MINION_WAVE', 'MONSTER', 'GROUPED_ENEMIES'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'LONG_RANGE_POKE'],
    componentItemKeys: ['bamis-cinder', 'negatron-cloak'],
  },
  {
    key: 'knights-vow',
    name: "Knight's Vow",
    nameVi: 'Lời Thề Hiệp Sĩ',
    description:
      'Tank support item that protects a chosen ally by redirecting part of their incoming damage and restoring health through their damage.',
    descriptionVi:
      'Trang bị hỗ trợ chống chịu bảo vệ một đồng minh được chọn bằng cách chuyển một phần sát thương họ nhận sang bản thân và hồi Máu khi họ gây sát thương.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
    ],
    tags: [
      'HEALTH',
      'ARMOR',
      'ABILITY_HASTE',
      'ALLY_PROTECTION',
      'DAMAGE_REDIRECTION',
      'HEALTH_RESTORE',
      'PEEL',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['DIVE', 'BURST_DAMAGE', 'PROTECT_COMPOSITION'],
    weakAgainst: ['AREA_DAMAGE', 'PERCENT_HEALTH_DAMAGE', 'ISOLATED_FIGHT'],
    componentItemKeys: ['kindlegem', 'chain-vest'],
  },
  {
    key: 'unending-despair',
    name: 'Unending Despair',
    nameVi: 'Tuyệt Vọng Bất Tận',
    description:
      'Mixed-resistance tank item that periodically damages nearby enemy champions and heals based on damage dealt.',
    descriptionVi:
      'Trang bị chống chịu hỗn hợp định kỳ gây sát thương lên tướng địch xung quanh và hồi Máu dựa trên sát thương gây ra.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.DEFENSIVE],
    tags: [
      'HEALTH',
      'ARMOR',
      'MAGIC_RESIST',
      'AREA_DAMAGE',
      'MAGIC_DAMAGE',
      'HEALTH_RESTORE',
      'SUSTAIN',
      'EXTENDED_FIGHT',
      'FRONTLINE',
    ],
    goodAgainst: ['GROUPED_ENEMIES', 'MIXED_DAMAGE', 'EXTENDED_FIGHT'],
    weakAgainst: ['ANTI_HEAL', 'LONG_RANGE_POKE', 'BURST_DAMAGE'],
    componentItemKeys: ['chain-vest', 'negatron-cloak', 'ruby-crystal'],
  },
  {
    key: 'gargoyle-stoneplate',
    name: 'Gargoyle Stoneplate',
    nameVi: 'Thú Tượng Thạch Giáp',
    description:
      'Active tank item that grants a large shield scaling with bonus health and temporarily increases the wearer’s size.',
    descriptionVi:
      'Trang bị chống chịu kích hoạt tạo một lá chắn lớn tăng theo Máu cộng thêm và tạm thời tăng kích thước người sử dụng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'HEALTH',
      'ARMOR',
      'MAGIC_RESIST',
      'ABILITY_HASTE',
      'SHIELD',
      'BONUS_HEALTH_SCALING',
      'ANTI_BURST',
      'TEAMFIGHT',
    ],
    goodAgainst: ['BURST_DAMAGE', 'MIXED_DAMAGE', 'GROUPED_ENEMIES'],
    weakAgainst: ['ANTI_SHIELD', 'PERCENT_HEALTH_DAMAGE', 'TRUE_DAMAGE'],
    componentItemKeys: ['chain-vest', 'negatron-cloak', 'ruby-crystal'],
  },
  {
    key: 'bulwark-of-the-mountain',
    name: 'Bulwark of the Mountain',
    nameVi: 'Pháo Đài Sơn Thạch',
    description:
      'Transformed support item that grants passive gold, adaptive combat stats, health, vision control, and movement speed toward the bonded ally.',
    descriptionVi:
      'Trang bị hỗ trợ biến đổi cung cấp vàng theo thời gian, chỉ số thích ứng, Máu, kiểm soát tầm nhìn và Tốc Độ Di Chuyển khi tiến về đồng minh liên kết.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.TRANSFORMED,
    ],
    tags: [
      'SUPPORT_GOLD',
      'HEALTH',
      'ADAPTIVE_DAMAGE',
      'ABILITY_HASTE',
      'VISION_CONTROL',
      'ALLY_LINK',
      'MOVEMENT_SPEED',
      'SCALING',
    ],
    goodAgainst: ['LANE_SUSTAIN', 'VISION_CONTROL', 'ROAM'],
    weakAgainst: ['ISOLATED_FIGHT'],
    componentItemKeys: ['relic-shield'],
  },
  {
    key: 'black-mist-scythe',
    name: 'Black Mist Scythe',
    nameVi: 'Lưỡi Hái Sương Đen',
    description:
      'Transformed support item that grants passive gold, adaptive damage, vision control, and movement speed toward the bonded ally.',
    descriptionVi:
      'Trang bị hỗ trợ biến đổi cung cấp vàng theo thời gian, sát thương thích ứng, kiểm soát tầm nhìn và Tốc Độ Di Chuyển khi tiến về đồng minh liên kết.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.TRANSFORMED,
    ],
    tags: [
      'SUPPORT_GOLD',
      'ADAPTIVE_DAMAGE',
      'ABILITY_HASTE',
      'VISION_CONTROL',
      'ALLY_LINK',
      'MOVEMENT_SPEED',
      'POKE',
      'SCALING',
    ],
    goodAgainst: ['POKE', 'VISION_CONTROL', 'ROAM'],
    weakAgainst: ['HARD_ENGAGE', 'ISOLATED_FIGHT'],
    componentItemKeys: ['spectral-sickle'],
  },
  {
    key: 'ardent-censer',
    name: 'Ardent Censer',
    nameVi: 'Lư Hương Sôi Sục',
    description:
      'Enchanter support item that empowers healed or shielded allies with attack speed and bonus magic damage on attacks.',
    descriptionVi:
      'Trang bị hỗ trợ thuật sư cường hóa đồng minh được hồi Máu hoặc tạo lá chắn bằng Tốc Độ Đánh và sát thương phép cộng thêm trên đòn đánh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'MANA_REGEN',
      'ABILITY_HASTE',
      'HEAL_SHIELD_POWER',
      'MOVEMENT_SPEED',
      'ALLY_BUFF',
      'ATTACK_SPEED_BUFF',
      'ON_HIT_BUFF',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'PROTECT_COMPOSITION', 'AUTO_ATTACK_CARRY'],
    weakAgainst: ['ANTI_HEAL', 'ANTI_SHIELD', 'NO_AUTO_ATTACK_CARRY'],
    componentItemKeys: ['aether-wisp', 'forbidden-idol', 'ring-of-revelation'],
  },
  {
    key: 'harmonic-echo',
    name: 'Harmonic Echo',
    nameVi: 'Vọng Âm Hài Hòa',
    description:
      'Enchanter support item that builds Harmony through movement and ability casts, then enhances the next heal or shield.',
    descriptionVi:
      'Trang bị hỗ trợ thuật sư tích lũy Hài Hòa khi di chuyển và dùng kỹ năng, sau đó tăng cường lần hồi Máu hoặc tạo lá chắn kế tiếp.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'MANA',
      'MANA_REGEN',
      'ABILITY_HASTE',
      'HEAL_SHIELD_POWER',
      'HEALTH_RESTORE',
      'LOW_HEALTH_HEAL',
      'ENCHANTER',
    ],
    goodAgainst: ['POKE', 'BURST_DAMAGE', 'TEAMFIGHT'],
    weakAgainst: ['ANTI_HEAL', 'ANTI_SHIELD'],
    componentItemKeys: ['lost-chapter', 'forbidden-idol', 'amplifying-tome'],
  },
  {
    key: 'staff-of-flowing-water',
    name: 'Staff of Flowing Water',
    nameVi: 'Trượng Lưu Thủy',
    description:
      'Enchanter support item that grants ability power and ability haste after healing or shielding an ally.',
    descriptionVi:
      'Trang bị hỗ trợ thuật sư cung cấp Sức Mạnh Phép Thuật và Điểm Hồi Kỹ Năng sau khi hồi Máu hoặc tạo lá chắn cho đồng minh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'MANA_REGEN',
      'ABILITY_HASTE',
      'HEAL_SHIELD_POWER',
      'ALLY_BUFF',
      'ABILITY_POWER_BUFF',
      'ABILITY_HASTE_BUFF',
      'TEAM_UTILITY',
    ],
    goodAgainst: [
      'ABILITY_RELIANT_CHAMPION',
      'PROTECT_COMPOSITION',
      'TEAMFIGHT',
    ],
    weakAgainst: ['ANTI_HEAL', 'ANTI_SHIELD', 'PHYSICAL_ONLY_TEAM'],
    componentItemKeys: ['fiendish-codex', 'forbidden-idol'],
  },
  {
    key: 'imperial-mandate',
    name: 'Imperial Mandate',
    nameVi: 'Trát Lệnh Đế Vương',
    description:
      'Support magic item that marks enemies after slowing or immobilizing them, allowing allied damage to trigger additional magic damage and movement speed.',
    descriptionVi:
      'Trang bị hỗ trợ phép đánh dấu kẻ địch sau khi làm chậm hoặc khống chế bất động, cho phép sát thương từ đồng minh kích hoạt thêm sát thương phép và Tốc Độ Di Chuyển.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'HEALTH',
      'ABILITY_POWER',
      'ABILITY_HASTE',
      'CROWD_CONTROL_SYNERGY',
      'MARK',
      'MAGIC_DAMAGE',
      'ALLY_TRIGGER',
      'MOVEMENT_SPEED',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['LOW_MOBILITY_CHAMPION', 'PICK_COMPOSITION', 'TEAMFIGHT'],
    weakAgainst: ['NO_CROWD_CONTROL_TEAM', 'DISENGAGE'],
    componentItemKeys: ['fiendish-codex', 'kindlegem'],
  },
  {
    key: 'mikaels-blessing',
    name: "Mikael's Blessing",
    nameVi: 'Phước Lành Mikael',
    description:
      'Active support item that removes most crowd control effects from an allied champion, heals them, and briefly grants crowd-control immunity.',
    descriptionVi:
      'Trang bị hỗ trợ kích hoạt loại bỏ phần lớn hiệu ứng khống chế khỏi một tướng đồng minh, hồi Máu và tạm thời cho họ miễn nhiễm khống chế.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.DEFENSIVE,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'HEALTH',
      'MANA_REGEN',
      'ABILITY_HASTE',
      'HEAL_SHIELD_POWER',
      'ALLY_CLEANSE',
      'HEALTH_RESTORE',
      'ANTI_CROWD_CONTROL',
      'ALLY_PROTECTION',
    ],
    goodAgainst: ['CROWD_CONTROL', 'PICK_COMPOSITION', 'BURST_DAMAGE'],
    weakAgainst: ['KNOCK_UP', 'SUPPRESSION', 'ANTI_HEAL'],
    componentItemKeys: ['forbidden-idol', 'kindlegem'],
  },
  {
    key: 'locket-of-the-iron-solari',
    name: 'Locket of the Iron Solari',
    nameVi: 'Dây Chuyền Iron Solari',
    description:
      'Active tank support item that grants a temporary shield to the wearer and nearby allied champions.',
    descriptionVi:
      'Trang bị hỗ trợ chống chịu kích hoạt tạo lá chắn tạm thời cho người sử dụng và các đồng minh gần đó.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.DEFENSIVE,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'HEALTH',
      'ARMOR',
      'MAGIC_RESIST',
      'ABILITY_HASTE',
      'AREA_SHIELD',
      'ALLY_PROTECTION',
      'ANTI_BURST',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['BURST_DAMAGE', 'AREA_DAMAGE', 'TEAMFIGHT'],
    weakAgainst: ['ANTI_SHIELD', 'SPLIT_PUSH'],
    componentItemKeys: ['kindlegem', 'cloth-armor', 'null-magic-mantle'],
  },
  {
    key: 'shurelyas-battlesong',
    name: "Shurelya's Battlesong",
    nameVi: 'Vương Miện Shurelya',
    description:
      'Active support item that grants a burst of movement speed to nearby allied champions.',
    descriptionVi:
      'Trang bị hỗ trợ kích hoạt cung cấp một lượng lớn Tốc Độ Di Chuyển cho các tướng đồng minh gần đó.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.MAGIC,
      ItemCategory.SUPPORT,
      ItemCategory.UTILITY,
      ItemCategory.ACTIVE,
    ],
    tags: [
      'ABILITY_POWER',
      'MANA_REGEN',
      'ABILITY_HASTE',
      'MOVEMENT_SPEED',
      'AREA_MOVEMENT_SPEED',
      'ENGAGE',
      'DISENGAGE',
      'ROAM',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['KITE_COMPOSITION', 'DISENGAGE', 'LOW_MOBILITY_TEAM'],
    weakAgainst: ['HARD_CROWD_CONTROL', 'ISOLATED_FIGHT'],
    componentItemKeys: ['aether-wisp', 'amplifying-tome', 'ring-of-revelation'],
  },
  {
    key: 'gluttonous-greaves',
    name: 'Gluttonous Greaves',
    nameVi: 'Giày Phàm Ăn',
    description:
      'Adaptive boots that grant movement speed, offensive power, and omnivamp that increases through champion takedown participation.',
    descriptionVi:
      'Giày thích ứng cung cấp Tốc Độ Di Chuyển, sức mạnh tấn công và Hút Máu Toàn Phần tăng thêm khi tham gia hạ gục tướng.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.BOOTS],
    tags: [
      'MOVEMENT_SPEED',
      'ADAPTIVE_DAMAGE',
      'OMNI_VAMP',
      'TAKEDOWN_REWARD',
      'SUSTAIN',
      'EXTENDED_FIGHT',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'POKE'],
    weakAgainst: ['ANTI_HEAL', 'BURST_DAMAGE'],
    componentItemKeys: ['boots-of-speed'],
  },
  {
    key: 'berserkers-greaves',
    name: "Berserker's Greaves",
    nameVi: 'Giày Cuồng Nộ',
    description:
      'Attack speed boots that restore health whenever attacks hit a target.',
    descriptionVi: 'Giày Tốc Độ Đánh hồi Máu mỗi khi đòn đánh trúng mục tiêu.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.PHYSICAL,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'ATTACK_SPEED',
      'ON_HIT',
      'HEALTH_RESTORE',
      'SUSTAIN',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'AUTO_ATTACK_CHAMPION'],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'BURST_DAMAGE'],
    componentItemKeys: ['boots-of-speed', 'dagger'],
  },
  {
    key: 'mercurys-treads',
    name: "Mercury's Treads",
    nameVi: 'Giày Thủy Ngân',
    description:
      'Defensive boots that grant health, magic resistance, and tenacity.',
    descriptionVi: 'Giày phòng thủ cung cấp Máu, Kháng Phép và Kháng Hiệu Ứng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'HEALTH',
      'MAGIC_RESIST',
      'TENACITY',
      'ANTI_MAGIC_DAMAGE',
      'ANTI_CROWD_CONTROL',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'CROWD_CONTROL'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'KNOCK_UP'],
    componentItemKeys: ['boots-of-speed', 'ruby-crystal'],
  },
  {
    key: 'plated-steelcaps',
    name: 'Plated Steelcaps',
    nameVi: 'Giày Thép Gai',
    description:
      'Defensive boots that grant health and armor while reducing damage from champion basic attacks.',
    descriptionVi:
      'Giày phòng thủ cung cấp Máu, Giáp và giảm sát thương nhận từ đòn đánh thường của tướng.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'HEALTH',
      'ARMOR',
      'AUTO_ATTACK_DEFENSE',
      'ANTI_PHYSICAL',
    ],
    goodAgainst: ['AUTO_ATTACK_CHAMPION', 'PHYSICAL_DAMAGE'],
    weakAgainst: ['MAGIC_DAMAGE', 'ABILITY_DAMAGE'],
    componentItemKeys: ['boots-of-speed', 'ruby-crystal'],
  },
  {
    key: 'ionian-boots-of-lucidity',
    name: 'Ionian Boots of Lucidity',
    nameVi: 'Giày Khai Sáng Ionia',
    description:
      'Ability-focused boots that grant mana regeneration, ability haste, and reduced summoner spell cooldowns.',
    descriptionVi:
      'Giày thiên về kỹ năng cung cấp hồi Năng Lượng, Điểm Hồi Kỹ Năng và giảm thời gian hồi Phép Bổ Trợ.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.UTILITY,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'MANA_REGEN',
      'ABILITY_HASTE',
      'SUMMONER_SPELL_HASTE',
      'ABILITY_RELIANT_CHAMPION',
    ],
    goodAgainst: ['ABILITY_RELIANT_CHAMPION', 'EXTENDED_FIGHT'],
    weakAgainst: ['BURST_DAMAGE'],
    componentItemKeys: ['boots-of-speed', 'ring-of-revelation'],
  },
  {
    key: 'boots-of-mana',
    name: 'Boots of Mana',
    nameVi: 'Giày Năng Lượng',
    description:
      'Magic boots that grant ability power, flat magic penetration, mana regeneration, and bonus damage to minions.',
    descriptionVi:
      'Giày phép cung cấp Sức Mạnh Phép Thuật, Xuyên Kháng Phép cố định, hồi Năng Lượng và thêm sát thương lên lính.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.BOOTS, ItemCategory.MAGIC],
    tags: [
      'MOVEMENT_SPEED',
      'ABILITY_POWER',
      'MAGIC_PENETRATION',
      'MANA_REGEN',
      'WAVE_CLEAR',
      'LANE_PRESSURE',
    ],
    goodAgainst: ['LOW_MAGIC_RESIST', 'MINION_WAVE', 'LANE_SUSTAIN'],
    weakAgainst: ['HIGH_MAGIC_RESIST', 'BURST_DAMAGE'],
    componentItemKeys: ['boots-of-speed', 'amplifying-tome'],
  },
  {
    key: 'boots-of-dynamism',
    name: 'Boots of Dynamism',
    nameVi: 'Giày Năng Động',
    description:
      'Physical damage boots that grant attack damage and flat armor penetration.',
    descriptionVi:
      'Giày vật lý cung cấp Sức Mạnh Công Kích và Xuyên Giáp cố định.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.PHYSICAL,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'ATTACK_DAMAGE',
      'ARMOR_PENETRATION',
      'BURST_DAMAGE',
      'EARLY_GAME',
    ],
    goodAgainst: ['LOW_ARMOR', 'SQUISHY_CHAMPION', 'EARLY_GAME'],
    weakAgainst: ['HIGH_ARMOR', 'TANK'],
    componentItemKeys: ['boots-of-speed', 'long-sword'],
  },
  {
    key: 'immortal-treads',
    name: 'Immortal Treads',
    nameVi: 'Giày Bất Tử',
    description:
      'Adaptive combat boots that greatly increase damage while above half health and improve healing and shielding while below half health.',
    descriptionVi:
      'Giày chiến đấu thích ứng giúp tăng mạnh sát thương khi trên nửa Máu và tăng hiệu quả hồi Máu cùng lá chắn khi dưới nửa Máu.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.BOOTS, ItemCategory.HYBRID],
    tags: [
      'MOVEMENT_SPEED',
      'ADAPTIVE_DAMAGE',
      'OMNI_VAMP',
      'BONUS_DAMAGE',
      'HEAL_SHIELD_AMPLIFICATION',
      'LOW_HEALTH_SURVIVAL',
      'SUSTAIN',
    ],
    goodAgainst: ['EXTENDED_FIGHT', 'POKE', 'MIXED_DAMAGE_BUILD'],
    weakAgainst: ['ANTI_HEAL', 'BURST_DAMAGE'],
    componentItemKeys: ['gluttonous-greaves'],
  },
  {
    key: 'gunmetal-greaves',
    name: 'Gunmetal Greaves',
    nameVi: 'Giày Thép Súng',
    description:
      'Attack speed boots that grant physical vamp, on-hit healing, and movement speed after attacking enemy champions.',
    descriptionVi:
      'Giày Tốc Độ Đánh cung cấp Hút Máu Vật Lý, hồi Máu trên đòn đánh và Tốc Độ Di Chuyển sau khi tấn công tướng địch.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.PHYSICAL,
      ItemCategory.ON_HIT,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'ATTACK_SPEED',
      'PHYSICAL_VAMP',
      'ON_HIT',
      'HEALTH_RESTORE',
      'COMBAT_MOVEMENT_SPEED',
      'KITE',
      'SUSTAIN',
    ],
    goodAgainst: [
      'EXTENDED_FIGHT',
      'LOW_MOBILITY_CHAMPION',
      'AUTO_ATTACK_CHAMPION',
    ],
    weakAgainst: ['ANTI_ATTACK_SPEED', 'ANTI_HEAL', 'BURST_DAMAGE'],
    componentItemKeys: ['berserkers-greaves'],
  },
  {
    key: 'chainlaced-crushers',
    name: 'Chainlaced Crushers',
    nameVi: 'Giày Xích Ma Pháp',
    description:
      'Anti-magic boots that grant high tenacity and a magic shield after taking magic damage from an enemy champion.',
    descriptionVi:
      'Giày chống phép cung cấp lượng lớn Kháng Hiệu Ứng và tạo lá chắn phép sau khi chịu sát thương phép từ tướng địch.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'HEALTH',
      'MAGIC_RESIST',
      'TENACITY',
      'MAGIC_SHIELD',
      'ANTI_MAGIC_BURST',
      'ANTI_CROWD_CONTROL',
    ],
    goodAgainst: ['MAGIC_DAMAGE', 'MAGIC_BURST', 'CROWD_CONTROL'],
    weakAgainst: ['PHYSICAL_DAMAGE', 'TRUE_DAMAGE', 'KNOCK_UP'],
    componentItemKeys: ['mercurys-treads'],
  },
  {
    key: 'armored-advance',
    name: 'Armored Advance',
    nameVi: 'Bước Tiến Bọc Thép',
    description:
      'Anti-physical boots that reduce damage from champion basic attacks and grant a physical shield after taking physical damage.',
    descriptionVi:
      'Giày chống vật lý giảm sát thương từ đòn đánh thường của tướng và tạo lá chắn vật lý sau khi chịu sát thương vật lý.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.DEFENSIVE,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'HEALTH',
      'ARMOR',
      'AUTO_ATTACK_DEFENSE',
      'PHYSICAL_SHIELD',
      'ANTI_PHYSICAL',
      'ANTI_BURST',
    ],
    goodAgainst: ['PHYSICAL_DAMAGE', 'AUTO_ATTACK_CHAMPION', 'PHYSICAL_BURST'],
    weakAgainst: ['MAGIC_DAMAGE', 'TRUE_DAMAGE', 'ABILITY_DAMAGE'],
    componentItemKeys: ['plated-steelcaps'],
  },
  {
    key: 'crimson-lucidity',
    name: 'Crimson Lucidity',
    nameVi: 'Khai Sáng Đỏ Thẫm',
    description:
      'Ability-focused boots that grant high ability haste and movement speed after damaging enemy champions with abilities, supporting allied champions, or casting Summoner Spells.',
    descriptionVi:
      'Giày thiên về kỹ năng cung cấp nhiều Điểm Hồi Kỹ Năng và tăng Tốc Độ Di Chuyển sau khi gây sát thương lên tướng địch bằng kỹ năng, hỗ trợ tướng đồng minh hoặc sử dụng Phép Bổ Trợ.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.UTILITY,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'MANA_REGEN',
      'ABILITY_HASTE',
      'SUMMONER_SPELL_HASTE',
      'ABILITY_CAST_MOVEMENT_SPEED',
      'HEAL_SHIELD_SYNERGY',
      'TEAM_UTILITY',
    ],
    goodAgainst: ['ABILITY_RELIANT_CHAMPION', 'EXTENDED_FIGHT', 'ROAM'],
    weakAgainst: ['BURST_DAMAGE', 'SILENCE'],
    componentItemKeys: ['ionian-boots-of-lucidity'],
  },
  {
    key: 'spellslingers-shoes',
    name: "Spellslinger's Shoes",
    nameVi: 'Giày Pháp Sư',
    description:
      'Offensive magic boots that grant ability power, flat and percentage magic penetration, mana regeneration, and bonus damage to minions.',
    descriptionVi:
      'Giày phép tấn công cung cấp Sức Mạnh Phép Thuật, Xuyên Kháng Phép cố định và theo phần trăm, hồi Năng Lượng cùng sát thương cộng thêm lên lính.',
    category: [ItemCategory.HIGH_TIER, ItemCategory.BOOTS, ItemCategory.MAGIC],
    tags: [
      'MOVEMENT_SPEED',
      'ABILITY_POWER',
      'MAGIC_PENETRATION',
      'PERCENT_MAGIC_PENETRATION',
      'MANA_REGEN',
      'WAVE_CLEAR',
      'LANE_PRESSURE',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['HIGH_MAGIC_RESIST', 'MINION_WAVE', 'SQUISHY_CHAMPION'],
    weakAgainst: ['BURST_DAMAGE', 'MAGIC_DAMAGE_REDUCTION'],
    componentItemKeys: ['boots-of-mana'],
  },
  {
    key: 'armorcrusher-boots',
    name: 'Armorcrusher Boots',
    nameVi: 'Giày Nghiền Giáp',
    description:
      'Offensive physical boots that grant attack damage, flat and percentage armor penetration, and increased movement speed while out of combat.',
    descriptionVi:
      'Giày vật lý tấn công cung cấp Sức Mạnh Công Kích, Xuyên Giáp cố định và theo phần trăm, đồng thời tăng Tốc Độ Di Chuyển ngoài giao tranh.',
    category: [
      ItemCategory.HIGH_TIER,
      ItemCategory.BOOTS,
      ItemCategory.PHYSICAL,
    ],
    tags: [
      'MOVEMENT_SPEED',
      'ATTACK_DAMAGE',
      'ARMOR_PENETRATION',
      'PERCENT_ARMOR_PENETRATION',
      'OUT_OF_COMBAT_MOVEMENT_SPEED',
      'ROAM',
      'BURST_DAMAGE',
    ],
    goodAgainst: ['LOW_ARMOR', 'HIGH_ARMOR', 'SQUISHY_CHAMPION', 'ROAM'],
    weakAgainst: ['TRUE_DAMAGE', 'BURST_DAMAGE'],
    componentItemKeys: ['boots-of-dynamism'],
  },
];

const itemSeeds: ItemSeed[] = [
  ...basicItemSeeds,
  ...middleTierItemSeeds,
  ...highTierItemSeeds,
];

function validateItemSeeds(seeds: ItemSeed[]) {
  const itemKeys = new Set<string>();

  for (const seed of seeds) {
    if (itemKeys.has(seed.key)) {
      throw new Error(`Cannot seed items. Duplicate item key: ${seed.key}`);
    }

    itemKeys.add(seed.key);
  }

  for (const seed of seeds) {
    for (const componentKey of seed.componentItemKeys ?? []) {
      if (componentKey === seed.key) {
        throw new Error(
          `Cannot seed item ${seed.key}. Item cannot build from itself.`,
        );
      }

      if (!itemKeys.has(componentKey)) {
        throw new Error(
          `Cannot seed item ${seed.key}. Missing component: ${componentKey}`,
        );
      }
    }
  }
}

function buildItemSeedsWithBuildsInto(seeds: ItemSeed[]): NormalizedItemSeed[] {
  const buildsIntoMap = new Map<string, Set<string>>();

  for (const seed of seeds) {
    for (const componentKey of seed.componentItemKeys ?? []) {
      const buildsIntoItemKeys =
        buildsIntoMap.get(componentKey) ?? new Set<string>();

      buildsIntoItemKeys.add(seed.key);
      buildsIntoMap.set(componentKey, buildsIntoItemKeys);
    }
  }

  return seeds.map((seed) => ({
    ...seed,
    buildsIntoItemKeys: [...(buildsIntoMap.get(seed.key) ?? new Set<string>())],
  }));
}

export async function seedItems(prisma: PrismaClient) {
  validateItemSeeds(itemSeeds);

  console.log('SEEDING ITEMS...');

  const normalizedItemSeeds = buildItemSeedsWithBuildsInto(itemSeeds);

  for (const itemSeed of normalizedItemSeeds) {
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
        buildsIntoItemKeys: itemSeed.buildsIntoItemKeys,
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
        buildsIntoItemKeys: itemSeed.buildsIntoItemKeys,
      },
    });

    console.log(`Seeded item: ${itemSeed.name}`);
  }

  console.log('SEEDED ITEMS');
}
