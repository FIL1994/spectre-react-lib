import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

const Grid = props => {
  const { gapless } = props;
  let className = addClass("columns", props.className);

  if (gapless) {
    className = addClass(className, "col-gapless");
  }

  let myProps = _.omit(props, ["gapless"]);

  return <div {...myProps} className={className} />;
};

Grid.defaultProps = {
  className: "",
  gapless: false
};

Grid.propTypes = {
  className: PropTypes.string,
  gapless: PropTypes.bool
};

Grid.Column = props => {
  const { width } = props;
  let className = addClass(`column col-${width}`, props.className);

  let myProps = _.omit(props, ["width"]);

  return <div {...myProps} className={className} />;
};

Grid.Column.defaultProps = {
  className: ""
};

Grid.Column.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default Grid;
