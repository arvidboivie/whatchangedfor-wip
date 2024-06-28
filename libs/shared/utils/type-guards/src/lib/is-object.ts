export function isObject(input: unknown): input is Record<number, unknown> {
  return typeof input === 'object' && input !== null;
}
