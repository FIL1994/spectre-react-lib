import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { addClass } from "../helpers";

const Page = props => {
  const { centered } = props;
  // add the className prop to the className
  let className = addClass("page container", props.className);

  if (centered) {
    className = addClass(className, "centered text-center");
  }

  // remove unnecessary props
  let myProps = _.omit(props, ["centered"]);

  return <div {...myProps} className={className} />;
};

Page.defaultProps = {
  className: "",
  centered: false
};

Page.propTypes = {
  className: PropTypes.string,
  centered: PropTypes.bool
};

export default Page;
