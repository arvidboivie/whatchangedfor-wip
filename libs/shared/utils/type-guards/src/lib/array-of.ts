import { Typeguard } from './type-guard';

export function arrayOf<Type>(typeGuard: Typeguard<Type>): Typeguard<Type[]> {
  return (input: unknown): input is Type[] => {
    return Array.isArray(input) && input.every(typeGuard);
  };
}
