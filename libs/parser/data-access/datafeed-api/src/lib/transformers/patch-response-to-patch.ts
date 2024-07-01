import { Patch } from '@whatchangedfor-2/changeset';

import { transformNotes } from './transform-notes';
import { PatchResponse } from '../types/patch-response.interface';

export function transformPatchResponseToPatch(
  patchResponse: PatchResponse
): Patch {
  const generalChanges = patchResponse.generic?.map((note) => note.note) ?? [];
  const heroChanges = patchResponse.heroes?.map((hero) => ({
    name: `${hero.hero_id}`,
    talents: transformNotes(hero.talent_notes),
    notes: transformNotes(hero.hero_notes),
    abilities:
      hero.abilities?.map((ability) => ({
        name: `${ability.ability_id}`,
        changes: transformNotes(ability.ability_notes),
      })) ?? [],
    facets:
      hero.subsections?.map((subsection) => ({
        name: subsection.title,
        changes: transformNotes(subsection.general_notes),
        abilityChanges: subsection.abilities?.map((ability) => ({
          name: `${ability.ability_id}`,
          changes: transformNotes(ability.ability_notes),
        })),
      })) ?? [],
  }));
  const itemChanges =
    [
      ...patchResponse.items?.map((item) => ({
        name: `${item.ability_id}`,
        changes: transformNotes(item.ability_notes),
      })),
      ...patchResponse.neutral_items?.map((item) => ({
        name: `${item.ability_id}`,
        changes: transformNotes(item.ability_notes),
      })),
    ] ?? [];

  const patch: Patch = {
    version: patchResponse.patch_number,
    timestamp: new Date(patchResponse.patch_timestamp * 1000),
    generalChanges,
    heroChanges,
    itemChanges,
  };

  return patch;
}
