import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * A flexible view container with an auto-expand content section.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Panel = props => {
  const { children, title, footer } = props;

  // add the className prop to the className
  let className = addClass("panel", props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ["children", "title", "footer"]);

  let header = _.isEmpty(title) ? (
    <Fragment />
  ) : (
    <div className="panel-header">
      <div className="panel-title">
        <h5>{title}</h5>
      </div>
    </div>
  );

  return (
    <div {...myProps} className={className}>
      {header}
      <div className="panel-body">{children}</div>
      {footer && <div className="panel-footer">{footer}</div>}
    </div>
  );
};

export default Panel;