export type ClassNameValue = string | false | null | undefined | readonly ClassNameValue[];

function appendClassNames(tokens: string[], value: ClassNameValue): void {
  if (Array.isArray(value)) {
    for (const nestedValue of value) appendClassNames(tokens, nestedValue);
    return;
  }

  if (typeof value === 'string' && value.length > 0) tokens.push(value);
}

export function classNames(...values: readonly ClassNameValue[]): string {
  const tokens: string[] = [];

  for (const value of values) appendClassNames(tokens, value);

  return tokens.join(' ');
}
