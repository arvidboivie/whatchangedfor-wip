import {
  arrayOf,
  isNumber,
  isObject,
  isString,
  optionalProperty,
  property,
} from '@whatchangedfor-2/type-guards';
import {
  AbilityResponse,
  ItemAbilityResponse,
} from './ability-response.interface';

export function isAbilityResponse(input: unknown): input is AbilityResponse {
  return (
    isObject(input) &&
    property('result', isObject)(input) &&
    property('data', isObject)(input.result) &&
    property('itemabilities', arrayOf(isItemAbilityResponse))(input.result.data)
  );
}

function isItemAbilityResponse(input: unknown): input is ItemAbilityResponse {
  return (
    property('id', isNumber)(input) &&
    property('name', isString)(input) &&
    property('name_loc', isString)(input) &&
    property('name_english_loc', isString)(input) &&
    optionalProperty('neutral_item_tier', isNumber)(input)
  );
}
