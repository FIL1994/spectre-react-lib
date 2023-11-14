import React from 'react';
import { addClass } from '../helpers';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  striped?: boolean;
  hover?: boolean;
  centered?: boolean;
}

export function Table({ striped, hover, centered, ...props }: Props) {
  let className = addClass('table', props.className);

  if (striped) {
    className = addClass(className, 'table-striped');
  }

  if (hover) {
    className = addClass(className, 'table-hover');
  }

  if (centered) {
    className = addClass(className, 'text-center');
  }

  className = addClass(className, props.className);

  return <table {...props} className={className} />;
}

interface TableHeadProps {
  headings: string[];
  onHeadingClick?(heading: string): void;
  headingProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >;
}

Table.Head = function TableHead({
  headings,
  headingProps,
  onHeadingClick,
  ...props
}: TableHeadProps) {
  return (
    <thead {...props}>
      <tr {...headingProps}>
        {headings.map((h, index) => (
          <th
            key={`heading-${h}-${index}`}
            onClick={
              onHeadingClick &&
              (() => {
                onHeadingClick(h);
              })
            }
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
};

interface PropsWithChildren {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

Table.Body = function TableBody(props: PropsWithChildren) {
  return <tbody {...props} />;
};

Table.Row = function TableRow(props: PropsWithChildren) {
  return <tr {...props} />;
};
