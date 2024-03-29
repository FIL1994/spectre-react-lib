import { addClass } from '../helpers';
import type { Size } from '../elements/Button';

interface GridProps {
  className?: string;
  gapless?: boolean;
}

export function Grid({ gapless, ...props }: GridProps) {
  let className = addClass('columns', props.className);

  if (gapless) {
    className = addClass(className, 'col-gapless');
  }

  return <div {...props} className={className} />;
}

interface GridColumnProps {
  className?: string;
  width: Size;
}

Grid.Column = function GridColumn({ width, ...props }: GridColumnProps) {
  const className = addClass(`column col-${width}`, props.className);
  return <div {...props} className={className} />;
};
