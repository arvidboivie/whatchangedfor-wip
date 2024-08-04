import { AbilityChangeset } from './ability';

export interface FacetChangeset {
  name: string;
  icon: string;
  color: string;
  changes: string[];
  abilityChanges: AbilityChangeset[];
}
