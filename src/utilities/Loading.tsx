import { addClass } from '../helpers';

interface LoadingProps {
  className?: string;
  large?: boolean;
}

/**
 * A loading indicator.
 */
const Loading = ({ large, ...props }: LoadingProps) => {
  let className = 'loading';

  if (large) {
    className = addClass(className, 'loading-lg');
  }

  className = addClass(className, props.className);

  return <div {...props} className={className} />;
};

export default Loading;
