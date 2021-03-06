import * as React from "react";

interface Props {
  className?: string;
  activePage?: number;
  centered?: boolean;
  onClick: (event: React.SyntheticEvent, activePage: number) => void;
  totalPages: number;
}

declare const Pagination: React.FunctionComponent<Props>;

export default Pagination;
