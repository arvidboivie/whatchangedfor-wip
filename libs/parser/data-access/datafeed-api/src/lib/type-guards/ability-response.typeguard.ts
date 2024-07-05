import {
  arrayOf,
  isNumber,
  isObject,
  isString,
  optionalProperty,
  property,
} from '@whatchangedfor-2/type-guards';
import {
  AbilityDataItem,
  AbilityDataResponse,
} from '../types/ability-data-response.interface';

export function isAbilityDataResponse(
  input: unknown
): input is AbilityDataResponse {
  return (
    isObject(input) &&
    property('result', isObject)(input) &&
    property('data', isObject)(input.result) &&
    property('itemabilities', arrayOf(isAbilityDataItem))(input.result.data)
  );
}

function isAbilityDataItem(input: unknown): input is AbilityDataItem {
  return (
    property('id', isNumber)(input) &&
    property('name', isString)(input) &&
    property('name_loc', isString)(input) &&
    property('name_english_loc', isString)(input) &&
    optionalProperty('neutral_item_tier', isNumber)(input)
  );
}
