import { addClass } from '../helpers';

interface DividerProps {
  className?: string;
  size?: string | number;
}

/**
 * A divider for separating elements.
 */
export const Divider = (props: DividerProps) => {
  let className = addClass('divider', props.className);

  if (props.size !== undefined) {
    className = addClass(
      className,
      `col-${props.size.toString().trim()} centered`
    );
  }

  return <div {...props} className={className} />;
};
