import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * A tab for switching between views
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Tab = props => {
  const { block } = props;
  // add the className prop to the className
  let className = addClass("tab", props.className);

  if (block) {
    className = addClass(className, "tab-block");
  }

  // add the className prop to the className
  className = addClass(className, props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ["block"]);

  return <ul {...myProps} className={className} />;
};

Tab.defaultProps = {
  className: "",
  block: false
};

Tab.propTypes = {
  className: PropTypes.string,
  block: PropTypes.bool
};

Tab.Heading = props => {
  const { active } = props;
  // add the className prop to the className
  let className = addClass("tab-item", props.className);

  if (active) {
    className = addClass(className, "active");
  }

  // add the className prop to the className
  className = addClass(className, props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ["active"]);

  return <li {...myProps} className={className} />;
};

Tab.Heading.defaultProps = {
  className: "",
  active: false
};

Tab.Heading.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool
};

export default Tab;
