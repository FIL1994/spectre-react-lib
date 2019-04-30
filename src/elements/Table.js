import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

const Table = props => {
  const { striped, hover, centered } = props;
  // add the className prop to the className
  let className = addClass("table", props.className);

  if (striped) {
    className = addClass(className, "table-striped");
  }

  if (hover) {
    className = addClass(className, "table-hover");
  }

  if (centered) {
    className = addClass(className, "text-center");
  }

  // add the className prop to the className
  className = addClass(className, props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ["striped", "hover", "centered"]);

  return <table {...myProps} className={className} />;
};

Table.defaultProps = {
  className: "",
  striped: false,
  hover: false,
  centered: false
};

Table.propTypes = {
  className: PropTypes.string,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  centered: PropTypes.bool
};

Table.Head = props => {
  const { headings, headingProps, onHeadingClick } = props;

  // remove unnecessary props
  let myProps = _.omit(props, ["headings", "headingProps", "onHeadingClick"]);

  return (
    <thead {...myProps}>
      <tr {...headingProps}>
        {headings.map((h, index) =>
          _.isArray(h) ? (
            <th key={h[1]} onClick={() => onHeadingClick(h[1])}>
              {h[0]}
            </th>
          ) : (
            <th key={`heading-${h}-${index}`} onClick={() => onHeadingClick(h)}>
              {h}
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

Table.Head.propTypes = {
  headings: PropTypes.array.isRequired,
  onHeadingClick: PropTypes.func,
  headingProps: PropTypes.object
};

Table.Head.defaultProps = {
  onHeadingClick: _.noop,
  headingProps: {}
};

Table.Body = props => <tbody {...props} />;

Table.Row = props => <tr {...props} />;

export default Table;
