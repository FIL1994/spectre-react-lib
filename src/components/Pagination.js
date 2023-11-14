/* eslint no-script-url: 0 */
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass, onEnter } from "../helpers";

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

  const onClickBack = e => props.onClick(e, activePage - 1);
  const onClickForward = e => props.onClick(e, activePage + 1);

  return (
    <ul
      style={centered ? { justifyContent: "center" } : {}}
      {...myProps}
      className={className}
    >
      <li
        className={`page-item ${prevEnabled ? "" : "disabled"}`}
        tabIndex="0"
        onClick={!prevEnabled ? _.noop : onClickBack}
        onKeyPress={!prevEnabled ? _.noop : onEnter(onClickBack)}
      >
        <a
          href="javascript:void(0);"
          tabIndex="-1"
          style={{ cursor: "pointer" }}
          {...(prevEnabled ? {} : disabledTab)}
        >
          {"<"}
        </a>
      </li>
      {pages.map((i, index) => {
        const onClick = e => props.onClick(e, index + 1);

        return (
          <li
            key={index}
            className={`page-item ${index + 1 === activePage ? "active" : ""}`}
            tabIndex="0"
            onClick={onClick}
            onKeyPress={onEnter(onClick)}
          >
            <a
              href="javascript:void(0);"
              tabIndex="-1"
              style={{ cursor: "pointer" }}
            >
              {index + 1}
            </a>
          </li>
        );
      })}
      <li
        className={`page-item ${nextEnabled ? "" : "disabled"}`}
        tabIndex="0"
        onClick={!nextEnabled ? _.noop : onClickForward}
        onKeyPress={!nextEnabled ? _.noop : onEnter(onClickForward)}
      >
        <a
          href="javascript:void(0);"
          tabIndex="-1"
          style={{ cursor: "pointer" }}
          {...(nextEnabled ? {} : disabledTab)}
        >
          {">"}
        </a>
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  className: "",
  activePage: 1,
  centered: false
};

Pagination.propTypes = {
  className: PropTypes.string,
  activePage: PropTypes.number,
  centered: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Pagination;
