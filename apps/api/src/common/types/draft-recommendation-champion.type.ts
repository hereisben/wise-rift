import { GameRole, Prisma } from '../../generated/prisma/client.js';

export type NormalizedDraftChampionPick = {
  championKey: string;
  role: GameRole;
};

export type ChampionWithActivePatchProfiles = Prisma.ChampionGetPayload<{
  include: {
    championBuildProfiles: true;
    championMatchupProfiles: true;
    championSynergyProfiles: true;
  };
}>;

export type ChampionBuildProfileForDraft =
  ChampionWithActivePatchProfiles['championBuildProfiles'][number];

export type ChampionMatchupProfileForDraft =
  ChampionWithActivePatchProfiles['championMatchupProfiles'][number];

export type ChampionSynergyProfileForDraft =
  ChampionWithActivePatchProfiles['championSynergyProfiles'][number];

export type DraftChampionContext = {
  pick: NormalizedDraftChampionPick;
  champion: ChampionWithActivePatchProfiles;
  selectedBuildProfile: ChampionBuildProfileForDraft | null;
  selectedMatchupProfile: ChampionMatchupProfileForDraft | null;
  selectedSynergyProfile: ChampionSynergyProfileForDraft | null;
};
