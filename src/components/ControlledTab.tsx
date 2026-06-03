import React, { Fragment, useState } from 'react';
import { Tab } from './Tab';

export interface ControlledTabOption {
  label: string;
  value: string;
  render(): React.ReactNode;
}

export interface ControlledTabProps {
  options: ControlledTabOption[];
  defaultActive?: string;
}

export function ControlledTab({ options, defaultActive }: ControlledTabProps) {
  const [active, setActive] = useState(defaultActive || options[0]?.value);
  const activeOption = options.find((o) => active === o.value);

  return (
    <Fragment>
      <Tab block aria-label="Tabs" role="tablist">
        {options.map(({ label, value }) => {
          const isActive = active === value;

          return (
            <Tab.Heading key={value} active={isActive}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(value)}
              >
                {label}
              </button>
            </Tab.Heading>
          );
        })}
      </Tab>
      <div style={{ marginTop: 10 }}>
        {activeOption ? activeOption.render() : <Fragment />}
      </div>
    </Fragment>
  );
}
