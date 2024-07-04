import { AbilityInfo, AbilityMap } from '@whatchangedfor-2/changeset';
import { AbilityResponse } from '../types/ability-response.interface';

export function transformAbilityResponseToAbilityInfo(
  input: AbilityResponse
): AbilityMap {
  return new Map(
    input.result.data.itemabilities.map((ability) => [
      ability.id,
      {
        id: ability.id,
        name: ability.name_english_loc,
        technicalName: ability.name,
      },
    ])
  );
}
