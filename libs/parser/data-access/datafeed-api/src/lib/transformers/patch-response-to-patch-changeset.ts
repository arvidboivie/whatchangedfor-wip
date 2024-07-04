import { PatchChangeset } from '@whatchangedfor-2/changeset';

import { transformNote } from './transform-notes';
import { PatchResponse } from '../types/patch-response.interface';
import { transformAbility } from './transform-abilities';

export function transformPatchResponseToPatchChangeset(
  patchResponse: PatchResponse
): PatchChangeset {
  const heroChanges =
    patchResponse.heroes?.map((hero) => ({
      name: `${hero.hero_id}`,
      talents: hero.talent_notes.map(transformNote),
      notes: hero.hero_notes.map(transformNote),
      abilities: hero.abilities?.map(transformAbility) ?? [],
      facets: hero.subsections?.map((subsection) => ({
        name: subsection.title,
        changes: subsection.general_notes.map(transformNote),
        abilityChanges: subsection.abilities?.map(transformAbility) ?? [],
      })),
    })) ?? [];

  const patch: PatchChangeset = {
    version: patchResponse.patch_number,
    timestamp: new Date(patchResponse.patch_timestamp * 1000),
    generalChanges: patchResponse.generic.map(transformNote),
    heroChanges,
    itemChanges: [
      ...(patchResponse.items?.map(transformAbility) ?? []),
      ...(patchResponse.neutral_items?.map(transformAbility) ?? []),
    ],
  };

  return patch;
}
