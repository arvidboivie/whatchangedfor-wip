import { PatchChangeset } from '@whatchangedfor-2/changeset';

import { transformNotes } from './transform-notes';
import { PatchResponse } from '../types/patch-response.interface';
import { transformAbilities } from './transform-abilities';

export function transformPatchResponseToPatchChangeset(
  patchResponse: PatchResponse
): PatchChangeset {
  const heroChanges =
    patchResponse.heroes?.map((hero) => ({
      name: `${hero.hero_id}`,
      talents: transformNotes(hero.talent_notes),
      notes: transformNotes(hero.hero_notes),
      abilities: transformAbilities(hero.abilities),
      facets: hero.subsections?.map((subsection) => ({
        name: subsection.title,
        changes: transformNotes(subsection.general_notes),
        abilityChanges: transformAbilities(subsection.abilities),
      })),
    })) ?? [];

  const patch: PatchChangeset = {
    version: patchResponse.patch_number,
    timestamp: new Date(patchResponse.patch_timestamp * 1000),
    generalChanges: transformNotes(patchResponse.generic),
    heroChanges,
    itemChanges: [
      ...transformAbilities(patchResponse.items),
      ...transformAbilities(patchResponse.neutral_items),
    ],
  };

  return patch;
}
