import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * A simple button.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Button = props => {
  const {
    small,
    large,
    block,
    primary,
    centered,
    disabled,
    success,
    error,
    loading,
    link,
    inputGroup
  } = props;
  let className = "btn";
  let otherProps = {};

  // allow size to be passed as a string or a number
  if (!_.isEmpty(props.size) || _.isNumber(props.size)) {
    className = `${className} col-${props.size.toString().trim()}`;
  }

  if (large) {
    className = addClass(className, "btn-lg");
  } else if (small) {
    className = addClass(className, "btn-sm");
  }

  if (block) {
    className = addClass(className, "btn-block");
  }

  if (primary) {
    className = addClass(className, "btn-primary");
  }

  if (success) {
    className = addClass(className, "btn-success");
  }

  if (error) {
    className = addClass(className, "btn-error");
  }

  if (link) {
    className = addClass(className, "btn-link");
  }

  if (loading) {
    className = addClass(className, "loading");
  }

  if (centered) {
    className = addClass(className, "centered text-center");
  }

  if (inputGroup) {
    className = addClass(className, "input-group-btn");
  }

  if (disabled) {
    otherProps.disabled = true;
    otherProps.tabIndex = "-1";
    className = addClass(className, "disabled");
  }

  // add the className prop to the className
  className = addClass(className, props.className);

  // remove unnecessary props
  let myProps = _.omit(props, [
    "small",
    "large",
    "block",
    "primary",
    "centered",
    "disabled",
    "as",
    "success",
    "error",
    "loading",
    "link",
    "inputGroup"
  ]);

  return <props.as {...myProps} {...otherProps} className={className} />;
};

Button.defaultProps = {
  as: props => <button type="button" {...props} /> // type defaults to "button" if no component is provided in props
};

Button.Group = props => {
  const { block } = props;
  let className = "btn-group";

  if (block) {
    className = addClass(className, "btn-group-block");
  }

  // add the className prop to the className
  className = addClass(className, props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ["block"]);

  return <div {...myProps} className={className} />;
};

export default Button;
