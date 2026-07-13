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

interface ButtonClassOptions {
  variant?: ButtonVariant;
  controlSize?: ControlSize;
  action?: boolean;
  clear?: boolean;
  active?: boolean;
  block?: boolean;
  loading?: boolean;
  large?: boolean;
  small?: boolean;
  primary?: boolean;
  success?: boolean;
  error?: boolean;
  link?: boolean;
  centered?: boolean;
  inputGroup?: boolean;
  size?: Size;
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<Exclude<ButtonVariant, 'default'>, string> = {
  primary: 'btn-primary',
  success: 'btn-success',
  error: 'btn-error',
  link: 'btn-link',
};

function getSizeClass(controlSize: ControlSize | undefined, large?: boolean, small?: boolean) {
  if (controlSize === 'lg' || (controlSize === undefined && large)) return 'btn-lg';
  if (controlSize === 'sm' || (controlSize === undefined && small)) return 'btn-sm';
  return undefined;
}

function getVariantClasses({ variant, primary, success, error, link }: ButtonClassOptions) {
  if (variant !== undefined) return variant === 'default' ? undefined : variantClasses[variant];

  return [
    primary ? variantClasses.primary : undefined,
    success ? variantClasses.success : undefined,
    error ? variantClasses.error : undefined,
    link ? variantClasses.link : undefined,
  ];
}

function when(condition: boolean | undefined, className: string) {
  return condition ? className : undefined;
}

function getColumnClass(size: Size | undefined) {
  return size ? `col-${size.toString().trim()}` : undefined;
}

function toClassNameArray(classNames: string | (string | undefined)[] | undefined) {
  return Array.isArray(classNames) ? classNames : [classNames];
}

function getButtonClassName(options: ButtonClassOptions) {
  const variantClassNames = getVariantClasses(options);

  return [
    'btn',
    getColumnClass(options.size),
    getSizeClass(options.controlSize, options.large, options.small),
    when(options.block, 'btn-block'),
    ...toClassNameArray(variantClassNames),
    when(options.action, 'btn-action'),
    when(options.clear, 'btn-clear'),
    when(options.active, 'active'),
    when(options.loading, 'loading'),
    when(options.centered, 'centered text-center'),
    when(options.inputGroup, 'input-group-btn'),
    when(options.disabled, 'disabled'),
    options.className,
  ]
    .filter((className): className is string => Boolean(className))
    .join(' ');
}

function getButtonTabIndex(disabled: boolean | undefined, tabIndex: number | undefined) {
  return disabled ? -1 : tabIndex;
}

function getButtonAriaBusy(ariaBusy: React.AriaAttributes['aria-busy'], loading?: boolean) {
  if (ariaBusy !== undefined) return ariaBusy;
  return loading || undefined;
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
  const tabIndex = getButtonTabIndex(disabled, props.tabIndex);
  const className = getButtonClassName({
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
    className: props.className,
  });

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      tabIndex={tabIndex}
      aria-busy={getButtonAriaBusy(ariaBusy, loading)}
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
