import React, { forwardRef } from 'react';
import { addClass } from '../helpers';
import type { Color } from '../utils';

export interface ShapeProps extends React.ComponentPropsWithoutRef<'div'> {
  shape: 'rounded' | 'circle';
  backgroundColor?: Color;
  textColor?: Color;
}

/**
 * Shape utilities are used for changing element shapes.
 */
export const Shape = forwardRef<HTMLDivElement, ShapeProps>(function Shape(
  { shape, backgroundColor, textColor, ...props },
  ref
) {
  let className = 'centered text-center';

  if (shape === 'rounded') className = addClass(className, 's-rounded');
  if (shape === 'circle') className = addClass(className, 's-circle');

  className = addClass(className, `bg-${backgroundColor ?? 'primary'}`);
  className = addClass(className, `text-${textColor ?? 'light'}`);
  className = addClass(className, props.className);

  return <div {...props} ref={ref} className={className} />;
});
