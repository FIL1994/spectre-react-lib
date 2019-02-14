import React from "react";

export interface DividerProps {
  [key: string]: any;
  className?: string;
  size?: string | number;
}

declare const Divider: React.StatelessComponent<DividerProps>;

export default Divider;
