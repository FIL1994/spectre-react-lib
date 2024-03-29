import React from 'react';
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

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
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
  disabled?: boolean;
  size?: Size;
}

export function Button({
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
  ...props
}: Props) {
  let className = 'btn';

  const otherProps = {
    disabled: false,
    tabIndex: undefined,
  } as Pick<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'disabled' | 'tabIndex'
  >;

  // allow size to be passed as a string or a number
  if (size) {
    className = `${className} col-${size.toString().trim()}`;
  }

  if (large) {
    className = addClass(className, 'btn-lg');
  } else if (small) {
    className = addClass(className, 'btn-sm');
  }

  if (block) {
    className = addClass(className, 'btn-block');
  }

  if (primary) {
    className = addClass(className, 'btn-primary');
  }

  if (success) {
    className = addClass(className, 'btn-success');
  }

  if (error) {
    className = addClass(className, 'btn-error');
  }

  if (link) {
    className = addClass(className, 'btn-link');
  }

  if (loading) {
    className = addClass(className, 'loading');
  }

  if (centered) {
    className = addClass(className, 'centered text-center');
  }

  if (inputGroup) {
    className = addClass(className, 'input-group-btn');
  }

  if (disabled) {
    otherProps.disabled = true;
    otherProps.tabIndex = -1;
    className = addClass(className, 'disabled');
  }

  className = addClass(className, props.className);

  return (
    <button type="button" {...props} {...otherProps} className={className} />
  );
}

interface ButtonGroupProps {
  children?: React.ReactNode;
  className?: string;
  block?: boolean;
}

Button.Group = function ButtonGroup({ block, ...props }: ButtonGroupProps) {
  let className = 'btn-group';

  if (block) {
    className = addClass(className, 'btn-group-block');
  }

  className = addClass(className, props.className);

  return <div {...props} className={className} />;
};
