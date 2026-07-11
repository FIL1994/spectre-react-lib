import React, { forwardRef } from 'react';
import { addClass } from '../helpers';
import { hasCompoundChild } from '../internal/hasCompoundChild';
import { hasRenderableContent } from '../internal/hasRenderableContent';

export interface PanelProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: React.ReactNode;
  footer?: React.ReactNode;
}

export type PanelHeaderProps = React.ComponentPropsWithoutRef<'div'>;
export type PanelNavProps = React.ComponentPropsWithoutRef<'nav'>;
export type PanelBodyProps = React.ComponentPropsWithoutRef<'div'>;
export type PanelFooterProps = React.ComponentPropsWithoutRef<'div'>;
export type PanelTitleProps = React.ComponentPropsWithoutRef<'div'>;
export type PanelSubtitleProps = React.ComponentPropsWithoutRef<'div'>;

const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(function PanelHeader(props, ref) {
  return <div {...props} ref={ref} className={addClass('panel-header', props.className)} />;
});

const PanelNav = forwardRef<HTMLElement, PanelNavProps>(function PanelNav(props, ref) {
  return <nav {...props} ref={ref} className={addClass('panel-nav', props.className)} />;
});

const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(function PanelBody(props, ref) {
  return <div {...props} ref={ref} className={addClass('panel-body', props.className)} />;
});

const PanelFooter = forwardRef<HTMLDivElement, PanelFooterProps>(function PanelFooter(props, ref) {
  return <div {...props} ref={ref} className={addClass('panel-footer', props.className)} />;
});

const PanelTitle = forwardRef<HTMLDivElement, PanelTitleProps>(function PanelTitle(props, ref) {
  return <div {...props} ref={ref} className={addClass('panel-title', props.className)} />;
});

const PanelSubtitle = forwardRef<HTMLDivElement, PanelSubtitleProps>(
  function PanelSubtitle(props, ref) {
    return <div {...props} ref={ref} className={addClass('panel-subtitle', props.className)} />;
  }
);

const PanelRoot = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { children, title, footer, ...props },
  ref
) {
  const className = addClass('panel', props.className);
  const compound = hasCompoundChild(children, [PanelHeader, PanelNav, PanelBody, PanelFooter]);

  return (
    <div {...props} ref={ref} className={className}>
      {compound ? (
        children
      ) : (
        <>
          {hasRenderableContent(title) && (
            <PanelHeader>
              <PanelTitle>
                <h5>{title}</h5>
              </PanelTitle>
            </PanelHeader>
          )}
          {hasRenderableContent(children) && <PanelBody>{children}</PanelBody>}
          {hasRenderableContent(footer) && <PanelFooter>{footer}</PanelFooter>}
        </>
      )}
    </div>
  );
});

/** A flexible view container with an auto-expand content section. */
export const Panel = Object.assign(PanelRoot, {
  Header: PanelHeader,
  Nav: PanelNav,
  Body: PanelBody,
  Footer: PanelFooter,
  Title: PanelTitle,
  Subtitle: PanelSubtitle,
});
