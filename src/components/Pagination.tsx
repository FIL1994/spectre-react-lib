import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface PaginationProps extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'onClick'> {
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
    e.preventDefault();
    if (prevEnabled) onClick(e, activePage - 1);
  };
  const onClickForward = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (nextEnabled) onClick(e, activePage + 1);
  };

  return (
    <ul
      style={centered ? { justifyContent: 'center' } : {}}
      {...props}
      ref={ref}
      className={className}
      aria-label={props['aria-label'] ?? 'Pagination'}
    >
      <li className={`page-item ${prevEnabled ? '' : 'disabled'}`}>
        <a
          href={`#page-${activePage - 1}`}
          aria-disabled={!prevEnabled}
          aria-label="Previous page"
          tabIndex={prevEnabled ? undefined : -1}
          onClick={onClickBack}
        >
          {'<'}
        </a>
      </li>
      {pages.map((_, index) => {
        const pageNumber = index + 1;
        const active = pageNumber === activePage;
        const onPageClick = (e: React.SyntheticEvent) => {
          e.preventDefault();
          onClick(e, pageNumber);
        };

        return (
          <li key={pageNumber} className={`page-item ${active ? 'active' : ''}`}>
            <a
              href={`#page-${pageNumber}`}
              aria-current={active ? 'page' : undefined}
              aria-label={`Page ${pageNumber}`}
              onClick={onPageClick}
            >
              {pageNumber}
            </a>
          </li>
        );
      })}
      <li className={`page-item ${nextEnabled ? '' : 'disabled'}`}>
        <a
          href={`#page-${activePage + 1}`}
          aria-disabled={!nextEnabled}
          aria-label="Next page"
          tabIndex={nextEnabled ? undefined : -1}
          onClick={onClickForward}
        >
          {'>'}
        </a>
      </li>
    </ul>
  );
});

export default Pagination;
