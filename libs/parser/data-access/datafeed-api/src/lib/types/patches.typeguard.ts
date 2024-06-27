import { PatchesResponse } from './patches.interface';

export function isPatches(input: unknown): input is PatchesResponse {
  if (typeof input === 'object' && input !== null) {
    if ('patches' in input && Array.isArray(input.patches)) {
      if (
        input.patches.every((patch: unknown) => {
          if (typeof patch === 'object' && patch !== null) {
            if (
              'patch_number' in patch &&
              typeof patch.patch_number === 'string' &&
              'patch_timestamp' in patch &&
              typeof patch.patch_timestamp === 'number'
            ) {
              return true;
            }
          }

          return false;
        })
      ) {
        return true;
      }
    }
  }

  return false;
}
