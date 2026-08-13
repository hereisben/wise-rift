import type {
  ThreatSignal,
  ThreatSignalSummary,
} from '../../../common/types/situational-item-recommendation.type.js';
import type {
  RuneReplacementCandidateScore,
  RuneReplacementGroupScoringResult,
} from './../../../common/types/rune-replacement-scoring.types.js';

type ScoreRuneReplacementGroupInput = {
  baselineRuneKey: string;
  alternativeRuneKeys: string[];
  threatSignalSummaries: ThreatSignalSummary[];
};

type RuneThreatSignalScoringRule = {
  signal: ThreatSignal;
  weight: number;
  reasonCode: string;
};

const RUNE_THREAT_SIGNAL_SCORE_MAP: Record<
  string,
  RuneThreatSignalScoringRule[]
> = {
  'bone-plating': [
    {
      signal: 'BURST',
      weight: 2,
      reasonCode: 'ENEMY_BURST',
    },
    {
      signal: 'DIVE',
      weight: 2,
      reasonCode: 'ENEMY_DIVE',
    },
  ],

  'legend-tenacity': [
    {
      signal: 'CROWD_CONTROL',
      weight: 2,
      reasonCode: 'ENEMY_CROWD_CONTROL',
    },
  ],

  'cut-down': [
    {
      signal: 'TANK',
      weight: 2,
      reasonCode: 'ENEMY_TANK',
    },
  ],
};

export function scoreRuneReplacementGroup(
  input: ScoreRuneReplacementGroupInput,
): RuneReplacementGroupScoringResult {
  const baseline = scoreRuneCandidate(
    input.baselineRuneKey,
    input.threatSignalSummaries,
  );

  const alternatives = input.alternativeRuneKeys.map((runeKey) =>
    scoreRuneCandidate(runeKey, input.threatSignalSummaries),
  );

  return {
    baseline,
    alternatives,
  };
}

function scoreRuneCandidate(
  runeKey: string,
  threatSignalSummaries: ThreatSignalSummary[],
): RuneReplacementCandidateScore {
  const expectedRules: RuneThreatSignalScoringRule[] =
    RUNE_THREAT_SIGNAL_SCORE_MAP[runeKey];

  if (!expectedRules) {
    return {
      runeKey,
      score: 0,
      goodAgainstChampionKeys: [],
      reasonCodes: [],
    };
  }

  let score = 0;
  const goodAgainstChampionKeys = new Set<string>();
  const reasonCodes = new Set<string>();

  for (const rule of expectedRules) {
    const threatSignalSummary = threatSignalSummaries.find(
      (summary) => summary.signal === rule.signal,
    );

    if (!threatSignalSummary) {
      continue;
    }

    const threatStrength = Math.min(threatSignalSummary.count, 3);
    score += threatStrength * rule.weight;

    threatSignalSummary.sourceChampionKeys.forEach((championKey) =>
      goodAgainstChampionKeys.add(championKey),
    );

    reasonCodes.add(rule.reasonCode);
  }

  return {
    runeKey,
    score,
    goodAgainstChampionKeys: [...goodAgainstChampionKeys],
    reasonCodes: [...reasonCodes],
  };
}
