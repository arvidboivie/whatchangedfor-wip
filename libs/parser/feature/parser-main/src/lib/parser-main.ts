import { Datafeed } from '@whatchangedfor-2/datafeed-api';
import { parsePatch } from '@whatchangedfor-2/parse-patch';

export async function parserMain(): Promise<string> {
  // Get all patches
  const patches = await Datafeed.patches();

  // -- skip this, lets do everything every time -- Get latest version patched
  console.log(patches);

  // loop through patches
  const changeset = patches.map(({ version }) => parsePatch(version));

  await Promise.all(changeset);

  console.log(changeset);

  return 'parser-main';
}
