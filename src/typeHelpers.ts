/** HTML tag element string (i.e a, div, table, etc.)  */
export type ElementString = keyof JSX.IntrinsicElements;

/** The React props on a html element */
export type HTMLElementProps<
  Element extends ElementString = "div"
> = JSX.IntrinsicElements[Element];

/** Get the props from a React component or a html element */
export type PropsOrElementProps<Type> = Type extends React.ComponentType
  ? React.ComponentProps<Type>
  : Type extends ElementString
  ? HTMLElementProps<Type>
  : never;

/** Spread the props from a type */
export type SpreadProps<Props> = {
  [P in keyof Props]: Props[P];
};

/** Adds an as prop to the component  */
export type AsComponent<
  ComponentProps,
  Type extends React.ElementType,
  AsProps = PropsOrElementProps<Type>,
  Props = ComponentProps & {
    /**
     * The element type to render as (string or component)
     *
     * As a string:
     * ```jsx
     * <Component as="a" href="google.com" />
     * ```
     *
     * As a component:
     * ```jsx
     * <Component as={Link} to="google.com" />
     * ```
     */
    as?: Type;
  }
> = Props & React.ComponentProps<React.FC> & SpreadProps<AsProps>;
