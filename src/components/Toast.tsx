import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export type ToastVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type ToastLiveRegion = 'polite' | 'assertive';

export interface ToastProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: ToastVariant;
  /** @deprecated Use `variant="primary"` instead. */
  primary?: boolean;
  centered?: boolean;
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  dismissLabel?: string;
  liveRegion?: ToastLiveRegion;
}

/** A toast for an alert or informational message. */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    variant,
    primary,
    centered,
    onDismiss,
    dismissLabel = 'Dismiss notification',
    liveRegion,
    children,
    ...props
  },
  ref
) {
  let className = 'toast';
  const resolvedVariant = variant ?? (primary ? 'primary' : 'default');

  if (resolvedVariant !== 'default') className = addClass(className, `toast-${resolvedVariant}`);
  if (centered) className = addClass(className, 'centered text-center');
  className = addClass(className, props.className);

  const liveProps = liveRegion
    ? {
        role: liveRegion === 'assertive' ? ('alert' as const) : ('status' as const),
        'aria-live': liveRegion,
        'aria-atomic': true,
      }
    : {};

  return (
    <div {...liveProps} {...props} ref={ref} className={className}>
      {onDismiss && (
        <button
          type="button"
          className="btn btn-clear float-right"
          aria-label={dismissLabel}
          onClick={onDismiss}
        />
      )}
      {children}
    </div>
  );
});
