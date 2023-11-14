import { addClass } from '../helpers';

interface Props {
  className?: string;
  centered?: boolean;
}

/** A page for containing elements. */
const Page = ({ centered, ...props }: Props) => {
  
  let className = addClass('page container', props.className);

  if (centered) {
    className = addClass(className, 'centered text-center');
  }

  return <div {...props} className={className} />;
};

export default Page;
