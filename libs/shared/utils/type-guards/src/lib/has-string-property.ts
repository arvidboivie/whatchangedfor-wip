export function hasStringProperty<
  T extends Record<string, unknown>,
  K extends string
>(input: T, property: K): input is T & { [P in K]: string } {
  const result = property in input && typeof input[property] === 'string';

  if (!result) {
    console.warn(
      `Property "${property}" on ${JSON.stringify(input)} is not a string`
    );
  }

  return result;
}
