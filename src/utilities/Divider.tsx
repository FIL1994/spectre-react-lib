import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface DividerProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: string | number;
}

/**
 * A divider for separating elements.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { size, ...props },
  ref
) {
  let className = addClass('divider', props.className);

  if (size !== undefined) {
    className = addClass(className, `col-${size.toString().trim()} centered`);
  }

  return <div {...props} ref={ref} className={className} />;
});
