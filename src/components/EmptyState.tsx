import { addClass } from '../helpers';

interface Props {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * A placeholder for first time use, empty data and error screens.
 */
const EmptyState = ({ children, title, icon, ...props }: Props) => {
  let className = addClass('empty', props.className);

  return (
    <div {...props} className={className}>
      {!icon ? '' : <div className="empty-icon">{icon}</div>}
      <div className="empty-title h5">{title}</div>
      <div className="empty-action">{children}</div>
    </div>
  );
};

export default EmptyState;
