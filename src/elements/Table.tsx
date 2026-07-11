import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  striped?: boolean;
  hover?: boolean;
  centered?: boolean;
  scrollable?: boolean;
}

export interface TableHeadProps extends React.ComponentPropsWithoutRef<'thead'> {
  headings?: readonly string[];
  onHeadingClick?(heading: string): void;
  headingProps?: React.ComponentPropsWithoutRef<'tr'>;
}

export type TableCaptionProps = React.ComponentPropsWithoutRef<'caption'>;
export type TableBodyProps = React.ComponentPropsWithoutRef<'tbody'>;

export interface TableRowProps extends React.ComponentPropsWithoutRef<'tr'> {
  active?: boolean;
}

export type TableHeaderCellProps = React.ComponentPropsWithoutRef<'th'>;
export type TableCellProps = React.ComponentPropsWithoutRef<'td'>;

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function Table(
  { striped, hover, centered, scrollable, ...props },
  ref
) {
  let className = addClass('table', props.className);

  if (striped) className = addClass(className, 'table-striped');
  if (hover) className = addClass(className, 'table-hover');
  if (centered) className = addClass(className, 'text-center');
  if (scrollable) className = addClass(className, 'table-scroll');

  return <table {...props} ref={ref} className={className} />;
});

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(function TableHead(
  { headings = [], headingProps, onHeadingClick, children, ...props },
  ref
) {
  return (
    <thead {...props} ref={ref}>
      {children !== undefined ? (
        children
      ) : (
        <tr {...headingProps}>
          {headings.map((heading, index) => (
            <th key={`heading-${heading}-${index}`} scope="col">
              {onHeadingClick ? (
                <button type="button" onClick={() => onHeadingClick(heading)}>
                  {heading}
                </button>
              ) : (
                heading
              )}
            </th>
          ))}
        </tr>
      )}
    </thead>
  );
});

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption(props, ref) {
    return <caption {...props} ref={ref} />;
  }
);

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody(props, ref) {
    return <tbody {...props} ref={ref} />;
  }
);

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { active, ...props },
  ref
) {
  const className = active ? addClass('active', props.className) : props.className;
  return <tr {...props} ref={ref} className={className} />;
});

const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  function TableHeaderCell(props, ref) {
    return <th {...props} ref={ref} />;
  }
);

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(props, ref) {
  return <td {...props} ref={ref} />;
});

export const Table = Object.assign(TableRoot, {
  Caption: TableCaption,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});
