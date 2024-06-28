import { PropertyTypeguard, Typeguard } from './type-guard';

export function property<Type, Property extends string>(
  typeguard: Typeguard<Type>
): PropertyTypeguard<Type, Property> {
  return (
    input: Record<string, unknown>,
    property: Property
  ): input is Record<string, unknown> & { [P in Property]: Type } => {
    if (!(property in input)) {
      return false;
    }

    const propertyValue = input[property];

    return typeguard(propertyValue);
  };
}
