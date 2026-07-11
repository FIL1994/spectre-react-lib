import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface PageProps extends React.ComponentPropsWithoutRef<'div'> {
  centered?: boolean;
}

/** A page for containing elements. */
export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { centered, ...props },
  ref
) {
  let className = addClass('page container', props.className);

  if (centered) {
    className = addClass(className, 'centered text-center');
  }

  return <div {...props} ref={ref} className={className} />;
});
