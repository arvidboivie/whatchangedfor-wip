import { DataResponse } from './data-container-response.interface';

export type AbilityDataResponse = DataResponse<
  AbilityDataItem,
  'itemabilities'
>;

export interface AbilityDataItem {
  id: number;
  name: string;
  name_loc: string;
  name_english_loc: string;
  neutral_item_tier?: number;
}
