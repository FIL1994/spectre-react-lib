import React, { Component, Fragment } from 'react';
import { Tab } from './Tab';

import { onEnter } from '../helpers';

interface Props {
  options: {
    label: string;
    value: string;
    render(): React.ReactNode;
  }[];
  defaultActive?: string;
}

export class ControlledTab extends Component<Props> {
  state = {
    active: this.props.defaultActive || this.props.options[0]?.value,
  };

  renderActive = () => {
    const activeOption = this.props.options.find(
      (o) => this.state.active === o.value
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
