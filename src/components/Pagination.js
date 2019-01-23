import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

/**
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Pagination = props => {
  const { activePage, totalPages, centered } = props;

  // add the className prop to the className
  let className = addClass("pagination", props.className);

  // remove unnecessary props
  let myProps = _.omit(props, [
    "children",
    "onClick",
    "activePage",
    "totalPages",
    "centered"
  ]);

  const pages = Array.from(new Array(_.ceil(totalPages)), () => undefined);

  const prevEnabled = !(activePage <= 1);
  const nextEnabled = !(activePage >= totalPages);
  const disabledTab = { tabIndex: "-1" };

  return (
    <ul
      style={centered ? { justifyContent: "center" } : {}}
      {...myProps}
      className={className}
    >
      <li
        onClick={!prevEnabled ? _.noop : e => props.onClick(e, activePage - 1)}
        className={`page-item ${prevEnabled ? "" : "disabled"}`}
      >
        <a style={{ cursor: "pointer" }} {...(prevEnabled ? {} : disabledTab)}>
          {"<"}
        </a>
      </li>
      {pages.map((i, index) => (
        <li
          key={index}
          className={`page-item ${index + 1 === activePage ? "active" : ""}`}
          onClick={e => props.onClick(e, index + 1)}
        >
          <a style={{ cursor: "pointer" }}>{index + 1}</a>
        </li>
      ))}
      <li
        onClick={!nextEnabled ? _.noop : e => props.onClick(e, activePage + 1)}
        className={`page-item ${nextEnabled ? "" : "disabled"}`}
      >
        <a style={{ cursor: "pointer" }} {...(nextEnabled ? {} : disabledTab)}>
          {">"}
        </a>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  onClick: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
};

Pagination.defaultProps = {
  activePage: 1
};

export default Pagination;
