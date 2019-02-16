import React from "react";

export interface ParallaxProps {
  [key: string]: any;
  className?: string;
  title?: string;
  topLeft?: (event: React.SyntheticEvent<HTMLElement>) => void;
  topRight?: (event: React.SyntheticEvent<HTMLElement>) => void;
  bottomLeft?: (event: React.SyntheticEvent<HTMLElement>) => void;
  bottomRight?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const Parallax: React.StatelessComponent<ParallaxProps>;

export default Parallax;
