import {
  AbilityInfoMap,
  Change,
  HeroInfoMap,
} from '@whatchangedfor-2/changeset';
import { Datafeed } from '@whatchangedfor-2/parser/data-access/datafeed-api';
import {
  createAbilityTransformer,
  transformAbilityResponseToAbilityInfo,
  transformHeroDataResponseToHeroInfo,
  transformPatchResponseToChanges,
} from '@whatchangedfor-2/parser/utils/transformers';

export class DotaData {
  private readonly datafeed: Datafeed = new Datafeed();

  private async getPatchList(): Promise<string[]> {
    return (await this.datafeed.patches()).patches.map(
      (patch) => patch.patch_number
    );
  }

  private async getItemInfo(): Promise<AbilityInfoMap> {
    const itemInfo = await this.datafeed.items();

    return transformAbilityResponseToAbilityInfo(itemInfo);
  }

  private async getHeroInfo(): Promise<HeroInfoMap> {
    const heroInfo = await this.datafeed.heroes();

    return transformHeroDataResponseToHeroInfo(heroInfo);
  }

  private async getAbilityInfo(): Promise<AbilityInfoMap> {
    const abilityInfo = await this.datafeed.abilities();

    return transformAbilityResponseToAbilityInfo(abilityInfo);
  }

  private async getPatchChanges(version: string): Promise<Change[]> {
    const patchChanges = await this.datafeed.patch(version);

    const abilityInfo = await this.getAbilityInfo();

    const abilityTransformer = createAbilityTransformer(abilityInfo);

    return transformPatchResponseToChanges(patchChanges, abilityTransformer);
  }

  public async changes(): Promise<Map<string, Change[]>> {
    // Get all patches
    const patches = await this.getPatchList();

    // loop through patches
    const changesets = (
      await Promise.all(patches.map((version) => this.getPatchChanges(version)))
    ).flatMap((changeArray) => changeArray);

    const itemInfo = await this.getItemInfo();
    const heroInfo = await this.getHeroInfo();

    // Add names to entitites
    const changeMap = new Map<string, Change[]>();

    changesets.forEach((change) => {
      let name: string;

      switch (change.type) {
        case `HERO`:
          name = heroInfo.get(change.id)?.name ?? `Unknown Hero ${change.id}`;
          break;
        case `ITEM`:
          name = itemInfo.get(change.id)?.name ?? `Unknown Item ${change.id}`;
          break;
      }

      changeMap.set(name, [...(changeMap.get(name) ?? []), change]);
    });

    return changeMap;
  }
}
