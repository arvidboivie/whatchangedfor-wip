import { Datafeed } from '@whatchangedfor-2/datafeed-api';
import { parsePatch } from '@whatchangedfor-2/parse-patch';

export async function parserMain(): Promise<string> {
  // Get all patches
  const patches = await Datafeed.patches();

  // loop through patches
  const changeset = await Promise.all(
    patches.map((version) => parsePatch(version))
  );

  return 'parser-main';
}
