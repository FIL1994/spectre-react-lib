import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * A placeholder for first time use, empty data and error screens.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const EmptyState = props => {
  const { children, title, icon } = props;

  // add the className prop to the className
  let className = addClass("empty", props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ["children", "title", "icon"]);

  return (
    <div {...myProps} className={className}>
      {_.isEmpty(icon) ? "" : <div className="empty-icon">{icon}</div>}
      <div className="empty-title h5">{title}</div>
      <div className="empty-action">{children}</div>
    </div>
  );
};

EmptyState.defaultProps = {
  className: "",
  children: undefined,
  title: undefined,
  icon: undefined
};

EmptyState.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node,
  icon: PropTypes.node
};

export default EmptyState;
