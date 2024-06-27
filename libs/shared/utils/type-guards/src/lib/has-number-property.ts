export function hasNumberProperty<
  T extends Record<string, unknown>,
  K extends string
>(input: T, property: K): input is T & { [P in K]: number } {
  const result = property in input && typeof input[property] === 'number';

  if (!result) {
    console.warn(`Property ${property} is not a number`);
  }

  return result;
}
