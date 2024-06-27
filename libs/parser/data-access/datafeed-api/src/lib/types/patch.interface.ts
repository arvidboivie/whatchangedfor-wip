export interface PatchResponse {
  patch_number: string;
  patch_name: string;
  patch_timestamp: number;
  items: ItemChanges[];
  neutral_items: NeutralItemChanges[];
  heroes: HeroChanges[];
  success: boolean;
}

export interface HeroChanges {
  hero_id: number;
  subsections?: Subsection[];
  talent_notes?: Note[];
  abilities?: NeutralItemChanges[];
  hero_notes?: Note[];
}

export interface NeutralItemChanges {
  ability_id: number;
  ability_notes: Note[];
}

export interface Note {
  indent_level: number;
  note: string;
}

export interface Subsection {
  title: string;
  style: Style;
  facet: string;
  facet_icon: string;
  facet_color: string;
  general_notes?: Note[];
  abilities?: NeutralItemChanges[];
}

export enum Style {
  HeroFacet = 'hero_facet',
}

export interface ItemChanges {
  ability_id: number;
  postfix_lines?: number;
  ability_notes: Note[];
}
