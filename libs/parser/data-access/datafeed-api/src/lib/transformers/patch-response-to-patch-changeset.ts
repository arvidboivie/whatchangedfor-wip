import { Change } from '@whatchangedfor-2/changeset';

import { transformNote } from './transform-notes';
import { PatchResponse } from '../types/patch-response.interface';
import { transformAbility } from './transform-abilities';

export function transformPatchResponseToPatchChangeset(
  patchResponse: PatchResponse
): Change[] {
  const heroChanges: Change[] =
    patchResponse.heroes?.map((hero) => ({
      patch: patchResponse.patch_number,
      patchDate: new Date(patchResponse.patch_timestamp * 1000),
      id: hero.hero_id,
      type: `HERO` as const,
      talents: hero.talent_notes?.map(transformNote) ?? [],
      general: hero.hero_notes?.map(transformNote) ?? [],
      abilities: hero.abilities?.map(transformAbility) ?? [],
      facets: hero.subsections?.map((subsection) => ({
        name: subsection.title,
        changes: subsection.general_notes?.map(transformNote) ?? [],
        abilityChanges: subsection.abilities?.map(transformAbility) ?? [],
      })),
    })) ?? [];

  const itemChanges: Change[] = [
    ...(patchResponse.items ?? []),
    ...(patchResponse.neutral_items ?? []),
  ].map((item) => ({
    patch: patchResponse.patch_number,
    patchDate: new Date(patchResponse.patch_timestamp * 1000),
    id: item.ability_id,
    type: `ITEM` as const,
    notes: item.ability_notes?.map(transformNote) ?? [],
  }));

  return [...heroChanges, ...itemChanges];
}
