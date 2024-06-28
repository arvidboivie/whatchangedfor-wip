import { ValidateWithLogs } from './validation-with-logs.interface';

export type PropertyValidator = (
  input: Record<string, unknown>,
  property: string
) => ValidateWithLogs;
