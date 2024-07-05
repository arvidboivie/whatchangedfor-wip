import { Change } from '@whatchangedfor-2/changeset';
import { Datafeed } from '@whatchangedfor-2/parser/data-access/datafeed-api';

export class DotaData {
  public async changes(): Promise<Map<string, Change[]>> {
    // Get all patches
    const patches = await Datafeed.patches();

    // loop through patches
    const changesets = (
      await Promise.all(patches.map((version) => Datafeed.patch(version)))
    ).flatMap((changeArray) => changeArray);

    const itemInfo = await Datafeed.items();
    const heroInfo = await Datafeed.heroes();

    // Add names to entitites
    const changeMap = new Map<string, Change[]>();

    changesets.forEach((change) => {
      let name: string;

      if (change.type === `HERO`) {
        name = heroInfo.get(change.id)?.name ?? `Unknown Hero ${change.id}`;
      }

      if (change.type === `ITEM`) {
        name = itemInfo.get(change.id)?.name ?? `Unknown Item ${change.id}`;
      }

      changeMap.set(name, [...(changeMap.get(name) ?? []), change]);
    });

    return changeMap;
  }
}
