import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface TabProps extends React.ComponentPropsWithoutRef<'ul'> {
  block?: boolean;
}

export interface TabHeadingProps extends React.ComponentPropsWithoutRef<'li'> {
  active?: boolean;
}

const TabRoot = forwardRef<HTMLUListElement, TabProps>(function Tab({ block, ...props }, ref) {
  let className = addClass('tab', props.className);

  if (block) {
    className = addClass(className, 'tab-block');
  }

  return <ul {...props} ref={ref} className={className} />;
});

const TabHeading = forwardRef<HTMLLIElement, TabHeadingProps>(function TabHeading(
  { active, ...props },
  ref
) {
  let className = addClass('tab-item', props.className);

  if (active) {
    className = addClass(className, 'active');
  }

  return <li {...props} ref={ref} className={className} />;
});

export const Tab = Object.assign(TabRoot, { Heading: TabHeading });
