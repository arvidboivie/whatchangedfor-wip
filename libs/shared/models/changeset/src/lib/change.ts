import { AbilityChangeset } from './ability';
import { EntityType } from './entity-type';
import { FacetChangeset } from './facet';

export interface Change {
  patch: string;
  patchDate: Date;
  id: number;
  type: EntityType;
  general?: string[];
  abilities?: AbilityChangeset[];
  talents?: string[];
  facets?: FacetChangeset[];
}
