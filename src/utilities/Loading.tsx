import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface LoadingProps extends React.ComponentPropsWithoutRef<'div'> {
  large?: boolean;
  label?: string;
}

/**
 * A loading indicator.
 */
export const Loading = forwardRef<HTMLDivElement, LoadingProps>(function Loading(
  { large, label, ...props },
  ref
) {
  let className = 'loading';

  if (large) className = addClass(className, 'loading-lg');

  className = addClass(className, props.className);

  const accessibleName = props['aria-labelledby'] ? undefined : (label ?? 'Loading');

  return (
    <div role="status" aria-label={accessibleName} {...props} ref={ref} className={className} />
  );
});
