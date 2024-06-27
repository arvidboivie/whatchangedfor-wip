import {
  hasArrayProperty,
  hasNumberProperty,
  hasStringProperty,
  isObject,
} from '@whatchangedfor-2/type-guards';
import { PatchesResponse } from './patches-response.interface';

export function isPatchesResponse(input: unknown): input is PatchesResponse {
  return (
    isObject(input) &&
    hasArrayProperty(input, 'patches') &&
    input.patches.every(
      (patch: unknown) =>
        isObject(patch) &&
        hasStringProperty(patch, 'patch_number') &&
        hasNumberProperty(patch, 'patch_timestamp')
    )
  );
}
