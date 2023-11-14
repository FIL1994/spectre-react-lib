import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Tab from "./Tab";

import { onEnter } from "../helpers";

class ControlledTab extends Component {
  state = {
    active:
      this.props.defaultActive ||
      (this.props.options[0] && this.props.options[0].value)
  };

  renderActive = () => {
    const activeOption = this.props.options.find(
      o => this.state.active === o.value
    );

    return activeOption ? activeOption.render() : <Fragment />;
  };

  render() {
    return (
      <Fragment>
        <Tab block>
          {this.props.options.map(({ label, value }) => {
            const onClick = () => {
              this.setState({ active: value });
            };

            return (
              <Fragment key={value}>
                <Tab.Heading
                  active={this.state.active === value}
                  tabIndex={0}
                  onClick={onClick}
                  onKeyPress={onEnter(onClick)}
                  children={<a href="#">{label}</a>}
                />
              </Fragment>
            );
          })}
        </Tab>
        <div style={{ marginTop: 10 }}>{this.renderActive()}</div>
      </Fragment>
    );
  }
}

ControlledTab.defaultProps = {
  defaultActive: undefined,
  options: []
};

ControlledTab.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired
    })
  ),
  defaultActive: PropTypes.string
};

export default ControlledTab;
