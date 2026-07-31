import { PrismaClient } from '../../src/generated/prisma/client.js';

type ItemPatchStatSeed = {
  key: string;
  isAvailable?: boolean;

  cost?: number;

  abilityPower?: number;
  attackDamage?: number;
  armor?: number;
  magicResist?: number;
  health?: number;
  mana?: number;
  abilityHaste?: number;
  critRate?: number;
  attackSpeed?: number;

  flatArmorPenetration?: number;
  percentArmorPenetration?: number;
  flatMagicPenetration?: number;
  percentMagicPenetration?: number;

  physicalVamp?: number;
  magicVamp?: number;
  omniVamp?: number;

  healthRegen?: number;
  manaRegen?: number;
  healShieldPower?: number;
  tenacity?: number;
  slowResistance?: number;

  flatMovementSpeed?: number;
  percentMovementSpeed?: number;

  antiHealValue?: number;
  shieldPower?: number;

  effectDescription?: string;
};

const basicItemPatchStatSeeds: ItemPatchStatSeed[] = [
  {
    key: 'boots-of-speed',
    cost: 400,
    flatMovementSpeed: 25,
  },
  {
    key: 'long-sword',
    cost: 500,
    attackDamage: 12,
  },
  {
    key: 'brawlers-gloves',
    cost: 500,
    critRate: 10,
  },
  {
    key: 'dagger',
    cost: 500,
    attackSpeed: 15,
  },
  {
    key: 'shimmering-spark',
    cost: 500,
    health: 50,
    effectDescription:
      'Burn: Deals 5–10 magic damage per second to nearby enemies.',
  },
  {
    key: 'tear-of-the-goddess',
    cost: 500,
    mana: 200,
    abilityHaste: 5,
    effectDescription:
      'Awe refunds 10% of Mana spent. Mana Charge grants 6 maximum Mana when Mana is spent, up to 700 bonus Mana.',
  },
  {
    key: 'amplifying-tome',
    cost: 500,
    abilityPower: 20,
  },
  {
    key: 'ruby-crystal',
    cost: 500,
    health: 150,
  },
  {
    key: 'cloth-armor',
    cost: 500,
    armor: 20,
  },
  {
    key: 'null-magic-mantle',
    cost: 500,
    magicResist: 20,
  },
  {
    key: 'ring-of-revelation',
    cost: 300,
    abilityHaste: 5,
  },
  {
    key: 'relic-shield',
    cost: 500,
    health: 125,
    effectDescription:
      'Support starter item. Tribute grants gold and sustain, and the quest transforms this item into Bulwark of the Mountain after earning 750 gold.',
  },
  {
    key: 'spectral-sickle',
    cost: 500,
    effectDescription:
      'Support starter item. Versatile grants 10 Attack Damage or 20 Ability Power adaptively. Tribute grants gold and sustain, and the quest transforms this item into Black Mist Scythe after earning 750 gold.',
  },
];

const middleTierItemPatchStatSeeds: ItemPatchStatSeed[] = [
  {
    key: 'quicksilver-sash',
    cost: 1100,
    magicResist: 30,
    effectDescription:
      'Quicksilver removes all current crowd control effects and grants crowd control immunity for 0.25 seconds. Afterwards, Perseverance grants 30% Tenacity and 30% Slow Resistance for 1.5 seconds. Cannot be used during knock up or knock back effects. 60-second cooldown.',
  },
  {
    key: 'seekers-armguard',
    cost: 1400,
    abilityPower: 35,
    armor: 20,
    effectDescription:
      'Stasis makes the user immune to damage and untargetable for 2.5 seconds, but prevents moving, attacking, casting abilities, or using items. 120-second cooldown.',
  },
  {
    key: 'vampiric-scepter',
    cost: 1200,
    attackDamage: 20,
    physicalVamp: 8,
  },
  {
    key: 'zeal',
    cost: 1400,
    critRate: 15,
    attackSpeed: 15,
    percentMovementSpeed: 5,
  },
  {
    key: 'kircheis-shard',
    cost: 900,
    attackDamage: 15,
    effectDescription:
      'Jolt causes Energized attacks to deal 50 bonus magic damage. Moving and attacking generates Energized attacks.',
  },
  {
    key: 'serrated-dirk',
    cost: 1000,
    attackDamage: 20,
    flatArmorPenetration: 8,
  },
  {
    key: 'recurve-bow',
    cost: 1400,
    attackSpeed: 30,
    effectDescription:
      'Reinforced causes attacks to deal 15 bonus physical damage on hit.',
  },
  {
    key: 'bf-sword',
    cost: 1500,
    attackDamage: 40,
  },
  {
    key: 'cloak-of-agility',
    cost: 1000,
    critRate: 20,
  },
  {
    key: 'last-whisper',
    cost: 800,
    percentArmorPenetration: 12,
  },
  {
    key: 'executioners-calling',
    cost: 800,
    attackDamage: 15,
    antiHealValue: 40,
    effectDescription:
      'Rend causes physical damage against enemy champions to apply 40% Grievous Wounds for 3 seconds.',
  },
  {
    key: 'phage',
    cost: 1000,
    health: 150,
    attackDamage: 15,
    effectDescription:
      'Rage grants 20 Movement Speed after attacks and 60 Movement Speed after kills for 2 seconds. Ranged champions receive half of these values.',
  },
  {
    key: 'stinger',
    cost: 1200,
    attackSpeed: 30,
    abilityHaste: 10,
  },
  {
    key: 'caulfields-warhammer',
    cost: 1200,
    attackDamage: 25,
    abilityHaste: 10,
  },
  {
    key: 'jaurims-fist',
    cost: 1100,
    health: 175,
    attackDamage: 15,
  },
  {
    key: 'hexdrinker',
    cost: 1200,
    attackDamage: 20,
    magicResist: 20,
  },
  {
    key: 'noonquiver',
    cost: 1350,
    attackDamage: 25,
    attackSpeed: 15,
  },
  {
    key: 'aether-wisp',
    cost: 950,
    abilityPower: 35,
    percentMovementSpeed: 5,
  },
  {
    key: 'lost-chapter',
    cost: 1200,
    abilityPower: 35,
    mana: 200,
    abilityHaste: 10,
    effectDescription:
      'Enlighten restores 20% of maximum Mana over 3 seconds after leveling up.',
  },
  {
    key: 'fiendish-codex',
    cost: 900,
    abilityPower: 25,
    abilityHaste: 10,
  },
  {
    key: 'blasting-wand',
    cost: 900,
    abilityPower: 40,
  },
  {
    key: 'needlessly-large-rod',
    cost: 1400,
    abilityPower: 65,
  },
  {
    key: 'haunting-guise',
    cost: 1300,
    health: 200,
    abilityPower: 30,
    effectDescription:
      'Madness increases damage dealt by 2% for each second in combat with enemy champions, up to 6%.',
  },
  {
    key: 'sheen',
    cost: 800,
    abilityHaste: 10,
    effectDescription:
      'Spellblade causes the next attack within 10 seconds after using an ability to deal bonus physical damage equal to 100% base Attack Damage. 1.5-second cooldown. Damage is reduced against structures.',
  },
  {
    key: 'oblivion-orb',
    cost: 800,
    abilityPower: 35,
    antiHealValue: 40,
    effectDescription:
      'Cursed Wounds causes magic damage against enemy champions to apply 40% Grievous Wounds for 3 seconds.',
  },
  {
    key: 'bamis-cinder',
    cost: 1300,
    health: 250,
    effectDescription:
      'Cinders deals 10-20 magic damage per second to nearby enemies and deals 15% bonus damage to minions and monsters.',
  },
  {
    key: 'spectres-cowl',
    cost: 1100,
    health: 175,
    magicResist: 20,
    effectDescription:
      'Spectral Visit grants 150% Health Regeneration for 10 seconds after taking damage from an enemy champion.',
  },
  {
    key: 'kindlegem',
    cost: 1000,
    health: 175,
    abilityHaste: 10,
  },
  {
    key: 'giants-belt',
    cost: 1000,
    health: 300,
  },
  {
    key: 'wardens-mail',
    cost: 1050,
    armor: 35,
    effectDescription:
      'Cold Steel reduces the Attack Speed of enemies by 15% for 1.5 seconds when struck by an attack.',
  },
  {
    key: 'catalyst-of-aeons',
    cost: 1100,
    health: 200,
    mana: 300,
    effectDescription:
      'Eternity restores Mana equal to 15% of damage taken from champions and restores Health equal to 20% of Mana spent, capped at 15 Health per cast.',
  },
  {
    key: 'chain-vest',
    cost: 900,
    armor: 40,
  },
  {
    key: 'bramble-vest',
    cost: 1000,
    armor: 30,
    antiHealValue: 40,
    effectDescription:
      'Thorns causes incoming attacks to deal 4 plus 6% bonus Armor magic damage back to the attacker and applies 40% Grievous Wounds for 3 seconds if the attacker is a champion.',
  },
  {
    key: 'negatron-cloak',
    cost: 900,
    magicResist: 40,
  },
  {
    key: 'glacial-shroud',
    cost: 1000,
    armor: 20,
    mana: 150,
    abilityHaste: 10,
  },
  {
    key: 'winged-moonplate',
    cost: 900,
    health: 150,
    percentMovementSpeed: 5,
  },
  {
    key: 'nashors-talon',
    cost: 800,
    effectDescription:
      'Magic Needle grants either 15 Attack Damage or 30 Ability Power, determined adaptively.',
  },
  {
    key: 'hextech-alternator',
    cost: 1100,
    abilityPower: 45,
    effectDescription:
      'Revved causes damaging abilities and empowered attacks against champions to deal 25-60 bonus magic damage. 20-second cooldown.',
  },
  {
    key: 'mejais-soulstealer',
    cost: 1800,
    health: 70,
    abilityPower: 25,
    effectDescription:
      'Glory gains stacks from champion takedowns and loses 10 stacks on death. Each Glory stack grants 5 Ability Power. At 10 or more stacks, grants 10% bonus Movement Speed. Maximum 30 stacks.',
  },
  {
    key: 'surging-scales',
    cost: 1300,
    armor: 40,
    effectDescription:
      'Surge grants 20% Slow Resistance while in combat with an enemy champion.',
  },
  {
    key: 'forbidden-idol',
    cost: 900,
    health: 100,
    abilityHaste: 5,
    healShieldPower: 4,
    manaRegen: 25,
  },
  {
    key: 'fated-ashes',
    cost: 900,
    abilityPower: 40,
    effectDescription:
      'Inflame causes damaging abilities to deal an additional 15 magic damage over 3 seconds and an additional 45 magic damage to monsters.',
  },
  {
    key: 'void-amethyst',
    cost: 1000,
    abilityPower: 20,
    percentMagicPenetration: 10,
  },
  {
    key: 'verdant-barrier',
    cost: 1600,
    abilityPower: 40,
    magicResist: 25,
    effectDescription:
      'Annul grants a spell shield that blocks the next enemy ability. 30-second cooldown.',
  },
];

const physicalItemPatchStatSeeds: ItemPatchStatSeed[] = [
  {
    key: 'bloodthirster',
    cost: 3000,
    attackDamage: 55,
    health: 250,
    critRate: 25,
    physicalVamp: 8,
    effectDescription:
      'Bloody grants an additional 4% Physical Vamp to attacks that critically strike.',
  },
  {
    key: 'guardian-angel',
    cost: 3200,
    attackDamage: 45,
    armor: 40,
    effectDescription:
      'Resurrect restores 50% Health and 100% Mana after 4 seconds of stasis upon taking lethal damage. 180-second cooldown.',
  },
  {
    key: 'magnetic-blaster',
    cost: 3000,
    attackDamage: 30,
    critRate: 25,
    attackSpeed: 35,
    percentMovementSpeed: 5,
    effectDescription:
      'Moving and attacking generates an Energized attack. Power Blitz grants the Energized attack 100 additional range, or 50 for melee champions, deals 40-100 bonus magic damage, grants 60 Movement Speed for 0.75 seconds, and bounces to up to 5 nearby enemies. The damage can critically strike.',
  },
  {
    key: 'blade-of-the-ruined-king',
    cost: 3000,
    attackDamage: 40,
    attackSpeed: 35,
    omniVamp: 10,
    effectDescription:
      "Ruined Strikes causes attacks to deal bonus physical damage equal to 7% of the target's current Health, increased to 8.5% for melee attacks. Drain triggers after hitting a champion with 3 attacks or abilities, dealing 30-100 bonus magic damage and stealing 25% Movement Speed for 2 seconds. 60-second cooldown.",
  },
  {
    key: 'runaans-hurricane',
    cost: 2900,
    attackSpeed: 35,
    critRate: 25,
    effectDescription:
      "Wind's Fury causes attacks to strike 2 additional nearby enemies for 55% damage. These strikes can critically strike and trigger on-hit effects. Wind Blade causes attacks to deal 15 bonus physical damage on hit.",
  },
  {
    key: 'youmuus-ghostblade',
    cost: 3000,
    attackDamage: 55,
    abilityHaste: 15,
    flatArmorPenetration: 15,
    effectDescription:
      'Momentum builds while moving and grants up to 50 Movement Speed at 100 stacks. Attacking removes all Momentum. Attacking at maximum Momentum grants 25% Attack Speed for 4 seconds.',
  },
  {
    key: 'duskblade-of-draktharr',
    cost: 3000,
    attackDamage: 55,
    abilityHaste: 10,
    flatArmorPenetration: 18,
    effectDescription:
      'Nightstalker causes the first attack against a champion to deal 60-160 bonus physical damage and slow them by 99% for 0.35 seconds. Champion takedowns refresh the 10-second cooldown.',
  },
  {
    key: 'infinity-edge',
    cost: 3400,
    attackDamage: 65,
    critRate: 25,
    effectDescription:
      'Infinity increases critical strike damage from 175% to 205%. Limit Break grants 0.6 additional critical strike damage for every 1% item critical rate above 100%.',
  },
  {
    key: 'mortal-reminder',
    cost: 3300,
    attackDamage: 25,
    critRate: 25,
    attackSpeed: 15,
    percentArmorPenetration: 30,
    antiHealValue: 50,
    effectDescription:
      'Last Whisper grants an additional 6% Armor Penetration to attacks that critically strike. Sepsis causes physical damage against enemy champions to apply 50% Grievous Wounds for 3 seconds.',
  },
  {
    key: 'black-cleaver',
    cost: 3000,
    health: 400,
    attackDamage: 40,
    abilityHaste: 20,
    effectDescription:
      'Sunder causes physical damage against a champion to reduce their Armor by 6% for 6 seconds, stacking up to 5 times for 30% Armor reduction. Rage grants 20 Movement Speed after dealing physical damage and 40 Movement Speed while moving toward enemy champions with 5 Sunder stacks. Ranged champions receive half of these values.',
  },
  {
    key: 'manamune',
    cost: 2700,
    attackDamage: 25,
    mana: 300,
    abilityHaste: 20,
    effectDescription:
      'Awe grants Attack Damage equal to 1.5% of maximum Mana and refunds 15% of Mana spent. Mana Charge grants 14 maximum Mana when attacking or spending Mana, up to 700 bonus Mana, then transforms Manamune into Muramana. Triggers up to 3 times every 10 seconds.',
  },
  {
    key: 'muramana',
    cost: 2700,
    attackDamage: 25,
    mana: 1000,
    abilityHaste: 20,
    effectDescription:
      'Awe grants Attack Damage equal to 2% of maximum Mana and refunds 15% of Mana spent. Shock consumes current Mana to deal bonus physical damage with attacks and damaging abilities. Ability damage gains bonus physical damage equal to 4.5% bonus Attack Damage. Shock only triggers while remaining Mana is above 20%.',
  },
  {
    key: 'trinity-force',
    cost: 3333,
    health: 333,
    attackDamage: 30,
    attackSpeed: 30,
    abilityHaste: 20,
    percentMovementSpeed: 5,
    effectDescription:
      'Spellblade causes the next attack within 10 seconds after using an ability to deal bonus physical damage equal to 200% base Attack Damage. 1.5-second cooldown. Valor grants 20 Movement Speed for 2 seconds after attacks. Ranged champions receive half of the movement speed.',
  },
  {
    key: 'maw-of-malmortius',
    cost: 3000,
    attackDamage: 55,
    magicResist: 45,
    abilityHaste: 10,
    effectDescription:
      'Lifeline triggers when magic damage would reduce Health below 35%, granting 10% Omni Vamp until leaving combat and a magic shield that absorbs 220-530 magic damage for 3 seconds. 75-second cooldown.',
  },
  {
    key: 'deaths-dance',
    cost: 3100,
    attackDamage: 35,
    armor: 40,
    abilityHaste: 15,
    effectDescription:
      'Cauterize converts 27% of physical and magic damage received into true damage dealt over 3 seconds, reduced to 12% for ranged champions. Champion takedowns cleanse the remaining delayed damage and restore 8% maximum Health over 2 seconds.',
  },
  {
    key: 'phantom-dancer',
    cost: 2900,
    attackDamage: 20,
    critRate: 25,
    attackSpeed: 40,
    percentMovementSpeed: 5,
    effectDescription:
      'Spectral Waltz causes an attack hit to grant 25% Attack Speed and 7% Movement Speed for 6 seconds. The bonuses do not stack. The 10-second cooldown is reduced by 1 second whenever an attack hits an enemy.',
  },
  {
    key: 'nashors-tooth',
    cost: 2800,
    attackSpeed: 45,
    abilityHaste: 20,
    effectDescription:
      'Magic Fang grants either 25 Attack Damage or 50 Ability Power, determined adaptively. Gnaw causes attacks to deal adaptive damage equal to 15 plus scaling from bonus Attack Damage or Ability Power on hit.',
  },
  {
    key: 'wits-end',
    cost: 2800,
    attackSpeed: 45,
    magicResist: 45,
    effectDescription:
      "At Wit's End causes attacks to deal 10-55 bonus magic damage on hit. While below 50% Health, damaging an enemy champion heals for 100% of this effect's post-mitigation damage for melee champions and 66% for ranged champions.",
  },
  {
    key: 'essence-reaver',
    cost: 3000,
    attackDamage: 40,
    critRate: 25,
    abilityHaste: 20,
    effectDescription:
      'Spellblade stores up to 2 charges after casting abilities. Attacks consume a charge to deal 70 bonus physical damage that can critically strike and grant 40 Movement Speed for 2 seconds. Mana Siphon causes attacks to restore 3% missing Mana on hit.',
  },
  {
    key: 'seryldas-grudge',
    cost: 3300,
    attackDamage: 40,
    abilityHaste: 15,
    percentArmorPenetration: 33,
    antiHealValue: 50,
    effectDescription:
      'Icy causes damaging active abilities and empowered attacks to slow enemies by 30% for 1 second. Repeated Icy applications add Frostbite stacks. At 3 stacks, Frostbite deals 5 plus 1-15 based on level plus 15% bonus Attack Damage physical damage over 2 seconds and applies 50% Grievous Wounds for 3 seconds.',
  },
  {
    key: 'navori-quickblades',
    cost: 2700,
    critRate: 25,
    attackSpeed: 45,
    percentMovementSpeed: 5,
    effectDescription:
      'Deft Strikes causes attacks to reduce the remaining cooldowns of basic abilities by 15%.',
  },
  {
    key: 'edge-of-night',
    cost: 3000,
    health: 250,
    attackDamage: 50,
    flatArmorPenetration: 8,
    effectDescription:
      'Annul grants a spell shield that blocks the next hostile ability. The spell shield refreshes after leaving combat with enemy champions. 35-second cooldown.',
  },
  {
    key: 'divine-sunderer',
    cost: 3400,
    health: 425,
    attackDamage: 25,
    abilityHaste: 25,
    effectDescription:
      "Spellblade causes the next attack within 10 seconds after using an ability to deal bonus physical damage equal to 10% of the target's maximum Health for melee champions or 7% for ranged champions. Against champions, it heals for 6% of the target's maximum Health for melee champions or 2.5% for ranged champions. 1.5-second cooldown.",
  },
  {
    key: 'serpents-fang',
    cost: 2800,
    attackDamage: 50,
    abilityHaste: 10,
    flatArmorPenetration: 15,
    effectDescription:
      'Shield Reaver reduces shields gained by damaged enemy champions for 3 seconds. Melee champions apply shield reduction calculated from 40% plus scaling equal to 10% of bonus Attack Damage, capped at 60%. Ranged champions use a 25% base value with the same bonus Attack Damage scaling, capped at 45%. Existing shields are reduced when the effect is first applied.',
  },
  {
    key: 'chempunk-chainsword',
    cost: 2800,
    health: 400,
    attackDamage: 45,
    abilityHaste: 15,
    antiHealValue: 50,
    effectDescription:
      'Punishment causes physical damage against enemy champions to apply 50% Grievous Wounds for 3 seconds.',
  },
  {
    key: 'the-collector',
    cost: 3000,
    attackDamage: 45,
    critRate: 25,
    flatArmorPenetration: 10,
    effectDescription:
      'Death and Taxes executes enemy champions when damage would leave them below a threshold equal to 4% of maximum Health plus an additional amount scaling with Critical Rate. Each execution permanently increases the threshold by 0.1% and grants 25 bonus gold. Limited to one The Collector.',
  },
  {
    key: 'steraks-gage',
    cost: 3200,
    health: 400,
    effectDescription:
      'Heavy Handed grants bonus Attack Damage equal to 50% of base Attack Damage. Lifeline triggers when damage reduces Health below 35%, granting a shield equal to 75% of bonus Health that decays over 3 seconds. Triggering Lifeline removes crowd control effects except Airborne and grants 30% Tenacity for 4 seconds. 75-second cooldown.',
  },
  {
    key: 'spear-of-shojin',
    cost: 3100,
    health: 450,
    attackDamage: 40,
    abilityHaste: 20,
    effectDescription:
      'Focused Will causes ability damage against enemies or monsters to increase ability and passive damage by 3% for 6 seconds, stacking up to 4 times.',
  },
  {
    key: 'titanic-hydra',
    cost: 3000,
    health: 450,
    attackDamage: 40,
    effectDescription:
      'Cleave empowers the next attack every 1.75 seconds to deal bonus physical damage equal to 25 plus 3% bonus Health and creates a shockwave dealing 80 plus 10% bonus Health physical damage behind the target. Ranged champions deal 75% damage. The empowered attack can affect structures.',
  },
  {
    key: 'terminus',
    cost: 3300,
    attackDamage: 40,
    attackSpeed: 30,
    effectDescription:
      'Shadow causes attacks to deal 35 bonus magic damage on hit. Juxtaposition alternates between Light and Dark attacks. Light attacks grant 5-8 Armor and Magic Resistance for 5 seconds, while Dark attacks grant 11% Armor Penetration and 11% Magic Penetration for 5 seconds. Each effect stacks up to 3 times. Armor and Magic Penetration granted by this item are capped at 40%.',
  },
  {
    key: 'sundered-sky',
    cost: 3000,
    health: 350,
    attackDamage: 40,
    abilityHaste: 15,
    effectDescription:
      'Lightshield Strike causes the first attack against each enemy champion to critically strike for 160% damage and restore Health equal to 125% base Attack Damage plus 6% missing Health. 6-second cooldown per target.',
  },
  {
    key: 'eclipse',
    cost: 3000,
    attackDamage: 65,
    abilityHaste: 20,
    effectDescription:
      "Ever Rising Moon triggers after hitting an enemy champion with 2 separate attacks or abilities within 1.8 seconds, dealing bonus physical damage equal to 7% of the target's maximum Health and granting a shield equal to 140 plus 35% bonus Attack Damage for 2 seconds. Ranged champions deal 3.5% maximum Health damage and receive a shield equal to 70 plus 18% bonus Attack Damage. 6-second cooldown.",
  },
  {
    key: 'soul-transfer',
    cost: 3200,
    attackDamage: 25,
    critRate: 25,
    attackSpeed: 30,
    effectDescription:
      'Shadow Dance summons a clone for 4 seconds when an attack critically strikes an enemy champion or large monster. The clone inherits 20% Attack Damage and gains Attack Speed equal to 30% of Critical Rate. Up to 2 clones may exist at once. A clone disappears if it moves more than 600 units away.',
  },
  {
    key: 'hullbreaker',
    cost: 3100,
    health: 400,
    attackDamage: 50,
    percentMovementSpeed: 5,
    effectDescription:
      'Skipper empowers every fourth attack against champions and epic monsters to deal bonus physical damage equal to 160% base Attack Damage plus 5% maximum Health. Against structures, it deals 240% base Attack Damage plus 9% maximum Health. Ranged champions deal 40% of these values. Boarding Party grants nearby allied siege and super minions 20-130 Armor and 10-120 Magic Resistance, increased by 25% for ranged champions.',
  },
  {
    key: 'guinsoos-rageblade',
    cost: 3100,
    attackSpeed: 30,
    percentMovementSpeed: 5,
    effectDescription:
      'Chaos grants either 25 Attack Damage or 50 Ability Power, determined adaptively. Wrath causes attacks to deal 30 magic damage and prevents them from critically striking. Each 1% Critical Rate gained from items increases this magic damage by 1.5, up to 75 additional damage. Seething Strike grants 8% Attack Speed per attack, stacking up to 4 times. At maximum stacks, every third attack applies on-hit effects one additional time.',
  },
  {
    key: 'kraken-slayer',
    cost: 2800,
    attackDamage: 40,
    attackSpeed: 30,
    percentMovementSpeed: 5,
    effectDescription:
      'Bring It Down causes every third attack to deal 120-160 bonus physical damage, reduced to 110-150 for ranged champions. The damage increases by 1% for every 1% Health the target is missing, up to 70%.',
  },
  {
    key: 'overlords-bloodmail',
    cost: 3200,
    health: 450,
    attackDamage: 30,
    effectDescription:
      'Tyranny grants Attack Damage equal to 2.5% of bonus Health. Retribution grants up to 9% increased Attack Damage based on missing Health, reaching maximum strength while below 30% Health.',
  },
  {
    key: 'experimental-hexplate',
    cost: 3000,
    health: 400,
    attackDamage: 35,
    attackSpeed: 20,
    effectDescription:
      'Hexcharged grants 20 Ability Haste to the ultimate ability. Overdrive triggers after casting the ultimate, granting 40% Attack Speed and 20% Movement Speed for 8 seconds. Ranged champions receive 20% Attack Speed and 10% Movement Speed. 30-second cooldown.',
  },
  {
    key: 'lord-dominiks-regards',
    cost: 3300,
    attackDamage: 30,
    percentArmorPenetration: 36,
    critRate: 25,
    effectDescription:
      "Giant Slayer increases damage based on the target's bonus Health, reaching up to 15% bonus damage against targets with 1500 bonus Health.",
  },
  {
    key: 'stridebreaker',
    cost: 3100,
    health: 400,
    attackDamage: 40,
    attackSpeed: 15,
    effectDescription:
      'Breaking Shockwave dashes a short distance, deals physical damage equal to 100% Attack Damage to nearby enemies, and slows them by 40% for 3 seconds. 25-second cooldown. Stride grants 20 Movement Speed for 2 seconds after dealing physical damage.',
  },
  {
    key: 'goredrinker',
    cost: 3100,
    health: 350,
    attackDamage: 40,
    abilityHaste: 15,
    omniVamp: 8,
    effectDescription:
      'Thirsting Slash deals physical damage equal to 175% Attack Damage to nearby enemies and restores Health equal to 20% Attack Damage plus 10% missing Health for each enemy hit. 12-second cooldown.',
  },
  {
    key: 'galeforce',
    cost: 3100,
    attackDamage: 50,
    critRate: 25,
    attackSpeed: 15,
    percentMovementSpeed: 5,
    effectDescription:
      'Cloudburst dashes in the target direction and fires 3 projectiles at the lowest-Health enemy near the destination, dealing a total of 40-125 physical damage based on level plus 35% bonus Attack Damage. 60-second cooldown.',
  },
  {
    key: 'mercurial-scimitar',
    cost: 3100,
    attackDamage: 45,
    physicalVamp: 10,
    magicResist: 40,
    effectDescription:
      'Quicksilver removes all current crowd control effects and grants crowd control immunity for 0.25 seconds. Afterwards, Perseverance grants 30% Tenacity and 30% Slow Resistance for 1.5 seconds. Cannot be used during knock up or knock back effects. 60-second cooldown.',
  },
];

const magicItemPatchStatSeeds: ItemPatchStatSeed[] = [
  {
    key: 'ludens-echo',
    cost: 2800,
    abilityPower: 100,
    mana: 500,
    abilityHaste: 10,
    effectDescription:
      'Echo causes the next damaging ability or empowered attack to deal 140 plus 15% Ability Power bonus magic damage to the target and up to 3 nearby enemies. 9-second cooldown.',
  },
  {
    key: 'morellonomicon',
    cost: 2650,
    health: 300,
    abilityPower: 75,
    abilityHaste: 15,
    antiHealValue: 50,
    effectDescription:
      'Affliction causes magic damage against enemy champions to apply 50% Grievous Wounds for 3 seconds.',
  },
  {
    key: 'rabadons-deathcap',
    cost: 3400,
    abilityPower: 130,
    effectDescription: 'Overkill increases total Ability Power by 30%.',
  },
  {
    key: 'rylais-crystal-scepter',
    cost: 2700,
    health: 350,
    abilityPower: 65,
    effectDescription:
      'Icy causes damaging abilities and empowered attacks to slow enemies by 30% for 0.75 seconds.',
  },
  {
    key: 'liandrys-torment',
    cost: 3000,
    health: 300,
    abilityPower: 70,
    effectDescription:
      'Torment causes damaging abilities and empowered attacks to burn enemies for magic damage equal to 2% of their maximum Health over 3 seconds. Madness increases damage dealt by 2% for each second in combat with enemy champions, up to 6%.',
  },
  {
    key: 'rod-of-ages',
    cost: 2700,
    health: 350,
    abilityPower: 50,
    mana: 400,
    effectDescription:
      'Eternity restores Mana equal to 15% of damage taken from champions and restores Health equal to 20% of Mana spent, capped at 25 Health per cast. Veteran gains one stack every 35 seconds, up to 10 stacks. Each stack grants 15 Health, 30 Mana, and 4 Ability Power.',
  },
  {
    key: 'lich-bane',
    cost: 2800,
    abilityPower: 100,
    abilityHaste: 10,
    percentMovementSpeed: 5,
    effectDescription:
      'Spellblade causes the next attack within 10 seconds after using an ability to deal bonus magic damage equal to 75% base Attack Damage plus 45% Ability Power. 1.5-second cooldown. Damage is reduced against structures.',
  },
  {
    key: 'archangels-staff',
    cost: 3000,
    abilityPower: 60,
    mana: 500,
    abilityHaste: 25,
    effectDescription:
      'Awe grants Ability Power equal to 1% of maximum Mana and refunds 25% of Mana spent. Mana Charge grants 14 maximum Mana whenever Mana is spent, up to 700 bonus Mana, then transforms Archangel’s Staff into Seraph’s Embrace. Triggers up to 3 times every 10 seconds.',
  },
  {
    key: 'seraphs-embrace',
    cost: 3000,
    abilityPower: 60,
    mana: 1200,
    abilityHaste: 25,
    effectDescription:
      'Awe grants Ability Power equal to 2% of maximum Mana and refunds 25% of Mana spent. Lifeline triggers when damage reduces Health below 35%, granting a shield equal to 100 plus 16% maximum Mana for 2 seconds. 70-second cooldown.',
  },
  {
    key: 'infinity-orb',
    cost: 3100,
    abilityPower: 110,
    flatMagicPenetration: 15,
    effectDescription:
      'Inevitable Demise causes abilities and empowered attacks to critically strike for 20% bonus damage against enemies below 35% Health.',
  },
  {
    key: 'oceanids-trident',
    cost: 2600,
    health: 200,
    abilityPower: 80,
    abilityHaste: 10,
    effectDescription:
      'Lethal Weapon reduces shields gained by enemy champions damaged by abilities for 3 seconds. Area abilities apply shield reduction calculated from a 25% base value plus scaling equal to 5% of bonus Ability Power, capped at 45%. Single-target abilities use a 40% base value with the same scaling, capped at 60%. Existing shields are reduced when the effect is first applied.',
  },
  {
    key: 'cosmic-drive',
    cost: 3000,
    health: 300,
    abilityPower: 70,
    abilityHaste: 25,
    percentMovementSpeed: 5,
    effectDescription:
      'Spelldance grants 30 flat Movement Speed for 4 seconds after dealing magic or true damage to an enemy champion.',
  },
  {
    key: 'riftmaker',
    cost: 3100,
    health: 350,
    abilityPower: 70,
    abilityHaste: 15,
    effectDescription:
      'Void Corruption increases damage dealt by 2% for each second in combat with enemy champions, up to 8%. At maximum strength, it grants 10% Omni Vamp to melee champions or 6% to ranged champions. Void Infusion grants Ability Power equal to 2% of bonus Health.',
  },
  {
    key: 'horizon-focus',
    cost: 2700,
    abilityPower: 80,
    abilityHaste: 25,
    effectDescription:
      'Hypershot causes ability damage dealt to an enemy champion from at least 600 units away to reveal them for 8 seconds and increase damage dealt to them by 10%. When triggered, Focus reveals all enemy champions within 1200 units of the target for 3 seconds. 12-second cooldown.',
  },
  {
    key: 'malignance',
    cost: 2700,
    abilityPower: 90,
    mana: 500,
    abilityHaste: 15,
    effectDescription:
      'Scorn grants 20 Ability Haste specifically to the ultimate ability. Hatefog causes ultimate damage against a champion to burn the ground beneath them for 3 seconds, dealing 60 plus 5% Ability Power magic damage each second and reducing their Magic Resistance by 10. The burn area grows with damage dealt, reaching maximum size at 800 damage.',
  },
  {
    key: 'blackfire-torch',
    cost: 2800,
    abilityPower: 80,
    mana: 500,
    abilityHaste: 20,
    effectDescription:
      'Baleful Blaze causes damaging abilities to deal an additional 20 plus 2% Ability Power magic damage per second for 3 seconds. Against monsters, it deals 40 plus 2% Ability Power magic damage per second. Blackfire grants 4% Ability Power for each enemy champion, epic monster, or large monster currently affected by Baleful Blaze.',
  },
  {
    key: 'dusk-and-dawn',
    cost: 3100,
    health: 350,
    abilityPower: 70,
    abilityHaste: 20,
    attackSpeed: 25,
    effectDescription:
      'Spellblade causes the next attack after casting an ability to deal bonus magic damage equal to 75% base Attack Damage plus 10% Ability Power and apply one additional on-hit effect to the target. 1.5-second cooldown.',
  },
  {
    key: 'stormsurge',
    cost: 2900,
    abilityPower: 90,
    flatMagicPenetration: 15,
    percentMovementSpeed: 6,
    effectDescription:
      'Stormraider triggers after dealing damage equal to 25% of an enemy champion’s maximum Health within 2.5 seconds, applying Squall and granting 25% bonus Movement Speed for 2.5 seconds. Squall strikes after 2 seconds for 125 plus 10% Ability Power magic damage. If the target dies first, Squall detonates immediately in an area and grants 25 gold. 25-second cooldown.',
  },
  {
    key: 'void-staff',
    cost: 3000,
    abilityPower: 95,
    percentMagicPenetration: 40,
  },
  {
    key: 'cryptbloom',
    cost: 3000,
    abilityPower: 75,
    percentMagicPenetration: 30,
    abilityHaste: 20,
    effectDescription:
      'Life from Death creates a healing nova when an enemy champion damaged within the previous 3 seconds dies. The nova restores 100 plus 20% Ability Power Health to nearby allies. 60-second cooldown.',
  },
  {
    key: 'bloodletters-curse',
    cost: 2900,
    health: 350,
    abilityPower: 65,
    abilityHaste: 15,
    effectDescription:
      'Vile Decay causes magic damage from abilities or passives against enemy champions to reduce their Magic Resistance by 7.5% for 6 seconds, stacking up to 30% reduction.',
  },
  {
    key: 'banshees-veil',
    cost: 3000,
    abilityPower: 105,
    magicResist: 40,
    effectDescription:
      'Annul grants a spell shield that blocks the next hostile ability. 30-second cooldown.',
  },
  {
    key: 'hextech-rocketbelt',
    cost: 2700,
    health: 250,
    abilityPower: 70,
    abilityHaste: 20,
    effectDescription:
      'Protobelt dashes in the target direction and unleashes 7 magic bolts, dealing 100 plus 10% Ability Power magic damage to enemies hit. If a champion or monster is hit by more than one bolt, each additional bolt deals only 10% damage. 30-second cooldown.',
  },
  {
    key: 'zhonyas-hourglass',
    cost: 3300,
    armor: 40,
    abilityPower: 110,
    effectDescription:
      'Stasis makes the user immune to damage and untargetable for 2.5 seconds, but prevents movement, attacks, ability casts, and item use. 120-second cooldown.',
  },
];

const defensiveItemPatchStatSeeds: ItemPatchStatSeed[] = [
  {
    key: 'sunfire-aegis',
    cost: 2900,
    health: 425,
    armor: 20,
    abilityHaste: 15,
    effectDescription:
      'Immolate deals 16-25 plus 0.8% bonus Health magic damage per second to nearby enemies while in combat. Damaging champions or epic monsters with Immolate increases its damage by 5% for 5 seconds, stacking up to 6 times. At maximum stacks, Flametouch causes attacks to burn nearby enemies for 50% of Immolate damage over 3 seconds. Immolate deals increased damage to monsters and minions.',
  },
  {
    key: 'randuins-omen',
    cost: 2800,
    health: 400,
    armor: 75,
    effectDescription:
      'Resilience reduces damage received from critical strikes by 30%. Countercurrent gains one stack when critically struck by physical damage. Each stack grants 5% Movement Speed and 5% Slow Resistance, up to 4 stacks.',
  },
  {
    key: 'thornmail',
    cost: 2700,
    health: 200,
    armor: 75,
    antiHealValue: 50,
    effectDescription:
      'Thorns causes incoming attacks to deal 20 plus scaling from bonus Armor plus 1% bonus Health magic damage back to the attacker. Entwine applies 50% Grievous Wounds to enemy champions for 3 seconds when they attack the user or receive damage from the user.',
  },
  {
    key: 'warmogs-armor',
    cost: 2850,
    health: 700,
    healthRegen: 100,
    abilityHaste: 20,
    effectDescription:
      'Warmog’s Heart restores 3.5% Health per second after not taking damage for 5 seconds while the user has at least 950 bonus Health. Blessed increases all healing and shielding received by 30%.',
  },
  {
    key: 'iceborn-gauntlet',
    cost: 3000,
    health: 300,
    armor: 50,
    mana: 250,
    abilityHaste: 30,
    effectDescription:
      'Spellblade causes the next attack within 10 seconds after using an ability to deal area bonus physical damage equal to 100% base Attack Damage plus 25% bonus Armor and create an icy field for 2 seconds that slows enemies by 30%. Armor increases the field size. 1.5-second cooldown. Damage is reduced against structures.',
  },
  {
    key: 'dead-mans-plate',
    cost: 2800,
    health: 350,
    armor: 70,
    percentMovementSpeed: 5,
    effectDescription:
      'Momentum builds while moving and grants up to 40 flat Movement Speed at 100 stacks. Attacking removes all Momentum. Crushing Blow deals up to 100 bonus magic damage based on Momentum consumed. A melee attack at maximum Momentum slows the target by 75% for 1 second.',
  },
  {
    key: 'zekes-convergence',
    cost: 2700,
    health: 350,
    armor: 40,
    mana: 150,
    abilityHaste: 15,
    effectDescription:
      'Harbinger triggers after casting the ultimate, surrounding the user with a blizzard and empowering a nearby ally for 10 seconds. The blizzard deals up to 320-600 damage, slows enemies by 25%, and leaves a trail that grants allied champions 40 Movement Speed for 1 second. 30-second cooldown.',
  },
  {
    key: 'winters-approach',
    cost: 2600,
    health: 350,
    mana: 500,
    abilityHaste: 15,
    effectDescription:
      'Awe grants bonus Health equal to 8% of maximum Mana and refunds 15% of Mana spent. Mana Charge grants 12 maximum Mana after attacking, spending Mana, or taking damage from champions, epic monsters, or structures, up to 700 bonus Mana, then transforms Winter’s Approach into Fimbulwinter. Triggers up to 3 times every 10 seconds.',
  },
  {
    key: 'fimbulwinter',
    cost: 2600,
    health: 350,
    mana: 1200,
    abilityHaste: 15,
    effectDescription:
      'Awe grants bonus Health equal to 10% of maximum Mana and refunds 15% of Mana spent. Frozen Colossus consumes 3% current Mana after slowing or immobilizing an enemy champion to grant a shield for 3 seconds that absorbs 90-180 plus 4.5% current Mana. The shield is increased by 80% when more than one enemy champion is nearby and is 50% effective for ranged champions. Only triggers above 20% maximum Mana. 8-second cooldown.',
  },
  {
    key: 'force-of-nature',
    cost: 2750,
    health: 350,
    magicResist: 60,
    percentMovementSpeed: 5,
    effectDescription:
      'Absorb grants one Steadfast stack for 7 seconds after taking ability damage from an enemy champion, up to 4 stacks. Champion damage refreshes the duration. At maximum stacks, gain 10% Movement Speed and reduce incoming magic damage by 20%.',
  },
  {
    key: 'frozen-heart',
    cost: 2650,
    armor: 80,
    mana: 250,
    abilityHaste: 20,
    effectDescription:
      'Winter’s Caress causes basic attacks and magic damage dealt by the user, received by the user, or received by nearby allies to apply Chill to enemy champions for 3 seconds. Each stack reduces Attack Speed by 9%, stacking up to 4 times for 36%. Each individual ability can apply Chill once every 3 seconds.',
  },
  {
    key: 'dawnshroud',
    cost: 2700,
    health: 250,
    armor: 50,
    magicResist: 30,
    effectDescription:
      'Dawnbringer triggers when the user immobilizes an enemy champion or is immobilized within 400 units of one. It reveals nearby enemy champions for 3 seconds, deals 40 plus scaling from bonus Health magic damage, and increases Armor and Magic Resistance by 20% for 3 seconds. 3-second cooldown.',
  },
  {
    key: 'amaranths-twinguard',
    cost: 3100,
    armor: 60,
    magicResist: 60,
    effectDescription:
      'Endurance gains one stack each second while in combat with enemy champions, up to 5 stacks. At maximum stacks, the user gains 20% size, 20% Tenacity, and 30% increased Armor and Magic Resistance until leaving champion combat.',
  },
  {
    key: 'mantle-of-the-twelfth-hour',
    cost: 2900,
    health: 200,
    armor: 40,
    magicResist: 40,
    effectDescription:
      'Lifeline triggers when damage reduces Health below 35%, granting temporary maximum Health equal to 180 plus 45% bonus Health, 50% Slow Resistance, and 30 flat Movement Speed for 3 seconds. 75-second cooldown.',
  },
  {
    key: 'searing-crown',
    cost: 2700,
    health: 300,
    armor: 50,
    effectDescription:
      'Fiery Touch causes attacks and damaging abilities to burn the target for 3 seconds, dealing magic damage equal to 1.4% of the target’s maximum Health each second. Ranged users deal 0.8% maximum Health damage each second. The burn deals 150% damage to minions and monsters and is capped at 125 damage against monsters.',
  },
  {
    key: 'heartsteel',
    cost: 3000,
    health: 700,
    healthRegen: 150,
    abilityHaste: 20,
    effectDescription:
      'Colossal Consumption charges for 2.5 seconds while within 700 units of an enemy champion. The charged attack deals bonus physical damage equal to 140 plus 3.5% maximum Health and permanently grants maximum Health equal to 15% of the damage dealt. Each target has a 20-second cooldown.',
  },
  {
    key: 'kaenic-rookern',
    cost: 2800,
    health: 350,
    healthRegen: 100,
    magicResist: 75,
    effectDescription:
      'Magebane grants a magic shield after not taking magic damage for 12 seconds. The shield absorbs 70-180 plus 10% maximum Health magic damage.',
  },
  {
    key: 'yordle-trap',
    cost: 2600,
    health: 350,
    armor: 40,
    abilityHaste: 15,
    effectDescription:
      'Catcher triggers after displacing an enemy with a crowd control ability, granting 10% Movement Speed for 3 seconds and marking the target for 8 seconds. Marked targets lose 5-12 Armor and Magic Resistance. If the marked target dies, 100-140 bonus gold is shared between the user and nearby allies. Bonus gold can be granted once every 10 seconds.',
  },
  {
    key: 'radiant-virtue',
    cost: 2850,
    health: 300,
    armor: 45,
    abilityHaste: 15,
    effectDescription:
      'Guiding Light triggers after casting the ultimate, increasing maximum Health by 10% for 6 seconds. During this time, allied champions within 1200 units are healed for 2.5% of the user’s maximum Health each second. Healing is reduced by 50% for ranged users. 60-second cooldown.',
  },
  {
    key: 'abyssal-mask',
    cost: 3000,
    health: 400,
    magicResist: 55,
    abilityHaste: 10,
    effectDescription:
      'Unmake curses enemy champions within 600 units, reducing their Magic Resistance by 5 plus scaling from bonus Health, up to 25. The user gains 9 bonus Magic Resistance for each cursed enemy champion.',
  },
  {
    key: 'hollow-radiance',
    cost: 2800,
    health: 400,
    magicResist: 40,
    abilityHaste: 15,
    effectDescription:
      'Immolate deals 20-30 plus 1% bonus Health magic damage per second to nearby enemies for 5 seconds while in combat. It deals 125% damage to monsters and 200% damage to minions. Desolate causes defeated enemies and neutral monsters to deal 30 plus 2% bonus Health magic damage in an area around them.',
  },
  {
    key: 'knights-vow',
    cost: 2500,
    health: 400,
    armor: 40,
    abilityHaste: 10,
    effectDescription:
      'Pledge binds the user to a designated allied champion. While near the bound ally, part of the damage they receive is redirected to the user, and damage dealt by the ally restores Health to the user.',
  },
  {
    key: 'unending-despair',
    cost: 3000,
    health: 200,
    armor: 45,
    magicResist: 45,
    effectDescription:
      'Anguish triggers every 4 seconds while in combat with enemy champions, dealing magic damage equal to 3% of maximum Health to nearby enemy champions and healing for 250% of the damage dealt. Anguish is unaffected by Item Ability Haste.',
  },
  {
    key: 'gargoyle-stoneplate',
    cost: 2900,
    health: 200,
    armor: 45,
    magicResist: 45,
    abilityHaste: 10,
    effectDescription:
      'Stoneplate grants a shield equal to 100 plus 90% bonus Health that rapidly decays over 2.5 seconds and temporarily increases the user’s size. 60-second cooldown.',
  },
];

const supportItemPatchStatSeeds: ItemPatchStatSeed[] = [
  {
    key: 'bulwark-of-the-mountain',
    cost: 0,
    health: 175,
    abilityHaste: 10,
    effectDescription:
      'Soulcast grants 75 gold, 25 Health, and either 2 Attack Damage or 4 Ability Power adaptively every 60 seconds, up to 250 Health and either 20 Attack Damage or 40 Ability Power. The item deals 2 additional damage to revealed Sight Wards. While out of combat, gain 10% Movement Speed when moving toward the Perfect Partner, increased to 30% when more than 2500 units apart.',
  },
  {
    key: 'black-mist-scythe',
    cost: 0,
    abilityHaste: 10,
    effectDescription:
      'Versatile grants either 14 Attack Damage or 28 Ability Power adaptively. Soulcast grants 75 gold, 25 Health, and either 2 Attack Damage or 4 Ability Power adaptively every 60 seconds, up to 250 Health and either 20 Attack Damage or 40 Ability Power. The item deals 2 additional damage to revealed Sight Wards. While out of combat, gain 10% Movement Speed when moving toward the Perfect Partner, increased to 30% when more than 2500 units apart.',
  },
  {
    key: 'ardent-censer',
    cost: 2700,
    health: 250,
    abilityPower: 45,
    manaRegen: 50,
    abilityHaste: 10,
    healShieldPower: 5,
    percentMovementSpeed: 5,
    effectDescription:
      'Censer causes healing or shielding another allied champion, including healing them at full Health, to grant them 15-34% Attack Speed and make their attacks deal 16-22 bonus magic damage for 6 seconds. The bonus damage can critically strike.',
  },
  {
    key: 'harmonic-echo',
    cost: 2800,
    health: 100,
    abilityPower: 50,
    mana: 300,
    manaRegen: 50,
    abilityHaste: 15,
    healShieldPower: 5,
    effectDescription:
      'Moving and casting abilities builds Harmony. At 100 Harmony, the next healing or shielding ability used on an ally restores an additional 100-160 plus 15% Ability Power Health. When the target is below 30% Health, the healing is increased to 130% of its original value.',
  },
  {
    key: 'staff-of-flowing-water',
    cost: 2500,
    health: 100,
    abilityPower: 50,
    manaRegen: 50,
    abilityHaste: 15,
    healShieldPower: 5,
    effectDescription:
      'Rapids causes healing or shielding an allied champion, including healing them at full Health, to grant the user 15 Ability Haste and 30-50 Ability Power based on the target’s level for 6 seconds.',
  },
  {
    key: 'imperial-mandate',
    cost: 2500,
    health: 200,
    abilityPower: 50,
    abilityHaste: 20,
    effectDescription:
      'Coordinated Fire causes abilities that slow or immobilize an enemy champion to deal 47-75 bonus magic damage and mark them for 4 seconds. Allied champion damage detonates the mark, dealing 94-150 additional magic damage based on the ally’s level and granting both the user and ally 20% Movement Speed for 2 seconds. 6-second cooldown per enemy champion.',
  },
  {
    key: 'redemption',
    cost: 2600,
    health: 150,
    abilityPower: 50,
    manaRegen: 50,
    abilityHaste: 15,
    healShieldPower: 5,
    effectDescription:
      'Salvation targets a large area. After 2.5 seconds, it restores 150-350 Health based on each ally champion’s level and deals true damage equal to 10% of maximum Health to enemy champions. It can be activated while dead. 60-second cooldown.',
  },
  {
    key: 'mikaels-blessing',
    cost: 2500,
    health: 300,
    manaRegen: 50,
    abilityHaste: 15,
    healShieldPower: 6,
    effectDescription:
      'Cleanse removes all crowd control effects from the target allied champion and makes them immune to all crowd control except suppression and airborne effects for 0.2 seconds. It also restores 150-250 Health. 90-second cooldown.',
  },
  {
    key: 'locket-of-the-iron-solari',
    cost: 2600,
    health: 200,
    armor: 30,
    magicResist: 30,
    abilityHaste: 10,
    effectDescription:
      'Locket grants the user and nearby allied champions a shield that absorbs 250-370 damage for 2.5 seconds. The effect is reduced by 50% if the target was affected by another Locket within the previous 20 seconds. 60-second cooldown.',
  },
  {
    key: 'shurelyas-battlesong',
    cost: 2600,
    abilityPower: 35,
    manaRegen: 50,
    abilityHaste: 20,
    percentMovementSpeed: 5,
    effectDescription:
      'Inspiring Speech grants nearby allied champions 30% Movement Speed for 4 seconds. 60-second cooldown.',
  },
];

const tierTwoBootPatchStatSeeds: ItemPatchStatSeed[] = [
  {
    key: 'gluttonous-greaves',
    cost: 1000,
    omniVamp: 5,
    flatMovementSpeed: 45,
    effectDescription:
      'Balance of Power adaptively grants either 12 Attack Damage or 20 Ability Power. Conversion grants 5% Omni Vamp, and each champion takedown participation grants an additional 0.5% Omni Vamp, up to 5% additional Omni Vamp and a maximum of 10% Omni Vamp.',
  },
  {
    key: 'berserkers-greaves',
    cost: 1200,
    attackSpeed: 30,
    flatMovementSpeed: 45,
    effectDescription:
      'Blessed Blade causes attacks to restore 10 Health on hit.',
  },
  {
    key: 'mercurys-treads',
    cost: 1200,
    health: 150,
    magicResist: 25,
    tenacity: 15,
    flatMovementSpeed: 45,
  },
  {
    key: 'plated-steelcaps',
    cost: 1200,
    health: 150,
    armor: 25,
    flatMovementSpeed: 45,
    effectDescription:
      'Block reduces damage taken from champion basic attacks by 6%.',
  },
  {
    key: 'ionian-boots-of-lucidity',
    cost: 1000,
    manaRegen: 50,
    abilityHaste: 15,
    flatMovementSpeed: 45,
    effectDescription: 'Summoned reduces Summoner Spell cooldowns by 15%.',
  },
  {
    key: 'boots-of-mana',
    cost: 1200,
    abilityPower: 25,
    flatMagicPenetration: 8,
    manaRegen: 75,
    flatMovementSpeed: 45,
    effectDescription:
      'Equilibrium causes champions without Mana to gain 50% bonus Health Regeneration. Big Bully causes attacks and active abilities to deal 18 bonus true damage to minions.',
  },
  {
    key: 'boots-of-dynamism',
    cost: 1200,
    attackDamage: 15,
    flatArmorPenetration: 10,
    flatMovementSpeed: 45,
  },
];

const tierThreeBootPatchStatSeeds: ItemPatchStatSeed[] = [
  {
    key: 'immortal-treads',
    cost: 2000,
    omniVamp: 5,
    flatMovementSpeed: 45,
    effectDescription:
      'Balance of Power adaptively grants either 12 Attack Damage or 20 Ability Power. Conversion grants 5% Omni Vamp, and each champion takedown participation grants an additional 0.5% Omni Vamp, up to 5% additional Omni Vamp and a maximum of 10% Omni Vamp. Now and Forever causes the user to deal 50% bonus damage while above 50% Health and grants 12% increased healing and shielding while below 50% Health.',
  },
  {
    key: 'gunmetal-greaves',
    cost: 2200,
    attackSpeed: 50,
    physicalVamp: 5,
    flatMovementSpeed: 45,
    effectDescription:
      'Blessed Blade causes attacks to restore 12 Health on hit. Noxian Gait causes basic attacks against enemy champions to grant 15% Movement Speed for melee champions or 10% Movement Speed for ranged champions for 2 seconds.',
  },
  {
    key: 'chainlaced-crushers',
    cost: 2200,
    health: 150,
    magicResist: 35,
    tenacity: 30,
    flatMovementSpeed: 45,
    effectDescription:
      'Noxian Persistence grants a magic shield equal to 20-140 based on level plus 5% maximum Health after taking magic damage from an enemy champion. 12-second cooldown.',
  },
  {
    key: 'armored-advance',
    cost: 2200,
    health: 150,
    armor: 35,
    flatMovementSpeed: 45,
    effectDescription:
      'Block reduces damage taken from champion basic attacks by 10%. Noxian Endurance grants a physical shield equal to 20-140 based on level plus 5% maximum Health after taking physical damage from an enemy champion. 12-second cooldown.',
  },
  {
    key: 'crimson-lucidity',
    cost: 2000,
    manaRegen: 75,
    abilityHaste: 25,
    flatMovementSpeed: 45,
    effectDescription:
      'Summoned grants 20% Summoner Spell Haste. Noxian Haste grants 10% Movement Speed for melee champions or 8% Movement Speed for ranged champions for 4 seconds after damaging an enemy champion with an ability, healing or shielding an allied champion, or casting a Summoner Spell. The same ability can trigger this effect only once every 4 seconds.',
  },
  {
    key: 'spellslingers-shoes',
    cost: 2200,
    abilityPower: 40,
    flatMagicPenetration: 18,
    percentMagicPenetration: 8,
    manaRegen: 100,
    flatMovementSpeed: 45,
    effectDescription:
      'Equilibrium causes champions without Mana to gain 50% bonus Health Regeneration. Big Bully causes attacks and active abilities to deal 22 bonus true damage to minions.',
  },
  {
    key: 'armorcrusher-boots',
    cost: 2200,
    attackDamage: 20,
    flatArmorPenetration: 10,
    percentArmorPenetration: 6,
    flatMovementSpeed: 45,
    effectDescription:
      'Cloudwalker grants 20 flat Movement Speed while out of combat.',
  },
];

const itemPatchStatSeeds: ItemPatchStatSeed[] = [
  ...basicItemPatchStatSeeds,
  ...middleTierItemPatchStatSeeds,
  ...physicalItemPatchStatSeeds,
  ...magicItemPatchStatSeeds,
  ...defensiveItemPatchStatSeeds,
  ...supportItemPatchStatSeeds,
  ...tierTwoBootPatchStatSeeds,
  ...tierThreeBootPatchStatSeeds,
];

function buildItemPatchStatData(seed: ItemPatchStatSeed) {
  return {
    isAvailable: seed.isAvailable ?? true,

    cost: seed.cost ?? null,

    abilityPower: seed.abilityPower ?? null,
    attackDamage: seed.attackDamage ?? null,
    armor: seed.armor ?? null,
    magicResist: seed.magicResist ?? null,
    health: seed.health ?? null,
    mana: seed.mana ?? null,
    abilityHaste: seed.abilityHaste ?? null,
    critRate: seed.critRate ?? null,
    attackSpeed: seed.attackSpeed ?? null,

    flatArmorPenetration: seed.flatArmorPenetration ?? null,
    percentArmorPenetration: seed.percentArmorPenetration ?? null,
    flatMagicPenetration: seed.flatMagicPenetration ?? null,
    percentMagicPenetration: seed.percentMagicPenetration ?? null,

    physicalVamp: seed.physicalVamp ?? null,
    magicVamp: seed.magicVamp ?? null,
    omniVamp: seed.omniVamp ?? null,

    healthRegen: seed.healthRegen ?? null,
    manaRegen: seed.manaRegen ?? null,
    healShieldPower: seed.healShieldPower ?? null,
    tenacity: seed.tenacity ?? null,
    slowResistance: seed.slowResistance ?? null,

    flatMovementSpeed: seed.flatMovementSpeed ?? null,
    percentMovementSpeed: seed.percentMovementSpeed ?? null,

    antiHealValue: seed.antiHealValue ?? null,
    shieldPower: seed.shieldPower ?? null,

    effectDescription: seed.effectDescription ?? null,

    deletedAt: null,
  };
}

export async function seedItemPatchStats(
  prisma: PrismaClient,
  patchId: string,
) {
  console.log('SEEDING ITEM PATCH STATS...');

  const items = await prisma.item.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      key: true,
    },
  });

  const itemsByKey = new Map(items.map((item) => [item.key, item]));
  const seenKeys = new Set<string>();

  for (const itemPatchStatSeed of itemPatchStatSeeds) {
    if (seenKeys.has(itemPatchStatSeed.key)) {
      throw new Error(
        `Duplicate item patch stat key: ${itemPatchStatSeed.key}`,
      );
    }

    seenKeys.add(itemPatchStatSeed.key);

    if (!itemsByKey.has(itemPatchStatSeed.key)) {
      throw new Error(
        `Cannot seed item patch stat. Missing item: ${itemPatchStatSeed.key}`,
      );
    }
  }

  for (const itemPatchStatSeed of itemPatchStatSeeds) {
    const item = itemsByKey.get(itemPatchStatSeed.key)!;
    const itemPatchStatData = buildItemPatchStatData(itemPatchStatSeed);

    await prisma.itemPatchStat.upsert({
      where: {
        patchId_itemId: {
          patchId,
          itemId: item.id,
        },
      },
      update: itemPatchStatData,
      create: {
        patchId,
        itemId: item.id,
        ...itemPatchStatData,
      },
    });
  }
}
