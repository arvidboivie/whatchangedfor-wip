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
  property,
} from '@whatchangedfor-2/type-guards';

export function isPatchResponse(input: unknown): input is PatchResponse {
  return (
    isObject(input) &&
    property(isString)(input, 'patch_number') &&
    property(isNumber)(input, 'patch_timestamp') &&
    optional(property(arrayOf(isNote)))(input, 'generic') &&
    optional(property(arrayOf(isAbilityChanges)))(input, 'items') &&
    optional(property(arrayOf(isAbilityChanges)))(input, 'neutral_items') &&
    optional(property(arrayOf(isHeroChanges)))(input, 'heroes')
  );
}

function isHeroChanges(input: unknown): input is HeroChanges {
  return (
    isObject(input) &&
    property(isNumber)(input, 'hero_id') &&
    optional(property(arrayOf(isSubsection)))(input, 'subsections') &&
    optional(property(arrayOf(isNote)))(input, 'hero_notes') &&
    optional(property(arrayOf(isNote)))(input, 'talent_notes') &&
    optional(property(arrayOf(isAbilityChanges)))(input, 'abilities')
  );
}

function isSubsection(input: unknown): input is Subsection {
  return (
    isObject(input) &&
    property(isString)(input, 'title') &&
    property(isString)(input, 'style') &&
    optional(property(arrayOf(isAbilityChanges)))(input, 'abilities') &&
    optional(property(arrayOf(isNote)))(input, 'general_notes')
  );
}

function isAbilityChanges(input: unknown): input is AbilityChanges {
  return (
    isObject(input) &&
    property(isNumber)(input, 'ability_id') &&
    property(arrayOf(isNote))(input, 'ability_notes')
  );
}

function isNote(input: unknown): input is Note {
  return isObject(input) && property(isString)(input, 'note');
}
