import * as React from "react";

export interface LoadingProps {
  [key: string]: any;
  className?: string;
  large?: boolean;
}

declare const Loading: React.StatelessComponent<LoadingProps>;

export default Loading;
