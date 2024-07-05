import { AbilityChangeset, FacetChangeset } from '@whatchangedfor-2/changeset';

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
