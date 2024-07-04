import { DataResponse } from './data-container-response.interface';

export type HeroDataResponse = DataResponse<HeroDataItem, 'heroes'>;

export interface HeroDataItem {
  id: number;
  name: string;
  name_loc: string;
  name_english_loc: string;
  primary_attr: number;
  complexity: number;
}
