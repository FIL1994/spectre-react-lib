import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface TabProps extends React.ComponentPropsWithoutRef<'ul'> {
  block?: boolean;
}

export interface TabItemProps extends React.ComponentPropsWithoutRef<'li'> {
  active?: boolean;
  action?: boolean;
}

/** @deprecated Use `TabItemProps` and `Tab.Item` instead. */
export interface TabHeadingProps extends TabItemProps {}

const TabRoot = forwardRef<HTMLUListElement, TabProps>(function Tab({ block, ...props }, ref) {
  let className = addClass('tab', props.className);

  if (block) className = addClass(className, 'tab-block');

  return <ul {...props} ref={ref} className={className} />;
});

const TabItem = forwardRef<HTMLLIElement, TabItemProps>(function TabItem(
  { active, action, ...props },
  ref
) {
  let className = addClass('tab-item', props.className);

  if (active) className = addClass(className, 'active');
  if (action) className = addClass(className, 'tab-action');

  return <li {...props} ref={ref} className={className} />;
});

export const Tab = Object.assign(TabRoot, {
  Item: TabItem,
  /** @deprecated Use `Tab.Item` instead. */
  Heading: TabItem,
});
