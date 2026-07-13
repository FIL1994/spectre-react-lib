import React, { forwardRef } from 'react';
import { addClass } from '../helpers';
import type { ContainerProps } from '../layout/Container';

/** @deprecated Use `ContainerProps` instead. */
export interface PageProps extends ContainerProps {
  centered?: boolean;
}

/**
 * A legacy page helper for containing elements.
 *
 * @deprecated Use `Container` instead.
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { centered, size, ...props },
  ref
) {
  let className = addClass('page container', props.className);

  if (size) className = addClass(className, `grid-${size}`);
  if (centered) {
    className = addClass(className, 'centered text-center');
  }

  return <div {...props} ref={ref} className={className} />;
});
