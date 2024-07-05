import { Datafeed } from '@whatchangedfor-2/datafeed-api';
import { parsePatch } from '@whatchangedfor-2/parse-patch';
import {
  Change,
  getChangesPerItem,
} from '@whatchangedfor-2/parser/feature/hero-history';

export async function parserMain(): Promise<string> {
  // Get all patches
  const patches = await Datafeed.patches();

  // loop through patches
  const changeset = await Promise.all(
    patches.map((version) => parsePatch(version))
  );

  const changes = getChangesPerItem(changeset);

  const itemInfo = await Datafeed.items();
  const heroInfo = await Datafeed.heroes();

  const changeMap = new Map<string, Change[]>();

  changes.forEach((change) => {
    let name: string;

    if (change.type === `HERO`) {
      name = heroInfo.get(change.id)?.name ?? `Unknown Hero ${change.id}`;
    }

    if (change.type === `ITEM`) {
      name = itemInfo.get(change.id)?.name ?? `Unknown Item ${change.id}`;
    }

    changeMap.set(name, [...(changeMap.get(name) ?? []), change]);
  });

  console.log(changeMap.keys());

  return 'parser-main';
}
