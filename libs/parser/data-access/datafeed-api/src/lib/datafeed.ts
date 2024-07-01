import { isPatchesResponse } from './types/patches-response.typeguard';
import { transformPatchesResponseToString } from './transformers/patches-response-to-string';
import { isPatchResponse } from './types/patch-response.typeguard';
import { PatchResponse } from './types/patch-response.interface';
import { transformPatchResponseToPatchChangeset } from './transformers/patch-response-to-patch-changeset';
import { PatchChangeset } from '@whatchangedfor-2/changeset';

export class Datafeed {
  private static readonly BASE_URL = `https://www.dota2.com/datafeed`;

  public static async patches(): Promise<string[]> {
    const patches = await this.getData(
      'patchnoteslist?language=english',
      isPatchesResponse
    );

    return transformPatchesResponseToString(patches);
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

  public static async patch(version: string): Promise<PatchChangeset> {
    const patchResponse = await this.getData(
      `patchnotes?version=${version}&language=english`,
      isPatchResponse
    );

    return transformPatchResponseToPatchChangeset(patchResponse);
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
