import { isObject } from './is-object';
import { Typeguard } from './type-guard';

export function property<
  InputType extends Record<string, unknown>,
  Type,
  Property extends string
>(
  property: Property,
  typeguard: Typeguard<Type>
): Typeguard<InputType & { [P in Property]: Type }> {
  return (input: unknown): input is InputType & { [P in Property]: Type } => {
    if (!(isObject(input) && property in input)) {
      return false;
    }

    const propertyValue = input[property];

    return typeguard(propertyValue);
  };
}
