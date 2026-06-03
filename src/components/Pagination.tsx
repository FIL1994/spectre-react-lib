import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface PaginationProps
  extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'onClick'> {
  activePage?: number;
  centered?: boolean;
  onClick: (event: React.SyntheticEvent, activePage: number) => void;
  totalPages: number;
}

export const Pagination = forwardRef<HTMLUListElement, PaginationProps>(function Pagination(
  { activePage = 1, totalPages, centered, onClick, ...props },
  ref
) {
  const className = addClass('pagination', props.className);

  const pages = Array.from({ length: Math.ceil(totalPages) });

  const prevEnabled = !(activePage <= 1);
  const nextEnabled = !(activePage >= totalPages);

  const onClickBack = (e: React.SyntheticEvent) => {
    if (prevEnabled) onClick(e, activePage - 1);
  };
  const onClickForward = (e: React.SyntheticEvent) =>
    nextEnabled && onClick(e, activePage + 1);

  const buttonStyle = { cursor: 'pointer' } as const;

  return (
    <ul
      style={centered ? { justifyContent: 'center' } : {}}
      {...props}
      ref={ref}
      className={className}
      aria-label={props['aria-label'] ?? 'Pagination'}
    >
      <li className={`page-item ${prevEnabled ? '' : 'disabled'}`}>
        <button
          type="button"
          className="btn btn-link"
          style={buttonStyle}
          disabled={!prevEnabled}
          aria-disabled={!prevEnabled}
          aria-label="Previous page"
          onClick={onClickBack}
        >
          {'<'}
        </button>
      </li>
      {pages.map((_, index) => {
        const onPageClick = (e: React.SyntheticEvent) => onClick(e, index + 1);
        const pageNumber = index + 1;
        const active = pageNumber === activePage;

        return (
          <li key={pageNumber} className={`page-item ${active ? 'active' : ''}`}>
            <button
              type="button"
              className="btn btn-link"
              style={buttonStyle}
              aria-current={active ? 'page' : undefined}
              aria-label={`Page ${pageNumber}`}
              onClick={onPageClick}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li className={`page-item ${nextEnabled ? '' : 'disabled'}`}>
        <button
          type="button"
          className="btn btn-link"
          style={buttonStyle}
          disabled={!nextEnabled}
          aria-disabled={!nextEnabled}
          aria-label="Next page"
          onClick={onClickForward}
        >
          {'>'}
        </button>
      </li>
    </ul>
  );
});

export default Pagination;
