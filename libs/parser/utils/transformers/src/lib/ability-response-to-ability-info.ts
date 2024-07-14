import { AbilityInfoMap } from '@whatchangedfor-2/shared-models-changeset';
import { AbilityDataResponse } from '@whatchangedfor-2/parser/models/datafeed';

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
