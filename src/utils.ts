import { type ValueOf } from 'ts-essentials';

export function isNil(val: unknown): val is null | undefined {
  return val === null || val === undefined;
}

export const Colors = {
  Primary: 'primary',
  Secondary: 'secondary',
  Dark: 'dark',
  Gray: 'gray',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Light: 'light'
} as const;

export type Color = ValueOf<typeof Colors>;
