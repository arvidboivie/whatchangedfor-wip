import { Patch, Patches } from './patches.interface';

export function isPatches(input: unknown): input is Patches {
  if (typeof input === 'object' && input !== null) {
    if ('patches' in input && Array.isArray(input.patches)) {
      if (input.patches.every(isPatch)) {
        return true;
      }
    }
  }

  return false;
}

function isPatch(input: unknown): input is Patch {
  if (typeof input === 'object' && input !== null) {
    if (
      'patch_number' in input &&
      typeof input.patch_number === 'string' &&
      'patch_timestamp' in input &&
      typeof input.patch_timestamp === 'number'
    ) {
      return true;
    }
  }

  return false;
}
