export interface PatchResponse {
  patch_number: string;
  patch_timestamp: number;
  generic?: Note[];
  items?: AbilityChanges[];
  neutral_items?: AbilityChanges[];
  heroes?: HeroChanges[];
  // success: boolean;
}

export interface HeroChanges {
  hero_id: number;
  subsections?: Subsection[];
  talent_notes?: Note[];
  abilities?: AbilityChanges[];
  hero_notes?: Note[];
}

export interface AbilityChanges {
  ability_id: number;
  ability_notes: Note[];
}

export interface Note {
  // indent_level: number;
  note: string;
}

export interface Subsection {
  title: string;
  style: Style;
  // facet: string;
  facet_icon: string;
  facet_color: string;
  general_notes?: Note[];
  abilities?: AbilityChanges[];
}

export type Style = 'hero_facet';
