import { PropertyGuard } from './interfaces/property-guard';

// export function optional<T>(
//   guard: PropertyGuard<T>,
//   property: string
// ): (input: unknown) => input is T {
//   return (input): input is T => guard(input, property) || true;
// }

export function optional<T>(
  guard: PropertyGuard<T>,
  property: string
): (input: unknown) => input is Partial<T> {
  return (input): input is Partial<T> => guard(input, property) || true;
}

// optional(target(unknown, 'property'), isNumber)
// required(target(unknown, 'property'), isNumber)

// optional(isNumber('property'))(unknown)
// optionalProperty(property, isNumber)(unknown)
