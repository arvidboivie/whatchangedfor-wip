import { AbilityChangeset, AbilityInfoMap } from '@whatchangedfor-2/changeset';

import { transformNote } from './transform-notes';
import { AbilityChanges } from '@whatchangedfor-2/parser/models/datafeed';

export type AbilityTransformer = (ability: AbilityChanges) => AbilityChangeset;

export const createAbilityTransformer =
  (abilityInfo: AbilityInfoMap): AbilityTransformer =>
  (ability: AbilityChanges) => ({
    id: ability.ability_id,
    name:
      abilityInfo.get(ability.ability_id)?.name ??
      `Unknown Ability ${ability.ability_id}`,
    changes: ability.ability_notes.map(transformNote),
  });
