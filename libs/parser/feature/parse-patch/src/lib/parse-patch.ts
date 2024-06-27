import { Datafeed } from '@whatchangedfor-2/datafeed-api';

export async function parsePatch(version: string): Promise<string> {
  const patchnotes = await Datafeed.patch(version);

  // Go through hero changes

  // Go through item changes

  return JSON.stringify(patchnotes);
}
