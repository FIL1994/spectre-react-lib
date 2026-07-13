import React, { forwardRef } from 'react';
import { addClass } from '../helpers';
import { hasCompoundChild } from '../internal/hasCompoundChild';

export type ParallaxCorner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export type ParallaxControlLabels = Partial<Record<ParallaxCorner, string>>;

export interface ParallaxProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  title?: React.ReactNode;
  topLeft?: (event: React.SyntheticEvent) => void;
  topRight?: (event: React.SyntheticEvent) => void;
  bottomLeft?: (event: React.SyntheticEvent) => void;
  bottomRight?: (event: React.SyntheticEvent) => void;
  controlLabels?: ParallaxControlLabels;
}

export type ParallaxContentProps = React.ComponentPropsWithoutRef<'div'>;
export type ParallaxFrontProps = React.ComponentPropsWithoutRef<'div'>;
export type ParallaxBackProps = React.ComponentPropsWithoutRef<'div'>;

const ParallaxContent = forwardRef<HTMLDivElement, ParallaxContentProps>(
  function ParallaxContent(props, ref) {
    return <div {...props} ref={ref} className={addClass('parallax-content', props.className)} />;
  }
);

const ParallaxFront = forwardRef<HTMLDivElement, ParallaxFrontProps>(
  function ParallaxFront(props, ref) {
    return <div {...props} ref={ref} className={addClass('parallax-front', props.className)} />;
  }
);

const ParallaxBack = forwardRef<HTMLDivElement, ParallaxBackProps>(
  function ParallaxBack(props, ref) {
    return <div {...props} ref={ref} className={addClass('parallax-back', props.className)} />;
  }
);

const defaultLabels: Record<ParallaxCorner, string> = {
  topLeft: 'Parallax top left control',
  topRight: 'Parallax top right control',
  bottomLeft: 'Parallax bottom left control',
  bottomRight: 'Parallax bottom right control',
};

function ParallaxCornerControl({
  corner,
  label,
  onClick,
}: {
  corner: ParallaxCorner;
  label: string;
  onClick?: (event: React.SyntheticEvent) => void;
}) {
  const className = `parallax-${corner.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

  if (!onClick) return <div className={className} aria-hidden="true" />;

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={onClick}
      style={{
        appearance: 'none',
        background: 'transparent',
        border: 0,
        outline: 'revert',
        padding: 0,
      }}
    />
  );
}

const ParallaxRoot = forwardRef<HTMLDivElement, ParallaxProps>(function Parallax(
  { children, title, topLeft, topRight, bottomLeft, bottomRight, controlLabels, ...props },
  ref
) {
  const className = addClass('parallax', props.className);
  const callbacks = { topLeft, topRight, bottomLeft, bottomRight };
  const corners: ParallaxCorner[] = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
  const compound = hasCompoundChild(children, [ParallaxContent]);

  return (
    <div {...props} ref={ref} className={className}>
      {corners.map((corner) => (
        <ParallaxCornerControl
          key={corner}
          corner={corner}
          label={controlLabels?.[corner] ?? defaultLabels[corner]}
          onClick={callbacks[corner]}
        />
      ))}
      {compound ? (
        children
      ) : (
        <ParallaxContent>
          <ParallaxFront>
            <h2>{title}</h2>
          </ParallaxFront>
          <ParallaxBack>{children}</ParallaxBack>
        </ParallaxContent>
      )}
    </div>
  );
});

/** A hover parallax effect requiring Spectre's experimental stylesheet. */
export const Parallax = Object.assign(ParallaxRoot, {
  Content: ParallaxContent,
  Front: ParallaxFront,
  Back: ParallaxBack,
});
