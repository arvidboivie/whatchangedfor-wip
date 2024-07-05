import { AbilityChangeset } from './ability';
import { FacetChangeset } from './facet';

export interface Change {
  patch: string;
  patchDate: Date;
  id: number;
  type: `ITEM` | `HERO`;
  general?: string[];
  abilities?: AbilityChangeset[];
  talents?: string[];
  facets?: FacetChangeset[];
}
