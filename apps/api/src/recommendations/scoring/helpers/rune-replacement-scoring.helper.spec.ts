import { scoreRuneReplacementGroup } from './rune-replacement-scoring.helper';

describe(`scoreRuneReplacementGroup`, () => {
  it(`scores bone plating against burst and dive threats`, () => {
    const result = scoreRuneReplacementGroup({
      baselineRuneKey: `second-wind`,
      alternativeRuneKeys: [`bone-plating`],
      threatSignalSummaries: [
        {
          signal: `BURST`,
          count: 2,
          sourceChampionKeys: [`zed`, `akali`],
        },
        {
          signal: `DIVE`,
          count: 1,
          sourceChampionKeys: [`vi`],
        },
      ],
    });

    expect(result).toEqual({
      baseline: {
        runeKey: `second-wind`,
        score: 0,
        goodAgainstChampionKeys: [],
        reasonCodes: [],
      },
      alternatives: [
        {
          runeKey: `bone-plating`,
          score: 6,
          goodAgainstChampionKeys: [`zed`, `akali`, `vi`],
          reasonCodes: [`ENEMY_BURST`, `ENEMY_DIVE`],
        },
      ],
    });
  });

  it(`scores cut down against tank threats`, () => {
    const result = scoreRuneReplacementGroup({
      baselineRuneKey: `cut-down`,
      alternativeRuneKeys: [`coup-de-grace`],
      threatSignalSummaries: [
        {
          signal: `TANK`,
          count: 3,
          sourceChampionKeys: [`sion`, `ornn`, `rammus`],
        },
      ],
    });

    expect(result.baseline.score).toBe(6);
    expect(result.baseline.reasonCodes).toEqual([`ENEMY_TANK`]);

    expect(result.alternatives[0].score).toBe(0);
  });

  it(`scores legend tenacity against crowd control`, () => {
    const result = scoreRuneReplacementGroup({
      baselineRuneKey: `legend-alacrity`,
      alternativeRuneKeys: [`legend-tenacity`],
      threatSignalSummaries: [
        {
          signal: `CROWD_CONTROL`,
          count: 3,
          sourceChampionKeys: [`nautilus`, `leona`, `lissandra`],
        },
      ],
    });

    expect(result.baseline.score).toBe(0);

    expect(result.alternatives[0]).toEqual({
      runeKey: `legend-tenacity`,
      score: 6,
      goodAgainstChampionKeys: [`nautilus`, `leona`, `lissandra`],
      reasonCodes: [`ENEMY_CROWD_CONTROL`],
    });
  });
});
