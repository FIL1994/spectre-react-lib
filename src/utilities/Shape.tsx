import type React from 'react';
import { addClass } from '../helpers';
import type { Color } from '../utils';

interface LoadingProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  shape: 'rounded' | 'circle';
  backgroundColor?: Color;
  textColor?: Color;
}

/**
 * Shape utilities are used for changing element shapes.
 */
export const Shape = ({
  shape,
  backgroundColor,
  textColor,
  ...props
}: LoadingProps) => {
  let className = 'centered text-center';

  if (shape === 'rounded') {
    className = addClass(className, 's-rounded');
  }

  if (shape === 'circle') {
    className = addClass(className, 's-circle');
  }

  if (!backgroundColor) {
    className = addClass(className, 'bg-primary');
  } else {
    className = addClass(className, `bg-${backgroundColor}`);
  }

  if (!textColor) {
    className = addClass(className, 'text-light');
  } else {
    className = addClass(className, `text-${textColor}`);
  }

  className = addClass(className, props.className);

  return <div {...props} className={className} />;
};
