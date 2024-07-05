import { AbilityChangeset } from '@whatchangedfor-2/changeset';
import { AbilityChanges } from '../types/patch-response.interface';
import { transformNote } from './transform-notes';

export const transformAbility = (
  ability: AbilityChanges
): AbilityChangeset => ({
  id: ability.ability_id,
  changes: ability.ability_notes.map(transformNote),
});
