export interface AbilityResponse {
  result: {
    data: {
      itemabilities: ItemAbilityResponse[];
    };
  };
}

export interface ItemAbilityResponse {
  id: number;
  name: string;
  name_loc: string;
  name_english_loc: string;
  neutral_item_tier?: number;
}
