import _ from "lodash";

/**
 * Prepends the className from props to the component default className.
 * @param {String} defaultClass The default class for the component.
 * @param {String} newClass The class name to prepend to the default class. (So the default class will override it)
 * @returns {String} JSX Component
 */
function addClass(defaultClass, newClass) {
  return `${defaultClass} ${_.isString(newClass) ? newClass : ""}`.trim();
}

export { addClass };
