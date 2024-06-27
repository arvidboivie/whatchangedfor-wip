import { isObject } from './is-object';

export function hasArrayProperty(
  input: unknown,
  property: string
): input is { [property: string]: unknown[] } {
  return isObject(input) && property in input && Array.isArray(input[property]);
}
