import { AbilityInfo, AbilityInfoMap } from '@whatchangedfor-2/changeset';
import { AbilityDataResponse } from '../types/ability-data-response.interface';

export function transformAbilityResponseToAbilityInfo(
  input: AbilityDataResponse
): AbilityInfoMap {
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
