import { PrismaClient } from '../../src/generated/prisma/client.js';
import { GameTagCategory } from '../../src/generated/prisma/enums.js';

type GameTagSeed = {
  key: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  category: GameTagCategory;
};

function createTag(
  key: string,
  name: string,
  nameVi: string,
  category: GameTagCategory,
): GameTagSeed {
  return {
    key,
    name,
    nameVi,
    description: `Tag used for ${name.toLowerCase()} classification`,
    descriptionVi: `Tag dùng để phân loại ${nameVi.toLowerCase()}`,
    category,
  };
}

const gameTagSeeds: GameTagSeed[] = [
  // ITEM CATEGORIES
  createTag('LOW_TIER', 'Low Tier', 'Trang bị bậc thấp', GameTagCategory.ITEM),
  createTag(
    'MIDDLE_TIER',
    'Middle Tier',
    'Trang bị bậc trung',
    GameTagCategory.ITEM,
  ),
  createTag('HIGH_TIER', 'High Tier', 'Trang bị bậc cao', GameTagCategory.ITEM),
  createTag(
    'COMPONENT',
    'Component',
    'Trang bị thành phần',
    GameTagCategory.ITEM,
  ),
  createTag('MAGIC', 'Magic', 'Trang bị phép thuật', GameTagCategory.ITEM),
  createTag('SUPPORT', 'Support', 'Trang bị hỗ trợ', GameTagCategory.ITEM),
  createTag(
    'DEFENSIVE',
    'Defensive',
    'Trang bị phòng thủ',
    GameTagCategory.ITEM,
  ),
  createTag('HYBRID', 'Hybrid', 'Trang bị lai', GameTagCategory.ITEM),
  createTag('ON_HIT', 'On Hit', 'Hiệu ứng đòn đánh', GameTagCategory.ITEM),

  // ITEM STATS
  createTag(
    'ABILITY_POWER',
    'Ability Power',
    'Sức mạnh phép thuật',
    GameTagCategory.ITEM,
  ),
  createTag(
    'ATTACK_DAMAGE',
    'Attack Damage',
    'Sức mạnh công kích',
    GameTagCategory.ITEM,
  ),
  createTag('HEALTH', 'Health', 'Máu', GameTagCategory.ITEM),
  createTag('MANA', 'Mana', 'Năng lượng', GameTagCategory.ITEM),
  createTag(
    'ABILITY_HASTE',
    'Ability Haste',
    'Điểm hồi kỹ năng',
    GameTagCategory.ITEM,
  ),
  createTag(
    'ATTACK_SPEED',
    'Attack Speed',
    'Tốc độ đánh',
    GameTagCategory.ITEM,
  ),
  createTag(
    'MAGIC_PENETRATION',
    'Magic Penetration',
    'Xuyên kháng phép',
    GameTagCategory.ITEM,
  ),
  createTag(
    'MOVEMENT_SPEED',
    'Movement Speed',
    'Tốc độ di chuyển',
    GameTagCategory.ITEM,
  ),
  createTag('MAGIC_VAMP', 'Magic Vamp', 'Hút máu phép', GameTagCategory.ITEM),
  createTag('MANA_REGEN', 'Mana Regen', 'Hồi năng lượng', GameTagCategory.ITEM),
  createTag(
    'HEAL_SHIELD_POWER',
    'Heal and Shield Power',
    'Sức mạnh hồi máu và lá chắn',
    GameTagCategory.ITEM,
  ),

  // DAMAGE / SCORING TAGS
  createTag(
    'MAGIC_DAMAGE',
    'Magic Damage',
    'Sát thương phép',
    GameTagCategory.SCORING,
  ),
  createTag(
    'PHYSICAL_DAMAGE',
    'Physical Damage',
    'Sát thương vật lý',
    GameTagCategory.SCORING,
  ),
  createTag(
    'TRUE_DAMAGE',
    'True Damage',
    'Sát thương chuẩn',
    GameTagCategory.SCORING,
  ),
  createTag(
    'HYBRID_DAMAGE',
    'Hybrid Damage',
    'Sát thương lai',
    GameTagCategory.SCORING,
  ),
  createTag(
    'ADAPTIVE_DAMAGE',
    'Adaptive Damage',
    'Sát thương thích ứng',
    GameTagCategory.SCORING,
  ),
  createTag(
    'BURST_DAMAGE',
    'Burst Damage',
    'Sát thương dồn',
    GameTagCategory.SCORING,
  ),
  createTag(
    'SUSTAIN_DAMAGE',
    'Sustained Damage',
    'Sát thương duy trì',
    GameTagCategory.SCORING,
  ),
  createTag(
    'BURN_DAMAGE',
    'Burn Damage',
    'Sát thương đốt',
    GameTagCategory.SCORING,
  ),
  createTag(
    'AREA_DAMAGE',
    'Area Damage',
    'Sát thương diện rộng',
    GameTagCategory.SCORING,
  ),
  createTag(
    'DAMAGE_AMP',
    'Damage Amplification',
    'Khuếch đại sát thương',
    GameTagCategory.SCORING,
  ),
  createTag(
    'MAGIC_RESIST_REDUCTION',
    'Magic Resist Reduction',
    'Giảm kháng phép',
    GameTagCategory.SCORING,
  ),

  // ITEM EFFECT TAGS
  createTag(
    'SCALING_MANA',
    'Mana Scaling',
    'Tăng tiến theo năng lượng',
    GameTagCategory.BUILD,
  ),
  createTag(
    'SCALING_HEALTH',
    'Health Scaling',
    'Tăng tiến theo máu',
    GameTagCategory.BUILD,
  ),
  createTag('SNOWBALL', 'Snowball', 'Lăn cầu tuyết', GameTagCategory.BUILD),
  createTag('SPELLBLADE', 'Spellblade', 'Kiếm phép', GameTagCategory.BUILD),
  createTag(
    'COOLDOWN_RESET',
    'Cooldown Reset',
    'Giảm hồi chiêu sau hạ gục',
    GameTagCategory.BUILD,
  ),
  createTag(
    'ULTIMATE_HASTE',
    'Ultimate Haste',
    'Hồi chiêu cuối',
    GameTagCategory.BUILD,
  ),
  createTag(
    'SPELL_SHIELD',
    'Spell Shield',
    'Khiên phép',
    GameTagCategory.BUILD,
  ),
  createTag('EXECUTE', 'Execute', 'Kết liễu', GameTagCategory.BUILD),
  createTag('REVEAL', 'Reveal', 'Lộ diện', GameTagCategory.BUILD),
  createTag('SLOW', 'Slow', 'Làm chậm', GameTagCategory.BUILD),
  createTag('SUSTAIN', 'Sustain', 'Hồi phục duy trì', GameTagCategory.BUILD),
  createTag('KITE', 'Kite', 'Thả diều', GameTagCategory.BUILD),

  // COUNTER TAGS
  createTag(
    'ANTI_TANK',
    'Anti Tank',
    'Chống chống chịu',
    GameTagCategory.COUNTER,
  ),
  createTag('ANTI_HEAL', 'Anti Heal', 'Giảm hồi máu', GameTagCategory.COUNTER),
  createTag(
    'ANTI_SHIELD',
    'Anti Shield',
    'Chống lá chắn',
    GameTagCategory.COUNTER,
  ),
  createTag(
    'ANTI_BURST',
    'Anti Burst',
    'Chống dồn sát thương',
    GameTagCategory.COUNTER,
  ),
  createTag(
    'ANTI_ATTACK_SPEED',
    'Anti Attack Speed',
    'Khắc chế tốc độ đánh',
    GameTagCategory.COUNTER,
  ),
  createTag(
    'PERCENT_HEALTH_DAMAGE',
    'Percent Health Damage',
    'Sát thương theo phần trăm máu',
    GameTagCategory.COUNTER,
  ),

  // MATCHUP / ENEMY TEAM TAGS
  createTag('TANK', 'Tank', 'Chống chịu', GameTagCategory.MATCHUP),
  createTag('HIGH_HEALTH', 'High Health', 'Nhiều máu', GameTagCategory.MATCHUP),
  createTag('FRONTLINE', 'Frontline', 'Tuyến trước', GameTagCategory.MATCHUP),
  createTag(
    'SQUISHY_CHAMPION',
    'Squishy Champion',
    'Tướng mỏng',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LOW_HEALTH_TARGET',
    'Low Health Target',
    'Mục tiêu thấp máu',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LOW_MAGIC_RESIST',
    'Low Magic Resist',
    'Ít kháng phép',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'HIGH_MAGIC_RESIST',
    'High Magic Resist',
    'Nhiều kháng phép',
    GameTagCategory.MATCHUP,
  ),
  createTag('HEALING', 'Healing', 'Hồi máu', GameTagCategory.MATCHUP),
  createTag('ENCHANTER', 'Enchanter', 'Hỗ trợ buff', GameTagCategory.MATCHUP),
  createTag('SHIELDING', 'Shielding', 'Tạo lá chắn', GameTagCategory.MATCHUP),
  createTag(
    'NO_HEALING_TEAM',
    'No Healing Team',
    'Đội hình không hồi máu',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'NO_SHIELD_TEAM',
    'No Shield Team',
    'Đội hình không lá chắn',
    GameTagCategory.MATCHUP,
  ),
  createTag('ASSASSIN', 'Assassin', 'Sát thủ', GameTagCategory.MATCHUP),
  createTag('BRUISER', 'Bruiser', 'Đấu sĩ', GameTagCategory.MATCHUP),
  createTag('ENGAGE', 'Engage', 'Mở giao tranh', GameTagCategory.MATCHUP),
  createTag(
    'DISENGAGE',
    'Disengage',
    'Thoát giao tranh',
    GameTagCategory.MATCHUP,
  ),
  createTag('DIVE', 'Dive', 'Lao vào', GameTagCategory.MATCHUP),
  createTag(
    'MELEE_CHAMPION',
    'Melee Champion',
    'Tướng cận chiến',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LOW_RANGE_CHAMPION',
    'Low Range Champion',
    'Tướng tầm đánh ngắn',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LONG_RANGE_CHAMPION',
    'Long Range Champion',
    'Tướng tầm xa',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'HIGH_MOBILITY',
    'High Mobility',
    'Độ cơ động cao',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'POINT_AND_CLICK_CC',
    'Point and Click CC',
    'Khống chế chỉ định',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LOW_CC',
    'Low Crowd Control',
    'Ít khống chế',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LOW_BURST',
    'Low Burst',
    'Ít sát thương dồn',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'PICK_COMPOSITION',
    'Pick Composition',
    'Đội hình bắt lẻ',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'POKE_COMPOSITION',
    'Poke Composition',
    'Đội hình cấu rỉa',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'GROUPED_ENEMIES',
    'Grouped Enemies',
    'Kẻ địch đứng gần nhau',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'FOG_OF_WAR',
    'Fog of War',
    'Tầm nhìn khuất',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'MELEE_TRADING',
    'Melee Trading',
    'Trao đổi chiêu cận chiến',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LOW_COOLDOWN_HARASS',
    'Low Cooldown Harass',
    'Cấu rỉa hồi chiêu thấp',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LOW_ULTIMATE_VALUE',
    'Low Ultimate Value',
    'Giá trị chiêu cuối thấp',
    GameTagCategory.MATCHUP,
  ),

  // GAME PLAN / CONTEXT TAGS
  createTag(
    'LONG_FIGHT',
    'Long Fight',
    'Giao tranh dài',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'EXTENDED_FIGHT',
    'Extended Fight',
    'Giao tranh kéo dài',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'TEAMFIGHT',
    'Teamfight',
    'Giao tranh tổng',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'SCALING_GAME',
    'Scaling Game',
    'Trận đấu kéo dài',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'SNOWBALL_GAME',
    'Snowball Game',
    'Trận đấu lăn cầu tuyết',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'FAST_SNOWBALL',
    'Fast Snowball',
    'Lăn cầu tuyết nhanh',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'FOLLOW_UP_DAMAGE',
    'Follow Up Damage',
    'Sát thương theo sau mở giao tranh',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'LANE_PARTNER_DAMAGE',
    'Lane Partner Damage',
    'Sát thương từ đồng đội đi đường',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'EARLY_GAME_PRESSURE',
    'Early Game Pressure',
    'Áp lực đầu trận',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'EARLY_BURST',
    'Early Burst',
    'Dồn sát thương sớm',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'LOW_DURABILITY_TEAM',
    'Low Durability Team',
    'Đội hình mỏng',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'LOW_KILL_PRESSURE',
    'Low Kill Pressure',
    'Ít áp lực hạ gục',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'MIXED_DAMAGE',
    'Mixed Damage',
    'Sát thương hỗn hợp',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'SUSTAIN_TEAM',
    'Sustain Team',
    'Đội hình hồi phục',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'TEAM_COORDINATION',
    'Team Coordination',
    'Cần phối hợp đội',
    GameTagCategory.TEAM_COMP,
  ),

  // SPELL / SUMMONER SPELL TAGS
  createTag('CHASE', 'Chase', 'Truy đuổi', GameTagCategory.SPELL),
  createTag('ESCAPE', 'Escape', 'Thoát thân', GameTagCategory.SPELL),
  createTag('UTILITY', 'Utility', 'Đa dụng', GameTagCategory.SPELL),
  createTag('SHIELD', 'Shield', 'Lá chắn', GameTagCategory.SPELL),
  createTag('DEFENSE', 'Defense', 'Phòng thủ', GameTagCategory.SPELL),
  createTag('CLEANSE', 'Cleanse', 'Thanh tẩy', GameTagCategory.SPELL),
  createTag('JUNGLE', 'Jungle', 'Đi rừng', GameTagCategory.SPELL),
  createTag('PLAYMAKING', 'Playmaking', 'Tạo đột biến', GameTagCategory.SPELL),

  createTag('ROAMING', 'Roaming', 'Đảo đường', GameTagCategory.TEAM_COMP),
  createTag('DUO_LANE', 'Duo Lane', 'Đường đôi', GameTagCategory.TEAM_COMP),
  createTag(
    'SURVIVABILITY',
    'Survivability',
    'Khả năng sống sót',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'TEAM_SUPPORT',
    'Team Support',
    'Hỗ trợ đồng đội',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'LANE_SURVIVAL',
    'Lane Survival',
    'Sống sót khi đi đường',
    GameTagCategory.TEAM_COMP,
  ),
  createTag('PEEL', 'Peel', 'Bảo kê', GameTagCategory.TEAM_COMP),
  createTag(
    'KILL_PRESSURE',
    'Kill Pressure',
    'Áp lực hạ gục',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'LANE_KILL_PRESSURE',
    'Lane Kill Pressure',
    'Áp lực hạ gục khi đi đường',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'OBJECTIVE_CONTROL',
    'Objective Control',
    'Kiểm soát mục tiêu',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'JUNGLE_CLEAR',
    'Jungle Clear',
    'Dọn rừng',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'NON_JUNGLE_ROLE',
    'Non Jungle Role',
    'Không phải vai trò đi rừng',
    GameTagCategory.TEAM_COMP,
  ),
  createTag(
    'MAP_PRESSURE',
    'Map Pressure',
    'Áp lực bản đồ',
    GameTagCategory.TEAM_COMP,
  ),
  createTag('MACRO', 'Macro', 'Tư duy bản đồ', GameTagCategory.TEAM_COMP),
  createTag('SPLIT_PUSH', 'Split Push', 'Đẩy lẻ', GameTagCategory.TEAM_COMP),
  createTag('SIDE_LANE', 'Side Lane', 'Đường cánh', GameTagCategory.TEAM_COMP),
  createTag(
    'EARLY_COMBAT',
    'Early Combat',
    'Giao tranh sớm',
    GameTagCategory.TEAM_COMP,
  ),

  createTag(
    'BURST_PROTECTION',
    'Burst Protection',
    'Chống dồn sát thương',
    GameTagCategory.COUNTER,
  ),
  createTag(
    'DAMAGE_REDUCTION',
    'Damage Reduction',
    'Giảm sát thương',
    GameTagCategory.COUNTER,
  ),
  createTag(
    'ANTI_ASSASSIN',
    'Anti Assassin',
    'Khắc chế sát thủ',
    GameTagCategory.COUNTER,
  ),
  createTag(
    'ANTI_CC',
    'Anti Crowd Control',
    'Chống khống chế',
    GameTagCategory.COUNTER,
  ),

  createTag(
    'LONG_RANGE_POKE',
    'Long Range Poke',
    'Cấu rỉa tầm xa',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'CROWD_CONTROL',
    'Crowd Control',
    'Khống chế',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'LONG_RANGE_SAFE_PLAY',
    'Long Range Safe Play',
    'Chơi an toàn tầm xa',
    GameTagCategory.MATCHUP,
  ),
  createTag(
    'EPIC_MONSTER',
    'Epic Monster',
    'Quái khủng',
    GameTagCategory.MATCHUP,
  ),

  createTag(
    'RAW_DAMAGE',
    'Raw Damage',
    'Sát thương thuần',
    GameTagCategory.SCORING,
  ),

  // CHAMPION CLASS TAGS
  createTag('MAGE', 'Mage', 'Pháp sư', GameTagCategory.CHAMPION),
  createTag('FIGHTER', 'Fighter', 'Đấu sĩ', GameTagCategory.CHAMPION),
  createTag(
    'SKIRMISHER',
    'Skirmisher',
    'Đấu sĩ cơ động',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'CONTROL_MAGE',
    'Control Mage',
    'Pháp sư kiểm soát',
    GameTagCategory.CHAMPION,
  ),
  createTag('MARKSMAN', 'Marksman', 'Xạ thủ', GameTagCategory.CHAMPION),

  // CHAMPION PLAYSTYLE TAGS
  createTag('BURST', 'Burst', 'Dồn sát thương', GameTagCategory.PLAYSTYLE),
  createTag('PICK', 'Pick', 'Bắt lẻ', GameTagCategory.PLAYSTYLE),
  createTag('MOBILITY', 'Mobility', 'Cơ động', GameTagCategory.PLAYSTYLE),
  createTag(
    'DPS',
    'DPS',
    'Sát thương theo thời gian',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'SCALING',
    'Scaling',
    'Tăng tiến sức mạnh',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag('POKE', 'Poke', 'Cấu rỉa', GameTagCategory.PLAYSTYLE),
  createTag(
    'ZONE_CONTROL',
    'Zone Control',
    'Kiểm soát khu vực',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'ON_HIT_CHAMPION',
    'On Hit Champion',
    'Tướng đánh theo hiệu ứng đòn đánh',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'AUTO_ATTACK_CHAMPION',
    'Auto Attack Champion',
    'Tướng đánh thường nhiều',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'SPELLBLADE_CHAMPION',
    'Spellblade Champion',
    'Tướng tận dụng Kiếm Phép',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'ABILITY_RELIANT_CHAMPION',
    'Ability Reliant Champion',
    'Tướng phụ thuộc kỹ năng',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'MANA_HUNGRY_CHAMPION',
    'Mana Hungry Champion',
    'Tướng tốn nhiều năng lượng',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'ULTIMATE_RELIANT_CHAMPION',
    'Ultimate Reliant Champion',
    'Tướng phụ thuộc chiêu cuối',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'EXTENDED_FIGHT_CHAMPION',
    'Extended Fight Champion',
    'Tướng mạnh trong giao tranh kéo dài',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'UTILITY_MARKSMAN',
    'Utility Marksman',
    'Xạ thủ thiên về tiện ích',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'VISION_CONTROL',
    'Vision Control',
    'Kiểm soát tầm nhìn',
    GameTagCategory.PLAYSTYLE,
  ),
  createTag(
    'SKIRMISH',
    'Skirmish',
    'Giao tranh nhỏ lẻ',
    GameTagCategory.PLAYSTYLE,
  ),

  // CHAMPION UTILITY TAGS
  createTag('CHARM', 'Charm', 'Hôn gió', GameTagCategory.CHAMPION),
  createTag('DASH', 'Dash', 'Lướt', GameTagCategory.CHAMPION),
  createTag('KNOCK_UP', 'Knock Up', 'Hất tung', GameTagCategory.CHAMPION),
  createTag('WIND_WALL', 'Wind Wall', 'Tường gió', GameTagCategory.CHAMPION),
  createTag('REVIVE', 'Revive', 'Hồi sinh đồng minh', GameTagCategory.CHAMPION),

  // CHAMPION RISK TAGS
  createTag(
    'SKILLSHOT_RELIANT',
    'Skillshot Reliant',
    'Phụ thuộc kỹ năng định hướng',
    GameTagCategory.CHAMPION,
  ),
  createTag('SQUISHY', 'Squishy', 'Mỏng máu', GameTagCategory.CHAMPION),
  createTag(
    'MELEE_MID',
    'Melee Mid',
    'Đường giữa cận chiến',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'HIGH_EXECUTION',
    'High Execution',
    'Yêu cầu kỹ năng cao',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'CC_VULNERABLE',
    'CC Vulnerable',
    'Dễ bị khống chế',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'LOW_MOBILITY',
    'Low Mobility',
    'Kém cơ động',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'POSITIONING_RELIANT',
    'Positioning Reliant',
    'Phụ thuộc vị trí đứng',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'WEAK_EARLY_GAME',
    'Weak Early Game',
    'Yếu đầu trận',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'INTERRUPT_VULNERABLE',
    'Interrupt Vulnerable',
    'Dễ bị ngắt kỹ năng',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'SHORT_RANGE_MAGE',
    'Short Range Mage',
    'Pháp sư tầm ngắn',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'FLASH_RELIANT',
    'Flash Reliant',
    'Phụ thuộc Tốc Biến',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'COOLDOWN_RELIANT',
    'Cooldown Reliant',
    'Phụ thuộc hồi chiêu',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'PUNISHABLE_WHEN_MISSED',
    'Punishable When Missed',
    'Dễ bị trừng phạt khi dùng hụt',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'MISS_DEPENDENT',
    'Miss Dependent',
    'Phụ thuộc dùng trúng kỹ năng',
    GameTagCategory.CHAMPION,
  ),

  // CHAMPION STRENGTH / WEAKNESS TAGS
  createTag(
    'PICK_POTENTIAL',
    'Pick Potential',
    'Khả năng bắt lẻ',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'SCALING_DAMAGE',
    'Scaling Damage',
    'Sát thương tăng tiến',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'TEAMFIGHT_FOLLOWUP',
    'Teamfight Follow Up',
    'Theo giao tranh tốt',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'WAVE_CLEAR',
    'Wave Clear',
    'Dọn lính nhanh',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'WEAK_WHEN_BEHIND',
    'Weak When Behind',
    'Yếu khi bị thọt',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'HARD_TO_PLAY',
    'Hard To Play',
    'Khó chơi',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'WEAK_INTO_POINT_CLICK_CC',
    'Weak Into Point Click CC',
    'Yếu trước khống chế chỉ định',
    GameTagCategory.CHAMPION,
  ),
  createTag(
    'VULNERABLE_TO_DIVE',
    'Vulnerable To Dive',
    'Dễ bị lao vào',
    GameTagCategory.CHAMPION,
  ),

  // SKILL TAGS
  createTag(
    'SKILL_SHOT',
    'Skill Shot',
    'Kỹ năng định hướng',
    GameTagCategory.SKILL,
  ),
  createTag('KNOCK_BACK', 'Knock Back', 'Đẩy lùi', GameTagCategory.SKILL),
  createTag('STUN', 'Stun', 'Làm choáng', GameTagCategory.SKILL),
  createTag('CAMOUFLAGE', 'Camouflage', 'Ngụy trang', GameTagCategory.SKILL),
  createTag(
    'DOUBLE_SHOT',
    'Double Shot',
    'Bắn thêm phát thứ hai',
    GameTagCategory.SKILL,
  ),
  createTag(
    'CRITICAL_SCALING',
    'Critical Scaling',
    'Tăng sức mạnh theo tỉ lệ chí mạng',
    GameTagCategory.SKILL,
  ),
  createTag(
    'MISSING_HEALTH_DAMAGE',
    'Missing Health Damage',
    'Sát thương theo máu đã mất',
    GameTagCategory.SKILL,
  ),
  createTag('LOCK_ON', 'Lock On', 'Khóa mục tiêu', GameTagCategory.SKILL),
  createTag(
    'MULTI_CAST',
    'Multi Cast',
    'Kỹ năng có nhiều lần sử dụng',
    GameTagCategory.SKILL,
  ),
  createTag(
    'ARMOR_PENETRATION',
    'Armor Penetration',
    'Xuyên giáp',
    GameTagCategory.SKILL,
  ),
  createTag('SUPPRESS', 'Suppress', 'Áp chế', GameTagCategory.SKILL),
  createTag(
    'UNSTOPPABLE',
    'Unstoppable',
    'Không thể bị cản phá',
    GameTagCategory.SKILL,
  ),
  createTag(
    'PHYSICAL_VAMP',
    'Physical Vamp',
    'Hút máu vật lý',
    GameTagCategory.SKILL,
  ),
  createTag('ROOT', 'Root', 'Trói chân', GameTagCategory.SKILL),
  createTag('TOGGLE', 'Toggle', 'Kỹ năng bật tắt', GameTagCategory.SKILL),
  createTag(
    'STACKING_PASSIVE',
    'Stacking Passive',
    'Nội tại tích cộng dồn',
    GameTagCategory.SKILL,
  ),
  createTag(
    'BURST_SETUP',
    'Burst Setup',
    'Thiết lập dồn sát thương',
    GameTagCategory.SKILL,
  ),
  createTag(
    'LAST_HIT_REFUND',
    'Last Hit Refund',
    'Hoàn trả tài nguyên khi kết liễu',
    GameTagCategory.SKILL,
  ),
  createTag(
    'CONE_DAMAGE',
    'Cone Damage',
    'Sát thương hình nón',
    GameTagCategory.SKILL,
  ),
  createTag(
    'SELF_BUFF',
    'Self Buff',
    'Tự cường hóa bản thân',
    GameTagCategory.SKILL,
  ),
  createTag(
    'SUMMON_SUPPORT',
    'Summon Support',
    'Hỗ trợ đơn vị triệu hồi',
    GameTagCategory.SKILL,
  ),
  createTag('SUMMON', 'Summon', 'Triệu hồi', GameTagCategory.SKILL),
  createTag(
    'ATTACK_SPEED_STEROID',
    'Attack Speed Steroid',
    'Tăng mạnh tốc độ đánh',
    GameTagCategory.SKILL,
  ),
  createTag('VISION', 'Vision', 'Cung cấp tầm nhìn', GameTagCategory.SKILL),
  createTag(
    'GLOBAL_RANGE',
    'Global Range',
    'Tầm sử dụng toàn bản đồ',
    GameTagCategory.SKILL,
  ),
  createTag(
    'STEERABLE_PROJECTILE',
    'Steerable Projectile',
    'Đạn có thể điều khiển hướng bay',
    GameTagCategory.SKILL,
  ),
  createTag(
    'ABILITY_EVOLUTION',
    'Ability Evolution',
    'Kỹ năng tiến hóa theo cộng dồn',
    GameTagCategory.SKILL,
  ),
  createTag(
    'CHANNEL',
    'Channel',
    'Vận sức duy trì kỹ năng',
    GameTagCategory.SKILL,
  ),
  createTag(
    'FLIGHT',
    'Flight',
    'Bay theo hướng chỉ định',
    GameTagCategory.SKILL,
  ),
  createTag(
    'COOLDOWN_REFUND',
    'Cooldown Refund',
    'Hoàn trả hồi chiêu',
    GameTagCategory.SKILL,
  ),
  createTag(
    'REALM_HOPPER',
    'Realm Hopper',
    'Nhảy giữa các vùng linh giới',
    GameTagCategory.SKILL,
  ),
  createTag(
    'SELF_DISPLACEMENT',
    'Self Displacement',
    'Tự dịch chuyển vị trí',
    GameTagCategory.SKILL,
  ),
  createTag(
    'BOUNDARY_CONTROL',
    'Boundary Control',
    'Kiểm soát ranh giới vùng',
    GameTagCategory.SKILL,
  ),
  createTag('PULL', 'Pull', 'Kéo mục tiêu', GameTagCategory.SKILL),
  createTag('RECAST', 'Recast', 'Tái kích hoạt', GameTagCategory.SKILL),
  createTag('STEALTH', 'Stealth', 'Tàng hình', GameTagCategory.SKILL),
  createTag('SPEED_UP', 'Speed Up', 'Tăng tốc', GameTagCategory.SKILL),
  createTag(
    'ENERGY_RESTORE',
    'Energy Restore',
    'Hồi nội năng',
    GameTagCategory.SKILL,
  ),
  createTag('STASIS', 'Stasis', 'Ngưng đọng', GameTagCategory.SKILL),
  createTag(
    'AOE_STASIS',
    'Area Stasis',
    'Ngưng đọng diện rộng',
    GameTagCategory.SKILL,
  ),
  createTag('PORTAL', 'Portal', 'Cổng dịch chuyển', GameTagCategory.SKILL),
  createTag(
    'TERRAIN_TRAVEL',
    'Terrain Travel',
    'Di chuyển xuyên địa hình',
    GameTagCategory.SKILL,
  ),
  createTag('SHRINE', 'Shrine', 'Điện hồi phục', GameTagCategory.SKILL),
  createTag('CHIME', 'Chime', 'Chuông ma thuật', GameTagCategory.SKILL),
  createTag('MEEP', 'Meep', 'Meep hỗ trợ', GameTagCategory.SKILL),
  createTag(
    'ALLY_HEAL',
    'Ally Heal',
    'Hồi máu cho đồng minh',
    GameTagCategory.SKILL,
  ),
  createTag(
    'EMPOWERED_ATTACK',
    'Empowered Attack',
    'Đòn đánh cường hóa',
    GameTagCategory.SKILL,
  ),
  createTag('HOOK', 'Hook', 'Kéo móc', GameTagCategory.SKILL),
  createTag(
    'LOW_HEALTH_TRIGGER',
    'Low Health Trigger',
    'Kích hoạt khi thấp máu',
    GameTagCategory.SKILL,
  ),
  createTag(
    'MANA_SCALING',
    'Mana Scaling',
    'Tỉ lệ theo năng lượng',
    GameTagCategory.SKILL,
  ),
  createTag(
    'DECAYING_MOVEMENT_SPEED',
    'Decaying Movement Speed',
    'Tốc độ di chuyển giảm dần',
    GameTagCategory.SKILL,
  ),
  createTag(
    'SELF_SLOW',
    'Self Slow',
    'Tự làm chậm bản thân',
    GameTagCategory.SKILL,
  ),
  createTag(
    'CRITICAL_STRIKE',
    'Critical Strike',
    'Chí mạng',
    GameTagCategory.SKILL,
  ),
  createTag('MARK', 'Mark', 'Đánh dấu', GameTagCategory.SKILL),
  createTag(
    'PASSIVE_DAMAGE',
    'Passive Damage',
    'Sát thương nội tại',
    GameTagCategory.SKILL,
  ),
  createTag('SILENCE', 'Silence', 'Câm lặng', GameTagCategory.SKILL),
  createTag(
    'AUTO_ATTACK_RESET',
    'Auto Attack Reset',
    'Tái tạo đòn đánh thường',
    GameTagCategory.SKILL,
  ),
];

export async function seedGameTags(prisma: PrismaClient) {
  console.log('Seeding game tags...');

  for (const gameTagSeed of gameTagSeeds) {
    await prisma.gameTag.upsert({
      where: {
        key: gameTagSeed.key,
      },
      update: {
        name: gameTagSeed.name,
        nameVi: gameTagSeed.nameVi,
        description: gameTagSeed.description,
        descriptionVi: gameTagSeed.descriptionVi,
        category: gameTagSeed.category,
        deletedAt: null,
      },
      create: gameTagSeed,
    });

    console.log(`Seeded game tag: ${gameTagSeed.key}`);
  }

  console.log('Seeded game tags');
}
