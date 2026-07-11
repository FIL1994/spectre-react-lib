import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface LoadingProps extends React.ComponentPropsWithoutRef<'div'> {
  large?: boolean;
}

/**
 * A loading indicator.
 */
export const Loading = forwardRef<HTMLDivElement, LoadingProps>(function Loading(
  { large, ...props },
  ref
) {
  let className = 'loading';

  if (large) className = addClass(className, 'loading-lg');

  className = addClass(className, props.className);

  return <div {...props} ref={ref} className={className} />;
});
