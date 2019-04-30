import * as React from "react";

export interface PanelProps {
  [key: string]: any;
  className?: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

declare const Panel: React.StatelessComponent<PanelProps>;

export default Panel;
