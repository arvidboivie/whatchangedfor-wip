import {
  PatchesResponse,
  HeroDataResponse,
  AbilityDataResponse,
  PatchResponse,
  isAbilityDataResponse,
  isHeroDataResponse,
  isPatchesResponse,
  isPatchResponse,
} from '@whatchangedfor-2/parser/models/datafeed';
import { Typeguard } from '@whatchangedfor-2/type-guards';

export class Datafeed {
  private readonly BASE_URL = `https://www.dota2.com/datafeed`;

  private cacheMap: Map<string, any> = new Map();

  // static {
  //   this.heroes();
  //   this.items();
  //   this.abilities();
  // }

  public async patches(): Promise<PatchesResponse> {
    return this.getCachedData(
      'patchnoteslist?language=english',
      isPatchesResponse
    );
  }

  public async heroes(): Promise<HeroDataResponse> {
    return this.getCachedData('herolist?language=english', isHeroDataResponse);
  }

  public async items(): Promise<AbilityDataResponse> {
    return this.getCachedData(
      'itemlist?language=english',
      isAbilityDataResponse
    );
  }

  public async abilities(): Promise<AbilityDataResponse> {
    return this.getCachedData(
      'abilitylist?language=english',
      isAbilityDataResponse
    );
  }

  public async patch(version: string): Promise<PatchResponse> {
    return this.getCachedData(
      `patchnotes?version=${version}&language=english`,
      isPatchResponse
    );
  }

  private async getCachedData<T>(
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

  private async makeFetchHappen(resource: string): Promise<any> {
    console.log(`Fetching ${resource}`);

    const response = await fetch(`${this.BASE_URL}/${resource}`);

    return await response.json();
  }
}
