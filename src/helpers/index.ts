import { isNil } from '../utils';

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
