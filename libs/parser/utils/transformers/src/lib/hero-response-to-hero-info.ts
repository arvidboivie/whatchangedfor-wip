import {
  HeroInfoMap,
  HeroInfo,
  Attribute,
} from '@whatchangedfor-2/shared-models-changeset';
import { HeroDataResponse } from '@whatchangedfor-2/parser/models/datafeed';

const attributeMap: Map<number, Attribute> = new Map([
  [0, 'STRENGTH'],
  [1, 'AGILITY'],
  [2, 'INTELLIGENCE'],
  [3, 'UNIVERSAL'],
]);

const transformAttribute = (attributeNumber: number): Attribute => {
  const attribute = attributeMap.get(attributeNumber);

  if (!attribute) {
    throw new Error(`Unknown attribute: ${attributeNumber}`);
  }

  return attribute;
};

export function transformHeroDataResponseToHeroInfo(
  input: HeroDataResponse
): HeroInfoMap {
  return new Map(
    input.result.data.heroes.map((ability): [number, HeroInfo] => [
      ability.id,
      {
        id: ability.id,
        name: ability.name_english_loc,
        technicalName: ability.name,
        primaryAttribute: transformAttribute(ability.primary_attr),
        complexity: ability.complexity,
      },
    ])
  );
}
