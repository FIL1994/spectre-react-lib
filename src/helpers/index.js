import _ from "lodash";

/**
 * Prepends the className from props to the component default className.
 * @param {String} defaultClass The default class for the component.
 * @param {String} newClass The class name to prepend to the default class. (So the default class will override it)
 * @returns {String} JSX Component
 */
export function addClass(defaultClass, newClass) {
  return `${defaultClass} ${_.isString(newClass) ? newClass : ""}`.trim();
}

/**
 * A higher-order function for running a callback when the "Enter" key is pressed
 * @param {*} callback Called when the "Enter" key is pressed
 */
export const onEnter = callback => event => {
  if (event.key === "Enter") {
    callback(event);
  }
};
