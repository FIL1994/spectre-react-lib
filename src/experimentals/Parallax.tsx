import React, { forwardRef } from 'react';
import { addClass, onEnter } from '../helpers';

export interface ParallaxProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  topLeft?: (event: React.SyntheticEvent) => void;
  topRight?: (event: React.SyntheticEvent) => void;
  bottomLeft?: (event: React.SyntheticEvent) => void;
  bottomRight?: (event: React.SyntheticEvent) => void;
}

function ParallaxButton({
  className,
  label,
  onClick,
}: {
  className: string;
  label: string;
  onClick?: (event: React.SyntheticEvent) => void;
}) {
  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onClick={onClick}
      onKeyDown={onClick && onEnter(onClick)}
    />
  );
}

/**
 * A hover parallax effect.
 */
export const Parallax = forwardRef<HTMLDivElement, ParallaxProps>(function Parallax(
  { children, title, topLeft, topRight, bottomLeft, bottomRight, ...props },
  ref
) {
  const className = addClass('parallax', props.className);

  return (
    <div {...props} ref={ref} className={className}>
      <ParallaxButton
        className="parallax-top-left"
        label="Parallax top left control"
        onClick={topLeft}
      />
      <ParallaxButton
        className="parallax-top-right"
        label="Parallax top right control"
        onClick={topRight}
      />
      <ParallaxButton
        className="parallax-bottom-left"
        label="Parallax bottom left control"
        onClick={bottomLeft}
      />
      <ParallaxButton
        className="parallax-bottom-right"
        label="Parallax bottom right control"
        onClick={bottomRight}
      />
      <div className="parallax-content">
        <div className="parallax-front">
          <h2>{title}</h2>
        </div>
        <div className="parallax-back">{children}</div>
      </div>
    </div>
  );
});
