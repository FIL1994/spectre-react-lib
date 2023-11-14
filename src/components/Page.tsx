import type React from 'react';
import { addClass } from '../helpers';

interface Props {
  children?: React.ReactNode;
  className?: string;
  centered?: boolean;
}

/** A page for containing elements. */
export const Page = ({ centered, ...props }: Props) => {
  let className = addClass('page container', props.className);

  if (centered) {
    className = addClass(className, 'centered text-center');
  }

  return <div {...props} className={className} />;
};
