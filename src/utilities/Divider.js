import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * A divider for separating elements.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Divider = props => {
  // add the className prop to the className
  let className = addClass("divider", props.className);

  // allow size to be passed as a string or a number
  if (!_.isEmpty(props.size) || _.isNumber(props.size)) {
    className = addClass(
      className,
      `col-${props.size.toString().trim()} centered`
    );
  }

  return <div {...props} className={className} />;
};

Divider.defaultProps = {
  className: "",
  size: undefined
};

Divider.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Divider;
