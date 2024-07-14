import { PatchesResponse } from '@whatchangedfor-2/parser/models/datafeed';

export function transformPatchesResponseToString(
  patches: PatchesResponse
): string[] {
  return patches.patches.map((patch) => patch.patch_number);
}
