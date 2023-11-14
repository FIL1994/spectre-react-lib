import React from 'react';
import { addClass } from '../helpers';

interface ToastProps {
  className?: string;
  primary?: boolean;
  centered?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * A toast to show an alert or information.
 */
const Toast = ({ primary, centered, ...props }: ToastProps) => {
  let className = addClass('toast', props.className);

  if (primary) {
    className = addClass(className, 'btn-primary');
  }

  if (centered) {
    className = addClass(className, 'centered text-center');
  }

  return <div {...props} className={className} />;
};

export default Toast;
