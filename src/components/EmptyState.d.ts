import * as React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactNode;
}

declare const EmptyState: React.FunctionComponent<Props>;

export default EmptyState;
