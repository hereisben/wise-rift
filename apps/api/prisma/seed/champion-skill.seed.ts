import { Prisma, PrismaClient } from '../../src/generated/prisma/client.js';
import {
  DamageType,
  SkillEffect,
  SkillSlot,
  TargetType,
} from '../../src/generated/prisma/enums.js';

type ChampionSkillSeed = {
  championKey: string;
  slot: SkillSlot;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  damageType: DamageType;
  targetType: TargetType;
  cooldown?: Prisma.InputJsonValue | null;
  cost?: Prisma.InputJsonValue | null;
  range?: Prisma.InputJsonValue | null;
  scaling?: Prisma.InputJsonValue | null;
  effects: SkillEffect[];
  tags: string[];
};

const championSkillSeeds: ChampionSkillSeed[] = [
  // AATROX
  {
    championKey: `aatrox`,
    slot: SkillSlot.PASSIVE,
    name: `Deathbringer Stance`,
    nameVi: `Đường Kiếm Tuyệt Diệt`,
    description: `Enhances his next attack every 24 seconds to deal bonus 4% - 13% physical damage of the target's maximum Health and heals himself for the same amount. Deathbringer Stance's cooldown is reduced by 3 seconds when Aatrox hits a Champion or large monster with an attack or ability. Max 50 damage against monsters. Healing reduced to 60% against minions.`,
    descriptionVi: `Cường hóa đòn đánh tiếp theo của Aatrox sau mỗi 24 giây để gây thêm sát thương vật lý tương đương 4% - 13% Máu tối đa của mục tiêu, đồng thời hồi một lượng máu tương tự cho bản thân. Hồi chiêu giảm 3 giây khi Aatrox đánh hoặc dùng kỹ năng trúng Tướng địch hoặc quái lớn. Gây tối đa 50 sát thương lên quái. Lượng hồi máu giảm còn 60% đối với lính.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      staticSeconds: 24,
      refundSecondsOnChampionOrLargeMonsterHit: 3,
    },
    scaling: {
      targetMaxHealthPhysicalDamagePercentByLevel: {
        min: 0.04,
        max: 0.13,
      },
      healPercentOfDamageDealt: 1,
      monsterDamageCap: 50,
      minionHealingModifier: 0.6,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.HEAL,
      SkillEffect.EMPOWERED_ATTACK,
    ],
    tags: [`SUSTAIN`, `PERCENT_HEALTH_DAMAGE`, `EMPOWERED_ATTACK`],
  },
  {
    championKey: `aatrox`,
    slot: SkillSlot.Q,
    name: `The Darkin Blade`,
    nameVi: `Quỷ Kiếm Darkin`,
    description: `Swings his giant blade, dealing physical damage. This ability can be cast 2 more times, with each cast dealing 25% more damage. Enemies hit on the sweetspot will be knocked airborne for 0.25 seconds and dealt 60% bonus damage. Deals reduced damage to minions and monsters.`,
    descriptionVi: `Vung thanh kiếm khổng lồ, gây sát thương vật lý. Có thể dùng kỹ năng này thêm 2 lần, mỗi lần gây thêm 25% sát thương. Kẻ địch trúng tâm kiếm sẽ bị hất tung trong 0.25 giây và nhận thêm 60% sát thương. Gây giảm sát thương lên lính và quái.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.AREA,
    cooldown: {
      byRank: [12, 10, 8, 6],
    },
    range: {
      type: `area_swing`,
      casts: 3,
    },
    scaling: {
      baseDamageByRank: [10, 40, 70, 100],
      attackDamageRatioByRank: [0.75, 0.8, 0.85, 0.9],
      additionalCastDamageIncreasePercent: 0.25,
      sweetSpotBonusDamagePercent: 0.6,
      sweetSpotKnockUpDurationSeconds: 0.25,
      minionDamageModifier: 0.65,
      monsterDamageModifier: 0.7,
      maxCasts: 3,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.KNOCK_UP,
      SkillEffect.ZONE_CONTROL,
    ],
    tags: [`AREA_DAMAGE`, `KNOCK_UP`, `SKILL_SHOT`, `EXTENDED_FIGHT`],
  },
  {
    championKey: `aatrox`,
    slot: SkillSlot.W,
    name: `Infernal Chains`,
    nameVi: `Xiềng Xích Địa Ngục`,
    description: `Sends a chain dealing physical damage to the first enemy hit and slowing them by 25% for 1.5 seconds. If a champion or large monster remains within the impact area after 1.5 seconds, they will be dragged back to the center and take the same damage again. Deals double damage to minions.`,
    descriptionVi: `Phóng ra một dây xích gây sát thương vật lý lên kẻ địch đầu tiên trúng phải và làm chậm 25% trong 1.5 giây. Nếu Tướng hoặc quái lớn vẫn đứng trong vùng tác động sau 1.5 giây, chúng sẽ bị kéo về tâm và nhận lại lượng sát thương tương tự. Gây gấp đôi sát thương lên lính.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      byRank: [15, 14, 13, 12],
    },
    range: {
      type: `line_projectile`,
    },
    scaling: {
      baseDamageByRank: [25, 40, 55, 70],
      attackDamageRatio: 0.4,
      slowPercent: 0.25,
      slowDurationSeconds: 1.5,
      pullDelaySeconds: 1.5,
      secondHitDamageMultiplier: 1,
      minionDamageMultiplier: 2,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.PULL],
    tags: [`SLOW`, `PICK_POTENTIAL`, `SKILL_SHOT`, `ZONE_CONTROL`],
  },
  {
    championKey: `aatrox`,
    slot: SkillSlot.E,
    name: `Umbral Dash`,
    nameVi: `Bộ Pháp Hắc Ám`,
    description: `Passive: Aatrox gains physical vamp against enemy champions. Active: Dashes forward. This resets Aatrox's normal attack. Usable while casting other abilities.`,
    descriptionVi: `Nội tại: Aatrox nhận thêm Hút Máu Thường trên tướng địch. Kích hoạt: Lướt tới phía trước, tái thiết lập đòn đánh thường. Có thể dùng khi đang thi triển kỹ năng khác.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      byRank: [8, 7, 6, 5],
    },
    range: {
      type: `dash`,
    },
    scaling: {
      physicalVampVsChampionsByRank: [0.19, 0.21, 0.23, 0.25],
      worldEnderPhysicalVampIncreasePercent: 0.5,
      resetsBasicAttack: true,
      usableDuringOtherAbilities: true,
    },
    effects: [SkillEffect.DASH],
    tags: [`DASH`, `SUSTAIN`, `AUTO_ATTACK_RESET`, `MOBILITY`],
  },
  {
    championKey: `aatrox`,
    slot: SkillSlot.R,
    name: `World Ender`,
    nameVi: `Chiến Binh Tận Thế`,
    description: `Unleashes his demonic form for 10 seconds, gaining Attack Damage, increased healing, and decaying Movement Speed. During this time, Umbral Dash's Physical Vamp is increased by 50%. World Ender's duration is extended by 5 seconds with a takedown, up to 10 extra seconds. Nearby minions and monsters are feared for 3 seconds on activation.`,
    descriptionVi: `Aatrox hóa thành ác quỷ trong 10 giây, nhận thêm Sức Mạnh Công Kích, tăng lượng hồi máu và Tốc Độ Di Chuyển giảm dần. Trong thời gian này, Hút Máu Thường của Bộ Pháp Hắc Ám tăng thêm 50%. Thời gian hiệu lực được kéo dài thêm 5 giây khi tham gia hạ gục, tối đa thêm 10 giây. Lính và quái gần đó bị hoảng sợ trong 3 giây khi kích hoạt.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      byRank: [75, 65, 55],
    },
    range: {
      type: `self_buff_area_fear`,
    },
    scaling: {
      durationSeconds: 10,
      bonusAttackDamagePercentByRank: [0.3, 0.4, 0.5],
      increasedHealingPercentByRank: [0.25, 0.35, 0.45],
      decayingMovementSpeedPercentByRank: [0.6, 0.75, 0.9],
      umbralDashPhysicalVampIncreasePercent: 0.5,
      takedownExtensionSeconds: 5,
      maxExtraDurationSeconds: 10,
      fearDurationSeconds: 3,
      fearTargets: [`MINION`, `MONSTER`],
    },
    effects: [SkillEffect.SPEED_UP, SkillEffect.FEAR],
    tags: [`ULTIMATE_RELIANT_CHAMPION`, `TEAMFIGHT`, `SUSTAIN`, `SNOWBALL`],
  },
  // AHRI
  {
    championKey: `ahri`,
    slot: SkillSlot.PASSIVE,
    name: `Essence Theft`,
    nameVi: `Đánh Cắp Linh Hồn`,
    description: `Grants a stack of Essence Theft if her ability hits a target. At 3 stacks, Ahri's next ability that hits an enemy heals her for 40 (+20% AP). If an enemy champion that Ahri has damaged within 3 seconds dies, she will consume their essence to heal herself for 80 (+35% AP).`,
    descriptionVi: `Ahri nhận một cộng dồn Đánh Cắp Linh Hồn khi kỹ năng của cô trúng mục tiêu. Khi đạt 3 cộng dồn, kỹ năng tiếp theo trúng kẻ địch sẽ hồi cho Ahri 40 (+20% SMPT) máu. Nếu một tướng địch mà Ahri đã gây sát thương trong vòng 3 giây bị hạ gục, Ahri hấp thụ linh hồn của chúng để hồi 80 (+35% SMPT) máu.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    scaling: {
      stackHeal: {
        baseValue: 40,
        abilityPowerRatio: 0.2,
      },
      championEssenceHeal: {
        baseValue: 80,
        abilityPowerRatio: 0.35,
      },
    },
    effects: [SkillEffect.HEAL],
    tags: [`SUSTAIN`, `HEALING`, `TAKEDOWN_REWARD`],
  },
  {
    championKey: `ahri`,
    slot: SkillSlot.Q,
    name: `Orb of Deception`,
    nameVi: `Quả Cầu Ma Thuật`,
    description: `Ahri sends out and pulls back her orb, dealing 40 / 75 / 110 / 145 (+45% AP) magic damage on the way out and 40 / 75 / 110 / 145 (+45% AP) true damage on the way back.`,
    descriptionVi: `Ahri phóng ra rồi thu hồi quả cầu của mình, gây 40 / 75 / 110 / 145 (+45% SMPT) sát thương phép trên đường bay ra và 40 / 75 / 110 / 145 (+45% SMPT) sát thương chuẩn trên đường bay về.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [7, 7, 7, 7],
      unit: `second`,
    },
    cost: {
      values: [65, 70, 75, 80],
      type: `MANA`,
    },
    scaling: {
      magicDamage: {
        values: [40, 75, 110, 145],
        abilityPowerRatio: 0.45,
      },
      trueDamage: {
        values: [40, 75, 110, 145],
        abilityPowerRatio: 0.45,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.TRUE_DAMAGE],
    tags: [`SKILL_SHOT`, `MAGIC_DAMAGE`, `TRUE_DAMAGE`, `WAVE_CLEAR`, `POKE`],
  },
  {
    championKey: `ahri`,
    slot: SkillSlot.W,
    name: `Fox-Fire`,
    nameVi: `Lửa Hồ Ly`,
    description: `Ahri gains 45% movement speed and releases three fox-fires, that lock onto and attack nearby enemies for 45 / 80 / 115 / 150 (+35% AP) magic damage.`,
    descriptionVi: `Ahri nhận 45% tốc độ di chuyển và phóng ra ba ngọn lửa hồ ly, tự khóa mục tiêu rồi tấn công kẻ địch gần đó, gây 45 / 80 / 115 / 150 (+35% SMPT) sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [8, 7, 6, 5],
      unit: `second`,
    },
    cost: {
      values: [50, 50, 50, 50],
      type: `MANA`,
    },
    scaling: {
      magicDamage: {
        values: [45, 80, 115, 150],
        abilityPowerRatio: 0.35,
      },
      movementSpeedPercent: 45,
      missileCount: 3,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP],
    tags: [`MAGIC_DAMAGE`, `MOBILITY`, `CHASE`, `AUTO_TARGET`],
  },
  {
    championKey: `ahri`,
    slot: SkillSlot.E,
    name: `Charm`,
    nameVi: `Hôn Gió`,
    description: `Ahri blows a kiss that does 60 / 100 / 140 / 180 (+50% AP) magic damage and charms an enemy it encounters, instantly stopping movement abilities and causing them to walk harmlessly towards her.`,
    descriptionVi: `Ahri thổi một nụ hôn gây 60 / 100 / 140 / 180 (+50% SMPT) sát thương phép và mê hoặc kẻ địch đầu tiên trúng phải, lập tức chặn kỹ năng di chuyển và khiến mục tiêu bước về phía cô trong vô hại.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [12, 12, 12, 12],
      unit: `second`,
    },
    cost: {
      values: [85, 85, 85, 85],
      type: `MANA`,
    },
    scaling: {
      magicDamage: {
        values: [60, 100, 140, 180],
        abilityPowerRatio: 0.5,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.CHARM],
    tags: [
      `SKILL_SHOT`,
      `MAGIC_DAMAGE`,
      `CHARM`,
      `PICK_POTENTIAL`,
      `ANTI_DASH`,
    ],
  },
  {
    championKey: `ahri`,
    slot: SkillSlot.R,
    name: `Spirit Rush`,
    nameVi: `Phi Hồ`,
    description: `Ahri dashes forward and fires essence bolts, damaging nearby enemies for 60 / 90 / 120 (+35% AP) magic damage. Spirit Rush can be cast up to three times before going on cooldown. During Spirit Rush, if Ahri devours a champion's essence with Essence Theft, Ahri will extend Spirit Rush's recast duration up to 10 seconds, and she gains an extra charge of Spirit Rush. Can store up to 3 charges. Dash range increases while leveling up. Essence bolts attack champions first.`,
    descriptionVi: `Ahri lướt về phía trước và bắn ra các luồng linh lực, gây 60 / 90 / 120 (+35% SMPT) sát thương phép lên kẻ địch gần đó. Phi Hồ có thể được dùng tối đa ba lần trước khi hồi chiêu. Trong thời gian Phi Hồ, nếu Ahri hấp thụ linh hồn tướng bằng Đánh Cắp Linh Hồn, thời gian tái kích hoạt Phi Hồ được kéo dài tối đa 10 giây và Ahri nhận thêm một lần dùng Phi Hồ. Có thể tích trữ tối đa 3 lần dùng. Tầm lướt tăng theo cấp kỹ năng. Luồng linh lực ưu tiên tấn công tướng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [75, 65, 55],
      unit: `second`,
    },
    cost: {
      values: [100, 100, 100],
      type: `MANA`,
    },
    scaling: {
      magicDamage: {
        values: [60, 90, 120],
        abilityPowerRatio: 0.35,
      },
      baseCharges: 3,
      maxStoredCharges: 3,
      recastExtensionSeconds: 10,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `MAGIC_DAMAGE`,
      `DASH`,
      `MOBILITY`,
      `CHASE`,
      `ESCAPE`,
      `TAKEDOWN_REWARD`,
    ],
  },
  // AKALI
  {
    championKey: `akali`,
    slot: SkillSlot.PASSIVE,
    name: `Assassin's Mark`,
    nameVi: `Dấu Ấn Sát Thủ`,
    description: `Dealing active ability damage to a champion reveals a ring for 4 seconds. Crossing the ring empowers Akali's next attack to gain 100 range and deal 25 + 12 per level (+60% bonus AD +65% AP) bonus magic damage. Gains 30% Movement Speed while moving toward the ring. Upon crossing the ring, she gains 30% Movement Speed while moving toward enemy champions for 2 seconds.`,
    descriptionVi: `Gây sát thương lên tướng bằng kỹ năng chủ động sẽ tạo một vòng tròn trong 4 giây. Khi Akali băng qua vòng tròn, đòn đánh tiếp theo của cô được cường hóa, nhận thêm 100 tầm đánh và gây 25 + 12 mỗi cấp (+60% SMCK cộng thêm +65% SMPT) sát thương phép cộng thêm. Akali nhận 30% tốc độ di chuyển khi di chuyển về phía vòng tròn. Sau khi băng qua vòng tròn, cô nhận 30% tốc độ di chuyển khi di chuyển về phía tướng địch trong 2 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      ringDurationSeconds: 4,
    },
    range: {
      empoweredAttackBonusRange: 100,
    },
    scaling: {
      bonusMagicDamage: {
        baseValue: 25,
        perLevel: 12,
        bonusAttackDamageRatio: 0.6,
        abilityPowerRatio: 0.65,
      },
      movementSpeedTowardRingPercent: 30,
      movementSpeedTowardChampionPercent: 30,
      movementSpeedTowardChampionDurationSeconds: 2,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.EMPOWERED_ATTACK,
      SkillEffect.SPEED_UP,
    ],
    tags: [`MAGIC_DAMAGE`, `EMPOWERED_ATTACK`, `MOBILITY`, `BURST_DAMAGE`],
  },
  {
    championKey: `akali`,
    slot: SkillSlot.Q,
    name: `Five Point Strike`,
    nameVi: `Phi Đao Năm Cánh`,
    description: `Akali throws out five kunai, dealing 35 / 70 / 105 / 140 (+65% AD +60% AP) magic damage and slowing by 50% at maximum range for 0.5 seconds.`,
    descriptionVi: `Akali phóng ra năm phi đao, gây 35 / 70 / 105 / 140 (+65% SMCK +60% SMPT) sát thương phép và làm chậm 50% ở tầm tối đa trong 0.5 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [2, 2, 2, 2],
      unit: `second`,
    },
    cost: {
      values: [105, 90, 75, 60],
      type: `ENERGY`,
    },
    scaling: {
      magicDamage: {
        values: [35, 70, 105, 140],
        attackDamageRatio: 0.65,
        abilityPowerRatio: 0.6,
      },
      slowPercent: 50,
      slowDurationSeconds: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `MAGIC_DAMAGE`,
      `SLOW`,
      `POKE`,
      `ENERGY_COST`,
      `LOW_COOLDOWN_HARASS`,
    ],
  },
  {
    championKey: `akali`,
    slot: SkillSlot.W,
    name: `Twilight Shroud`,
    nameVi: `Bom Khói`,
    description: `Akali drops a cover of smoke and briefly gains 35% / 40% / 45% / 50% Movement Speed and grants 100 Energy. While inside the shroud, Akali becomes invisible. Attacking or using abilities will briefly reveal her.`,
    descriptionVi: `Akali thả một màn khói và tạm thời nhận 35% / 40% / 45% / 50% tốc độ di chuyển, đồng thời nhận 100 nội năng. Khi ở trong màn khói, Akali trở nên tàng hình. Tấn công hoặc dùng kỹ năng sẽ khiến cô bị lộ diện trong thoáng chốc.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [18, 17, 16, 15],
      unit: `second`,
    },
    scaling: {
      movementSpeedPercent: [35, 40, 45, 50],
      energyRestore: 100,
    },
    effects: [SkillEffect.STEALTH, SkillEffect.SPEED_UP],
    tags: [`STEALTH`, `MOBILITY`, `ESCAPE`, `ENERGY_RESTORE`, `OUTPLAY_TOOL`],
  },
  {
    championKey: `akali`,
    slot: SkillSlot.E,
    name: `Shuriken Flip`,
    nameVi: `Phóng Phi Tiêu`,
    description: `Akali flips backward and fires a shuriken forward, dealing 30 / 60 / 90 / 120 (+25% AD +30% AP) magic damage. The first enemy or smoke cloud hit is marked. Re-casting dashes to the marked target, dealing 70 / 120 / 170 / 220 (+50% AD +80% AP) magic damage.`,
    descriptionVi: `Akali lộn ngược ra sau và phóng phi tiêu về phía trước, gây 30 / 60 / 90 / 120 (+25% SMCK +30% SMPT) sát thương phép. Kẻ địch hoặc vùng khói đầu tiên trúng phải sẽ bị đánh dấu. Tái kích hoạt để lướt đến mục tiêu bị đánh dấu, gây 70 / 120 / 170 / 220 (+50% SMCK +80% SMPT) sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [15, 15, 15, 15],
      unit: `second`,
    },
    cost: {
      values: [30, 30, 30, 30],
      type: `ENERGY`,
    },
    scaling: {
      firstHitMagicDamage: {
        values: [30, 60, 90, 120],
        attackDamageRatio: 0.25,
        abilityPowerRatio: 0.3,
      },
      recastMagicDamage: {
        values: [70, 120, 170, 220],
        attackDamageRatio: 0.5,
        abilityPowerRatio: 0.8,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [`MAGIC_DAMAGE`, `DASH`, `SKILL_SHOT`, `RECAST`, `PICK_POTENTIAL`],
  },
  {
    championKey: `akali`,
    slot: SkillSlot.R,
    name: `Perfect Execution`,
    nameVi: `Sát Chiêu Hoàn Hảo`,
    description: `Akali dashes through an enemy champion, dealing 80 / 200 / 320 (+50% bonus AD +30% AP) magic damage. Can be cast again after 2.5 seconds. Recast: Dashes in target direction, dealing 70 to 210 (+30% AP to +90% AP) magic damage based upon enemies' missing Health. Deals max damage to enemies below 35% health.`,
    descriptionVi: `Akali lướt xuyên qua một tướng địch, gây 80 / 200 / 320 (+50% SMCK cộng thêm +30% SMPT) sát thương phép. Có thể tái kích hoạt sau 2.5 giây. Tái kích hoạt: Akali lướt theo hướng chỉ định, gây 70 đến 210 (+30% SMPT đến +90% SMPT) sát thương phép dựa trên máu đã mất của kẻ địch. Gây sát thương tối đa lên kẻ địch dưới 35% máu.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [85, 65, 45],
      unit: `second`,
    },
    scaling: {
      firstCastMagicDamage: {
        values: [80, 200, 320],
        bonusAttackDamageRatio: 0.5,
        abilityPowerRatio: 0.3,
      },
      recastMagicDamage: {
        minValues: [70, 70, 70],
        maxValues: [210, 210, 210],
        minAbilityPowerRatio: 0.3,
        maxAbilityPowerRatio: 0.9,
        scalesWithMissingHealth: true,
        maxDamageHealthThresholdPercent: 35,
      },
      recastDelaySeconds: 2.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH, SkillEffect.EXECUTE],
    tags: [`MAGIC_DAMAGE`, `DASH`, `EXECUTE`, `BURST_DAMAGE`, `MOBILITY`],
  },
  // AKSHAN
  {
    championKey: `akshan`,
    slot: SkillSlot.PASSIVE,
    name: `Dirty Fighting`,
    nameVi: `Không Từ Thủ Đoạn`,
    description: `Every three hits from attacks and abilities deal bonus magic damage. Against champions, Akshan also gains a shield. After launching an attack, Akshan fires a second shot that can be cancelled to gain bonus decaying movement speed.`,
    descriptionVi: `Mỗi ba đòn đánh hoặc kỹ năng gây thêm sát thương phép. Khi tác động lên tướng, Akshan nhận một lá chắn. Sau khi tấn công, Akshan bắn thêm một phát thứ hai, có thể hủy để nhận tốc độ di chuyển giảm dần.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      bonusMagicDamage: {
        base: 25,
        damageType: `MAGIC`,
      },
      shield: {
        base: 40,
        attackDamageRatio: 0.4,
      },
      secondShot: {
        base: 26,
        attackDamageRatio: 0.5,
        damageType: `PHYSICAL`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SHIELD, SkillEffect.SPEED_UP],
    tags: [`DOUBLE_SHOT`, `SHIELD`, `MOVEMENT_SPEED`, `ON_HIT_CHAMPION`],
  },
  {
    championKey: `akshan`,
    slot: SkillSlot.Q,
    name: `Avengerang`,
    nameVi: `Boomerang Hàng Hiệu`,
    description: `Akshan hurls a boomerang in the target direction, dealing physical damage to enemies it passes through and revealing them. Its range extends whenever it hits an enemy. If it hits an enemy champion, Akshan gains bonus movement speed decaying over time. The boomerang returns to Akshan and applies the same effects.`,
    descriptionVi: `Akshan ném boomerang theo hướng chỉ định, gây sát thương vật lý lên kẻ địch đi qua và làm lộ diện chúng. Tầm bay tăng mỗi khi trúng kẻ địch. Nếu trúng tướng địch, Akshan nhận tốc độ di chuyển giảm dần. Boomerang quay lại Akshan và áp dụng hiệu ứng tương tự.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [8, 7, 6, 5],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `MANA`,
    },
    range: {
      type: `EXTENDING_LINE`,
    },
    scaling: {
      damage: {
        values: [10, 40, 70, 100],
        attackDamageRatio: 0.85,
        damageType: `PHYSICAL`,
      },
      minionDamageRatio: [0.55, 0.7, 0.85, 1],
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.VISION, SkillEffect.SPEED_UP],
    tags: [`SKILL_SHOT`, `REVEAL`, `MOVEMENT_SPEED`, `POKE`, `WAVE_CLEAR`],
  },
  {
    championKey: `akshan`,
    slot: SkillSlot.W,
    name: `Going Rogue`,
    nameVi: `Len Lén Báo Thù`,
    description: `Passive: Enemies that kill allied champions become Scoundrels. When Akshan takes down a Scoundrel, he gains bonus gold and revives slain allies. Active: Akshan becomes camouflaged and gains bonus movement speed toward Scoundrels. He remains camouflaged near terrain or in brushes and restores missing mana while chasing Scoundrels.`,
    descriptionVi: `Nội tại: Kẻ địch hạ gục đồng minh trở thành Kẻ Vô Lại. Khi Akshan tham gia hạ gục Kẻ Vô Lại, hắn nhận thêm vàng và hồi sinh đồng minh đã bị hạ. Kích hoạt: Akshan ngụy trang và nhận tốc độ di chuyển khi hướng về Kẻ Vô Lại. Hắn luôn ngụy trang khi ở gần địa hình hoặc trong bụi và hồi năng lượng đã mất khi truy đuổi Kẻ Vô Lại.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [14, 10, 6, 2],
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      movementSpeedPercentTowardScoundrels: [80, 90, 100, 110],
      missingManaRegenPercentPerSecond: 2,
    },
    effects: [SkillEffect.STEALTH, SkillEffect.SPEED_UP],
    tags: [`CAMOUFLAGE`, `REVIVE`, `ROAMING`, `MOVEMENT_SPEED`, `MANA_REGEN`],
  },
  {
    championKey: `akshan`,
    slot: SkillSlot.E,
    name: `Heroic Swing`,
    nameVi: `Đu Kiểu Anh Hùng`,
    description: `Akshan fires a hook to attach and swing around terrain, attacking the nearest enemy. He jumps off the rope if he collides with an enemy champion or terrain. Re-cast: jumps off the rope. Champion takedowns refresh this ability's cooldown.`,
    descriptionVi: `Akshan bắn móc để bám vào địa hình và đu quanh đó, tấn công kẻ địch gần nhất. Hắn nhảy khỏi dây nếu va vào tướng địch hoặc địa hình. Tái kích hoạt: nhảy khỏi dây. Tham gia hạ gục tướng sẽ hồi lại kỹ năng này.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [18, 16, 14, 12],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `TERRAIN_HOOK_SWING`,
    },
    scaling: {
      damagePerShot: {
        values: [30, 70, 110, 150],
        attackDamageRatio: 0.15,
        damageType: `PHYSICAL`,
      },
      onHitEffectDamageRatio: 0.25,
      criticalStrikeDamageRatio: 1.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `DASH`,
      `RECAST`,
      `TAKEDOWN_REWARD`,
      `ON_HIT_CHAMPION`,
      `CRITICAL_SCALING`,
    ],
  },
  {
    championKey: `akshan`,
    slot: SkillSlot.R,
    name: `Comeuppance`,
    nameVi: `Phát Bắn Nhớ Đời`,
    description: `Akshan locks onto an enemy champion and charges multiple shots. Re-cast: fires the shots, dealing physical damage to the first enemy or structure hit, increased based on the target's missing Health. Each shot's damage is further increased by Critical Rate. Shots execute minions.`,
    descriptionVi: `Akshan khóa mục tiêu tướng địch và tích trữ nhiều phát bắn. Tái kích hoạt: bắn ra các phát đạn, gây sát thương vật lý lên kẻ địch hoặc công trình đầu tiên trúng phải, tăng theo máu đã mất của mục tiêu. Sát thương mỗi phát bắn tăng thêm theo Tỉ lệ Chí mạng. Phát bắn kết liễu lính.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [65, 60, 55],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LOCK_ON`,
    },
    scaling: {
      minDamagePerShot: {
        values: [20, 30, 40],
        attackDamageRatio: 0.1,
        damageType: `PHYSICAL`,
      },
      maxDamagePerShot: {
        values: [80, 120, 160],
        attackDamageRatio: 0.4,
        damageType: `PHYSICAL`,
      },
      criticalRateDamageMultiplierRatio: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.EXECUTE],
    tags: [`LOCK_ON`, `EXECUTE`, `CRITICAL_SCALING`, `MISSING_HEALTH_DAMAGE`],
  },
];

export async function seedChampionSkills(
  prisma: PrismaClient,
  patchId: string,
) {
  for (const championSkillSeed of championSkillSeeds) {
    const champion = await prisma.champion.findUnique({
      where: {
        key: championSkillSeed.championKey,
      },
    });

    if (!champion || champion.deletedAt) {
      throw new Error(
        `Champion not found or deleted: ${championSkillSeed.championKey}`,
      );
    }

    const championSkill = await prisma.championSkill.upsert({
      where: {
        championId_patchId_slot: {
          championId: champion.id,
          patchId,
          slot: championSkillSeed.slot,
        },
      },
      update: {
        name: championSkillSeed.name,
        nameVi: championSkillSeed.nameVi,
        description: championSkillSeed.description,
        descriptionVi: championSkillSeed.descriptionVi,
        damageType: championSkillSeed.damageType,
        targetType: championSkillSeed.targetType,
        cooldown: championSkillSeed.cooldown ?? Prisma.DbNull,
        cost: championSkillSeed.cost ?? Prisma.DbNull,
        range: championSkillSeed.range ?? Prisma.DbNull,
        scaling: championSkillSeed.scaling ?? Prisma.DbNull,
        effects: championSkillSeed.effects,
        tags: championSkillSeed.tags ?? [],
        deletedAt: null,
      },
      create: {
        championId: champion.id,
        patchId: patchId,
        slot: championSkillSeed.slot,
        name: championSkillSeed.name,
        nameVi: championSkillSeed.nameVi,
        description: championSkillSeed.description,
        descriptionVi: championSkillSeed.descriptionVi,
        damageType: championSkillSeed.damageType,
        targetType: championSkillSeed.targetType,
        cooldown: championSkillSeed.cooldown ?? Prisma.DbNull,
        cost: championSkillSeed.cost ?? Prisma.DbNull,
        range: championSkillSeed.range ?? Prisma.DbNull,
        scaling: championSkillSeed.scaling ?? Prisma.DbNull,
        effects: championSkillSeed.effects,
        tags: championSkillSeed.tags ?? [],
      },
    });

    console.log(
      `Seeded champion skill: ${champion.name} - ${championSkill.slot} ${championSkill.name}`,
    );
  }

  console.log(`SEEDED CHAMPIONS SKILLS`);
}
