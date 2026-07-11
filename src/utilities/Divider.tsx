import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends React.ComponentPropsWithoutRef<'div'> {
  orientation?: DividerOrientation;
  content?: string;
  /** @deprecated Use `Grid.Column` for layout width. */
  size?: string | number;
}

/**
 * A divider for separating elements.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', content, size, ...props },
  ref
) {
  let className = orientation === 'vertical' ? 'divider-vert' : 'divider';

  if (size !== undefined) {
    className = addClass(className, `col-${size.toString().trim()} centered`);
  }
  className = addClass(className, props.className);

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      aria-label={content}
      data-content={content}
      {...props}
      ref={ref}
      className={className}
    />
  );
});
