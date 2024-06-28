import { PropertyTypeguard } from './type-guard';

export function optional<Type, Property extends string>(
  propertyGuard: PropertyTypeguard<Type, Property>
): PropertyTypeguard<Type, Property> {
  return (
    input: Record<string, unknown>,
    property: Property
  ): input is Record<string, unknown> & { [P in Property]: Type } => {
    return !(property in input) || propertyGuard(input, property);
  };
}
