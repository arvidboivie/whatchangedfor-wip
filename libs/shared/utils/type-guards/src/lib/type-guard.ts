export type Typeguard<Type> = (input: unknown) => input is Type;

export type PropertyTypeguard<Type, Property extends string> = (
  input: Record<string, unknown>,
  property: Property
) => input is Record<string, unknown> & { [P in Property]: Type };
