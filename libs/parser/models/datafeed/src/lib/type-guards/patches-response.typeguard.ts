import {
  arrayOf,
  isNumber,
  isObject,
  isString,
  property,
} from '@whatchangedfor-2/type-guards';
import { PatchesResponse } from '../patches-response.interface';

export function isPatchesResponse(input: unknown): input is PatchesResponse {
  return (
    isObject(input) &&
    property('patches', arrayOf(isIndividualPatchData))(input)
  );
}

function isIndividualPatchData(
  input: unknown
): input is { patch_number: string; patch_timestamp: number } {
  return (
    isObject(input) &&
    property('patch_number', isString)(input) &&
    property('patch_timestamp', isNumber)(input)
  );
}
