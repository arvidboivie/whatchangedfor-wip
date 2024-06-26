import { PatchInfo } from '@whatchangedfor-2/datafeed';
import { Patches } from './patches.interface';

export function transformPatches(patches: Patches): PatchInfo[] {
  return patches.patches.map(
    (patch): PatchInfo => ({
      version: patch.patch_number,
      timestamp: patch.patch_timestamp,
    })
  );
}
