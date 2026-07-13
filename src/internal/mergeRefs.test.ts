import { describe, expect, jest, test } from 'bun:test';
import { createRef } from 'react';
import { mergeRefs } from './mergeRefs';

describe('mergeRefs', () => {
  test('assigns callback and object refs', () => {
    const callbackRef = jest.fn();
    const objectRef = createRef<HTMLButtonElement>();
    const element = document.createElement('button');
    const ref = mergeRefs(callbackRef, objectRef, undefined);

    ref(element);

    expect(callbackRef).toHaveBeenCalledWith(element);
    expect(objectRef.current).toBe(element);
  });

  test('clears every ref when called with null', () => {
    const callbackRef = jest.fn();
    const objectRef = createRef<HTMLButtonElement>();
    const ref = mergeRefs(callbackRef, objectRef);

    ref(document.createElement('button'));
    ref(null);

    expect(callbackRef).toHaveBeenLastCalledWith(null);
    expect(objectRef.current).toBeNull();
  });
});
