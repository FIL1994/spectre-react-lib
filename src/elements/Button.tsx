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

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  large?: boolean;
  small?: boolean;
  block?: boolean;
  primary?: boolean;
  success?: boolean;
  error?: boolean;
  link?: boolean;
  loading?: boolean;
  centered?: boolean;
  inputGroup?: boolean;
  size?: Size;
}

export interface ButtonGroupProps extends React.ComponentPropsWithoutRef<'div'> {
  block?: boolean;
}

const ButtonRoot = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
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
    ...props
  },
  ref
) {
  let className = 'btn';
  const tabIndex = disabled ? -1 : props.tabIndex;

  if (size) className = `${className} col-${size.toString().trim()}`;
  if (large) className = addClass(className, 'btn-lg');
  else if (small) className = addClass(className, 'btn-sm');
  if (block) className = addClass(className, 'btn-block');
  if (primary) className = addClass(className, 'btn-primary');
  if (success) className = addClass(className, 'btn-success');
  if (error) className = addClass(className, 'btn-error');
  if (link) className = addClass(className, 'btn-link');
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
