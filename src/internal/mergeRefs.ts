import type React from 'react';

export function mergeRefs<Value>(
  ...refs: readonly (React.Ref<Value> | undefined)[]
): React.RefCallback<Value> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    }
  };
}
