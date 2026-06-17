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
      unit: `seconds`,
    },
    cost: {
      values: [65, 70, 75, 80],
      resource: `MANA`,
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
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
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
      unit: `seconds`,
    },
    cost: {
      values: [85, 85, 85, 85],
      resource: `MANA`,
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
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
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
      unit: `seconds`,
    },
    cost: {
      values: [105, 90, 75, 60],
      resource: `ENERGY`,
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
      unit: `seconds`,
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
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `ENERGY`,
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
      unit: `seconds`,
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
  // === BRAND ===
  // BRAND - PASSIVE
  {
    championKey: `brand`,
    slot: SkillSlot.PASSIVE,
    name: `Blaze`,
    nameVi: `Bỏng Cháy`,
    description: `Brand's abilities set enemies Ablaze, dealing 3% of their maximum Health as magic damage over 4 seconds. Stacking Ablaze 3 times on champions and large monsters causes them to detonate after 2 seconds, dealing 10% (+0.02% AP) of each nearby enemy's maximum Health as magic damage. Enemies that detonate cannot stack Ablaze again within 4 seconds.`,
    descriptionVi: `Kỹ năng của Brand khiến kẻ địch Bỏng Cháy, gây sát thương phép tương đương 3% Máu tối đa của chúng trong 4 giây. Cộng dồn Bỏng Cháy 3 lần lên tướng và quái lớn sẽ khiến chúng phát nổ sau 2 giây, gây sát thương phép tương đương 10% (+0.02% SMPT) Máu tối đa của mỗi kẻ địch xung quanh. Kẻ địch đã phát nổ không thể cộng dồn Bỏng Cháy lại trong 4 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      ablazeDamageOverTime: {
        maxHealthMagicDamagePercent: 3,
        durationSeconds: 4,
        damageType: `MAGIC`,
      },
      detonation: {
        requiredStacks: 3,
        triggerTargets: [`CHAMPION`, `LARGE_MONSTER`],
        delaySeconds: 2,
        nearbyEnemyMaxHealthMagicDamagePercent: 10,
        nearbyEnemyMaxHealthMagicDamageAbilityPowerRatioPercent: 0.02,
        restackLockoutSeconds: 4,
        damageType: `MAGIC`,
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `BLAZE`,
      `BURN_DAMAGE`,
      `DAMAGE_OVER_TIME`,
      `PERCENT_HEALTH_DAMAGE`,
      `DETONATION`,
    ],
  },
  // BRAND - Q
  {
    championKey: `brand`,
    slot: SkillSlot.Q,
    name: `Sear`,
    nameVi: `Vệt Lửa`,
    description: `Brand launches a ball of fire forward that deals magic damage to the first enemy it hits. If the target is Ablaze, the target is stunned for 1.75 seconds.`,
    descriptionVi: `Brand phóng một quả cầu lửa về phía trước, gây sát thương phép lên kẻ địch đầu tiên trúng phải. Nếu mục tiêu đang Bỏng Cháy, mục tiêu bị làm choáng trong 1.75 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [7, 7, 6, 6],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [80, 120, 160, 200],
        abilityPowerRatio: 0.55,
        damageType: `MAGIC`,
      },
      stunIfTargetAblaze: true,
      stunDurationSeconds: 1.75,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.STUN],
    tags: [`SKILL_SHOT`, `MAGIC_DAMAGE`, `STUN`, `BLAZE_SYNERGY`],
  },
  // BRAND - W
  {
    championKey: `brand`,
    slot: SkillSlot.W,
    name: `Pillar of Flame`,
    nameVi: `Cột Lửa`,
    description: `After a short delay, Brand creates a pillar of flame at a target area, dealing magic damage to enemies within the area. Units that are Ablaze take 30% additional damage.`,
    descriptionVi: `Sau một thoáng trì hoãn, Brand tạo một cột lửa tại vùng chỉ định, gây sát thương phép lên kẻ địch trong vùng. Đơn vị đang Bỏng Cháy nhận thêm 30% sát thương.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [10, 9, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [65, 75, 85, 95],
      resource: `MANA`,
    },
    range: {
      type: `GROUND_AREA_DELAYED`,
    },
    scaling: {
      damage: {
        values: [70, 120, 170, 220],
        abilityPowerRatio: 0.55,
        damageType: `MAGIC`,
      },
      additionalDamageToAblazeTargetsPercent: 30,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
      `DELAYED_AREA`,
      `BLAZE_SYNERGY`,
      `WAVE_CLEAR`,
    ],
  },
  // BRAND - E
  {
    championKey: `brand`,
    slot: SkillSlot.E,
    name: `Conflagration`,
    nameVi: `Bùng Cháy`,
    description: `Brand sets the target enemy aflame, spreading to nearby enemies and dealing magic damage. When the target is Ablaze, Conflagration's spread radius is doubled.`,
    descriptionVi: `Brand thiêu đốt một kẻ địch chỉ định, lan sang các kẻ địch gần đó và gây sát thương phép. Nếu mục tiêu đang Bỏng Cháy, bán kính lan của Bùng Cháy được nhân đôi.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [11, 10, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [65, 70, 75, 80],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_SPREAD`,
    },
    scaling: {
      damage: {
        values: [60, 90, 120, 150],
        abilityPowerRatio: 0.45,
        damageType: `MAGIC`,
      },
      spreadsToNearbyEnemies: true,
      spreadRadiusMultiplierIfTargetAblaze: 2,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `MAGIC_DAMAGE`,
      `SPREAD_DAMAGE`,
      `AREA_DAMAGE`,
      `BLAZE_SYNERGY`,
      `WAVE_CLEAR`,
    ],
  },
  // BRAND - R
  {
    championKey: `brand`,
    slot: SkillSlot.R,
    name: `Pyroclasm`,
    nameVi: `Bão Lửa`,
    description: `Brand releases a torrent of flame that bounces up to 5 times between enemies or himself, with each bounce dealing magic damage. If the target is Ablaze, Pyroclasm briefly slows them. Bounces attempt to max stack Blaze on champions.`,
    descriptionVi: `Brand phóng ra một dòng lửa dữ dội nảy tối đa 5 lần giữa kẻ địch hoặc bản thân, mỗi lần nảy gây sát thương phép. Nếu mục tiêu đang Bỏng Cháy, Bão Lửa làm chậm chúng trong thoáng chốc. Các lần nảy cố gắng cộng dồn Bỏng Cháy tối đa lên tướng.`,
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
      type: `BOUNCING_PROJECTILE`,
      canBounceToSelf: true,
    },
    scaling: {
      damagePerBounce: {
        values: [100, 200, 300],
        abilityPowerRatio: 0.3,
        damageType: `MAGIC`,
      },
      maxBounces: 5,
      slowIfTargetAblazePercent: [30, 40, 50],
      brieflySlowsAblazeTargets: true,
      attemptsToMaxStackBlazeOnChampions: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`MAGIC_DAMAGE`, `BOUNCE`, `SLOW`, `BLAZE_SYNERGY`, `TEAMFIGHT`],
  },
  // === BRAUM ===
  // BRAUM - PASSIVE
  {
    championKey: `braum`,
    slot: SkillSlot.PASSIVE,
    name: `Concussive Blows`,
    nameVi: `Đánh Ngất Ngư`,
    description: `Braum's basic attacks apply Concussive Blows. Once the first stack is applied, ally basic attacks also stack Concussive Blows. Upon reaching 4 stacks, the target is stunned and takes magic damage. For the next 8 seconds, they cannot receive new stacks, but take bonus magic damage from Braum's attacks.`,
    descriptionVi: `Đòn đánh thường của Braum áp dụng Đánh Ngất Ngư. Sau khi cộng dồn đầu tiên được áp dụng, đòn đánh thường của đồng minh cũng cộng dồn Đánh Ngất Ngư. Khi đạt 4 cộng dồn, mục tiêu bị làm choáng và nhận sát thương phép. Trong 8 giây tiếp theo, mục tiêu không thể nhận cộng dồn mới, nhưng nhận thêm sát thương phép từ đòn đánh của Braum.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      requiredStacks: 4,
      allyBasicAttacksCanStackAfterFirstStack: true,
      stunDurationSecondsByLevel: {
        min: 1.25,
        max: 1.75,
      },
      stunDamage: {
        baseValue: 45,
        damageType: `MAGIC`,
      },
      restackLockoutSeconds: 8,
      bonusMagicDamageFromBraumAttacksDuringLockout: 9,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.STUN],
    tags: [`CONCUSSIVE_BLOWS`, `STUN`, `STACKING_PASSIVE`, `ALLY_FOLLOW_UP`],
  },
  // BRAUM - Q
  {
    championKey: `braum`,
    slot: SkillSlot.Q,
    name: `Winter's Bite`,
    nameVi: `Tuyết Tê Tái`,
    description: `Braum launches ice that deals magic damage and slows the first enemy hit by 70% for 2 seconds. Winter's Bite applies a stack of Concussive Blows.`,
    descriptionVi: `Braum phóng băng gây sát thương phép và làm chậm kẻ địch đầu tiên trúng phải 70% trong 2 giây. Tuyết Tê Tái áp dụng một cộng dồn Đánh Ngất Ngư.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [40, 45, 50, 55],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [60, 120, 180, 240],
        healthRatio: 0.03,
        damageType: `MAGIC`,
      },
      slowPercent: 70,
      slowDurationSeconds: 2,
      appliesConcussiveBlowsStack: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `SKILL_SHOT`,
      `MAGIC_DAMAGE`,
      `SLOW`,
      `CONCUSSIVE_BLOWS`,
      `PICK_POTENTIAL`,
    ],
  },
  // BRAUM - W
  {
    championKey: `braum`,
    slot: SkillSlot.W,
    name: `Stand Behind Me`,
    nameVi: `Nấp Sau Ta`,
    description: `Braum leaps to an ally. On arrival, Braum and the ally gain Armor and Magic Resist for 3 seconds.`,
    descriptionVi: `Braum nhảy đến một đồng minh. Khi tới nơi, Braum và đồng minh nhận thêm Giáp và Kháng Phép trong 3 giây.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ALLY,
    cooldown: {
      values: [11, 10, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [55, 60, 65, 70],
      resource: `MANA`,
    },
    range: {
      type: `ALLY_TARGETED_LEAP`,
    },
    scaling: {
      bonusArmor: {
        values: [10, 15, 20, 25],
        armorRatioByRank: [0.1, 0.12, 0.14, 0.16],
      },
      bonusMagicResist: {
        values: [10, 15, 20, 25],
        magicResistRatioByRank: [0.1, 0.12, 0.14, 0.16],
      },
      durationSeconds: 3,
      affectsBraumAndTargetAlly: true,
    },
    effects: [SkillEffect.DASH],
    tags: [
      `ALLY_DASH`,
      `BONUS_RESISTANCES`,
      `PEEL`,
      `TEAM_SUPPORT`,
      `PROTECTION`,
    ],
  },
  // BRAUM - E
  {
    championKey: `braum`,
    slot: SkillSlot.E,
    name: `Unbreakable`,
    nameVi: `Tối Kiên Cường`,
    description: `Braum raises his shield, intercepting projectiles for 4 seconds. Braum negates the first instance of damage from the direction he faces and takes reduced damage afterwards. Braum gains Movement Speed while his shield is raised.`,
    descriptionVi: `Braum giơ khiên, chặn các đường đạn trong 4 giây. Braum vô hiệu hóa lần sát thương đầu tiên từ hướng hắn đang đối mặt và nhận giảm sát thương sau đó. Braum nhận Tốc Độ Di Chuyển khi đang giơ khiên.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [16, 14, 12, 10],
      unit: `seconds`,
    },
    cost: {
      values: [35, 40, 45, 50],
      resource: `MANA`,
    },
    range: {
      type: `DIRECTIONAL_SHIELD`,
    },
    scaling: {
      durationSeconds: 4,
      interceptsProjectiles: true,
      negatesFirstDamageInstanceFromFacingDirection: true,
      damageReductionPercent: [35, 40, 45, 50],
      movementSpeedPercent: 15,
    },
    effects: [SkillEffect.SHIELD, SkillEffect.SPEED_UP],
    tags: [
      `PROJECTILE_BLOCK`,
      `DAMAGE_NEGATION`,
      `DAMAGE_REDUCTION`,
      `MOVEMENT_SPEED`,
      `PEEL`,
    ],
  },
  // BRAUM - R
  {
    championKey: `braum`,
    slot: SkillSlot.R,
    name: `Glacial Fissure`,
    nameVi: `Băng Địa Chấn`,
    description: `Braum slams the ground and opens a fissure, dealing magic damage and knocking up enemies. The fissure slows enemies and lasts for 4 seconds. After the first enemy champion hit, subsequent enemies are knocked up for a shorter duration.`,
    descriptionVi: `Braum đập mạnh xuống đất và tạo ra một khe nứt băng, gây sát thương phép và hất tung kẻ địch. Khe nứt làm chậm kẻ địch và tồn tại trong 4 giây. Sau tướng địch đầu tiên trúng chiêu, các kẻ địch tiếp theo bị hất tung trong thời gian ngắn hơn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [75, 70, 65],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LINE_FISSURE`,
    },
    scaling: {
      damage: {
        values: [150, 250, 350],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      firstChampionKnockUpDurationSeconds: 1,
      subsequentEnemyKnockUpDurationSeconds: 0.25,
      slowPercent: [40, 50, 60],
      fissureDurationSeconds: 4,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_UP, SkillEffect.SLOW],
    tags: [
      `MAGIC_DAMAGE`,
      `KNOCK_UP`,
      `SLOW`,
      `FISSURE`,
      `TEAMFIGHT`,
      `ENGAGE`,
    ],
  },
  // === CAITLYN ===
  // CAITLYN - PASSIVE
  {
    championKey: `caitlyn`,
    slot: SkillSlot.PASSIVE,
    name: `Headshot`,
    nameVi: `Thiện Xạ`,
    description: `Every 6 attacks, Caitlyn fires a Headshot, dealing bonus physical damage. Trapped or netted enemies trigger a Headshot with double range. Attacking from brush builds Headshot twice as fast.`,
    descriptionVi: `Mỗi 6 đòn đánh, Caitlyn bắn một phát Thiện Xạ, gây thêm sát thương vật lý. Kẻ địch mắc bẫy hoặc trúng lưới sẽ kích hoạt Thiện Xạ với tầm đánh gấp đôi. Tấn công từ bụi giúp tích Thiện Xạ nhanh gấp đôi.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: {
      doubleRangeAgainstTrappedOrNettedEnemies: true,
    },
    scaling: {
      requiredAttacks: 6,
      bonusPhysicalDamage: {
        baseValue: 27,
        attackDamageRatio: 0.5,
        criticalChanceScaling: 1.25,
        damageType: `PHYSICAL`,
      },
      trappedOrNettedEnemiesTriggerHeadshot: true,
      brushAttacksBuildStacksTwiceAsFast: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.EMPOWERED_ATTACK],
    tags: [
      `HEADSHOT`,
      `EMPOWERED_ATTACK`,
      `CRITICAL_SCALING`,
      `LONG_RANGE_POKE`,
      `TRAP_SYNERGY`,
    ],
  },
  // CAITLYN - Q
  {
    championKey: `caitlyn`,
    slot: SkillSlot.Q,
    name: `Piltover Peacemaker`,
    nameVi: `Bắn Xuyên Táo`,
    description: `Caitlyn fires a narrow piercing bullet that deals physical damage. Hitting an enemy expands the bullet but reduces subsequent damage. The bullet always deals full damage to trapped or netted enemies.`,
    descriptionVi: `Caitlyn bắn một viên đạn hẹp xuyên mục tiêu, gây sát thương vật lý. Khi trúng kẻ địch, viên đạn mở rộng nhưng sát thương lên các mục tiêu sau bị giảm. Viên đạn luôn gây đủ sát thương lên kẻ địch mắc bẫy hoặc trúng lưới.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `MANA`,
    },
    range: {
      type: `PIERCING_LINE_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [60, 110, 160, 210],
        attackDamageRatioByRank: [1.25, 1.4, 1.55, 1.7],
        damageType: `PHYSICAL`,
      },
      expandsAfterHittingEnemy: true,
      subsequentDamageReductionPercent: 40,
      fullDamageToTrappedOrNettedEnemies: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `SKILL_SHOT`,
      `PHYSICAL_DAMAGE`,
      `PIERCING_PROJECTILE`,
      `POKE`,
      `WAVE_CLEAR`,
      `TRAP_SYNERGY`,
    ],
  },
  // CAITLYN - W
  {
    championKey: `caitlyn`,
    slot: SkillSlot.W,
    name: `Yordle Snap Trap`,
    nameVi: `Bẫy Yordle`,
    description: `Caitlyn sets a trap that enemy champions can spring, immobilizing and revealing them for a short duration. Traps last for 30 seconds and Caitlyn can have multiple traps active at once.`,
    descriptionVi: `Caitlyn đặt một chiếc bẫy mà tướng địch có thể giẫm phải, khiến chúng bị bất động và bị lộ diện trong thời gian ngắn. Bẫy tồn tại trong 30 giây và Caitlyn có thể đặt nhiều bẫy cùng lúc.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.AREA,
    cooldown: {
      values: [1, 1, 1, 1],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `GROUND_TRAP`,
    },
    scaling: {
      rootDurationSeconds: 1.5,
      revealDurationSeconds: 1.5,
      trapDurationSeconds: 30,
      maxActiveTraps: [2, 3, 4, 5],
      chargeRechargeValues: [27, 22, 17, 12],
    },
    effects: [SkillEffect.ROOT, SkillEffect.VISION],
    tags: [`TRAP`, `ROOT`, `REVEAL`, `ZONE_CONTROL`, `HEADSHOT_SETUP`],
  },
  // CAITLYN - E
  {
    championKey: `caitlyn`,
    slot: SkillSlot.E,
    name: `90 Caliber Net`,
    nameVi: `Lưới 90`,
    description: `Caitlyn launches a net, knocking herself backward. The net deals magic damage and slows the enemy hit.`,
    descriptionVi: `Caitlyn phóng lưới, đẩy bản thân lùi về phía sau. Lưới gây sát thương phép và làm chậm kẻ địch trúng phải.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [16, 14, 12, 10],
      unit: `seconds`,
    },
    cost: {
      values: [75, 75, 75, 75],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE_AND_BACK_HOP`,
    },
    scaling: {
      damage: {
        values: [70, 120, 170, 220],
        abilityPowerRatio: 0.8,
        damageType: `MAGIC`,
      },
      slowPercent: 50,
      slowDurationSeconds: 1.5,
      knocksCaitlynBackward: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.DASH],
    tags: [
      `MAGIC_DAMAGE`,
      `SLOW`,
      `SELF_DISPLACEMENT`,
      `ESCAPE`,
      `HEADSHOT_SETUP`,
    ],
  },
  // CAITLYN - R
  {
    championKey: `caitlyn`,
    slot: SkillSlot.R,
    name: `Ace in the Hole`,
    nameVi: `Bách Phát Bách Trúng`,
    description: `Caitlyn lines up the perfect shot, revealing an enemy champion before dealing physical damage plus a portion of their missing Health. Enemy champions can intercept the bullet before it hits their ally.`,
    descriptionVi: `Caitlyn ngắm bắn một phát hoàn hảo, làm lộ diện một tướng địch trước khi gây sát thương vật lý cộng thêm một phần Máu đã mất của mục tiêu. Tướng địch có thể chặn viên đạn trước khi nó trúng đồng minh của họ.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [65, 55, 45],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LONG_RANGE_LOCK_ON_PROJECTILE`,
    },
    scaling: {
      revealDurationSeconds: 1.5,
      damage: {
        values: [200, 375, 550],
        bonusAttackDamageRatio: 2,
        damageType: `PHYSICAL`,
      },
      missingHealthDamagePercent: 20,
      enemyChampionsCanIntercept: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.VISION],
    tags: [
      `LOCK_ON`,
      `REVEAL`,
      `MISSING_HEALTH_DAMAGE`,
      `LONG_RANGE_EXECUTE`,
      `PHYSICAL_DAMAGE`,
    ],
  },
  // === CAMILLE ===
  // CAMILLE - PASSIVE
  {
    championKey: `camille`,
    slot: SkillSlot.PASSIVE,
    name: `Adaptive Defenses`,
    nameVi: `Thích Ứng Phòng Ngự`,
    description: `Attacking an enemy champion grants Camille a physical or magic damage shield for 2 seconds. The shield type is based on the type of damage the attacked target deals.`,
    descriptionVi: `Tấn công tướng địch cho Camille một lá chắn chặn sát thương vật lý hoặc sát thương phép trong 2 giây. Loại lá chắn dựa trên loại sát thương mà mục tiêu bị tấn công gây ra.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      shield: {
        baseValue: 130,
        healthRatio: 0.2,
        durationSeconds: 2,
        adaptsToTargetDamageType: true,
        shieldTypes: [`PHYSICAL`, `MAGIC`],
      },
    },
    effects: [SkillEffect.SHIELD],
    tags: [`ADAPTIVE_SHIELD`, `SHIELD`, `SURVIVABILITY`, `TRADING_TOOL`],
  },
  // CAMILLE - Q
  {
    championKey: `camille`,
    slot: SkillSlot.Q,
    name: `Precision Protocol`,
    nameVi: `Giao Thức Chuẩn Xác`,
    description: `Camille empowers her next attack to deal increased physical damage and grants herself Movement Speed for 1.5 seconds.`,
    descriptionVi: `Camille cường hóa đòn đánh tiếp theo để gây sát thương vật lý tăng thêm và nhận Tốc Độ Di Chuyển trong 1.5 giây.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [25, 25, 25, 25],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      empoweredAttackDamagePercent: [130, 140, 150, 160],
      movementSpeedPercent: 25,
      movementSpeedDurationSeconds: 1.5,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.EMPOWERED_ATTACK,
      SkillEffect.SPEED_UP,
    ],
    tags: [
      `EMPOWERED_ATTACK`,
      `PHYSICAL_DAMAGE`,
      `MOVEMENT_SPEED`,
      `TRADING_TOOL`,
    ],
  },
  // CAMILLE - W
  {
    championKey: `camille`,
    slot: SkillSlot.W,
    name: `Tactical Sweep`,
    nameVi: `Đá Quét Chiến Thuật`,
    description: `Camille slices in a direction, dealing physical damage plus a portion of the target's maximum Health. Enemies hit by the outer half are slowed, and Camille heals for a portion of the damage dealt to champions. Deals reduced damage to monsters.`,
    descriptionVi: `Camille quét chân theo một hướng, gây sát thương vật lý cộng thêm một phần Máu tối đa của mục tiêu. Kẻ địch trúng nửa ngoài bị làm chậm, và Camille hồi máu theo một phần sát thương gây ra lên tướng. Gây giảm sát thương lên quái.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [15, 13, 11, 9],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `CONE_SWEEP`,
    },
    scaling: {
      damage: {
        values: [100, 130, 160, 190],
        attackDamageRatio: 1.1,
        damageType: `PHYSICAL`,
      },
      maxHealthPhysicalDamagePercent: [3, 5, 7, 9],
      outerHalf: {
        slowPercent: 80,
        slowDecayDurationSeconds: 2,
        championDamageHealingRatio: 0.8,
      },
      monsterDamageRatio: 0.95,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.HEAL],
    tags: [
      `PHYSICAL_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `SLOW`,
      `HEALING`,
      `CONE_DAMAGE`,
    ],
  },
  // CAMILLE - E
  {
    championKey: `camille`,
    slot: SkillSlot.E,
    name: `Hookshot`,
    nameVi: `Bắn Dây Móc`,
    description: `First Cast: Camille fires a hookshot that attaches to terrain, pulling her to it. If Camille misses, Hookshot is placed on a short cooldown. Second Cast: Camille dashes from the wall, dealing physical damage on landing. Regardless of landing, Camille's next basic attack against enemy champions within 3 seconds grants Attack Speed. If the dash hits an enemy champion, they are stunned and Hookshot's cooldown is reduced.`,
    descriptionVi: `Lần dùng đầu: Camille bắn dây móc bám vào địa hình, kéo cô đến đó. Nếu bắn trượt, Bắn Dây Móc bị đặt vào hồi chiêu ngắn. Lần dùng hai: Camille lao khỏi tường, gây sát thương vật lý khi đáp xuống. Dù có trúng hay không, đòn đánh thường kế tiếp của Camille lên tướng địch trong 3 giây sẽ cho Tốc Độ Đánh. Nếu cú lao trúng tướng địch, mục tiêu bị làm choáng và hồi chiêu của Bắn Dây Móc được giảm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [22, 20, 18, 16],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: {
      type: `TERRAIN_HOOK_AND_WALL_DASH`,
    },
    scaling: {
      missCooldownSeconds: 3,
      secondCastDamage: {
        values: [60, 110, 160, 210],
        attackDamageRatio: 0.75,
        damageType: `PHYSICAL`,
      },
      attackSpeedWindowSeconds: 3,
      bonusAttackSpeedPercent: [50, 60, 70, 80],
      bonusAttackSpeedDurationSeconds: 5,
      stunDurationSeconds: 0.75,
      cooldownReductionOnChampionHitSeconds: 5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH, SkillEffect.STUN],
    tags: [
      `HOOKSHOT`,
      `TERRAIN_HOOK`,
      `DASH`,
      `STUN`,
      `ATTACK_SPEED_STEROID`,
      `PICK_POTENTIAL`,
    ],
  },
  // CAMILLE - R
  {
    championKey: `camille`,
    slot: SkillSlot.R,
    name: `Hextech Ultimatum`,
    nameVi: `Tối Hậu Thư Hextech`,
    description: `Camille leaps to an enemy champion, dealing magic damage plus a portion of their current Health, knocking away other enemies and creating an inescapable zone. Hextech Ultimatum ends when Camille leaves the zone.`,
    descriptionVi: `Camille lao đến một tướng địch, gây sát thương phép cộng thêm một phần Máu hiện tại của mục tiêu, đẩy lùi các kẻ địch khác và tạo một vùng không thể thoát ra. Tối Hậu Thư Hextech kết thúc khi Camille rời khỏi vùng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [90, 80, 70],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_LEAP_LOCKDOWN_ZONE`,
    },
    scaling: {
      damage: {
        baseValue: 30,
        currentHealthMagicDamagePercent: [15, 20, 25],
        damageType: `MAGIC`,
      },
      knocksAwayOtherEnemies: true,
      inescapableZoneDurationSeconds: 2,
      endsWhenCamilleLeavesZone: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH, SkillEffect.KNOCK_BACK],
    tags: [
      `LOCKDOWN_ZONE`,
      `CURRENT_HEALTH_DAMAGE`,
      `KNOCK_BACK`,
      `DIVE`,
      `PICK_POTENTIAL`,
    ],
  },
  // === CORKI ===
  // CORKI - PASSIVE
  {
    championKey: `corki`,
    slot: SkillSlot.PASSIVE,
    name: `Hextech Munitions`,
    nameVi: `Đạn Dược Hextech`,
    description: `Hextech Shrapnel: Corki's attacks and Spellblade deal bonus true damage. The Package: After hitting enemy champions 6 times with Missile Barrage, The Package is delivered to Corki. He can pick it up to gain 4 Big Ones. The Package despawns after 15 seconds.`,
    descriptionVi: `Mảnh Đạn Hextech: Đòn đánh và Kiếm Phép của Corki gây thêm sát thương chuẩn. Gói Hàng: Sau khi dùng Tên Lửa Định Hướng trúng tướng địch 6 lần, Gói Hàng được chuyển đến cho Corki. Hắn có thể nhặt để nhận 4 Quả Đại Bác. Gói Hàng biến mất sau 15 giây.`,
    damageType: DamageType.TRUE_DAMAGE,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      hextechShrapnel: {
        bonusTrueDamagePercent: 16,
        appliesToAttacks: true,
        appliesToSpellblade: true,
      },
      package: {
        missileBarrageChampionHitsRequired: 6,
        grantsBigOnes: 4,
        despawnSeconds: 15,
      },
    },
    effects: [SkillEffect.TRUE_DAMAGE],
    tags: [`TRUE_DAMAGE`, `SPELLBLADE`, `PACKAGE`, `BIG_ONE`, `POKE`],
  },
  // CORKI - Q
  {
    championKey: `corki`,
    slot: SkillSlot.Q,
    name: `Phosphorus Bomb`,
    nameVi: `Bom Phốt Pho`,
    description: `Corki fires a bomb, dealing magic damage and granting vision over the area.`,
    descriptionVi: `Corki bắn ra một quả bom, gây sát thương phép và cho tầm nhìn trong khu vực.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [60, 65, 70, 75],
      resource: `MANA`,
    },
    range: {
      type: `GROUND_AREA_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [65, 125, 185, 245],
        bonusAttackDamageRatio: 1.25,
        abilityPowerRatio: 0.8,
        damageType: `MAGIC`,
      },
      grantsAreaVision: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.VISION],
    tags: [`MAGIC_DAMAGE`, `AREA_DAMAGE`, `REVEAL`, `POKE`, `WAVE_CLEAR`],
  },
  // CORKI - W
  {
    championKey: `corki`,
    slot: SkillSlot.W,
    name: `Valkyrie`,
    nameVi: `Thảm Lửa`,
    description: `Corki flies a short distance, leaving a burning trail for 2.5 seconds. The trail burns enemies in it for magic damage per second, up to a maximum total damage.`,
    descriptionVi: `Corki bay một đoạn ngắn, để lại vệt lửa trong 2.5 giây. Vệt lửa thiêu đốt kẻ địch đứng trong đó, gây sát thương phép mỗi giây, tối đa đến một lượng sát thương nhất định.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [18, 16, 14, 12],
      unit: `seconds`,
    },
    cost: {
      values: [80, 85, 90, 95],
      resource: `MANA`,
    },
    range: {
      type: `DASH_WITH_BURNING_TRAIL`,
    },
    scaling: {
      trailDurationSeconds: 2.5,
      damagePerSecond: {
        baseValue: 60,
        bonusAttackDamageRatio: 0.6,
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      maxTotalDamage: {
        values: [150, 250, 350, 450],
        damageType: `MAGIC`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [`DASH`, `BURN_DAMAGE`, `AREA_DAMAGE`, `MAGIC_DAMAGE`, `ESCAPE`],
  },
  // CORKI - E
  {
    championKey: `corki`,
    slot: SkillSlot.E,
    name: `Gatling Gun`,
    nameVi: `Súng Máy`,
    description: `Corki fires a gatling gun, dealing physical damage per second over 4 seconds. The gatling gun shreds Armor and Magic Resist for 2 seconds.`,
    descriptionVi: `Corki bắn súng máy, gây sát thương vật lý mỗi giây trong 4 giây. Súng Máy làm giảm Giáp và Kháng Phép của kẻ địch trong 2 giây.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [12, 12, 12, 12],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `MANA`,
    },
    range: {
      type: `FRONTAL_CONE_CHANNEL`,
    },
    scaling: {
      damagePerSecond: {
        values: [20, 35, 50, 65],
        bonusAttackDamageRatio: 0.55,
        damageType: `PHYSICAL`,
      },
      totalDamageOverDuration: {
        values: [100, 160, 220, 280],
        durationSeconds: 4,
        damageType: `PHYSICAL`,
      },
      armorAndMagicResistShred: {
        values: [10, 14, 18, 22],
        durationSeconds: 2,
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `PHYSICAL_DAMAGE`,
      `ARMOR_SHRED`,
      `MAGIC_RESIST_REDUCTION`,
      `DAMAGE_OVER_TIME`,
      `CONE_DAMAGE`,
    ],
  },
  // CORKI - R
  {
    championKey: `corki`,
    slot: SkillSlot.R,
    name: `Missile Barrage`,
    nameVi: `Tên Lửa Định Hướng`,
    description: `Corki fires a missile that explodes on the first target hit, dealing physical damage to nearby enemies. Every third missile is a Big One that deals increased physical damage and has a bigger area of effect. Corki gains a charge over time, storing up to 4 charges. Attacks against champions reduce the time between charges on hit based on Critical Rate.`,
    descriptionVi: `Corki bắn một tên lửa phát nổ khi trúng mục tiêu đầu tiên, gây sát thương vật lý lên kẻ địch xung quanh. Mỗi tên lửa thứ ba là Quả Đại Bác, gây sát thương vật lý cao hơn và có vùng nổ lớn hơn. Corki tích trữ điểm dùng theo thời gian, tối đa 4 điểm. Đòn đánh lên tướng địch giảm thời gian hồi điểm dùng theo Tỉ Lệ Chí Mạng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [2, 2, 2, 2],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE_EXPLOSION`,
    },
    scaling: {
      missileDamage: {
        values: [70, 140, 210],
        bonusAttackDamageRatio: 0.7,
        damageType: `PHYSICAL`,
      },
      bigOne: {
        everyNthMissile: 3,
        damage: {
          values: [140, 210, 280],
          bonusAttackDamageRatio: 1.4,
          damageType: `PHYSICAL`,
        },
        increasedAreaOfEffect: true,
        increasedBlastRadius: true,
      },
      chargeRechargeSeconds: 16,
      maxCharges: 4,
      championAttackChargeCooldownReduction: {
        baseSeconds: 2,
        criticalRateRatio: 3,
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `SKILL_SHOT`,
      `PHYSICAL_DAMAGE`,
      `MISSILE`,
      `BIG_ONE`,
      `CHARGE_SYSTEM`,
      `POKE`,
    ],
  },
  // === DARIUS ===
  // DARIUS - PASSIVE
  {
    championKey: `darius`,
    slot: SkillSlot.PASSIVE,
    name: `Hemorrhage`,
    nameVi: `Xuất Huyết`,
    description: `Darius's attacks cause enemies to bleed, dealing physical damage over 5 seconds and stacking up to 5 times. Upon reaching full stacks, Darius gains Noxian Might for 5 seconds, gaining Attack Damage and applying full stacks of Hemorrhage instead of 1. Hemorrhage deals increased damage to monsters.`,
    descriptionVi: `Đòn đánh của Darius khiến kẻ địch chảy máu, gây sát thương vật lý trong 5 giây và cộng dồn tối đa 5 lần. Khi đạt đủ cộng dồn, Darius nhận Sức Mạnh Noxus trong 5 giây, nhận thêm Sức Mạnh Công Kích và áp dụng đủ cộng dồn Xuất Huyết thay vì 1. Xuất Huyết gây thêm sát thương lên quái.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      bleedDamage: {
        baseValue: 16,
        perLevelMultiplier: 2,
        bonusAttackDamageRatio: 0.4,
        durationSeconds: 5,
        damageType: `PHYSICAL`,
      },
      maxStacks: 5,
      noxianMight: {
        durationSeconds: 5,
        bonusAttackDamage: 32,
        appliesFullHemorrhageStacksInsteadOfOne: true,
      },
      monsterDamageRatio: 1.8,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `HEMORRHAGE`,
      `BLEED`,
      `DAMAGE_OVER_TIME`,
      `STACKING_PASSIVE`,
      `NOXIAN_MIGHT`,
    ],
  },
  // DARIUS - Q
  {
    championKey: `darius`,
    slot: SkillSlot.Q,
    name: `Decimate`,
    nameVi: `Tàn Sát`,
    description: `Darius swings his axe after a delay, dealing physical damage. Hitting enemies with the blade deals increased physical damage, heals Darius for a portion of his missing Health for each champion or large monster hit, and applies Hemorrhage.`,
    descriptionVi: `Darius vung rìu sau một thoáng trì hoãn, gây sát thương vật lý. Kẻ địch trúng lưỡi rìu nhận sát thương vật lý cao hơn, hồi cho Darius một phần Máu đã mất với mỗi tướng hoặc quái lớn trúng chiêu, đồng thời áp dụng Xuất Huyết.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [9, 8, 6, 5],
      unit: `seconds`,
    },
    cost: {
      values: [35, 35, 35, 35],
      resource: `MANA`,
    },
    range: {
      type: `CIRCULAR_AXE_SWING`,
    },
    scaling: {
      handleDamage: {
        values: [18, 32, 46, 60],
        attackDamageRatioByRank: [0.35, 0.4, 0.45, 0.5],
        damageType: `PHYSICAL`,
      },
      bladeDamage: {
        values: [50, 90, 130, 170],
        attackDamageRatioByRank: [1, 1.15, 1.3, 1.45],
        damageType: `PHYSICAL`,
      },
      delayBeforeSwing: true,
      missingHealthHealPercentPerChampionOrLargeMonsterHit: 15,
      maxMissingHealthHealPercent: 45,
      bladeAppliesHemorrhage: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL],
    tags: [
      `PHYSICAL_DAMAGE`,
      `AREA_DAMAGE`,
      `HEALING`,
      `HEMORRHAGE`,
      `OUTER_EDGE_BONUS`,
    ],
  },
  // DARIUS - W
  {
    championKey: `darius`,
    slot: SkillSlot.W,
    name: `Crippling Strike`,
    nameVi: `Đánh Thọt`,
    description: `Darius empowers his next attack for 8 seconds to deal additional physical damage and heavily slow the target.`,
    descriptionVi: `Darius cường hóa đòn đánh tiếp theo trong 8 giây để gây thêm sát thương vật lý và làm chậm mạnh mục tiêu.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [6, 6, 6, 6],
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      empoweredAttackWindowSeconds: 8,
      additionalAttackDamagePercent: [30, 40, 50, 60],
      slowPercent: 90,
      slowDurationSeconds: 1,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.SLOW,
      SkillEffect.EMPOWERED_ATTACK,
    ],
    tags: [`EMPOWERED_ATTACK`, `PHYSICAL_DAMAGE`, `SLOW`, `MELEE_TRADING`],
  },
  // DARIUS - E
  {
    championKey: `darius`,
    slot: SkillSlot.E,
    name: `Apprehend`,
    nameVi: `Bắt Giữ`,
    description: `Passive: Darius gains Armor Penetration. Active: Darius pulls enemies in front of him and slows them.`,
    descriptionVi: `Nội tại: Darius nhận Xuyên Giáp. Kích hoạt: Darius kéo kẻ địch phía trước lại gần và làm chậm chúng.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [18, 16, 14, 12],
      unit: `seconds`,
    },
    cost: {
      values: [45, 45, 45, 45],
      resource: `MANA`,
    },
    range: {
      type: `FRONTAL_PULL`,
    },
    scaling: {
      passiveArmorPenetrationPercent: [15, 22, 29, 36],
      slowPercent: 40,
      slowDurationSeconds: 1.5,
    },
    effects: [SkillEffect.PULL, SkillEffect.SLOW],
    tags: [`PULL`, `SLOW`, `ARMOR_PENETRATION`, `ENGAGE`, `PICK_POTENTIAL`],
  },
  // DARIUS - R
  {
    championKey: `darius`,
    slot: SkillSlot.R,
    name: `Noxian Guillotine`,
    nameVi: `Máy Chém Noxus`,
    description: `Darius leaps to execute a champion, dealing true damage increased by each Hemorrhage stack and applying Hemorrhage. Killing the target with Noxian Guillotine refreshes its cooldown, refunds its mana cost, grants Noxian Might, and causes nearby minions and monsters to flee. If the target dies, moves out of range, becomes untargetable, or activates stasis or revive effects during the cast, the mana cost is refunded and the ability goes on a short cooldown.`,
    descriptionVi: `Darius lao tới hành quyết một tướng, gây sát thương chuẩn tăng theo mỗi cộng dồn Xuất Huyết và áp dụng Xuất Huyết. Kết liễu mục tiêu bằng Máy Chém Noxus sẽ làm mới hồi chiêu, hoàn trả năng lượng, cho Sức Mạnh Noxus và khiến lính cùng quái xung quanh hoảng sợ. Nếu mục tiêu chết, ra khỏi tầm, trở nên không thể bị chọn làm mục tiêu, hoặc kích hoạt hiệu ứng ngưng đọng/hồi sinh trong lúc thi triển, năng lượng được hoàn trả và kỹ năng vào hồi chiêu ngắn.`,
    damageType: DamageType.TRUE_DAMAGE,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [70, 65, 60],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `TARGETED_EXECUTE_LEAP`,
    },
    scaling: {
      damage: {
        values: [125, 250, 375],
        attackDamageRatio: 0.75,
        damageType: `TRUE`,
      },
      damageIncreasePercentPerHemorrhageStack: 20,
      appliesHemorrhage: true,
      resetOnKill: true,
      refundsManaCostOnKill: true,
      grantsNoxianMightOnKill: true,
      fearNearbyMinionsAndMonstersOnKillSeconds: 1.5,
      failedCastRefundsManaCost: true,
      failedCastCooldownSeconds: 5,
      failedCastCases: [
        `TARGET_DIES`,
        `TARGET_MOVES_OUT_OF_RANGE`,
        `TARGET_BECOMES_UNTARGETABLE`,
        `TARGET_ACTIVATES_STASIS`,
        `TARGET_ACTIVATES_REVIVE`,
      ],
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.TRUE_DAMAGE, SkillEffect.EXECUTE],
    tags: [
      `TRUE_DAMAGE`,
      `EXECUTE`,
      `HEMORRHAGE`,
      `NOXIAN_MIGHT`,
      `COOLDOWN_RESET`,
      `FEAR`,
    ],
  },
  // === DIANA ===
  // DIANA - PASSIVE
  {
    championKey: `diana`,
    slot: SkillSlot.PASSIVE,
    name: `Moonsilver Blade`,
    nameVi: `Gươm Ánh Trăng`,
    description: `Casting an ability grants Diana bonus basic attack speed for 4 seconds. Every third attack deals magic damage in an area. This damage is reduced against structures and fully applies to monsters.`,
    descriptionVi: `Dùng kỹ năng cho Diana thêm Tốc Độ Đánh trong 4 giây. Mỗi đòn đánh thứ ba gây sát thương phép trong một vùng. Sát thương này bị giảm lên công trình và gây đủ sát thương lên quái.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: null,
    cost: null,
    range: {
      type: `AREA_AROUND_TARGET`,
    },
    scaling: {
      bonusAttackSpeedDurationSeconds: 4,
      everyThirdAttack: {
        damage: {
          baseValue: 35,
          abilityPowerRatio: 0.5,
          damageType: `MAGIC`,
        },
        areaDamage: true,
      },
      structureDamageRatio: 0.5,
      monsterDamageRatio: 1,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `MAGIC_DAMAGE`,
      `AREA_DAMAGE`,
      `ATTACK_SPEED_STEROID`,
      `ON_HIT_CHAMPION`,
      `EMPOWERED_ATTACK`,
    ],
  },
  // DIANA - Q
  {
    championKey: `diana`,
    slot: SkillSlot.Q,
    name: `Crescent Strike`,
    nameVi: `Trăng Lưỡi Liềm`,
    description: `Diana unleashes an arcing bolt of energy that deals magic damage and applies Moonlight for 3 seconds.`,
    descriptionVi: `Diana phóng ra một luồng năng lượng hình vòng cung, gây sát thương phép và áp dụng Ánh Trăng trong 3 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [8, 7, 6, 5],
      unit: `seconds`,
    },
    cost: {
      values: [50, 55, 60, 65],
      resource: `MANA`,
    },
    range: {
      type: `ARC_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [60, 105, 150, 195],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      appliesMoonlight: true,
      moonlightDurationSeconds: 3,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [`SKILL_SHOT`, `MAGIC_DAMAGE`, `MOONLIGHT`, `POKE`, `DASH_SETUP`],
  },
  // DIANA - W
  {
    championKey: `diana`,
    slot: SkillSlot.W,
    name: `Pale Cascade`,
    nameVi: `Thác Bạc`,
    description: `Diana creates 3 spheres that orbit her for 5 seconds. Upon contact with enemies, the spheres detonate and deal magic damage. Diana also gains a shield. If the third sphere detonates, the shield is increased by the same amount.`,
    descriptionVi: `Diana tạo ra 3 quả cầu xoay quanh bản thân trong 5 giây. Khi chạm kẻ địch, các quả cầu phát nổ và gây sát thương phép. Diana cũng nhận một lá chắn. Nếu quả cầu thứ ba phát nổ, lá chắn được tăng thêm một lượng tương tự.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [13, 12, 10, 9],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: {
      type: `ORBITING_SPHERES`,
    },
    scaling: {
      sphereCount: 3,
      sphereDurationSeconds: 5,
      sphereDamage: {
        values: [20, 35, 50, 65],
        abilityPowerRatio: 0.2,
        damageType: `MAGIC`,
      },
      shield: {
        values: [50, 70, 90, 110],
        abilityPowerRatio: 0.4,
      },
      thirdSphereDetonationIncreasesShield: true,
      bonusShield: {
        values: [50, 70, 90, 110],
        abilityPowerRatio: 0.4,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SHIELD],
    tags: [`MAGIC_DAMAGE`, `SHIELD`, `ORBITING_SPHERES`, `DIVE`, `AREA_DAMAGE`],
  },
  // DIANA - E
  {
    championKey: `diana`,
    slot: SkillSlot.E,
    name: `Lunar Rush`,
    nameVi: `Trăng Non`,
    description: `Diana dashes to a point near an enemy, dealing magic damage and removing Moonlight in an area. Lunar Rush's cooldown is reduced to 0.5 seconds if it removes Moonlight from an enemy.`,
    descriptionVi: `Diana lướt đến một điểm gần kẻ địch, gây sát thương phép và xóa Ánh Trăng trong một vùng. Hồi chiêu của Trăng Non giảm xuống còn 0.5 giây nếu kỹ năng xóa Ánh Trăng khỏi kẻ địch.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [18, 16, 14, 12],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_DASH`,
    },
    scaling: {
      damage: {
        values: [40, 80, 120, 160],
        abilityPowerRatio: 0.3,
        damageType: `MAGIC`,
      },
      removesMoonlightInArea: true,
      cooldownIfMoonlightRemovedSeconds: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [`MAGIC_DAMAGE`, `DASH`, `MOONLIGHT`, `COOLDOWN_REFUND`, `DIVE`],
  },
  // DIANA - R
  {
    championKey: `diana`,
    slot: SkillSlot.R,
    name: `Moonfall`,
    nameVi: `Trăng Mờ`,
    description: `Diana summons the moon for up to 1 second, triggering Moonfall Glow when the charge is complete. Diana can move and cast abilities and spells while charging. Recasting stops the charge and triggers Moonfall Glow. Moonfall Glow deals magic damage based on charge time and slows targets.`,
    descriptionVi: `Diana triệu hồi mặt trăng trong tối đa 1 giây, kích hoạt Ánh Trăng Rơi khi tích tụ hoàn tất. Diana có thể di chuyển, dùng kỹ năng và phép bổ trợ trong lúc tích tụ. Tái kích hoạt để dừng tích tụ và kích hoạt Ánh Trăng Rơi. Ánh Trăng Rơi gây sát thương phép dựa trên thời gian tích tụ và làm chậm mục tiêu.`,
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
      type: `AREA_AROUND_SELF_CHARGE`,
    },
    scaling: {
      maxChargeDurationSeconds: 1,
      canMoveWhileCharging: true,
      canCastAbilitiesAndSpellsWhileCharging: true,
      recastStopsCharging: true,
      moonfallGlowDamage: {
        minValues: [100, 160, 220],
        minAbilityPowerRatio: 0.4,
        maxValues: [200, 320, 440],
        maxAbilityPowerRatio: 0.8,
        scalesWithChargeTime: true,
        damageType: `MAGIC`,
      },
      slowPercent: 20,
      slowDurationSeconds: 2,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `MAGIC_DAMAGE`,
      `AREA_DAMAGE`,
      `CHARGE`,
      `MOONFALL_GLOW`,
      `SLOW`,
      `TEAMFIGHT`,
    ],
  },
  // === DR. MUNDO ===
  // DR. MUNDO - PASSIVE
  {
    championKey: `dr-mundo`,
    slot: SkillSlot.PASSIVE,
    name: `Goes Where He Pleases`,
    nameVi: `Muốn Đi Đâu Thì Đi`,
    description: `Dr. Mundo resists the first immobilizing effect, losing current Health instead and dropping a Chemical Canister nearby. Retrieving the Canister reduces this passive's cooldown and heals Dr. Mundo for a portion of his maximum Health. Dr. Mundo regenerates a portion of his maximum Health every 5 seconds. Enemy champions destroy the Canister if they reach it first.`,
    descriptionVi: `Dr. Mundo kháng hiệu ứng bất động đầu tiên, thay vào đó mất một phần Máu hiện tại và làm rơi một Bình Hóa Chất gần đó. Nhặt lại Bình Hóa Chất sẽ giảm hồi chiêu nội tại và hồi cho Dr. Mundo một phần Máu tối đa. Dr. Mundo hồi một phần Máu tối đa mỗi 5 giây. Tướng địch sẽ phá hủy Bình Hóa Chất nếu chạm tới trước.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      immobilizeResist: {
        currentHealthCostPercent: 3,
        dropsChemicalCanister: true,
        cooldownSeconds: 40,
      },
      chemicalCanister: {
        cooldownReductionOnPickupSeconds: 10,
        maxHealthHealPercent: 4,
        destroyedByEnemyChampionIfReachedFirst: true,
      },
      regeneration: {
        maxHealthRegenPercentPer5Seconds: 1,
      },
    },
    effects: [SkillEffect.HEAL],
    tags: [
      `CC_RESIST`,
      `CHEMICAL_CANISTER`,
      `HEALING`,
      `HEALTH_REGEN`,
      `ANTI_CC`,
    ],
  },
  // DR. MUNDO - Q
  {
    championKey: `dr-mundo`,
    slot: SkillSlot.Q,
    name: `Infected Bonesaw`,
    nameVi: `Cưa Nhiễm Khuẩn`,
    description: `Dr. Mundo throws his bonesaw, dealing magic damage based on the target's current Health and slowing them. Hitting an enemy heals Dr. Mundo, with increased healing when hitting a champion or monster. Damage against monsters is capped.`,
    descriptionVi: `Dr. Mundo ném cưa xương, gây sát thương phép dựa trên Máu hiện tại của mục tiêu và làm chậm chúng. Trúng kẻ địch sẽ hồi máu cho Dr. Mundo, hồi nhiều hơn khi trúng tướng hoặc quái. Sát thương lên quái bị giới hạn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [4, 4, 4, 4],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `HEALTH`,
    },
    range: {
      type: `LINE_PROJECTILE`,
    },
    scaling: {
      damage: {
        currentHealthMagicDamagePercent: [20, 23, 26, 29],
        minimumValues: [90, 160, 230, 300],
        damageType: `MAGIC`,
      },
      slowPercent: 40,
      slowDurationSeconds: 2,
      healOnEnemyHit: 25,
      healOnChampionOrMonsterHit: 50,
      monsterDamageCap: [250, 350, 450, 550],
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.HEAL],
    tags: [
      `SKILL_SHOT`,
      `MAGIC_DAMAGE`,
      `CURRENT_HEALTH_DAMAGE`,
      `SLOW`,
      `HEALTH_COST`,
    ],
  },
  // DR. MUNDO - W
  {
    championKey: `dr-mundo`,
    slot: SkillSlot.W,
    name: `Heart Zapper`,
    nameVi: `Máy Khử Rung Tim`,
    description: `Dr. Mundo charges a defibrillator, dealing magic damage per second to nearby enemies. Recast: detonates the defibrillator, dealing magic damage to nearby enemies. If the detonation damages an enemy, Dr. Mundo heals for a portion of the damage taken during Heart Zapper's duration, with increased healing if it damages a champion or monster.`,
    descriptionVi: `Dr. Mundo sạc máy khử rung tim, gây sát thương phép mỗi giây lên kẻ địch xung quanh. Tái kích hoạt: kích nổ máy khử rung, gây sát thương phép lên kẻ địch xung quanh. Nếu vụ nổ gây sát thương lên kẻ địch, Dr. Mundo hồi lại một phần sát thương đã nhận trong thời gian Máy Khử Rung Tim hoạt động, hồi nhiều hơn nếu gây sát thương lên tướng hoặc quái.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [13, 12, 11, 10],
      unit: `seconds`,
    },
    cost: {
      values: [5, 5, 5, 5],
      resource: `HEALTH`,
    },
    range: {
      type: `AREA_AROUND_SELF`,
    },
    scaling: {
      chargeDurationSeconds: 4,
      damagePerSecond: {
        baseValue: 20,
        damageType: `MAGIC`,
      },
      detonationDamage: {
        values: [20, 40, 60, 80],
        bonusHealthRatio: 0.05,
        damageType: `MAGIC`,
      },
      healIfDetonationDamagesEnemyPercentOfDamageTaken: 15,
      healIfDetonationDamagesChampionOrMonsterPercentOfDamageTaken: [
        30, 35, 40, 45,
      ],
      recastDetonatesDefibrillator: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL],
    tags: [`MAGIC_DAMAGE`, `AREA_DAMAGE`, `RECAST`, `HEALING`, `HEALTH_COST`],
  },
  // DR. MUNDO - E
  {
    championKey: `dr-mundo`,
    slot: SkillSlot.E,
    name: `Blunt Force Trauma`,
    nameVi: `Chấn Thương Vật Cứng`,
    description: `Passive: Dr. Mundo gains Attack Damage, plus additional Attack Damage based on his missing Health. Active: Empowers his next attack to deal bonus physical damage based on his Health, increased by missing Health. If the target is killed or is a small monster, Dr. Mundo swats the target away, dealing the same damage to enemies it passes through.`,
    descriptionVi: `Nội tại: Dr. Mundo nhận thêm Sức Mạnh Công Kích, cộng thêm Sức Mạnh Công Kích dựa trên Máu đã mất. Kích hoạt: Cường hóa đòn đánh tiếp theo để gây thêm sát thương vật lý dựa trên Máu của hắn, tăng theo Máu đã mất. Nếu mục tiêu bị hạ gục hoặc là quái nhỏ, Dr. Mundo hất văng mục tiêu, gây cùng lượng sát thương lên kẻ địch nó bay qua.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [8, 7, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [10, 20, 30, 40],
      resource: `HEALTH`,
    },
    range: null,
    scaling: {
      passiveAttackDamage: {
        values: [15, 20, 25, 30],
        missingHealthBonusAttackDamageMaxValues: [30, 45, 50, 60],
      },
      empoweredAttack: {
        bonusPhysicalDamage: {
          values: [5, 20, 35, 50],
          healthRatio: 0.05,
          damageType: `PHYSICAL`,
        },
        missingHealthDamageIncreaseMaxPercent: 60,
      },
      swatsTargetAwayIfKilledOrSmallMonster: true,
      swattedTargetDealsSameDamageToEnemies: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.EMPOWERED_ATTACK],
    tags: [
      `PHYSICAL_DAMAGE`,
      `EMPOWERED_ATTACK`,
      `HEALTH_SCALING`,
      `MISSING_HEALTH_SCALING`,
      `HEALTH_COST`,
    ],
  },
  // DR. MUNDO - R
  {
    championKey: `dr-mundo`,
    slot: SkillSlot.R,
    name: `Maximum Dosage`,
    nameVi: `Quá Liều Tối Đa`,
    description: `Dr. Mundo increases his base Health based on his missing Health. He also gains Attack Damage based on bonus Health, Movement Speed, and heals a portion of his maximum Health over the duration.`,
    descriptionVi: `Dr. Mundo tăng Máu cơ bản dựa trên Máu đã mất. Hắn cũng nhận thêm Sức Mạnh Công Kích dựa trên Máu cộng thêm, Tốc Độ Di Chuyển, và hồi một phần Máu tối đa trong thời gian hiệu lực.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [70, 65, 60],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      missingHealthConvertedToBaseHealthPercent: [25, 30, 35],
      bonusAttackDamageBonusHealthRatio: [0.04, 0.055, 0.07],
      movementSpeedPercent: [15, 25, 35],
      durationSeconds: 10,
      maxHealthHealPercentOverDuration: [15, 35, 55],
    },
    effects: [SkillEffect.HEAL, SkillEffect.SPEED_UP],
    tags: [
      `HEALING`,
      `MOVEMENT_SPEED`,
      `HEALTH_SCALING`,
      `MISSING_HEALTH_SCALING`,
      `SURVIVABILITY`,
    ],
  },
  // === DRAVEN ===
  // DRAVEN - PASSIVE
  {
    championKey: `draven`,
    slot: SkillSlot.PASSIVE,
    name: `League of Draven`,
    nameVi: `Liên Minh Draven`,
    description: `Killing a unit or catching a Spinning Axe grants a stack of Adoration. Killing champions consumes all Adoration stacks and grants 80 bonus gold plus 4 gold per stack. When Draven dies, half of his Adoration stacks are lost.`,
    descriptionVi: `Tiêu diệt một đơn vị hoặc bắt được Rìu Xoay sẽ cho Draven một cộng dồn Ngưỡng Mộ. Khi hạ gục tướng, Draven tiêu thụ toàn bộ cộng dồn Ngưỡng Mộ và nhận 80 vàng thưởng cộng thêm 4 vàng với mỗi cộng dồn. Khi Draven bị hạ gục, hắn mất một nửa số cộng dồn Ngưỡng Mộ.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      adorationStackGain: {
        onUnitKill: 1,
        onSpinningAxeCatch: 1,
      },
      championKillBonusGold: 80,
      bonusGoldPerAdorationStack: 4,
      adorationLossOnDeathRatio: 0.5,
    },
    effects: [],
    tags: [`ADORATION`, `BONUS_GOLD`, `SNOWBALL`, `TAKEDOWN_REWARD`],
  },
  // DRAVEN - Q
  {
    championKey: `draven`,
    slot: SkillSlot.Q,
    name: `Spinning Axe`,
    nameVi: `Rìu Xoay`,
    description: `Draven gains a Spinning Axe, causing his next attack within 6 seconds to deal bonus physical damage. The axe bounces off the target, allowing Draven to catch and regain it. Draven can hold two Spinning Axes at once.`,
    descriptionVi: `Draven nhận một Rìu Xoay, khiến đòn đánh kế tiếp trong vòng 6 giây gây thêm sát thương vật lý. Rìu sẽ nảy khỏi mục tiêu, cho phép Draven bắt lại để tiếp tục sử dụng. Draven có thể giữ tối đa hai Rìu Xoay cùng lúc.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.SELF,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [45, 45, 45, 45],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      empoweredAttackWindowSeconds: 6,
      bonusPhysicalDamage: {
        values: [45, 50, 55, 60],
        bonusAttackDamageRatio: [1, 1.1, 1.2, 1.3],
        damageType: `PHYSICAL`,
      },
      axeBouncesAfterHit: true,
      canCatchAxeToRegain: true,
      maxSpinningAxes: 2,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.EMPOWERED_ATTACK],
    tags: [
      `SPINNING_AXE`,
      `AXE_CATCH`,
      `EMPOWERED_ATTACK`,
      `PHYSICAL_DAMAGE`,
      `HIGH_EXECUTION`,
    ],
  },
  // DRAVEN - W
  {
    championKey: `draven`,
    slot: SkillSlot.W,
    name: `Blood Rush`,
    nameVi: `Xung Huyết`,
    description: `Draven gains Attack Speed for 3 seconds and Movement Speed for 1.5 seconds. Catching a Spinning Axe refreshes Blood Rush's cooldown.`,
    descriptionVi: `Draven nhận Tốc Độ Đánh trong 3 giây và Tốc Độ Di Chuyển trong 1.5 giây. Bắt được Rìu Xoay sẽ làm mới hồi chiêu của Xung Huyết.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [10, 10, 10, 10],
      unit: `seconds`,
    },
    cost: {
      values: [40, 35, 30, 25],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      attackSpeedPercent: [20, 25, 30, 35],
      attackSpeedDurationSeconds: 3,
      movementSpeedPercent: [50, 55, 60, 65],
      movementSpeedDurationSeconds: 1.5,
      cooldownRefreshOnSpinningAxeCatch: true,
    },
    effects: [SkillEffect.SPEED_UP],
    tags: [
      `ATTACK_SPEED_STEROID`,
      `MOVEMENT_SPEED`,
      `COOLDOWN_REFRESH`,
      `AXE_CATCH`,
      `CHASE`,
    ],
  },
  // DRAVEN - E
  {
    championKey: `draven`,
    slot: SkillSlot.E,
    name: `Stand Aside`,
    nameVi: `Dẹp Đường`,
    description: `Draven throws his axes, dealing physical damage, knocking enemies aside, and slowing them for 2 seconds.`,
    descriptionVi: `Draven ném rìu ra phía trước, gây sát thương vật lý, đẩy kẻ địch sang bên và làm chậm chúng trong 2 giây.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [15, 14, 13, 12],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [75, 120, 165, 210],
        attackDamageRatio: 0.5,
        damageType: `PHYSICAL`,
      },
      knockAside: true,
      slowPercent: [25, 30, 35, 40],
      slowDurationSeconds: 2,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_BACK, SkillEffect.SLOW],
    tags: [`PHYSICAL_DAMAGE`, `KNOCK_BACK`, `SLOW`, `DISENGAGE`, `SKILL_SHOT`],
  },
  // DRAVEN - R
  {
    championKey: `draven`,
    slot: SkillSlot.R,
    name: `Whirling Death`,
    nameVi: `Lốc Xoáy Tử Vong`,
    description: `Draven hurls two massive axes, dealing physical damage. The axes return to Draven when they reach the edge of the map, hit a champion, or when the ability is reactivated. Damage is reduced by 8% each time the axes damage targets, down to a minimum of 60%. Upon reversal, the reduction resets and the axes deal full damage again.`,
    descriptionVi: `Draven phóng ra hai chiếc rìu khổng lồ, gây sát thương vật lý. Rìu quay trở lại Draven khi chạm rìa bản đồ, trúng tướng hoặc khi tái kích hoạt kỹ năng. Sát thương giảm 8% mỗi lần rìu gây sát thương lên mục tiêu, tối thiểu còn 60%. Khi đổi hướng quay về, mức giảm sát thương được đặt lại và rìu gây đủ sát thương trở lại.`,
    damageType: DamageType.PHYSICAL,
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
      type: `GLOBAL_RETURNING_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [200, 300, 400],
        attackDamageRatio: 1.3,
        damageType: `PHYSICAL`,
      },
      projectileCount: 2,
      returnsAtMapEdge: true,
      returnsOnChampionHit: true,
      canReactivateToReturn: true,
      damageReductionPerTargetHitPercent: 8,
      minimumDamagePercent: 60,
      damageReductionResetsOnReturn: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `PHYSICAL_DAMAGE`,
      `GLOBAL_RANGE`,
      `RECAST`,
      `RETURNING_PROJECTILE`,
      `DAMAGE_FALLOFF`,
    ],
  },
  // === EKKO ===
  // EKKO - PASSIVE
  {
    championKey: `ekko`,
    slot: SkillSlot.PASSIVE,
    name: `Z-Drive Resonance`,
    nameVi: `Động Cơ Z Cộng Hưởng`,
    description: `Every third attack or damaging ability against the same target deals bonus magic damage. If the target is a champion, Ekko gains Movement Speed. Deals increased damage to monsters and cannot affect the same target again for a short duration.`,
    descriptionVi: `Mỗi đòn đánh hoặc kỹ năng gây sát thương thứ ba lên cùng một mục tiêu sẽ gây thêm sát thương phép. Nếu mục tiêu là tướng, Ekko nhận Tốc Độ Di Chuyển. Gây thêm sát thương lên quái và không thể tác động lại cùng mục tiêu trong một khoảng thời gian ngắn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      requiredHits: 3,
      bonusMagicDamage: {
        baseValue: 30,
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      championMovementSpeedPercent: 40,
      championMovementSpeedDurationSeconds: 2.5,
      monsterDamageMultiplier: 1.2,
      sameTargetCooldownSeconds: 5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP],
    tags: [`THREE_HIT_PASSIVE`, `MAGIC_DAMAGE`, `MOVEMENT_SPEED`, `SKIRMISH`],
  },
  // EKKO - Q
  {
    championKey: `ekko`,
    slot: SkillSlot.Q,
    name: `Timewinder`,
    nameVi: `Dây Cót Thời Gian`,
    description: `Ekko throws a temporal device that deals magic damage. When it hits a champion or reaches its distance limit, it expands into a slowing field, then returns to Ekko and deals magic damage again. Deals increased damage to monsters.`,
    descriptionVi: `Ekko ném ra một thiết bị thời gian gây sát thương phép. Khi trúng tướng hoặc đạt tầm tối đa, nó mở rộng thành một vùng làm chậm, sau đó quay lại Ekko và gây sát thương phép lần nữa. Gây thêm sát thương lên quái.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [8, 7, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `MANA`,
    },
    range: {
      type: `RETURNING_LINE_PROJECTILE`,
    },
    scaling: {
      outboundDamage: {
        values: [90, 110, 130, 150],
        abilityPowerRatio: 0.3,
        damageType: `MAGIC`,
      },
      returnDamage: {
        values: [70, 105, 140, 175],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      slowPercent: [30, 40, 50, 60],
      expandsOnChampionHitOrDistanceLimit: true,
      monsterDamageMultiplier: 1.15,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `MAGIC_DAMAGE`,
      `SLOW`,
      `RETURNING_PROJECTILE`,
      `AREA_DAMAGE`,
      `WAVE_CLEAR`,
    ],
  },
  // EKKO - W
  {
    championKey: `ekko`,
    slot: SkillSlot.W,
    name: `Parallel Convergence`,
    nameVi: `Lưỡng Giới Đồng Quy`,
    description: `Passive: Ekko's attacks against low Health targets deal bonus missing Health magic damage. Active: Ekko launches a chronosphere that slows enemies. If Ekko enters the sphere, it detonates, stunning enemies and granting Ekko a shield.`,
    descriptionVi: `Nội tại: Đòn đánh của Ekko lên mục tiêu thấp máu gây thêm sát thương phép theo máu đã mất. Kích hoạt: Ekko phóng ra một vùng thời không làm chậm kẻ địch. Nếu Ekko bước vào vùng này, nó phát nổ, làm choáng kẻ địch và cho Ekko một lá chắn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [20, 18, 16, 14],
      unit: `seconds`,
    },
    cost: {
      values: [35, 40, 45, 50],
      resource: `MANA`,
    },
    range: {
      type: `DELAYED_AREA_ZONE`,
    },
    scaling: {
      passiveMissingHealthMagicDamage: {
        basePercent: 2,
        abilityPowerRatioPercent: 0.015,
        damageType: `MAGIC`,
      },
      chronosphereDurationSeconds: 1.5,
      slowPercent: 40,
      stunDurationSeconds: 2.5,
      shield: {
        values: [70, 100, 130, 160],
        abilityPowerRatio: 1.5,
        durationSeconds: 2,
      },
      detonatesWhenEkkoEntersSphere: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.SLOW,
      SkillEffect.STUN,
      SkillEffect.SHIELD,
    ],
    tags: [
      `CHRONOSPHERE`,
      `MISSING_HEALTH_DAMAGE`,
      `SLOW`,
      `STUN`,
      `SHIELD`,
      `ZONE_CONTROL`,
    ],
  },
  // EKKO - E
  {
    championKey: `ekko`,
    slot: SkillSlot.E,
    name: `Phase Dive`,
    nameVi: `Biến Chuyển Pha`,
    description: `Ekko dashes in a target direction. His next attack within 3 seconds gains bonus range, causes Ekko to blink to the target, and deals bonus magic damage.`,
    descriptionVi: `Ekko lướt theo hướng chỉ định. Đòn đánh kế tiếp trong vòng 3 giây nhận thêm tầm đánh, khiến Ekko dịch chuyển đến mục tiêu và gây thêm sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [9, 8, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [45, 50, 55, 60],
      resource: `MANA`,
    },
    range: {
      type: `DASH_AND_TARGETED_BLINK_ATTACK`,
    },
    scaling: {
      empoweredAttackWindowSeconds: 3,
      empoweredAttackBonusRange: 250,
      bonusMagicDamage: {
        values: [60, 90, 120, 150],
        abilityPowerRatio: 0.4,
        damageType: `MAGIC`,
      },
      blinkToTargetOnEmpoweredAttack: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.DASH,
      SkillEffect.BLINK,
      SkillEffect.EMPOWERED_ATTACK,
    ],
    tags: [`DASH`, `BLINK`, `EMPOWERED_ATTACK`, `MAGIC_DAMAGE`, `MOBILITY`],
  },
  // EKKO - R
  {
    championKey: `ekko`,
    slot: SkillSlot.R,
    name: `Chronobreak`,
    nameVi: `Đột Phá Thời Gian`,
    description: `Ekko becomes untargetable, returns to his position from 3.5 seconds ago, and heals himself. The heal is increased based on Health lost during that time. Upon arrival, Ekko deals magic damage to nearby enemies.`,
    descriptionVi: `Ekko trở nên không thể bị chọn làm mục tiêu, quay lại vị trí của mình 3.5 giây trước và hồi máu cho bản thân. Lượng hồi máu tăng dựa trên lượng máu đã mất trong khoảng thời gian đó. Khi đáp xuống, Ekko gây sát thương phép lên kẻ địch xung quanh.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [80, 60, 40],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `TIME_REWIND_AREA`,
    },
    scaling: {
      rewindSeconds: 3.5,
      heal: {
        values: [150, 200, 250],
        abilityPowerRatio: 0.5,
        increasedHealingPerOnePercentHealthLostPercent: 3,
        healthLostWindowSeconds: 3.5,
      },
      arrivalDamage: {
        values: [200, 350, 500],
        abilityPowerRatio: 1.5,
        damageType: `MAGIC`,
      },
      becomesUntargetable: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL],
    tags: [
      `TIME_REWIND`,
      `UNTARGETABLE`,
      `HEALING`,
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
      `OUTPLAY_TOOL`,
    ],
  },
  // === EVELYNN ===
  // EVELYNN - PASSIVE
  {
    championKey: `evelynn`,
    slot: SkillSlot.PASSIVE,
    name: `Demon Shade`,
    nameVi: `Yêu Ảnh`,
    description: `After not attacking or casting for 4 seconds, Evelynn enters Demon Shade. Taking damage from enemy champions or turrets puts Demon Shade on a short cooldown. While in Demon Shade, Evelynn regenerates Health every second when below a Health threshold. After level 5, Demon Shade grants Camouflage.`,
    descriptionVi: `Sau khi không tấn công hoặc dùng kỹ năng trong 4 giây, Evelynn tiến vào trạng thái Yêu Ảnh. Nhận sát thương từ tướng địch hoặc trụ sẽ khiến Yêu Ảnh có hồi chiêu ngắn. Khi ở trong Yêu Ảnh, Evelynn hồi máu mỗi giây nếu thấp hơn một ngưỡng máu nhất định. Sau cấp 5, Yêu Ảnh cho Evelynn Ngụy Trang.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      enterDemonShadeDelaySeconds: 4,
      damageFromChampionOrTurretCooldownSeconds: 1.5,
      healthRegenPerSecond: {
        baseValue: 17,
        abilityPowerRatio: 0.075,
      },
      healthRegenThreshold: 320,
      camouflageUnlockLevel: 5,
    },
    effects: [SkillEffect.HEAL, SkillEffect.STEALTH],
    tags: [`DEMON_SHADE`, `CAMOUFLAGE`, `HEALTH_REGEN`, `STEALTH`],
  },
  // EVELYNN - Q
  {
    championKey: `evelynn`,
    slot: SkillSlot.Q,
    name: `Hate Spike`,
    nameVi: `Gai Căm Hận`,
    description: `Evelynn unleashes two lines of spikes, each dealing magic damage to all enemies struck. Hate Spike can be recast within 4 seconds and deals reduced damage to minions.`,
    descriptionVi: `Evelynn phóng ra hai đường gai, mỗi đường gây sát thương phép lên toàn bộ kẻ địch trúng phải. Gai Căm Hận có thể tái kích hoạt trong vòng 4 giây và gây giảm sát thương lên lính.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [4, 4, 4, 4],
      unit: `seconds`,
    },
    cost: {
      values: [30, 35, 40, 45],
      resource: `MANA`,
    },
    range: {
      type: `DOUBLE_LINE_PROJECTILE`,
    },
    scaling: {
      damagePerLine: {
        values: [40, 47.5, 55, 62.5],
        abilityPowerRatio: 0.5,
        damageType: `MAGIC`,
      },
      lineCount: 2,
      recastWindowSeconds: 4,
      minionDamagePercent: [40, 50, 60, 70],
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `MAGIC_DAMAGE`,
      `SKILL_SHOT`,
      `RECAST`,
      `MULTI_CAST`,
      `JUNGLE_CLEAR`,
    ],
  },
  // EVELYNN - W
  {
    championKey: `evelynn`,
    slot: SkillSlot.W,
    name: `Allure`,
    nameVi: `Khiêu Gợi`,
    description: `Evelynn curses a target champion or monster. Her next attack or ability expunges the Curse and slows the target. If the Curse lasts long enough, expunging it charms the target. Against champions, it shreds Magic Resist. Against monsters, it deals bonus magic damage. Casting Allure does not remove Evelynn from Demon Shade.`,
    descriptionVi: `Evelynn nguyền rủa một tướng hoặc quái. Đòn đánh hoặc kỹ năng kế tiếp của cô sẽ kích hoạt lời nguyền và làm chậm mục tiêu. Nếu lời nguyền tồn tại đủ lâu, khi kích hoạt sẽ mê hoặc mục tiêu. Với tướng, hiệu ứng này giảm Kháng Phép. Với quái, gây thêm sát thương phép. Dùng Khiêu Gợi không khiến Evelynn rời khỏi Yêu Ảnh.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [14, 13, 12, 11],
      unit: `seconds`,
    },
    cost: {
      values: [70, 80, 90, 100],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_CURSE`,
    },
    scaling: {
      curseDurationSeconds: 5,
      slowPercent: 65,
      slowDurationSeconds: [1, 1.25, 1.5, 1.75],
      charmActivationDelaySeconds: 2.5,
      charmDurationSeconds: [1, 1.25, 1.5, 1.75],
      championMagicResistReductionPercent: [20, 24, 28, 32],
      championMagicResistReductionDurationSeconds: 4,
      monsterBonusMagicDamage: {
        values: [300, 350, 400, 450],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      doesNotBreakDemonShade: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.CHARM],
    tags: [
      `CURSE`,
      `CHARM`,
      `SLOW`,
      `MAGIC_RESIST_REDUCTION`,
      `PICK_POTENTIAL`,
    ],
  },
  // EVELYNN - E
  {
    championKey: `evelynn`,
    slot: SkillSlot.E,
    name: `Whiplash`,
    nameVi: `Quất Roi`,
    description: `Evelynn whips a target with her lashers, applying on-hit effects, dealing magic damage based on the target's maximum Health, then gaining Movement Speed. Entering Demon Shade enhances the next cast, pulling Evelynn to the target and dealing increased magic damage based on maximum Health to all enemies in the way.`,
    descriptionVi: `Evelynn quất mục tiêu bằng roi gai, áp dụng hiệu ứng đòn đánh, gây sát thương phép dựa trên Máu tối đa của mục tiêu, rồi nhận Tốc Độ Di Chuyển. Khi vào Yêu Ảnh, lần dùng kế tiếp được cường hóa, kéo Evelynn đến mục tiêu và gây sát thương phép tăng cường dựa trên Máu tối đa lên toàn bộ kẻ địch trên đường.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [8, 8, 8, 8],
      unit: `seconds`,
    },
    cost: {
      values: [45, 50, 55, 60],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_ATTACK_ENHANCED_DASH`,
    },
    scaling: {
      baseDamage: {
        values: [55, 75, 95, 115],
        damageType: `MAGIC`,
      },
      maxHealthMagicDamagePercent: {
        basePercent: 2,
        abilityPowerRatioPercent: 1,
      },
      appliesOnHitEffects: true,
      movementSpeedPercent: 30,
      movementSpeedDurationSeconds: 2,
      enhancedByDemonShade: true,
      enhancedDamage: {
        values: [80, 110, 140, 170],
        damageType: `MAGIC`,
      },
      enhancedMaxHealthMagicDamagePercent: {
        basePercent: 4,
        abilityPowerRatioPercent: 1.5,
      },
      enhancedPullsEvelynnToTarget: true,
      enhancedHitsEnemiesInPath: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP, SkillEffect.DASH],
    tags: [
      `MAGIC_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `ON_HIT_EFFECTS`,
      `DASH`,
      `DEMON_SHADE`,
    ],
  },
  // EVELYNN - R
  {
    championKey: `evelynn`,
    slot: SkillSlot.R,
    name: `Last Caress`,
    nameVi: `Hắc Ám Bùng Nổ`,
    description: `Evelynn briefly becomes untargetable and decimates the area in front of her before warping backwards a long distance. The damage is greatly increased against enemy champions below 35% Health.`,
    descriptionVi: `Evelynn thoáng chốc trở nên không thể bị chọn làm mục tiêu, tàn phá vùng phía trước rồi dịch chuyển lùi một quãng xa. Sát thương tăng mạnh lên tướng địch dưới 35% Máu.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [90, 75, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `FRONT_AREA_BACKWARD_WARP`,
    },
    scaling: {
      damage: {
        values: [150, 260, 370],
        abilityPowerRatio: 0.75,
        damageType: `MAGIC`,
      },
      lowHealthChampionDamagePercent: 230,
      lowHealthThresholdPercent: 35,
      becomesUntargetable: true,
      warpsBackward: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BLINK, SkillEffect.EXECUTE],
    tags: [
      `MAGIC_DAMAGE`,
      `EXECUTE`,
      `UNTARGETABLE`,
      `BACKWARD_WARP`,
      `BURST_DAMAGE`,
    ],
  },
  // === EZREAL ===
  // EZREAL - PASSIVE
  {
    championKey: `ezreal`,
    slot: SkillSlot.PASSIVE,
    name: `Rising Spell Force`,
    nameVi: `Pháp Lực Gia Tăng`,
    description: `Ezreal gains Attack Speed for 8 seconds when hitting abilities, stacking up to 4 times.`,
    descriptionVi: `Ezreal nhận Tốc Độ Đánh trong 8 giây khi dùng kỹ năng trúng mục tiêu, cộng dồn tối đa 4 lần.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      attackSpeedPercentPerStack: 13,
      durationSeconds: 8,
      maxStacks: 4,
      stackTrigger: `ABILITY_HIT`,
    },
    effects: [],
    tags: [`STACKING_PASSIVE`, `ATTACK_SPEED_STEROID`, `SKILL_SHOT`],
  },
  // EZREAL - Q
  {
    championKey: `ezreal`,
    slot: SkillSlot.Q,
    name: `Mystic Shot`,
    nameVi: `Phát Bắn Thần Bí`,
    description: `Ezreal fires a bolt that deals physical damage. Hitting a target reduces his other ability cooldowns and applies on-hit effects.`,
    descriptionVi: `Ezreal bắn ra một tia năng lượng gây sát thương vật lý. Trúng mục tiêu sẽ giảm hồi chiêu các kỹ năng khác của Ezreal và áp dụng hiệu ứng đòn đánh.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [4, 4, 3, 3],
      unit: `seconds`,
    },
    cost: {
      values: [30, 35, 40, 45],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [50, 85, 120, 155],
        attackDamageRatio: 1.35,
        abilityPowerRatio: 0.3,
        damageType: `PHYSICAL`,
      },
      otherAbilityCooldownReductionOnHitSeconds: 1.5,
      appliesOnHitEffects: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `PHYSICAL_DAMAGE`,
      `SKILL_SHOT`,
      `ON_HIT_EFFECTS`,
      `COOLDOWN_REDUCTION`,
      `POKE`,
    ],
  },
  // EZREAL - W
  {
    championKey: `ezreal`,
    slot: SkillSlot.W,
    name: `Essence Flux`,
    nameVi: `Tinh Hoa Tuôn Chảy`,
    description: `Ezreal fires an orb that sticks to a champion, epic monster, or structure for 4 seconds. Hitting the marked target with an attack or ability detonates the orb, dealing magic damage and refunding Mana.`,
    descriptionVi: `Ezreal bắn ra một quả cầu bám vào tướng, quái khủng hoặc công trình trong 4 giây. Đánh hoặc dùng kỹ năng trúng mục tiêu bị đánh dấu sẽ kích nổ quả cầu, gây sát thương phép và hoàn lại Mana.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [10, 10, 10, 10],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `LINE_ORB_MARK`,
    },
    scaling: {
      markDurationSeconds: 4,
      damage: {
        values: [80, 155, 230, 305],
        attackDamageRatio: 0.6,
        abilityPowerRatio: [0.75, 0.8, 0.85, 0.9],
        damageType: `MAGIC`,
      },
      manaRefund: [60, 70, 80, 90],
      validTargets: [`CHAMPION`, `EPIC_MONSTER`, `STRUCTURE`],
      detonatesOnAttackOrAbilityHit: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `MAGIC_DAMAGE`,
      `ESSENCE_FLUX`,
      `MARK_DETONATION`,
      `MANA_REFUND`,
      `SKILL_SHOT`,
    ],
  },
  // EZREAL - E
  {
    championKey: `ezreal`,
    slot: SkillSlot.E,
    name: `Arcane Shift`,
    nameVi: `Dịch Chuyển Cổ Học`,
    description: `Ezreal blinks to a target location and fires a bolt that deals magic damage. The bolt prioritizes enemies hit by Essence Flux, then the nearest enemy.`,
    descriptionVi: `Ezreal dịch chuyển tới vị trí chỉ định và bắn ra một tia năng lượng gây sát thương phép. Tia bắn ưu tiên kẻ địch đang bị Tinh Hoa Tuôn Chảy đánh dấu, sau đó đến kẻ địch gần nhất.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [24, 21, 17, 14],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: {
      type: `BLINK_AND_AUTO_TARGET_BOLT`,
    },
    scaling: {
      damage: {
        values: [80, 145, 210, 275],
        attackDamageRatio: 0.5,
        abilityPowerRatio: 0.75,
        damageType: `MAGIC`,
      },
      prioritizesEssenceFluxTarget: true,
      fallbackTargeting: `NEAREST_ENEMY`,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BLINK],
    tags: [`MAGIC_DAMAGE`, `BLINK`, `MOBILITY`, `AUTO_TARGET`, `ESSENCE_FLUX`],
  },
  // EZREAL - R
  {
    championKey: `ezreal`,
    slot: SkillSlot.R,
    name: `Trueshot Barrage`,
    nameVi: `Cung Ánh Sáng`,
    description: `Ezreal fires a global energy wave that deals magic damage. It deals reduced damage to minions and non-epic monsters.`,
    descriptionVi: `Ezreal bắn ra một luồng năng lượng toàn bản đồ gây sát thương phép. Kỹ năng gây giảm sát thương lên lính và quái không phải quái khủng.`,
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
      type: `GLOBAL_LINE_PROJECTILE`,
    },
    scaling: {
      damage: {
        values: [350, 500, 650],
        attackDamageRatio: 1,
        abilityPowerRatio: 0.9,
        damageType: `MAGIC`,
      },
      minionAndNonEpicMonsterDamageReductionPercent: 50,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [`MAGIC_DAMAGE`, `GLOBAL_RANGE`, `SKILL_SHOT`, `POKE`, `AREA_DAMAGE`],
  },
  // === FIDDLESTICKS ===
  // FIDDLESTICKS - PASSIVE
  {
    championKey: `fiddlesticks`,
    slot: SkillSlot.PASSIVE,
    name: `A Harmless Scarecrow`,
    nameVi: `Bù Nhìn Vô Hại`,
    description: `After a champion takedown, Fiddlesticks summons a Scarecrow Effigy for 3 seconds. The Effigy automatically tracks the nearest enemy champion, detonating when it reaches them or when its duration ends to fear nearby enemy champions.`,
    descriptionVi: `Sau khi tham gia hạ gục tướng, Fiddlesticks triệu hồi một Hình Nhân Bù Nhìn trong 3 giây. Hình nhân tự động đuổi theo tướng địch gần nhất, phát nổ khi chạm tới mục tiêu hoặc khi hết thời gian tồn tại để gây hoảng sợ lên tướng địch xung quanh.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ENEMIES,
    cooldown: null,
    cost: null,
    range: {
      type: `TRACKING_EFFIGY_AREA_FEAR`,
    },
    scaling: {
      effigyDurationSeconds: 3,
      summonsAfterChampionTakedown: true,
      tracksNearestEnemyChampion: true,
      detonatesOnReachOrDurationEnd: true,
      fearsNearbyEnemyChampions: true,
    },
    effects: [SkillEffect.FEAR],
    tags: [`SCARECROW_EFFIGY`, `FEAR`, `TAKEDOWN_REWARD`, `AREA_CC`],
  },
  // FIDDLESTICKS - Q
  {
    championKey: `fiddlesticks`,
    slot: SkillSlot.Q,
    name: `Terrify`,
    nameVi: `Khiếp Hãi`,
    description: `Passive: While unseen and out of combat, or while standing still and impersonating an Effigy, damaging an enemy with an ability fears them. Active: Fiddlesticks unleashes a murder of crows, fearing the target and dealing magic damage based on current Health. If the target was recently feared, they take increased damage instead of being feared again. Damage against monsters is capped.`,
    descriptionVi: `Nội tại: Khi không bị nhìn thấy và ngoài giao tranh, hoặc khi đứng yên giả dạng Hình Nhân, kỹ năng gây sát thương của Fiddlesticks sẽ khiến kẻ địch hoảng sợ. Kích hoạt: Fiddlesticks phóng ra một đàn quạ, gây hoảng sợ mục tiêu và gây sát thương phép dựa trên Máu hiện tại. Nếu mục tiêu vừa bị hoảng sợ gần đây, chúng nhận thêm sát thương thay vì bị hoảng sợ lần nữa. Sát thương lên quái bị giới hạn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [13, 13, 12, 12],
      unit: `seconds`,
    },
    cost: {
      values: [65, 65, 65, 65],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_CROWS`,
    },
    scaling: {
      passiveFear: {
        requiresUnseenAndOutOfCombat: true,
        canImpersonateEffigyWhileStandingStill: true,
        fearDurationSeconds: [1, 1.2, 1.4, 1.6],
      },
      activeFearDurationSeconds: [1, 1.2, 1.4, 1.6],
      currentHealthMagicDamagePercent: [4, 5, 6, 7],
      currentHealthDamageIncreasePer100AbilityPowerPercent: 1.5,
      minimumDamage: 45,
      recentlyFearedDamageIncreasePercent: 200,
      monsterDamageCap: 400,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.FEAR],
    tags: [
      `FEAR`,
      `CURRENT_HEALTH_DAMAGE`,
      `MAGIC_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `EFFIGY_IMPERSONATION`,
    ],
  },
  // FIDDLESTICKS - W
  {
    championKey: `fiddlesticks`,
    slot: SkillSlot.W,
    name: `Bountiful Harvest`,
    nameVi: `Bội Thu`,
    description: `Fiddlesticks channels and drains the souls of nearby enemies, dealing magic damage each second for 2 seconds and additional missing Health damage at the end. It restores Health based on damage dealt. Fiddlesticks is slowed while channeling and can recast to end the channel early. Completing the channel reduces the remaining cooldown.`,
    descriptionVi: `Fiddlesticks vận sức và hút linh hồn kẻ địch xung quanh, gây sát thương phép mỗi giây trong 2 giây và gây thêm sát thương theo Máu đã mất ở cuối thời gian vận. Kỹ năng hồi máu dựa trên sát thương gây ra. Fiddlesticks bị làm chậm khi vận sức và có thể tái kích hoạt để kết thúc sớm. Hoàn tất thời gian vận sẽ giảm hồi chiêu còn lại.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [11, 10, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `AREA_DRAIN_CHANNEL`,
    },
    scaling: {
      channelDurationSeconds: 2,
      damagePerSecond: {
        values: [60, 90, 120, 150],
        abilityPowerRatio: 0.3,
        damageType: `MAGIC`,
      },
      finalMissingHealthDamagePercent: 10,
      healingFromDamagePercent: [40, 45, 50, 55],
      targetHealingModifiers: {
        championPercent: 40,
        minionPercent: 15,
        monsterPercent: 45,
      },
      selfSlowPercentWhileChanneling: 30,
      canRecastToEndChannelEarly: true,
      cooldownReductionOnCompletedChannelRatio: 0.5,
      monsterDamageMultiplier: 1.6,
      minionDamageMultiplier: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL, SkillEffect.SLOW],
    tags: [
      `DRAIN`,
      `CHANNEL`,
      `MISSING_HEALTH_DAMAGE`,
      `HEALING`,
      `JUNGLE_CLEAR`,
    ],
  },
  // FIDDLESTICKS - E
  {
    championKey: `fiddlesticks`,
    slot: SkillSlot.E,
    name: `Reap`,
    nameVi: `Gặt`,
    description: `Fiddlesticks slashes the target location with its scythe, dealing magic damage to enemies in the area and slowing them. Enemies in the center are silenced.`,
    descriptionVi: `Fiddlesticks vung lưỡi hái vào vị trí chỉ định, gây sát thương phép lên kẻ địch trong vùng ảnh hưởng và làm chậm chúng. Kẻ địch ở trung tâm bị câm lặng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_AREA_SLASH`,
    },
    scaling: {
      damage: {
        values: [70, 120, 170, 220],
        abilityPowerRatio: 0.5,
        damageType: `MAGIC`,
      },
      slowPercent: [35, 40, 45, 50],
      slowDurationSeconds: 1.25,
      centerSilencesEnemies: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.SILENCE],
    tags: [`MAGIC_DAMAGE`, `AREA_DAMAGE`, `SLOW`, `SILENCE`, `ZONE_CONTROL`],
  },
  // FIDDLESTICKS - R
  {
    championKey: `fiddlesticks`,
    slot: SkillSlot.R,
    name: `Crowstorm`,
    nameVi: `Bão Quạ`,
    description: `Fiddlesticks channels, then blinks to the target location and summons Crowstorm, dealing magic damage repeatedly to nearby enemies for 5 seconds.`,
    descriptionVi: `Fiddlesticks vận sức, sau đó dịch chuyển đến vị trí chỉ định và triệu hồi Bão Quạ, gây sát thương phép liên tục lên kẻ địch xung quanh trong 5 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [100, 80, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `CHANNEL_BLINK_AREA_STORM`,
    },
    scaling: {
      channelDurationSeconds: 1.5,
      damageTickIntervalSeconds: 0.25,
      stormDurationSeconds: 5,
      damagePerTick: {
        values: [30, 50, 70],
        abilityPowerRatio: 0.2,
        damageType: `MAGIC`,
      },
      blinksToTargetLocationAfterChannel: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BLINK],
    tags: [`CROWSTORM`, `CHANNEL`, `BLINK`, `AREA_DAMAGE`, `TEAMFIGHT`],
  },
  // === FIORA ===
  // FIORA - PASSIVE
  {
    championKey: `fiora`,
    slot: SkillSlot.PASSIVE,
    name: `Duelist's Dance`,
    nameVi: `Vũ Điệu Kiếm Sư`,
    description: `Fiora reveals Vitals on nearby enemy champions. Striking a Vital deals true damage based on the target's maximum Health, heals Fiora, and grants decaying Movement Speed. A new Vital is revealed after one is struck or after a duration.`,
    descriptionVi: `Fiora làm lộ Điểm Yếu trên tướng địch gần đó. Đánh trúng Điểm Yếu gây sát thương chuẩn dựa trên Máu tối đa của mục tiêu, hồi máu cho Fiora và cho Tốc Độ Di Chuyển giảm dần. Điểm Yếu mới sẽ xuất hiện sau khi bị đánh trúng hoặc sau một khoảng thời gian.`,
    damageType: DamageType.TRUE_DAMAGE,
    targetType: TargetType.CHAMPION,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      vitalRevealDelaySeconds: 2,
      vitalRevealDelayScalesWithGrandChallengeLevel: true,
      maxHealthTrueDamagePercent: {
        basePercent: 3.5,
        bonusAttackDamageRatioPercent: 0.05,
      },
      healOnVitalHit: 45,
      movementSpeedPercent: 30,
      movementSpeedScalesWithGrandChallengeLevel: true,
      movementSpeedDecayDurationSeconds: 1.75,
      newVitalRevealAfterHit: true,
      newVitalRevealAfterSeconds: 16.75,
    },
    effects: [SkillEffect.TRUE_DAMAGE, SkillEffect.HEAL, SkillEffect.SPEED_UP],
    tags: [
      `VITAL`,
      `TRUE_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `HEALING`,
      `MOVEMENT_SPEED`,
    ],
  },
  // FIORA - Q
  {
    championKey: `fiora`,
    slot: SkillSlot.Q,
    name: `Lunge`,
    nameVi: `Lao Tới`,
    description: `Fiora lunges in a direction and stabs a nearby enemy, dealing physical damage. Hitting a target refunds part of Lunge's cooldown. Lunge prioritizes Vitals and enemies it will kill, applies on-hit effects to the main target, deals reduced damage to monsters, and can damage turrets.`,
    descriptionVi: `Fiora lao theo hướng chỉ định và đâm một kẻ địch gần đó, gây sát thương vật lý. Trúng mục tiêu sẽ hoàn lại một phần hồi chiêu của Lao Tới. Kỹ năng ưu tiên Điểm Yếu và kẻ địch có thể bị kết liễu, áp dụng hiệu ứng đòn đánh lên mục tiêu chính, gây giảm sát thương lên quái và có thể gây sát thương lên trụ.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [12, 10, 8, 6],
      unit: `seconds`,
    },
    cost: {
      values: [20, 25, 30, 35],
      resource: `MANA`,
    },
    range: {
      type: `DASH_AND_AUTO_TARGET_STAB`,
    },
    scaling: {
      damage: {
        values: [75, 85, 95, 105],
        bonusAttackDamageRatio: [1.1, 1.15, 1.2, 1.25],
        damageType: `PHYSICAL`,
      },
      cooldownRefundOnHitRatio: 0.5,
      prioritizesVitals: true,
      prioritizesKillTargets: true,
      appliesOnHitEffectsToMainTarget: true,
      monsterDamageMultiplier: 0.5,
      canDamageTurrets: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `DASH`,
      `VITAL`,
      `COOLDOWN_REFUND`,
      `ON_HIT_EFFECTS`,
      `PHYSICAL_DAMAGE`,
    ],
  },
  // FIORA - W
  {
    championKey: `fiora`,
    slot: SkillSlot.W,
    name: `Riposte`,
    nameVi: `Phản Đòn`,
    description: `Fiora parries all incoming damage and debuffs for a short duration, then stabs in the target direction, dealing magic damage to the first enemy champion hit and slowing their Movement Speed and Attack Speed. If Riposte parries an immobilizing effect, it stuns instead of slowing.`,
    descriptionVi: `Fiora chặn toàn bộ sát thương và hiệu ứng bất lợi nhận vào trong thời gian ngắn, sau đó đâm theo hướng chỉ định, gây sát thương phép lên tướng địch đầu tiên trúng phải và làm chậm Tốc Độ Di Chuyển cùng Tốc Độ Đánh của chúng. Nếu Phản Đòn chặn một hiệu ứng bất động, kỹ năng sẽ làm choáng thay vì làm chậm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [18, 16, 14, 12],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `PARRY_THEN_LINE_STAB`,
    },
    scaling: {
      parryDurationSeconds: 0.75,
      parriesIncomingDamage: true,
      parriesDebuffs: true,
      damage: {
        values: [120, 170, 220, 270],
        abilityPowerRatio: 1,
        damageType: `MAGIC`,
      },
      movementSpeedSlowPercent: 50,
      attackSpeedSlowPercent: 50,
      slowDurationSeconds: 1.5,
      stunsIfParriedImmobilizingEffect: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.STUN],
    tags: [`RIPOSTE`, `PARRY`, `MAGIC_DAMAGE`, `SLOW`, `STUN`, `OUTPLAY_TOOL`],
  },
  // FIORA - E
  {
    championKey: `fiora`,
    slot: SkillSlot.E,
    name: `Bladework`,
    nameVi: `Nhất Kiếm Nhị Dụng`,
    description: `Fiora empowers her next 2 attacks with bonus Attack Speed. The first attack slows but cannot critically strike. The second attack always critically strikes for increased physical damage.`,
    descriptionVi: `Fiora cường hóa 2 đòn đánh kế tiếp với Tốc Độ Đánh cộng thêm. Đòn đầu tiên làm chậm nhưng không thể chí mạng. Đòn thứ hai luôn chí mạng và gây sát thương vật lý tăng thêm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.SELF,
    cooldown: {
      values: [11, 9, 7, 5],
      unit: `seconds`,
    },
    cost: {
      values: [30, 35, 40, 45],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      empoweredAttackCount: 2,
      attackSpeedPercent: 60,
      firstAttackSlowPercent: 30,
      firstAttackSlowDurationSeconds: 1,
      firstAttackCannotCriticallyStrike: true,
      secondAttackAlwaysCriticallyStrikes: true,
      secondAttackCriticalPhysicalDamagePercent: [170, 180, 190, 200],
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.SLOW,
      SkillEffect.EMPOWERED_ATTACK,
    ],
    tags: [
      `EMPOWERED_ATTACK`,
      `ATTACK_SPEED_STEROID`,
      `SLOW`,
      `CRITICAL_SCALING`,
      `DUELING`,
    ],
  },
  // FIORA - R
  {
    championKey: `fiora`,
    slot: SkillSlot.R,
    name: `Grand Challenge`,
    nameVi: `Đại Thử Thách`,
    description: `Passive: Reduces the time needed to reveal Vitals. Active: Reveals all 4 Vitals on an enemy champion and grants Fiora Duelist's Dance Movement Speed while near them. If Fiora strikes all 4 Vitals, or if the target dies after she has struck at least one, Fiora and nearby allied champions are healed over time. Striking all 4 Vitals deals true damage based on the target's maximum Health.`,
    descriptionVi: `Nội tại: Giảm thời gian cần để làm lộ Điểm Yếu. Kích hoạt: Làm lộ toàn bộ 4 Điểm Yếu trên một tướng địch và cho Fiora Tốc Độ Di Chuyển từ Vũ Điệu Kiếm Sư khi ở gần mục tiêu. Nếu Fiora đánh trúng cả 4 Điểm Yếu, hoặc mục tiêu chết sau khi cô đã đánh trúng ít nhất một Điểm Yếu, Fiora và tướng đồng minh gần đó được hồi máu theo thời gian. Đánh trúng cả 4 Điểm Yếu gây sát thương chuẩn dựa trên Máu tối đa của mục tiêu.`,
    damageType: DamageType.TRUE_DAMAGE,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [70, 60, 50],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_CHAMPION_VITAL_REVEAL`,
    },
    scaling: {
      passiveVitalRevealDelayReductionSeconds: [0.25, 0.5, 0.75],
      activeVitalCount: 4,
      activeDurationSeconds: 8,
      gainsDuelistDanceMovementSpeedNearTarget: true,
      healPerSecond: {
        values: [80, 110, 140],
        bonusAttackDamageRatio: 0.6,
      },
      healAreaAffectsNearbyAlliedChampions: true,
      healDurationSeconds: {
        min: 2,
        max: 5,
        scalesWithVitalsHit: true,
      },
      healTriggersIfAllVitalsHit: true,
      healTriggersIfTargetDiesAfterAtLeastOneVitalHit: true,
      allVitalsTrueDamageMaxHealthPercent: 16,
    },
    effects: [SkillEffect.TRUE_DAMAGE, SkillEffect.HEAL, SkillEffect.SPEED_UP],
    tags: [
      `VITAL`,
      `TRUE_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `HEALING`,
      `DUELING`,
    ],
  },
  // === FIZZ ===
  // FIZZ - PASSIVE
  {
    championKey: `fizz`,
    slot: SkillSlot.PASSIVE,
    name: `Seastone Trident`,
    nameVi: `Đinh Ba Hải Thạch`,
    description: `Fizz's attacks deal bonus magic damage over 3 seconds. This damage is reduced against monsters.`,
    descriptionVi: `Đòn đánh của Fizz gây thêm sát thương phép trong 3 giây. Sát thương này bị giảm khi gây lên quái.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      damageOverTime: {
        baseValue: 24,
        abilityPowerRatio: 0.45,
        durationSeconds: 3,
        damageType: `MAGIC`,
      },
      monsterDamageMultiplier: 0.9,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `SEASTONE_TRIDENT`,
      `MAGIC_DAMAGE`,
      `DAMAGE_OVER_TIME`,
      `ON_HIT_EFFECTS`,
    ],
  },
  // FIZZ - Q
  {
    championKey: `fizz`,
    slot: SkillSlot.Q,
    name: `Urchin Strike`,
    nameVi: `Đâm Lao`,
    description: `Fizz dashes through the target enemy, dealing magic damage plus physical damage based on Attack Damage and applying on-hit effects.`,
    descriptionVi: `Fizz lao xuyên qua kẻ địch mục tiêu, gây sát thương phép cộng thêm sát thương vật lý dựa trên Sức Mạnh Công Kích và áp dụng hiệu ứng đòn đánh.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [8, 7, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_DASH_THROUGH`,
    },
    scaling: {
      magicDamage: {
        values: [20, 40, 60, 80],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      physicalDamage: {
        attackDamageRatio: 1,
        damageType: `PHYSICAL`,
      },
      appliesOnHitEffects: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `DASH`,
      `MAGIC_DAMAGE`,
      `PHYSICAL_DAMAGE`,
      `ON_HIT_EFFECTS`,
      `MOBILITY`,
    ],
  },
  // FIZZ - W
  {
    championKey: `fizz`,
    slot: SkillSlot.W,
    name: `Rending Wave`,
    nameVi: `Sóng Xé Toạc`,
    description: `Fizz empowers his next attack to gush water around the target, dealing magic damage and applying Seastone Trident to enemies hit. Additional attacks within 5 seconds deal bonus magic damage. Killing a unit with the first attack greatly reduces Rending Wave's cooldown.`,
    descriptionVi: `Fizz cường hóa đòn đánh kế tiếp để tung nước quanh mục tiêu, gây sát thương phép và áp dụng Đinh Ba Hải Thạch lên kẻ địch trúng phải. Các đòn đánh tiếp theo trong 5 giây gây thêm sát thương phép. Tiêu diệt một đơn vị bằng đòn đánh đầu tiên sẽ giảm mạnh hồi chiêu của Sóng Xé Toạc.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [10, 9, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [30, 40, 50, 60],
      resource: `MANA`,
    },
    range: {
      type: `EMPOWERED_ATTACK_SPLASH`,
    },
    scaling: {
      firstAttackMagicDamage: {
        values: [50, 75, 100, 125],
        abilityPowerRatio: 0.45,
        damageType: `MAGIC`,
      },
      appliesSeastoneTridentToEnemiesHit: true,
      additionalAttackWindowSeconds: 5,
      additionalAttackBonusMagicDamage: {
        values: [10, 15, 20, 25],
        abilityPowerRatio: 0.4,
        damageType: `MAGIC`,
      },
      cooldownSetToSecondsOnFirstAttackKill: 1,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.EMPOWERED_ATTACK],
    tags: [
      `RENDING_WAVE`,
      `EMPOWERED_ATTACK`,
      `MAGIC_DAMAGE`,
      `SEASTONE_TRIDENT`,
      `COOLDOWN_REFUND`,
    ],
  },
  // FIZZ - E
  {
    championKey: `fizz`,
    slot: SkillSlot.E,
    name: `Playful / Trickster`,
    nameVi: `Tung Tăng / Nhảy Múa`,
    description: `Fizz vaults to the target location, becoming untargetable while balanced on his trident. After a delay, he hops down with a large splash that deals magic damage and slows enemies. Recast: Fizz hops down early toward a direction, dealing damage in a smaller splash that does not slow enemies.`,
    descriptionVi: `Fizz nhảy tới vị trí chỉ định, trở nên không thể bị chọn làm mục tiêu khi đứng thăng bằng trên cây đinh ba. Sau một khoảng trễ, hắn nhảy xuống tạo vụ nổ nước lớn, gây sát thương phép và làm chậm kẻ địch. Tái kích hoạt: Fizz nhảy xuống sớm theo một hướng, gây sát thương trong vùng nhỏ hơn và không làm chậm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [16, 14, 12, 10],
      unit: `seconds`,
    },
    cost: {
      values: [85, 90, 95, 100],
      resource: `MANA`,
    },
    range: {
      type: `VAULT_UNTARGETABLE_AREA_SPLASH`,
    },
    scaling: {
      untargetableDurationSeconds: 1.2,
      damage: {
        values: [80, 150, 220, 290],
        abilityPowerRatio: 0.8,
        damageType: `MAGIC`,
      },
      slowPercent: [40, 45, 50, 55],
      slowDurationSeconds: 2,
      recastHopsDownEarly: true,
      recastSmallerSplash: true,
      recastSplashDoesNotSlow: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `PLAYFUL_TRICKSTER`,
      `UNTARGETABLE`,
      `MAGIC_DAMAGE`,
      `SLOW`,
      `OUTPLAY_TOOL`,
    ],
  },
  // FIZZ - R
  {
    championKey: `fizz`,
    slot: SkillSlot.R,
    name: `Chum the Waters`,
    nameVi: `Triệu Hồi Thủy Quái`,
    description: `Fizz launches a fish that attaches to the first champion hit and reveals them. After 2 seconds, the fish attracts a shark that knocks up the attached target and knocks away nearby enemies. The farther the fish travels, the larger the shark becomes, increasing magic damage and slow strength. If the fish does not attach to a champion, it flops on the ground and still attracts a shark at its location.`,
    descriptionVi: `Fizz phóng ra một con cá bám vào tướng đầu tiên trúng phải và làm lộ diện họ. Sau 2 giây, con cá gọi một con cá mập hất tung mục tiêu bị bám và đẩy lùi kẻ địch xung quanh. Cá bay càng xa thì cá mập càng lớn, tăng sát thương phép và độ làm chậm. Nếu cá không bám vào tướng, nó rơi xuống đất và vẫn gọi cá mập tại vị trí đó.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [85, 70, 55],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LINE_SKILLSHOT_DELAYED_SHARK_AREA`,
    },
    scaling: {
      attachRevealDurationSeconds: 2,
      delayBeforeSharkSeconds: 2,
      minDamage: {
        values: [150, 250, 350],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      maxDamage: {
        values: [300, 400, 500],
        abilityPowerRatio: 1.2,
        damageType: `MAGIC`,
      },
      slowPercent: {
        min: 40,
        max: 80,
        scalesWithSharkSize: true,
      },
      sharkSizeScalesWithTravelDistance: true,
      knocksUpAttachedTarget: true,
      knocksAwayNearbyEnemies: true,
      stillAttractsSharkIfFishMissesChampion: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.KNOCK_UP,
      SkillEffect.KNOCK_BACK,
      SkillEffect.SLOW,
    ],
    tags: [
      `CHUM_THE_WATERS`,
      `SHARK`,
      `ATTACHED_PROJECTILE`,
      `KNOCK_UP`,
      `PICK_POTENTIAL`,
    ],
  },
  // === GALIO ===
  // GALIO - PASSIVE
  {
    championKey: `galio`,
    slot: SkillSlot.PASSIVE,
    name: `Colossal Smash`,
    nameVi: `Cú Nện Khổng Lồ`,
    description: `Galio empowers his next attack to deal magic damage to nearby enemies and gains Attack Speed while the passive is active. When an ability hits an enemy champion or epic jungle monster, Colossal Smash's cooldown is reduced. Each ability can only trigger this cooldown reduction once.`,
    descriptionVi: `Galio cường hóa đòn đánh kế tiếp để gây sát thương phép lên kẻ địch xung quanh và nhận Tốc Độ Đánh khi nội tại đang sẵn sàng. Khi kỹ năng trúng tướng địch hoặc quái khủng, hồi chiêu của Cú Nện Khổng Lồ được giảm. Mỗi kỹ năng chỉ có thể kích hoạt giảm hồi chiêu một lần.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: null,
    cost: null,
    range: {
      type: `EMPOWERED_ATTACK_AREA`,
    },
    scaling: {
      damage: {
        baseValue: 15,
        attackDamageRatio: 1,
        levelScalingFormula: `10 * (championLevel - 1)`,
        abilityPowerRatio: 0.45,
        magicResistRatio: 0.6,
        damageType: `MAGIC`,
      },
      attackSpeedPercentWhileActive: 40,
      cooldownReductionOnAbilityHitSeconds: 3,
      cooldownReductionTargets: [`CHAMPION`, `EPIC_MONSTER`],
      eachAbilityCanTriggerCooldownReductionOnce: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.EMPOWERED_ATTACK],
    tags: [
      `COLOSSAL_SMASH`,
      `EMPOWERED_ATTACK`,
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
      `MAGIC_RESIST_SCALING`,
    ],
  },
  // GALIO - Q
  {
    championKey: `galio`,
    slot: SkillSlot.Q,
    name: `Winds of War`,
    nameVi: `Đôi Cánh Chiến Trận`,
    description: `Galio fires two windblasts that deal magic damage and converge into a tornado. The tornado deals magic damage based on the target's maximum Health over time.`,
    descriptionVi: `Galio phóng ra hai luồng gió gây sát thương phép và hội tụ thành một cơn lốc. Cơn lốc gây sát thương phép theo Máu tối đa của mục tiêu trong một khoảng thời gian.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [11, 10, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [75, 75, 75, 75],
      resource: `MANA`,
    },
    range: {
      type: `DOUBLE_PROJECTILE_TORNADO`,
    },
    scaling: {
      windblastDamage: {
        values: [70, 115, 160, 205],
        abilityPowerRatio: 0.75,
        damageType: `MAGIC`,
      },
      tornadoMaxHealthMagicDamagePercent: {
        basePercent: 8,
        abilityPowerRatioPercent: 2,
        durationSeconds: 1.5,
        damageType: `MAGIC`,
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `MAGIC_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `DAMAGE_OVER_TIME`,
      `AREA_DAMAGE`,
      `POKE`,
    ],
  },
  // GALIO - W
  {
    championKey: `galio`,
    slot: SkillSlot.W,
    name: `Shield of Durand`,
    nameVi: `Lá Chắn Durand`,
    description: `Passive: Periodically, upon taking damage, Galio gains a magic damage shield. Hold: Galio enters a defensive stance, slowing himself and reducing incoming magic and physical damage. Release: Galio deals magic damage to nearby enemies and taunts them, with taunt duration increased by hold time.`,
    descriptionVi: `Nội tại: Theo chu kỳ, khi nhận sát thương, Galio nhận một lá chắn chặn sát thương phép. Giữ kỹ năng: Galio vào thế phòng thủ, tự làm chậm bản thân và giảm sát thương phép lẫn vật lý nhận vào. Thả kỹ năng: Galio gây sát thương phép lên kẻ địch xung quanh và khiêu khích chúng, thời gian khiêu khích tăng theo thời gian giữ.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [18, 17, 16, 15],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `AREA_TAUNT_DEFENSIVE_STANCE`,
    },
    scaling: {
      passiveMagicShield: {
        cooldownSeconds: 12,
        baseValue: 46,
        healthRatioByRank: [0.08, 0.12, 0.16, 0.2],
        durationSeconds: 3.5,
        damageTypeBlocked: `MAGIC`,
      },
      hold: {
        maxDurationSeconds: 2,
        selfSlowPercent: 15,
        magicDamageReductionPercent: [25, 30, 35, 40],
        magicDamageReductionAbilityPowerRatioPercent: 4,
        magicDamageReductionBonusMagicResistRatioPercent: 8,
        magicDamageReductionBonusHealthRatioPercent: 1,
        physicalDamageReductionPercent: [12.5, 15, 17.5, 20],
        physicalDamageReductionAbilityPowerRatioPercent: 2,
        physicalDamageReductionBonusMagicResistRatioPercent: 4,
        physicalDamageReductionBonusHealthRatioPercent: 0.5,
      },
      release: {
        damage: {
          values: [40, 80, 120, 160],
          abilityPowerRatio: 0.55,
          damageType: `MAGIC`,
        },
        tauntDurationSeconds: {
          min: 0.5,
          max: 1.5,
          scalesWithHoldTime: true,
        },
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SHIELD, SkillEffect.TAUNT],
    tags: [
      `SHIELD_OF_DURAND`,
      `MAGIC_SHIELD`,
      `DAMAGE_REDUCTION`,
      `TAUNT`,
      `AREA_CC`,
    ],
  },
  // GALIO - E
  {
    championKey: `galio`,
    slot: SkillSlot.E,
    name: `Justice Punch`,
    nameVi: `Cú Đấm Công Lý`,
    description: `Galio dashes forward until he hits an enemy champion or terrain, dealing magic damage and knocking enemies up. Deals reduced damage to minions and monsters.`,
    descriptionVi: `Galio lao về phía trước cho đến khi va vào tướng địch hoặc địa hình, gây sát thương phép và hất tung kẻ địch. Gây giảm sát thương lên lính và quái.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `FORWARD_DASH_COLLISION`,
    },
    scaling: {
      damage: {
        values: [90, 140, 190, 240],
        abilityPowerRatio: 0.8,
        damageType: `MAGIC`,
      },
      knockUpDurationSeconds: 0.75,
      stopsOnEnemyChampionOrTerrain: true,
      minionAndMonsterDamageMultiplier: 0.85,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH, SkillEffect.KNOCK_UP],
    tags: [`DASH`, `KNOCK_UP`, `MAGIC_DAMAGE`, `ENGAGE`, `COLLISION_DASH`],
  },
  // GALIO - R
  {
    championKey: `galio`,
    slot: SkillSlot.R,
    name: `Hero's Entrance`,
    nameVi: `Siêu Hùng Giáng Thế`,
    description: `Galio grants Shield of Durand's passive shield to allied champions near the target and designates that position as his landing spot. After a delay, Galio arrives, dealing magic damage to nearby enemies and knocking them up.`,
    descriptionVi: `Galio trao lá chắn nội tại từ Lá Chắn Durand cho tướng đồng minh gần mục tiêu và chỉ định vị trí đó làm điểm đáp. Sau một khoảng trễ, Galio đáp xuống, gây sát thương phép lên kẻ địch gần đó và hất tung chúng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [90, 80, 70],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `ALLY_TARGETED_GLOBAL_LANDING`,
    },
    scaling: {
      grantsShieldOfDurandPassiveShieldToNearbyAllies: true,
      allyShieldDurationSeconds: 5,
      landingDelaySeconds: 2.5,
      damage: {
        values: [150, 250, 350],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      knockUpDurationSeconds: 0.75,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SHIELD, SkillEffect.KNOCK_UP],
    tags: [
      `HEROS_ENTRANCE`,
      `ALLY_SHIELD`,
      `GLOBAL_RANGE`,
      `KNOCK_UP`,
      `TEAM_SUPPORT`,
    ],
  },
  // === GAREN ===
  // GAREN - PASSIVE
  {
    championKey: `garen`,
    slot: SkillSlot.PASSIVE,
    name: `Perseverance`,
    nameVi: `Bền Bỉ`,
    description: `If Garen has not recently been struck by damage or enemy abilities, he regenerates missing Health every second. Damage from minions and non-epic monsters does not interrupt this effect.`,
    descriptionVi: `Nếu Garen không bị sát thương hoặc kỹ năng của kẻ địch đánh trúng trong một khoảng thời gian gần đây, hắn hồi Máu đã mất mỗi giây. Sát thương từ lính và quái không phải quái khủng không làm gián đoạn hiệu ứng này.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      outOfCombatDelaySeconds: 5,
      missingHealthRegenPercentPerSecond: {
        min: 1.2,
        max: 4.5,
        formula: `1 + championLevel * 0.3`,
      },
      ignoredDamageSources: [`MINION`, `NON_EPIC_MONSTER`],
    },
    effects: [SkillEffect.HEAL],
    tags: [`PERSEVERANCE`, `HEALTH_REGEN`, `MISSING_HEALTH_SCALING`, `SUSTAIN`],
  },
  // GAREN - Q
  {
    championKey: `garen`,
    slot: SkillSlot.Q,
    name: `Decisive Strike`,
    nameVi: `Đòn Quyết Định`,
    description: `Garen breaks free from all slows, becomes briefly immune to slows, and gains Movement Speed. His next attack within 3 seconds is empowered to deal bonus physical damage and silence the target.`,
    descriptionVi: `Garen thoát khỏi toàn bộ hiệu ứng làm chậm, miễn nhiễm làm chậm trong thoáng chốc và nhận Tốc Độ Di Chuyển. Đòn đánh kế tiếp trong vòng 3 giây được cường hóa, gây thêm sát thương vật lý và câm lặng mục tiêu.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [9, 8, 8, 7],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      removesSlows: true,
      slowImmunityDurationSeconds: 0.5,
      movementSpeedPercent: 35,
      movementSpeedDurationSeconds: [2, 2.5, 3, 3.5],
      empoweredAttackWindowSeconds: 3,
      bonusPhysicalDamage: {
        values: [40, 80, 120, 160],
        attackDamageRatio: 0.4,
        damageType: `PHYSICAL`,
      },
      silenceDurationSeconds: 1.5,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.SPEED_UP,
      SkillEffect.EMPOWERED_ATTACK,
      SkillEffect.SILENCE,
    ],
    tags: [
      `DECISIVE_STRIKE`,
      `SILENCE`,
      `EMPOWERED_ATTACK`,
      `MOVEMENT_SPEED`,
      `CLEANSE`,
    ],
  },
  // GAREN - W
  {
    championKey: `garen`,
    slot: SkillSlot.W,
    name: `Courage`,
    nameVi: `Can Đảm`,
    description: `Passive: Garen gains bonus Magic Resist and Armor. Active: Garen reduces incoming damage. On cast, he gains Tenacity and a shield that decays after a short delay.`,
    descriptionVi: `Nội tại: Garen nhận thêm Kháng Phép và Giáp. Kích hoạt: Garen giảm sát thương nhận vào. Khi dùng kỹ năng, hắn nhận Kháng Hiệu Ứng và một lá chắn bắt đầu suy giảm sau một khoảng trễ ngắn.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [18, 16, 14, 12],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      passiveBonusMagicResistPercent: 10,
      passiveBonusArmorPercent: 10,
      damageReductionPercent: 30,
      damageReductionDurationSeconds: 4,
      tenacityPercent: 60,
      tenacityDurationSeconds: 1,
      shield: {
        values: [65, 95, 125, 155],
        bonusHealthRatio: 0.2,
        durationSeconds: 2.5,
        startsDecayingAfterSeconds: 1,
      },
    },
    effects: [SkillEffect.SHIELD],
    tags: [
      `COURAGE`,
      `DAMAGE_REDUCTION`,
      `TENACITY`,
      `SHIELD`,
      `BONUS_RESISTANCES`,
    ],
  },
  // GAREN - E
  {
    championKey: `garen`,
    slot: SkillSlot.E,
    name: `Judgment`,
    nameVi: `Phán Quyết`,
    description: `Garen rapidly spins his sword for 3 seconds, dealing repeated physical damage. The number of strikes increases every 4 levels. Recast ends Judgment early and reduces its cooldown by the remaining duration. Hitting a champion with enough strikes shreds their Armor, and the nearest target takes increased damage.`,
    descriptionVi: `Garen xoay kiếm liên tục trong 3 giây, gây sát thương vật lý nhiều lần. Số lần đánh tăng mỗi 4 cấp. Tái kích hoạt sẽ kết thúc Phán Quyết sớm và giảm hồi chiêu theo thời gian còn lại. Tướng bị trúng đủ số lần sẽ bị giảm Giáp, và mục tiêu gần Garen nhất chịu thêm sát thương.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [9, 9, 9, 9],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `AREA_AROUND_SELF_SPIN`,
    },
    scaling: {
      durationSeconds: 3,
      damagePerStrike: {
        values: [13, 17, 21, 25],
        attackDamageRatio: [0.25, 0.3, 0.35, 0.4],
        damageType: `PHYSICAL`,
      },
      baseStrikeCount: 8,
      strikeCountIncreaseEveryLevels: 4,
      maxStrikeCount: 11,
      recastEndsEarly: true,
      cooldownReducedByRemainingDurationOnRecast: true,
      armorShred: {
        requiredChampionHits: 6,
        armorReductionPercent: 10,
        durationSeconds: 4.5,
        refreshesOnHit: true,
      },
      nearestTargetBonusDamagePercent: 20,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [`JUDGMENT`, `SPIN`, `ARMOR_SHRED`, `AREA_DAMAGE`, `PHYSICAL_DAMAGE`],
  },
  // GAREN - R
  {
    championKey: `garen`,
    slot: SkillSlot.R,
    name: `Demacian Justice`,
    nameVi: `Công Lý Demacia`,
    description: `Garen calls forth the might of Demacia to execute an enemy champion, dealing true damage based on the target's missing Health. Nearby enemies also take true damage based on their missing Health. If the cast fails because the target dies, moves out of range, becomes untargetable, or enters stasis or resurrection, the cost is refunded and the ability goes on a short cooldown. Damage against epic monsters is capped.`,
    descriptionVi: `Garen gọi sức mạnh Demacia để kết liễu một tướng địch, gây sát thương chuẩn dựa trên Máu đã mất của mục tiêu. Kẻ địch xung quanh cũng chịu sát thương chuẩn dựa trên Máu đã mất của chúng. Nếu lần dùng thất bại vì mục tiêu chết, rời khỏi tầm, trở nên không thể bị chọn làm mục tiêu, vào trạng thái ngưng đọng hoặc hồi sinh, chi phí được hoàn lại và kỹ năng chuyển sang hồi chiêu ngắn. Sát thương lên quái khủng bị giới hạn.`,
    damageType: DamageType.TRUE_DAMAGE,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [70, 65, 60],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `TARGETED_EXECUTE_AREA_SPLASH`,
    },
    scaling: {
      primaryTargetDamage: {
        values: [150, 250, 350],
        missingHealthDamagePercent: 15,
        missingHealthDamageAttackDamageRatioPercent: 0.12,
        damageType: `TRUE`,
      },
      nearbyEnemyDamage: {
        baseValue: 75,
        missingHealthDamagePercent: 7.5,
        missingHealthDamageAttackDamageRatioPercent: 0.06,
        damageType: `TRUE`,
      },
      failedCastRefundsCost: true,
      failedCastCooldownSeconds: 5,
      failedCastReasons: [
        `TARGET_DIES`,
        `TARGET_OUT_OF_RANGE`,
        `TARGET_UNTARGETABLE`,
        `ZHONYAS_HOURGLASS`,
        `GUARDIAN_ANGEL`,
      ],
      epicMonsterDamageCap: 600,
    },
    effects: [SkillEffect.TRUE_DAMAGE, SkillEffect.EXECUTE],
    tags: [
      `DEMACIAN_JUSTICE`,
      `EXECUTE`,
      `TRUE_DAMAGE`,
      `MISSING_HEALTH_DAMAGE`,
      `AREA_DAMAGE`,
    ],
  },
  // === GNAR ===
  // GNAR - PASSIVE
  {
    championKey: `gnar`,
    slot: SkillSlot.PASSIVE,
    name: `Rage Gene`,
    nameVi: `Gien Cuồng Nộ`,
    description: `Dealing or taking damage generates Rage. At maximum Rage, Gnar's abilities change and his next ability transforms him into Mega Gnar for 15 seconds. Mini Gnar gains Movement Speed, Attack Range, and Attack Speed. Mega Gnar gains Health, Armor, Magic Resist, and Attack Damage. At maximum Rage, Gnar automatically transforms after a delay if he does not use an ability. Rage decays after not dealing or taking damage, and Gnar cannot generate Rage for a duration after transforming back. Mini Gnar and Mega Gnar share all ability cooldowns except Hyper.`,
    descriptionVi: `Gây hoặc nhận sát thương sẽ tạo Cuồng Nộ. Khi đạt tối đa Cuồng Nộ, kỹ năng của Gnar thay đổi và kỹ năng kế tiếp sẽ biến hắn thành Gnar Khổng Lồ trong 15 giây. Gnar Tí Nị nhận Tốc Độ Di Chuyển, Tầm Đánh và Tốc Độ Đánh. Gnar Khổng Lồ nhận Máu, Giáp, Kháng Phép và Sức Mạnh Công Kích. Khi đạt tối đa Cuồng Nộ, Gnar tự động biến hình sau một khoảng trễ nếu không dùng kỹ năng. Cuồng Nộ giảm dần nếu không gây hoặc nhận sát thương, và Gnar không thể tạo Cuồng Nộ trong một thời gian sau khi trở lại dạng Tí Nị. Gnar Tí Nị và Gnar Khổng Lồ dùng chung hồi chiêu kỹ năng, trừ Quá Khích.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      megaGnarDurationSeconds: 15,
      miniGnarBonuses: {
        movementSpeedMax: 20,
        attackRangeMax: 150,
        attackSpeedPercentMax: 90,
      },
      megaGnarBonuses: {
        healthBase: 100,
        healthMax: 850,
        armorBase: 4,
        armorMax: 55,
        magicResistBase: 4,
        magicResistMax: 65,
        attackDamageBase: 8,
        attackDamageMax: 50,
      },
      rageGenerationWindowSeconds: 2,
      rageFromDealingOrTakingDamage: 3,
      rageFromChampionAttack: 2,
      rageFromNonChampionAttack: 1,
      automaticTransformDelayAtMaxRageSeconds: 4,
      rageDecayDelaySeconds: 13,
      postTransformationRageLockoutSeconds: 15,
      sharedCooldownsExcept: [`HYPER`],
    },
    effects: [SkillEffect.SPEED_UP],
    tags: [`RAGE_GENE`, `RAGE`, `TRANSFORMATION`, `MEGA_GNAR`, `MINI_GNAR`],
  },
  // GNAR - Q
  {
    championKey: `gnar`,
    slot: SkillSlot.Q,
    name: `Boomerang Throw / Boulder Toss`,
    nameVi: `Ném Boomerang / Ném Đá`,
    description: `Mini Gnar throws a boomerang that deals physical damage and slows enemies. The boomerang returns after hitting a target, deals reduced damage to subsequent enemies, and catching it reduces the cooldown. Mega Gnar throws a boulder that damages and slows the target hit and nearby enemies. Picking up the boulder reduces the cooldown. Boomerang hits generate Rage.`,
    descriptionVi: `Gnar Tí Nị ném boomerang gây sát thương vật lý và làm chậm kẻ địch. Boomerang quay lại sau khi trúng mục tiêu, gây giảm sát thương lên các kẻ địch tiếp theo, và bắt lại boomerang sẽ giảm hồi chiêu. Gnar Khổng Lồ ném đá gây sát thương và làm chậm mục tiêu trúng phải cùng kẻ địch xung quanh. Nhặt lại tảng đá sẽ giảm hồi chiêu. Boomerang trúng mục tiêu sẽ tạo Cuồng Nộ.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [16, 14, 12, 10],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `RETURNING_PROJECTILE_OR_BOULDER`,
    },
    scaling: {
      miniGnar: {
        damage: {
          values: [5, 55, 105, 155],
          attackDamageRatio: 1.25,
          damageType: `PHYSICAL`,
        },
        slowPercent: [20, 25, 30, 35],
        slowDurationSeconds: 2,
        returnsAfterHittingTarget: true,
        subsequentEnemyDamageMultiplier: 0.5,
        eachEnemyCanOnlyBeHitOnce: true,
        cooldownReductionOnCatchPercent: 40,
        rageOnChampionHit: 1,
        rageOnNonChampionHit: 1,
        onlyFirstHitOnEachTargetGeneratesRage: true,
      },
      megaGnar: {
        damage: {
          values: [40, 95, 150, 205],
          attackDamageRatio: 1.4,
          damageType: `PHYSICAL`,
        },
        slowPercent: [35, 40, 45, 50],
        slowDurationSeconds: 2,
        areaSlow: true,
        pickupWindowSeconds: 5,
        cooldownReductionOnPickupPercent: 70,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `BOOMERANG_THROW`,
      `BOULDER_TOSS`,
      `RETURNING_PROJECTILE`,
      `RAGE`,
      `SLOW`,
    ],
  },
  // GNAR - W
  {
    championKey: `gnar`,
    slot: SkillSlot.W,
    name: `Hyper / Wallop`,
    nameVi: `Quá Khích / Đập Phá`,
    description: `Mini Gnar Passive: Every third attack or ability on the same enemy deals bonus magic damage plus maximum Health magic damage and grants decaying Movement Speed. Mini Gnar Active: Gains Attack Speed. Mega Gnar smashes the area in front of him, dealing physical damage and stunning enemies. Upon leaving Mega Gnar form, Gnar gains Hyper's passive Movement Speed bonus.`,
    descriptionVi: `Gnar Tí Nị Nội tại: Mỗi đòn đánh hoặc kỹ năng thứ ba lên cùng một kẻ địch gây thêm sát thương phép cộng sát thương phép theo Máu tối đa và cho Tốc Độ Di Chuyển giảm dần. Gnar Tí Nị Kích hoạt: Nhận Tốc Độ Đánh. Gnar Khổng Lồ đập xuống vùng phía trước, gây sát thương vật lý và làm choáng kẻ địch. Khi rời dạng Gnar Khổng Lồ, Gnar nhận Tốc Độ Di Chuyển từ nội tại Quá Khích.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [20, 19, 18, 17],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `THREE_HIT_PASSIVE_OR_FRONT_AREA_SMASH`,
    },
    scaling: {
      miniGnarPassive: {
        requiredHits: 3,
        bonusMagicDamage: {
          values: [10, 20, 30, 40],
          abilityPowerRatio: 1,
          damageType: `MAGIC`,
        },
        maxHealthMagicDamagePercent: [6, 8, 10, 12],
        movementSpeedPercent: 20,
        movementSpeedDecayDurationSeconds: 3,
        monsterDamageCap: 300,
      },
      miniGnarActive: {
        attackSpeedPercent: [35, 40, 45, 50],
        durationSeconds: 6,
      },
      megaGnar: {
        damage: {
          values: [45, 85, 125, 165],
          attackDamageRatio: 1,
          damageType: `PHYSICAL`,
        },
        stunDurationSeconds: 1.25,
        grantsHyperMovementSpeedOnLeavingMegaGnar: true,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP, SkillEffect.STUN],
    tags: [
      `HYPER`,
      `WALLOP`,
      `THREE_HIT_PASSIVE`,
      `PERCENT_HEALTH_DAMAGE`,
      `STUN`,
    ],
  },
  // GNAR - E
  {
    championKey: `gnar`,
    slot: SkillSlot.E,
    name: `Hop / Crunch`,
    nameVi: `Nhún Nhảy / Nghiền Nát`,
    description: `Mini Gnar leaps to a location. If he lands on a unit, he bounces farther in the same direction, dealing physical damage and briefly slowing enemy units he lands on. Mega Gnar leaps to a location, dealing physical damage to nearby enemies on landing and briefly slowing enemies he lands directly on. If Hop transforms Gnar into Mega Gnar, Mega Gnar also bounces off the unit he lands on and travels farther.`,
    descriptionVi: `Gnar Tí Nị nhảy tới vị trí chỉ định. Nếu đáp lên một đơn vị, hắn bật xa hơn theo cùng hướng, gây sát thương vật lý và làm chậm ngắn kẻ địch bị đáp trúng. Gnar Khổng Lồ nhảy tới vị trí chỉ định, gây sát thương vật lý lên kẻ địch xung quanh khi đáp xuống và làm chậm ngắn kẻ địch bị đáp trực tiếp. Nếu Nhún Nhảy biến Gnar thành Gnar Khổng Lồ, Gnar Khổng Lồ cũng sẽ bật khỏi đơn vị bị đáp trúng và bay xa hơn.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.AREA,
    cooldown: {
      values: [21, 18, 15, 12],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `LEAP_BOUNCE_OR_AREA_LEAP`,
    },
    scaling: {
      miniGnar: {
        damage: {
          values: [50, 95, 140, 185],
          maxHealthRatio: 0.06,
          damageType: `PHYSICAL`,
        },
        bouncesOnUnit: true,
        travelsFurtherAfterBounce: true,
        enemyLandedOnSlowPercent: 80,
        slowDuration: `brief`,
      },
      megaGnar: {
        damage: {
          values: [80, 125, 170, 215],
          maxHealthRatio: 0.06,
          damageType: `PHYSICAL`,
        },
        areaDamageOnLanding: true,
        directLandingSlowPercent: 80,
        slowDuration: `brief`,
      },
      transformationCastBounce: {
        megaGnarBouncesIfHopTransforms: true,
        travelsFurtherAfterBounce: true,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH, SkillEffect.SLOW],
    tags: [`HOP`, `CRUNCH`, `BOUNCE`, `DASH`, `TRANSFORMATION`],
  },
  // GNAR - R
  {
    championKey: `gnar`,
    slot: SkillSlot.R,
    name: `GNAR!`,
    nameVi: `GNAR!`,
    description: `Mini Gnar Passive: Hyper's Movement Speed bonus is increased. Mega Gnar knocks back enemies around him, dealing physical damage and slowing them. Enemies knocked into a wall take increased damage and are stunned instead of slowed.`,
    descriptionVi: `Gnar Tí Nị Nội tại: Tốc Độ Di Chuyển từ Quá Khích được tăng cường. Gnar Khổng Lồ đẩy lùi kẻ địch xung quanh, gây sát thương vật lý và làm chậm chúng. Kẻ địch bị đẩy vào tường chịu thêm sát thương và bị làm choáng thay vì bị làm chậm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [60, 45, 30],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `AREA_KNOCKBACK_WALL_STUN`,
    },
    scaling: {
      miniGnarPassive: {
        hyperMovementSpeedPercent: [35, 50, 65],
      },
      megaGnar: {
        damage: {
          values: [200, 300, 400],
          bonusAttackDamageRatio: 0.5,
          abilityPowerRatio: 1,
          damageType: `PHYSICAL`,
        },
        slowPercent: 45,
        slowDurationSeconds: [1.25, 1.5, 1.75],
        knocksBackEnemiesAroundGnar: true,
        wallCollisionDamageIncreasePercent: 50,
        wallCollisionStunsInsteadOfSlows: true,
      },
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.KNOCK_BACK,
      SkillEffect.SLOW,
      SkillEffect.STUN,
    ],
    tags: [`GNAR_ULTIMATE`, `KNOCK_BACK`, `WALL_STUN`, `AREA_CC`, `TEAMFIGHT`],
  },
  // === GRAGAS ===
  // GRAGAS - PASSIVE
  {
    championKey: `gragas`,
    slot: SkillSlot.PASSIVE,
    name: `Happy Hour`,
    nameVi: `Giờ Khuyến Mãi`,
    description: `Casting an ability restores Health to Gragas based on his maximum Health.`,
    descriptionVi: `Dùng kỹ năng sẽ hồi Máu cho Gragas dựa trên Máu tối đa của hắn.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      heal: {
        baseValue: 46,
        maxHealthRatio: 0.085,
      },
      triggersOnAbilityCast: true,
    },
    effects: [SkillEffect.HEAL],
    tags: [`HAPPY_HOUR`, `HEALING`, `HEALTH_SCALING`, `SUSTAIN`],
  },
  // GRAGAS - Q
  {
    championKey: `gragas`,
    slot: SkillSlot.Q,
    name: `Barrel Roll`,
    nameVi: `Lăn Thùng Rượu`,
    description: `Gragas rolls a cask to a target location that explodes when recast or after 3 seconds, dealing magic damage and slowing enemies hit. The damage and slow increase over the first 1.5 seconds. The cask reveals the area and deals reduced damage to minions.`,
    descriptionVi: `Gragas lăn một thùng rượu tới vị trí chỉ định, phát nổ khi tái kích hoạt hoặc sau 3 giây, gây sát thương phép và làm chậm kẻ địch trúng phải. Sát thương và mức làm chậm tăng dần trong 1.5 giây đầu. Thùng rượu làm lộ khu vực và gây giảm sát thương lên lính.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [65, 70, 75, 80],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_AREA_CASK`,
    },
    scaling: {
      damage: {
        values: [65, 120, 175, 230],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      slowPercent: [30, 35, 40, 45],
      slowDurationSeconds: 2,
      autoExplodeDelaySeconds: 3,
      canRecastToExplode: true,
      chargeUpDurationSeconds: 1.5,
      maxDamageAndSlowIncreasePercent: 150,
      revealsArea: true,
      minionDamageMultiplier: 0.8,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`BARREL_ROLL`, `MAGIC_DAMAGE`, `SLOW`, `ZONE_CONTROL`, `REVEAL`],
  },
  // GRAGAS - W
  {
    championKey: `gragas`,
    slot: SkillSlot.W,
    name: `Drunken Rage`,
    nameVi: `Say Quá Hóa Cuồng`,
    description: `Gragas reduces incoming damage for a short duration. His next attack within 5 seconds after drinking is empowered to splash enemies, dealing bonus magic damage plus maximum Health magic damage.`,
    descriptionVi: `Gragas giảm sát thương nhận vào trong thời gian ngắn. Đòn đánh kế tiếp trong vòng 5 giây sau khi uống rượu được cường hóa để gây sát thương lan, gây thêm sát thương phép cộng sát thương phép theo Máu tối đa.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [5, 5, 5, 5],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `EMPOWERED_ATTACK_SPLASH`,
    },
    scaling: {
      damageReductionPercent: [11, 13, 15, 17],
      damageReductionAbilityPowerRatioPercent: 0.04,
      damageReductionDurationSeconds: 2.5,
      empoweredAttackWindowSeconds: 5,
      empoweredAttackDamage: {
        values: [35, 70, 105, 140],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      maxHealthMagicDamagePercent: 8,
      splashDamage: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.EMPOWERED_ATTACK],
    tags: [
      `DRUNKEN_RAGE`,
      `DAMAGE_REDUCTION`,
      `EMPOWERED_ATTACK`,
      `PERCENT_HEALTH_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },
  // GRAGAS - E
  {
    championKey: `gragas`,
    slot: SkillSlot.E,
    name: `Body Slam`,
    nameVi: `Lấy Thịt Đè Người`,
    description: `Gragas charges forward, colliding with the first enemy hit to deal magic damage to nearby enemies. Enemies hit are bumped backwards and stunned. Body Slam's cooldown is reduced if it successfully collides with an enemy.`,
    descriptionVi: `Gragas lao về phía trước, va vào kẻ địch đầu tiên trúng phải để gây sát thương phép lên kẻ địch gần đó. Kẻ địch trúng chiêu bị đẩy lùi và làm choáng. Hồi chiêu của Lấy Thịt Đè Người được giảm nếu va chạm thành công với kẻ địch.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [15, 14, 13, 12],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `FORWARD_DASH_COLLISION`,
    },
    scaling: {
      damage: {
        values: [70, 135, 200, 265],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      collidesWithFirstEnemyHit: true,
      areaDamageAroundCollision: true,
      knockBackOnHit: true,
      stunDurationSeconds: 1,
      cooldownReductionOnEnemyCollisionSeconds: 3,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.DASH,
      SkillEffect.KNOCK_BACK,
      SkillEffect.STUN,
    ],
    tags: [`BODY_SLAM`, `COLLISION_DASH`, `KNOCK_BACK`, `STUN`, `ENGAGE`],
  },
  // GRAGAS - R
  {
    championKey: `gragas`,
    slot: SkillSlot.R,
    name: `Explosive Cask`,
    nameVi: `Thùng Rượu Nổ`,
    description: `Gragas hurls a potent cask that explodes when it lands, dealing magic damage and knocking enemies away from the explosion's center. The cask has a fixed travel time.`,
    descriptionVi: `Gragas ném một thùng rượu cực mạnh phát nổ khi đáp xuống, gây sát thương phép và đẩy lùi kẻ địch khỏi tâm vụ nổ. Thùng rượu có thời gian bay cố định.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [85, 70, 55],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_AREA_DISPLACEMENT_CASK`,
    },
    scaling: {
      damage: {
        values: [200, 300, 400],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      knocksEnemiesAwayFromExplosionCenter: true,
      fixedTravelTime: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_BACK],
    tags: [
      `EXPLOSIVE_CASK`,
      `MAGIC_DAMAGE`,
      `KNOCK_BACK`,
      `DISENGAGE`,
      `PICK_POTENTIAL`,
    ],
  },
  // === GRAVES ===
  // GRAVES - PASSIVE
  {
    championKey: `graves`,
    slot: SkillSlot.PASSIVE,
    name: `New Destiny`,
    nameVi: `Vận Mệnh Thay Đổi`,
    description: `Graves' shotgun has unique properties. He must reload when out of ammo, with Attack Speed reducing reload time slightly and time between attacks significantly. His attacks fire multiple bullets that deal physical damage, with additional bullets adding damage. Critical strikes fire more bullets with increased damage. Structures take reduced damage. Bullets cannot pass through enemy units, and non-champions hit by multiple bullets are knocked back slightly.`,
    descriptionVi: `Súng shotgun của Graves có cơ chế đặc biệt. Hắn phải nạp đạn khi hết đạn, với Tốc Độ Đánh giảm nhẹ thời gian nạp đạn và giảm mạnh thời gian giữa các đòn đánh. Đòn đánh bắn ra nhiều viên đạn gây sát thương vật lý, các viên đạn phụ gây thêm sát thương. Đòn chí mạng bắn nhiều viên hơn với sát thương tăng. Công trình chịu giảm sát thương. Đạn không thể xuyên qua đơn vị địch, và mục tiêu không phải tướng trúng nhiều viên bị đẩy lùi nhẹ.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: {
      type: `SHOTGUN_BASIC_ATTACK`,
    },
    scaling: {
      doubleBarrel: {
        mustReloadWhenOutOfAmmo: true,
        attackSpeedReducesReloadTimeSlightly: true,
        attackSpeedReducesTimeBetweenAttacksSignificantly: true,
      },
      twelveGauge: {
        baseBulletCount: 4,
        damagePerAttackDamageRatio: 0.72,
        additionalBulletDamageRatio: 0.24,
        criticalStrikeBulletCount: 6,
        criticalStrikeBulletDamagePercent: 130,
        criticalStrikeAdditionalBulletDamageIncreasePercent: 30,
        structureDamageMultiplier: 0.75,
      },
      buckshot: {
        bulletsBlockedByEnemyUnits: true,
        nonChampionMultiBulletKnockBack: true,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_BACK],
    tags: [`NEW_DESTINY`, `SHOTGUN`, `RELOAD`, `PHYSICAL_DAMAGE`, `KNOCK_BACK`],
  },
  // GRAVES - Q
  {
    championKey: `graves`,
    slot: SkillSlot.Q,
    name: `End of the Line`,
    nameVi: `Đạn Xuyên Mục Tiêu`,
    description: `Graves fires a powder round that deals physical damage, then detonates after a delay to deal additional physical damage. If the round hits terrain, it detonates much faster. Deals increased damage against monsters.`,
    descriptionVi: `Graves bắn ra một viên đạn thuốc súng gây sát thương vật lý, sau đó phát nổ sau một khoảng trễ để gây thêm sát thương vật lý. Nếu viên đạn va vào địa hình, nó phát nổ nhanh hơn nhiều. Gây thêm sát thương lên quái.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [65, 70, 75, 80],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE_DELAYED_DETONATION`,
    },
    scaling: {
      initialDamage: {
        values: [70, 90, 110, 130],
        attackDamageRatio: 0.8,
        damageType: `PHYSICAL`,
      },
      detonationDamage: {
        values: [80, 130, 180, 230],
        attackDamageRatio: [1.1, 1.3, 1.5, 1.7],
        damageType: `PHYSICAL`,
      },
      detonationDelaySeconds: 1,
      terrainHitDetonationDelaySeconds: 0.25,
      monsterDamageMultiplier: 1.1,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `PIERCING_PROJECTILE`,
      `PHYSICAL_DAMAGE`,
      `DELAYED_DETONATION`,
      `TERRAIN_INTERACTION`,
      `JUNGLE_CLEAR`,
    ],
  },
  // GRAVES - W
  {
    championKey: `graves`,
    slot: SkillSlot.W,
    name: `Smoke Screen`,
    nameVi: `Bom Mù`,
    description: `Graves throws a canister that creates a smoke cloud for 4 seconds. Enemies inside the smoke cannot see outside of it. Enemies caught in the initial impact take magic damage and are briefly slowed.`,
    descriptionVi: `Graves ném một ống khói tạo ra vùng khói trong 4 giây. Kẻ địch bên trong vùng khói không thể nhìn ra bên ngoài. Kẻ địch trúng va chạm ban đầu chịu sát thương phép và bị làm chậm trong thoáng chốc.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [20, 18, 16, 14],
      unit: `seconds`,
    },
    cost: {
      values: [75, 80, 85, 90],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_SMOKE_CLOUD`,
    },
    scaling: {
      smokeCloudDurationSeconds: 4,
      enemiesInsideCannotSeeOutside: true,
      initialImpactDamage: {
        values: [60, 125, 190, 255],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      initialImpactSlowPercent: 50,
      initialImpactSlowDurationSeconds: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `SMOKE_SCREEN`,
      `VISION_DENIAL`,
      `MAGIC_DAMAGE`,
      `SLOW`,
      `ZONE_CONTROL`,
    ],
  },
  // GRAVES - E
  {
    championKey: `graves`,
    slot: SkillSlot.E,
    name: `Quickdraw`,
    nameVi: `Rút Súng Nhanh`,
    description: `Graves dashes in a direction, reloads one shell, and gains True Grit for 4 seconds. True Grit grants Armor, stacks multiple times, and refreshes when damaging non-minions. Dashing toward an enemy champion grants extra True Grit stacks. Each bullet hit reduces Quickdraw's cooldown.`,
    descriptionVi: `Graves lướt theo hướng chỉ định, nạp lại một viên đạn và nhận Lì Đòn trong 4 giây. Lì Đòn cho Giáp, cộng dồn nhiều lần và được làm mới khi gây sát thương lên mục tiêu không phải lính. Lướt về phía tướng địch cho thêm cộng dồn Lì Đòn. Mỗi viên đạn trúng đích sẽ giảm hồi chiêu Rút Súng Nhanh.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [13, 13, 13, 13],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `MANA`,
    },
    range: {
      type: `DIRECTIONAL_DASH`,
    },
    scaling: {
      reloadsShellCount: 1,
      trueGrit: {
        durationSeconds: 4,
        armorPerStack: [13, 18, 23, 28],
        maxStacks: 6,
        refreshesWhenDamagingNonMinions: true,
      },
      dashingTowardEnemyChampionTrueGritStacks: 2,
      cooldownReductionPerBulletHitSeconds: 0.5,
    },
    effects: [SkillEffect.DASH],
    tags: [`QUICKDRAW`, `DASH`, `RELOAD`, `TRUE_GRIT`, `BONUS_ARMOR`],
  },
  // GRAVES - R
  {
    championKey: `graves`,
    slot: SkillSlot.R,
    name: `Collateral Damage`,
    nameVi: `Đạn Nổ Thần Công`,
    description: `Graves fires an explosive shell that deals physical damage and knocks himself back from recoil. The shell explodes when it hits an enemy champion or reaches the end of its range, dealing physical damage in a cone. Enemies damaged by the initial impact do not take damage from the explosive cone.`,
    descriptionVi: `Graves bắn ra một viên đạn nổ gây sát thương vật lý và đẩy lùi bản thân do lực giật. Viên đạn phát nổ khi trúng tướng địch hoặc đạt tầm tối đa, gây sát thương vật lý theo hình nón. Kẻ địch đã chịu sát thương từ va chạm ban đầu sẽ không chịu sát thương từ vùng nổ hình nón.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [75, 60, 45],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LINE_PROJECTILE_EXPLODING_CONE`,
    },
    scaling: {
      initialImpactDamage: {
        values: [300, 450, 600],
        attackDamageRatio: 1.5,
        damageType: `PHYSICAL`,
      },
      recoilKnocksGravesBack: true,
      explosionTriggers: [`ENEMY_CHAMPION_HIT`, `END_OF_RANGE`],
      coneExplosionDamage: {
        values: [200, 320, 440],
        attackDamageRatio: 1.2,
        damageType: `PHYSICAL`,
      },
      initialImpactTargetsDoNotTakeConeDamage: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_BACK],
    tags: [
      `COLLATERAL_DAMAGE`,
      `PHYSICAL_DAMAGE`,
      `RECOIL`,
      `CONE_DAMAGE`,
      `BURST_DAMAGE`,
    ],
  },
  // === GWEN ===
  // GWEN - PASSIVE
  {
    championKey: `gwen`,
    slot: SkillSlot.PASSIVE,
    name: `Thousand Cuts`,
    nameVi: `Ngàn Nhát Cắt`,
    description: `Gwen's attacks deal bonus magic damage based on the target's maximum Health. Gwen heals for a portion of the damage this ability deals to champions, up to a cap. Against monsters, the damage is capped.`,
    descriptionVi: `Đòn đánh của Gwen gây thêm sát thương phép dựa trên Máu tối đa của mục tiêu. Gwen hồi máu theo một phần sát thương kỹ năng này gây lên tướng, tối đa tới một giới hạn. Với quái, sát thương bị giới hạn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      maxHealthMagicDamagePercent: {
        basePercent: 1,
        abilityPowerRatioPercent: 0.005,
      },
      championHealingFromDamagePercent: 70,
      championHealingCap: {
        baseValue: 12,
        abilityPowerRatio: 0.07,
      },
      monsterDamageCap: {
        baseValue: 2,
        abilityPowerRatio: 0.03,
        damageType: `MAGIC`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL],
    tags: [
      `THOUSAND_CUTS`,
      `MAGIC_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `HEALING`,
      `ON_HIT_EFFECTS`,
    ],
  },
  // GWEN - Q
  {
    championKey: `gwen`,
    slot: SkillSlot.Q,
    name: `Snip Snip!`,
    nameVi: `Xoẹt Xoẹt!`,
    description: `Passive: Gwen gains a stack when her attacks hit, up to 4 stacks. Active: Gwen snips twice, plus one additional time for each stack consumed. Each snip deals magic damage, with the final snip dealing higher magic damage. The center of each strike deals true damage instead and applies Thousand Cuts. Deals increased damage to monsters.`,
    descriptionVi: `Nội tại: Gwen nhận một cộng dồn khi đòn đánh trúng mục tiêu, tối đa 4 cộng dồn. Kích hoạt: Gwen cắt hai lần, cộng thêm một lần với mỗi cộng dồn tiêu thụ. Mỗi nhát cắt gây sát thương phép, nhát cắt cuối gây sát thương phép cao hơn. Phần trung tâm của mỗi nhát cắt gây sát thương chuẩn thay thế và áp dụng Ngàn Nhát Cắt. Gây thêm sát thương lên quái.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [6, 5, 4, 3],
      unit: `seconds`,
    },
    cost: {
      values: [35, 35, 35, 35],
      resource: `MANA`,
    },
    range: {
      type: `CONE_SNIPS_CENTER_TRUE_DAMAGE`,
    },
    scaling: {
      passiveStacks: {
        stackGainOnAttackHit: 1,
        maxStacks: 4,
        durationSeconds: 6,
      },
      baseSnipCount: 2,
      additionalSnipPerStackConsumed: 1,
      damagePerSnip: {
        values: [14, 18, 22, 26],
        abilityPowerRatio: 0.07,
        damageType: `MAGIC`,
      },
      finalSnipDamage: {
        values: [70, 90, 110, 130],
        abilityPowerRatio: 0.35,
        damageType: `MAGIC`,
      },
      centerDealsTrueDamageInstead: true,
      centerAppliesThousandCuts: true,
      monsterDamageMultiplier: 1.05,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.TRUE_DAMAGE],
    tags: [
      `SNIP_SNIP`,
      `STACK_CONSUME`,
      `TRUE_DAMAGE`,
      `THOUSAND_CUTS`,
      `MAGIC_DAMAGE`,
    ],
  },
  // GWEN - W
  {
    championKey: `gwen`,
    slot: SkillSlot.W,
    name: `Hallowed Mist`,
    nameVi: `Sương Lam Bất Bại`,
    description: `Gwen summons the Hallowed Mist for 4 seconds, making herself untargetable to enemies outside the zone while she is inside. Gwen gains Armor and Magic Resist while inside the Mist. The Mist moves to Gwen the first time she attempts to leave.`,
    descriptionVi: `Gwen triệu hồi Sương Lam trong 4 giây, khiến cô không thể bị kẻ địch bên ngoài vùng chọn làm mục tiêu khi cô ở bên trong. Gwen nhận Giáp và Kháng Phép khi ở trong Sương Lam. Sương Lam sẽ di chuyển theo Gwen lần đầu tiên cô cố rời khỏi vùng.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [17, 16, 15, 14],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `SELF_CENTERED_PROTECTIVE_ZONE`,
    },
    scaling: {
      mistDurationSeconds: 4,
      untargetableToEnemiesOutsideZoneWhileInside: true,
      armorAndMagicResistInsideMist: {
        values: [18, 20, 22, 24],
        abilityPowerRatio: 0.05,
      },
      mistMovesToGwenFirstTimeSheAttemptsToLeave: true,
    },
    effects: [],
    tags: [
      `HALLOWED_MIST`,
      `UNTARGETABLE`,
      `BONUS_RESISTANCES`,
      `ZONE_CONTROL`,
      `PROTECTION`,
    ],
  },
  // GWEN - E
  {
    championKey: `gwen`,
    slot: SkillSlot.E,
    name: `Skip 'n Slash`,
    nameVi: `Xén Xén`,
    description: `Gwen dashes and enhances her attacks for 4 seconds. Enhanced attacks gain Attack Speed, bonus magic damage on-hit, and bonus range. The first enhanced attack to hit a champion or minion refunds part of the cooldown.`,
    descriptionVi: `Gwen lướt và cường hóa đòn đánh trong 4 giây. Đòn đánh cường hóa nhận Tốc Độ Đánh, sát thương phép cộng thêm trên đòn đánh và thêm tầm đánh. Đòn đánh cường hóa đầu tiên trúng tướng hoặc lính sẽ hoàn lại một phần hồi chiêu.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.SELF,
    cooldown: {
      values: [13, 12, 10, 9],
      unit: `seconds`,
    },
    cost: {
      values: [35, 35, 35, 35],
      resource: `MANA`,
    },
    range: {
      type: `DASH_AND_ENHANCED_ATTACKS`,
    },
    scaling: {
      enhancedAttackDurationSeconds: 4,
      attackSpeedPercent: [20, 40, 60, 80],
      onHitMagicDamage: {
        baseValue: 10,
        abilityPowerRatio: 0.18,
        damageType: `MAGIC`,
      },
      bonusAttackRange: 100,
      cooldownRefundOnFirstEnhancedHitChampionOrMinionRatio: 0.5,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.DASH,
      SkillEffect.EMPOWERED_ATTACK,
    ],
    tags: [
      `SKIP_N_SLASH`,
      `DASH`,
      `EMPOWERED_ATTACK`,
      `ATTACK_SPEED_STEROID`,
      `ON_HIT_EFFECTS`,
    ],
  },
  // GWEN - R
  {
    championKey: `gwen`,
    slot: SkillSlot.R,
    name: `Needlework`,
    nameVi: `Xe Chỉ Luồn Kim`,
    description: `First Cast: Gwen hurls a needle that deals magic damage, slows enemies, and applies Thousand Cuts to all enemies hit. Needlework can be recast two additional times. Second Cast fires 3 needles for total magic damage. Third Cast fires 5 needles for higher total magic damage.`,
    descriptionVi: `Lần dùng đầu: Gwen phóng một cây kim gây sát thương phép, làm chậm kẻ địch và áp dụng Ngàn Nhát Cắt lên toàn bộ kẻ địch trúng phải. Xe Chỉ Luồn Kim có thể tái kích hoạt thêm hai lần. Lần dùng thứ hai phóng 3 cây kim gây tổng sát thương phép. Lần dùng thứ ba phóng 5 cây kim gây tổng sát thương phép cao hơn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [75, 65, 55],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LINE_NEEDLE_PROJECTILES_MULTI_CAST`,
    },
    scaling: {
      firstCast: {
        needleCount: 1,
        damage: {
          values: [35, 50, 65],
          abilityPowerRatio: 0.1,
          damageType: `MAGIC`,
        },
        slowPercent: [35, 40, 45],
        slowDurationSeconds: 1.5,
        appliesThousandCutsToEnemiesHit: true,
      },
      secondCast: {
        needleCount: 3,
        totalDamage: {
          values: [90, 135, 180],
          abilityPowerRatio: 0.24,
          damageType: `MAGIC`,
        },
      },
      thirdCast: {
        needleCount: 5,
        totalDamage: {
          values: [150, 225, 300],
          abilityPowerRatio: 0.4,
          damageType: `MAGIC`,
        },
      },
      additionalRecasts: 2,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`NEEDLEWORK`, `MULTI_CAST`, `MAGIC_DAMAGE`, `SLOW`, `THOUSAND_CUTS`],
  },
  // === HECARIM ===
  // HECARIM - PASSIVE
  {
    championKey: `hecarim`,
    slot: SkillSlot.PASSIVE,
    name: `Warpath`,
    nameVi: `Đường Ra Trận`,
    description: `Hecarim gains Attack Damage based on his bonus Movement Speed.`,
    descriptionVi: `Hecarim nhận Sức Mạnh Công Kích dựa trên Tốc Độ Di Chuyển cộng thêm của hắn.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      bonusMovementSpeedToAttackDamageRatio: 0.12,
    },
    effects: [],
    tags: [
      `WARPATH`,
      `MOVEMENT_SPEED_SCALING`,
      `BONUS_ATTACK_DAMAGE`,
      `MOBILITY`,
    ],
  },
  // HECARIM - Q
  {
    championKey: `hecarim`,
    slot: SkillSlot.Q,
    name: `Rampage`,
    nameVi: `Càn Quét`,
    description: `Hecarim charges his halberd, increasing the area of damage. When fully charged, Rampage automatically casts and deals physical damage. If Hecarim hits an enemy champion or large monster with a full charge, he critically strikes them, gains decaying Movement Speed, and empowers his next Rampage within a short duration to deal increased damage.`,
    descriptionVi: `Hecarim vận sức với cây kích, tăng vùng gây sát thương. Khi vận đủ, Càn Quét tự động tung ra và gây sát thương vật lý. Nếu Hecarim đánh trúng tướng địch hoặc quái lớn bằng lần vận đủ, hắn gây chí mạng lên chúng, nhận Tốc Độ Di Chuyển giảm dần và cường hóa lần Càn Quét kế tiếp trong thời gian ngắn để gây thêm sát thương.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [5, 4, 4, 3],
      unit: `seconds`,
    },
    cost: {
      values: [28, 32, 36, 40],
      resource: `MANA`,
    },
    range: {
      type: `CHARGED_AREA_AROUND_SELF`,
    },
    scaling: {
      chargeDurationSeconds: 0.75,
      areaIncreasesWhileCharging: true,
      automaticallyCastsWhenFullyCharged: true,
      damage: {
        values: [5, 15, 25, 35],
        attackDamageRatio: 1.1,
        damageType: `PHYSICAL`,
      },
      fullChargeBonus: {
        validTargets: [`CHAMPION`, `LARGE_MONSTER`],
        criticalDamagePercent: 120,
        movementSpeedPercent: 30,
        movementSpeedDecayDurationSeconds: 3,
        empowersNextRampageWithinSeconds: 8,
        empoweredRampageDamagePercent: 120,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP],
    tags: [
      `RAMPAGE`,
      `CHARGE`,
      `PHYSICAL_DAMAGE`,
      `MOVEMENT_SPEED`,
      `CRITICAL_STRIKE`,
    ],
  },
  // HECARIM - W
  {
    championKey: `hecarim`,
    slot: SkillSlot.W,
    name: `Spirit of Dread`,
    nameVi: `Nhiếp Hồn Trận`,
    description: `Hecarim gains Armor and Magic Resist and deals magic damage to nearby enemies periodically for 4 seconds. For every enemy hit, he heals based on bonus Health. Damaging enemies also restores Health based on damage dealt and bonus Attack Damage. Healing from minions and monsters is reduced and capped.`,
    descriptionVi: `Hecarim nhận Giáp và Kháng Phép, đồng thời gây sát thương phép định kỳ lên kẻ địch xung quanh trong 4 giây. Với mỗi kẻ địch trúng chiêu, hắn hồi máu dựa trên Máu cộng thêm. Gây sát thương lên kẻ địch cũng hồi Máu dựa trên sát thương gây ra và Sức Mạnh Công Kích cộng thêm. Hồi máu từ lính và quái bị giảm và có giới hạn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [16, 15, 14, 13],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `MANA`,
    },
    range: {
      type: `AREA_AROUND_SELF_AURA`,
    },
    scaling: {
      armorAndMagicResist: [6, 12, 18, 24],
      durationSeconds: 4,
      tickIntervalSeconds: 0.5,
      damagePerTick: {
        values: [12, 18, 24, 30],
        abilityPowerRatio: 0.2,
        damageType: `MAGIC`,
      },
      healPerEnemyHit: {
        baseValue: 5,
        bonusHealthRatio: 0.01,
      },
      healingFromDamageDealtPercent: 20,
      healingFromDamageDealtBonusAttackDamageRatioPercent: 0.02,
      minionAndMonsterHealingMultiplier: 0.5,
      minionAndMonsterHealingCap: 90,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL],
    tags: [
      `SPIRIT_OF_DREAD`,
      `BONUS_RESISTANCES`,
      `AREA_DAMAGE`,
      `HEALING`,
      `SUSTAIN`,
    ],
  },
  // HECARIM - E
  {
    championKey: `hecarim`,
    slot: SkillSlot.E,
    name: `Devastating Charge`,
    nameVi: `Vó Ngựa Hủy Diệt`,
    description: `Hecarim gains Movement Speed that ramps up over 4 seconds. His next attack within 5 seconds causes him to dash toward the enemy, deal physical damage, knock them back, and pursue the knocked back target. The remaining duration is paused during Onslaught of Shadows.`,
    descriptionVi: `Hecarim nhận Tốc Độ Di Chuyển tăng dần trong 4 giây. Đòn đánh kế tiếp trong vòng 5 giây khiến hắn lao tới kẻ địch, gây sát thương vật lý, đẩy lùi mục tiêu và tiếp tục truy đuổi mục tiêu bị đẩy. Thời gian còn lại của kỹ năng được tạm dừng trong lúc Bóng Ma Kị Sĩ đang diễn ra.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [18, 17, 16, 15],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `MOVEMENT_SPEED_CHARGE_EMPOWERED_DASH_ATTACK`,
    },
    scaling: {
      startingMovementSpeedPercent: 25,
      maximumMovementSpeedPercent: 55,
      rampDurationSeconds: 4,
      empoweredAttackWindowSeconds: 5,
      empoweredAttackDamage: {
        values: [5, 10, 15, 20],
        bonusAttackDamageRatio: 0.3,
        damageType: `PHYSICAL`,
      },
      dashesToEnemyOnEmpoweredAttack: true,
      knocksBackTarget: true,
      pursuesKnockedBackEnemy: true,
      remainingDurationPausedDuringOnslaughtOfShadows: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.SPEED_UP,
      SkillEffect.DASH,
      SkillEffect.KNOCK_BACK,
    ],
    tags: [
      `DEVASTATING_CHARGE`,
      `MOVEMENT_SPEED`,
      `DASH`,
      `KNOCK_BACK`,
      `ENGAGE`,
    ],
  },
  // HECARIM - R
  {
    championKey: `hecarim`,
    slot: SkillSlot.R,
    name: `Onslaught of Shadows`,
    nameVi: `Bóng Ma Kị Sĩ`,
    description: `Hecarim summons spectral riders and charges forward, dealing magic damage. At the end of the charge, he unleashes a shockwave that fears enemies, with fear duration increasing based on charge distance.`,
    descriptionVi: `Hecarim triệu hồi các kị sĩ bóng ma và lao tới phía trước, gây sát thương phép. Ở cuối đường lao, hắn giải phóng một luồng sóng xung kích khiến kẻ địch hoảng sợ, với thời gian hoảng sợ tăng theo quãng đường lao.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [100, 85, 70],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LONG_RANGE_CHARGE_SHOCKWAVE`,
    },
    scaling: {
      damage: {
        values: [150, 250, 350],
        abilityPowerRatio: 1,
        damageType: `MAGIC`,
      },
      summonsSpectralRiders: true,
      shockwaveAtEndOfCharge: true,
      fearDurationSeconds: {
        min: 0.75,
        max: 1.5,
        scalesWithChargeDistance: true,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH, SkillEffect.FEAR],
    tags: [
      `ONSLAUGHT_OF_SHADOWS`,
      `FEAR`,
      `MAGIC_DAMAGE`,
      `LONG_RANGE_ENGAGE`,
      `TEAMFIGHT`,
    ],
  },
  // === HEIMERDINGER ===
  // HEIMERDINGER - PASSIVE
  {
    championKey: `heimerdinger`,
    slot: SkillSlot.PASSIVE,
    name: `Hextech Affinity`,
    nameVi: `Ái Lực Hextech`,
    description: `Heimerdinger gains 20% Movement Speed while near allied turrets and turrets deployed by Heimerdinger.`,
    descriptionVi: `Heimerdinger nhận 20% Tốc Độ Di Chuyển khi ở gần trụ đồng minh và ụ súng do Heimerdinger triển khai.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: {
      type: `NEAR_ALLIED_OR_DEPLOYED_TURRETS`,
    },
    scaling: {
      movementSpeedBonusPercent: 20,
      activeNearAlliedTurrets: true,
      activeNearHeimerdingerTurrets: true,
    },
    effects: [SkillEffect.SPEED_UP],
    tags: [`HEXTECH_AFFINITY`, `MOVEMENT_SPEED`, `TURRET_SYNERGY`],
  },
  // HEIMERDINGER - Q
  {
    championKey: `heimerdinger`,
    slot: SkillSlot.Q,
    name: `H-28G Evolution Turret`,
    nameVi: `Ụ Súng Tiến Hóa H-28G`,
    description: `Heimerdinger constructs a turret that slowly builds up charge and attacks nearby enemies. The turret deals magic damage on hit. At max charge, it fires a beam that deals magic damage. Heimerdinger can have 3 H-28G Evolution Turrets active at once. If Heimerdinger gets too far away, his turrets become dormant. UPGRADE!!! enhances this ability into H-28Q Apex Turret.`,
    descriptionVi: `Heimerdinger dựng một ụ súng tích tụ năng lượng dần và tấn công kẻ địch gần đó. Ụ súng gây sát thương phép khi bắn trúng. Khi đạt tối đa năng lượng, nó bắn một tia gây sát thương phép. Heimerdinger có thể có tối đa 3 Ụ Súng Tiến Hóa H-28G cùng lúc. Nếu Heimerdinger đi quá xa, ụ súng sẽ ngủ đông. NÂNG CẤP!!! cường hóa kỹ năng này thành Ụ Súng Đỉnh Cao H-28Q.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [1, 1, 1, 1],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `DEPLOYABLE_TURRET`,
    },
    scaling: {
      turretOnHitDamage: {
        values: [5, 10, 15, 20],
        abilityPowerRatio: 0.25,
        damageType: `MAGIC`,
      },
      turretBeamDamage: {
        values: [25, 45, 65, 85],
        abilityPowerRatio: 0.55,
        damageType: `MAGIC`,
      },
      maxActiveTurrets: 3,
      turretChargeBuildsOverTime: true,
      turretBeamFiresAtMaxCharge: true,
      turretBecomesDormantIfHeimerdingerTooFar: true,
      turretStats: {
        baseHealth: 110,
        healthAbilityPowerRatioByRank: {
          min: 0.08,
          max: 0.5,
        },
        armorByLevel: {
          min: 20,
          max: 90,
        },
        magicResist: 25,
      },
      upgradedByUltimate: {
        upgradedName: `H-28Q Apex Turret`,
        durationSeconds: 10,
        turretShotDamage: {
          values: [80, 100, 120],
          abilityPowerRatio: 0.35,
          damageType: `MAGIC`,
        },
        turretMaxChargeDamage: {
          values: [100, 140, 180],
          abilityPowerRatio: 0.6,
          damageType: `MAGIC`,
        },
        slowDurationSeconds: 1,
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `TURRET`,
      `DEPLOYABLE`,
      `SUMMON`,
      `MAGIC_DAMAGE`,
      `ZONE_CONTROL`,
      `UPGRADE_SYNERGY`,
    ],
  },
  // HEIMERDINGER - W
  {
    championKey: `heimerdinger`,
    slot: SkillSlot.W,
    name: `Hextech Micro-Rockets`,
    nameVi: `Tên Lửa Hextech Cỡ Nhỏ`,
    description: `Heimerdinger unleashes a barrage of 5 rockets that deal magic damage to the first enemy hit. Nearby turrets gain charge for every rocket that hits a champion. Additional rocket hits after the first to the same champion or monster deal reduced damage, while minions take a higher reduced damage amount. UPGRADE!!! enhances this ability into Hextech Rocket Swarm.`,
    descriptionVi: `Heimerdinger phóng loạt 5 tên lửa gây sát thương phép lên kẻ địch đầu tiên trúng phải. Các ụ súng gần đó nhận thêm năng lượng với mỗi tên lửa bắn trúng tướng. Các tên lửa trúng thêm sau phát đầu lên cùng một tướng hoặc quái chỉ gây sát thương giảm, còn lính nhận mức sát thương giảm cao hơn. NÂNG CẤP!!! cường hóa kỹ năng này thành Bầy Tên Lửa Hextech.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `MULTI_ROCKET_SKILLSHOT`,
      rocketCount: 5,
    },
    scaling: {
      rocketDamage: {
        values: [60, 85, 110, 135],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      rocketCount: 5,
      nearbyTurretChargeGainPerChampionRocketHitPercent: 20,
      additionalRocketDamageModifierVsSameChampionOrMonster: 0.2,
      additionalRocketDamageModifierVsMinions: 0.6,
      upgradedByUltimate: {
        upgradedName: `Hextech Rocket Swarm`,
        waveCount: 4,
        rocketDamage: {
          baseValue: 135,
          abilityPowerRatio: 0.45,
          damageType: `MAGIC`,
        },
        additionalRocketDamageModifierVsSameChampionOrMonster: 0.25,
        furtherDamageDecayAfterRocketHits: 5,
        fullDamageToMinions: true,
        maxDamageToChampionOrMonster: {
          baseValue: 524,
          abilityPowerRatio: 1.75,
          damageType: `MAGIC`,
        },
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `MICRO_ROCKETS`,
      `MISSILE`,
      `MAGIC_DAMAGE`,
      `POKE`,
      `SKILL_SHOT`,
      `TURRET_CHARGE`,
      `UPGRADE_SYNERGY`,
    ],
  },
  // HEIMERDINGER - E
  {
    championKey: `heimerdinger`,
    slot: SkillSlot.E,
    name: `CH-2 Electron Storm Grenade`,
    nameVi: `Lựu Đạn Bão Điện Tử CH-2`,
    description: `Heimerdinger hurls a grenade that deals magic damage in a target area and slows enemies. Enemies in the center are also stunned. Hitting a champion fully charges nearby turrets. UPGRADE!!! enhances this ability into CH-3X Lightning Grenade.`,
    descriptionVi: `Heimerdinger ném một quả lựu đạn gây sát thương phép trong vùng chỉ định và làm chậm kẻ địch. Kẻ địch ở tâm vụ nổ còn bị làm choáng. Bắn trúng tướng sẽ nạp đầy năng lượng cho các ụ súng gần đó. NÂNG CẤP!!! cường hóa kỹ năng này thành Lựu Đạn Sấm Sét CH-3X.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [10, 10, 10, 10],
      unit: `seconds`,
    },
    cost: {
      values: [85, 85, 85, 85],
      resource: `MANA`,
    },
    range: {
      type: `AREA_GRENADE`,
    },
    scaling: {
      damage: {
        values: [70, 120, 170, 220],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      slowPercent: 35,
      slowDurationSeconds: 2,
      centerStunDurationSeconds: 1,
      fullyChargesNearbyTurretsOnChampionHit: true,
      upgradedByUltimate: {
        upgradedName: `CH-3X Lightning Grenade`,
        bounceCount: 3,
        damagePerDischarge: {
          baseValue: 100,
          abilityPowerRatio: 0.6,
          damageType: `MAGIC`,
        },
        largerStunArea: true,
        largerSlowArea: true,
        slowPercent: 40,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.STUN],
    tags: [
      `ELECTRON_STORM_GRENADE`,
      `MAGIC_DAMAGE`,
      `AREA_DAMAGE`,
      `SLOW`,
      `STUN`,
      `TURRET_CHARGE`,
      `UPGRADE_SYNERGY`,
    ],
  },
  // HEIMERDINGER - R
  {
    championKey: `heimerdinger`,
    slot: SkillSlot.R,
    name: `UPGRADE!!!`,
    nameVi: `NÂNG CẤP!!!`,
    description: `Heimerdinger upgrades his next basic ability. H-28Q Apex Turret places an upgraded turret for 10 seconds. Hextech Rocket Swarm fires 4 waves of rockets. CH-3X Lightning Grenade throws a bouncing grenade that discharges 3 times with larger stun and slow areas. Recast cancels this ability.`,
    descriptionVi: `Heimerdinger nâng cấp kỹ năng cơ bản tiếp theo. Ụ Súng Đỉnh Cao H-28Q đặt một ụ súng nâng cấp trong 10 giây. Bầy Tên Lửa Hextech bắn 4 đợt tên lửa. Lựu Đạn Sấm Sét CH-3X ném một quả lựu đạn nảy và phóng điện 3 lần với vùng làm choáng và làm chậm lớn hơn. Tái kích hoạt để hủy kỹ năng này.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [75, 66, 56],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `NEXT_BASIC_ABILITY_UPGRADE`,
    },
    scaling: {
      upgradesNextBasicAbility: true,
      recastCancelsAbility: true,
      upgradedAbilities: {
        h28qApexTurret: {
          sourceAbility: `H-28G Evolution Turret`,
          durationSeconds: 10,
          shotDamage: {
            values: [80, 100, 120],
            abilityPowerRatio: 0.35,
            damageType: `MAGIC`,
          },
          maxChargeDamage: {
            values: [100, 140, 180],
            abilityPowerRatio: 0.6,
            damageType: `MAGIC`,
          },
          slowDurationSeconds: 1,
        },
        hextechRocketSwarm: {
          sourceAbility: `Hextech Micro-Rockets`,
          waveCount: 4,
          rocketDamage: {
            baseValue: 135,
            abilityPowerRatio: 0.45,
            damageType: `MAGIC`,
          },
          additionalRocketDamageModifierVsSameChampionOrMonster: 0.25,
          furtherDamageDecayAfterRocketHits: 5,
          fullDamageToMinions: true,
          maxDamageToChampionOrMonster: {
            baseValue: 524,
            abilityPowerRatio: 1.75,
            damageType: `MAGIC`,
          },
        },
        ch3xLightningGrenade: {
          sourceAbility: `CH-2 Electron Storm Grenade`,
          dischargeCount: 3,
          damagePerDischarge: {
            baseValue: 100,
            abilityPowerRatio: 0.6,
            damageType: `MAGIC`,
          },
          largerStunArea: true,
          largerSlowArea: true,
          slowPercent: 40,
        },
      },
    },
    effects: [SkillEffect.BUFF],
    tags: [
      `UPGRADE`,
      `ABILITY_UPGRADE`,
      `RECAST`,
      `TURRET`,
      `MISSILE`,
      `GRENADE`,
    ],
  },
  // === IRELIA ===
  // IRELIA - PASSIVE
  {
    championKey: `irelia`,
    slot: SkillSlot.PASSIVE,
    name: `Ionian Fervor`,
    nameVi: `Tinh Thần Ionia`,
    description: `Hitting enemies with abilities grants bonus Attack Speed for 6 seconds, stacking up to 4 times. At max stacks, Irelia's attacks deal additional magic damage on hit. Attacking enemy champions refreshes the duration. An ability grants multiple stacks upon hitting multiple champions.`,
    descriptionVi: `Dùng kỹ năng trúng kẻ địch cho Irelia thêm Tốc Độ Đánh trong 6 giây, cộng dồn tối đa 4 lần. Khi đạt tối đa cộng dồn, đòn đánh của Irelia gây thêm sát thương phép trên đòn đánh. Tấn công tướng địch sẽ làm mới thời gian hiệu lực. Một kỹ năng có thể cho nhiều cộng dồn nếu trúng nhiều tướng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: {
      type: `ABILITY_HIT_STACKING_PASSIVE`,
    },
    scaling: {
      stackDurationSeconds: 6,
      maxStacks: 4,
      attackSpeedBonusPercentByLevel: {
        min: 3,
        max: 17,
      },
      maxStackOnHitDamage: {
        minByLevel: 25,
        maxByLevel: 150,
        attackDamageRatio: 0.3,
        damageType: `MAGIC`,
      },
      championBasicAttackRefreshesDuration: true,
      abilityGrantsMultipleStacksOnMultipleChampionHits: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `IONIAN_FERVOR`,
      `STACKING_PASSIVE`,
      `ATTACK_SPEED_STEROID`,
      `ON_HIT_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },
  // IRELIA - Q
  {
    championKey: `irelia`,
    slot: SkillSlot.Q,
    name: `Bladesurge`,
    nameVi: `Đâm Kiếm`,
    description: `Irelia dashes through an enemy, dealing physical damage and healing herself based on Attack Damage. Bladesurge's cooldown is refreshed if the target was Marked or dies to Bladesurge. When aimed, Bladesurge prioritizes targets it will reset on. Deals increased damage to minions.`,
    descriptionVi: `Irelia lướt xuyên qua một kẻ địch, gây sát thương vật lý và hồi máu dựa trên Sức Mạnh Công Kích. Hồi chiêu Đâm Kiếm được làm mới nếu mục tiêu đã bị Đánh Dấu hoặc bị hạ gục bởi Đâm Kiếm. Khi ngắm chiêu, Đâm Kiếm ưu tiên mục tiêu có thể giúp hồi lại chiêu. Gây thêm sát thương lên lính.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_DASH_THROUGH_ENEMY`,
    },
    scaling: {
      damage: {
        values: [10, 40, 70, 100],
        attackDamageRatio: 0.65,
        damageType: `PHYSICAL`,
      },
      healAttackDamagePercent: [11, 14, 17, 20],
      cooldownRefreshesIfTargetMarked: true,
      cooldownRefreshesIfTargetDiesToBladesurge: true,
      aimedCastPrioritizesResetTargets: true,
      minionDamageModifier: 1.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH, SkillEffect.HEAL],
    tags: [
      `BLADESURGE`,
      `DASH`,
      `PHYSICAL_DAMAGE`,
      `HEALING`,
      `MARK_CONSUME`,
      `COOLDOWN_RESET`,
      `MINION_DAMAGE_MODIFIER`,
    ],
  },
  // IRELIA - W
  {
    championKey: `irelia`,
    slot: SkillSlot.W,
    name: `Defiant Dance`,
    nameVi: `Vũ Điệu Thách Thức`,
    description: `Hold: Irelia defends with her blades for up to 1.5 seconds, reducing incoming damage. Release: Irelia whips the blades forward, dealing physical damage that increases with charge time. Defiant Dance cannot be interrupted.`,
    descriptionVi: `Giữ: Irelia phòng thủ bằng lưỡi kiếm trong tối đa 1.5 giây, giảm sát thương nhận vào. Thả: Irelia phóng kiếm về phía trước, gây sát thương vật lý tăng theo thời gian tích tụ. Vũ Điệu Thách Thức không thể bị ngắt.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.AREA,
    cooldown: {
      values: [14, 13, 12, 11],
      unit: `seconds`,
    },
    cost: {
      values: [75, 80, 85, 90],
      resource: `MANA`,
    },
    range: {
      type: `CHARGED_DIRECTIONAL_SLASH`,
    },
    scaling: {
      holdMaxDurationSeconds: 1.5,
      damageReduction: {
        basePercent: 60,
        abilityPowerRatioPercent: 7,
      },
      releaseDamage: {
        values: [20, 35, 50, 65],
        attackDamageRatio: 0.5,
        abilityPowerRatio: 0.4,
        damageType: `PHYSICAL`,
      },
      maxChargeDamageIncreasePercent: 100,
      cannotBeInterrupted: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DAMAGE_REDUCTION],
    tags: [
      `DEFIANT_DANCE`,
      `DAMAGE_REDUCTION`,
      `CHARGED_RELEASE`,
      `PHYSICAL_DAMAGE`,
      `UNINTERRUPTIBLE`,
    ],
  },
  // IRELIA - E
  {
    championKey: `irelia`,
    slot: SkillSlot.E,
    name: `Flawless Duet`,
    nameVi: `Bước Nhảy Hoàn Vũ`,
    description: `Irelia sends a blade to a target location and may recast within 3 seconds to send another blade. The blades converge upon reaching their destination, dealing magic damage, stunning enemies, and Marking enemy champions and large monsters hit.`,
    descriptionVi: `Irelia phóng một lưỡi kiếm đến vị trí chỉ định và có thể tái kích hoạt trong 3 giây để phóng lưỡi kiếm thứ hai. Hai lưỡi kiếm hội tụ khi đến điểm đến, gây sát thương phép, làm choáng kẻ địch và Đánh Dấu tướng địch cùng quái lớn trúng phải.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [12, 11, 10, 9],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `RECAST_CONVERGING_BLADES`,
    },
    scaling: {
      recastWindowSeconds: 3,
      damage: {
        values: [80, 130, 180, 230],
        abilityPowerRatio: 0.8,
        damageType: `MAGIC`,
      },
      stunDurationSeconds: 1,
      markDurationSeconds: 5,
      marksEnemyChampions: true,
      marksLargeMonsters: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.STUN],
    tags: [
      `FLAWLESS_DUET`,
      `RECAST`,
      `MAGIC_DAMAGE`,
      `STUN`,
      `MARK`,
      `BLADE_CONVERGE`,
    ],
  },
  // IRELIA - R
  {
    championKey: `irelia`,
    slot: SkillSlot.R,
    name: `Vanguard's Edge`,
    nameVi: `Thanh Kiếm Tiên Phong`,
    description: `Irelia fires a storm of blades that deals magic damage and Marks enemy champions and large monsters. The blades explode into a wall upon hitting an enemy champion. The bladewall deals magic damage and heavily slows enemies.`,
    descriptionVi: `Irelia phóng ra một cơn bão lưỡi kiếm gây sát thương phép và Đánh Dấu tướng địch cùng quái lớn. Khi trúng tướng địch, các lưỡi kiếm nổ thành một bức tường kiếm. Tường kiếm gây sát thương phép và làm chậm mạnh kẻ địch.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [70, 65, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `BLADE_STORM_PROJECTILE_AND_WALL`,
    },
    scaling: {
      initialDamage: {
        values: [125, 250, 375],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      markDurationSeconds: 5,
      marksEnemyChampions: true,
      marksLargeMonsters: true,
      bladeWallDurationSeconds: 3,
      bladeWallDamage: {
        values: [100, 225, 350],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      bladeWallSlowPercent: 90,
      bladeWallSlowDurationSeconds: 1,
      bladeWallFormsOnEnemyChampionHit: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `VANGUARDS_EDGE`,
      `MAGIC_DAMAGE`,
      `MARK`,
      `BLADE_WALL`,
      `SLOW`,
      `AREA_DAMAGE`,
    ],
  },
  // === JANNA ===
  // JANNA - PASSIVE
  {
    championKey: `janna`,
    slot: SkillSlot.PASSIVE,
    name: `Tailwind`,
    nameVi: `Thuận Gió`,
    description: `Janna passively gains 5% Movement Speed. Nearby allied champions also gain this bonus.`,
    descriptionVi: `Janna nhận 5% Tốc Độ Di Chuyển. Tướng đồng minh ở gần cũng nhận hiệu ứng này.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ALLIES,
    cooldown: null,
    cost: null,
    range: {
      type: `NEARBY_ALLIED_CHAMPIONS_AURA`,
    },
    scaling: {
      movementSpeedBonusPercent: 5,
      affectsSelf: true,
      affectsNearbyAlliedChampions: true,
    },
    effects: [SkillEffect.SPEED_UP, SkillEffect.BUFF],
    tags: [`TAILWIND`, `MOVEMENT_SPEED`, `AURA`, `TEAM_SUPPORT`],
  },
  // JANNA - Q
  {
    championKey: `janna`,
    slot: SkillSlot.Q,
    name: `Howling Gale`,
    nameVi: `Gió Lốc`,
    description: `Janna charges up and summons a powerful whirlwind that deals magic damage and knocks up enemies in its path. The whirlwind always reaches its destination quickly. Howling Gale stores charges over time, up to a maximum of 2 charges.`,
    descriptionVi: `Janna tụ lực và triệu hồi một cơn lốc mạnh gây sát thương phép, đồng thời hất tung kẻ địch trên đường bay. Cơn lốc luôn đến điểm đến rất nhanh. Gió Lốc tích trữ điểm dùng theo thời gian, tối đa 2 điểm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [1, 1, 1, 1],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `CHARGED_LINE_WHIRLWIND`,
    },
    scaling: {
      chargeDurationSeconds: 0.75,
      travelTimeToDestinationSeconds: 0.5,
      storedChargeRechargeSeconds: 14,
      maxStoredCharges: 2,
      damage: {
        values: [50, 90, 130, 170],
        abilityPowerRatio: 0.5,
        damageType: `MAGIC`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_UP],
    tags: [
      `HOWLING_GALE`,
      `CHARGE_SYSTEM`,
      `STORED_CHARGES`,
      `MAGIC_DAMAGE`,
      `KNOCK_UP`,
      `PEEL`,
      `DISENGAGE`,
    ],
  },
  // JANNA - W
  {
    championKey: `janna`,
    slot: SkillSlot.W,
    name: `Zephyr`,
    nameVi: `Gió Tây`,
    description: `Janna gains Movement Speed for 2 seconds. The wind spirit automatically searches for the nearest 3 champions within range, granting Movement Speed bonuses to allies and dealing magic damage to enemies based on Ability Power and bonus Movement Speed.`,
    descriptionVi: `Janna nhận Tốc Độ Di Chuyển trong 2 giây. Linh hồn gió tự động tìm 3 tướng gần nhất trong phạm vi, tăng Tốc Độ Di Chuyển cho đồng minh và gây sát thương phép lên kẻ địch dựa trên Sức Mạnh Phép Thuật cùng Tốc Độ Di Chuyển cộng thêm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPIONS,
    cooldown: {
      values: [9, 8, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [50, 55, 60, 65],
      resource: `MANA`,
    },
    range: {
      type: `AUTO_SEARCH_NEAREST_CHAMPIONS`,
      maxTargets: 3,
    },
    scaling: {
      selfMovementSpeedBonusPercent: [10, 15, 20, 25],
      selfMovementSpeedDurationSeconds: 2,
      maxSearchedChampions: 3,
      grantsMovementSpeedToAllies: true,
      damagesEnemies: true,
      damage: {
        values: [50, 90, 130, 170],
        abilityPowerRatio: 0.5,
        bonusMovementSpeedRatio: 0.2,
        damageType: `MAGIC`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP, SkillEffect.BUFF],
    tags: [
      `ZEPHYR`,
      `MOVEMENT_SPEED`,
      `AUTO_TARGET`,
      `ALLY_BUFF`,
      `MAGIC_DAMAGE`,
      `TEAM_SUPPORT`,
    ],
  },
  // JANNA - E
  {
    championKey: `janna`,
    slot: SkillSlot.E,
    name: `Eye Of The Storm`,
    nameVi: `Mắt Bão`,
    description: `Janna blesses herself and the allied champion with the lowest Health with a shield that absorbs damage and grants Attack Damage while it holds. If there is a turret within range, the turret is shielded as well.`,
    descriptionVi: `Janna ban phước cho bản thân và tướng đồng minh có Máu thấp nhất bằng một lớp lá chắn hấp thụ sát thương và tăng Sức Mạnh Công Kích khi lá chắn còn tồn tại. Nếu có trụ trong phạm vi, trụ cũng nhận lá chắn.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ALLIES,
    cooldown: {
      values: [16, 14, 12, 10],
      unit: `seconds`,
    },
    cost: {
      values: [70, 80, 90, 100],
      resource: `MANA`,
    },
    range: {
      type: `SELF_AND_LOWEST_HEALTH_ALLY_PLUS_TURRET`,
    },
    scaling: {
      shieldAmount: {
        values: [65, 90, 115, 140],
        abilityPowerRatio: 0.45,
      },
      attackDamageGranted: {
        values: [10, 20, 30, 40],
        abilityPowerRatio: 0.1,
      },
      shieldDurationSeconds: 3,
      targetsSelf: true,
      targetsLowestHealthAlliedChampion: true,
      shieldsTurretIfWithinRange: true,
      attackDamageBuffLastsWhileShieldHolds: true,
    },
    effects: [SkillEffect.SHIELD, SkillEffect.BUFF],
    tags: [
      `EYE_OF_THE_STORM`,
      `SHIELD`,
      `ATTACK_DAMAGE_BUFF`,
      `LOW_HEALTH_ALLY_TARGETING`,
      `TURRET_SHIELD`,
      `TEAM_SUPPORT`,
    ],
  },
  // JANNA - R
  {
    championKey: `janna`,
    slot: SkillSlot.R,
    name: `Monsoon`,
    nameVi: `Gió Mùa`,
    description: `Janna calls forth mighty winds of salvation to knock back surrounding enemies and restore Health to nearby allies each second for 3 seconds.`,
    descriptionVi: `Janna triệu hồi những cơn gió cứu rỗi mạnh mẽ để đẩy lùi kẻ địch xung quanh và hồi Máu cho đồng minh gần đó mỗi giây trong 3 giây.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.AREA,
    cooldown: {
      values: [80, 75, 70],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `SURROUNDING_AREA_CHANNEL`,
    },
    scaling: {
      healPerSecond: {
        values: [50, 100, 150],
        abilityPowerRatio: 0.3,
      },
      durationSeconds: 3,
      knocksBackSurroundingEnemies: true,
      healsNearbyAlliesEachSecond: true,
      totalHealing: {
        values: [150, 300, 450],
        abilityPowerRatio: 0.9,
      },
    },
    effects: [SkillEffect.KNOCK_BACK, SkillEffect.HEAL],
    tags: [
      `MONSOON`,
      `KNOCK_BACK`,
      `HEALING`,
      `CHANNEL`,
      `DISENGAGE`,
      `TEAM_SUPPORT`,
    ],
  },
  // === JARVAN IV ===
  // JARVAN IV - PASSIVE
  {
    championKey: `jarvan-iv`,
    slot: SkillSlot.PASSIVE,
    name: `Martial Cadence`,
    nameVi: `Thương Thuật`,
    description: `Jarvan IV's first attack against an enemy deals bonus physical damage equal to a percent of their current Health. This effect has a cooldown per unique enemy.`,
    descriptionVi: `Đòn đánh đầu tiên của Jarvan IV lên một kẻ địch gây thêm sát thương vật lý bằng một phần Máu hiện tại của mục tiêu. Hiệu ứng này có hồi chiêu riêng trên từng kẻ địch.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: {
      type: `BASIC_ATTACK_MODIFIER`,
    },
    scaling: {
      currentHealthPhysicalDamagePercent: 8,
      cooldownPerUniqueEnemySeconds: 5,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `MARTIAL_CADENCE`,
      `CURRENT_HEALTH_DAMAGE`,
      `PHYSICAL_DAMAGE`,
      `BASIC_ATTACK_MODIFIER`,
    ],
  },
  // JARVAN IV - Q
  {
    championKey: `jarvan-iv`,
    slot: SkillSlot.Q,
    name: `Dragon Strike`,
    nameVi: `Giáng Long Kích`,
    description: `Jarvan IV extends his lance, dealing physical damage and reducing the Armor of enemies hit. If the lance contacts a Demacian Standard, Jarvan IV is pulled to the Standard's location, knocking up enemies in his path.`,
    descriptionVi: `Jarvan IV vươn thương về phía trước, gây sát thương vật lý và giảm Giáp của kẻ địch trúng chiêu. Nếu thương chạm vào Hoàng Kỳ Demacia, Jarvan IV sẽ được kéo đến vị trí Hoàng Kỳ, hất tung kẻ địch trên đường lướt.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [50, 55, 60, 65],
      resource: `MANA`,
    },
    range: {
      type: `LINE_LANCE_THRUST`,
    },
    scaling: {
      damage: {
        values: [80, 140, 200, 260],
        bonusAttackDamageRatio: 1.3,
        damageType: `PHYSICAL`,
      },
      armorReductionPercent: 10,
      armorReductionDurationSeconds: 3,
      pullsToDemacianStandardOnContact: true,
      knockUpDurationSeconds: 0.75,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.ARMOR_REDUCTION,
      SkillEffect.DASH,
      SkillEffect.KNOCK_UP,
    ],
    tags: [
      `DRAGON_STRIKE`,
      `PHYSICAL_DAMAGE`,
      `ARMOR_REDUCTION`,
      `DASH`,
      `KNOCK_UP`,
      `FLAG_AND_DRAG`,
    ],
  },
  // JARVAN IV - W
  {
    championKey: `jarvan-iv`,
    slot: SkillSlot.W,
    name: `Golden Aegis`,
    nameVi: `Hoàng Kim Giáp`,
    description: `Jarvan IV unleashes a regal aura that slows nearby enemies and grants himself a shield. The shield absorbs additional damage for each nearby enemy champion.`,
    descriptionVi: `Jarvan IV phóng thích hào quang vương giả làm chậm kẻ địch xung quanh và tạo lá chắn cho bản thân. Lá chắn hấp thụ thêm sát thương với mỗi tướng địch gần đó.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [10, 10, 10, 10],
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `MANA`,
    },
    range: {
      type: `NEARBY_ENEMY_AURA`,
    },
    scaling: {
      slowPercent: [30, 35, 40, 45],
      slowDurationSeconds: 2,
      shieldAmount: {
        values: [100, 140, 180, 220],
        maxHealthRatio: 0.05,
      },
      shieldDurationSeconds: 5,
      bonusShieldPerNearbyEnemyChampion: {
        flatValue: 10,
        maxHealthRatioByRank: [0.016, 0.019, 0.022, 0.025],
      },
    },
    effects: [SkillEffect.SHIELD, SkillEffect.SLOW],
    tags: [
      `GOLDEN_AEGIS`,
      `SHIELD`,
      `SLOW`,
      `MAX_HEALTH_SCALING`,
      `NEARBY_ENEMY_SCALING`,
    ],
  },
  // JARVAN IV - E
  {
    championKey: `jarvan-iv`,
    slot: SkillSlot.E,
    name: `Demacian Standard`,
    nameVi: `Hoàng Kỳ Demacia`,
    description: `Passive: Jarvan IV gains Attack Speed. Active: Jarvan IV throws a Demacian Standard that deals magic damage and remains in place, granting nearby allied champions Attack Speed. Tapping this ability while near a Demacian Standard casts Dragon Strike towards it.`,
    descriptionVi: `Nội tại: Jarvan IV nhận thêm Tốc Độ Đánh. Kích hoạt: Jarvan IV ném Hoàng Kỳ Demacia gây sát thương phép và tồn tại tại vị trí đó, tăng Tốc Độ Đánh cho tướng đồng minh gần đó. Nhấn kỹ năng này khi ở gần Hoàng Kỳ Demacia sẽ dùng Giáng Long Kích về phía nó.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LOCATION,
    cooldown: {
      values: [11, 11, 10, 9],
      unit: `seconds`,
    },
    cost: {
      values: [55, 55, 55, 55],
      resource: `MANA`,
    },
    range: {
      type: `STANDARD_DEPLOY_LOCATION`,
    },
    scaling: {
      passiveAttackSpeedBonusPercent: [25, 30, 33, 40],
      activeDamage: {
        values: [85, 140, 195, 250],
        abilityPowerRatio: 0.8,
        damageType: `MAGIC`,
      },
      standardDurationSeconds: 8,
      alliedChampionAttackSpeedBonusPercent: [30, 35, 40, 45],
      castsDragonStrikeTowardStandardWhenTappedNearby: true,
      enablesFlagAndDragCombo: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `DEMACIAN_STANDARD`,
      `ATTACK_SPEED_STEROID`,
      `ALLY_BUFF`,
      `MAGIC_DAMAGE`,
      `DEPLOYABLE`,
      `FLAG_AND_DRAG`,
    ],
  },
  // JARVAN IV - R
  {
    championKey: `jarvan-iv`,
    slot: SkillSlot.R,
    name: `Cataclysm`,
    nameVi: `Đại Địa Chấn`,
    description: `Jarvan IV leaps to an enemy champion, dealing physical damage to nearby enemies and creating an arena of impassable terrain around them. Damage dealt by enemies within the arena is reduced. The effect ends once they leave the terrain or when it collapses. Recast to collapse the terrain.`,
    descriptionVi: `Jarvan IV anh dũng lao tới một tướng địch, gây sát thương vật lý lên kẻ địch gần đó và tạo một đấu trường địa hình không thể vượt qua xung quanh chúng. Sát thương do kẻ địch trong đấu trường gây ra bị giảm. Hiệu ứng kết thúc khi chúng rời khỏi địa hình hoặc khi địa hình sụp xuống. Tái kích hoạt để phá hủy địa hình.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [70, 65, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_ENEMY_CHAMPION_LEAP`,
    },
    scaling: {
      damage: {
        values: [200, 350, 500],
        bonusAttackDamageRatio: 1.7,
        damageType: `PHYSICAL`,
      },
      arenaDurationSeconds: 3.5,
      createsImpassableTerrain: true,
      enemyDamageDealtReductionPercent: [12, 16, 20],
      damageReductionEndsWhenEnemyLeavesArena: true,
      recastCollapsesTerrain: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.DASH,
      SkillEffect.DAMAGE_REDUCTION,
    ],
    tags: [
      `CATACLYSM`,
      `PHYSICAL_DAMAGE`,
      `DIVE`,
      `TERRAIN_CONTROL`,
      `ARENA`,
      `RECAST`,
      `DAMAGE_REDUCTION`,
    ],
  },
  // === JAX ===
  // JAX - PASSIVE
  {
    championKey: `jax`,
    slot: SkillSlot.PASSIVE,
    name: `Relentless Assault`,
    nameVi: `Không Khoan Nhượng`,
    description: `Jax's attacks against champions and minions grant bonus Attack Speed for 3 seconds, stacking up to 5 times.`,
    descriptionVi: `Đòn đánh của Jax lên tướng và lính cho thêm Tốc Độ Đánh trong 3 giây, cộng dồn tối đa 5 lần.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: {
      type: `BASIC_ATTACK_STACKING_PASSIVE`,
    },
    scaling: {
      attackSpeedBonusPercentByLevel: {
        min: 6,
        max: 20,
      },
      stackDurationSeconds: 3,
      maxStacks: 5,
      stacksFromAttackingChampions: true,
      stacksFromAttackingMinions: true,
    },
    effects: [SkillEffect.BUFF],
    tags: [
      `RELENTLESS_ASSAULT`,
      `STACKING_PASSIVE`,
      `ATTACK_SPEED_STEROID`,
      `EXTENDED_FIGHT`,
    ],
  },
  // JAX - Q
  {
    championKey: `jax`,
    slot: SkillSlot.Q,
    name: `Leap Strike`,
    nameVi: `Nhảy Và Nện`,
    description: `Jax leaps to a target unit, dealing physical damage if the target is an enemy.`,
    descriptionVi: `Jax nhảy đến một đơn vị mục tiêu, gây sát thương vật lý nếu mục tiêu là kẻ địch.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [8, 7, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [65, 65, 65, 65],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_UNIT_LEAP`,
    },
    scaling: {
      damage: {
        values: [70, 125, 180, 235],
        attackDamageRatio: 1,
        damageType: `PHYSICAL`,
      },
      canLeapToTargetUnit: true,
      dealsDamageIfTargetIsEnemy: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [`LEAP_STRIKE`, `DASH`, `PHYSICAL_DAMAGE`, `TARGETED_LEAP`],
  },
  // JAX - W
  {
    championKey: `jax`,
    slot: SkillSlot.W,
    name: `Empower`,
    nameVi: `Vận Sức`,
    description: `Jax empowers his next attack or Leap Strike to deal additional magic damage. Empower deals increased damage to monsters.`,
    descriptionVi: `Jax cường hóa đòn đánh kế tiếp hoặc Nhảy Và Nện để gây thêm sát thương phép. Vận Sức gây thêm sát thương lên quái.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.SELF,
    cooldown: {
      values: [6, 5, 4, 3],
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `MANA`,
    },
    range: {
      type: `NEXT_ATTACK_OR_LEAP_STRIKE_EMPOWER`,
    },
    scaling: {
      bonusMagicDamage: {
        values: [55, 100, 145, 190],
        abilityPowerRatio: 0.6,
        damageType: `MAGIC`,
      },
      empowersNextAttack: true,
      empowersLeapStrike: true,
      monsterDamageModifier: 1.75,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `EMPOWER`,
      `MAGIC_DAMAGE`,
      `ON_HIT_DAMAGE`,
      `ATTACK_RESET`,
      `MONSTER_DAMAGE_MODIFIER`,
    ],
  },
  // JAX - E
  {
    championKey: `jax`,
    slot: SkillSlot.E,
    name: `Counter Strike`,
    nameVi: `Phản Công`,
    description: `Jax enters a defensive stance, dodging all incoming attacks and taking reduced damage from champions. After the duration, nearby enemies are stunned and take magic damage. Each attack dodged increases this damage. Recast ends the defensive stance early to damage and stun nearby enemies immediately.`,
    descriptionVi: `Jax vào thế phòng thủ, né tất cả đòn đánh nhận vào và giảm sát thương từ tướng. Sau thời gian hiệu lực, kẻ địch gần đó bị làm choáng và chịu sát thương phép. Mỗi đòn đánh né được sẽ tăng sát thương này. Tái kích hoạt để kết thúc thế phòng thủ sớm, gây sát thương và làm choáng kẻ địch gần đó ngay lập tức.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [12, 11, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [60, 70, 80, 90],
      resource: `MANA`,
    },
    range: {
      type: `SELF_DEFENSIVE_STANCE_AREA_STUN`,
    },
    scaling: {
      defensiveStanceDurationSeconds: 2,
      dodgesAllIncomingAttacks: true,
      championDamageReductionPercent: 25,
      damage: {
        values: [35, 75, 115, 155],
        targetMaxHealthRatio: 0.035,
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      stunDurationSeconds: 1,
      damageIncreasePerAttackDodgedPercent: 20,
      maxDamageIncreaseFromDodgedAttacksPercent: 100,
      recastEndsDefensiveStanceEarly: true,
      recastDealsDamageAndStunsImmediately: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.STUN,
      SkillEffect.DAMAGE_REDUCTION,
    ],
    tags: [
      `COUNTER_STRIKE`,
      `DODGE`,
      `ATTACK_DODGE`,
      `DAMAGE_REDUCTION`,
      `STUN`,
      `MAGIC_DAMAGE`,
      `PERCENT_HEALTH_DAMAGE`,
      `RECAST`,
    ],
  },
  // JAX - R
  {
    championKey: `jax`,
    slot: SkillSlot.R,
    name: `Grandmaster-at-Arms`,
    nameVi: `Sức Mạnh Bậc Thầy`,
    description: `Passive: Jax deals additional magic damage with every 3 consecutive attacks within 3 seconds. Active: Jax swings his stave, dealing magic damage to nearby enemies and gaining Armor and Magic Resist based on the number of champions hit. During this time, his size increases and he deals additional magic damage with every 2 attacks instead. Grandmaster-at-Arms deals increased damage to monsters.`,
    descriptionVi: `Nội tại: Jax gây thêm sát thương phép với mỗi 3 đòn đánh liên tiếp trong vòng 3 giây. Kích hoạt: Jax vung vũ khí, gây sát thương phép lên kẻ địch gần đó và nhận Giáp cùng Kháng Phép dựa trên số tướng trúng chiêu. Trong thời gian này, kích cỡ của Jax tăng lên và hắn gây thêm sát thương phép mỗi 2 đòn đánh thay vì mỗi 3 đòn. Sức Mạnh Bậc Thầy gây thêm sát thương lên quái.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [55, 55, 55],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `NEARBY_AREA_STAVE_SWING`,
    },
    scaling: {
      passiveEveryThirdAttackDamage: {
        values: [75, 130, 185],
        abilityPowerRatio: 0.7,
        damageType: `MAGIC`,
      },
      passiveConsecutiveAttackWindowSeconds: 3,
      activeDamage: {
        values: [100, 200, 300],
        abilityPowerRatio: 1,
        damageType: `MAGIC`,
      },
      resistancesIfHitsChampion: {
        armor: {
          values: [30, 50, 70],
          bonusAttackDamageRatio: 0.5,
        },
        magicResist: {
          values: [18, 30, 42],
          bonusAttackDamageRatio: 0.3,
        },
      },
      bonusResistancesPerAdditionalChampionHit: {
        armor: {
          values: [15, 20, 25],
          bonusAttackDamageRatio: 0.1,
        },
        magicResist: {
          values: [9, 12, 15],
          bonusAttackDamageRatio: 0.06,
        },
      },
      bonusResistanceDurationSeconds: 8,
      sizeIncreasePercent: 10,
      duringActiveEverySecondAttackDealsBonusMagicDamage: true,
      monsterDamageModifier: 1.1,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `GRANDMASTER_AT_ARMS`,
      `EVERY_THIRD_ATTACK`,
      `BONUS_RESISTANCES`,
      `SIZE_INCREASE`,
      `MAGIC_DAMAGE`,
      `ON_HIT_DAMAGE`,
      `MONSTER_DAMAGE_MODIFIER`,
    ],
  },
  // === JAYCE ===
  // JAYCE - PASSIVE
  {
    championKey: `jayce`,
    slot: SkillSlot.PASSIVE,
    name: `Hextech Capacitor`,
    nameVi: `Tụ Điện Hextech`,
    description: `Transforming between the Mercury Hammer and Mercury Cannon grants Movement Speed for a short duration.`,
    descriptionVi: `Chuyển đổi giữa Búa Thủy Ngân và Pháo Thủy Ngân cho Jayce thêm Tốc Độ Di Chuyển trong thời gian ngắn.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: {
      type: `FORM_SWAP_SELF_BUFF`,
    },
    scaling: {
      movementSpeedFlat: 30,
      durationSeconds: 1.25,
      triggersOnFormSwap: true,
    },
    effects: [SkillEffect.SPEED_UP, SkillEffect.BUFF],
    tags: [`HEXTECH_CAPACITOR`, `FORM_SWAP`, `MOVEMENT_SPEED`, `SELF_BUFF`],
  },
  // JAYCE - Q
  {
    championKey: `jayce`,
    slot: SkillSlot.Q,
    name: `To The Skies! / Shock Blast`,
    nameVi: `Chỉ Thiên! / Cầu Sấm`,
    description: `Mercury Hammer: Jayce leaps to an enemy, dealing physical damage and slowing nearby enemies. Mercury Cannon: Jayce fires an orb of electricity that detonates on hitting an enemy or reaching the end of its path. Shock Blast fired through Acceleration Gate travels farther and faster and deals increased damage. Deals reduced damage to monsters.`,
    descriptionVi: `Búa Thủy Ngân: Jayce nhảy tới một kẻ địch, gây sát thương vật lý và làm chậm kẻ địch gần đó. Pháo Thủy Ngân: Jayce bắn một quả cầu điện phát nổ khi trúng kẻ địch hoặc đi hết đường bay. Cầu Sấm bắn qua Cổng Tăng Tốc bay xa hơn, nhanh hơn và gây thêm sát thương. Gây giảm sát thương lên quái.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [14, 12, 10, 8],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `MANA`,
    },
    range: {
      type: `HAMMER_TARGETED_LEAP_OR_CANNON_LINE_ORB`,
    },
    scaling: {
      hammerForm: {
        abilityName: `To The Skies!`,
        damage: {
          values: [70, 120, 170, 220, 270],
          attackDamageRatio: 1.4,
          damageType: `PHYSICAL`,
        },
        slowPercent: [35, 40, 45, 50, 55],
        slowDurationSeconds: 2,
        leapToEnemy: true,
        damagesNearbyEnemies: true,
      },
      cannonForm: {
        abilityName: `Shock Blast`,
        damage: {
          values: [65, 130, 195, 260, 325],
          attackDamageRatio: 1.4,
          damageType: `PHYSICAL`,
        },
        detonatesOnEnemyHit: true,
        detonatesAtEndOfPath: true,
        accelerationGateInteraction: {
          travelsFarther: true,
          travelsFaster: true,
          damageIncreasePercent: 45,
        },
      },
      monsterDamageModifier: 0.8,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.DASH],
    tags: [
      `TO_THE_SKIES`,
      `SHOCK_BLAST`,
      `FORM_SWAP`,
      `PHYSICAL_DAMAGE`,
      `DASH`,
      `SLOW`,
      `POKE`,
      `ACCELERATION_GATE_SYNERGY`,
      `MONSTER_DAMAGE_MODIFIER`,
    ],
  },
  // JAYCE - W
  {
    championKey: `jayce`,
    slot: SkillSlot.W,
    name: `Lightning Field / Hyper Charge`,
    nameVi: `Tích Tụ / Sạc Siêu Tốc`,
    description: `Mercury Hammer: Jayce restores Mana on attacks passively and can release an electrifying aura that deals magic damage over time to nearby enemies. Mercury Cannon: Jayce gains a burst of energy, increasing Attack Speed to maximum for 3 attacks within a short duration. These attacks deal modified physical damage.`,
    descriptionVi: `Búa Thủy Ngân: Jayce hồi Năng Lượng khi đánh thường và có thể phóng thích một vùng điện gây sát thương phép theo thời gian lên kẻ địch gần đó. Pháo Thủy Ngân: Jayce nhận một luồng năng lượng, tăng Tốc Độ Đánh lên tối đa trong 3 đòn đánh trong thời gian ngắn. Các đòn đánh này gây sát thương vật lý đã điều chỉnh.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.SELF,
    cooldown: {
      values: [10, 10, 10, 10],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `MANA`,
    },
    range: {
      type: `HAMMER_AURA_OR_CANNON_ATTACK_SPEED_BUFF`,
    },
    scaling: {
      hammerForm: {
        abilityName: `Lightning Field`,
        passiveManaRestoreOnHammerAttack: [12, 15, 18, 21, 24],
        activeDamageOverTime: {
          values: [160, 230, 300, 370, 440],
          abilityPowerRatio: 1,
          damageType: `MAGIC`,
        },
        activeDurationSeconds: 4,
        damagesNearbyEnemies: true,
      },
      cannonForm: {
        abilityName: `Hyper Charge`,
        separateCooldown: {
          values: [13, 11, 9, 7, 5],
          unit: `seconds`,
        },
        attackCount: 3,
        attackWindowSeconds: 4,
        attackSpeedSetToMaximum: true,
        attackDamageModifierPercent: [70, 80, 90, 100, 110],
        damageType: `PHYSICAL`,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `LIGHTNING_FIELD`,
      `HYPER_CHARGE`,
      `FORM_SWAP`,
      `MAGIC_DAMAGE`,
      `PHYSICAL_DAMAGE`,
      `DAMAGE_OVER_TIME`,
      `MANA_RESTORE`,
      `ATTACK_SPEED_STEROID`,
    ],
  },
  // JAYCE - E
  {
    championKey: `jayce`,
    slot: SkillSlot.E,
    name: `Thundering Blow / Acceleration Gate`,
    nameVi: `Lôi Phạt / Cổng Tăng Tốc`,
    description: `Mercury Hammer: Jayce knocks a target and nearby enemies backwards, dealing magic damage based on their maximum Health. Mercury Cannon: Jayce deploys an Acceleration Gate that grants decaying Movement Speed to allied champions that pass through it. Shock Blasts fired through the gate travel farther and faster and deal increased damage.`,
    descriptionVi: `Búa Thủy Ngân: Jayce đánh bật mục tiêu và kẻ địch gần đó ra sau, gây sát thương phép theo Máu tối đa của chúng. Pháo Thủy Ngân: Jayce triển khai Cổng Tăng Tốc, cho tướng đồng minh đi qua nhận Tốc Độ Di Chuyển giảm dần. Cầu Sấm bắn qua cổng bay xa hơn, nhanh hơn và gây thêm sát thương.`,
    damageType: DamageType.MIXED,
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
      type: `HAMMER_KNOCKBACK_OR_CANNON_ACCELERATION_GATE`,
    },
    scaling: {
      hammerForm: {
        abilityName: `Thundering Blow`,
        targetMaxHealthDamagePercent: [10, 12.5, 15, 17.5, 20],
        attackDamageRatio: 1,
        damageType: `MAGIC`,
        knocksBackTarget: true,
        knocksBackNearbyEnemies: true,
      },
      cannonForm: {
        abilityName: `Acceleration Gate`,
        separateCooldown: {
          values: [14],
          unit: `seconds`,
        },
        movementSpeedBonusPercent: [35, 40, 45, 50, 55],
        movementSpeedIsDecaying: true,
        movementSpeedDurationSeconds: [2.5, 3, 3.5, 4, 4.5],
        affectsAllyChampionsPassingThrough: true,
        shockBlastInteraction: {
          travelsFarther: true,
          travelsFaster: true,
          damageIncreasePercent: 40,
        },
      },
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.KNOCK_BACK,
      SkillEffect.SPEED_UP,
      SkillEffect.BUFF,
    ],
    tags: [
      `THUNDERING_BLOW`,
      `ACCELERATION_GATE`,
      `FORM_SWAP`,
      `KNOCK_BACK`,
      `PERCENT_HEALTH_DAMAGE`,
      `MOVEMENT_SPEED`,
      `ALLY_BUFF`,
      `ACCELERATION_GATE_SYNERGY`,
    ],
  },
  // JAYCE - R
  {
    championKey: `jayce`,
    slot: SkillSlot.R,
    name: `Mercury Cannon / Mercury Hammer`,
    nameVi: `Pháo Thủy Ngân / Búa Thủy Ngân`,
    description: `Jayce transforms between Mercury Hammer and Mercury Cannon, gaining new abilities and changing attack style. Transforming into Mercury Cannon empowers the next ranged attack to deal bonus magic damage and reduce the target's Armor and Magic Resist. Transforming into Mercury Hammer grants Attack Speed, Armor, Magic Resist, and empowers the next hammer attack to deal bonus magic damage.`,
    descriptionVi: `Jayce chuyển đổi giữa Búa Thủy Ngân và Pháo Thủy Ngân, nhận bộ kỹ năng mới và thay đổi dạng tấn công. Chuyển sang Pháo Thủy Ngân cường hóa đòn đánh xa kế tiếp để gây thêm sát thương phép và giảm Giáp cùng Kháng Phép của mục tiêu. Chuyển sang Búa Thủy Ngân cho thêm Tốc Độ Đánh, Giáp, Kháng Phép và cường hóa đòn đánh bằng búa kế tiếp để gây thêm sát thương phép.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: {
      values: [5, 5, 5, 5],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `FORM_SWAP`,
    },
    scaling: {
      transformsBetweenMercuryHammerAndMercuryCannon: true,
      mercuryCannon: {
        grantsRangedAttacks: true,
        empoweredNextAttack: {
          bonusMagicDamage: {
            baseValue: 13,
            attackDamageRatio: 0.1,
            damageType: `MAGIC`,
          },
          armorReductionPercent: 11,
          magicResistReductionPercent: 11,
          reductionDurationSeconds: 5,
        },
      },
      mercuryHammer: {
        grantsMeleeAbilities: true,
        attackSpeedBonusPercent: 16,
        armorBonus: {
          baseValue: 5,
          bonusAttackDamageRatio: 0.09,
        },
        magicResistBonus: {
          baseValue: 5,
          bonusAttackDamageRatio: 0.09,
        },
        empoweredNextAttack: {
          bonusMagicDamage: {
            baseValue: 28,
            bonusAttackDamageRatio: 0.25,
            damageType: `MAGIC`,
          },
        },
      },
    },
    effects: [SkillEffect.BUFF],
    tags: [
      `MERCURY_CANNON`,
      `MERCURY_HAMMER`,
      `FORM_SWAP`,
      `STANCE_CHANGE`,
      `EMPOWERED_ATTACK`,
      `ARMOR_REDUCTION`,
      `MAGIC_RESIST_REDUCTION`,
    ],
  },
  // === JHIN ===
  // JHIN - PASSIVE
  {
    championKey: `jhin`,
    slot: SkillSlot.PASSIVE,
    name: `Whisper`,
    nameVi: `Lời Thì Thầm`,
    description: `Jhin's hand cannon, Whisper, carries 4 shots before needing to reload and fires at a fixed rate. Attack Speed is converted into Attack Damage. The final bullet critically strikes and deals additional missing Health physical damage. Whenever Whisper critically strikes, Jhin gains a burst of Movement Speed. Attack Damage scales with Critical Rate and bonus Attack Speed.`,
    descriptionVi: `Khẩu súng ngắn Lời Thì Thầm của Jhin có 4 viên đạn trước khi phải nạp lại và bắn với tốc độ cố định. Tốc Độ Đánh được chuyển hóa thành Sức Mạnh Công Kích. Viên đạn cuối luôn chí mạng và gây thêm sát thương vật lý theo Máu đã mất của mục tiêu. Mỗi khi Lời Thì Thầm chí mạng, Jhin nhận một lượng Tốc Độ Di Chuyển. Sức Mạnh Công Kích tăng theo Tỉ Lệ Chí Mạng và Tốc Độ Đánh cộng thêm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: {
      type: `FIXED_RATE_FOUR_SHOT_HAND_CANNON`,
    },
    scaling: {
      ammoCount: 4,
      requiresReloadAfterShots: 4,
      fixedAttackRate: true,
      attackSpeedConvertedToAttackDamage: true,
      attackDamageScalesWithCriticalRate: true,
      attackDamageScalesWithBonusAttackSpeed: true,
      finalBulletAlwaysCrits: true,
      finalBulletMissingHealthPhysicalDamagePercent: 11,
      movementSpeedOnCrit: {
        basePercent: 15,
        bonusAttackSpeedRatioPerOnePercent: 0.55,
        durationSeconds: 2,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP, SkillEffect.BUFF],
    tags: [
      `WHISPER`,
      `FOURTH_SHOT`,
      `RELOAD`,
      `CRITICAL_SCALING`,
      `MISSING_HEALTH_DAMAGE`,
      `MOVEMENT_SPEED`,
    ],
  },
  // JHIN - Q
  {
    championKey: `jhin`,
    slot: SkillSlot.Q,
    name: `Dancing Grenade`,
    nameVi: `Lựu Đạn Nhảy Múa`,
    description: `Jhin launches a magical cartridge at an enemy, dealing physical damage before bouncing to nearby targets that have not yet been hit. It can hit up to 4 targets and gains increased damage each time it kills.`,
    descriptionVi: `Jhin phóng một viên đạn ma thuật vào kẻ địch, gây sát thương vật lý rồi nảy sang mục tiêu gần đó chưa bị trúng. Kỹ năng có thể trúng tối đa 4 mục tiêu và tăng sát thương mỗi khi hạ gục mục tiêu.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [7, 6, 6, 5],
      unit: `seconds`,
    },
    cost: {
      values: [45, 50, 55, 60],
      resource: `MANA`,
    },
    range: {
      type: `TARGETED_BOUNCING_PROJECTILE`,
      maxTargets: 4,
    },
    scaling: {
      damage: {
        values: [45, 80, 115, 150],
        attackDamageRatioByRank: [0.35, 0.45, 0.55, 0.65],
        abilityPowerRatio: 0.6,
        damageType: `PHYSICAL`,
      },
      maxTargets: 4,
      bouncesOnlyToTargetsNotYetHit: true,
      damageIncreasePerKillPercent: 44,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `DANCING_GRENADE`,
      `BOUNCE`,
      `PHYSICAL_DAMAGE`,
      `EXECUTE_CHAIN`,
      `MULTI_TARGET`,
    ],
  },
  // JHIN - W
  {
    championKey: `jhin`,
    slot: SkillSlot.W,
    name: `Deadly Flourish`,
    nameVi: `Nét Vẽ Chết Chóc`,
    description: `Jhin fires a long range shot that stops on the first champion hit, dealing physical damage to that champion and reduced damage to minions and monsters hit along the way. If the target champion was struck by Jhin, Jhin's allies, or Lotus Traps recently, they are rooted and Jhin gains Movement Speed as though he had critically struck them.`,
    descriptionVi: `Jhin bắn một phát đạn tầm xa dừng lại ở tướng đầu tiên trúng phải, gây sát thương vật lý lên tướng đó và gây sát thương giảm lên lính cùng quái trên đường bay. Nếu tướng mục tiêu vừa bị Jhin, đồng minh của Jhin hoặc Bẫy Hoa Sen đánh trúng gần đây, chúng bị trói chân và Jhin nhận Tốc Độ Di Chuyển như khi chí mạng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [12, 12, 12, 12],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `LONG_RANGE_LINE_SHOT`,
    },
    scaling: {
      damage: {
        values: [60, 100, 140, 180],
        attackDamageRatio: 0.4,
        damageType: `PHYSICAL`,
      },
      stopsOnFirstChampionHit: true,
      minionAndMonsterDamageModifier: 0.75,
      rootConditionWindowSeconds: 4,
      rootsIfRecentlyStruckByJhin: true,
      rootsIfRecentlyStruckByJhinAllies: true,
      rootsIfRecentlyStruckByLotusTraps: true,
      rootDurationSeconds: [1.25, 1.5, 1.75, 2],
      grantsCritMovementSpeedOnRoot: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.ROOT, SkillEffect.SPEED_UP],
    tags: [
      `DEADLY_FLOURISH`,
      `LONG_RANGE_POKE`,
      `PHYSICAL_DAMAGE`,
      `ROOT`,
      `MARK_CONSUME`,
      `MOVEMENT_SPEED`,
    ],
  },
  // JHIN - E
  {
    championKey: `jhin`,
    slot: SkillSlot.E,
    name: `Captive Audience`,
    nameVi: `Cạm Bẫy Nghệ Thuật`,
    description: `Jhin places an invisible Lotus Trap that reveals nearby enemies when walked over. The trap slows enemies before dealing magic damage. When Jhin kills an enemy champion, a Lotus Trap spawns and detonates where they were killed. The trap deals reduced damage to non-champions and champions recently hit by another trap.`,
    descriptionVi: `Jhin đặt một Bẫy Hoa Sen vô hình, làm lộ diện kẻ địch gần đó khi bị kích hoạt. Bẫy làm chậm kẻ địch trước khi gây sát thương phép. Khi Jhin hạ gục tướng địch, một Bẫy Hoa Sen sẽ xuất hiện và phát nổ tại nơi chúng bị hạ. Bẫy gây giảm sát thương lên đơn vị không phải tướng và tướng vừa bị một bẫy khác đánh trúng gần đây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LOCATION,
    cooldown: {
      values: [2, 2, 2, 2],
      unit: `seconds`,
    },
    cost: {
      values: [35, 40, 45, 50],
      resource: `MANA`,
    },
    range: {
      type: `INVISIBLE_LOTUS_TRAP_PLACEMENT`,
    },
    scaling: {
      isInvisibleTrap: true,
      revealsNearbyEnemiesWhenTriggered: true,
      slowPercent: 30,
      damage: {
        values: [20, 100, 180, 260],
        attackDamageRatio: 1.2,
        abilityPowerRatio: 1,
        damageType: `MAGIC`,
      },
      spawnsAndDetonatesOnEnemyChampionKill: true,
      damageModifierVsNonChampions: 0.65,
      damageModifierVsChampionsRecentlyHitByAnotherTrap: 0.65,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.REVEAL],
    tags: [
      `CAPTIVE_AUDIENCE`,
      `LOTUS_TRAP`,
      `INVISIBLE_TRAP`,
      `VISION`,
      `REVEAL`,
      `SLOW`,
      `MAGIC_DAMAGE`,
    ],
  },
  // JHIN - R
  {
    championKey: `jhin`,
    slot: SkillSlot.R,
    name: `Curtain Call`,
    nameVi: `Sân Khấu Tử Thần`,
    description: `Jhin channels to fire 4 super shots at extreme range in a cone. The shots stop on the first champion hit, slowing them and dealing physical damage that increases based on the target's missing Health. The 4th shot critically strikes. Jhin can cancel the channel.`,
    descriptionVi: `Jhin vận sức để bắn 4 phát đạn siêu cấp ở tầm cực xa theo hình nón. Các phát bắn dừng lại ở tướng đầu tiên trúng phải, làm chậm mục tiêu và gây sát thương vật lý tăng theo Máu đã mất của mục tiêu. Phát bắn thứ 4 chí mạng. Jhin có thể hủy vận sức.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [80, 70, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `EXTREME_RANGE_CONE_CHANNEL_SHOTS`,
      shotCount: 4,
    },
    scaling: {
      channel: true,
      shotCount: 4,
      stopsOnFirstChampionHit: true,
      slowPercent: 80,
      slowDurationSeconds: 0.75,
      damage: {
        values: [75, 150, 225],
        attackDamageRatio: 0.25,
        damageType: `PHYSICAL`,
      },
      damageIncreasePercentPerOnePercentMissingHealth: 3,
      fourthShotCritDamageModifier: 2,
      canCancelChannel: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `CURTAIN_CALL`,
      `CHANNEL`,
      `LONG_RANGE_POKE`,
      `EXECUTE`,
      `FOURTH_SHOT`,
      `CRITICAL_SCALING`,
      `MISSING_HEALTH_DAMAGE`,
    ],
  },
  // === JINX ===
  // JINX - PASSIVE
  {
    championKey: `jinx`,
    slot: SkillSlot.PASSIVE,
    name: `Get Excited!`,
    nameVi: `Hưng Phấn!`,
    description: `Scoring a takedown on a champion or structure that Jinx has damaged recently grants her decaying Movement Speed and Total Attack Speed. While Excited, Jinx can exceed the Attack Speed cap. When Get Excited! triggers, Jinx restores a portion of her missing Mana.`,
    descriptionVi: `Tham gia hạ gục tướng hoặc công trình mà Jinx đã gây sát thương gần đây cho cô Tốc Độ Di Chuyển giảm dần và Tốc Độ Đánh tổng. Khi đang Hưng Phấn, Jinx có thể vượt giới hạn Tốc Độ Đánh. Khi Hưng Phấn! kích hoạt, Jinx hồi một phần Năng Lượng đã mất.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: {
      type: `TAKEDOWN_RESET_SELF_BUFF`,
    },
    scaling: {
      triggerWindowSeconds: 3,
      triggersOnChampionTakedownDamagedByJinx: true,
      triggersOnStructureTakedownDamagedByJinx: true,
      decayingMovementSpeedBonusPercent: 140,
      totalAttackSpeedBonusPercent: 12,
      durationSeconds: 6,
      canExceedAttackSpeedCapWhileExcited: true,
      missingManaRestorePercent: 10,
    },
    effects: [SkillEffect.SPEED_UP, SkillEffect.BUFF],
    tags: [
      `GET_EXCITED`,
      `TAKEDOWN_RESET`,
      `MOVEMENT_SPEED`,
      `ATTACK_SPEED_STEROID`,
      `MANA_RESTORE`,
      `RESET_CARRY`,
    ],
  },
  // JINX - Q
  {
    championKey: `jinx`,
    slot: SkillSlot.Q,
    name: `Switcheroo!`,
    nameVi: `Tráo Hàng!`,
    description: `Jinx swaps weapons between Fishbones, the Rocket Launcher, and Pow-Pow, the Minigun. Fishbones attacks cost Mana, gain bonus range, and explode to deal increased damage to the target and nearby enemies. Pow-Pow attacks grant stacking Attack Speed for a short duration. Pow-Pow stacks fall off one at a time and only benefit the first attack fired from Fishbones.`,
    descriptionVi: `Jinx đổi vũ khí giữa Xương Cá, Súng Phóng Lựu, và Bằng Chíu, Súng Nhỏ. Đòn đánh với Xương Cá tốn Năng Lượng, được tăng tầm đánh và phát nổ gây thêm sát thương lên mục tiêu cùng kẻ địch xung quanh. Đòn đánh với Bằng Chíu cho Tốc Độ Đánh cộng dồn trong thời gian ngắn. Cộng dồn của Bằng Chíu mất dần từng cộng dồn và chỉ có lợi cho phát bắn Xương Cá đầu tiên.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.SELF,
    cooldown: {
      values: [1, 1, 1, 1],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `WEAPON_SWAP_TOGGLE`,
    },
    scaling: {
      fishbonesRocketLauncher: {
        attacksCostMana: true,
        bonusRange: [80, 95, 110, 125],
        explosionDamageModifier: 1.12,
        damagesTargetAndNearbyEnemies: true,
      },
      powPowMinigun: {
        attackSpeedStackDurationSeconds: 2.5,
        maxStacks: 3,
        totalAttackSpeedBonusPercent: [35, 60, 85, 110],
        stacksFallOffOneAtATime: true,
        stacksOnlyBenefitFirstFishbonesAttack: true,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `SWITCHEROO`,
      `WEAPON_SWAP`,
      `ROCKET_LAUNCHER`,
      `MINIGUN`,
      `ATTACK_SPEED_STEROID`,
      `AREA_DAMAGE`,
    ],
  },
  // JINX - W
  {
    championKey: `jinx`,
    slot: SkillSlot.W,
    name: `Zap!`,
    nameVi: `Giật Bắn!`,
    description: `Jinx fires a shock blast that deals physical damage to the first enemy hit, grants vision of them, and slows them.`,
    descriptionVi: `Jinx bắn một luồng điện gây sát thương vật lý lên kẻ địch đầu tiên trúng phải, làm lộ diện chúng và làm chậm chúng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [8, 7, 6, 5],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `MANA`,
    },
    range: {
      type: `LINE_SHOCK_BLAST`,
    },
    scaling: {
      damage: {
        values: [10, 80, 150, 220],
        attackDamageRatio: 1.6,
        damageType: `PHYSICAL`,
      },
      stopsOnFirstEnemyHit: true,
      grantsVisionOfTarget: true,
      slowPercent: [30, 40, 50, 60],
      slowDurationSeconds: 2,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.REVEAL],
    tags: [
      `ZAP`,
      `PHYSICAL_DAMAGE`,
      `LONG_RANGE_POKE`,
      `SLOW`,
      `VISION`,
      `REVEAL`,
    ],
  },
  // JINX - E
  {
    championKey: `jinx`,
    slot: SkillSlot.E,
    name: `Flame Chompers!`,
    nameVi: `Lựu Đạn Ma Hỏa!`,
    description: `Jinx tosses out three chompers that arm after a brief delay. Chompers explode on contact with enemy champions, interrupting their dashes and rooting them. Enemies hit by the explosion take magic damage. Chompers last for a short duration and explode automatically if no champion triggers them.`,
    descriptionVi: `Jinx ném ra ba quả lựu đạn ma hỏa, chúng được kích hoạt sau một khoảng trễ ngắn. Chúng phát nổ khi tiếp xúc với tướng địch, ngắt lướt và trói chân mục tiêu. Kẻ địch trúng vụ nổ chịu sát thương phép. Lựu đạn tồn tại trong thời gian ngắn và tự phát nổ nếu không có tướng kích hoạt.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LOCATION,
    cooldown: {
      values: [15, 13, 11, 9],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: {
      type: `THREE_TRAP_PLACEMENT`,
      trapCount: 3,
    },
    scaling: {
      trapCount: 3,
      armsAfterBriefDelay: true,
      explodesOnEnemyChampionContact: true,
      interruptsDashes: true,
      rootDurationSeconds: [1.45, 1.55, 1.65, 1.75],
      damage: {
        values: [70, 140, 210, 280],
        abilityPowerRatio: 1,
        damageType: `MAGIC`,
      },
      trapDurationSeconds: 5,
      automaticallyExplodesIfNoChampionTriggers: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.ROOT],
    tags: [
      `FLAME_CHOMPERS`,
      `TRAP`,
      `DASH_INTERRUPT`,
      `ROOT`,
      `MAGIC_DAMAGE`,
      `ZONE_CONTROL`,
    ],
  },
  // JINX - R
  {
    championKey: `jinx`,
    slot: SkillSlot.R,
    name: `Super Mega Death Rocket!`,
    nameVi: `Tên Lửa Đạn Đạo Siêu Khủng Khiếp!`,
    description: `Jinx fires a mega-rocket that gains damage and speed over the first second it travels. The rocket explodes on the first enemy champion hit, dealing physical damage plus missing Health damage. Nearby enemies take reduced damage. The rocket has a damage cap against epic monsters.`,
    descriptionVi: `Jinx bắn một quả tên lửa siêu khủng tăng sát thương và tốc độ trong giây đầu tiên bay đi. Tên lửa phát nổ khi trúng tướng địch đầu tiên, gây sát thương vật lý cộng thêm sát thương theo Máu đã mất. Kẻ địch gần đó chịu sát thương giảm. Tên lửa có giới hạn sát thương lên quái khủng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [50, 45, 40],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `LONG_RANGE_MEGA_ROCKET`,
    },
    scaling: {
      gainsDamageAndSpeedOverFirstSecond: true,
      explodesOnFirstEnemyChampionHit: true,
      damageByTravelTime: {
        minValues: [25, 35, 45],
        maxValues: [250, 350, 450],
        minAttackDamageRatio: 0.15,
        maxAttackDamageRatio: 1.5,
        damageType: `PHYSICAL`,
      },
      missingHealthDamagePercent: [25, 30, 35],
      nearbyEnemyDamageModifier: 0.8,
      maxDamageToEpicMonsters: 500,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `SUPER_MEGA_DEATH_ROCKET`,
      `LONG_RANGE_EXECUTE`,
      `MISSING_HEALTH_DAMAGE`,
      `PHYSICAL_DAMAGE`,
      `AREA_DAMAGE`,
      `EPIC_MONSTER`,
    ],
  },
  // === K'SANTE ===
  // K'SANTE - PASSIVE
  {
    championKey: `ksante`,
    slot: SkillSlot.PASSIVE,
    name: `Dauntless Instinct`,
    nameVi: `Bản Năng Bất Khuất`,
    description: `K'Sante's damaging abilities mark enemies with Dauntless Instinct. Attacking a marked target deals physical damage based on the target's maximum Health and consumes the mark. During All Out, K'Sante's attacks, active abilities, and passive deal additional maximum Health physical damage that scales with bonus Armor and bonus Magic Resist.`,
    descriptionVi: `Kỹ năng gây sát thương của K'Sante đánh dấu kẻ địch bằng Bản Năng Bất Khuất. Đòn đánh lên mục tiêu bị đánh dấu gây sát thương vật lý theo Máu tối đa của mục tiêu và tiêu thụ dấu ấn. Khi Khô Máu, đòn đánh, kỹ năng kích hoạt và nội tại của K'Sante gây thêm sát thương vật lý theo Máu tối đa, tỉ lệ với Giáp cộng thêm và Kháng Phép cộng thêm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: {
      type: `MARKED_TARGET_BASIC_ATTACK_PROC`,
    },
    scaling: {
      damagingAbilitiesApplyMark: true,
      basicAttackConsumesMark: true,
      markDamage: {
        targetMaxHealthBasePercent: 12,
        targetMaxHealthScalingPercentByLevel: {
          min: 1,
          max: 2,
        },
        damageType: `PHYSICAL`,
      },
      allOutBonusDamage: {
        appliesToBasicAttacks: true,
        appliesToActiveAbilities: true,
        appliesToPassive: true,
        targetMaxHealthBasePercent: 1,
        bonusArmorRatioPercent: 0.01,
        bonusMagicResistRatioPercent: 0.01,
        damageType: `PHYSICAL`,
      },
      minionMinimumDamageByLevel: {
        min: 15,
        max: 85,
      },
      monsterMinimumDamageByLevel: {
        min: 25,
        max: 95,
      },
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `DAUNTLESS_INSTINCT`,
      `MARK`,
      `MARK_CONSUME`,
      `MAX_HEALTH_DAMAGE`,
      `PHYSICAL_DAMAGE`,
      `ALL_OUT`,
    ],
  },
  // K'SANTE - Q
  {
    championKey: `ksante`,
    slot: SkillSlot.Q,
    name: `Ntofo Strikes`,
    nameVi: `Ntofo Công Phá`,
    description: `K'Sante slams his weapon, dealing physical damage and slowing enemies. If he hits a target, he gains a stack of Ntofo Strikes. At 2 stacks, he instead fires a shockwave that pulls in and stuns the target. During All Out, this ability's cooldown is reduced.`,
    descriptionVi: `K'Sante đập vũ khí xuống, gây sát thương vật lý và làm chậm kẻ địch. Nếu trúng mục tiêu, hắn nhận một cộng dồn Ntofo Công Phá. Ở 2 cộng dồn, kỹ năng đổi thành sóng xung kích kéo mục tiêu vào và làm choáng. Khi Khô Máu, hồi chiêu kỹ năng này được giảm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [3, 3, 3, 3],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `LINE_WEAPON_SLAM_OR_SHOCKWAVE`,
    },
    scaling: {
      damage: {
        values: [80, 120, 160, 200],
        bonusArmorRatio: 0.35,
        bonusMagicResistRatio: 0.35,
        damageType: `PHYSICAL`,
      },
      slowPercent: 80,
      slowDurationSeconds: 0.5,
      stackDurationSeconds: 6,
      maxStacks: 2,
      gainsStackOnHit: true,
      atTwoStacksFiresShockwave: true,
      shockwavePullsTarget: true,
      shockwaveStunDurationSeconds: 0.75,
      allOut: {
        cooldownReductionPercent: 30,
      },
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.STUN],
    tags: [
      `NTOFO_STRIKES`,
      `STACKING_ABILITY`,
      `SHOCKWAVE`,
      `PULL`,
      `STUN`,
      `SLOW`,
      `ALL_OUT`,
    ],
  },
  // K'SANTE - W
  {
    championKey: `ksante`,
    slot: SkillSlot.W,
    name: `Path Maker`,
    nameVi: `Mở Đường`,
    description: `K'Sante raises his weapons and charges up. During this time, he is unstoppable and reduces incoming damage. After charging, he dashes forward, dealing physical damage based on the target's maximum Health, knocking back the target, and stunning based on charge time. During All Out, this ability's cooldown is refreshed, deals additional true damage based on charge time, gains increased damage reduction and dash speed, but no longer knocks back or stuns.`,
    descriptionVi: `K'Sante giương vũ khí và tụ lực. Trong thời gian này, hắn không thể bị cản phá và giảm sát thương nhận vào. Sau khi tụ lực, hắn lướt về phía trước, gây sát thương vật lý theo Máu tối đa của mục tiêu, đẩy lùi và làm choáng dựa trên thời gian tụ lực. Khi Khô Máu, hồi chiêu kỹ năng này được làm mới, gây thêm sát thương chuẩn theo thời gian tụ lực, tăng giảm sát thương và tốc độ lướt, nhưng không còn đẩy lùi hoặc làm choáng.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.LINE,
    cooldown: {
      values: [13, 12, 11, 10],
      unit: `seconds`,
    },
    cost: {
      values: [40, 45, 50, 55],
      resource: `MANA`,
    },
    range: {
      type: `CHARGED_UNSTOPPABLE_DASH`,
    },
    scaling: {
      chargeDurationSeconds: {
        min: 0.3,
        max: 0.75,
      },
      unstoppableWhileCharging: true,
      incomingDamageReductionPercent: 30,
      dashDamage: {
        flatValues: [50, 80, 110, 140],
        targetMaxHealthPercent: 8,
        bonusArmorRatioPercent: 0.02,
        bonusMagicResistRatioPercent: 0.02,
        damageType: `PHYSICAL`,
      },
      knocksBackTarget: true,
      stunDurationByChargeTimeSeconds: {
        min: 0.5,
        max: 1.65,
      },
      maxDamageToMonsters: [180, 280, 380, 480],
      allOut: {
        refreshesCooldown: true,
        additionalTrueDamagePercentByChargeTime: {
          min: 10,
          max: 80,
        },
        damageReductionIncreasePercent: 75,
        dashSpeedIncreased: true,
        noLongerKnocksBack: true,
        noLongerStuns: true,
      },
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.DASH,
      SkillEffect.KNOCK_BACK,
      SkillEffect.STUN,
      SkillEffect.DAMAGE_REDUCTION,
    ],
    tags: [
      `PATH_MAKER`,
      `CHARGED_DASH`,
      `UNSTOPPABLE`,
      `DAMAGE_REDUCTION`,
      `KNOCK_BACK`,
      `STUN`,
      `TRUE_DAMAGE`,
      `ALL_OUT`,
    ],
  },
  // K'SANTE - E
  {
    championKey: `ksante`,
    slot: SkillSlot.E,
    name: `Footwork`,
    nameVi: `Bước Chân Dũng Mãnh`,
    description: `K'Sante dashes and gains a shield. If dashing to an allied champion, the dash distance is significantly increased and the ally gains the same shield. During All Out, this ability's cooldown is reduced and dash speed is increased.`,
    descriptionVi: `K'Sante lướt và nhận một lớp lá chắn. Nếu lướt tới tướng đồng minh, khoảng cách lướt được tăng mạnh và đồng minh cũng nhận lá chắn tương tự. Khi Khô Máu, hồi chiêu kỹ năng này được giảm và tốc độ lướt tăng.`,
    damageType: DamageType.UTILITY,
    targetType: TargetType.ALLY,
    cooldown: {
      values: [11, 10, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [40, 45, 50, 55],
      resource: `MANA`,
    },
    range: {
      type: `SELF_OR_ALLIED_CHAMPION_DASH_SHIELD`,
    },
    scaling: {
      shieldAmount: {
        values: [75, 120, 165, 210],
        bonusHealthRatio: 0.15,
      },
      shieldDurationSeconds: 2,
      dashesToTarget: true,
      alliedChampionDashDistanceSignificantlyIncreased: true,
      alliedChampionReceivesSameShield: true,
      allOut: {
        cooldownReductionPercent: 50,
        dashSpeedIncreased: true,
      },
    },
    effects: [SkillEffect.DASH, SkillEffect.SHIELD],
    tags: [
      `FOOTWORK`,
      `DASH`,
      `SHIELD`,
      `ALLY_SHIELD`,
      `BONUS_HEALTH_SCALING`,
      `ALL_OUT`,
    ],
  },
  // K'SANTE - R
  {
    championKey: `ksante`,
    slot: SkillSlot.R,
    name: `All Out`,
    nameVi: `Khô Máu`,
    description: `K'Sante shatters his ntofos to knock back an enemy champion, deal physical damage, dash behind them, and enter All Out. If the enemy would hit a wall, they are knocked back through the wall and K'Sante strikes them again. During All Out, his basic abilities are upgraded, he gains Attack Speed, bonus Armor Penetration and Omnivamp, but loses maximum Health, bonus Armor, and bonus Magic Resist. K'Sante is unstoppable and roots his target while casting this ability.`,
    descriptionVi: `K'Sante phá vỡ ntofo để đẩy lùi một tướng địch, gây sát thương vật lý, lướt ra sau chúng và bước vào trạng thái Khô Máu. Nếu kẻ địch va vào tường, chúng bị đẩy xuyên tường và K'Sante tấn công thêm lần nữa. Khi Khô Máu, kỹ năng cơ bản của hắn được nâng cấp, nhận Tốc Độ Đánh, Xuyên Giáp cộng thêm và Hút Máu Toàn Phần, nhưng mất Máu tối đa, Giáp cộng thêm và Kháng Phép cộng thêm. K'Sante không thể bị cản phá và trói chân mục tiêu khi đang thi triển kỹ năng này.`,
    damageType: DamageType.PHYSICAL,
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
      type: `TARGETED_ENEMY_CHAMPION_KNOCKBACK_TRANSFORM`,
    },
    scaling: {
      initialDamage: {
        values: [80, 115, 150],
        damageType: `PHYSICAL`,
      },
      knocksBackEnemyChampion: true,
      dashesBehindTarget: true,
      allOutDurationSeconds: 15,
      demolishingStrike: {
        triggersIfEnemyWouldHitWall: true,
        knocksTargetThroughWall: true,
        secondStrikeDamage: {
          values: [80, 115, 150],
          bonusHealthRatio: 0.05,
          damageType: `PHYSICAL`,
        },
      },
      allOutBuffs: {
        upgradesBasicAbilities: true,
        attackSpeedBonusPercent: [40, 60, 80],
        bonusArmorPenetrationPercent: 50,
        omnivampPercent: 20,
        maxHealthLossPercent: 30,
        bonusArmorLossPercent: 80,
        bonusMagicResistLossPercent: 80,
      },
      unstoppableWhileCasting: true,
      rootsTargetWhileCasting: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.KNOCK_BACK,
      SkillEffect.DASH,
      SkillEffect.BUFF,
      SkillEffect.ROOT,
    ],
    tags: [
      `ALL_OUT`,
      `DEMOLISHING_STRIKE`,
      `FORM_SWAP`,
      `KNOCK_BACK`,
      `WALL_COLLISION`,
      `ARMOR_PENETRATION`,
      `OMNIVAMP`,
      `UNSTOPPABLE`,
    ],
  },
  // === KAI'SA ===
  // KAI'SA - PASSIVE
  {
    championKey: `kaisa`,
    slot: SkillSlot.PASSIVE,
    name: `Second Skin`,
    nameVi: `Lớp Da Thứ Hai`,
    description: `Living Weapon: Kai'Sa's abilities evolve based upon the permanent stats she gains from advanced equipment.

Caustic Wounds: Kai'Sa's attacks stack Plasma for 4 seconds and deal 5 (+15% AP) bonus magic damage. Plasma detonates at 5 stacks, dealing 15% (+0.025% AP) bonus magic damage of their missing Health. Nearby allies apply 1 stack to champions they Immobilize.

Plasma detonations deal a max of 400 damage to monsters.`,
    descriptionVi: `Vũ Khí Sống: Kỹ năng của Kai'Sa tiến hóa dựa trên chỉ số vĩnh viễn cô nhận được từ trang bị nâng cấp.

Vết Thương Ăn Mòn: Đòn đánh của Kai'Sa cộng dồn Plasma trong 4 giây và gây thêm 5 (+15% SMPT) sát thương phép. Khi đạt 5 cộng dồn, Plasma phát nổ, gây sát thương phép cộng thêm bằng 15% (+0.025% SMPT) Máu đã mất của mục tiêu. Đồng minh gần đó áp dụng 1 cộng dồn lên tướng địch khi khống chế bất động chúng.

Sát thương kích nổ Plasma lên quái tối đa 400.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      plasmaDurationSeconds: 4,
      plasmaStacksToDetonate: 5,
      bonusMagicDamageBase: 5,
      bonusMagicDamageApRatio: 0.15,
      detonationMissingHealthDamagePercent: 15,
      detonationMissingHealthDamageApRatioPercent: 0.025,
      maxMonsterDetonationDamage: 400,
      allyImmobilizePlasmaStacks: 1,
      livingWeaponEvolvesFromPermanentAdvancedEquipmentStats: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `PLASMA`,
      `LIVING_WEAPON`,
      `ABILITY_EVOLUTION`,
      `ON_HIT_EFFECTS`,
      `MISSING_HEALTH_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KAI'SA - Q
  {
    championKey: `kaisa`,
    slot: SkillSlot.Q,
    name: `Icathian Rain`,
    nameVi: `Cơn Mưa Icathia`,
    description: `Launches 6 missiles that split evenly among nearby enemies, each dealing 40 / 60 / 80 / 100 (+50% AD +30% AP) physical damage. Additional hits on champions or monsters deal 25% damage.

Living Weapon: 70 Attack Damage - Fires 12 missiles.

Minions below 35% Health take 150% damage. Damage factor to Monsters: 50%.`,
    descriptionVi: `Phóng 6 tên lửa chia đều lên các kẻ địch gần đó, mỗi tên lửa gây 40 / 60 / 80 / 100 (+50% SMCK +30% SMPT) sát thương vật lý. Các lần trúng thêm lên tướng hoặc quái gây 25% sát thương.

Vũ Khí Sống: 70 Sức Mạnh Công Kích - Bắn 12 tên lửa.

Lính dưới 35% Máu nhận 150% sát thương. Hệ số sát thương lên quái: 50%.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [55, 55, 55, 55],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      missileCount: 6,
      evolvedMissileCount: 12,
      livingWeaponAttackDamageRequirement: 70,
      damageValues: [40, 60, 80, 100],
      attackDamageRatio: 0.5,
      abilityPowerRatio: 0.3,
      additionalHitDamageRatio: 0.25,
      lowHealthMinionThresholdPercent: 35,
      lowHealthMinionDamageRatio: 1.5,
      monsterDamageRatio: 0.5,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `MISSILE`,
      `MULTI_HIT`,
      `LIVING_WEAPON`,
      `ABILITY_EVOLUTION`,
      `PHYSICAL_DAMAGE`,
      `WAVE_CLEAR`,
    ],
  },

  // KAI'SA - W
  {
    championKey: `kaisa`,
    slot: SkillSlot.W,
    name: `Void Seeker`,
    nameVi: `Tia Truy Kích`,
    description: `Fires a blast that reveals the first enemy hit, adds 2 Plasma stacks, and deals 30 / 60 / 90 / 120 (+110% AD +60% AP) magic damage.

Living Weapon: 80 Ability Power - Adds 3 stacks and refunds 70% Cooldown on champion hits.`,
    descriptionVi: `Bắn ra một luồng năng lượng làm lộ diện kẻ địch đầu tiên trúng phải, cộng 2 điểm Plasma và gây 30 / 60 / 90 / 120 (+110% SMCK +60% SMPT) sát thương phép.

Vũ Khí Sống: 80 Sức Mạnh Phép Thuật - Cộng 3 điểm Plasma và hoàn lại 70% hồi chiêu khi trúng tướng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [20, 18, 16, 14],
      unit: `seconds`,
    },
    cost: {
      values: [60, 65, 70, 75],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damageValues: [30, 60, 90, 120],
      attackDamageRatio: 1.1,
      abilityPowerRatio: 0.6,
      plasmaStacks: 2,
      evolvedPlasmaStacks: 3,
      livingWeaponAbilityPowerRequirement: 80,
      cooldownRefundOnChampionHitRatio: 0.7,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.REVEAL],
    tags: [
      `PLASMA`,
      `SKILL_SHOT`,
      `REVEAL`,
      `LONG_RANGE_POKE`,
      `COOLDOWN_REFUND`,
      `LIVING_WEAPON`,
      `ABILITY_EVOLUTION`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KAI'SA - E
  {
    championKey: `kaisa`,
    slot: SkillSlot.E,
    name: `Supercharge`,
    nameVi: `Tích Tụ Năng Lượng`,
    description: `Charges up for 1 second, gaining 50% / 55% / 60% / 65% (+80% Attack Speed) Movement Speed. For 4 seconds after charging, gain 40% / 50% / 60% / 70% Attack Speed.

Living Weapon: 65% Attack Speed - Grants invisibility during the charge up.

Attacks reduce Supercharge's Cooldown by 0.5 seconds. Charge time and Movement Speed scale with Attack Speed.`,
    descriptionVi: `Tích tụ trong 1 giây, nhận 50% / 55% / 60% / 65% (+80% Tốc Độ Đánh) Tốc Độ Di Chuyển. Trong 4 giây sau khi tích tụ, nhận 40% / 50% / 60% / 70% Tốc Độ Đánh.

Vũ Khí Sống: 65% Tốc Độ Đánh - Nhận tàng hình trong thời gian tích tụ.

Đòn đánh giảm hồi chiêu của Tích Tụ Năng Lượng đi 0.5 giây. Thời gian tích tụ và Tốc Độ Di Chuyển tỉ lệ với Tốc Độ Đánh.`,
    damageType: DamageType.NONE,
    targetType: TargetType.SELF,
    cooldown: {
      values: [16, 14, 12, 10],
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      chargeDurationSeconds: 1,
      buffDurationSeconds: 4,
      movementSpeedValuesPercent: [50, 55, 60, 65],
      movementSpeedAttackSpeedRatioPercent: 80,
      attackSpeedValuesPercent: [40, 50, 60, 70],
      livingWeaponAttackSpeedRequirementPercent: 65,
      grantsInvisibilityDuringChargeWhenEvolved: true,
      cooldownReductionPerAttackSeconds: 0.5,
      chargeTimeScalesWithAttackSpeed: true,
      movementSpeedScalesWithAttackSpeed: true,
    },
    effects: [SkillEffect.SPEED_UP, SkillEffect.BUFF],
    tags: [
      `MOVEMENT_SPEED`,
      `ATTACK_SPEED_STEROID`,
      `STEALTH`,
      `SELF_BUFF`,
      `COOLDOWN_REDUCTION`,
      `LIVING_WEAPON`,
      `ABILITY_EVOLUTION`,
    ],
  },

  // KAI'SA - R
  {
    championKey: `kaisa`,
    slot: SkillSlot.R,
    name: `Killer Instinct`,
    nameVi: `Bản Năng Sát Thủ`,
    description: `Dash to a location near an enemy champion marked by Plasma, gaining a shield that absorbs 75 / 100 / 125 (+100% / 150% / 200% AD +75% AP) damage for 2 seconds.`,
    descriptionVi: `Lướt tới một vị trí gần tướng địch bị đánh dấu Plasma, nhận lá chắn hấp thụ 75 / 100 / 125 (+100% / 150% / 200% SMCK +75% SMPT) sát thương trong 2 giây.`,
    damageType: DamageType.NONE,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [80, 70, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      shieldValues: [75, 100, 125],
      shieldAttackDamageRatios: [1, 1.5, 2],
      shieldAbilityPowerRatio: 0.75,
      shieldDurationSeconds: 2,
      requiresEnemyChampionMarkedByPlasma: true,
      dashToLocationNearMarkedChampion: true,
    },
    effects: [SkillEffect.DASH, SkillEffect.SHIELD],
    tags: [
      `PLASMA`,
      `DASH`,
      `SHIELD`,
      `BACKLINE_ACCESS`,
      `PICK_POTENTIAL`,
      `KILLER_INSTINCT`,
    ],
  },
  // === KALISTA ===
  // KALISTA - PASSIVE
  {
    championKey: `kalista`,
    slot: SkillSlot.PASSIVE,
    name: `Martial Poise`,
    nameVi: `Phong Thái Quân Nhân`,
    description: `When Kalista winds up her attacks, moving the left joystick will cause her to dash for a short distance in that direction after she throws her spear.

When the game starts, she can choose an ally to become her Oathsworn. Kalista cannot change her Oathsworn.

Once Kalista launches her attacks, they cannot be canceled. Her dash speed and distance scale with boot tier.`,
    descriptionVi: `Khi Kalista chuẩn bị tung đòn đánh, di chuyển cần điều khiển trái sẽ khiến cô lướt một đoạn ngắn theo hướng đó sau khi phóng lao.

Khi trận đấu bắt đầu, cô có thể chọn một đồng minh làm Thệ Ước. Kalista không thể thay đổi Thệ Ước.

Sau khi Kalista tung đòn đánh, đòn đánh đó không thể bị hủy. Tốc độ và khoảng cách lướt của cô tỉ lệ với bậc giày.`,
    damageType: DamageType.NONE,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      dashAfterAttackWindup: true,
      attackCannotBeCanceledAfterLaunch: true,
      dashSpeedScalesWithBootTier: true,
      dashDistanceScalesWithBootTier: true,
      oathswornSelectedAtGameStart: true,
      oathswornCannotBeChanged: true,
    },
    effects: [SkillEffect.DASH],
    tags: [
      `MARTIAL_POISE`,
      `DASH`,
      `OATHSWORN`,
      `BOOT_SCALING`,
      `AUTO_ATTACK_CHAMPION`,
    ],
  },

  // KALISTA - Q
  {
    championKey: `kalista`,
    slot: SkillSlot.Q,
    name: `Pierce`,
    nameVi: `Đâm Xuyên`,
    description: `Hurls a spear, dealing 70 / 135 / 200 / 265 (+110% AD) physical damage to the first target hit. If this kills the target, the spear continues onward, carrying the target's Rend stacks to the next enemy hit.

After casting this ability, Kalista can dash using Martial Poise.`,
    descriptionVi: `Phóng một ngọn lao, gây 70 / 135 / 200 / 265 (+110% SMCK) sát thương vật lý lên mục tiêu đầu tiên trúng phải. Nếu kỹ năng này hạ gục mục tiêu, ngọn lao tiếp tục bay tiếp, mang theo cộng dồn Giày Vò của mục tiêu sang kẻ địch tiếp theo trúng phải.

Sau khi dùng kỹ năng này, Kalista có thể lướt bằng Phong Thái Quân Nhân.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [8, 7, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [55, 60, 65, 70],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damageValues: [70, 135, 200, 265],
      attackDamageRatio: 1.1,
      continuesOnKill: true,
      transfersRendStacksOnKill: true,
      enablesMartialPoiseDashAfterCast: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `SPEAR`,
      `SKILL_SHOT`,
      `PIERCING_PROJECTILE`,
      `REND_STACK_TRANSFER`,
      `MARTIAL_POISE`,
      `PHYSICAL_DAMAGE`,
    ],
  },

  // KALISTA - W
  {
    championKey: `kalista`,
    slot: SkillSlot.W,
    name: `Sentinel`,
    nameVi: `Lính Canh`,
    description: `Passive: When the distance between Kalista and her Oathsworn is less than 8, and both hit the same target within 4 seconds using attacks or Pierce, Kalista deals 16% / 17% / 18% / 19% of the target's max Health as bonus magic damage. This effect has a 8 second cooldown per target.

Active: Sends a Soul Sentinel to patrol an area. Upon spotting an enemy champion, the Sentinel follows them for 4 seconds, revealing them for 4 seconds. Sentinels disappear after patrolling 3 laps.

Charge: Kalista gains a charge every 45 / 40 / 35 / 30 seconds, storing up to 2 charges.

This ability's passive deals at least 75 damage against minions and executes them if their Health is below 125.`,
    descriptionVi: `Nội tại: Khi khoảng cách giữa Kalista và Thệ Ước nhỏ hơn 8, và cả hai cùng đánh trúng một mục tiêu trong vòng 4 giây bằng đòn đánh hoặc Đâm Xuyên, Kalista gây thêm sát thương phép bằng 16% / 17% / 18% / 19% Máu tối đa của mục tiêu. Hiệu ứng này có 8 giây hồi chiêu trên mỗi mục tiêu.

Kích hoạt: Gửi một Lính Canh Linh Hồn đi tuần tra một khu vực. Khi phát hiện tướng địch, Lính Canh bám theo chúng trong 4 giây, làm lộ diện chúng trong 4 giây. Lính Canh biến mất sau khi tuần tra 3 vòng.

Tích trữ: Kalista nhận một điểm tích trữ mỗi 45 / 40 / 35 / 30 giây, tối đa 2 điểm.

Nội tại của kỹ năng này gây ít nhất 75 sát thương lên lính và kết liễu chúng nếu Máu của chúng dưới 125.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [20, 20, 20, 20],
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      oathswornDistanceThreshold: 8,
      sameTargetHitWindowSeconds: 4,
      maxHealthDamagePercentValues: [16, 17, 18, 19],
      perTargetCooldownSeconds: 8,
      revealFollowDurationSeconds: 4,
      revealDurationSeconds: 4,
      patrolLapsBeforeDisappear: 3,
      chargeRechargeSeconds: [45, 40, 35, 30],
      maxCharges: 2,
      minimumMinionDamage: 75,
      minionExecuteHealthThreshold: 125,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.REVEAL],
    tags: [
      `OATHSWORN`,
      `SOUL_SENTINEL`,
      `REVEAL`,
      `VISION`,
      `PATROL`,
      `CHARGE_SYSTEM`,
      `PERCENT_HEALTH_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KALISTA - E
  {
    championKey: `kalista`,
    slot: SkillSlot.E,
    name: `Rend`,
    nameVi: `Giày Vò`,
    description: `Passive: On hit, Kalista's spears linger in their target for 4 seconds, applying a stacking Rend.

Active: Kalista rips the spears from nearby enemies, dealing 30 / 45 / 60 / 75 (+70% AD) physical damage plus 12 / 22 / 32 / 42 (+36% / 43% / 50% / 57% AD) physical damage per spear after the first. Slows enemies hit by 15% / 25% / 35% / 45% for 2 seconds.

If this ability kills at least one target, its cooldown is refreshed, and it refunds 12 / 18 / 24 / 30 Mana.

Deals 50% damage to epic monsters.`,
    descriptionVi: `Nội tại: Khi đánh trúng, lao của Kalista lưu lại trong mục tiêu trong 4 giây, tạo cộng dồn Giày Vò.

Kích hoạt: Kalista rút lao khỏi các kẻ địch gần đó, gây 30 / 45 / 60 / 75 (+70% SMCK) sát thương vật lý cộng thêm 12 / 22 / 32 / 42 (+36% / 43% / 50% / 57% SMCK) sát thương vật lý với mỗi lao sau lao đầu tiên. Làm chậm kẻ địch trúng phải 15% / 25% / 35% / 45% trong 2 giây.

Nếu kỹ năng này hạ gục ít nhất một mục tiêu, hồi chiêu được làm mới và hoàn lại 12 / 18 / 24 / 30 Năng Lượng.

Gây 50% sát thương lên quái khủng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [30, 30, 30, 30],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      rendStackDurationSeconds: 4,
      baseDamageValues: [30, 45, 60, 75],
      baseDamageAttackDamageRatio: 0.7,
      damagePerSpearAfterFirstValues: [12, 22, 32, 42],
      damagePerSpearAfterFirstAttackDamageRatios: [0.36, 0.43, 0.5, 0.57],
      slowValuesPercent: [15, 25, 35, 45],
      slowDurationSeconds: 2,
      cooldownRefreshOnKill: true,
      manaRefundOnKillValues: [12, 18, 24, 30],
      epicMonsterDamageRatio: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `REND`,
      `STACKING_PASSIVE`,
      `SLOW`,
      `COOLDOWN_REFRESH`,
      `MANA_REFUND`,
      `OBJECTIVE_CONTROL`,
      `PHYSICAL_DAMAGE`,
    ],
  },

  // KALISTA - R
  {
    championKey: `kalista`,
    slot: SkillSlot.R,
    name: `Fate's Call`,
    nameVi: `Định Mệnh Vẫy Gọi`,
    description: `Kalista puts her Oathsworn into stasis and draws them to herself for up to 4 seconds.

The Oathsworn can launch themselves in a direction, knocking nearby enemies airborne for 1 / 1.5 / 2 seconds upon hitting the first enemy champion. The Oathsworn then ricochets for a distance based on their max attack range.`,
    descriptionVi: `Kalista đưa Thệ Ước vào trạng thái ngưng đọng và kéo họ về phía mình trong tối đa 4 giây.

Thệ Ước có thể tự phóng về một hướng, hất tung các kẻ địch gần đó trong 1 / 1.5 / 2 giây khi chạm tướng địch đầu tiên. Sau đó Thệ Ước nảy đi một khoảng cách dựa trên tầm đánh tối đa của họ.`,
    damageType: DamageType.NONE,
    targetType: TargetType.ALLY,
    cooldown: {
      values: [60, 55, 50],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      stasisMaxDurationSeconds: 4,
      knockUpDurationSeconds: [1, 1.5, 2],
      oathswornLaunchDirection: true,
      ricochetDistanceScalesWithOathswornMaxAttackRange: true,
    },
    effects: [SkillEffect.BUFF, SkillEffect.KNOCK_UP],
    tags: [
      `FATES_CALL`,
      `OATHSWORN`,
      `STASIS`,
      `ALLY_ENGAGE`,
      `KNOCK_UP`,
      `ALLY_FOLLOW_UP`,
    ],
  },
  // === KARMA ===
  // KARMA - PASSIVE
  {
    championKey: `karma`,
    slot: SkillSlot.PASSIVE,
    name: `Mantra`,
    nameVi: `Kinh Mantra`,
    description: `Every ability cast grants Karma a stack of Mantra. At 3 stacks, she enters a Mantra State, enhancing her next basic ability.`,
    descriptionVi: `Mỗi lần dùng kỹ năng cho Karma một cộng dồn Mantra. Khi đạt 3 cộng dồn, cô bước vào Trạng Thái Mantra, cường hóa kỹ năng cơ bản tiếp theo.`,
    damageType: DamageType.NONE,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      mantraStacksPerAbilityCast: 1,
      mantraStacksRequired: 3,
      enhancesNextBasicAbility: true,
    },
    effects: [SkillEffect.BUFF],
    tags: [`MANTRA`, `EMPOWERED_ABILITY`, `STACKING_PASSIVE`, `SELF_BUFF`],
  },

  // KARMA - Q
  {
    championKey: `karma`,
    slot: SkillSlot.Q,
    name: `Inner Flame`,
    nameVi: `Nội Hỏa`,
    description: `Fires a blast of energy, dealing 60 / 100 / 140 / 180 (+40% AP) magic damage to the first target hit and surrounding enemies, and slowing them by 35% for 1.5 seconds.

Mantra: Increases the destructive power of the blast, dealing 65 / 140 / 215 / 290 (+50% AP) magic damage to the first target hit and surrounding enemies. The blast leaves a field for 1.5 seconds, slowing targets by 42.5% / 45% / 47.5% / 50%, after which it explodes and deals 40 / 80 / 120 / 160 (+50% AP) magic damage.`,
    descriptionVi: `Bắn ra một luồng năng lượng, gây 60 / 100 / 140 / 180 (+40% SMPT) sát thương phép lên mục tiêu đầu tiên trúng phải và các kẻ địch xung quanh, đồng thời làm chậm chúng 35% trong 1.5 giây.

Mantra: Tăng sức công phá của luồng năng lượng, gây 65 / 140 / 215 / 290 (+50% SMPT) sát thương phép lên mục tiêu đầu tiên trúng phải và các kẻ địch xung quanh. Luồng năng lượng để lại một vùng trong 1.5 giây, làm chậm mục tiêu 42.5% / 45% / 47.5% / 50%, sau đó phát nổ và gây 40 / 80 / 120 / 160 (+50% SMPT) sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damageValues: [60, 100, 140, 180],
      abilityPowerRatio: 0.4,
      slowPercent: 35,
      slowDurationSeconds: 1.5,
      mantraDamageValues: [65, 140, 215, 290],
      mantraAbilityPowerRatio: 0.5,
      mantraFieldDurationSeconds: 1.5,
      mantraFieldSlowValuesPercent: [42.5, 45, 47.5, 50],
      mantraExplosionDamageValues: [40, 80, 120, 160],
      mantraExplosionAbilityPowerRatio: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `MANTRA`,
      `EMPOWERED_ABILITY`,
      `SKILL_SHOT`,
      `AREA_DAMAGE`,
      `SLOW`,
      `ZONE_CONTROL`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KARMA - W
  {
    championKey: `karma`,
    slot: SkillSlot.W,
    name: `Focused Resolve`,
    nameVi: `Chuyên Tâm`,
    description: `Tethers up to two nearby enemy champions, dealing 35 / 60 / 85 / 110 (+40% AP) magic damage and revealing them for 1.75 seconds. If targets fail to break the tether, they take 40 / 70 / 100 / 130 (+45% AP) magic damage and are rooted for 1 / 1.25 / 1.5 / 1.75 seconds.

Mantra: A new tether will be formed between tethered targets. If there is only one tethered target, the new tether will spread toward an additional nearby enemy champion. If targets fail to break all the tethers, they take 40 / 70 / 100 / 130 (+45% AP) magic damage and are rooted for an improved 1.5 / 1.75 / 2 / 2.25 seconds.`,
    descriptionVi: `Liên kết tối đa hai tướng địch gần đó, gây 35 / 60 / 85 / 110 (+40% SMPT) sát thương phép và làm lộ diện chúng trong 1.75 giây. Nếu mục tiêu không phá được liên kết, chúng nhận 40 / 70 / 100 / 130 (+45% SMPT) sát thương phép và bị trói chân trong 1 / 1.25 / 1.5 / 1.75 giây.

Mantra: Một liên kết mới được hình thành giữa các mục tiêu đang bị liên kết. Nếu chỉ có một mục tiêu bị liên kết, liên kết mới sẽ lan sang một tướng địch gần đó. Nếu mục tiêu không phá được toàn bộ liên kết, chúng nhận 40 / 70 / 100 / 130 (+45% SMPT) sát thương phép và bị trói chân lâu hơn trong 1.5 / 1.75 / 2 / 2.25 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPIONS,
    cooldown: {
      values: [15, 15, 15, 15],
      unit: `seconds`,
    },
    cost: {
      values: [55, 60, 65, 70],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      maxTetherTargets: 2,
      initialDamageValues: [35, 60, 85, 110],
      initialDamageAbilityPowerRatio: 0.4,
      revealDurationSeconds: 1.75,
      delayedDamageValues: [40, 70, 100, 130],
      delayedDamageAbilityPowerRatio: 0.45,
      rootDurationSeconds: [1, 1.25, 1.5, 1.75],
      mantraCreatesAdditionalTether: true,
      mantraCanSpreadToAdditionalNearbyEnemyChampion: true,
      mantraRootDurationSeconds: [1.5, 1.75, 2, 2.25],
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.REVEAL, SkillEffect.ROOT],
    tags: [
      `MANTRA`,
      `EMPOWERED_ABILITY`,
      `TETHER`,
      `REVEAL`,
      `ROOT`,
      `PICK_POTENTIAL`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KARMA - E
  {
    championKey: `karma`,
    slot: SkillSlot.E,
    name: `Inspire`,
    nameVi: `Linh Giáp`,
    description: `Grants an allied champion 60 / 90 / 120 / 150 (+65% AP) shield for 3 seconds and 30% movement speed for 1.5 seconds.

Mantra: Karma focuses her power, granting a 120 / 180 / 240 / 300 (+65% AP) shield that decays over 4 seconds and 60% movement speed that decays to 20% over the same duration.

An additional ring is generated around the shielded target, and the first ally champion who enters the ring will be granted the same shield and movement speed.`,
    descriptionVi: `Cho một tướng đồng minh lá chắn 60 / 90 / 120 / 150 (+65% SMPT) trong 3 giây và 30% Tốc Độ Di Chuyển trong 1.5 giây.

Mantra: Karma tập trung sức mạnh, cho lá chắn 120 / 180 / 240 / 300 (+65% SMPT) giảm dần trong 4 giây và 60% Tốc Độ Di Chuyển giảm dần còn 20% trong cùng thời gian.

Một vòng năng lượng được tạo quanh mục tiêu được tạo lá chắn, và tướng đồng minh đầu tiên bước vào vòng sẽ nhận cùng lá chắn và Tốc Độ Di Chuyển.`,
    damageType: DamageType.NONE,
    targetType: TargetType.ALLY,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      shieldValues: [60, 90, 120, 150],
      shieldAbilityPowerRatio: 0.65,
      shieldDurationSeconds: 3,
      movementSpeedPercent: 30,
      movementSpeedDurationSeconds: 1.5,
      mantraShieldValues: [120, 180, 240, 300],
      mantraShieldAbilityPowerRatio: 0.65,
      mantraShieldDecayDurationSeconds: 4,
      mantraMovementSpeedStartPercent: 60,
      mantraMovementSpeedEndPercent: 20,
      mantraMovementSpeedDecayDurationSeconds: 4,
      grantsSameShieldAndMovementSpeedToFirstAllyEnteringRing: true,
    },
    effects: [SkillEffect.SHIELD, SkillEffect.SPEED_UP],
    tags: [
      `MANTRA`,
      `EMPOWERED_ABILITY`,
      `SHIELD`,
      `ALLY_SHIELD`,
      `MOVEMENT_SPEED`,
      `ALLY_BUFF`,
      `TEAM_SUPPORT`,
    ],
  },

  // KARMA - R
  {
    championKey: `karma`,
    slot: SkillSlot.R,
    name: `Transcendent Embrace`,
    nameVi: `Vòng Tay Siêu Phàm`,
    description: `Immediately enters Mantra state.

Forms a ring of spirit energy at the target location. After 1 second, it detonates, dealing 170 / 280 / 390 (+80% AP) magic damage to all enemies inside the circle and slowing them by 35% for 1 second.`,
    descriptionVi: `Ngay lập tức bước vào Trạng Thái Mantra.

Tạo một vòng linh năng tại vị trí chỉ định. Sau 1 giây, vòng năng lượng phát nổ, gây 170 / 280 / 390 (+80% SMPT) sát thương phép lên tất cả kẻ địch bên trong vòng tròn và làm chậm chúng 35% trong 1 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LOCATION,
    cooldown: {
      values: [70, 65, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      immediatelyEntersMantraState: true,
      detonationDelaySeconds: 1,
      damageValues: [170, 280, 390],
      abilityPowerRatio: 0.8,
      slowPercent: 35,
      slowDurationSeconds: 1,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.BUFF],
    tags: [
      `MANTRA`,
      `AREA_DAMAGE`,
      `ZONE_CONTROL`,
      `SLOW`,
      `MAGIC_DAMAGE`,
      `ULTIMATE_EMPOWER`,
    ],
  },
  // === KASSADIN ===
  // KASSADIN - PASSIVE
  {
    championKey: `kassadin`,
    slot: SkillSlot.PASSIVE,
    name: `Void Stone`,
    nameVi: `Đá Hư Không`,
    description: `Gains a shield that absorbs 50 (+30% AP) magic damage for 1.5 seconds when casting an ability near a visible enemy champion.`,
    descriptionVi: `Nhận một lá chắn hấp thụ 50 (+30% SMPT) sát thương phép trong 1.5 giây khi dùng kỹ năng gần một tướng địch nhìn thấy được.`,
    damageType: DamageType.NONE,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      shieldValue: 50,
      shieldAbilityPowerRatio: 0.3,
      shieldDurationSeconds: 1.5,
      triggersWhenCastingAbilityNearVisibleEnemyChampion: true,
      absorbsMagicDamageOnly: true,
    },
    effects: [SkillEffect.SHIELD],
    tags: [`VOID_STONE`, `MAGIC_SHIELD`, `ANTI_MAGIC`, `SELF_SHIELD`],
  },

  // KASSADIN - Q
  {
    championKey: `kassadin`,
    slot: SkillSlot.Q,
    name: `Null Sphere`,
    nameVi: `Quả Cầu Hư Không`,
    description: `Fires an orb that deals 80 / 145 / 210 / 275 (+80% AP) magic damage and silences the first enemy hit for 1 second.`,
    descriptionVi: `Bắn ra một quả cầu gây 80 / 145 / 210 / 275 (+80% SMPT) sát thương phép và câm lặng kẻ địch đầu tiên trúng phải trong 1 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [70, 75, 80, 85],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damageValues: [80, 145, 210, 275],
      abilityPowerRatio: 0.8,
      silenceDurationSeconds: 1,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [`NULL_SPHERE`, `SKILL_SHOT`, `SILENCE`, `MAGIC_DAMAGE`, `POKE`],
  },

  // KASSADIN - W
  {
    championKey: `kassadin`,
    slot: SkillSlot.W,
    name: `Nether Blade`,
    nameVi: `Lưỡi Kiếm Âm Ti`,
    description: `Enhances his next attack within 4 seconds to gain 250 range, deal an additional 50 / 80 / 110 / 140 (+50% AP) magic damage and restore 5% (15% vs. champions) of missing mana.

If the attack killed the target Nether Blade's remaining cooldown is reduced by 50%.`,
    descriptionVi: `Cường hóa đòn đánh kế tiếp trong vòng 4 giây, tăng 250 tầm đánh, gây thêm 50 / 80 / 110 / 140 (+50% SMPT) sát thương phép và hồi 5% Năng Lượng đã mất, tăng thành 15% khi đánh tướng.

Nếu đòn đánh này hạ gục mục tiêu, hồi chiêu còn lại của Lưỡi Kiếm Âm Ti giảm 50%.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [10, 10, 10, 10],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      empoweredAttackWindowSeconds: 4,
      bonusRange: 250,
      bonusDamageValues: [50, 80, 110, 140],
      abilityPowerRatio: 0.5,
      missingManaRestorePercent: 5,
      missingManaRestoreVsChampionsPercent: 15,
      remainingCooldownReductionOnKillRatio: 0.5,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `NETHER_BLADE`,
      `EMPOWERED_ATTACK`,
      `MANA_RESTORE`,
      `COOLDOWN_REFUND`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KASSADIN - E
  {
    championKey: `kassadin`,
    slot: SkillSlot.E,
    name: `Force Pulse`,
    nameVi: `Áp Suất Hư Không`,
    description: `Deals 60 / 100 / 140 / 180 (+50% AP) magic damage to enemies and slows them by 30% for 1 second.

Force Pulse is enhanced after 6 other abilities are cast nearby, dealing 40% increased damage and slowing for 90% instead.`,
    descriptionVi: `Gây 60 / 100 / 140 / 180 (+50% SMPT) sát thương phép lên kẻ địch và làm chậm chúng 30% trong 1 giây.

Áp Suất Hư Không được cường hóa sau khi có 6 kỹ năng khác được dùng gần đó, gây thêm 40% sát thương và làm chậm 90%.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [12, 10, 8, 6],
      unit: `seconds`,
    },
    cost: {
      values: [70, 75, 80, 85],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damageValues: [60, 100, 140, 180],
      abilityPowerRatio: 0.5,
      slowPercent: 30,
      slowDurationSeconds: 1,
      nearbyAbilityCastsRequiredToEnhance: 6,
      enhancedDamageIncreasePercent: 40,
      enhancedSlowPercent: 90,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `FORCE_PULSE`,
      `EMPOWERED_ABILITY`,
      `AREA_DAMAGE`,
      `SLOW`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KASSADIN - R
  {
    championKey: `kassadin`,
    slot: SkillSlot.R,
    name: `Riftwalk`,
    nameVi: `Hư Vô Bộ Pháp`,
    description: `Blinks to target location and deals 80 / 100 / 120 (+30% AP +1.5% Mana) magic damage to nearby enemies.

The next Riftwalk cast within 12 seconds deals 50% increased damage and costs 200% additional mana. Stacks 3 times.`,
    descriptionVi: `Dịch chuyển tức thời tới vị trí chỉ định và gây 80 / 100 / 120 (+30% SMPT +1.5% Năng Lượng) sát thương phép lên kẻ địch gần đó.

Lần dùng Hư Vô Bộ Pháp kế tiếp trong vòng 12 giây gây thêm 50% sát thương và tốn thêm 200% Năng Lượng. Cộng dồn tối đa 3 lần.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LOCATION,
    cooldown: {
      values: [5, 4, 2],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damageValues: [80, 100, 120],
      abilityPowerRatio: 0.3,
      manaRatioPercent: 1.5,
      stackWindowSeconds: 12,
      damageIncreasePerStackPercent: 50,
      additionalManaCostPerStackPercent: 200,
      maxStacks: 3,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `RIFTWALK`,
      `BLINK`,
      `MANA_SCALING`,
      `STACKING_DAMAGE`,
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },
  // === KATARINA ===
  // KATARINA - PASSIVE
  {
    championKey: `katarina`,
    slot: SkillSlot.PASSIVE,
    name: `Voracity`,
    nameVi: `Tham Lam`,
    description: `Whenever an enemy champion dies that Katarina has damaged in the last 3 seconds, her remaining ability cooldowns are reduced by 15 seconds.

Katarina slashes at all nearby enemies whenever she picks up a Dagger, dealing 55 (+100% bonus AD +34.5% AP) magic damage.`,
    descriptionVi: `Mỗi khi một tướng địch mà Katarina đã gây sát thương trong vòng 3 giây gần nhất bị hạ gục, hồi chiêu còn lại của các kỹ năng của cô giảm 15 giây.

Katarina chém tất cả kẻ địch gần đó mỗi khi cô nhặt một Dao Găm, gây 55 (+100% SMCK cộng thêm +34.5% SMPT) sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      takedownAssistWindowSeconds: 3,
      remainingCooldownReductionSeconds: 15,
      daggerPickupDamage: 55,
      daggerPickupBonusAttackDamageRatio: 1,
      daggerPickupAbilityPowerRatio: 0.345,
      triggersOnDaggerPickup: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `VORACITY`,
      `DAGGER`,
      `COOLDOWN_RESET`,
      `RESET_CHAMPION`,
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KATARINA - Q
  {
    championKey: `katarina`,
    slot: SkillSlot.Q,
    name: `Bouncing Blades`,
    nameVi: `Phi Dao`,
    description: `Throws a Dagger, dealing 75 / 115 / 155 / 195 (+30% AP) magic damage to the target and 2 nearby enemies. The Dagger then ricochets to the ground behind the initial strike point.

The Dagger's time in the air is the same regardless of how many times it bounces.`,
    descriptionVi: `Ném một Dao Găm, gây 75 / 115 / 155 / 195 (+30% SMPT) sát thương phép lên mục tiêu và 2 kẻ địch gần đó. Dao Găm sau đó nảy xuống mặt đất phía sau điểm trúng đầu tiên.

Thời gian Dao Găm bay trên không là như nhau bất kể nó nảy bao nhiêu lần.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      damageValues: [75, 115, 155, 195],
      abilityPowerRatio: 0.3,
      nearbyEnemyBounceCount: 2,
      createsDaggerBehindInitialStrikePoint: true,
      daggerAirTimeConstantRegardlessOfBounceCount: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [`DAGGER`, `BOUNCE`, `DAGGER_SETUP`, `AREA_DAMAGE`, `MAGIC_DAMAGE`],
  },

  // KATARINA - W
  {
    championKey: `katarina`,
    slot: SkillSlot.W,
    name: `Preparation`,
    nameVi: `Tung Hứng`,
    description: `Tosses a Dagger in the air and hastes Katarina by 50% / 60% / 70% / 80%.`,
    descriptionVi: `Tung một Dao Găm lên không và tăng tốc cho Katarina thêm 50% / 60% / 70% / 80%.`,
    damageType: DamageType.NONE,
    targetType: TargetType.SELF,
    cooldown: {
      values: [14, 13, 12, 11],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      movementSpeedValuesPercent: [50, 60, 70, 80],
      tossesDaggerInAir: true,
    },
    effects: [SkillEffect.SPEED_UP, SkillEffect.BUFF],
    tags: [`DAGGER`, `DAGGER_SETUP`, `MOVEMENT_SPEED`, `SELF_BUFF`],
  },

  // KATARINA - E
  {
    championKey: `katarina`,
    slot: SkillSlot.E,
    name: `Shunpo`,
    nameVi: `Ám Sát`,
    description: `Blink to a location near a Dagger or unit, dealing 20 / 50 / 80 / 110 (+50% AD +30% AP) magic damage to the nearest enemy.

Picking up a Dagger greatly reduces the Cooldown of Shunpo.`,
    descriptionVi: `Dịch chuyển tức thời tới một vị trí gần Dao Găm hoặc đơn vị, gây 20 / 50 / 80 / 110 (+50% SMCK +30% SMPT) sát thương phép lên kẻ địch gần nhất.

Nhặt Dao Găm sẽ giảm mạnh hồi chiêu của Ám Sát.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LOCATION,
    cooldown: {
      values: [11, 10, 9, 8],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      damageValues: [20, 50, 80, 110],
      attackDamageRatio: 0.5,
      abilityPowerRatio: 0.3,
      canBlinkNearDaggerOrUnit: true,
      daggerPickupGreatlyReducesCooldown: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `SHUNPO`,
      `BLINK`,
      `DAGGER`,
      `DAGGER_PICKUP`,
      `COOLDOWN_REFUND`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KATARINA - R
  {
    championKey: `katarina`,
    slot: SkillSlot.R,
    name: `Death Lotus`,
    nameVi: `Bông Sen Tử Thần`,
    description: `Rapidly throws blades at the 3 nearest enemy champions, dealing 400 / 600 / 800 (+260% AD +290% AP) magic damage and applying 60% Grievous Wounds. Katarina can move and throw blades for up to 2.6 seconds.

Grievous Wounds reduces the effectiveness of Healing and Regeneration effects.`,
    descriptionVi: `Liên tục phóng dao vào 3 tướng địch gần nhất, gây 400 / 600 / 800 (+260% SMCK +290% SMPT) sát thương phép và áp dụng 60% Vết Thương Sâu. Katarina có thể di chuyển và phóng dao trong tối đa 2.6 giây.

Vết Thương Sâu làm giảm hiệu quả hồi máu và hồi phục.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPIONS,
    cooldown: {
      values: [60, 50, 40],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      nearestEnemyChampionTargets: 3,
      damageValues: [400, 600, 800],
      attackDamageRatio: 2.6,
      abilityPowerRatio: 2.9,
      grievousWoundsPercent: 60,
      channelMaxDurationSeconds: 2.6,
      canMoveWhileThrowingBlades: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `DEATH_LOTUS`,
      `CHANNEL`,
      `ANTI_HEAL`,
      `GRIEVOUS_WOUNDS`,
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },
  // === KAYLE ===
  // KAYLE - PASSIVE
  {
    championKey: `kayle`,
    slot: SkillSlot.PASSIVE,
    name: `Divine Ascent`,
    nameVi: `Thượng Nhân Cảnh Giới`,
    description: `Kayle ascends as she gains levels.

Level 1: Attacks grant 4% (+1% AP) Attack Speed for 5 seconds, stacking up to 5 times. Gains 8% Movement Speed at max stacks.

Level 5: Attack range is increased to 525.

Level 9: Attacks fire waves of flame at max stacks, dealing the passive damage of Starfire Spellblade.

Level 13: Attack range is increased to 575. The bonus from reaching max stacks becomes permanent.`,
    descriptionVi: `Kayle thăng hoa khi tăng cấp.

Cấp 1: Đòn đánh cho 4% (+1% SMPT) Tốc Độ Đánh trong 5 giây, cộng dồn tối đa 5 lần. Nhận 8% Tốc Độ Di Chuyển khi đạt tối đa cộng dồn.

Cấp 5: Tầm đánh tăng lên 525.

Cấp 9: Đòn đánh phóng ra sóng lửa khi đạt tối đa cộng dồn, gây sát thương nội tại của Kiếm Tinh Hỏa.

Cấp 13: Tầm đánh tăng lên 575. Hiệu ứng khi đạt tối đa cộng dồn trở thành vĩnh viễn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      levelOneAttackSpeedPerStackPercent: 4,
      levelOneAttackSpeedPerStackAbilityPowerRatioPercent: 1,
      stackDurationSeconds: 5,
      maxStacks: 5,
      maxStackMovementSpeedPercent: 8,
      levelFiveAttackRange: 525,
      levelNineFiresFlameWavesAtMaxStacks: true,
      levelThirteenAttackRange: 575,
      levelThirteenMaxStackBonusBecomesPermanent: true,
    },
    effects: [SkillEffect.BUFF, SkillEffect.DAMAGE, SkillEffect.SPEED_UP],
    tags: [
      `DIVINE_ASCENT`,
      `LEVEL_SCALING`,
      `ATTACK_SPEED_STEROID`,
      `MOVEMENT_SPEED`,
      `RANGE_SCALING`,
      `FLAME_WAVE`,
      `HYPERCARRY`,
    ],
  },

  // KAYLE - Q
  {
    championKey: `kayle`,
    slot: SkillSlot.Q,
    name: `Radiant Blast`,
    nameVi: `Hào Quang Trừng Phạt`,
    description: `Launches a celestial sword, dealing 70 / 120 / 170 / 220 (+60% AD +50% AP) magic damage. Enemies hit are slowed by 26% / 34% / 42% / 50% for 2 seconds and their armor and magic resist is reduced by 20% for 4 seconds.`,
    descriptionVi: `Phóng ra một thanh kiếm thiên giới, gây 70 / 120 / 170 / 220 (+60% SMCK +50% SMPT) sát thương phép. Kẻ địch trúng chiêu bị làm chậm 26% / 34% / 42% / 50% trong 2 giây và bị giảm 20% Giáp cùng Kháng Phép trong 4 giây.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [11, 10, 9, 8],
      unit: `seconds`,
    },
    cost: {
      values: [80, 85, 90, 95],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      damageValues: [70, 120, 170, 220],
      attackDamageRatio: 0.6,
      abilityPowerRatio: 0.5,
      slowValuesPercent: [26, 34, 42, 50],
      slowDurationSeconds: 2,
      armorReductionPercent: 20,
      magicResistReductionPercent: 20,
      resistanceReductionDurationSeconds: 4,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.SLOW,
      SkillEffect.ARMOR_REDUCTION,
    ],
    tags: [
      `RADIANT_BLAST`,
      `SKILL_SHOT`,
      `SLOW`,
      `RESISTANCE_REDUCTION`,
      `ARMOR_REDUCTION`,
      `MAGIC_RESIST_REDUCTION`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KAYLE - W
  {
    championKey: `kayle`,
    slot: SkillSlot.W,
    name: `Celestial Blessing`,
    nameVi: `Thiên Giới Ban Phước`,
    description: `Heals herself and an allied champion for 95 / 125 / 155 / 185 (+40% AP) and grants them 25% / 30% / 35% / 40% (+0.08% AP) Movement Speed for 2 seconds.`,
    descriptionVi: `Hồi máu cho bản thân và một tướng đồng minh 95 / 125 / 155 / 185 (+40% SMPT), đồng thời cho cả hai 25% / 30% / 35% / 40% (+0.08% SMPT) Tốc Độ Di Chuyển trong 2 giây.`,
    damageType: DamageType.NONE,
    targetType: TargetType.ALLY,
    cooldown: {
      values: [14, 14, 14, 14],
      unit: `seconds`,
    },
    cost: {
      values: [85, 90, 95, 100],
      resource: `MANA`,
    },
    range: null,
    scaling: {
      healValues: [95, 125, 155, 185],
      healAbilityPowerRatio: 0.4,
      movementSpeedValuesPercent: [25, 30, 35, 40],
      movementSpeedAbilityPowerRatioPercent: 0.08,
      movementSpeedDurationSeconds: 2,
      affectsSelfAndAlliedChampion: true,
    },
    effects: [SkillEffect.HEAL, SkillEffect.SPEED_UP],
    tags: [
      `CELESTIAL_BLESSING`,
      `HEAL`,
      `MOVEMENT_SPEED`,
      `ALLY_BUFF`,
      `TEAM_SUPPORT`,
    ],
  },

  // KAYLE - E
  {
    championKey: `kayle`,
    slot: SkillSlot.E,
    name: `Starfire Spellblade`,
    nameVi: `Kiếm Tinh Hỏa`,
    description: `Passive: Attacks deal bonus 8 / 11 / 14 / 17 (+5% bonus AD +15% AP) magic damage.

Active: Empowers her next attack to become ranged and deal bonus 7% / 8% / 9% / 10% (+0.02% AP) magic damage of the target's missing Health.

When Kayle reaches level 10, Starfire Spellblade affects all nearby enemies.

Deals 60% damage to monsters.`,
    descriptionVi: `Nội tại: Đòn đánh gây thêm 8 / 11 / 14 / 17 (+5% SMCK cộng thêm +15% SMPT) sát thương phép.

Kích hoạt: Cường hóa đòn đánh kế tiếp thành đánh xa và gây thêm sát thương phép bằng 7% / 8% / 9% / 10% (+0.02% SMPT) Máu đã mất của mục tiêu.

Khi Kayle đạt cấp 10, Kiếm Tinh Hỏa ảnh hưởng tất cả kẻ địch gần đó.

Gây 60% sát thương lên quái.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [8, 7, 7, 6],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      passiveBonusDamageValues: [8, 11, 14, 17],
      passiveBonusAttackDamageRatio: 0.05,
      passiveAbilityPowerRatio: 0.15,
      activeMissingHealthDamagePercentValues: [7, 8, 9, 10],
      activeMissingHealthDamageAbilityPowerRatioPercent: 0.02,
      activeEmpowersNextAttackToBecomeRanged: true,
      levelTenAffectsNearbyEnemies: true,
      monsterDamageRatio: 0.6,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `STARFIRE_SPELLBLADE`,
      `EMPOWERED_ATTACK`,
      `ON_HIT_EFFECTS`,
      `MISSING_HEALTH_DAMAGE`,
      `AOE_ON_HIT`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KAYLE - R
  {
    championKey: `kayle`,
    slot: SkillSlot.R,
    name: `Divine Judgment`,
    nameVi: `Thần Linh Định Đoạt`,
    description: `Grants invulnerability to an allied champion for 2.5 seconds.

Blades rain down around the target, dealing 150 / 225 / 300 (+85% bonus AD +60% AP) magic damage.`,
    descriptionVi: `Ban trạng thái bất tử cho một tướng đồng minh trong 2.5 giây.

Những lưỡi kiếm mưa xuống quanh mục tiêu, gây 150 / 225 / 300 (+85% SMCK cộng thêm +60% SMPT) sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ALLY,
    cooldown: {
      values: [100, 90, 80],
      unit: `seconds`,
    },
    cost: null,
    range: null,
    scaling: {
      invulnerabilityDurationSeconds: 2.5,
      damageValues: [150, 225, 300],
      bonusAttackDamageRatio: 0.85,
      abilityPowerRatio: 0.6,
      bladesRainAroundTarget: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `DIVINE_JUDGMENT`,
      `INVULNERABILITY`,
      `ALLY_PROTECTION`,
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },
  // === KAYN ===
  // KAYN - PASSIVE
  {
    championKey: `kayn`,
    slot: SkillSlot.PASSIVE,
    name: `The Darkin Scythe`,
    nameVi: `Lưỡi Hái Darkin`,
    description: `Kayn the Shadow Assassin fights Rhaast the Darkin Slayer for control.

Damaging ranged champions charges the Shadow Assassin, and damaging melee champions charges the Darkin Slayer. At full charge, Kayn can permanently transform at his base.

Shadow Assassin: Attacks and abilities deal an additional 52% - 66% magic damage for 3 seconds. This only occurs if Kayn has been out of combat for 6 seconds or used Umbral Trespass.

Darkin Slayer: Kayn heals for 24% - 38% of physical damage dealt to champions.`,
    descriptionVi: `Kayn Sát Thủ Bóng Tối tranh giành quyền kiểm soát với Rhaast, Darkin Đoạt Mệnh.

Gây sát thương lên tướng đánh xa sẽ tích năng lượng cho Sát Thủ Bóng Tối, còn gây sát thương lên tướng cận chiến sẽ tích năng lượng cho Darkin Đoạt Mệnh. Khi đầy năng lượng, Kayn có thể biến đổi vĩnh viễn tại căn cứ.

Sát Thủ Bóng Tối: Đòn đánh và kỹ năng gây thêm 52% - 66% sát thương phép trong 3 giây. Hiệu ứng này chỉ xảy ra nếu Kayn đã rời giao tranh trong 6 giây hoặc vừa dùng Nhập Hồn.

Darkin Đoạt Mệnh: Kayn hồi máu bằng 24% - 38% sát thương vật lý gây lên tướng.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      damagesRangedChampionsChargesShadowAssassin: true,
      damagesMeleeChampionsChargesDarkinSlayer: true,
      canPermanentlyTransformAtBaseAtFullCharge: true,
      shadowAssassinAdditionalMagicDamagePercentRange: [52, 66],
      shadowAssassinDamageWindowSeconds: 3,
      shadowAssassinRequiresOutOfCombatSeconds: 6,
      shadowAssassinAlsoTriggersAfterUmbralTrespass: true,
      rhaastPhysicalDamageHealingPercentRange: [24, 38],
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL, SkillEffect.BUFF],
    tags: [
      `DARKIN_SCYTHE`,
      `FORM_CHANGE`,
      `SHADOW_ASSASSIN`,
      `DARKIN_SLAYER`,
      `OUT_OF_COMBAT_BURST`,
      `SUSTAIN`,
    ],
  },

  // KAYN - Q
  {
    championKey: `kayn`,
    slot: SkillSlot.Q,
    name: `Reaping Slash`,
    nameVi: `Trảm Quét`,
    description: `Shadow Assassin: Dashes and deals 70 / 100 / 130 / 160 (+60% / 65% / 70% / 75% AD) physical damage, then spins his scythe to deal the same damage. Deals an additional 35 physical damage to minions and monsters.

Rhaast: Dashes and deals 70 / 100 / 130 / 160 (+60% / 65% / 70% / 75% AD) plus 7% (+0.06% bonus AD) of the target's maximum Health as physical damage, then spins his scythe to deal the same damage. Maximum percent-health damage against monsters is 235 / 310 / 385 / 460. Deals an additional 35 physical damage to minions and monsters.`,
    descriptionVi: `Sát Thủ Bóng Tối: Lướt tới trước và gây 70 / 100 / 130 / 160 (+60% / 65% / 70% / 75% SMCK) sát thương vật lý, sau đó xoay lưỡi hái gây cùng lượng sát thương. Gây thêm 35 sát thương vật lý lên lính và quái.

Rhaast: Lướt tới trước và gây 70 / 100 / 130 / 160 (+60% / 65% / 70% / 75% SMCK) cộng thêm 7% (+0.06% SMCK cộng thêm) Máu tối đa của mục tiêu thành sát thương vật lý, sau đó xoay lưỡi hái gây cùng lượng sát thương. Sát thương theo máu tối đa lên quái tối đa 235 / 310 / 385 / 460. Gây thêm 35 sát thương vật lý lên lính và quái.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [5, 4, 4, 3],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `NONE`,
    },
    range: null,
    scaling: {
      shadowAssassinCooldownValues: [5, 4, 4, 3],
      rhaastCooldownValues: [4, 3, 3, 3],
      baseDamageValues: [70, 100, 130, 160],
      attackDamageRatios: [0.6, 0.65, 0.7, 0.75],
      dealsDamageTwice: true,
      bonusDamageToMinionsAndMonsters: 35,
      rhaastMaxHealthDamagePercent: 7,
      rhaastMaxHealthDamageBonusAttackDamageRatioPercent: 0.06,
      rhaastMonsterMaxDamageValues: [235, 310, 385, 460],
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `REAPING_SLASH`,
      `DASH`,
      `DOUBLE_HIT`,
      `JUNGLE_CLEAR`,
      `PERCENT_HEALTH_DAMAGE`,
      `PHYSICAL_DAMAGE`,
    ],
  },

  // KAYN - W
  {
    championKey: `kayn`,
    slot: SkillSlot.W,
    name: `Blade's Reach`,
    nameVi: `Phá`,
    description: `Shadow Assassin: Swipes the scythe upward, dealing 105 / 165 / 225 / 285 (+120% AD) physical damage and slowing enemies hit by 90% decaying over 1.5 seconds.

Rhaast: Swipes the scythe upward, dealing 105 / 165 / 225 / 285 (+120% AD) physical damage. Enemies hit are knocked up for 1 second and slowed by 90% decaying over 1.5 seconds.`,
    descriptionVi: `Sát Thủ Bóng Tối: Vung lưỡi hái lên phía trước, gây 105 / 165 / 225 / 285 (+120% SMCK) sát thương vật lý và làm chậm kẻ địch trúng chiêu 90%, giảm dần trong 1.5 giây.

Rhaast: Vung lưỡi hái lên phía trước, gây 105 / 165 / 225 / 285 (+120% SMCK) sát thương vật lý. Kẻ địch trúng chiêu bị hất tung trong 1 giây và bị làm chậm 90%, giảm dần trong 1.5 giây.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [9, 8, 7, 6],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `NONE`,
    },
    range: null,
    scaling: {
      shadowAssassinCooldownValues: [9, 8, 7, 6],
      rhaastCooldownValues: [8, 7, 6, 5],
      damageValues: [105, 165, 225, 285],
      attackDamageRatio: 1.2,
      slowPercent: 90,
      slowDecayDurationSeconds: 1.5,
      rhaastKnockUpDurationSeconds: 1,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.KNOCK_UP],
    tags: [
      `BLADES_REACH`,
      `LINE_ATTACK`,
      `SLOW`,
      `DECAYING_SLOW`,
      `KNOCK_UP`,
      `PHYSICAL_DAMAGE`,
    ],
  },

  // KAYN - E
  {
    championKey: `kayn`,
    slot: SkillSlot.E,
    name: `Shadow Step`,
    nameVi: `Bộ Pháp Bóng Tối`,
    description: `Shadow Assassin: Gains 75% movement speed, slow immunity, and the ability to move through terrain for 5 / 5.5 / 6 / 6.5 seconds. Kayn restores 100 / 120 / 140 / 160 health upon entering terrain for the first time. Being immobilized or spending more than 1.2 consecutive seconds outside of terrain or in combat with enemy champions ends this ability early.

Rhaast: Gains 35% movement speed and can move through terrain for 5 / 5.5 / 6 / 6.5 seconds. Kayn restores 100 / 120 / 140 / 160 (+50% AD) health upon entering terrain for the first time. Being immobilized or spending more than 1.2 consecutive seconds outside of terrain or in combat with enemy champions ends this ability early.`,
    descriptionVi: `Sát Thủ Bóng Tối: Nhận 75% Tốc Độ Di Chuyển, miễn nhiễm làm chậm và khả năng đi xuyên địa hình trong 5 / 5.5 / 6 / 6.5 giây. Kayn hồi 100 / 120 / 140 / 160 máu khi lần đầu đi vào địa hình. Bị khống chế bất động hoặc ở ngoài địa hình / giao tranh với tướng địch quá 1.2 giây liên tục sẽ kết thúc kỹ năng sớm.

Rhaast: Nhận 35% Tốc Độ Di Chuyển và có thể đi xuyên địa hình trong 5 / 5.5 / 6 / 6.5 giây. Kayn hồi 100 / 120 / 140 / 160 (+50% SMCK) máu khi lần đầu đi vào địa hình. Bị khống chế bất động hoặc ở ngoài địa hình / giao tranh với tướng địch quá 1.2 giây liên tục sẽ kết thúc kỹ năng sớm.`,
    damageType: DamageType.NONE,
    targetType: TargetType.SELF,
    cooldown: {
      values: [6, 6, 6, 6],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `NONE`,
    },
    range: null,
    scaling: {
      shadowAssassinCooldownValues: [6, 6, 6, 6],
      rhaastCooldownValues: [7, 7, 7, 7],
      durationValuesSeconds: [5, 5.5, 6, 6.5],
      shadowAssassinMovementSpeedPercent: 75,
      rhaastMovementSpeedPercent: 35,
      grantsSlowImmunityInShadowAssassinForm: true,
      canMoveThroughTerrain: true,
      healValues: [100, 120, 140, 160],
      rhaastHealAttackDamageRatio: 0.5,
      earlyEndOutsideTerrainOrChampionCombatSeconds: 1.2,
      endsEarlyWhenImmobilized: true,
    },
    effects: [SkillEffect.SPEED_UP, SkillEffect.HEAL, SkillEffect.BUFF],
    tags: [
      `SHADOW_STEP`,
      `TERRAIN_WALK`,
      `MOVEMENT_SPEED`,
      `SLOW_IMMUNITY`,
      `HEAL`,
      `FLANK_ANGLE`,
    ],
  },

  // KAYN - R
  {
    championKey: `kayn`,
    slot: SkillSlot.R,
    name: `Umbral Trespass`,
    nameVi: `Nhập Hồn`,
    description: `Shadow Assassin: Infests an enemy champion for 2.5 seconds, becoming untargetable. When the infestation ends, the target is dealt 200 / 300 / 400 (+165% AD) physical damage and The Darkin Scythe's cooldown is refreshed. Re-cast: Ends the infestation early.

Rhaast: Infests an enemy champion for 2.5 seconds, becoming untargetable. When the infestation ends, the target is dealt 36% (+0.13% AD) of the target's maximum Health as physical damage and Kayn heals for 27% (+0.1% AD) of the target's maximum Health. If the target dies and ends the infestation early, the ultimate still triggers the health regeneration. Re-cast: Ends the infestation early.`,
    descriptionVi: `Sát Thủ Bóng Tối: Nhập vào một tướng địch trong 2.5 giây và trở nên không thể bị chọn làm mục tiêu. Khi thời gian nhập kết thúc, mục tiêu nhận 200 / 300 / 400 (+165% SMCK) sát thương vật lý và hồi chiêu của Lưỡi Hái Darkin được làm mới. Tái kích hoạt: Kết thúc nhập hồn sớm.

Rhaast: Nhập vào một tướng địch trong 2.5 giây và trở nên không thể bị chọn làm mục tiêu. Khi thời gian nhập kết thúc, mục tiêu nhận sát thương vật lý bằng 36% (+0.13% SMCK) Máu tối đa của mục tiêu và Kayn hồi máu bằng 27% (+0.1% SMCK) Máu tối đa của mục tiêu. Nếu mục tiêu chết và kết thúc nhập hồn sớm, chiêu cuối vẫn kích hoạt hồi máu. Tái kích hoạt: Kết thúc nhập hồn sớm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [59, 52, 44],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `NONE`,
    },
    range: null,
    scaling: {
      shadowAssassinCooldownValues: [59, 52, 44],
      rhaastCooldownValues: [50, 44, 38],
      infestationDurationSeconds: 2.5,
      becomesUntargetable: true,
      canRecastToEndEarly: true,
      shadowAssassinDamageValues: [200, 300, 400],
      shadowAssassinAttackDamageRatio: 1.65,
      shadowAssassinRefreshesDarkinScytheCooldown: true,
      rhaastTargetMaxHealthDamagePercent: 36,
      rhaastTargetMaxHealthDamageAttackDamageRatioPercent: 0.13,
      rhaastHealTargetMaxHealthPercent: 27,
      rhaastHealTargetMaxHealthAttackDamageRatioPercent: 0.1,
      rhaastHealStillTriggersIfTargetDiesEarly: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL, SkillEffect.BUFF],
    tags: [
      `UMBRAL_TRESPASS`,
      `UNTARGETABLE`,
      `INFEST`,
      `RECAST`,
      `COOLDOWN_RESET`,
      `PERCENT_HEALTH_DAMAGE`,
      `HEAL`,
      `PHYSICAL_DAMAGE`,
    ],
  },
  // === KENNEN ===
  // KENNEN - PASSIVE
  {
    championKey: `kennen`,
    slot: SkillSlot.PASSIVE,
    name: `Mark of the Storm`,
    nameVi: `Dấu Ấn Sấm Sét`,
    description: `Hitting enemies with abilities places a Mark of the Storm on them for 6 seconds. At 3 stacks, the enemy is stunned for 1.25 seconds and Kennen gains 25 Energy.

Stunning an enemy multiple times within 6 seconds reduces the stun duration to 0.5 seconds.`,
    descriptionVi: `Dùng kỹ năng trúng kẻ địch sẽ đặt một Dấu Ấn Sấm Sét lên chúng trong 6 giây. Khi đạt 3 cộng dồn, kẻ địch bị choáng trong 1.25 giây và Kennen nhận 25 Nội Năng.

Làm choáng cùng một kẻ địch nhiều lần trong vòng 6 giây sẽ giảm thời gian choáng còn 0.5 giây.`,
    damageType: DamageType.NONE,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      markDurationSeconds: 6,
      stacksRequiredToStun: 3,
      stunDurationSeconds: 1.25,
      energyGainOnStun: 25,
      repeatedStunWindowSeconds: 6,
      repeatedStunDurationSeconds: 0.5,
    },
    effects: [SkillEffect.STUN, SkillEffect.BUFF],
    tags: [
      `MARK_OF_THE_STORM`,
      `MARK`,
      `STACKING_PASSIVE`,
      `STUN`,
      `ENERGY_RESTORE`,
    ],
  },

  // KENNEN - Q
  {
    championKey: `kennen`,
    slot: SkillSlot.Q,
    name: `Thundering Shuriken`,
    nameVi: `Phi Tiêu Sấm Sét`,
    description: `Throws a shuriken, dealing 75 / 140 / 205 / 270 (+75% AP) magic damage to the first enemy hit.`,
    descriptionVi: `Ném một phi tiêu, gây 75 / 140 / 205 / 270 (+75% SMPT) sát thương phép lên kẻ địch đầu tiên trúng phải.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [7, 6, 5, 4],
      unit: `seconds`,
    },
    cost: {
      values: [60, 55, 50, 45],
      resource: `ENERGY`,
    },
    range: null,
    scaling: {
      damageValues: [75, 140, 205, 270],
      abilityPowerRatio: 0.75,
      appliesMarkOfTheStorm: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `THUNDERING_SHURIKEN`,
      `SKILL_SHOT`,
      `MARK_OF_THE_STORM`,
      `MAGIC_DAMAGE`,
      `POKE`,
    ],
  },

  // KENNEN - W
  {
    championKey: `kennen`,
    slot: SkillSlot.W,
    name: `Electrical Surge`,
    nameVi: `Giật Sét`,
    description: `Passive: Every 5th attack deals 55 / 65 / 75 / 85 (+70% / 80% / 90% / 100% bonus AD +30% AP) bonus magic damage and applies a Mark of the Storm.

Active: Shocks nearby enemies afflicted by Mark of the Storm, dealing 70 / 100 / 130 / 160 (+80% AP) magic damage.`,
    descriptionVi: `Nội tại: Mỗi đòn đánh thứ 5 gây thêm 55 / 65 / 75 / 85 (+70% / 80% / 90% / 100% SMCK cộng thêm +30% SMPT) sát thương phép và áp dụng một Dấu Ấn Sấm Sét.

Kích hoạt: Giật sét các kẻ địch gần đó đang có Dấu Ấn Sấm Sét, gây 70 / 100 / 130 / 160 (+80% SMPT) sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [12, 10, 8, 6],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `ENERGY`,
    },
    range: null,
    scaling: {
      empoweredAttackInterval: 5,
      passiveBonusDamageValues: [55, 65, 75, 85],
      passiveBonusAttackDamageRatios: [0.7, 0.8, 0.9, 1],
      passiveAbilityPowerRatio: 0.3,
      activeDamageValues: [70, 100, 130, 160],
      activeAbilityPowerRatio: 0.8,
      activeRequiresMarkOfTheStorm: true,
      appliesMarkOfTheStormOnPassiveAttack: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `ELECTRICAL_SURGE`,
      `EMPOWERED_ATTACK`,
      `MARK_OF_THE_STORM`,
      `AREA_DAMAGE`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KENNEN - E
  {
    championKey: `kennen`,
    slot: SkillSlot.E,
    name: `Lightning Rush`,
    nameVi: `Tốc Độ Sấm Sét`,
    description: `Transform into an electric ball for 2 seconds, becoming unable to attack but gaining 100% bonus Movement Speed, and dealing 70 / 120 / 170 / 220 (+70% AP) magic damage to enemies he passes through. The bonus Movement Speed is doubled during the first 0.5 seconds.

Kennen gains 50% / 60% / 70% / 80% Attack Speed for 3 seconds upon exiting Lightning Rush.

Gains 40 Energy when Lightning Rush first damages an enemy. Deals 50% damage to minions.`,
    descriptionVi: `Biến thành một quả cầu điện trong 2 giây, không thể đánh thường nhưng nhận 100% Tốc Độ Di Chuyển cộng thêm, gây 70 / 120 / 170 / 220 (+70% SMPT) sát thương phép lên kẻ địch đi xuyên qua. Tốc Độ Di Chuyển cộng thêm được nhân đôi trong 0.5 giây đầu.

Kennen nhận 50% / 60% / 70% / 80% Tốc Độ Đánh trong 3 giây khi kết thúc Tốc Độ Sấm Sét.

Nhận 40 Nội Năng khi Tốc Độ Sấm Sét lần đầu gây sát thương lên kẻ địch. Gây 50% sát thương lên lính.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.SELF,
    cooldown: {
      values: [8, 7, 6, 6],
      unit: `seconds`,
    },
    cost: {
      values: [100, 95, 90, 85],
      resource: `ENERGY`,
    },
    range: null,
    scaling: {
      electricBallDurationSeconds: 2,
      baseMovementSpeedBonusPercent: 100,
      doubledMovementSpeedDurationSeconds: 0.5,
      damageValues: [70, 120, 170, 220],
      abilityPowerRatio: 0.7,
      attackSpeedValuesPercent: [50, 60, 70, 80],
      attackSpeedDurationSeconds: 3,
      energyGainOnFirstEnemyDamaged: 40,
      minionDamageRatio: 0.5,
      unableToAttackDuringTransform: true,
      appliesMarkOfTheStorm: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP, SkillEffect.BUFF],
    tags: [
      `LIGHTNING_RUSH`,
      `FORM_CHANGE`,
      `MOVEMENT_SPEED`,
      `ATTACK_SPEED_STEROID`,
      `ENERGY_RESTORE`,
      `MARK_OF_THE_STORM`,
      `MAGIC_DAMAGE`,
    ],
  },

  // KENNEN - R
  {
    championKey: `kennen`,
    slot: SkillSlot.R,
    name: `Slicing Maelstrom`,
    nameVi: `Bão Sấm Sét`,
    description: `Summons a storm that grants Kennen 20 / 40 / 60 Armor and Magic Resist and deals 20 / 55 / 90 (+13% AP) magic damage every 0.5 seconds for 3 seconds.

Each subsequent bolt against the same target deals 10% increased damage.

Only applies 3 Marks of the Storm to a single target.`,
    descriptionVi: `Triệu hồi một cơn bão cho Kennen 20 / 40 / 60 Giáp và Kháng Phép, đồng thời gây 20 / 55 / 90 (+13% SMPT) sát thương phép mỗi 0.5 giây trong 3 giây.

Mỗi tia sét tiếp theo lên cùng một mục tiêu gây thêm 10% sát thương.

Chỉ áp dụng tối đa 3 Dấu Ấn Sấm Sét lên một mục tiêu.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [80, 75, 70],
      unit: `seconds`,
    },
    cost: {
      values: [80, 80, 80],
      resource: `ENERGY`,
    },
    range: null,
    scaling: {
      armorAndMagicResistValues: [20, 40, 60],
      damageValues: [20, 55, 90],
      abilityPowerRatio: 0.13,
      tickIntervalSeconds: 0.5,
      durationSeconds: 3,
      subsequentBoltDamageIncreasePercent: 10,
      maxMarksAppliedPerTarget: 3,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `SLICING_MAELSTROM`,
      `AREA_DAMAGE`,
      `TEAMFIGHT`,
      `BONUS_RESISTANCES`,
      `MARK_OF_THE_STORM`,
      `MAGIC_DAMAGE`,
    ],
  },
  // === KHA'ZIX ===
  // KHA'ZIX - PASSIVE
  {
    championKey: `khazix`,
    slot: SkillSlot.PASSIVE,
    name: `Unseen Threat`,
    nameVi: `Hiểm Họa Vô Hình`,
    description: `Enhances Kha'Zix's next attack against enemy champions to deal bonus magic damage and slow. Unseen Threat refreshes when the enemy team loses sight of Kha'Zix.`,
    descriptionVi: `Đòn đánh kế tiếp của Kha'Zix lên tướng địch được cường hóa, gây thêm sát thương phép và làm chậm. Hiểm Họa Vô Hình được hồi lại khi đội địch mất tầm nhìn Kha'Zix.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      bonusMagicDamageBase: 15,
      bonusMagicDamagePerLevel: 8,
      bonusAttackDamageRatio: 0.5,
      slowPercent: 25,
      slowDurationSeconds: 2,
      refreshCondition: `enemy_team_loses_sight_of_khazix`,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`UNSEEN_THREAT`, `EMPOWERED_ATTACK`, `SLOW`, `STEALTH_SYNERGY`],
  },

  // KHA'ZIX - Q
  {
    championKey: `khazix`,
    slot: SkillSlot.Q,
    name: `Taste Their Fear`,
    nameVi: `Nếm Mùi Sợ Hãi`,
    description: `Kha'Zix slashes with his claws, dealing physical damage. Isolated targets take increased damage. Evolved Reaper Claws grants bonus range to attacks and Taste Their Fear, and refunds part of Taste Their Fear's cooldown against isolated targets.`,
    descriptionVi: `Kha'Zix chém bằng vuốt, gây sát thương vật lý. Mục tiêu bị cô lập nhận thêm sát thương. Vuốt Liềm Tiến Hóa tăng tầm đánh và tầm Nếm Mùi Sợ Hãi, đồng thời hoàn lại một phần hồi chiêu khi dùng lên mục tiêu bị cô lập.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [5, 4, 4, 3],
      unit: `seconds`,
    },
    cost: {
      values: [20, 20, 20, 20],
      resource: `MANA`,
    },
    range: {
      type: `single_target_melee`,
      evolvedBonusRange: 50,
    },
    scaling: {
      physicalDamageValues: [75, 110, 145, 180],
      bonusAttackDamageRatio: 1.3,
      isolatedDamageIncreasePercent: 110,
      evolvedAttackAndSkillRangeBonus: 50,
      evolvedCooldownRefundAgainstIsolatedPercent: 40,
      isolationCondition: `target_has_no_allied_units_or_structures_nearby`,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `TASTE_THEIR_FEAR`,
      `ISOLATION`,
      `ISOLATED_TARGET`,
      `ABILITY_EVOLUTION`,
      `COOLDOWN_REFUND`,
      `SINGLE_TARGET_BURST`,
    ],
  },

  // KHA'ZIX - W
  {
    championKey: `khazix`,
    slot: SkillSlot.W,
    name: `Void Spike`,
    nameVi: `Gai Hư Không`,
    description: `Kha'Zix fires spikes that deal physical damage. If he is within the explosion, he heals himself. Evolved Spike Racks fires two additional spikes, revealing and heavily slowing enemies hit.`,
    descriptionVi: `Kha'Zix bắn gai gây sát thương vật lý. Nếu đứng trong vùng nổ, hắn hồi máu cho bản thân. Chùm Gai Tiến Hóa bắn thêm hai gai, làm lộ diện và làm chậm mạnh kẻ địch trúng chiêu.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [9, 9, 9, 9],
      unit: `seconds`,
    },
    cost: {
      values: [55, 60, 65, 70],
      resource: `MANA`,
    },
    range: {
      type: `line_projectile`,
    },
    scaling: {
      physicalDamageValues: [70, 110, 150, 190],
      bonusAttackDamageRatio: 1,
      selfHealValues: [40, 75, 110, 145],
      abilityPowerRatio: 0.5,
      evolvedAdditionalSpikes: 2,
      evolvedSlowPercent: 60,
      evolvedSlowDurationSeconds: 2,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.HEAL,
      SkillEffect.REVEAL,
      SkillEffect.SLOW,
    ],
    tags: [
      `VOID_SPIKE`,
      `LINE_SKILLSHOT`,
      `SELF_HEAL`,
      `ABILITY_EVOLUTION`,
      `REVEAL`,
      `SLOW`,
      `POKE`,
    ],
  },

  // KHA'ZIX - E
  {
    championKey: `khazix`,
    slot: SkillSlot.E,
    name: `Leap`,
    nameVi: `Nhảy`,
    description: `Kha'Zix leaps to a target area, dealing physical damage. Evolved Wings increases Leap range and resets Leap's cooldown on champion takedowns.`,
    descriptionVi: `Kha'Zix nhảy tới vùng chỉ định, gây sát thương vật lý. Cánh Tiến Hóa tăng tầm Nhảy và hồi lại hồi chiêu Nhảy khi tham gia hạ gục tướng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.AREA,
    cooldown: {
      values: [18, 16, 14, 12],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `target_area_dash`,
      evolvedBonusRange: 250,
    },
    scaling: {
      physicalDamageValues: [65, 110, 155, 200],
      bonusAttackDamageRatio: 0.2,
      evolvedBonusRange: 250,
      evolvedCooldownResetOnChampionTakedown: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `LEAP`,
      `DASH`,
      `AREA_DAMAGE`,
      `ABILITY_EVOLUTION`,
      `COOLDOWN_RESET`,
      `TAKEDOWN_RESET`,
    ],
  },

  // KHA'ZIX - R
  {
    championKey: `khazix`,
    slot: SkillSlot.R,
    name: `Void Assault`,
    nameVi: `Đột Kích Hư Không`,
    description: `Passive: Each rank allows Kha'Zix to evolve one of his abilities. Active: Kha'Zix becomes invisible and gains Movement Speed for a short duration. Void Assault can be recast within 10 seconds. Evolved Adaptive Cloaking increases invisibility duration and allows up to three casts.`,
    descriptionVi: `Nội tại: Mỗi cấp chiêu cho phép Kha'Zix tiến hóa một kỹ năng. Kích hoạt: Kha'Zix trở nên vô hình và nhận Tốc Độ Di Chuyển trong thời gian ngắn. Đột Kích Hư Không có thể tái kích hoạt trong 10 giây. Ngụy Trang Thích Nghi Tiến Hóa tăng thời gian vô hình và cho phép dùng tối đa ba lần.`,
    damageType: DamageType.NONE,
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
      abilityEvolutionsPerRank: 1,
      movementSpeedPercent: 40,
      invisibilityDurationSeconds: 1.25,
      recastWindowSeconds: 10,
      evolvedInvisibilityDurationSeconds: 2,
      evolvedMaxCasts: 3,
    },
    effects: [SkillEffect.BUFF, SkillEffect.SPEED_UP],
    tags: [
      `VOID_ASSAULT`,
      `ABILITY_EVOLUTION`,
      `INVISIBILITY`,
      `RECAST`,
      `MOVEMENT_SPEED`,
      `STEALTH`,
      `SELF_BUFF`,
    ],
  },
  // === KINDRED ===
  // KINDRED - PASSIVE
  {
    championKey: `kindred`,
    slot: SkillSlot.PASSIVE,
    name: `Mark of the Kindred`,
    nameVi: `Đồng Nguyên Ấn`,
    description: `Kindred marks monsters and enemy champions for hunting. Takedowns against hunted targets grant Mark stacks that empower Kindred, increase attack range, and improve ability effects.`,
    descriptionVi: `Kindred đánh dấu quái và tướng địch để săn đuổi. Tham gia hạ gục mục tiêu bị săn sẽ nhận cộng dồn Đồng Nguyên Ấn, cường hóa Kindred, tăng tầm đánh và cải thiện hiệu ứng kỹ năng.`,
    damageType: DamageType.NONE,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      markedSmallMonsterBonusDamagePercent: 30,
      markedRedBlueBuffBonusDamagePercent: 30,
      monsterMarkRefreshSeconds: 25,
      championMarkCooldownSeconds: 40,
      sameChampionMarkCooldownSeconds: 120,
      firstThreeStacksAttackRangeBonus: 75,
      attackRangeBonusPerThreeStacksAfterFirstThree: 25,
      danceOfArrowsAttackSpeedPerStackPercent: 5,
      wolfsFrenzyCurrentHealthDamagePerStackPercent: 1,
      mountingDreadMissingHealthDamagePerStackPercent: 1,
    },
    effects: [SkillEffect.BUFF],
    tags: [
      `MARK_OF_THE_KINDRED`,
      `HUNT_MARK`,
      `STACKING_PASSIVE`,
      `STACKING_RANGE`,
      `JUNGLE_MARK`,
      `ABILITY_SCALING_STACKS`,
    ],
  },

  // KINDRED - Q
  {
    championKey: `kindred`,
    slot: SkillSlot.Q,
    name: `Dance of Arrows`,
    nameVi: `Vũ Điệu Xạ Tiễn`,
    description: `Kindred rolls in a target direction and fires arrows at up to 3 enemies, dealing physical damage and gaining Attack Speed. While inside Wolf's Frenzy, this ability's cooldown is reduced.`,
    descriptionVi: `Kindred lộn theo hướng chỉ định và bắn tên vào tối đa 3 kẻ địch, gây sát thương vật lý và nhận Tốc Độ Đánh. Khi đang trong Sói Cuồng Loạn, hồi chiêu kỹ năng này được giảm.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMIES,
    cooldown: {
      values: [9, 9, 9, 9],
      unit: `seconds`,
    },
    cost: {
      values: [35, 35, 35, 35],
      resource: `MANA`,
    },
    range: {
      type: `directional_dash_and_multi_target_arrows`,
      maxTargets: 3,
    },
    scaling: {
      physicalDamageValues: [50, 75, 100, 125],
      bonusAttackDamageRatio: 0.7,
      maxTargets: 3,
      attackSpeedBonusBasePercent: 25,
      attackSpeedBonusPerMarkStackPercent: 5,
      attackSpeedDurationSeconds: 4,
      cooldownInsideWolfsFrenzySeconds: 4,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH, SkillEffect.BUFF],
    tags: [
      `DANCE_OF_ARROWS`,
      `DASH`,
      `MULTI_TARGET`,
      `ATTACK_SPEED_STEROID`,
      `MARK_SCALING`,
      `WOLFS_FRENZY_SYNERGY`,
    ],
  },

  // KINDRED - W
  {
    championKey: `kindred`,
    slot: SkillSlot.W,
    name: `Wolf's Frenzy`,
    nameVi: `Sói Cuồng Loạn`,
    description: `Passive: Kindred gains Hunter's Vigor stacks by moving or attacking. At 100 stacks, her next attack restores Health based on missing Health and level. Active: Kindred claims an area as territory and directs Wolf to maul Lamb's last attacked target, dealing magic damage and current Health damage. Wolf deals full damage to marked monsters and surrounding monsters, slowing them.`,
    descriptionVi: `Nội tại: Kindred nhận cộng dồn Sức Mạnh Thợ Săn khi di chuyển hoặc tấn công. Khi đủ 100 cộng dồn, đòn đánh kế tiếp hồi Máu dựa trên Máu đã mất và cấp độ. Kích hoạt: Kindred chiếm một vùng lãnh thổ và ra lệnh Sói cắn xé mục tiêu Cừu vừa tấn công, gây sát thương phép và sát thương theo Máu hiện tại. Sói gây toàn bộ sát thương lên quái bị đánh dấu và quái xung quanh, đồng thời làm chậm chúng.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [17, 16, 15, 14],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `MANA`,
    },
    range: {
      type: `territory_area`,
    },
    scaling: {
      huntersVigorMaxStacks: 100,
      healTrigger: `next_attack_at_100_hunters_vigor_stacks`,
      healScalesWithMissingHealthAndLevel: true,
      healGreatestBelowHealthPercent: 30,
      magicDamageValues: [25, 30, 35, 40],
      bonusAttackDamageRatio: 0.2,
      abilityPowerRatio: 0.2,
      currentHealthDamageBasePercent: 1.5,
      currentHealthDamagePerMarkStackPercent: 1,
      markedMonsterDamagePercent: 100,
      monsterAreaSlowPercent: 50,
      monsterAreaSlowDurationSeconds: 2,
      monsterDamageCap: 300,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL, SkillEffect.SLOW],
    tags: [
      `WOLFS_FRENZY`,
      `HUNTERS_VIGOR`,
      `WOLF`,
      `SELF_HEAL`,
      `CURRENT_HEALTH_DAMAGE`,
      `MARK_SCALING`,
      `MONSTER_DAMAGE_CAP`,
      `TERRITORY_ZONE`,
    ],
  },

  // KINDRED - E
  {
    championKey: `kindred`,
    slot: SkillSlot.E,
    name: `Mounting Dread`,
    nameVi: `Sợ Hãi Dâng Trào`,
    description: `Kindred slows an enemy. Kindred's third attack within a short window directs Wolf to pounce on the target, dealing physical damage plus missing Health damage. Against low-Health enemies, Wolf deals increased missing Health damage.`,
    descriptionVi: `Kindred làm chậm một kẻ địch. Đòn đánh thứ ba của Kindred trong thời gian ngắn sẽ ra lệnh Sói vồ mục tiêu, gây sát thương vật lý cộng thêm sát thương theo Máu đã mất. Với kẻ địch thấp máu, Sói gây thêm sát thương theo Máu đã mất.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [13, 12, 11, 10],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `single_target_mark`,
    },
    scaling: {
      slowBasePercent: 50,
      slowAbilityPowerRatioPercent: 5,
      slowDurationSeconds: 1,
      attackWindowSeconds: 4,
      requiredAttacks: 3,
      physicalDamageValues: [90, 115, 140, 165],
      bonusAttackDamageRatio: 0.8,
      missingHealthDamageBasePercent: 8,
      missingHealthDamagePerMarkStackPercent: 0.5,
      lowHealthThresholdBasePercent: 25,
      lowHealthThresholdCritDamageRatioPercent: 40,
      lowHealthMissingHealthDamageBasePercent: 12,
      lowHealthMissingHealthDamagePerMarkStackPercent: 0.75,
      monsterDamageCap: 300,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `MOUNTING_DREAD`,
      `THIRD_HIT`,
      `WOLF`,
      `MISSING_HEALTH_DAMAGE`,
      `LOW_HEALTH_EXECUTE`,
      `MARK_SCALING`,
      `MONSTER_DAMAGE_CAP`,
    ],
  },

  // KINDRED - R
  {
    championKey: `kindred`,
    slot: SkillSlot.R,
    name: `Lamb's Respite`,
    nameVi: `Cừu Cứu Sinh`,
    description: `Lamb blesses the ground under herself, creating a zone where units cannot be killed. Units inside the zone that fall to low Health become invulnerable to damage while they remain inside and cannot be healed during that state. When the blessing ends, units inside are healed.`,
    descriptionVi: `Cừu ban phước lên vùng đất dưới chân, tạo một vùng khiến các đơn vị không thể bị hạ gục. Đơn vị trong vùng khi rơi xuống thấp máu sẽ miễn nhiễm sát thương khi còn ở trong vùng và không thể được hồi máu trong trạng thái đó. Khi phước lành kết thúc, các đơn vị trong vùng được hồi máu.`,
    damageType: DamageType.NONE,
    targetType: TargetType.AREA,
    cooldown: {
      values: [105, 90, 75],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `self_centered_area`,
    },
    scaling: {
      zoneDurationSeconds: 3,
      cannotDieHealthThresholdPercent: 10,
      invulnerableWhileInsideZone: true,
      healingPreventedWhileInvulnerable: true,
      healValues: [150, 200, 250],
      selfBonusHeal: 50,
      doesNotAffectStructures: true,
    },
    effects: [SkillEffect.HEAL, SkillEffect.BUFF],
    tags: [
      `LAMBS_RESPITE`,
      `CANNOT_DIE_ZONE`,
      `INVULNERABILITY`,
      `AREA_PROTECTION`,
      `HEAL`,
      `ANTI_EXECUTE`,
    ],
  },
  // === KOG'MAW ===
  // KOG'MAW - PASSIVE
  {
    championKey: `kogmaw`,
    slot: SkillSlot.PASSIVE,
    name: `Icathian Surprise`,
    nameVi: `Bất Ngờ Từ Icathia`,
    description: `After dying, Kog'Maw can continue moving and gains Movement Speed for a short duration. The Movement Speed bonus ramps up over the duration. When the effect ends, Kog'Maw explodes, dealing true damage to nearby enemies.`,
    descriptionVi: `Sau khi bị hạ gục, Kog'Maw vẫn có thể di chuyển và nhận Tốc Độ Di Chuyển trong thời gian ngắn. Lượng Tốc Độ Di Chuyển tăng dần theo thời gian. Khi hiệu ứng kết thúc, Kog'Maw phát nổ, gây sát thương chuẩn lên kẻ địch xung quanh.`,
    damageType: DamageType.TRUE_DAMAGE,
    targetType: TargetType.AREA,
    cooldown: null,
    cost: null,
    range: {
      type: `nearby_area_after_death`,
    },
    scaling: {
      afterDeathDurationSeconds: 4,
      movementSpeedStartPercent: 10,
      movementSpeedEndPercent: 50,
      trueDamageBase: 105,
      trueDamagePerLevel: 35,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP],
    tags: [
      `ICATHIAN_SURPRISE`,
      `AFTER_DEATH_EFFECT`,
      `MOVEMENT_SPEED`,
      `TRUE_DAMAGE`,
      `EXPLOSION`,
    ],
  },

  // KOG'MAW - Q
  {
    championKey: `kogmaw`,
    slot: SkillSlot.Q,
    name: `Caustic Spittle`,
    nameVi: `Phun Axit`,
    description: `Kog'Maw vomits a corrosive projectile that deals magic damage and shreds the target's Armor and Magic Resist for a short duration.`,
    descriptionVi: `Kog'Maw phun ra một luồng axit ăn mòn, gây sát thương phép và giảm Giáp cùng Kháng Phép của mục tiêu trong thời gian ngắn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [6, 6, 6, 6],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `MANA`,
    },
    range: {
      type: `line_projectile`,
    },
    scaling: {
      magicDamageValues: [90, 150, 210, 270],
      abilityPowerRatio: 0.65,
      armorAndMagicResistShredValuesPercent: [20, 24, 28, 32],
      shredDurationSeconds: 4,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.ARMOR_REDUCTION],
    tags: [
      `CAUSTIC_SPITTLE`,
      `LINE_SKILLSHOT`,
      `ARMOR_SHRED`,
      `MAGIC_RESIST_REDUCTION`,
      `RESIST_SHRED`,
    ],
  },

  // KOG'MAW - W
  {
    championKey: `kogmaw`,
    slot: SkillSlot.W,
    name: `Bio-Arcane Barrage`,
    nameVi: `Cao Xạ Ma Pháp`,
    description: `Kog'Maw's attacks gain bonus range and deal additional max Health magic damage for a short duration. Damage against minions and monsters is capped.`,
    descriptionVi: `Đòn đánh của Kog'Maw được tăng tầm và gây thêm sát thương phép theo Máu tối đa trong thời gian ngắn. Sát thương lên lính và quái bị giới hạn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.SELF,
    cooldown: {
      values: [16, 16, 16, 16],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `MANA`,
    },
    range: {
      type: `self_attack_range_buff`,
      bonusRangeValues: [90, 120, 150, 180],
    },
    scaling: {
      bonusAttackRangeValues: [90, 120, 150, 180],
      maxHealthMagicDamageValuesPercent: [1.5, 2.5, 3.5, 4.5],
      abilityPowerRatioPercent: 0.01,
      durationSeconds: 8,
      minionAndMonsterDamageCap: 100,
    },
    effects: [SkillEffect.BUFF, SkillEffect.DAMAGE],
    tags: [
      `BIO_ARCANE_BARRAGE`,
      `ATTACK_RANGE_BUFF`,
      `ON_HIT_EFFECTS`,
      `PERCENT_HEALTH_DAMAGE`,
      `MAX_HEALTH_DAMAGE`,
    ],
  },

  // KOG'MAW - E
  {
    championKey: `kogmaw`,
    slot: SkillSlot.E,
    name: `Void Ooze`,
    nameVi: `Dung Dịch Hư Không`,
    description: `Kog'Maw spits bile, dealing magic damage and leaving a trail of ooze. Enemies in the ooze are slowed.`,
    descriptionVi: `Kog'Maw phun dịch mật, gây sát thương phép và để lại một vệt dung dịch. Kẻ địch đứng trong dung dịch bị làm chậm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [11, 11, 11, 11],
      unit: `seconds`,
    },
    cost: {
      values: [40, 50, 60, 70],
      resource: `MANA`,
    },
    range: {
      type: `line_projectile_trail`,
    },
    scaling: {
      magicDamageValues: [80, 130, 180, 230],
      abilityPowerRatio: 0.55,
      oozeTrailDurationSeconds: 3.5,
      slowValuesPercent: [45, 50, 55, 60],
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [`VOID_OOZE`, `LINE_SKILLSHOT`, `TRAIL_ZONE`, `SLOW`, `ZONE_CONTROL`],
  },

  // KOG'MAW - R
  {
    championKey: `kogmaw`,
    slot: SkillSlot.R,
    name: `Living Artillery`,
    nameVi: `Pháo Sinh Học`,
    description: `Passive: Kog'Maw gains Attack Speed. Active: Kog'Maw fires acid at an area, revealing it, then dealing magic damage and revealing enemies hit. Damage increases based on the target's missing Health, with stronger damage against low-Health enemies. Subsequent shots within a short window cost additional Mana, and this ability's range increases with rank.`,
    descriptionVi: `Nội tại: Kog'Maw nhận Tốc Độ Đánh. Kích hoạt: Kog'Maw bắn axit vào một vùng, làm lộ diện khu vực đó, sau đó gây sát thương phép và làm lộ diện kẻ địch trúng chiêu. Sát thương tăng theo Máu đã mất của mục tiêu, mạnh hơn với kẻ địch thấp máu. Các phát bắn liên tiếp trong thời gian ngắn tiêu hao thêm Năng Lượng, và tầm kỹ năng tăng theo cấp.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [2, 1, 1],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `target_area_artillery`,
      rangeIncreasePerRank: 200,
    },
    scaling: {
      passiveAttackSpeedValuesPercent: [10, 20, 30],
      areaRevealDurationSeconds: 2,
      magicDamageValues: [100, 140, 180],
      abilityPowerRatio: 0.25,
      bonusAttackDamageRatio: 0.75,
      missingHealthDamageIncreaseMinPercent: 0,
      missingHealthDamageIncreaseMaxPercent: 50,
      missingHealthThresholdForMaxDamagePercent: 60,
      lowHealthThresholdPercent: 40,
      lowHealthMagicDamageValues: [200, 280, 360],
      lowHealthAbilityPowerRatio: 0.5,
      lowHealthBonusAttackDamageRatio: 1.5,
      repeatShotWindowSeconds: 8,
      additionalManaCostPerShot: 40,
      maxManaCost: 400,
      rangeIncreasePerRank: 200,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.REVEAL, SkillEffect.BUFF],
    tags: [
      `LIVING_ARTILLERY`,
      `ARTILLERY`,
      `AREA_REVEAL`,
      `MISSING_HEALTH_DAMAGE`,
      `LOW_HEALTH_EXECUTE`,
      `ATTACK_SPEED_STEROID`,
      `MANA_COST_RAMP`,
    ],
  },
  // === LEE SIN ===
  // LEE SIN - PASSIVE
  {
    championKey: `lee-sin`,
    slot: SkillSlot.PASSIVE,
    name: `Flurry`,
    nameVi: `Loạn Đả`,
    description: `Lee Sin's abilities grant him Attack Speed for his next two attacks within a short duration. The first attack restores Energy and the second restores half that amount.`,
    descriptionVi: `Kỹ năng của Lee Sin cho hắn Tốc Độ Đánh cho hai đòn đánh kế tiếp trong thời gian ngắn. Đòn đầu hồi Năng Lượng và đòn thứ hai hồi một nửa lượng đó.`,
    damageType: DamageType.NONE,
    targetType: TargetType.SELF,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      attackSpeedBonusPercent: 40,
      empoweredAttackCount: 2,
      durationSeconds: 3,
      firstAttackEnergyRestore: 20,
      secondAttackEnergyRestore: 10,
    },
    effects: [SkillEffect.BUFF],
    tags: [
      `FLURRY`,
      `ATTACK_SPEED_STEROID`,
      `ENERGY_RESTORE`,
      `EMPOWERED_ATTACK`,
    ],
  },

  // LEE SIN - Q
  {
    championKey: `lee-sin`,
    slot: SkillSlot.Q,
    name: `Sonic Wave / Resonating Strike`,
    nameVi: `Sóng Âm / Vô Ảnh Cước`,
    description: `Sonic Wave fires an energy wave that deals physical damage and reveals enemies. Hitting an enemy allows Lee Sin to recast Resonating Strike, dashing to the marked enemy and dealing physical damage based on the target's missing Health.`,
    descriptionVi: `Sóng Âm bắn ra một luồng sóng năng lượng gây sát thương vật lý và làm lộ diện kẻ địch. Trúng kẻ địch cho phép Lee Sin tái kích hoạt Vô Ảnh Cước, lao tới kẻ địch bị đánh dấu và gây sát thương vật lý dựa trên Máu đã mất của mục tiêu.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [8, 7, 6, 5],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `ENERGY`,
    },
    range: {
      type: `line_projectile_then_target_dash`,
    },
    scaling: {
      sonicWavePhysicalDamageValues: [55, 90, 125, 160],
      sonicWaveAttackDamageRatio: 1,
      recastWindowSeconds: 3,
      resonatingStrikeMinPhysicalDamageValues: [55, 90, 125, 160],
      resonatingStrikeMaxPhysicalDamageValues: [110, 180, 250, 360],
      resonatingStrikeMinAttackDamageRatio: 1,
      resonatingStrikeMaxAttackDamageRatio: 2,
      resonatingStrikeScalesWithTargetMissingHealth: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.REVEAL, SkillEffect.DASH],
    tags: [
      `SONIC_WAVE`,
      `RESONATING_STRIKE`,
      `LINE_SKILLSHOT`,
      `RECAST`,
      `REVEAL`,
      `DASH`,
      `MISSING_HEALTH_DAMAGE`,
    ],
  },

  // LEE SIN - W
  {
    championKey: `lee-sin`,
    slot: SkillSlot.W,
    name: `Safeguard / Iron Will`,
    nameVi: `Hộ Thể / Kiên Định`,
    description: `Safeguard dashes Lee Sin to a target location. If an enemy is nearby on arrival, Lee Sin shields himself. Safeguard allows Iron Will to be cast shortly after. Safeguard's cooldown is reduced by attacks. Iron Will empowers Lee Sin's next two attacks to deal bonus magic damage and grant Omnivamp.`,
    descriptionVi: `Hộ Thể cho Lee Sin lướt tới vị trí chỉ định. Nếu có kẻ địch gần điểm đến, Lee Sin tạo lá chắn cho bản thân. Hộ Thể cho phép dùng Kiên Định trong thời gian ngắn. Đòn đánh sẽ giảm hồi chiêu Hộ Thể. Kiên Định cường hóa hai đòn đánh kế tiếp, gây thêm sát thương phép và cho Hút Máu Toàn Phần.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LOCATION,
    cooldown: {
      values: [15, 14, 14, 13],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `ENERGY`,
    },
    range: {
      type: `target_location_dash`,
    },
    scaling: {
      shieldValues: [80, 140, 200, 260],
      abilityPowerShieldRatio: 1,
      shieldDurationSeconds: 2,
      recastWindowSeconds: 3,
      cooldownReductionPerAttackSeconds: 0.5,
      empoweredAttackCount: 2,
      bonusMagicDamageValues: [26, 39, 52, 65],
      abilityPowerDamageRatio: 0.4,
      omnivampValuesPercent: [16, 24, 32, 40],
    },
    effects: [
      SkillEffect.DASH,
      SkillEffect.SHIELD,
      SkillEffect.DAMAGE,
      SkillEffect.BUFF,
    ],
    tags: [
      `SAFEGUARD`,
      `IRON_WILL`,
      `DASH`,
      `SELF_SHIELD`,
      `RECAST`,
      `COOLDOWN_REDUCTION`,
      `EMPOWERED_ATTACK`,
      `OMNIVAMP`,
    ],
  },

  // LEE SIN - E
  {
    championKey: `lee-sin`,
    slot: SkillSlot.E,
    name: `Tempest / Cripple`,
    nameVi: `Địa Chấn / Dư Chấn`,
    description: `Tempest deals magic damage to nearby enemies and reveals them. Hitting an enemy allows Cripple to be cast, slowing enemies hit by Tempest with a decaying slow.`,
    descriptionVi: `Địa Chấn gây sát thương phép lên kẻ địch xung quanh và làm lộ diện chúng. Trúng kẻ địch cho phép dùng Dư Chấn, làm chậm các kẻ địch đã trúng Địa Chấn với hiệu ứng giảm dần.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [8, 8, 8, 8],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50, 50],
      resource: `ENERGY`,
    },
    range: {
      type: `nearby_area`,
    },
    scaling: {
      magicDamageValues: [90, 140, 190, 240],
      attackDamageRatio: 1.25,
      revealDurationSeconds: 3,
      recastWindowSeconds: 3,
      slowValuesPercent: [30, 40, 50, 60],
      slowDecayDurationSeconds: 4,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.REVEAL, SkillEffect.SLOW],
    tags: [
      `TEMPEST`,
      `CRIPPLE`,
      `AREA_DAMAGE`,
      `REVEAL`,
      `RECAST`,
      `DECAYING_SLOW`,
    ],
  },

  // LEE SIN - R
  {
    championKey: `lee-sin`,
    slot: SkillSlot.R,
    name: `Dragon's Rage`,
    nameVi: `Nộ Long Cước`,
    description: `Lee Sin launches a powerful roundhouse kick at an enemy champion, dealing physical damage and knocking them back. Enemies the target collides with along the way are knocked airborne and take physical damage. Damage dealt to monsters is capped.`,
    descriptionVi: `Lee Sin tung cú đá vòng cực mạnh vào một tướng địch, gây sát thương vật lý và hất văng mục tiêu. Kẻ địch mà mục tiêu va chạm trên đường bay sẽ bị hất tung và nhận sát thương vật lý. Sát thương lên quái bị giới hạn.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [70, 60, 50],
      unit: `seconds`,
    },
    cost: null,
    range: {
      type: `single_target_champion_displacement`,
    },
    scaling: {
      targetPhysicalDamageValues: [100, 250, 400],
      targetBonusAttackDamageRatio: 1.8,
      targetMaxHealthDamageValuesPercent: [10, 13, 16],
      knockback: true,
      collisionPhysicalDamageValues: [100, 300, 500],
      collisionBonusAttackDamageRatio: 2,
      collisionMaxHealthDamageValuesPercent: [10, 13, 16],
      airborneDurationSeconds: 1,
      monsterDamageCap: 800,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.KNOCK_BACK, SkillEffect.KNOCK_UP],
    tags: [
      `DRAGONS_RAGE`,
      `KNOCK_BACK`,
      `KNOCK_UP`,
      `COLLISION_DAMAGE`,
      `DISPLACEMENT`,
      `PLAYMAKING`,
      `MONSTER_DAMAGE_CAP`,
    ],
  },
  // === LEONA ===
  // LEONA - PASSIVE
  {
    championKey: `leona`,
    slot: SkillSlot.PASSIVE,
    name: `Sunlight`,
    nameVi: `Ánh Sáng Mặt Trời`,
    description: `Leona's abilities apply Sunlight to enemies. Other allied champions consume Sunlight when damaging affected enemies, dealing bonus magic damage.`,
    descriptionVi: `Kỹ năng của Leona đặt Ánh Sáng Mặt Trời lên kẻ địch. Tướng đồng minh khác tiêu thụ Ánh Sáng Mặt Trời khi gây sát thương lên mục tiêu bị ảnh hưởng, gây thêm sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      markDurationSeconds: 1.5,
      bonusMagicDamage: 34,
      consumedByAlliedChampionsOnly: true,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `SUNLIGHT`,
      `ALLY_FOLLOW_UP`,
      `MARK_DETONATION`,
      `BONUS_MAGIC_DAMAGE`,
    ],
  },

  // LEONA - Q
  {
    championKey: `leona`,
    slot: SkillSlot.Q,
    name: `Shield of Daybreak`,
    nameVi: `Khiên Mặt Trời`,
    description: `Leona empowers her next attack to stun the target and deal magic damage.`,
    descriptionVi: `Leona cường hóa đòn đánh kế tiếp để làm choáng mục tiêu và gây sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: {
      values: [5, 5, 5, 5],
      unit: `seconds`,
    },
    cost: {
      values: [45, 50, 55, 60],
      resource: `MANA`,
    },
    range: {
      type: `empowered_melee_attack`,
    },
    scaling: {
      magicDamageValues: [15, 50, 85, 120],
      abilityPowerRatio: 0.3,
      stunDurationSeconds: 1,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.STUN, SkillEffect.BUFF],
    tags: [`SHIELD_OF_DAYBREAK`, `EMPOWERED_ATTACK`, `STUN`, `LOCKDOWN`],
  },

  // LEONA - W
  {
    championKey: `leona`,
    slot: SkillSlot.W,
    name: `Eclipse`,
    nameVi: `Nhật Thực`,
    description: `Leona gains bonus Armor and Magic Resist. When the effect ends, nearby enemies take magic damage. If an enemy is hit, Leona retains the defensive bonuses for a short duration.`,
    descriptionVi: `Leona nhận thêm Giáp và Kháng Phép. Khi hiệu ứng kết thúc, kẻ địch xung quanh nhận sát thương phép. Nếu trúng kẻ địch, Leona giữ lại chỉ số phòng thủ trong thời gian ngắn.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [14, 13, 12, 11],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `nearby_area`,
    },
    scaling: {
      defensiveBonusDurationSeconds: 3,
      armorBonusValues: [40, 60, 80, 100],
      bonusArmorRatio: 0.2,
      magicResistBonusValues: [40, 60, 80, 100],
      bonusMagicResistRatio: 0.2,
      magicDamageValues: [80, 115, 150, 185],
      abilityPowerRatio: 0.4,
      retainedBonusDurationOnEnemyHitSeconds: 3,
    },
    effects: [SkillEffect.BUFF, SkillEffect.DAMAGE],
    tags: [
      `ECLIPSE`,
      `BONUS_ARMOR`,
      `BONUS_MAGIC_RESIST`,
      `DAMAGE_RESISTANCE`,
      `AREA_DAMAGE`,
      `DEFENSIVE_STEROID`,
    ],
  },

  // LEONA - E
  {
    championKey: `leona`,
    slot: SkillSlot.E,
    name: `Zenith Blade`,
    nameVi: `Thiên Đỉnh Kiếm`,
    description: `Leona projects a solar blade that deals magic damage to enemies in a line. Leona roots the last champion hit and dashes to them.`,
    descriptionVi: `Leona phóng ra lưỡi kiếm mặt trời, gây sát thương phép lên kẻ địch theo đường thẳng. Leona trói chân tướng cuối cùng trúng chiêu và lao tới mục tiêu đó.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [12, 10, 8, 6],
      unit: `seconds`,
    },
    cost: {
      values: [60, 60, 60, 60],
      resource: `MANA`,
    },
    range: {
      type: `line_projectile_then_champion_dash`,
    },
    scaling: {
      magicDamageValues: [60, 115, 170, 225],
      abilityPowerRatio: 0.4,
      rootDurationSeconds: 0.5,
      rootsLastChampionHit: true,
      dashToLastChampionHit: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.ROOT, SkillEffect.DASH],
    tags: [
      `ZENITH_BLADE`,
      `LINE_SKILLSHOT`,
      `ROOT`,
      `DASH`,
      `ENGAGE`,
      `LOCK_ON`,
    ],
  },

  // LEONA - R
  {
    championKey: `leona`,
    slot: SkillSlot.R,
    name: `Solar Flare`,
    nameVi: `Thái Dương Hạ San`,
    description: `Leona calls down a beam of light, dealing magic damage and slowing enemies. Enemies in the center are stunned instead of slowed.`,
    descriptionVi: `Leona triệu hồi một tia sáng mặt trời, gây sát thương phép và làm chậm kẻ địch. Kẻ địch ở trung tâm bị làm choáng thay vì bị làm chậm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [55, 45, 35],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `target_area`,
    },
    scaling: {
      magicDamageValues: [150, 225, 300],
      abilityPowerRatio: 0.8,
      slowPercent: 80,
      slowDurationSeconds: 1.75,
      centerStunInsteadOfSlow: true,
      stunDurationSeconds: 1.75,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.STUN],
    tags: [
      `SOLAR_FLARE`,
      `AREA_CC`,
      `CENTER_STUN`,
      `SLOW`,
      `STUN`,
      `ENGAGE_SETUP`,
    ],
  },
  // === LILLIA ===
  // LILLIA - PASSIVE
  {
    championKey: `lillia`,
    slot: SkillSlot.PASSIVE,
    name: `Dream-Laden Bough`,
    nameVi: `Quyền Trượng Mộng Mị`,
    description: `Lillia's abilities apply Dream Dust, dealing max Health magic damage over time. Lillia restores Health over the duration against large jungle monsters and champions. Dream Dust damage is capped against jungle monsters, healing is reduced for additional sources, and only one monster can heal her at a time.`,
    descriptionVi: `Kỹ năng của Lillia đặt Bụi Mộng lên mục tiêu, gây sát thương phép theo Máu tối đa theo thời gian. Lillia hồi Máu trong thời gian hiệu lực khi tác động lên quái rừng lớn và tướng. Sát thương Bụi Mộng bị giới hạn lên quái rừng, hồi máu bị giảm với các nguồn sau nguồn đầu tiên, và chỉ có thể hồi máu từ một quái cùng lúc.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      dreamDustDurationSeconds: 3,
      maxHealthMagicDamagePercent: 6,
      abilityPowerMaxHealthDamageRatioPercent: 0.012,
      largeMonsterHealBase: 24,
      largeMonsterHealAbilityPowerRatio: 0.06,
      championHealBase: 17,
      championHealAbilityPowerRatio: 0.15,
      jungleMonsterDamageCap: 66,
      additionalSourceHealEffectivenessPercent: 33,
      canOnlyHealFromOneMonsterAtATime: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.HEAL],
    tags: [
      `DREAM_LADEN_BOUGH`,
      `DREAM_DUST`,
      `DAMAGE_OVER_TIME`,
      `MAX_HEALTH_DAMAGE`,
      `SELF_HEAL`,
      `JUNGLE_SUSTAIN`,
    ],
  },

  // LILLIA - Q
  {
    championKey: `lillia`,
    slot: SkillSlot.Q,
    name: `Blooming Blows`,
    nameVi: `Trượng Hoa Xoay Tròn`,
    description: `Passive: Lillia's ability hits grant stacking Movement Speed. Active: Lillia whirls her censer, dealing magic damage, with the outer edge dealing additional true damage. Blooming Blows deals increased damage to monsters.`,
    descriptionVi: `Nội tại: Kỹ năng của Lillia trúng mục tiêu sẽ cho Tốc Độ Di Chuyển cộng dồn. Kích hoạt: Lillia xoay quyền trượng, gây sát thương phép, với rìa ngoài gây thêm sát thương chuẩn. Trượng Hoa Xoay Tròn gây thêm sát thương lên quái.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.AREA,
    cooldown: {
      values: [6, 5, 5, 4],
      unit: `seconds`,
    },
    cost: {
      values: [65, 65, 65, 65],
      resource: `MANA`,
    },
    range: {
      type: `nearby_area_outer_edge_bonus`,
    },
    scaling: {
      movementSpeedValuesPercent: [4.5, 5.5, 6.5, 7.5],
      movementSpeedAbilityPowerRatioPercent: 0.02,
      movementSpeedDurationSeconds: 6,
      maxMovementSpeedStacks: 4,
      magicDamageValues: [35, 55, 75, 95],
      magicDamageAbilityPowerRatio: 0.4,
      outerEdgeTrueDamageValues: [55, 55, 75, 95],
      outerEdgeTrueDamageAbilityPowerRatio: 0.4,
      monsterDamagePercent: 110,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SPEED_UP],
    tags: [
      `BLOOMING_BLOWS`,
      `MOVEMENT_SPEED_STACKS`,
      `OUTER_EDGE_BONUS`,
      `TRUE_DAMAGE`,
      `AREA_DAMAGE`,
      `MONSTER_DAMAGE_BONUS`,
    ],
  },

  // LILLIA - W
  {
    championKey: `lillia`,
    slot: SkillSlot.W,
    name: `Watch Out! Eep!`,
    nameVi: `Coi Chừng! Hây!`,
    description: `Lillia winds up a heavy strike, dealing magic damage. Enemies in the center take increased damage. This ability deals reduced damage to minions.`,
    descriptionVi: `Lillia vận sức tung một cú đánh mạnh, gây sát thương phép. Kẻ địch ở trung tâm nhận sát thương cao hơn. Kỹ năng này gây giảm sát thương lên lính.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [14, 13, 12, 11],
      unit: `seconds`,
    },
    cost: {
      values: [65, 65, 65, 65],
      resource: `MANA`,
    },
    range: {
      type: `target_area_center_bonus`,
    },
    scaling: {
      magicDamageValues: [70, 110, 150, 190],
      abilityPowerRatio: 0.35,
      centerMagicDamageValues: [140, 220, 300, 380],
      centerAbilityPowerRatio: 0.7,
      minionDamagePercent: 50,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `WATCH_OUT_EEP`,
      `CENTER_BONUS_DAMAGE`,
      `AREA_DAMAGE`,
      `DELAYED_AREA`,
    ],
  },

  // LILLIA - E
  {
    championKey: `lillia`,
    slot: SkillSlot.E,
    name: `Swirlseed`,
    nameVi: `Hạt Lăn Lóc`,
    description: `Lillia lobs a swirlseed overhead, dealing magic damage where it lands, revealing enemies hit and slowing them. If no enemies are hit, the seed rolls until it hits an enemy or collides with terrain.`,
    descriptionVi: `Lillia ném một hạt giống xoáy qua đầu, gây sát thương phép tại điểm rơi, làm lộ diện và làm chậm kẻ địch trúng chiêu. Nếu không trúng kẻ địch, hạt giống sẽ lăn cho đến khi trúng kẻ địch hoặc va vào địa hình.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [15, 15, 15, 15],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: {
      type: `lobbed_projectile_then_rolling_projectile`,
    },
    scaling: {
      magicDamageValues: [70, 105, 140, 175],
      abilityPowerRatio: 0.45,
      slowPercent: 40,
      slowDurationSeconds: 3,
      revealsEnemiesHit: true,
      rollsUntilEnemyHitOrTerrainCollision: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.REVEAL, SkillEffect.SLOW],
    tags: [
      `SWIRLSEED`,
      `ROLLING_PROJECTILE`,
      `REVEAL`,
      `SLOW`,
      `LINE_SKILLSHOT`,
      `TERRAIN_INTERACTION`,
    ],
  },

  // LILLIA - R
  {
    championKey: `lillia`,
    slot: SkillSlot.R,
    name: `Lilting Lullaby`,
    nameVi: `Khúc Ru Rừng Thẳm`,
    description: `Lillia causes all enemy champions affected by Dream Dust to become Drowsy, then fall Asleep. When awakened by non-periodic damage, they take additional magic damage. Drowsy units are slowed over the duration, and Asleep units cannot move or act until damaged by an enemy with non-periodic damage.`,
    descriptionVi: `Lillia khiến tất cả tướng địch đang bị Bụi Mộng trở nên Lơ Mơ, sau đó rơi vào trạng thái Ngủ. Khi bị đánh thức bởi sát thương không theo thời gian, chúng nhận thêm sát thương phép. Đơn vị Lơ Mơ bị làm chậm trong thời gian hiệu lực, còn đơn vị Ngủ không thể di chuyển hoặc hành động cho đến khi bị kẻ địch gây sát thương không theo thời gian.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPIONS,
    cooldown: {
      values: [100, 85, 70],
      unit: `seconds`,
    },
    cost: {
      values: [50, 50, 50],
      resource: `MANA`,
    },
    range: {
      type: `global_or_all_dream_dust_champions`,
    },
    scaling: {
      requiresDreamDust: true,
      drowsyDurationSeconds: 1.5,
      sleepDurationValuesSeconds: [2, 2.3, 2.5],
      awakenBonusMagicDamageValues: [100, 150, 200],
      abilityPowerRatio: 0.4,
      drowsyUnitsAreSlowedOverDuration: true,
      asleepUnitsCannotMoveOrAct: true,
      awakenedByEnemyNonPeriodicDamage: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW, SkillEffect.BUFF],
    tags: [
      `LILTING_LULLABY`,
      `DROWSY`,
      `SLEEP`,
      `DREAM_DUST_SYNERGY`,
      `GLOBAL_CC`,
      `TEAMFIGHT_SETUP`,
    ],
  },
  // === LISSANDRA ===
  // LISSANDRA - PASSIVE
  {
    championKey: `lissandra`,
    slot: SkillSlot.PASSIVE,
    name: `Iceborn Subjugation`,
    nameVi: `Uy Quyền Băng Tộc`,
    description: `When an enemy champion dies near Lissandra, they become a Frozen Thrall that seeks out living enemies. Frozen Thralls slow nearby enemies and shatter after a short duration, dealing magic damage.`,
    descriptionVi: `Khi một tướng địch chết gần Lissandra, chúng trở thành Nô Lệ Băng Giá và tìm kiếm kẻ địch còn sống. Nô Lệ Băng Giá làm chậm kẻ địch xung quanh và vỡ tan sau thời gian ngắn, gây sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: null,
    cost: null,
    range: {
      type: `nearby_enemy_champion_death_trigger`,
    },
    scaling: {
      frozenThrallDurationSeconds: 4,
      nearbySlowPercent: 25,
      magicDamage: 110,
      abilityPowerRatio: 0.4,
      seeksLivingEnemies: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `ICEBORN_SUBJUGATION`,
      `FROZEN_THRALL`,
      `DEATH_TRIGGER`,
      `SLOW_AURA`,
      `SHATTER`,
    ],
  },

  // LISSANDRA - Q
  {
    championKey: `lissandra`,
    slot: SkillSlot.Q,
    name: `Ice Shard`,
    nameVi: `Mảnh Băng`,
    description: `Lissandra throws a spear of ice that shatters when it hits an enemy, dealing magic damage and slowing the target. Enemies behind the target take the same damage and are also slowed.`,
    descriptionVi: `Lissandra phóng một mũi băng, vỡ ra khi trúng kẻ địch, gây sát thương phép và làm chậm mục tiêu. Kẻ địch phía sau mục tiêu cũng nhận cùng sát thương và bị làm chậm.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [7, 6, 5, 4],
      unit: `seconds`,
    },
    cost: {
      values: [55, 55, 55, 55],
      resource: `MANA`,
    },
    range: {
      type: `line_projectile_shatter`,
    },
    scaling: {
      magicDamageValues: [70, 110, 150, 190],
      abilityPowerRatio: 0.7,
      slowValuesPercent: [20, 25, 30, 35],
      slowDurationSeconds: 1.5,
      shatterHitsEnemiesBehindTarget: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.SLOW],
    tags: [
      `ICE_SHARD`,
      `LINE_SKILLSHOT`,
      `SHATTER`,
      `PIERCING_PROJECTILE`,
      `SLOW`,
    ],
  },

  // LISSANDRA - W
  {
    championKey: `lissandra`,
    slot: SkillSlot.W,
    name: `Ring of Frost`,
    nameVi: `Vòng Tròn Lạnh Giá`,
    description: `Lissandra creates an ice field around herself, rooting enemies within and dealing magic damage.`,
    descriptionVi: `Lissandra tạo một vùng băng quanh bản thân, trói chân kẻ địch bên trong và gây sát thương phép.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.AREA,
    cooldown: {
      values: [10, 9, 8, 7],
      unit: `seconds`,
    },
    cost: {
      values: [40, 40, 40, 40],
      resource: `MANA`,
    },
    range: {
      type: `self_centered_area`,
    },
    scaling: {
      rootDurationValuesSeconds: [1.25, 1.35, 1.45, 1.55],
      magicDamageValues: [55, 100, 145, 190],
      abilityPowerRatio: 0.55,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.ROOT],
    tags: [
      `RING_OF_FROST`,
      `ROOT`,
      `AREA_CC`,
      `SELF_CENTERED_AREA`,
      `LOCKDOWN`,
    ],
  },

  // LISSANDRA - E
  {
    championKey: `lissandra`,
    slot: SkillSlot.E,
    name: `Glacial Path`,
    nameVi: `Con Đường Băng Giá`,
    description: `First cast: Lissandra sends forth an ice claw that deals magic damage to enemies in its path. Recast: Lissandra teleports to the ice claw, causing it to disappear.`,
    descriptionVi: `Lần dùng đầu: Lissandra phóng ra một vuốt băng, gây sát thương phép lên kẻ địch trên đường đi. Tái kích hoạt: Lissandra dịch chuyển tới vuốt băng, khiến nó biến mất.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [19, 16, 13, 10],
      unit: `seconds`,
    },
    cost: {
      values: [85, 85, 85, 85],
      resource: `MANA`,
    },
    range: {
      type: `line_projectile_then_recast_teleport`,
    },
    scaling: {
      magicDamageValues: [50, 95, 140, 185],
      abilityPowerRatio: 0.4,
      recastWhileClawIsMoving: true,
      teleportToIceClawOnRecast: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.DASH],
    tags: [
      `GLACIAL_PATH`,
      `ICE_CLAW`,
      `RECAST`,
      `TELEPORT`,
      `LINE_SKILLSHOT`,
      `ESCAPE`,
      `ENGAGE`,
    ],
  },

  // LISSANDRA - R
  {
    championKey: `lissandra`,
    slot: SkillSlot.R,
    name: `Frozen Tomb`,
    nameVi: `Hầm Mộ Hàn Băng`,
    description: `Lissandra summons dark ice on an enemy champion or herself. Dark ice emanates from the target, dealing magic damage and slowing enemies it touches. Cast on enemies, it stuns the target. Self-cast, Lissandra enters stasis and restores Health, increased based on missing Health. Auto-aiming self-casts Frozen Tomb automatically.`,
    descriptionVi: `Lissandra triệu hồi băng đen lên một tướng địch hoặc bản thân. Băng đen lan ra từ mục tiêu, gây sát thương phép và làm chậm kẻ địch chạm phải. Dùng lên kẻ địch sẽ làm choáng mục tiêu. Tự dùng sẽ đưa Lissandra vào trạng thái ngưng đọng và hồi Máu, tăng theo Máu đã mất. Khi tự động ngắm, Hầm Mộ Hàn Băng sẽ tự dùng lên bản thân.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.CHAMPION,
    cooldown: {
      values: [75, 66, 57],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `enemy_champion_or_self_cast_area`,
    },
    scaling: {
      darkIceDurationSeconds: 3,
      magicDamageValues: [150, 250, 350],
      abilityPowerRatio: 0.75,
      slowValuesPercent: [30, 45, 60],
      enemyCastStunDurationSeconds: 1.5,
      selfCastStasisDurationSeconds: 2.5,
      selfCastHealValues: [100, 150, 200],
      selfCastHealAbilityPowerRatio: 0.4,
      missingHealthHealIncreaseMinPercent: 0,
      missingHealthHealIncreaseMaxPercent: 100,
      maxHealingHealthThresholdPercent: 30,
      autoAimSelfCastsAutomatically: true,
    },
    effects: [
      SkillEffect.DAMAGE,
      SkillEffect.SLOW,
      SkillEffect.STUN,
      SkillEffect.HEAL,
      SkillEffect.BUFF,
    ],
    tags: [
      `FROZEN_TOMB`,
      `STASIS`,
      `SELF_CAST`,
      `TARGETED_STUN`,
      `MISSING_HEALTH_HEAL`,
      `AREA_SLOW`,
      `LOCKDOWN`,
    ],
  },
  // === LUCIAN ===
  // LUCIAN - PASSIVE
  {
    championKey: `lucian`,
    slot: SkillSlot.PASSIVE,
    name: `Lightslinger`,
    nameVi: `Xạ Thủ Ánh Sáng`,
    description: `After using an ability, Lucian's next attack within a short duration fires two shots. The second shot deals reduced physical damage, deals full damage to minions, applies on-hit effects, and can critically strike. Vigilance empowers Lucian's next attacks when he is healed or shielded by allied champions, or when a nearby enemy champion is immobilized.`,
    descriptionVi: `Sau khi dùng kỹ năng, đòn đánh kế tiếp của Lucian trong thời gian ngắn sẽ bắn hai phát. Phát thứ hai gây sát thương vật lý giảm, gây toàn bộ sát thương lên lính, áp dụng hiệu ứng đòn đánh và có thể chí mạng. Cảnh Giác cường hóa các đòn đánh kế tiếp của Lucian khi hắn được tướng đồng minh hồi máu hoặc tạo lá chắn, hoặc khi một tướng địch gần đó bị bất động.`,
    damageType: DamageType.MIXED,
    targetType: TargetType.ENEMY,
    cooldown: null,
    cost: null,
    range: null,
    scaling: {
      doubleShotWindowSeconds: 3.5,
      secondShotDamagePercentByLevel: [35, 50, 65],
      secondShotDamageToMinionsPercent: 100,
      secondShotAppliesOnHitEffects: true,
      secondShotCanCriticallyStrike: true,
      vigilanceBonusMagicDamageBase: 20,
      vigilanceAttackDamageRatio: 0.1,
      vigilanceEmpoweredAttacksGranted: 2,
      vigilanceMaxEmpoweredAttacksStored: 4,
      vigilanceTriggers: [
        `healed_by_allied_champion`,
        `shielded_by_allied_champion`,
        `nearby_enemy_champion_immobilized`,
      ],
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.BUFF],
    tags: [
      `LIGHTSLINGER`,
      `DOUBLE_SHOT`,
      `ON_HIT_EFFECTS`,
      `VIGILANCE`,
      `ALLY_BUFF_SYNERGY`,
      `IMMOBILIZE_SYNERGY`,
    ],
  },

  // LUCIAN - Q
  {
    championKey: `lucian`,
    slot: SkillSlot.Q,
    name: `Piercing Light`,
    nameVi: `Tia Sáng Xuyên Thấu`,
    description: `Lucian shoots a bolt of piercing light through an enemy unit, damaging enemies in a line.`,
    descriptionVi: `Lucian bắn một tia sáng xuyên qua một đơn vị địch, gây sát thương lên kẻ địch theo đường thẳng.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [9, 8, 6, 5],
      unit: `seconds`,
    },
    cost: {
      values: [50, 60, 70, 80],
      resource: `MANA`,
    },
    range: {
      type: `target_unit_line_through`,
    },
    scaling: {
      physicalDamageValues: [80, 125, 170, 215],
      attackDamageRatioValues: [0.65, 0.85, 1.05, 1.25],
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `PIERCING_LIGHT`,
      `LINE_DAMAGE`,
      `PIERCING_PROJECTILE`,
      `SPELL_WEAVING`,
    ],
  },

  // LUCIAN - W
  {
    championKey: `lucian`,
    slot: SkillSlot.W,
    name: `Ardent Blaze`,
    nameVi: `Tia Sáng Rực Cháy`,
    description: `Lucian fires a shot that explodes at the end of its range or on the first enemy hit, dealing magic damage, briefly revealing enemies, and marking them. When Lucian or an ally damages a marked enemy, Lucian gains Movement Speed. When allied champions trigger the mark, Lucian gains Vigilance.`,
    descriptionVi: `Lucian bắn một phát đạn phát nổ ở cuối tầm hoặc khi trúng kẻ địch đầu tiên, gây sát thương phép, làm lộ diện kẻ địch trong thoáng chốc và đánh dấu chúng. Khi Lucian hoặc đồng minh gây sát thương lên kẻ địch bị đánh dấu, Lucian nhận Tốc Độ Di Chuyển. Khi tướng đồng minh kích hoạt dấu ấn, Lucian nhận Cảnh Giác.`,
    damageType: DamageType.MAGIC,
    targetType: TargetType.LINE,
    cooldown: {
      values: [13, 11, 10, 8],
      unit: `seconds`,
    },
    cost: {
      values: [70, 70, 70, 70],
      resource: `MANA`,
    },
    range: {
      type: `line_projectile_explosion`,
    },
    scaling: {
      magicDamageValues: [75, 125, 175, 225],
      abilityPowerRatio: 0.9,
      markDurationSeconds: 6,
      movementSpeedValues: [65, 70, 75, 80],
      movementSpeedDurationSeconds: 1,
      brieflyRevealsEnemies: true,
      alliedChampionTriggerGrantsVigilance: true,
    },
    effects: [SkillEffect.DAMAGE, SkillEffect.REVEAL, SkillEffect.SPEED_UP],
    tags: [
      `ARDENT_BLAZE`,
      `MARK`,
      `MARK_DETONATION`,
      `REVEAL`,
      `MOVEMENT_SPEED`,
      `VIGILANCE_SYNERGY`,
    ],
  },

  // LUCIAN - E
  {
    championKey: `lucian`,
    slot: SkillSlot.E,
    name: `Relentless Pursuit`,
    nameVi: `Truy Cùng Diệt Tận`,
    description: `Lucian quickly dashes a short distance. Relentless Pursuit's cooldown is reduced whenever Lucian hits an enemy with Lightslinger, with greater reduction against champions.`,
    descriptionVi: `Lucian lướt nhanh một đoạn ngắn. Hồi chiêu Truy Cùng Diệt Tận được giảm mỗi khi Lucian đánh trúng kẻ địch bằng Xạ Thủ Ánh Sáng, giảm nhiều hơn khi trúng tướng.`,
    damageType: DamageType.NONE,
    targetType: TargetType.LOCATION,
    cooldown: {
      values: [21, 18, 16, 13],
      unit: `seconds`,
    },
    cost: {
      values: [45, 30, 15],
      resource: `MANA`,
    },
    range: {
      type: `short_dash`,
    },
    scaling: {
      cooldownReductionOnLightslingerHitSeconds: 1,
      cooldownReductionOnLightslingerChampionHitSeconds: 2,
    },
    effects: [SkillEffect.DASH],
    tags: [
      `RELENTLESS_PURSUIT`,
      `DASH`,
      `COOLDOWN_REDUCTION`,
      `LIGHTSLINGER_SYNERGY`,
      `REPOSITION`,
    ],
  },

  // LUCIAN - R
  {
    championKey: `lucian`,
    slot: SkillSlot.R,
    name: `The Culling`,
    nameVi: `Thanh Trừng`,
    description: `Lucian fires rapidly in a direction for a short duration. Each shot deals physical damage to the first enemy hit. Lucian may use Relentless Pursuit during The Culling, and can recast to cancel early. Minions take increased damage.`,
    descriptionVi: `Lucian bắn liên tục theo một hướng trong thời gian ngắn. Mỗi phát bắn gây sát thương vật lý lên kẻ địch đầu tiên trúng phải. Lucian có thể dùng Truy Cùng Diệt Tận trong khi Thanh Trừng, và có thể tái kích hoạt để hủy sớm. Lính nhận thêm sát thương.`,
    damageType: DamageType.PHYSICAL,
    targetType: TargetType.LINE,
    cooldown: {
      values: [70, 65, 60],
      unit: `seconds`,
    },
    cost: {
      values: [100, 100, 100],
      resource: `MANA`,
    },
    range: {
      type: `channeled_directional_barrage`,
    },
    scaling: {
      channelDurationSeconds: 3,
      physicalDamagePerShotValues: [20, 35, 50],
      attackDamageRatioPerShot: 0.25,
      abilityPowerRatioPerShot: 0.1,
      bulletCountValues: [22, 26, 30],
      canUseRelentlessPursuitDuringChannel: true,
      recastCancelsEarly: true,
      minionDamagePercent: 200,
    },
    effects: [SkillEffect.DAMAGE],
    tags: [
      `THE_CULLING`,
      `CHANNEL`,
      `BARRAGE`,
      `RECAST`,
      `RELENTLESS_PURSUIT_SYNERGY`,
      `DIRECTIONAL_FIRE`,
    ],
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
