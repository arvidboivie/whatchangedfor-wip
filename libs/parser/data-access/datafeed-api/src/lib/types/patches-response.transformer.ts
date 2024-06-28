import { PatchesResponse } from './patches-response.interface';

export function transformPatches(patches: PatchesResponse): string[] {
  return patches.patches.map((patch) => patch.patch_number);
}
