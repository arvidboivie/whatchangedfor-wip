import { Change } from '@whatchangedfor-2/shared-models-changeset';

import { transformNote } from './transform-notes';

import { AbilityTransformer } from './transform-abilities';
import { PatchResponse } from '@whatchangedfor-2/parser/models/datafeed';

export function transformPatchResponseToChanges(
  patchResponse: PatchResponse,
  abilityTransformer: AbilityTransformer
): Change[] {
  const heroChanges: Change[] =
    patchResponse.heroes?.map((hero) => ({
      patch: patchResponse.patch_number,
      patchDate: new Date(patchResponse.patch_timestamp * 1000),
      id: hero.hero_id,
      type: `HERO` as const,
      talents: hero.talent_notes?.map(transformNote) ?? [],
      general: hero.hero_notes?.map(transformNote) ?? [],
      abilities: hero.abilities?.map(abilityTransformer) ?? [],
      facets: hero.subsections?.map((subsection) => ({
        name: subsection.title,
        changes: subsection.general_notes?.map(transformNote) ?? [],
        abilityChanges: subsection.abilities?.map(abilityTransformer) ?? [],
      })),
    })) ?? [];

  const itemChanges: Change[] = [
    ...(patchResponse.items ?? []),
    ...(patchResponse.neutral_items ?? []),
  ].map(
    (item): Change => ({
      patch: patchResponse.patch_number,
      patchDate: new Date(patchResponse.patch_timestamp * 1000),
      id: item.ability_id,
      type: `ITEM` as const,
      general: item.ability_notes?.map(transformNote) ?? [],
    })
  );

  return [...heroChanges, ...itemChanges];
}
