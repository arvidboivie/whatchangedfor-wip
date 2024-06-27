export type PropertyGuard<T> = (input: unknown, property: string) => input is T;

// export type UnknownPropertyGuard = (input: unknown, property: string): ;

// interface UnknownInputAndProperty {
//   input: unknown;
//   property: string;
// }
