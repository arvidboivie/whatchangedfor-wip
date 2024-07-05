import { AbilityChangeset } from './ability';

export interface FacetChangeset {
  name: string;
  changes: string[];
  abilityChanges: AbilityChangeset[];
}
