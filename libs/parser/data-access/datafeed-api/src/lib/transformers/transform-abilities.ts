import { AbilityChangeset } from '@whatchangedfor-2/changeset';
import { AbilityChanges } from '../types/patch-response.interface';
import { transformNotes } from './transform-notes';

export function transformAbilities(
  abilities: AbilityChanges[] = []
): AbilityChangeset[] {
  return abilities.map((ability) => ({
    name: `${ability.ability_id}`,
    changes: transformNotes(ability.ability_notes),
  }));
}
