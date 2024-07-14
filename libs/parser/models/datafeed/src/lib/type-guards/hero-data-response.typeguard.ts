import {
  arrayOf,
  isNumber,
  isObject,
  isString,
  property,
} from '@whatchangedfor-2/type-guards';
import {
  HeroDataResponse,
  HeroDataItem,
} from '../hero-data-response.interface';

export function isHeroDataResponse(input: unknown): input is HeroDataResponse {
  return (
    isObject(input) &&
    property('result', isObject)(input) &&
    property('data', isObject)(input.result) &&
    property('heroes', arrayOf(isHeroDataItem))(input.result.data)
  );
}

function isHeroDataItem(input: unknown): input is HeroDataItem {
  return (
    isObject(input) &&
    property('id', isNumber)(input) &&
    property('name', isString)(input) &&
    property('name_loc', isString)(input) &&
    property('name_english_loc', isString)(input) &&
    property('primary_attr', isNumber)(input) &&
    property('complexity', isNumber)(input)
  );
}
