import React, { forwardRef } from 'react';
import { addClass } from '../helpers';
import type { BackgroundColor, Color, TextColor } from '../utils';

export type ShapeKind = 'rounded' | 'circle';

interface ShapeBaseProps extends React.ComponentPropsWithoutRef<'div'> {
  shape: ShapeKind;
}

export interface ShapeProps extends ShapeBaseProps {
  /**
   * Preserves the historical implicit centering and default colors.
   *
   * @deprecated Set `legacyDefaults={false}` and compose layout styles explicitly.
   */
  legacyDefaults?: true;
  backgroundColor?: Color;
  textColor?: Color;
}

export interface LegacyShapeProps extends ShapeProps {}

export interface CanonicalShapeProps extends ShapeBaseProps {
  legacyDefaults: false;
  backgroundColor?: BackgroundColor;
  textColor?: TextColor;
}

export type ShapeComponentProps = CanonicalShapeProps | ShapeProps;

/*
 * Keep legacy defaults through 0.x while allowing new code to opt into the
 * canonical class-only shape contract.
 */
interface ShapeRuntimeProps extends ShapeBaseProps {
  legacyDefaults?: boolean;
  backgroundColor?: Color;
  textColor?: Color;
}

/**
 * Shape utilities are used for changing element shapes.
 */
export const Shape = forwardRef<HTMLDivElement, ShapeComponentProps>(function Shape(
  { shape, legacyDefaults = true, backgroundColor, textColor, ...props }: ShapeRuntimeProps,
  ref
) {
  let className = legacyDefaults ? 'centered text-center' : '';

  if (shape === 'rounded') className = addClass(className, 's-rounded');
  if (shape === 'circle') className = addClass(className, 's-circle');

  const resolvedBackgroundColor = backgroundColor ?? (legacyDefaults ? 'primary' : undefined);
  const resolvedTextColor = textColor ?? (legacyDefaults ? 'light' : undefined);

  if (resolvedBackgroundColor) {
    className = addClass(className, `bg-${resolvedBackgroundColor}`);
  }
  if (resolvedTextColor) className = addClass(className, `text-${resolvedTextColor}`);
  className = addClass(className, props.className);

  return <div {...props} ref={ref} className={className} />;
});
