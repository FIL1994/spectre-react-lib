import React, { Fragment } from 'react';
import { isNil } from '../utils';
import { addClass } from '../helpers';

export interface PanelProps {
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * A flexible view container with an auto-expand content section.
 */
const Panel = ({ children, title, footer, ...props }: PanelProps) => {
  let className = addClass('panel', props.className);

  let header = isNil(title) ? (
    <Fragment />
  ) : (
    <div className="panel-header">
      <div className="panel-title">
        <h5>{title}</h5>
      </div>
    </div>
  );

  return (
    <div {...props} className={className}>
      {header}
      <div className="panel-body">{children}</div>
      {footer && <div className="panel-footer">{footer}</div>}
    </div>
  );
};

export default Panel;
