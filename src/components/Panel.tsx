import React, { Fragment, forwardRef } from 'react';
import { isNil } from '../utils';
import { addClass } from '../helpers';

export interface PanelProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * A flexible view container with an auto-expand content section.
 */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { children, title, footer, ...props },
  ref
) {
  const className = addClass('panel', props.className);

  const header = isNil(title) ? (
    <Fragment />
  ) : (
    <div className="panel-header">
      <div className="panel-title">
        <h5>{title}</h5>
      </div>
    </div>
  );

  return (
    <div {...props} ref={ref} className={className}>
      {header}
      <div className="panel-body">{children}</div>
      {footer && <div className="panel-footer">{footer}</div>}
    </div>
  );
});
