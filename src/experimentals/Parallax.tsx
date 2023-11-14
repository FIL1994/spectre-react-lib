import type React from 'react';
import { addClass, onEnter } from '../helpers';

interface ParallaxProps {
  className?: string;
  title?: string;
  topLeft?: (event: React.SyntheticEvent) => void;
  topRight?: (event: React.SyntheticEvent) => void;
  bottomLeft?: (event: React.SyntheticEvent) => void;
  bottomRight?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
}

/**
 * A hover parallax effect.
 */
export const Parallax = ({
  children,
  title,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  ...props
}: ParallaxProps) => {
  let className = addClass('parallax', props.className);

  return (
    <div {...props} className={className}>
      <div
        className="parallax-top-left"
        role="button"
        tabIndex={0}
        onClick={topLeft}
        onKeyPress={topLeft && onEnter(topLeft)}
      />
      <div
        className="parallax-top-right"
        role="button"
        tabIndex={0}
        onClick={topRight}
        onKeyPress={topRight && onEnter(topRight)}
      />
      <div
        className="parallax-bottom-left"
        role="button"
        tabIndex={0}
        onClick={bottomLeft}
        onKeyPress={bottomLeft && onEnter(bottomLeft)}
      />
      <div
        className="parallax-bottom-right"
        role="button"
        tabIndex={0}
        onClick={bottomRight}
        onKeyPress={bottomRight && onEnter(bottomRight)}
      />
      <div className="parallax-content">
        <div className="parallax-front">
          <h2>{title}</h2>
        </div>
        <div className="parallax-back">{children}</div>
      </div>
    </div>
  );
};
