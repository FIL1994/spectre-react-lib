import { isNil } from '../utils';
import type React from 'react';

/**
 * Prepends the className from props to the component default className.
 * @param defaultClass - The default class for the component.
 * @param newClass - The class name to prepend to the default class. (So the default class will override it)
 * @returns concatenated class name
 */
export function addClass(defaultClass: string, newClass: string | undefined) {
  if (isNil(newClass)) return defaultClass;
  return `${defaultClass} ${newClass}`.trim();
}

/**
 * A higher-order function for running a callback when the "Enter" key is pressed
 * @param callback - Called when the "Enter" key is pressed
 */
export function onEnter<
  T extends Element = Element,
  KeyboardEvent extends React.KeyboardEvent<T> = React.KeyboardEvent<T>,
>(callback: (e: KeyboardEvent) => void) {
  return (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      callback(event);
    }
  };
}
