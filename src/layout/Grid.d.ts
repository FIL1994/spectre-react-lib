import React from "react";
import GridColumn from "./GridColumn";

export interface GridProps {
  [key: string]: any;
  className?: string;
  gapless?: boolean;
}

interface GridComponent extends React.StatelessComponent<GridProps> {
  Column: typeof GridColumn;
}

declare const Grid: GridComponent;

export default Grid;
