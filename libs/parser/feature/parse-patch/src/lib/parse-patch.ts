import { PatchChangeset } from '@whatchangedfor-2/changeset';
import { Datafeed } from '@whatchangedfor-2/datafeed-api';

export async function parsePatch(version: string): Promise<PatchChangeset> {
  const patchnotes = await Datafeed.patch(version);

  return patchnotes;
}
