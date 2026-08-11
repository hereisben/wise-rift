import { DraftChampionContext } from '../../../common/types/draft-recommendation-champion.type.js';
import { ThreatSignal } from '../../../common/types/situational-item-recommendation.type.js';
import { Item, ItemPatchStat } from '../../../generated/prisma/client.js';

export type ThreatSignalSummary = {
  signal: ThreatSignal;
  count: number;
  sourceChampionKeys: string[];
};

export type SituationalItemCandidate = {
  item: Item;
  patchStat: ItemPatchStat;
};

export type SituationalItemScoringResult = {
  itemKey: string;
  itemScore: number;
  matchedThreatSignals: ThreatSignal[];
  goodAgainstChampionKeys: string[];
};

const RAW_TAG_TO_THREAT_SIGNALS: Record<string, ThreatSignal[]> = {
  HEAL: ['HEALING'],
  HEALING: ['HEALING'],
  SUSTAIN: ['HEALING'],

  SHIELD: ['SHIELDING'],
  SHIELDING: ['SHIELDING'],

  TANK: ['TANK'],
  FRONTLINE: ['TANK'],

  PHYSICAL_DAMAGE: ['PHYSICAL_DAMAGE'],
  ATTACK_DAMAGE: ['PHYSICAL_DAMAGE'],

  MAGIC_DAMAGE: ['MAGIC_DAMAGE'],
  ABILITY_POWER: ['MAGIC_DAMAGE'],

  TRUE_DAMAGE: ['TRUE_DAMAGE'],

  ARMOR_PENETRATION: ['ARMOR_PENETRATION'],
  PERCENT_ARMOR_PENETRATION: ['ARMOR_PENETRATION'],
  LETHALITY: ['ARMOR_PENETRATION'],

  AUTO_ATTACK_CHAMPION: ['AUTO_ATTACK'],
  AUTO_ATTACK: ['AUTO_ATTACK'],
  ON_HIT: ['AUTO_ATTACK'],

  ATTACK_SPEED: ['ATTACK_SPEED'],

  CRITICAL_STRIKE: ['CRITICAL_STRIKE'],
  CRITICAL_RATE: ['CRITICAL_STRIKE'],
  CRIT: ['CRITICAL_STRIKE'],

  BURST_DAMAGE: ['BURST'],
  MAGIC_BURST: ['MAGIC_DAMAGE', 'BURST'],
  PHYSICAL_BURST: ['PHYSICAL_DAMAGE', 'BURST'],
  ASSASSIN: ['BURST', 'DIVE'],

  DIVE: ['DIVE'],
  ENGAGE: ['DIVE'],

  CROWD_CONTROL: ['CROWD_CONTROL'],
  HARD_CROWD_CONTROL: ['CROWD_CONTROL'],
  IMMOBILIZE: ['CROWD_CONTROL'],
};

const THREAT_SIGNAL_TO_GOOD_AGAINST_TAGS: Record<ThreatSignal, string[]> = {
  HEALING: ['HEALING', 'SUSTAIN'],

  SHIELDING: ['SHIELD', 'ENCHANTER', 'PROTECT_COMPOSITION'],

  TANK: ['TANK', 'HIGH_HEALTH'],

  PHYSICAL_DAMAGE: ['PHYSICAL_DAMAGE'],

  MAGIC_DAMAGE: ['MAGIC_DAMAGE', 'MAGIC_BURST'],

  TRUE_DAMAGE: ['TRUE_DAMAGE'],

  ARMOR_PENETRATION: [],

  AUTO_ATTACK: ['AUTO_ATTACK_CHAMPION'],

  ATTACK_SPEED: ['ATTACK_SPEED', 'AUTO_ATTACK_CHAMPION'],

  CRITICAL_STRIKE: ['CRITICAL_STRIKE'],

  BURST: ['BURST_DAMAGE', 'ASSASSIN'],

  DIVE: ['DIVE', 'ASSASSIN'],

  CROWD_CONTROL: ['CROWD_CONTROL', 'PICK_COMPOSITION'],
};

const THREAT_SIGNAL_TO_CAPABILITY_TAGS: Record<ThreatSignal, string[]> = {
  HEALING: ['ANTI_HEAL'],

  SHIELDING: ['ANTI_SHIELD'],

  TANK: [
    'ANTI_TANK',
    'MAX_HEALTH_DAMAGE',
    'CURRENT_HEALTH_DAMAGE',
    'BONUS_HEALTH_DAMAGE',
    'ANTI_ARMOR',
    'ARMOR_REDUCTION',
    'ANTI_MAGIC_RESIST',
    'MAGIC_RESIST_REDUCTION',
  ],

  PHYSICAL_DAMAGE: ['ARMOR', 'ANTI_PHYSICAL', 'PHYSICAL_SHIELD'],

  MAGIC_DAMAGE: [
    'MAGIC_RESIST',
    'ANTI_MAGIC_DAMAGE',
    'ANTI_MAGIC_BURST',
    'MAGIC_SHIELD',
  ],

  TRUE_DAMAGE: [],

  ARMOR_PENETRATION: [],

  AUTO_ATTACK: ['AUTO_ATTACK_DEFENSE', 'ANTI_ATTACK_SPEED'],

  ATTACK_SPEED: ['ANTI_ATTACK_SPEED', 'AUTO_ATTACK_DEFENSE'],

  CRITICAL_STRIKE: ['ANTI_CRIT', 'AUTO_ATTACK_DEFENSE'],

  BURST: [
    'ANTI_BURST',
    'STASIS',
    'INVULNERABLE',
    'LIFELINE',
    'LOW_HEALTH_SURVIVAL',
    'DAMAGE_DELAY',
    'SECOND_LIFE',
    'REVIVE',
  ],

  DIVE: [
    'ANTI_BURST',
    'STASIS',
    'INVULNERABLE',
    'ALLY_PROTECTION',
    'PEEL',
    'LOW_HEALTH_SURVIVAL',
    'SECOND_LIFE',
    'REVIVE',
  ],

  CROWD_CONTROL: [
    'CLEANSE',
    'ALLY_CLEANSE',
    'TENACITY',
    'ANTI_CROWD_CONTROL',
    'SPELL_SHIELD',
  ],
};

const THREAT_SIGNAL_TO_WEAK_AGAINST_TAGS: Record<ThreatSignal, string[]> = {
  HEALING: [],

  SHIELDING: [],

  TANK: ['TANK'],

  PHYSICAL_DAMAGE: ['PHYSICAL_DAMAGE'],

  MAGIC_DAMAGE: ['MAGIC_DAMAGE'],

  TRUE_DAMAGE: ['TRUE_DAMAGE'],

  ARMOR_PENETRATION: [],

  AUTO_ATTACK: [],

  ATTACK_SPEED: [],

  CRITICAL_STRIKE: [],

  BURST: ['BURST_DAMAGE', 'BURST_FIGHT', 'SHORT_BURST_FIGHT', 'EARLY_BURST'],

  DIVE: ['DIVE', 'ASSASSIN'],

  CROWD_CONTROL: [
    'HARD_CROWD_CONTROL',
    'KNOCK_UP',
    'KNOCK_BACK',
    'SUPPRESSION',
    'SILENCE',
  ],
};

export function collectEnemyThreatSignals(
  enemyChampionContexts: DraftChampionContext[],
): ThreatSignalSummary[] {
  const threatSignalSummaries: ThreatSignalSummary[] = [];

  for (const enemyChampionContext of enemyChampionContexts) {
    const rawTags: string[] = [];

    const classTags = enemyChampionContext.champion.classTags;
    rawTags.push(...classTags);

    const utilityTags = enemyChampionContext.champion.utilityTags;
    rawTags.push(...utilityTags);

    const strengths = enemyChampionContext.champion.strengths;
    rawTags.push(...strengths);

    const buildTags = enemyChampionContext.selectedBuildProfile?.buildTags;
    if (buildTags) {
      rawTags.push(...buildTags);
    }

    const playStyleTags =
      enemyChampionContext.selectedBuildProfile?.playStyleTags;
    if (playStyleTags) {
      rawTags.push(...playStyleTags);
    }

    const providesTags =
      enemyChampionContext.selectedSynergyProfile?.providesTags;
    if (providesTags) {
      rawTags.push(...providesTags);
    }

    const threatSignals = new Set<ThreatSignal>();

    for (const rawTag of rawTags) {
      const mappedThreatSignals = RAW_TAG_TO_THREAT_SIGNALS[rawTag];

      if (mappedThreatSignals) {
        for (const mappedThreatSignal of mappedThreatSignals) {
          threatSignals.add(mappedThreatSignal);
        }
      }
    }

    for (const threatSignal of threatSignals) {
      const existingSummary = threatSignalSummaries.find(
        (summary) => summary.signal === threatSignal,
      );

      if (existingSummary) {
        existingSummary.count++;
        existingSummary.sourceChampionKeys.push(
          enemyChampionContext.champion.key,
        );
      } else {
        const newThreatSignalSummary: ThreatSignalSummary = {
          signal: threatSignal,
          count: 1,
          sourceChampionKeys: [enemyChampionContext.champion.key],
        };

        threatSignalSummaries.push(newThreatSignalSummary);
      }
    }
  }

  return threatSignalSummaries;
}

export function scoreSituationalItem(
  candidateItem: SituationalItemCandidate,
  threatSignalSummaries: ThreatSignalSummary[],
): SituationalItemScoringResult {
  let itemScore = 0;
  const matchedThreatSignals = new Set<ThreatSignal>();
  const goodAgainstChampionKeys = new Set<string>();

  for (const threatSignalSummary of threatSignalSummaries) {
    const expectedGoodAgainstTags: string[] =
      THREAT_SIGNAL_TO_GOOD_AGAINST_TAGS[threatSignalSummary.signal];
    const expectedCapabilityTags: string[] =
      THREAT_SIGNAL_TO_CAPABILITY_TAGS[threatSignalSummary.signal];
    const expectedWeakAgainstTags: string[] =
      THREAT_SIGNAL_TO_WEAK_AGAINST_TAGS[threatSignalSummary.signal];

    const threatStrength = Math.min(threatSignalSummary.count, 3);

    for (const expectedGoodAgainstTag of expectedGoodAgainstTags) {
      if (candidateItem.item.goodAgainst.includes(expectedGoodAgainstTag)) {
        itemScore += threatStrength;
        threatSignalSummary.sourceChampionKeys.forEach((championKey) =>
          goodAgainstChampionKeys.add(championKey),
        );
        matchedThreatSignals.add(threatSignalSummary.signal);
        break;
      }
    }

    for (const expectedCapabilityTag of expectedCapabilityTags) {
      if (candidateItem.item.tags.includes(expectedCapabilityTag)) {
        itemScore += 1;
        matchedThreatSignals.add(threatSignalSummary.signal);
      }
    }

    for (const expectedWeakAgainstTag of expectedWeakAgainstTags) {
      if (candidateItem.item.weakAgainst.includes(expectedWeakAgainstTag)) {
        itemScore -= 2;
        break;
      }
    }
  }

  return {
    itemKey: candidateItem.item.key,
    itemScore,
    matchedThreatSignals: [...matchedThreatSignals],
    goodAgainstChampionKeys: [...goodAgainstChampionKeys],
  };
}

export function scoreSituationalItems(
  candidateItems: SituationalItemCandidate[],
  threatSignalSummaries: ThreatSignalSummary[],
): SituationalItemScoringResult[] {
  const situationalItemScoringResults: SituationalItemScoringResult[] = [];
  for (const candidateItem of candidateItems) {
    situationalItemScoringResults.push(
      scoreSituationalItem(candidateItem, threatSignalSummaries),
    );
  }
  return situationalItemScoringResults;
}

export function rankSituationalItems(
  situationalItemScoringResults: SituationalItemScoringResult[],
  limit: number,
): SituationalItemScoringResult[] {
  const unrankedSituationalItemScoringResults: SituationalItemScoringResult[] =
    [];
  for (const situationalItemScoringResult of situationalItemScoringResults) {
    if (situationalItemScoringResult.itemScore <= 0) {
      continue;
    }

    unrankedSituationalItemScoringResults.push(situationalItemScoringResult);
  }

  const sortedSituationalItemScoringResults: SituationalItemScoringResult[] =
    unrankedSituationalItemScoringResults.sort((resultA, resultB) => {
      if (resultB.itemScore !== resultA.itemScore) {
        return resultB.itemScore - resultA.itemScore;
      }

      return resultA.itemKey.localeCompare(resultB.itemKey);
    });

  return sortedSituationalItemScoringResults.slice(0, limit);
}
