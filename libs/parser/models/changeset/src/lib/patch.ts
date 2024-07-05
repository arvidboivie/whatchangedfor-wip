export interface PatchChangeset {
  version: string;
  timestamp: Date;
  generalChanges: string[];
  changes: (ItemChangeset | HeroChangeset)[];
}

export interface ItemChangeset {
  type: `ITEM`;
  id: number;
  notes: string[];
}

export interface HeroChangeset {
  type: `HERO`;
  id: number;
  talents: string[];
  notes: string[];
  abilities: AbilityChangeset[];
  facets: FacetChangeset[];
}

export interface FacetChangeset {
  name: string;
  changes: string[];
  abilityChanges: AbilityChangeset[];
}

export interface AbilityChangeset {
  id: number;
  changes: string[];
}
