import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * A loading indicator.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Loading = props => {
  const { large } = props;
  let className = "loading";

  if (large) {
    className = addClass(className, "loading-lg");
  }

  // add the className prop to the className
  className = addClass(className, props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ["large"]);

  return <div {...myProps} className={className} />;
};

Loading.defaultProps = {
  large: false,
  className: ""
};

Loading.propTypes = {
  large: PropTypes.bool,
  className: PropTypes.string
};

export default Loading;
