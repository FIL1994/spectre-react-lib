import React, { forwardRef } from 'react';
import { addClass } from '../helpers';
import { hasCompoundChild } from '../internal/hasCompoundChild';
import { hasRenderableContent } from '../internal/hasRenderableContent';

export interface EmptyStateProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
}

export type EmptyStateIconProps = React.ComponentPropsWithoutRef<'div'>;
export type EmptyStateTitleProps = React.ComponentPropsWithoutRef<'p'>;
export type EmptyStateSubtitleProps = React.ComponentPropsWithoutRef<'p'>;
export type EmptyStateActionProps = React.ComponentPropsWithoutRef<'div'>;

const EmptyStateIcon = forwardRef<HTMLDivElement, EmptyStateIconProps>(
  function EmptyStateIcon(props, ref) {
    return <div {...props} ref={ref} className={addClass('empty-icon', props.className)} />;
  }
);

const EmptyStateTitle = forwardRef<HTMLParagraphElement, EmptyStateTitleProps>(
  function EmptyStateTitle(props, ref) {
    return <p {...props} ref={ref} className={addClass('empty-title h5', props.className)} />;
  }
);

const EmptyStateSubtitle = forwardRef<HTMLParagraphElement, EmptyStateSubtitleProps>(
  function EmptyStateSubtitle(props, ref) {
    return <p {...props} ref={ref} className={addClass('empty-subtitle', props.className)} />;
  }
);

const EmptyStateAction = forwardRef<HTMLDivElement, EmptyStateActionProps>(
  function EmptyStateAction(props, ref) {
    return <div {...props} ref={ref} className={addClass('empty-action', props.className)} />;
  }
);

const EmptyStateRoot = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { children, title, subtitle, icon, ...props },
  ref
) {
  const className = addClass('empty', props.className);
  const compound = hasCompoundChild(children, [
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateSubtitle,
    EmptyStateAction,
  ]);

  return (
    <div {...props} ref={ref} className={className}>
      {compound ? (
        children
      ) : (
        <>
          {hasRenderableContent(icon) && <EmptyStateIcon>{icon}</EmptyStateIcon>}
          {hasRenderableContent(title) && <EmptyStateTitle>{title}</EmptyStateTitle>}
          {hasRenderableContent(subtitle) && <EmptyStateSubtitle>{subtitle}</EmptyStateSubtitle>}
          {hasRenderableContent(children) && <EmptyStateAction>{children}</EmptyStateAction>}
        </>
      )}
    </div>
  );
});

/** A placeholder for first use, empty data, and error screens. */
export const EmptyState = Object.assign(EmptyStateRoot, {
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Subtitle: EmptyStateSubtitle,
  Action: EmptyStateAction,
});
