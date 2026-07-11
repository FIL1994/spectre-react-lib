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
  let className = 'column';

  if (width !== undefined) className = addClass(className, `col-${width}`);
  if (xs !== undefined) className = addClass(className, `col-xs-${xs}`);
  if (sm !== undefined) className = addClass(className, `col-sm-${sm}`);
  if (md !== undefined) className = addClass(className, `col-md-${md}`);
  if (lg !== undefined) className = addClass(className, `col-lg-${lg}`);
  if (xl !== undefined) className = addClass(className, `col-xl-${xl}`);

  if (autoMargin === 'left') className = addClass(className, 'col-ml-auto');
  if (autoMargin === 'right') className = addClass(className, 'col-mr-auto');
  if (autoMargin === 'both') className = addClass(className, 'col-mx-auto');

  className = addClass(className, props.className);

  return <div {...props} ref={ref} className={className} />;
});

export const Grid = Object.assign(GridRoot, { Column: GridColumn });
