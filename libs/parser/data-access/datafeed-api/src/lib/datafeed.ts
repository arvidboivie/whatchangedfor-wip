import { isPatchesResponse } from './types/patches-response.typeguard';
import { transformPatchesResponseToString } from './transformers/patches-response-to-string';
import { isPatchResponse } from './types/patch-response.typeguard';
import { transformPatchResponseToPatchChangeset } from './transformers/patch-response-to-patch-changeset';
import {
  AbilityInfoMap,
  HeroInfoMap,
  PatchChangeset,
} from '@whatchangedfor-2/changeset';
import { Typeguard } from 'libs/shared/utils/type-guards/src/lib/type-guard';
import { isAbilityDataResponse } from './types/ability-response.typeguard';
import { AbilityDataResponse } from './types/ability-data-response.interface';
import { transformAbilityResponseToAbilityInfo } from './transformers/ability-response-to-ability-info';
import { isHeroDataResponse } from './types/hero-data-response.typeguard';
import { transformHeroDataResponseToHeroInfo } from './transformers/hero-response-to-hero-info';

export class Datafeed {
  private static readonly BASE_URL = `https://www.dota2.com/datafeed`;

  private static cacheMap: Map<string, any> = new Map();

  static {
    this.heroes();
    this.items();
    this.abilities();
  }

  public static async patches(): Promise<string[]> {
    const patches = await this.getCachedData(
      'patchnoteslist?language=english',
      isPatchesResponse
    );

    return transformPatchesResponseToString(patches);
  }

  public static async heroes(): Promise<HeroInfoMap> {
    const heroes = await this.getCachedData(
      'herolist?language=english',
      isHeroDataResponse
    );

    return transformHeroDataResponseToHeroInfo(heroes);
  }

  public static async items(): Promise<AbilityInfoMap> {
    const itemResponse = await this.getCachedData(
      'itemlist?language=english',
      isAbilityDataResponse
    );

    return transformAbilityResponseToAbilityInfo(itemResponse);
  }

  public static async abilities(): Promise<AbilityInfoMap> {
    const abilityResponse = await this.getCachedData(
      'abilitylist?language=english',
      isAbilityDataResponse
    );

    return transformAbilityResponseToAbilityInfo(abilityResponse);
  }

  public static async patch(version: string): Promise<PatchChangeset> {
    const patchResponse = await this.getCachedData(
      `patchnotes?version=${version}&language=english`,
      isPatchResponse
    );

    return transformPatchResponseToPatchChangeset(patchResponse);
  }

  private static async getCachedData<T>(
    resource: string,
    guard: Typeguard<T>
  ): Promise<T> {
    let promise;

    if (this.cacheMap.has(resource)) {
      promise = this.cacheMap.get(resource);
    } else {
      promise = this.makeFetchHappen(resource);
      this.cacheMap.set(resource, promise);
    }

    if (!guard(await promise)) {
      throw new Error(`Invalid response from ${resource}`);
    }

    return promise;
  }

  private static async makeFetchHappen(resource: string): Promise<any> {
    console.log(`Fetching ${resource}`);

    const response = await fetch(`${this.BASE_URL}/${resource}`);

    return await response.json();
  }
}
