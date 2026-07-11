import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  striped?: boolean;
  hover?: boolean;
  centered?: boolean;
}

export interface TableHeadProps extends React.ComponentPropsWithoutRef<'thead'> {
  headings: string[];
  onHeadingClick?(heading: string): void;
  headingProps?: React.ComponentPropsWithoutRef<'tr'>;
}

export type TableBodyProps = React.ComponentPropsWithoutRef<'tbody'>;
export type TableRowProps = React.ComponentPropsWithoutRef<'tr'>;

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { striped, hover, centered, ...props },
  ref
) {
  let className = addClass('table', props.className);

  if (striped) className = addClass(className, 'table-striped');
  if (hover) className = addClass(className, 'table-hover');
  if (centered) className = addClass(className, 'text-center');

  return <table {...props} ref={ref} className={className} />;
});

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead({ headings, headingProps, onHeadingClick, ...props }, ref) {
    return (
      <thead {...props} ref={ref}>
        <tr {...headingProps}>
          {headings.map((h, index) => (
            <th
              key={`heading-${h}-${index}`}
              onClick={onHeadingClick && (() => onHeadingClick(h))}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
);

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody(props, ref) {
    return <tbody {...props} ref={ref} />;
  }
);

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  props,
  ref
) {
  return <tr {...props} ref={ref} />;
});

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
});
