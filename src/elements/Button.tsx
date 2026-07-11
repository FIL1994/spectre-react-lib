import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export type Size =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export type ButtonVariant = 'default' | 'primary' | 'success' | 'error' | 'link';

export type ControlSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  controlSize?: ControlSize;
  action?: boolean;
  clear?: boolean;
  active?: boolean;
  block?: boolean;
  loading?: boolean;
  /** @deprecated Use `controlSize="lg"` instead. */
  large?: boolean;
  /** @deprecated Use `controlSize="sm"` instead. */
  small?: boolean;
  /** @deprecated Use `variant="primary"` instead. */
  primary?: boolean;
  /** @deprecated Use `variant="success"` instead. */
  success?: boolean;
  /** @deprecated Use `variant="error"` instead. */
  error?: boolean;
  /** @deprecated Use `variant="link"` instead. */
  link?: boolean;
  /** @deprecated Use layout composition or `className` instead. */
  centered?: boolean;
  /** @deprecated Use form input-group composition or `className` instead. */
  inputGroup?: boolean;
  /** @deprecated Grid width is not a button concern. Use `Grid.Column` for layout. */
  size?: Size;
}

export interface ButtonGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  block?: boolean;
}

const ButtonRoot = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    controlSize,
    action,
    clear,
    active,
    small,
    large,
    block,
    primary,
    centered,
    disabled,
    success,
    error,
    loading,
    link,
    inputGroup,
    size,
    type = 'button',
    'aria-busy': ariaBusy,
    ...props
  },
  ref
) {
  let className = 'btn';
  const tabIndex = disabled ? -1 : props.tabIndex;

  if (size) className = `${className} col-${size.toString().trim()}`;
  if (controlSize === 'lg' || (controlSize === undefined && large)) {
    className = addClass(className, 'btn-lg');
  } else if (controlSize === 'sm' || (controlSize === undefined && small)) {
    className = addClass(className, 'btn-sm');
  }
  if (block) className = addClass(className, 'btn-block');

  if (variant === undefined) {
    if (primary) className = addClass(className, 'btn-primary');
    if (success) className = addClass(className, 'btn-success');
    if (error) className = addClass(className, 'btn-error');
    if (link) className = addClass(className, 'btn-link');
  } else if (variant !== 'default') {
    className = addClass(className, `btn-${variant}`);
  }

  if (action) className = addClass(className, 'btn-action');
  if (clear) className = addClass(className, 'btn-clear');
  if (active) className = addClass(className, 'active');
  if (loading) className = addClass(className, 'loading');
  if (centered) className = addClass(className, 'centered text-center');
  if (inputGroup) className = addClass(className, 'input-group-btn');
  if (disabled) className = addClass(className, 'disabled');

  className = addClass(className, props.className);

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      tabIndex={tabIndex}
      aria-busy={ariaBusy ?? (loading ? true : undefined)}
      className={className}
    />
  );
});

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { block, ...props },
  ref
) {
  let className = 'btn-group';

  if (block) className = addClass(className, 'btn-group-block');

  className = addClass(className, props.className);

  return <div {...props} ref={ref} className={className} />;
});

export const Button = Object.assign(ButtonRoot, { Group: ButtonGroup });
