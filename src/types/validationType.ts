import { CombinedInput } from './inputType';

export type ValidationType = Record<string, CombinedInput>;
export enum EValidRule {
  max = 'max',
  min = 'min',
  required = 'required',
}
