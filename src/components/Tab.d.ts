import * as React from "react";
import TabHeading from "./TabHeading";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  block?: boolean;
}

interface TabComponent extends React.FunctionComponent<Props> {
  Heading: typeof TabHeading;
}

declare const Tab: TabComponent;
