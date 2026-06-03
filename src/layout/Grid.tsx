import React, { forwardRef } from 'react';
import { addClass } from '../helpers';
import type { Size } from '../elements/Button';

export interface GridProps extends React.ComponentPropsWithoutRef<'div'> {
  gapless?: boolean;
}

export interface GridColumnProps extends React.ComponentPropsWithoutRef<'div'> {
  width: Size;
}

const GridRoot = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { gapless, ...props },
  ref
) {
  let className = addClass('columns', props.className);

  if (gapless) className = addClass(className, 'col-gapless');

  return <div {...props} ref={ref} className={className} />;
});

const GridColumn = forwardRef<HTMLDivElement, GridColumnProps>(function GridColumn(
  { width, ...props },
  ref
) {
  const className = addClass(`column col-${width}`, props.className);
  return <div {...props} ref={ref} className={className} />;
});

export const Grid = Object.assign(GridRoot, { Column: GridColumn });
