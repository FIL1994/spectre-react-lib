import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * A hover parallax effect.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Parallax = props => {
  const { children, title, topLeft, topRight, bottomLeft, bottomRight } = props;

  // add the className prop to the className
  let className = addClass("parallax", props.className);

  // remove unnecessary props
  let myProps = _.omit(props, [
    "children",
    "title",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);

  return (
    <div {...myProps} className={className}>
      <div className="parallax-top-left" onClick={topLeft} />
      <div className="parallax-top-right" onClick={topRight} />
      <div className="parallax-bottom-left" onClick={bottomLeft} />
      <div className="parallax-bottom-right" onClick={bottomRight} />
      <div className="parallax-content">
        <div className="parallax-front">
          <h2>{title}</h2>
        </div>
        <div className="parallax-back">{children}</div>
      </div>
    </div>
  );
};

export default Parallax;
