import React from "react";

export interface ToastProps {
  [key: string]: any;
  className?: string;
  primary?: boolean;
  centered?: boolean;
}

declare const Toast: React.StatelessComponent<ToastProps>;

export default Toast;
