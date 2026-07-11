import { useCallback, useEffect, useRef, useState } from 'react';

interface ControllableStateOptions<Value> {
  value?: Value;
  defaultValue?: Value;
  onValueChange?(value: Value): void;
  componentName: string;
}

export function useControllableState<Value>({
  value,
  defaultValue,
  onValueChange,
  componentName,
}: ControllableStateOptions<Value>): readonly [Value | undefined, (value: Value) => void] {
  const controlled = value !== undefined;
  const initiallyControlled = useRef(controlled);
  const warned = useRef(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  useEffect(() => {
    if (warned.current || initiallyControlled.current === controlled) return;

    warned.current = true;
    console.error(
      `${componentName} changed from ${
        initiallyControlled.current ? 'controlled' : 'uncontrolled'
      } to ${controlled ? 'controlled' : 'uncontrolled'}. Keep its state mode consistent.`
    );
  }, [componentName, controlled]);

  const setValue = useCallback(
    (nextValue: Value) => {
      if (!controlled) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    },
    [controlled, onValueChange]
  );

  return [controlled ? value : uncontrolledValue, setValue] as const;
}
