import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface ToastProps extends React.ComponentPropsWithoutRef<'div'> {
  primary?: boolean;
  centered?: boolean;
}

/**
 * A toast to show an alert or information.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { primary, centered, ...props },
  ref
) {
  let className = addClass('toast', props.className);

  if (primary) className = addClass(className, 'btn-primary');
  if (centered) className = addClass(className, 'centered text-center');

  return <div {...props} ref={ref} className={className} />;
});
