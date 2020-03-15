import * as React from "react";
import { Size } from "../generics";
import ButtonGroup from "./ButtonGroup";
import { AsComponent } from "../typeHelpers";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  /** An element type to render as (string or function). */
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

type ButtonProps<Type extends React.ElementType> = AsComponent<Props, Type>;

/** A simple button */
declare function Button<Type extends React.ElementType = "button">(
  props: ButtonProps<Type>
): JSX.Element;

declare namespace Button {
  var Group: typeof ButtonGroup;
}

export { Button };
export default Button;
