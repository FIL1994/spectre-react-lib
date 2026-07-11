import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface EmptyStateProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * A placeholder for first time use, empty data and error screens.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { children, title, icon, ...props },
  ref
) {
  const className = addClass('empty', props.className);

  return (
    <div {...props} ref={ref} className={className}>
      {!icon ? '' : <div className="empty-icon">{icon}</div>}
      <div className="empty-title h5">{title}</div>
      <div className="empty-action">{children}</div>
    </div>
  );
});
