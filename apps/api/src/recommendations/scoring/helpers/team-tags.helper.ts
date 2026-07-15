import type { DraftChampionContext } from '../../../common/types/draft-recommendation-champion.type.js';

function collectChampionAttributeTags(
  championContext: DraftChampionContext,
): Set<string> {
  return new Set([
    ...championContext.champion.classTags,
    ...championContext.champion.playstyleTags,
    ...championContext.champion.utilityTags,
    ...championContext.champion.riskTags,
    ...championContext.champion.strengths,
    ...championContext.champion.weaknesses,

    ...(championContext.selectedBuildProfile?.buildTags ?? []),
    ...(championContext.selectedBuildProfile?.playStyleTags ?? []),

    ...(championContext.selectedSynergyProfile?.providesTags ?? []),
  ]);
}

export function collectTeamAttributeTags(
  championContexts: DraftChampionContext[],
): Set<string> {
  const teamTags = new Set<string>();

  for (const championContext of championContexts) {
    for (const tag of collectChampionAttributeTags(championContext)) {
      teamTags.add(tag);
    }
  }

  return teamTags;
}
