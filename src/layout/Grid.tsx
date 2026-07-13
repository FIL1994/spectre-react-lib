import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export type GridWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';

/** @deprecated Use numeric `GridWidth` values instead. */
export type LegacyGridWidth =
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

export type GridAutoMargin = 'left' | 'right' | 'both';

export interface GridProps extends React.ComponentPropsWithoutRef<'div'> {
  gapless?: boolean;
  oneline?: boolean;
}

export interface GridColumnProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: GridWidth | LegacyGridWidth;
  xs?: GridWidth;
  sm?: GridWidth;
  md?: GridWidth;
  lg?: GridWidth;
  xl?: GridWidth;
  autoMargin?: GridAutoMargin;
}

const autoMarginClasses: Record<GridAutoMargin, string> = {
  left: 'col-ml-auto',
  right: 'col-mr-auto',
  both: 'col-mx-auto',
};

function getWidthClass(prefix: string, width: GridWidth | LegacyGridWidth | undefined) {
  return width === undefined ? undefined : `${prefix}-${width}`;
}

function getGridColumnClassName({
  width,
  xs,
  sm,
  md,
  lg,
  xl,
  autoMargin,
  className,
}: GridColumnProps) {
  return [
    'column',
    getWidthClass('col', width),
    getWidthClass('col-xs', xs),
    getWidthClass('col-sm', sm),
    getWidthClass('col-md', md),
    getWidthClass('col-lg', lg),
    getWidthClass('col-xl', xl),
    autoMargin ? autoMarginClasses[autoMargin] : undefined,
    className,
  ]
    .filter((value): value is string => Boolean(value))
    .join(' ');
}

const GridRoot = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { gapless, oneline, ...props },
  ref
) {
  let className = 'columns';

  if (gapless) className = addClass(className, 'col-gapless');
  if (oneline) className = addClass(className, 'col-oneline');
  className = addClass(className, props.className);

  return <div {...props} ref={ref} className={className} />;
});

const GridColumn = forwardRef<HTMLDivElement, GridColumnProps>(function GridColumn(
  { width, xs, sm, md, lg, xl, autoMargin, ...props },
  ref
) {
  const className = getGridColumnClassName({
    width,
    xs,
    sm,
    md,
    lg,
    xl,
    autoMargin,
    className: props.className,
  });

  return <div {...props} ref={ref} className={className} />;
});

export const Grid = Object.assign(GridRoot, { Column: GridColumn });
