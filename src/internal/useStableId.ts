import { useId } from 'react';

export function useStableId(explicitId?: string, prefix = 'spectre'): string {
  const generatedId = useId();
  return explicitId ?? `${prefix}-${generatedId}`;
}
