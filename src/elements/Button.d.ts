import * as React from "react";
import { Size } from "../generics";
import ButtonGroup from "./ButtonGroup";

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

interface ButtonComponent extends React.FunctionComponent<Props> {
  Group: typeof ButtonGroup;
}

/** A simple button */
declare const Button: ButtonComponent;

export default Button;
