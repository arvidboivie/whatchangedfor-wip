import {
  hasArrayProperty,
  hasNumberProperty,
  hasStringProperty,
  isObject,
  optional,
} from '@whatchangedfor-2/type-guards';
import {
  AbilityChanges,
  HeroChanges,
  PatchResponse,
  Subsection,
} from './patch-response.interface';

export function isPatchResponse(input: unknown): input is PatchResponse {
  return (
    isObject(input) &&
    hasStringProperty(input, 'patch_number') &&
    hasNumberProperty(input, 'patch_timestamp') &&
    (!hasArrayProperty(input, 'generic') || input.generic.every(isNotes)) &&
    (!hasArrayProperty(input, 'items') ||
      input.items.every(isAbilityChanges)) &&
    (!hasArrayProperty(input, 'neutral_items') ||
      input.neutral_items.every(isAbilityChanges)) &&
    (!hasArrayProperty(input, 'heroes') || input.heroes.every(isHeroChanges))
  );
}

function isHeroChanges(input: unknown): input is HeroChanges {
  return (
    isObject(input) &&
    hasNumberProperty(input, 'hero_id') &&
    (!hasArrayProperty(input, 'subsections') ||
      input.subsections.every(isSubsection)) &&
    (!hasArrayProperty(input, 'talent_notes') ||
      input.talent_notes.every(isNotes)) &&
    (!hasArrayProperty(input, 'abilities') ||
      input.abilities.every(isAbilityChanges)) &&
    (!hasArrayProperty(input, 'hero_notes') || input.hero_notes.every(isNotes))
  );
}

function isSubsection(input: unknown): input is Subsection {
  return (
    isObject(input) &&
    hasStringProperty(input, 'title') &&
    hasStringProperty(input, 'style') &&
    (!hasArrayProperty(input, 'abilities') ||
      input.abilities.every(isAbilityChanges)) &&
    (!hasArrayProperty(input, 'general_notes') ||
      input.general_notes.every(isNotes))
  );
}

function isAbilityChanges(input: unknown): input is AbilityChanges {
  return (
    isObject(input) &&
    hasNumberProperty(input, 'ability_id') &&
    hasArrayProperty(input, 'ability_notes') &&
    input.ability_notes.every(isNotes)
  );
}

function isNotes(input: unknown): boolean {
  return isObject(input) && hasStringProperty(input, 'note');
}
