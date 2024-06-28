import { PatchListItem } from '@whatchangedfor-2/datafeed';
import { isPatchesResponse } from './types/patches-response.typeguard';
import { transformPatches } from './types/patches-response.transformer';
import { isPatchResponse } from './types/patch-response.typeguard';

export class Datafeed {
  private static readonly BASE_URL = `https://www.dota2.com/datafeed`;

  public static async patches(): Promise<string[]> {
    const patches = await this.getData(
      'patchnoteslist?language=english',
      isPatchesResponse
    );

    return transformPatches(patches);
  }

  public static async heroes(): Promise<any> {
    return this.getData(
      'herolist?language=english',
      (input: unknown): input is any => true
    );
  }

  public static async items(): Promise<any> {
    return this.getData(
      'itemlist?language=english',
      (input: unknown): input is any => true
    );
  }

  public static async abilities(): Promise<any> {
    return this.getData(
      'abilitylist?language=english',
      (input: unknown): input is any => true
    );
  }

  public static async patch(version: string): Promise<any> {
    return this.getData(
      `patchnotes?version=${version}&language=english`,
      isPatchResponse
    );
  }

  private static async getData<T>(
    resource: string,
    guard: (input: unknown) => input is T
  ): Promise<T> {
    const results = await this.makeFetchHappen(resource);

    if (!guard(results)) {
      console.log(JSON.stringify(results));
      throw new Error(`Invalid response from ${resource}`);
    }

    return results;
  }

  private static async makeFetchHappen(resource: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/${resource}`);
    return await response.json();
  }
}
