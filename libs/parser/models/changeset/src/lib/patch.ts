export interface Patch {
  version: string;
  timestamp: Date;
  generalChanges: string[];
  heroChanges: HeroChangeset[];
  itemChanges: ItemChangeset[];
}

export interface HeroChangeset {
  name: string;
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
  name: string;
  changes: string[];
}

export interface ItemChangeset {
  name: string;
  changes: string[];
}