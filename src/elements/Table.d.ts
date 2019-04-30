import * as React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableRow from "./TableRow";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  striped?: boolean;
  hover?: boolean;
  centered?: boolean;
}

/** A table for a data set */
interface TableComponent extends React.FunctionComponent<Props> {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
}

declare const Table: TableComponent;

export default TableComponent;
