import { Typeguard } from './type-guard';

export function property<
  InputType extends Record<string, unknown>,
  Type,
  Property extends string
>(
  property: Property,
  typeguard: Typeguard<Type>
): Typeguard<InputType & { [P in Property]: Type }> {
  return (input: InputType): input is InputType & { [P in Property]: Type } => {
    if (!(property in input)) {
      return false;
    }

    const propertyValue = input[property];

    return typeguard(propertyValue);
  };
}
