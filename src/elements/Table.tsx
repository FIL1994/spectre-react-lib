import React from 'react';
import { addClass } from '../helpers';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  striped?: boolean;
  hover?: boolean;
  centered?: boolean;
}

const Table = ({ striped, hover, centered, ...props }: Props) => {
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
};

interface TableHeadProps {
  headings: string[];
  onHeadingClick?(heading: string): void;
  headingProps: object;
}

Table.Head = ({
  headings,
  headingProps,
  onHeadingClick,
  ...props
}: TableHeadProps) => {
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

Table.Body = (props: PropsWithChildren) => <tbody {...props} />;

Table.Row = (props: PropsWithChildren) => <tr {...props} />;

export default Table;
