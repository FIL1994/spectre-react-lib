import * as React from "react";

export interface GridColumnProps {
  [key: string]: any;
  className?: string;
  width: string | number;
}

declare const Column: React.StatelessComponent<GridColumnProps>;

export default Column;
