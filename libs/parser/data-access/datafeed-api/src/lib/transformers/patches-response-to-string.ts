import { PatchesResponse } from '../types/patches-response.interface';

export function transformPatchesResponseToString(
  patches: PatchesResponse
): string[] {
  return patches.patches.map((patch) => patch.patch_number);
}
