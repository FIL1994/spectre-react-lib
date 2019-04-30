import * as React from "react";
import { Size } from "../generics";

interface Props {
  className?: string;
  /** An element type to render as (string or function). */
  as?: React.Component | string;
  large?: boolean;
  small?: boolean;
  block?: boolean;
  primary?: boolean;
  success?: boolean;
  error?: boolean;
  link?: boolean;
  loading?: boolean;
  centered?: boolean;
  inputGroup?: boolean;
  disabled?: boolean;
  size?: Size;
}

/** A simple button */
declare const Button: React.FunctionComponent<Props>;

export default Button;
