import {
  AbilityChanges,
  HeroChanges,
  Note,
  PatchResponse,
  Subsection,
} from './patch-response.interface';
import {
  arrayOf,
  isNumber,
  isObject,
  isString,
  optional,
  optionalProperty,
  property,
} from '@whatchangedfor-2/type-guards';

export function isPatchResponse(input: unknown): input is PatchResponse {
  return (
    isObject(input) &&
    property('patch_number', isString)(input) &&
    property('patch_timestamp', isNumber)(input) &&
    optionalProperty('generic', arrayOf(isNote))(input) &&
    optionalProperty('items', arrayOf(isAbilityChanges))(input) &&
    optionalProperty('neutral_items', arrayOf(isAbilityChanges))(input) &&
    optionalProperty('heroes', arrayOf(isHeroChanges))(input)
  );
}

function isHeroChanges(input: unknown): input is HeroChanges {
  if (
    isObject(input) &&
    property('hero_id', isNumber)(input) &&
    property('subsections', arrayOf(isSubsection))(input) &&
    optionalProperty('hero_notes', arrayOf(isNote))(input) &&
    optionalProperty('talent_notes', arrayOf(isNote))(input) &&
    optionalProperty('abilities', arrayOf(isAbilityChanges))(input)
  ) {
    input;

    return true;
  }
}

function isSubsection(input: unknown): input is Subsection {
  return (
    isObject(input) &&
    property('title', isString)(input) &&
    property('style', isString)(input) &&
    optionalProperty('abilities', arrayOf(isAbilityChanges))(input) &&
    optionalProperty('general_notes', arrayOf(isNote))(input)
  );
}

function isAbilityChanges(input: unknown): input is AbilityChanges {
  return (
    isObject(input) &&
    property('ability_id', isNumber)(input) &&
    property('ability_notes', arrayOf(isNote))(input)
  );
}

function isNote(input: unknown): input is Note {
  return isObject(input) && property('note', isString)(input);
}
