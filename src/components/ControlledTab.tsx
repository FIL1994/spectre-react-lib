import React, { Fragment, useId, useRef, useState } from 'react';
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
  const id = useId();
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeOption = options.find((o) => active === o.value);
  const activeIndex = options.findIndex((o) => active === o.value);
  const panelId = `${id}-panel`;

  const activateTab = (index: number) => {
    const option = options[index];

    if (!option) return;

    setActive(option.value);
    tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    let nextIndex: number | undefined;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % options.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + options.length) % options.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = options.length - 1;
        break;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      activateTab(nextIndex);
    }
  };

  return (
    <Fragment>
      <Tab block aria-label="Tabs" role="tablist">
        {options.map(({ label, value }, index) => {
          const isActive = active === value;
          const tabId = `${id}-tab-${index}`;

          return (
            <Tab.Heading key={value} active={isActive} role="presentation">
              <a
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={tabId}
                href={`#${panelId}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(value);
                }}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {label}
              </a>
            </Tab.Heading>
          );
        })}
      </Tab>
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={
          activeIndex >= 0 ? `${id}-tab-${activeIndex}` : undefined
        }
        tabIndex={0}
        style={{ marginTop: 10 }}
      >
        {activeOption ? activeOption.render() : <Fragment />}
      </div>
    </Fragment>
  );
}
