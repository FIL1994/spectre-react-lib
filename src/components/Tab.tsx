import React from 'react';
import { addClass } from '../helpers';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  block?: boolean;
}

/**
 * A tab for switching between views
 */
export function Tab({ block, ...props }: Props) {
  let className = addClass('tab', props.className);

  if (block) {
    className = addClass(className, 'tab-block');
  }

  className = addClass(className, props.className);

  return <ul {...props} className={className} />;
}

interface TabHeadingProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  active?: boolean;
  tabIndex?: number;
  onClick?: React.MouseEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
}

Tab.Heading = ({ active, ...props }: TabHeadingProps) => {
  let className = addClass('tab-item', props.className);

  if (active) {
    className = addClass(className, 'active');
  }

  className = addClass(className, props.className);

  return <li {...props} className={className} />;
};
