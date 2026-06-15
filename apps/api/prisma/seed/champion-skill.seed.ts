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
  // === AATROX ===
  // AATROX - PASSIVE
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
      value: 24,
      unit: `seconds`,
      refundOnChampionOrLargeMonsterHit: 3,
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
  // AATROX - Q
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
      values: [12, 10, 8, 6],
      unit: `seconds`,
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
  // AATROX - W
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
      values: [15, 14, 13, 12],
      unit: `seconds`,
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
  // AATROX - E
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
      values: [8, 7, 6, 5],
      unit: `seconds`,
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
  // AATROX - R
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
      values: [75, 65, 55],
      unit: `seconds`,
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
  // === AHRI ===
  // AHRI - PASSIVE
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
  // AHRI - Q
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
  // AHRI - W
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
  // AHRI - E
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
  // AHRI - R
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
  // === AKALI ===
  // AKALI - PASSIVE
  {
    championKey: `akali`,
    slot: SkillSlot.PASSIVE,
    name: `Assassin's Mark`,
    nameVi: `Dấu Ấn Sát Thủ`,
    description: `Dealing active ability damage to a champion reveals a ring for 4 seconds. Crossing the ring empowers Akali's next attack to gain 100 range and deal 25 + 12 per level (+60% bonus AD +65% AP) bonus magic damage. Gains 30% Movement Speed while moving toward the ring. Upon crossing the ring, she gains 30% Movement Speed while moving toward enemy champions for 2 seconds.`,
    descriptionVi: `Gây sát thương lên tướng bằng kỹ năng chủ động sẽ tạo một vòng tròn trong 4 giây. Khi Akali băng qua vòng tròn, đòn đánh tiếp theo của cô được cường hóa, nhận thêm 100 tầm đánh và gây 25 + 12 mỗi cấp (+60% SMCK cộng thêm +65% SMPT) sát thương phép cộng thêm. Akali nhận 30% tốc độ di chuyển khi di chuyển về phía vòng tròn. Sau khi băng qua vòng tròn, cô nhận 30% tốc độ di chuyển khi di chuyển về phía tướng địch trong 2 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: {
      empoweredAttackBonusRange: 100,
    },
    scaling: {
      ring: {
        durationSeconds: 4,
      },
      bonusMagicDamage: {
        baseValue: 25,
        perLevel: 12,
        bonusAttackDamageRatio: 0.6,
        abilityPowerRatio: 0.65,
      },
      movementSpeed: {
        towardRingPercent: 30,
        towardChampionPercent: 30,
        towardChampionDurationSeconds: 2,
      },
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.EMPOWERED_ATTACK,
      SkillEffect.SPEED_UP,
    ],
    tags: [`MAGIC_DAMAGE`, `EMPOWERED_ATTACK`, `MOBILITY`, `BURST_DAMAGE`],
  },
  // AKALI - Q
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
  // AKALI - W
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
  // AKALI - E
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
  // AKALI - R
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
  // === AKSHAN ===
  // AKSHAN - PASSIVE
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
      threeHitPassive: {
        requiredHits: 3,
        bonusMagicDamage: {
          baseValue: 25,
          damageType: `MAGIC`,
        },
        shieldAgainstChampions: {
          baseValue: 40,
          attackDamageRatio: 0.4,
        },
      },
      secondShot: {
        physicalDamage: {
          baseValue: 26,
          attackDamageRatio: 0.5,
          damageType: `PHYSICAL`,
        },
        canCancelForMovementSpeed: true,
        movementSpeedType: `DECAYING`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SHIELD, SkillEffect.SPEED_UP],
    tags: [`DOUBLE_SHOT`, `SHIELD`, `MOVEMENT_SPEED`, `ON_HIT_CHAMPION`],
  },
  // AKSHAN - Q
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
      extendsOnEnemyHit: true,
      returnsToCaster: true,
    },
    scaling: {
      damage: {
        values: [10, 40, 70, 100],
        attackDamageRatio: 0.85,
        damageType: `PHYSICAL`,
      },
      minionDamageRatio: [0.55, 0.7, 0.85, 1],
      revealsEnemiesHit: true,
      grantsDecayingMovementSpeedOnChampionHit: true,
      returnAppliesSameEffects: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.VISION, SkillEffect.SPEED_UP],
    tags: [`SKILL_SHOT`, `REVEAL`, `MOVEMENT_SPEED`, `POKE`, `WAVE_CLEAR`],
  },
  // AKSHAN - W
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
      passive: {
        marksScoundrels: true,
        bonusGoldOnScoundrelTakedown: true,
        revivesSlainAlliesOnScoundrelTakedown: true,
      },
      active: {
        camouflage: true,
        movementSpeedPercentTowardScoundrels: [80, 90, 100, 110],
        remainsCamouflagedNearTerrainOrBrush: true,
        missingManaRegenPercentPerSecond: 2,
      },
    },
    effects: [SkillEffect.STEALTH, SkillEffect.SPEED_UP],
    tags: [`CAMOUFLAGE`, `REVIVE`, `ROAMING`, `MOVEMENT_SPEED`, `MANA_REGEN`],
  },
  // AKSHAN - E
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
      resetsOnChampionTakedown: true,
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
      attacksNearestEnemyWhileSwinging: true,
      jumpsOffOnChampionOrTerrainCollision: true,
      recastJumpsOffRope: true,
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
  // AKSHAN - R
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
      damageScalesWithTargetMissingHealth: true,
      criticalRateDamageMultiplierRatio: 0.5,
      recastFiresShots: true,
      firstEnemyOrStructureCanBlockShots: true,
      shotsExecuteMinions: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.EXECUTE],
    tags: [`LOCK_ON`, `EXECUTE`, `CRITICAL_SCALING`, `MISSING_HEALTH_DAMAGE`],
  },
  // === ALISTAR ===
  // ALISTAR - PASSIVE
  {
    championKey: `alistar`,
    slot: SkillSlot.PASSIVE,
    name: `Triumphant Roar`,
    nameVi: `Tiếng Gầm Chiến Thắng`,
    description: `When Alistar takes damage, he heals himself and nearby allied champions. Knocking up or stunning champions with Alistar's abilities reduces the cooldown.`,
    descriptionVi: `Khi Alistar chịu sát thương, hắn hồi máu cho bản thân và tướng đồng minh gần đó. Hất tung hoặc làm choáng tướng bằng kỹ năng của Alistar sẽ giảm hồi chiêu của nội tại.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ALLIES,
    cooldown: null,
    cost: null,
    range: {
      type: `NEARBY_ALLIES`,
    },
    scaling: {
      selfHeal: 27,
      allyHeal: 54,
      cooldownReductionOnKnockUpOrStunSeconds: 10,
    },
    effects: [SkillEffect.HEAL],
    tags: [`HEALING`, `TEAM_SUPPORT`, `PEEL`],
  },
  // ALISTAR - Q
  {
    championKey: `alistar`,
    slot: SkillSlot.Q,
    name: `Pulverize`,
    nameVi: `Nghiền Nát`,
    description: `Alistar smashes the ground, dealing magic damage to nearby enemies and tossing them into the air for 1 second.`,
    descriptionVi: `Alistar đập mạnh xuống đất, gây sát thương phép lên kẻ địch xung quanh và hất tung chúng trong 1 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [14, 12, 10, 9],
      unit: `seconds`,
    },
    cost: {
      values: [65, 70, 75, 80],
      resource: `MANA`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      damage: {
        values: [60, 110, 160, 210],
        abilityPowerRatio: 0.5,
        damageType: `MAGIC`,
      },
      knockUpDurationSeconds: 1,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_UP],
    tags: [`AREA_DAMAGE`, `KNOCK_UP`, `ENGAGE`, `CROWD_CONTROL`],
  },
  // ALISTAR - W
  {
    championKey: `alistar`,
    slot: SkillSlot.W,
    name: `Headbutt`,
    nameVi: `Bò Húc`,
    description: `Alistar rams a target, dealing magic damage and knocking the target back. May also target turrets to deal reduced damage.`,
    descriptionVi: `Alistar húc vào một mục tiêu, gây sát thương phép và đẩy lùi mục tiêu. Có thể dùng lên trụ và gây sát thương giảm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [14, 12, 11, 9],
      unit: `seconds`,
    },
    cost: {
      values: [65, 70, 75, 80],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_DASH`,
    },
    scaling: {
      damage: {
        values: [50, 120, 190, 260],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      turretDamageRatio: 0.75,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_BACK, SkillEffect.DASH],
    tags: [`KNOCK_BACK`, `DASH`, `ENGAGE`, `PEEL`, `CROWD_CONTROL`],
  },
  // ALISTAR - E
  {
    championKey: `alistar`,
    slot: SkillSlot.E,
    name: `Trample`,
    nameVi: `Giày Xéo`,
    description: `Alistar tramples nearby enemies over 5 seconds. If Trample damages an enemy champion 5 times, Alistar's next attack against an enemy champion is empowered to deal bonus magic damage and stun.`,
    descriptionVi: `Alistar giày xéo kẻ địch xung quanh trong 5 giây. Nếu Giày Xéo gây sát thương lên tướng địch 5 lần, đòn đánh kế tiếp của Alistar lên tướng địch được cường hóa, gây thêm sát thương phép và làm choáng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [12, 11, 11, 10],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `MANA`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      damageOverDuration: {
        values: [100, 150, 200, 250],
        abilityPowerRatio: 0.4,
        durationSeconds: 5,
        damageType: `MAGIC`,
      },
      requiredChampionTicks: 5,
      empoweredAttackWindowSeconds: 5,
      empoweredAttackBonusMagicDamage: 40,
      stunDurationSeconds: 1,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.STUN,
      SkillEffect.EMPOWERED_ATTACK,
    ],
    tags: [`AREA_DAMAGE`, `STUN`, `EMPOWERED_ATTACK`, `MELEE_TRADING`],
  },
  // ALISTAR - R
  {
    championKey: `alistar`,
    slot: SkillSlot.R,
    name: `Unbreakable Will`,
    nameVi: `Bất Khuất`,
    description: `Alistar removes all crowd control effects and gains damage reduction for 7 seconds.`,
    descriptionVi: `Alistar loại bỏ toàn bộ hiệu ứng khống chế và nhận giảm sát thương trong 7 giây.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [75, 65, 55],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damageReductionPercent: [55, 65, 75],
      durationSeconds: 7,
      removesCrowdControl: true,
    },
    effects: [],
    tags: [`CLEANSE`, `DAMAGE_REDUCTION`, `SURVIVABILITY`, `FRONTLINE`],
  },
  // === AMBESSA ===
  // AMBESSA - PASSIVE
  {
    championKey: `ambessa`,
    slot: SkillSlot.PASSIVE,
    name: `Drakehound's Step`,
    nameVi: `Bước Chân Long Khuyển`,
    description: `Ambessa's next attack within 4 seconds of triggering Feint is faster, has increased range, deals bonus physical damage, and restores Energy. Feint lets Ambessa dash a short distance by moving right after casting an ability.`,
    descriptionVi: `Đòn đánh kế tiếp của Ambessa trong 4 giây sau khi kích hoạt Giả Bộ sẽ nhanh hơn, tăng tầm đánh, gây thêm sát thương vật lý và hồi Nội Năng. Giả Bộ cho phép Ambessa lướt một đoạn ngắn khi di chuyển ngay sau khi dùng kỹ năng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      empoweredAttackWindowSeconds: 4,
      empoweredAttackSpeedPercent: 50,
      bonusPhysicalDamage: {
        baseByLevel: {
          min: 5,
          max: 40,
        },
        flatScalingByLevel: {
          min: 2.5,
          max: 25,
        },
        bonusAttackDamageRatio: 0.25,
        damageType: `PHYSICAL`,
      },
      energyRestore: 50,
      maxStacks: 3,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.DASH,
      SkillEffect.EMPOWERED_ATTACK,
    ],
    tags: [`DASH`, `EMPOWERED_ATTACK`, `ENERGY_RESTORE`, `MOBILITY`],
  },
  // AMBESSA - Q
  {
    championKey: `ambessa`,
    slot: SkillSlot.Q,
    name: `Cunning Sweep / Sundering Slam`,
    nameVi: `Quét Mưu Lược / Đập Phá Giáp`,
    description: `Ambessa swings her Twin Drakehounds in a semi-circle, dealing physical damage plus max Health damage. Enemies at the edge take increased damage. If Cunning Sweep hits, it transforms into Sundering Slam for a short duration, letting her cleave enemies in a line.`,
    descriptionVi: `Ambessa vung song Long Khuyển theo hình bán nguyệt, gây sát thương vật lý kèm sát thương theo máu tối đa. Kẻ địch ở rìa đòn đánh chịu sát thương tăng thêm. Nếu Quét Mưu Lược trúng mục tiêu, kỹ năng chuyển thành Đập Phá Giáp trong thời gian ngắn, cho phép cô chém theo đường thẳng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [12, 11, 10, 9],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `ENERGY`,
    },
    range: {
      type: `CONE_THEN_LINE`,
    },
    scaling: {
      cunningSweep: {
        damage: {
          values: [30, 40, 50, 60],
          bonusAttackDamageRatio: 0.3,
          damageType: `PHYSICAL`,
        },
        maxHealthDamagePercent: [2, 2.5, 3, 3.5],
        maxHealthDamageBonusAttackDamageRatioPercent: 0.02,
      },
      cunningSweepEdge: {
        damage: {
          values: [60, 80, 100, 120],
          bonusAttackDamageRatio: 0.6,
          damageType: `PHYSICAL`,
        },
        maxHealthDamagePercent: [4, 5, 6, 7],
        maxHealthDamageBonusAttackDamageRatioPercent: 0.04,
      },
      transformWindowSeconds: 3.5,
      sunderingSlamFirstTarget: {
        damage: {
          values: [70, 100, 130, 160],
          bonusAttackDamageRatio: 0.9,
          damageType: `PHYSICAL`,
        },
        maxHealthDamagePercent: [4, 5, 6, 7],
        maxHealthDamageBonusAttackDamageRatioPercent: 0.04,
      },
      sunderingSlamOtherTargets: {
        damage: {
          values: [35, 50, 65, 80],
          bonusAttackDamageRatio: 0.45,
          damageType: `PHYSICAL`,
        },
        maxHealthDamagePercent: [2, 2.5, 3, 3.5],
        maxHealthDamageBonusAttackDamageRatioPercent: 0.02,
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `AREA_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `MULTI_CAST`,
      `MELEE_TRADING`,
    ],
  },
  // AMBESSA - W
  {
    championKey: `ambessa`,
    slot: SkillSlot.W,
    name: `Repudiation`,
    nameVi: `Phản Bác`,
    description: `Ambessa braces herself, gaining a shield and briefly blocking crowd control effects. She then unleashes a shockwave, dealing physical damage to nearby enemies. If she braced against an immobilizing effect, the shockwave deals increased damage.`,
    descriptionVi: `Ambessa thủ thế, nhận lá chắn và chặn hiệu ứng khống chế trong thoáng chốc. Sau đó cô tung ra sóng xung kích, gây sát thương vật lý lên kẻ địch xung quanh. Nếu cô thủ thế trước một hiệu ứng bất động, sóng xung kích gây sát thương tăng thêm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [17, 16, 15, 14],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `ENERGY`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      shield: {
        valuesByLevel: {
          min: 50,
          max: 330,
        },
        bonusAttackDamageRatio: 1.2,
        durationSeconds: 1.5,
      },
      crowdControlBlockDurationSeconds: 0.5,
      shockwaveDamage: {
        values: [70, 100, 130, 160],
        bonusAttackDamageRatio: 0.8,
        damageType: `PHYSICAL`,
      },
      empoweredShockwaveDamage: {
        values: [105, 150, 195, 240],
        bonusAttackDamageRatio: 1.2,
        damageType: `PHYSICAL`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SHIELD],
    tags: [`SHIELD`, `ANTI_CC`, `AREA_DAMAGE`, `DAMAGE_REDUCTION`],
  },
  // AMBESSA - E
  {
    championKey: `ambessa`,
    slot: SkillSlot.E,
    name: `Lacerate`,
    nameVi: `Xé Rách`,
    description: `Ambessa swings her Twin Drakehounds around herself, dealing physical damage and heavily slowing enemies. If Drakehound's Step is triggered after casting Lacerate, Ambessa casts Lacerate again at the end of the dash.`,
    descriptionVi: `Ambessa xoay song Long Khuyển quanh bản thân, gây sát thương vật lý và làm chậm mạnh kẻ địch. Nếu Bước Chân Long Khuyển được kích hoạt sau khi dùng Xé Rách, Ambessa sẽ dùng Xé Rách lần nữa ở cuối cú lướt.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [11, 10, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `ENERGY`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      damage: {
        values: [40, 80, 120, 160],
        bonusAttackDamageRatio: [0.5, 0.6, 0.7, 0.8],
        damageType: `PHYSICAL`,
      },
      slowPercent: 99,
      slowDecayDurationSeconds: 1,
      recastAfterFeint: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`AREA_DAMAGE`, `SLOW`, `RECAST`, `DASH`, `MULTI_CAST`],
  },
  // AMBESSA - R
  {
    championKey: `ambessa`,
    slot: SkillSlot.R,
    name: `Public Execution`,
    nameVi: `Hành Quyết Công Khai`,
    description: `Passive: Ambessa gains Armor Penetration and her active abilities heal her for a percentage of damage dealt. Active: Ambessa seizes the farthest enemy champion in a line, blinks to them, suppresses them, gains damage reduction and becomes unstoppable, then slams the target for physical damage plus missing Health damage and stuns them.`,
    descriptionVi: `Nội tại: Ambessa nhận Xuyên Giáp và các kỹ năng chủ động hồi máu cho cô theo một phần sát thương gây ra. Kích hoạt: Ambessa bắt giữ tướng địch xa nhất trên một đường thẳng, dịch chuyển đến mục tiêu, áp chế chúng, nhận giảm sát thương và không thể bị cản phá, sau đó đập mục tiêu xuống đất, gây sát thương vật lý cộng sát thương theo máu đã mất và làm choáng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [0, 80, 70, 60],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `LINE_LOCK_ON`,
    },
    scaling: {
      passiveArmorPenetrationPercent: [10, 20, 30],
      activeAbilityHealingPercent: [12.5, 15, 17.5],
      minionHealingRatio: 0.25,
      monsterHealingRatio: 0.4,
      suppressDurationSeconds: 1,
      damageReductionPercent: [30, 40, 50],
      stunDurationSeconds: 0.4,
      damage: {
        values: [200, 300, 400],
        bonusAttackDamageRatio: 0.0005,
        abilityPowerRatio: 0.0005,
        damageType: `PHYSICAL`,
      },
      missingHealthDamagePercent: 20,
      cooldownRefundOnMissPercent: 35,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.BLINK,
      SkillEffect.STUN,
      SkillEffect.HEAL,
    ],
    tags: [
      `ARMOR_PENETRATION`,
      `PHYSICAL_VAMP`,
      `SUPPRESS`,
      `UNSTOPPABLE`,
      `DAMAGE_REDUCTION`,
      `MISSING_HEALTH_DAMAGE`,
      `STUN`,
    ],
  },
  // === AMUMU ===
  // AMUMU - PASSIVE
  {
    championKey: `amumu`,
    slot: SkillSlot.PASSIVE,
    name: `Cursed Touch`,
    nameVi: `Cú Chạm Nguyền Rủa`,
    description: `Amumu's basic attacks Curse enemies, causing them to take bonus true damage from incoming magic damage.`,
    descriptionVi: `Đòn đánh thường của Amumu nguyền rủa kẻ địch, khiến chúng chịu thêm sát thương chuẩn từ sát thương phép nhận vào.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      bonusTrueDamageFromIncomingMagicDamagePercent: 10,
    },
    effects: [SkillEffect.TRUE_DAMAGE],
    tags: [`MAGIC_DAMAGE`, `TRUE_DAMAGE`, `DAMAGE_AMP`, `ANTI_TANK`],
  },
  // AMUMU - Q
  {
    championKey: `amumu`,
    slot: SkillSlot.Q,
    name: `Bandage Toss`,
    nameVi: `Quăng Dải Băng`,
    description: `Passive: Bandage Toss charges are stored over time, up to 2 charges. Active: Amumu launches a bandage that deals magic damage, stuns the target, and pulls himself to the target.`,
    descriptionVi: `Nội tại: Quăng Dải Băng tích trữ điểm dùng theo thời gian, tối đa 2 điểm. Kích hoạt: Amumu phóng dải băng gây sát thương phép, làm choáng mục tiêu và kéo bản thân đến mục tiêu.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [13, 12, 12, 11],
      unit: `seconds`,
    },
    cost: {
      values: [35, 40, 45, 50],
      resource: `MANA`,
    },
    range: {
      type: `LINE_SKILLSHOT`,
    },
    scaling: {
      chargeRechargeValues: [13, 12.5, 12, 11.5],
      maxCharges: 2,
      damage: {
        values: [60, 95, 130, 165],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      stunDurationSeconds: 1,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.STUN, SkillEffect.PULL],
    tags: [`SKILL_SHOT`, `STUN`, `PULL`, `ENGAGE`, `MULTI_CAST`],
  },
  // AMUMU - W
  {
    championKey: `amumu`,
    slot: SkillSlot.W,
    name: `Despair`,
    nameVi: `Tuyệt Vọng`,
    description: `Amumu begins weeping, dealing magic damage plus a percentage of nearby enemies' maximum Health every second.`,
    descriptionVi: `Amumu bắt đầu khóc, gây sát thương phép cộng sát thương theo phần trăm máu tối đa lên kẻ địch xung quanh mỗi giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [1, 1, 1, 1],
      unit: `seconds`,
    },
    cost: {
      values: [10, 11, 12, 13],
      resource: `MANA`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      damagePerSecond: {
        values: [25, 30, 35, 40],
        damageType: `MAGIC`,
      },
      maxHealthDamagePercentPerSecond: [1.2, 1.5, 1.8, 2.1],
      maxHealthDamageAbilityPowerRatioPercent: 0.4,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [`AREA_DAMAGE`, `PERCENT_HEALTH_DAMAGE`, `ANTI_TANK`, `TOGGLE`],
  },
  // AMUMU - E
  {
    championKey: `amumu`,
    slot: SkillSlot.E,
    name: `Tantrum`,
    nameVi: `Giận Dữ`,
    description: `Passive: Amumu takes reduced physical damage. Active: Amumu deals magic damage to nearby enemies and slows them. Tantrum's cooldown is reduced when Amumu is hit by an attack.`,
    descriptionVi: `Nội tại: Amumu nhận giảm sát thương vật lý. Kích hoạt: Amumu gây sát thương phép lên kẻ địch xung quanh và làm chậm chúng. Hồi chiêu của Giận Dữ giảm khi Amumu bị tấn công.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [35, 35, 35],
      resource: `MANA`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      passivePhysicalDamageReduction: {
        values: [1, 3, 5, 7],
        armorRatio: 0.04,
        magicResistRatio: 0.04,
      },
      cooldownReductionOnBeingHitSeconds: 0.5,
      damage: {
        values: [90, 120, 150, 180],
        abilityPowerRatio: 0.5,
        damageType: `MAGIC`,
      },
      slowPercent: 10,
      slowDurationSeconds: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`AREA_DAMAGE`, `SLOW`, `DAMAGE_REDUCTION`, `LOW_COOLDOWN_HARASS`],
  },
  // AMUMU - R
  {
    championKey: `amumu`,
    slot: SkillSlot.R,
    name: `Curse of the Sad Mummy`,
    nameVi: `Lời Nguyền Xác Ướp U Sầu`,
    description: `Amumu entangles surrounding enemies in bandages, applying his Curse, dealing magic damage, and rendering them unable to attack or move.`,
    descriptionVi: `Amumu trói kẻ địch xung quanh bằng dải băng, áp dụng Nguyền Rủa, gây sát thương phép và khiến chúng không thể tấn công hoặc di chuyển.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [105, 95, 85],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      damage: {
        values: [150, 250, 350],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      disableDurationSeconds: 1.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.ROOT],
    tags: [`AREA_DAMAGE`, `ROOT`, `TEAMFIGHT`, `CROWD_CONTROL`, `ENGAGE`],
  },
  // === ANNIE ===
  // ANNIE - PASSIVE
  {
    championKey: `annie`,
    slot: SkillSlot.PASSIVE,
    name: `Pyromania`,
    nameVi: `Hỏa Cuồng`,
    description: `After casting 4 abilities, Annie's next offensive ability stuns enemies hit for 1 second.`,
    descriptionVi: `Sau khi dùng 4 kỹ năng, kỹ năng tấn công tiếp theo của Annie sẽ làm choáng kẻ địch trúng chiêu trong 1 giây.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      requiredAbilityCasts: 4,
      stunDurationSeconds: 1,
    },
    effects: [SkillEffect.STUN],
    tags: [`STUN`, `STACKING_PASSIVE`, `BURST_SETUP`, `CROWD_CONTROL`],
  },
  // ANNIE - Q
  {
    championKey: `annie`,
    slot: SkillSlot.Q,
    name: `Disintegrate`,
    nameVi: `Hỏa Cầu`,
    description: `Annie hurls a Mana-infused fireball, dealing magic damage in a small area. If it destroys the target, it refunds the Mana cost and half of its cooldown.`,
    descriptionVi: `Annie ném một quả cầu lửa được truyền năng lượng Mana, gây sát thương phép trong một vùng nhỏ. Nếu kỹ năng tiêu diệt mục tiêu, Annie được hoàn lại Mana và một nửa hồi chiêu.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [4, 4, 4, 4],
      unit: `seconds`,
    },
    cost: {
      values: [50, 55, 60, 65],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_SMALL_AREA`,
    },
    scaling: {
      damage: {
        values: [80, 130, 180, 230],
        abilityPowerRatio: 0.85,
        damageType: `MAGIC`,
      },
      manaRefundOnKill: true,
      cooldownRefundOnKillRatio: 0.5,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [`MAGIC_DAMAGE`, `BURST`, `LAST_HIT_REFUND`, `LOW_COOLDOWN_HARASS`],
  },
  // ANNIE - W
  {
    championKey: `annie`,
    slot: SkillSlot.W,
    name: `Incinerate`,
    nameVi: `Thiêu Cháy`,
    description: `Annie casts a blazing cone of fire, dealing magic damage to all enemies in the area.`,
    descriptionVi: `Annie phóng ra một luồng lửa hình nón, gây sát thương phép lên toàn bộ kẻ địch trong vùng ảnh hưởng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [8, 8, 8, 8],
      unit: `seconds`,
    },
    cost: {
      values: [70, 80, 90, 100],
      resource: `MANA`,
    },
    range: {
      type: `CONE`,
    },
    scaling: {
      damage: {
        values: [70, 130, 190, 250],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [`MAGIC_DAMAGE`, `AREA_DAMAGE`, `BURST`, `CONE_DAMAGE`],
  },
  // ANNIE - E
  {
    championKey: `annie`,
    slot: SkillSlot.E,
    name: `Molten Shield`,
    nameVi: `Khiên Lửa`,
    description: `Annie shields herself and Tibbers, absorbing damage and gaining movement speed. The speed bonus decays after 3 seconds.`,
    descriptionVi: `Annie tạo lá chắn cho bản thân và Tibbers, hấp thụ sát thương và nhận tốc độ di chuyển. Tốc độ cộng thêm giảm dần sau 3 giây.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [14, 14, 14, 14],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `SELF_AND_SUMMON`,
    },
    scaling: {
      shield: {
        values: [50, 100, 150, 200],
        abilityPowerRatio: 0.4,
        durationSeconds: 3,
      },
      movementSpeedPercent: [25, 30, 33, 40],
      movementSpeedDecayAfterSeconds: 3,
    },
    effects: [SkillEffect.SHIELD, SkillEffect.SPEED_UP],
    tags: [`SHIELD`, `MOVEMENT_SPEED`, `SELF_BUFF`, `SUMMON_SUPPORT`],
  },
  // ANNIE - R
  {
    championKey: `annie`,
    slot: SkillSlot.R,
    name: `Summon: Tibbers`,
    nameVi: `Triệu Hồi: Tibbers`,
    description: `Annie summons Tibbers, dealing magic damage to nearby enemies. After casting, Annie can reactivate the ability to order Tibbers to pounce on a target, dealing magic damage and knocking them airborne. Tibbers enrages when summoned, when pouncing, or when Annie dies.`,
    descriptionVi: `Annie triệu hồi Tibbers, gây sát thương phép lên kẻ địch gần đó. Sau khi dùng chiêu, Annie có thể tái kích hoạt để ra lệnh Tibbers nhảy vào mục tiêu, gây sát thương phép và hất tung chúng. Tibbers nổi giận khi được triệu hồi, khi nhảy vào kẻ địch hoặc khi Annie chết.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [70, 65, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `AREA_SUMMON_AND_TARGETED_RECAST`,
    },
    scaling: {
      summonDamage: {
        values: [130, 230, 330],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      recastDelaySeconds: 2,
      pounceDamage: {
        values: [110, 150, 190],
        abilityPowerRatio: 0.3,
        damageType: `MAGIC`,
      },
      airborneDurationSeconds: 1,
      tibbersDurationSeconds: 20,
      tibbersEnrage: {
        hastePercent: 100,
        attackSpeedPercent: 210,
        triggers: [`ON_SUMMON`, `ON_POUNCE`, `ON_ANNIE_DEATH`],
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_UP],
    tags: [
      `SUMMON`,
      `RECAST`,
      `KNOCK_UP`,
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
      `TEAMFIGHT`,
    ],
  },
  // === ASHE ===
  // ASHE - PASSIVE
  {
    championKey: `ashe`,
    slot: SkillSlot.PASSIVE,
    name: `Frost Shot`,
    nameVi: `Băng Tiễn`,
    description: `Ashe's attacks and damaging abilities slow targets. Her attacks deal increased damage that scales with Critical Damage. Critical Strikes deal no bonus damage but apply a stronger slow that decays over time.`,
    descriptionVi: `Đòn đánh và kỹ năng gây sát thương của Ashe làm chậm mục tiêu. Đòn đánh của cô gây thêm sát thương, tăng theo sát thương chí mạng. Đòn chí mạng không gây thêm sát thương nhưng làm chậm mạnh hơn và giảm dần theo thời gian.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      slowPercent: 15,
      slowDurationSeconds: 2,
      attackDamageMultiplierPercent: 110,
      criticalSlowPercent: 40,
      criticalSlowDecays: true,
      scalesWithCriticalDamage: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`SLOW`, `CRITICAL_SCALING`, `KITE`, `AUTO_ATTACK_CHAMPION`],
  },
  // ASHE - Q
  {
    championKey: `ashe`,
    slot: SkillSlot.Q,
    name: `Ranger's Focus`,
    nameVi: `Chú Tâm Tiễn`,
    description: `Passive: Ashe's attacks grant Focus stacks. At 4 stacks, she can activate this ability. Active: Ashe gains Attack Speed and transforms her attacks into a flurry of arrows that deal increased physical damage.`,
    descriptionVi: `Nội tại: Đòn đánh của Ashe cộng dồn Chú Tâm. Khi đạt 4 cộng dồn, cô có thể kích hoạt kỹ năng. Kích hoạt: Ashe nhận Tốc Độ Đánh và chuyển đòn đánh thành loạt tên gây sát thương vật lý tăng thêm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.SELF,
    cooldown: {
      values: [0, 0, 0, 0],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      requiredFocusStacks: 4,
      focusStackDurationSeconds: 4,
      attackSpeedPercent: [20, 30, 40, 50],
      durationSeconds: 6,
      flurryAttackDamageMultiplierPercent: [115, 120, 125, 130],
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `STACKING_PASSIVE`,
      `ATTACK_SPEED_STEROID`,
      `EMPOWERED_ATTACK`,
      `AUTO_ATTACK_CHAMPION`,
    ],
  },
  // ASHE - W
  {
    championKey: `ashe`,
    slot: SkillSlot.W,
    name: `Volley`,
    nameVi: `Tán Xạ Tiễn`,
    description: `Ashe fires multiple arrows in a cone, dealing physical damage and applying Frost Shot's critical slow.`,
    descriptionVi: `Ashe bắn nhiều mũi tên theo hình nón, gây sát thương vật lý và áp dụng làm chậm chí mạng từ Băng Tiễn.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [16, 14, 11, 9],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `CONE_PROJECTILES`,
    },
    scaling: {
      arrowCount: [5, 7, 9, 11],
      damage: {
        values: [20, 35, 50, 65],
        attackDamageRatio: 1.15,
        damageType: `PHYSICAL`,
      },
      appliesCriticalFrostShotSlow: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`POKE`, `CONE_DAMAGE`, `SLOW`, `PHYSICAL_DAMAGE`, `SKILL_SHOT`],
  },
  // ASHE - E
  {
    championKey: `ashe`,
    slot: SkillSlot.E,
    name: `Hawkshot`,
    nameVi: `Ưng Tiễn`,
    description: `Ashe fires a hawk spirit that grants vision of enemies along its path. Recast: detonates the hawk, granting vision around it and revealing units caught in the explosion.`,
    descriptionVi: `Ashe phóng một linh hồn chim ưng, cho tầm nhìn kẻ địch trên đường bay. Tái kích hoạt: làm nổ chim ưng, cho tầm nhìn xung quanh và làm lộ diện đơn vị trong vùng nổ.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [45, 40, 35, 30],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `GLOBAL_SCOUTING_PROJECTILE`,
    },
    scaling: {
      areaVisionDurationSeconds: 5,
      revealDurationSeconds: 5,
      recastDetonatesHawk: true,
    },
    effects: [SkillEffect.VISION],
    tags: [`VISION`, `REVEAL`, `RECAST`, `GLOBAL_RANGE`, `UTILITY_MARKSMAN`],
  },
  // ASHE - R
  {
    championKey: `ashe`,
    slot: SkillSlot.R,
    name: `Enchanted Crystal Arrow`,
    nameVi: `Đại Băng Tiễn`,
    description: `Ashe launches a crystal arrow that stuns the first champion hit and deals magic damage to nearby enemies. Stun duration increases with distance traveled. Recast allows Ashe to steer the arrow within a limited angle.`,
    descriptionVi: `Ashe bắn ra một mũi tên băng khổng lồ, làm choáng tướng đầu tiên trúng phải và gây sát thương phép lên kẻ địch gần đó. Thời gian làm choáng tăng theo quãng đường bay. Tái kích hoạt cho phép Ashe điều khiển hướng bay của mũi tên trong một góc giới hạn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [80, 70, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `GLOBAL_STEERABLE_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [200, 350, 500],
        abilityPowerRatio: 0.4,
        damageType: `MAGIC`,
      },
      stunDurationSeconds: {
        min: 1.5,
        max: 3.5,
        scalesWithDistance: true,
      },
      nearbyEnemiesTakeDamage: true,
      steerableOnRecast: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.STUN],
    tags: [
      `STUN`,
      `GLOBAL_RANGE`,
      `STEERABLE_PROJECTILE`,
      `PICK`,
      `ENGAGE`,
      `MAGIC_DAMAGE`,
    ],
  },
  // === AURELION SOL ===
  // AURELION SOL - PASSIVE
  {
    championKey: `aurelion-sol`,
    slot: SkillSlot.PASSIVE,
    name: `Cosmic Creator`,
    nameVi: `Đấng Sáng Tạo Vũ Trụ`,
    description: `Casting damaging abilities against enemies grants Stardust stacks, empowering Aurelion Sol's abilities.`,
    descriptionVi: `Dùng kỹ năng gây sát thương lên kẻ địch cho Aurelion Sol cộng dồn Bụi Sao, cường hóa các kỹ năng của hắn.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      stackName: `STARDUST`,
      breathOfLightBurstMaxHealthDamagePercentPerStack: 2.5,
      astralFlightMaxDistancePercentPerStack: 62.5,
      singularityAreaIncreasePercentPerStack: 5,
      singularityExecuteThresholdPercentPerStack: 2.1,
      fallingStarAreaIncreasePercentPerStack: 15,
    },
    effects: [],
    tags: [`SCALING`, `STACKING_PASSIVE`, `ABILITY_EVOLUTION`, `ZONE_CONTROL`],
  },
  // AURELION SOL - Q
  {
    championKey: `aurelion-sol`,
    slot: SkillSlot.Q,
    name: `Breath of Light`,
    nameVi: `Hơi Thở Hỏa Tinh`,
    description: `Aurelion Sol breathes starfire, dealing magic damage per second to the first enemy hit and reduced damage to nearby enemies. Hitting the same target for 1 second triggers a burst that deals magic damage plus max Health damage based on Stardust stacks.`,
    descriptionVi: `Aurelion Sol phun lửa sao, gây sát thương phép mỗi giây lên kẻ địch đầu tiên trúng phải và gây sát thương giảm lên kẻ địch xung quanh. Khi giữ hơi thở lên cùng một mục tiêu trong 1 giây, hắn gây một vụ nổ sát thương phép kèm sát thương theo máu tối đa dựa trên cộng dồn Bụi Sao.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [3, 3, 3, 3],
      unit: `seconds`,
    },
    cost: {
      values: [10, 12, 14, 16],
      resource: `MANA`,
    },
    range: {
      type: `CHANNEL_BEAM`,
      maxRangeByScaling: {
        min: 750,
        max: 848,
      },
    },
    scaling: {
      interruptedEarlyCooldownSeconds: 1,
      interruptGracePeriodSeconds: 0.25,
      channelDurationSeconds: 3.25,
      infiniteDurationAtMaxRank: true,
      damagePerSecond: {
        values: [58, 53, 88, 103],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      nearbyEnemyDamageRatio: 0.5,
      burstIntervalOnSameTargetSeconds: 1,
      burstDamage: {
        values: [70, 80, 90, 100],
        abilityPowerRatio: 0.35,
        damageType: `MAGIC`,
      },
      burstMaxHealthDamagePercentPerStardust: 3,
      stardustOnChampionBurst: 1,
      monsterMaxHealthDamageCap: 100,
      monsterDamageRatio: 0.4,
      movementSpeedWhileCasting: 133,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `CHANNEL`,
      `MAGIC_DAMAGE`,
      `AREA_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `STACKING_PASSIVE`,
    ],
  },
  // AURELION SOL - W
  {
    championKey: `aurelion-sol`,
    slot: SkillSlot.W,
    name: `Astral Flight`,
    nameVi: `Du Hành Tinh Tú`,
    description: `Aurelion Sol flies in a direction. While flying, Breath of Light has no cooldown or max channel duration and deals increased damage. Recast ends the flight early. Champion takedowns shortly after Aurelion Sol damages them refund most of this ability's cooldown.`,
    descriptionVi: `Aurelion Sol bay theo một hướng. Khi đang bay, Hơi Thở Hỏa Tinh không có hồi chiêu hoặc giới hạn thời gian niệm và gây sát thương tăng thêm. Tái kích hoạt để kết thúc chuyến bay sớm. Nếu tướng bị hạ gục trong thời gian ngắn sau khi nhận sát thương từ Aurelion Sol, phần lớn hồi chiêu kỹ năng này được hoàn lại.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [17, 16, 15, 14],
      unit: `seconds`,
    },
    cost: {
      values: [80, 80, 80, 80],
      resource: `MANA`,
    },
    range: {
      type: `DIRECTIONAL_FLIGHT`,
    },
    scaling: {
      cooldownRefundOnRecentChampionKillPercent: 90,
      recentDamageWindowSeconds: 3,
      breathOfLightDamageAmpPercent: [115, 120, 125, 130],
      breathOfLightNoCooldownWhileFlying: true,
      breathOfLightNoMaxChannelDurationWhileFlying: true,
      baseFlightSpeed: 300,
      flightSpeedBonusMoveSpeedRatio: 1,
      flightSpeedReductionWhileCastingBreathPercent: 50,
      recastEndsFlight: true,
      maxFlightDistanceIncreasedByStardust: true,
    },
    effects: [SkillEffect.DASH],
    tags: [`FLIGHT`, `RECAST`, `MOBILITY`, `COOLDOWN_REFUND`, `SCALING`],
  },
  // AURELION SOL - E
  {
    championKey: `aurelion-sol`,
    slot: SkillSlot.E,
    name: `Singularity`,
    nameVi: `Hố Đen Kỳ Dị`,
    description: `Aurelion Sol summons a black hole, dealing magic damage per second and dragging enemies toward its center. Enemies in the center are executed below a Health threshold that scales with Stardust. Aurelion Sol gains Stardust from champions trapped inside and enemies killed within the black hole.`,
    descriptionVi: `Aurelion Sol triệu hồi một hố đen, gây sát thương phép mỗi giây và kéo kẻ địch về tâm. Kẻ địch ở trung tâm bị kết liễu khi dưới ngưỡng máu tăng theo Bụi Sao. Aurelion Sol nhận Bụi Sao từ tướng bị giữ trong vùng hố đen và từ kẻ địch bị hạ trong vùng ảnh hưởng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [11, 11, 11, 11],
      unit: `seconds`,
    },
    cost: {
      values: [80, 85, 90, 95],
      resource: `MANA`,
    },
    range: {
      type: `GROUND_AREA_BLACK_HOLE`,
    },
    scaling: {
      durationSeconds: 5,
      damagePerSecond: {
        values: [20, 27.5, 35, 42.5],
        abilityPowerRatio: 0.15,
        damageType: `MAGIC`,
      },
      executeThresholdBasePercent: 5,
      executeThresholdPercentPerStardust: 2.6,
      stardustPerSecondPerChampionTrapped: 2,
      stardustOnChampionOrEpicMonsterKill: 5,
      stardustOnSiegeMinionOrLargeMonsterKill: 5,
      stardustOnMinionOrSmallMonsterKill: 1,
      areaIncreasedByStardust: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.PULL, SkillEffect.EXECUTE],
    tags: [
      `AREA_DAMAGE`,
      `PULL`,
      `EXECUTE`,
      `ZONE_CONTROL`,
      `SCALING`,
      `STACKING_PASSIVE`,
    ],
  },
  // AURELION SOL - R
  {
    championKey: `aurelion-sol`,
    slot: SkillSlot.R,
    name: `Falling Star / The Skies Descend`,
    nameVi: `Sao Sa / Thiên Không Sụp Đổ`,
    description: `Aurelion Sol calls down a star, dealing magic damage and stunning enemies. Hitting enemy champions grants Stardust. After collecting enough Stardust, the next Falling Star transforms into The Skies Descend, dealing damage over a larger area, knocking enemies airborne, and emitting a shockwave that damages and slows enemies.`,
    descriptionVi: `Aurelion Sol kéo một ngôi sao rơi xuống, gây sát thương phép và làm choáng kẻ địch. Trúng tướng địch sẽ cho Bụi Sao. Sau khi tích đủ Bụi Sao, Sao Sa tiếp theo biến thành Thiên Không Sụp Đổ, gây sát thương trong vùng lớn hơn, hất tung kẻ địch và phát ra sóng xung kích gây sát thương, làm chậm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [80, 75, 70],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `GROUND_AREA`,
    },
    scaling: {
      fallingStarDamage: {
        values: [150, 250, 350],
        abilityPowerRatio: 0.65,
        damageType: `MAGIC`,
      },
      fallingStarStunDurationSeconds: 1,
      stardustPerChampionHit: 8,
      skiesDescendRequiredStardust: 65,
      skiesDescendDamage: {
        values: [188, 313, 438],
        abilityPowerRatio: 0.65,
        damageType: `MAGIC`,
      },
      skiesDescendAirborneDurationSeconds: 1,
      shockwaveDamage: {
        values: [150, 250, 350],
        abilityPowerRatio: 0.65,
        damageType: `MAGIC`,
      },
      shockwaveSlowPercent: 50,
      shockwaveSlowDurationSeconds: 1,
      areaIncreasedByStardust: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.STUN,
      SkillEffect.KNOCK_UP,
      SkillEffect.SLOW,
    ],
    tags: [
      `AREA_DAMAGE`,
      `STUN`,
      `KNOCK_UP`,
      `SLOW`,
      `ABILITY_EVOLUTION`,
      `TEAMFIGHT`,
      `SCALING`,
    ],
  },
  // === AURORA ===
  // AURORA - PASSIVE
  {
    championKey: `aurora`,
    slot: SkillSlot.PASSIVE,
    name: `Spirit Abjuration`,
    nameVi: `Trừ Tà Linh Hồn`,
    description: `Damaging an enemy 3 times with abilities or attacks exorcises them, dealing magic damage based on the target's max Health. If the enemy is a champion, it frees a spirit that follows Aurora and restores her Health every second.`,
    descriptionVi: `Gây sát thương lên kẻ địch 3 lần bằng kỹ năng hoặc đòn đánh sẽ trừ tà chúng, gây sát thương phép theo máu tối đa của mục tiêu. Nếu mục tiêu là tướng, một linh hồn được giải phóng, đi theo Aurora và hồi máu cho cô mỗi giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      requiredHits: 3,
      maxHealthMagicDamagePercent: 2.5,
      maxHealthMagicDamageAbilityPowerRatioPercent: 2,
      spiritDurationSeconds: 4,
      maxSpirits: 4,
      healingPerSecond: {
        valuesByLevel: {
          min: 1,
          max: 18,
        },
        abilityPowerRatio: 0.02,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL],
    tags: [`PERCENT_HEALTH_DAMAGE`, `STACKING_PASSIVE`, `HEALING`, `SKIRMISH`],
  },
  // AURORA - Q
  {
    championKey: `aurora`,
    slot: SkillSlot.Q,
    name: `Twofold Hex`,
    nameVi: `Lời Nguyền Hai Lần`,
    description: `First Cast: Aurora fires cursed energy in a direction, dealing magic damage and cursing enemies. Recast: detonates the curse, dealing magic damage to enemies passed through, increased based on missing Health. If the curse expires, Aurora automatically recasts the ability.`,
    descriptionVi: `Lần dùng đầu: Aurora bắn năng lượng bị nguyền theo một hướng, gây sát thương phép và nguyền rủa kẻ địch. Tái kích hoạt: kích nổ lời nguyền, gây sát thương phép lên kẻ địch đi xuyên qua, tăng theo máu đã mất. Nếu lời nguyền hết thời gian, Aurora tự động tái kích hoạt kỹ năng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [8, 7, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE_AND_RECALL`,
    },
    scaling: {
      firstCastDamage: {
        values: [35, 65, 95, 125],
        abilityPowerRatio: 0.3,
        damageType: `MAGIC`,
      },
      curseDurationSeconds: 3.5,
      recastDamage: {
        values: [35, 65, 95, 125],
        abilityPowerRatio: 0.3,
        damageType: `MAGIC`,
      },
      missingHealthBonusDamageMaxPercent: 50,
      damageBeyondFirstHitReductionPercent: 20,
      minionAndMonsterDamageRatio: 0.4,
      autoRecastOnExpire: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `SKILL_SHOT`,
      `RECAST`,
      `MAGIC_DAMAGE`,
      `MISSING_HEALTH_DAMAGE`,
      `POKE`,
    ],
  },
  // AURORA - W
  {
    championKey: `aurora`,
    slot: SkillSlot.W,
    name: `Across the Veil`,
    nameVi: `Băng Qua Màn Che`,
    description: `Aurora hops in a direction. Upon landing, she enters the spirit realm, becoming invisible and entering Realm Hopper. Realm Hopper grants Movement Speed. Champion takedowns reset this ability's cooldown.`,
    descriptionVi: `Aurora nhảy theo một hướng. Khi đáp xuống, cô bước vào linh giới, trở nên vô hình và vào trạng thái Nhảy Cõi. Nhảy Cõi cho tốc độ di chuyển. Hạ gục tướng địch sẽ đặt lại hồi chiêu kỹ năng này.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [21, 20, 19, 18],
      unit: `seconds`,
    },
    cost: {
      values: [80, 80, 80, 80],
      resource: `MANA`,
    },
    range: {
      type: `DIRECTIONAL_HOP`,
    },
    scaling: {
      resetsCooldownOnChampionTakedown: true,
      invisibilityDurationSeconds: [1, 1.2, 1.4, 1.6],
      realmHopperMovementSpeedPercent: [25, 30, 35, 40],
      realmHopperDurationSeconds: 4,
    },
    effects: [SkillEffect.DASH, SkillEffect.STEALTH, SkillEffect.SPEED_UP],
    tags: [
      `DASH`,
      `STEALTH`,
      `MOVEMENT_SPEED`,
      `COOLDOWN_RESET`,
      `REALM_HOPPER`,
    ],
  },
  // AURORA - E
  {
    championKey: `aurora`,
    slot: SkillSlot.E,
    name: `The Weirding`,
    nameVi: `Dị Biến`,
    description: `Aurora sends out a blast of spirit magic, dealing magic damage and heavily slowing enemies. Aurora hops backward after casting.`,
    descriptionVi: `Aurora phóng ra một luồng ma thuật linh hồn, gây sát thương phép và làm chậm mạnh kẻ địch. Aurora nhảy lùi một đoạn ngắn sau khi dùng kỹ năng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [13, 12, 11, 10],
      unit: `seconds`,
    },
    cost: {
      values: [80, 80, 80, 80],
      resource: `MANA`,
    },
    range: {
      type: `AREA_BLAST_AND_BACK_HOP`,
    },
    scaling: {
      damage: {
        values: [75, 125, 175, 225],
        abilityPowerRatio: 0.65,
        damageType: `MAGIC`,
      },
      slowPercent: 80,
      slowDecayDurationSeconds: 1,
      backwardHopAfterCast: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.DASH],
    tags: [`AREA_DAMAGE`, `SLOW`, `SELF_DISPLACEMENT`, `MAGIC_DAMAGE`],
  },
  // AURORA - R
  {
    championKey: `aurora`,
    slot: SkillSlot.R,
    name: `Between Worlds`,
    nameVi: `Giữa Hai Thế Giới`,
    description: `Aurora leaps in a direction and creates an area of convergence, dealing magic damage and slowing enemies. The area grants Aurora Realm Hopper and lets her jump from one edge to another. Enemies attempting to enter or leave the area are slowed. Recast ends the area early.`,
    descriptionVi: `Aurora nhảy theo một hướng và tạo vùng hội tụ, gây sát thương phép và làm chậm kẻ địch. Vùng này cho Aurora Nhảy Cõi và cho phép cô nhảy từ rìa này sang rìa khác. Kẻ địch cố đi vào hoặc rời khỏi vùng sẽ bị làm chậm. Tái kích hoạt để kết thúc vùng sớm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [100, 90, 80],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LEAP_AND_AREA_CONVERGENCE`,
    },
    scaling: {
      pulseDamage: {
        values: [150, 250, 350],
        abilityPowerRatio: 0.5,
        damageType: `MAGIC`,
      },
      initialSlowPercent: 30,
      initialSlowDurationSeconds: 2,
      areaDurationSeconds: [2.5, 3.25, 4],
      grantsRealmHopper: true,
      edgeJumpEnabled: true,
      boundarySlowPercent: 50,
      boundarySlowDurationSeconds: [1.5, 1.75, 2],
      recastEndsAreaEarly: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.DASH],
    tags: [
      `AREA_DAMAGE`,
      `ZONE_CONTROL`,
      `RECAST`,
      `REALM_HOPPER`,
      `BOUNDARY_CONTROL`,
      `MAGIC_DAMAGE`,
    ],
  },
  // === BARD ===
  // BARD - PASSIVE
  {
    championKey: `bard`,
    slot: SkillSlot.PASSIVE,
    name: `Traveler's Call`,
    nameVi: `Tiếng Gọi Lữ Khách`,
    description: `Chimes: Bard attracts and collects chimes on the map. Nearby chimes are collected automatically, granting out-of-combat Movement Speed for 20 seconds, experience, and restoring max Mana. Chimes remain for 10 minutes. Starting from 5 minutes into the game, Bard gains additional experience every minute. Meeps: Bard summons a meep every 7 seconds, up to 1 meep. Meeps empower Bard's attacks to deal bonus magic damage. Chime milestones add a slow and larger area damage effects.`,
    descriptionVi: `Chuông: Bard thu hút và nhặt chuông trên bản đồ. Chuông ở gần sẽ tự động được thu thập, cho Tốc Độ Di Chuyển ngoài giao tranh trong 20 giây, kinh nghiệm và hồi năng lượng tối đa. Chuông tồn tại trong 10 phút. Từ phút thứ 5 của trận đấu, Bard nhận thêm kinh nghiệm mỗi phút. Meep: Bard triệu hồi một meep mỗi 7 giây, tối đa 1 meep. Meep cường hóa đòn đánh của Bard để gây thêm sát thương phép. Các mốc chuông giúp đòn đánh có thêm làm chậm và sát thương diện rộng lớn hơn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      chimes: {
        outOfCombatMovementSpeedPercent: 24,
        movementSpeedDurationSeconds: 20,
        movementSpeedMaxStacks: 10,
        movementSpeedMaxPercent: 150,
        experienceGain: 400,
        maxManaRestorePercent: 12,
        chimeLifetimeMinutes: 10,
        bonusExperienceStartMinute: 5,
        bonusExperiencePerMinute: 20,
      },
      meeps: {
        spawnSeconds: 7,
        maxMeepsBase: 1,
        bonusMagicDamage: {
          baseValue: 35,
          abilityPowerRatio: 0.4,
          bonusPerThreeChimes: 12,
        },
        milestoneEffects: [
          {
            chimes: 3,
            effect: `SLOW`,
            slowPercent: 25,
            durationSeconds: 1,
          },
          {
            chimes: 9,
            effect: `AREA_DAMAGE_BEHIND_TARGET`,
          },
          {
            chimes: 27,
            effect: `LARGER_AREA_DAMAGE`,
          },
        ],
      },
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.SLOW,
      SkillEffect.EMPOWERED_ATTACK,
    ],
    tags: [
      `CHIME`,
      `MEEP`,
      `MAGIC_DAMAGE`,
      `EMPOWERED_ATTACK`,
      `SLOW`,
      `SCALING`,
      `ROAMING`,
    ],
  },
  // BARD - Q
  {
    championKey: `bard`,
    slot: SkillSlot.Q,
    name: `Cosmic Binding`,
    nameVi: `Mắt Xích Không Gian`,
    description: `Bard fires an energy bolt, dealing magic damage to the first enemy hit and slowing them. The bolt continues for a short distance. If it hits a second enemy or a wall, both enemies are stunned. If a second enemy is struck, the bolt also deals the same damage to them.`,
    descriptionVi: `Bard bắn ra một luồng năng lượng, gây sát thương phép lên kẻ địch đầu tiên trúng phải và làm chậm chúng. Luồng năng lượng tiếp tục bay thêm một đoạn ngắn. Nếu trúng kẻ địch thứ hai hoặc địa hình, cả hai mục tiêu bị làm choáng. Nếu trúng kẻ địch thứ hai, luồng năng lượng cũng gây cùng lượng sát thương lên mục tiêu đó.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE_EXTENDS_AFTER_FIRST_HIT`,
    },
    scaling: {
      damage: {
        values: [80, 130, 180, 230],
        abilityPowerRatio: 0.8,
        damageType: `MAGIC`,
      },
      slowPercent: 60,
      crowdControlDurationSeconds: [1.1, 1.3, 1.5, 1.7],
      stunIfSecondEnemyOrWallHit: true,
      secondEnemyTakesSameDamage: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.STUN],
    tags: [
      `SKILL_SHOT`,
      `MAGIC_DAMAGE`,
      `SLOW`,
      `STUN`,
      `PICK_POTENTIAL`,
      `CROWD_CONTROL`,
    ],
  },
  // BARD - W
  {
    championKey: `bard`,
    slot: SkillSlot.W,
    name: `Caretaker's Shrine`,
    nameVi: `Điện An Lạc`,
    description: `Bard creates a health shrine that grows to max efficiency after 5 seconds. The first allied champion to enter gains Movement Speed and is healed. A fully charged shrine restores more Health. Bard can store 2 charges and can have up to 3 shrines active at once. Enemy champions crush shrines by entering them.`,
    descriptionVi: `Bard tạo một điện hồi máu, tăng dần sức mạnh và đạt hiệu quả tối đa sau 5 giây. Tướng đồng minh đầu tiên bước vào sẽ nhận Tốc Độ Di Chuyển và được hồi máu. Điện đã sạc đầy hồi nhiều máu hơn. Bard có thể tích trữ 2 điểm dùng và đặt tối đa 3 điện cùng lúc. Tướng địch bước vào sẽ phá hủy điện.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ALLY,
    cooldown: {
      values: [15, 15, 15, 15],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: {
      type: `GROUND_SHRINE`,
      maxActiveShrines: 3,
    },
    scaling: {
      charges: 2,
      growToMaxEfficiencySeconds: 5,
      movementSpeedPercent: [22.5, 25, 27.5, 30],
      movementSpeedAbilityPowerRatioPercent: 0.05,
      movementSpeedDurationSeconds: 1.5,
      minimumHeal: {
        values: [50, 80, 110, 140],
        abilityPowerRatio: 0.3,
      },
      chargedHeal: {
        values: [100, 160, 220, 280],
        abilityPowerRatio: 0.6,
      },
      enemyChampionCrushesShrine: true,
    },
    effects: [SkillEffect.HEAL, SkillEffect.SPEED_UP],
    tags: [
      `SHRINE`,
      `HEALING`,
      `ALLY_HEAL`,
      `MOVEMENT_SPEED`,
      `TEAM_SUPPORT`,
      `LANE_SURVIVAL`,
    ],
  },
  // BARD - E
  {
    championKey: `bard`,
    slot: SkillSlot.E,
    name: `Magical Journey`,
    nameVi: `Hành Trình Kỳ Diệu`,
    description: `Bard opens a one-way corridor through nearby terrain for 10 seconds. Nearby allied and enemy champions can use the corridor. Allies travel faster than enemies.`,
    descriptionVi: `Bard mở một hành lang một chiều xuyên qua địa hình gần đó trong 10 giây. Tướng đồng minh và tướng địch ở gần đều có thể dùng hành lang. Đồng minh di chuyển qua hành lang nhanh hơn kẻ địch.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.AREA,
    cooldown: {
      values: [19, 17, 16, 14],
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `MANA`,
    },
    range: {
      type: `TERRAIN_PORTAL`,
      oneWay: true,
    },
    scaling: {
      corridorDurationSeconds: 10,
      alliedTravelSpeedBonusPercent: 50,
      enemiesCanUsePortal: true,
    },
    effects: [SkillEffect.DASH],
    tags: [
      `PORTAL`,
      `TERRAIN_TRAVEL`,
      `MOBILITY`,
      `ROAMING`,
      `PLAYMAKING`,
      `ESCAPE`,
    ],
  },
  // BARD - R
  {
    championKey: `bard`,
    slot: SkillSlot.R,
    name: `Tempered Fate`,
    nameVi: `Thiên Mệnh Khả Biến`,
    description: `Bard hurls magical protective energy to an area, placing all units and structures within into stasis. While in stasis, they are invulnerable, untargetable, and unable to act.`,
    descriptionVi: `Bard ném năng lượng bảo hộ ma thuật vào một khu vực, đưa toàn bộ đơn vị và công trình trong vùng vào trạng thái ngưng đọng. Khi ngưng đọng, mục tiêu bất tử, không thể bị chọn làm mục tiêu và không thể hành động.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.AREA,
    cooldown: {
      values: [75, 65, 55],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `GROUND_AREA_STASIS`,
    },
    scaling: {
      stasisDurationSeconds: 2.5,
      affectsUnits: true,
      affectsStructures: true,
      invulnerable: true,
      untargetable: true,
      unableToAct: true,
    },
    effects: [SkillEffect.STASIS],
    tags: [
      `STASIS`,
      `AOE_STASIS`,
      `ZONE_CONTROL`,
      `TEAMFIGHT`,
      `PLAYMAKING`,
      `HIGH_EXECUTION`,
    ],
  },
  // === BLITZCRANK ===
  // BLITZCRANK - PASSIVE
  {
    championKey: `blitzcrank`,
    slot: SkillSlot.PASSIVE,
    name: `Mana Barrier`,
    nameVi: `Lá Chắn Năng Lượng`,
    description: `Blitzcrank gains a shield that absorbs 90 (+30% Mana) damage for 10 seconds upon falling below 35% Health.`,
    descriptionVi: `Blitzcrank nhận một lá chắn hấp thụ 90 (+30% Năng Lượng) sát thương trong 10 giây khi còn dưới 35% Máu.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      shield: {
        baseValue: 90,
        manaRatio: 0.3,
        durationSeconds: 10,
        triggerHealthPercent: 35,
      },
    },
    effects: [SkillEffect.SHIELD],
    tags: [`SHIELD`, `LOW_HEALTH_TRIGGER`, `MANA_SCALING`, `SURVIVABILITY`],
  },
  // BLITZCRANK - Q
  {
    championKey: `blitzcrank`,
    slot: SkillSlot.Q,
    name: `Rocket Grab`,
    nameVi: `Bàn Tay Hỏa Tiễn`,
    description: `Blitzcrank fires his right hand to deal magic damage and pull the target back to him.`,
    descriptionVi: `Blitzcrank bắn bàn tay phải ra, gây sát thương phép và kéo mục tiêu về phía hắn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [18, 17, 16, 15],
      unit: `seconds`,
    },
    cost: {
      values: [80, 80, 80, 80],
      resource: `MANA`,
    },
    range: {
      type: `LINE_SKILLSHOT`,
    },
    scaling: {
      damage: {
        values: [110, 175, 240, 305],
        abilityPowerRatio: 1,
        damageType: `MAGIC`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.PULL],
    tags: [`HOOK`, `PULL`, `SKILL_SHOT`, `PICK_POTENTIAL`, `MAGIC_DAMAGE`],
  },
  // BLITZCRANK - W
  {
    championKey: `blitzcrank`,
    slot: SkillSlot.W,
    name: `Overdrive`,
    nameVi: `Tăng Tốc`,
    description: `Blitzcrank gains decaying Movement Speed. He may reactivate Overdrive to gain a stronger burst of decaying Movement Speed. When Overdrive ends, Blitzcrank is slowed briefly.`,
    descriptionVi: `Blitzcrank nhận Tốc Độ Di Chuyển giảm dần. Có thể tái kích hoạt Tăng Tốc để nhận lượng Tốc Độ Di Chuyển giảm dần mạnh hơn. Khi hiệu ứng kết thúc, Blitzcrank bị làm chậm trong thời gian ngắn.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [10, 10, 10, 10],
      unit: `seconds`,
    },
    cost: {
      values: [75, 75, 75, 75],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      firstCast: {
        movementSpeedPercent: [35, 40, 45, 50],
        decaysToPercent: 10,
        durationSeconds: 2.5,
      },
      recast: {
        movementSpeedPercent: [140, 150, 160, 170],
        durationSeconds: 1.5,
      },
      drawback: {
        slowPercent: 33,
        recastSlowPercent: 99,
        durationSeconds: 1,
      },
    },
    effects: [SkillEffect.SPEED_UP, SkillEffect.SLOW],
    tags: [
      `SPEED_UP`,
      `RECAST`,
      `SELF_BUFF`,
      `DECAYING_MOVEMENT_SPEED`,
      `SELF_SLOW`,
    ],
  },
  // BLITZCRANK - E
  {
    championKey: `blitzcrank`,
    slot: SkillSlot.E,
    name: `Power Fist`,
    nameVi: `Đấm Móc`,
    description: `Blitzcrank empowers his next attack to critically strike for physical damage and knock up the target.`,
    descriptionVi: `Blitzcrank cường hóa đòn đánh kế tiếp để chí mạng, gây sát thương vật lý và hất tung mục tiêu.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [8, 7, 6, 5],
      unit: `seconds`,
    },
    cost: {
      values: [25, 25, 25, 25],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damage: {
        baseValue: 105,
        attackDamageRatio: [1.8, 2, 2.2, 2.4],
        damageType: `PHYSICAL`,
      },
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.EMPOWERED_ATTACK,
      SkillEffect.KNOCK_UP,
    ],
    tags: [
      `EMPOWERED_ATTACK`,
      `AUTO_ATTACK_RESET`,
      `KNOCK_UP`,
      `CRITICAL_STRIKE`,
      `PHYSICAL_DAMAGE`,
    ],
  },
  // BLITZCRANK - R
  {
    championKey: `blitzcrank`,
    slot: SkillSlot.R,
    name: `Static Field`,
    nameVi: `Trường Điện Từ`,
    description: `Passive: While Static Field is off cooldown, attacks mark enemies to deal magic damage after 1 second. Active: Blitzcrank deals magic damage to nearby enemies and silences them for 0.5 seconds.`,
    descriptionVi: `Nội tại: Khi Trường Điện Từ không trong hồi chiêu, đòn đánh đánh dấu kẻ địch để gây sát thương phép sau 1 giây. Kích hoạt: Blitzcrank gây sát thương phép lên kẻ địch xung quanh và câm lặng chúng trong 0.5 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [55, 35, 15],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      passiveDamage: {
        values: [40, 80, 120],
        abilityPowerRatio: 0.15,
        delaySeconds: 1,
        damageType: `MAGIC`,
      },
      activeDamage: {
        values: [275, 400, 525],
        abilityPowerRatio: 0.8,
        damageType: `MAGIC`,
      },
      silenceDurationSeconds: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SILENCE],
    tags: [`MAGIC_DAMAGE`, `SILENCE`, `AREA_DAMAGE`, `MARK`, `PASSIVE_DAMAGE`],
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
