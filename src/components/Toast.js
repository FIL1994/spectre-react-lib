import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * A toast to show an alert or information.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Toast = props => {
  const { primary, centered } = props;
  // add the className prop to the className
  let className = addClass("toast", props.className);

  if (primary) {
    className = addClass(className, "btn-primary");
  }

  if (centered) {
    className = addClass(className, "centered text-center");
  }

  // remove unnecessary props
  let myProps = _.omit(props, ["primary", "centered"]);

  return <div {...myProps} className={className} />;
};

export default Toast;
