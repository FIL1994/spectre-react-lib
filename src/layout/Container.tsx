import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: ContainerSize;
}

/** The canonical Spectre container for page content. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size, ...props },
  ref
) {
  let className = 'container';

  if (size) className = addClass(className, `grid-${size}`);
  className = addClass(className, props.className);

  return <div {...props} ref={ref} className={className} />;
});
