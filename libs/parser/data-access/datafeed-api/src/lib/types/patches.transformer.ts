import { PatchInfo } from '@whatchangedfor-2/datafeed';
import { PatchesResponse } from './patches.interface';

export function transformPatches(patches: PatchesResponse): PatchInfo[] {
  return patches.patches.map(
    (patch): PatchInfo => ({
      version: patch.patch_number,
      timestamp: patch.patch_timestamp,
    })
  );
}
