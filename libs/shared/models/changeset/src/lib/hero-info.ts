import { Attribute } from './attribute';

export interface HeroInfo {
  id: number;
  name: string;
  technicalName: string;
  primaryAttribute: Attribute;
  complexity: number;
}

export type HeroInfoMap = Map<number, HeroInfo>;
