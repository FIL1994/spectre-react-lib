import React, { forwardRef } from 'react';
import { addClass } from '../helpers';

export interface PaginationBaseProps extends Omit<
  React.ComponentPropsWithoutRef<'ul'>,
  'children' | 'onClick'
> {
  centered?: boolean;
}

export interface PaginationProps extends PaginationBaseProps {
  children?: React.ReactNode;
  totalPages: number;
  activePage?: number;
  siblingCount?: number;
  boundaryCount?: number;
  getHref?(page: number): string;
  onPageChange?(page: number, event: React.MouseEvent<HTMLAnchorElement>): void;
  /** @deprecated Use `onPageChange` instead. */
  onClick?(event: React.SyntheticEvent, activePage: number): void;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  ellipsisLabel?: React.ReactNode;
  previousAriaLabel?: string;
  nextAriaLabel?: string;
  getPageAriaLabel?(page: number, current: boolean): string;
}

export interface PaginationCompositionProps extends PaginationBaseProps {
  children: React.ReactNode;
  totalPages?: never;
}

export type PaginationComponentProps = PaginationProps | PaginationCompositionProps;
export type PaginationPreviousProps = React.ComponentPropsWithoutRef<'li'>;
export type PaginationNextProps = React.ComponentPropsWithoutRef<'li'>;
export type PaginationTitleProps = React.ComponentPropsWithoutRef<'div'>;
export type PaginationSubtitleProps = React.ComponentPropsWithoutRef<'div'>;

type PageToken = number | 'start-ellipsis' | 'end-ellipsis';

const range = (start: number, end: number) =>
  start > end ? [] : Array.from({ length: end - start + 1 }, (_, index) => start + index);

function createPageWindow(
  totalPages: number,
  activePage: number,
  siblingCount: number,
  boundaryCount: number
): PageToken[] {
  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);
  const siblingsStart = Math.max(
    Math.min(activePage - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(activePage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    (endPages[0] ?? totalPages + 1) - 2
  );

  return [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (['start-ellipsis'] as const)
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? (['end-ellipsis'] as const)
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),
    ...endPages,
  ];
}

const PaginationPrevious = forwardRef<HTMLLIElement, PaginationPreviousProps>(
  function PaginationPrevious(props, ref) {
    return <li {...props} ref={ref} className={addClass('page-item page-prev', props.className)} />;
  }
);

const PaginationNext = forwardRef<HTMLLIElement, PaginationNextProps>(
  function PaginationNext(props, ref) {
    return <li {...props} ref={ref} className={addClass('page-item page-next', props.className)} />;
  }
);

const PaginationTitle = forwardRef<HTMLDivElement, PaginationTitleProps>(
  function PaginationTitle(props, ref) {
    return <div {...props} ref={ref} className={addClass('page-item-title h5', props.className)} />;
  }
);

const PaginationSubtitle = forwardRef<HTMLDivElement, PaginationSubtitleProps>(
  function PaginationSubtitle(props, ref) {
    return <div {...props} ref={ref} className={addClass('page-item-subtitle', props.className)} />;
  }
);

interface PaginationRuntimeProps extends PaginationBaseProps {
  children?: React.ReactNode;
  totalPages?: number;
  activePage?: number;
  siblingCount?: number;
  boundaryCount?: number;
  getHref?(page: number): string;
  onPageChange?(page: number, event: React.MouseEvent<HTMLAnchorElement>): void;
  onClick?(event: React.SyntheticEvent, activePage: number): void;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  ellipsisLabel?: React.ReactNode;
  previousAriaLabel?: string;
  nextAriaLabel?: string;
  getPageAriaLabel?(page: number, current: boolean): string;
}

const PaginationRoot = forwardRef<HTMLUListElement, PaginationComponentProps>(function Pagination(
  {
    children,
    totalPages = 0,
    activePage = 1,
    siblingCount = 1,
    boundaryCount = 1,
    centered,
    getHref,
    onPageChange,
    onClick,
    previousLabel = '<',
    nextLabel = '>',
    ellipsisLabel = '…',
    previousAriaLabel = 'Previous page',
    nextAriaLabel = 'Next page',
    getPageAriaLabel = (page) => `Page ${page}`,
    ...props
  }: PaginationRuntimeProps,
  ref
) {
  const className = addClass('pagination', props.className);
  const normalizedTotal = Number.isFinite(totalPages) && totalPages > 0 ? Math.ceil(totalPages) : 0;
  const normalizedActive =
    normalizedTotal === 0
      ? 0
      : Math.min(
          normalizedTotal,
          Math.max(1, Number.isFinite(activePage) ? Math.floor(activePage) : 1)
        );
  const normalizedSiblings = Number.isFinite(siblingCount)
    ? Math.max(0, Math.floor(siblingCount))
    : 1;
  const normalizedBoundaries = Number.isFinite(boundaryCount)
    ? Math.max(0, Math.floor(boundaryCount))
    : 1;
  const tokens = createPageWindow(
    normalizedTotal,
    normalizedActive,
    normalizedSiblings,
    normalizedBoundaries
  );
  const previousEnabled = normalizedActive > 1;
  const nextEnabled = normalizedActive > 0 && normalizedActive < normalizedTotal;
  const style = centered ? { justifyContent: 'center', ...props.style } : props.style;

  const invokePageChange = (event: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    if (!getHref && (onPageChange || onClick)) event.preventDefault();

    if (onPageChange) onPageChange(page, event);
    else onClick?.(event, page);
  };

  const renderControl = (
    enabled: boolean,
    page: number,
    label: React.ReactNode,
    ariaLabel: string
  ) => (
    <li className={addClass('page-item', enabled ? undefined : 'disabled')}>
      <a
        href={enabled ? (getHref?.(page) ?? `#page-${page}`) : undefined}
        role={enabled ? undefined : 'link'}
        aria-disabled={enabled ? undefined : true}
        aria-label={ariaLabel}
        tabIndex={enabled ? undefined : -1}
        onClick={(event) => {
          if (!enabled) {
            event.preventDefault();
            return;
          }
          invokePageChange(event, page);
        }}
      >
        {label}
      </a>
    </li>
  );

  return (
    <ul
      {...props}
      ref={ref}
      style={style}
      className={className}
      aria-label={props['aria-label'] ?? 'Pagination'}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          {renderControl(previousEnabled, normalizedActive - 1, previousLabel, previousAriaLabel)}
          {tokens.map((token) => {
            if (typeof token !== 'number') {
              return (
                <li key={token} className="page-item" aria-hidden="true">
                  <span>{ellipsisLabel}</span>
                </li>
              );
            }

            const current = token === normalizedActive;
            return (
              <li key={token} className={addClass('page-item', current ? 'active' : undefined)}>
                <a
                  href={getHref?.(token) ?? `#page-${token}`}
                  aria-current={current ? 'page' : undefined}
                  aria-label={getPageAriaLabel(token, current)}
                  onClick={(event) => invokePageChange(event, token)}
                >
                  {token}
                </a>
              </li>
            );
          })}
          {renderControl(nextEnabled, normalizedActive + 1, nextLabel, nextAriaLabel)}
        </>
      )}
    </ul>
  );
});

export const Pagination = Object.assign(PaginationRoot, {
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Title: PaginationTitle,
  Subtitle: PaginationSubtitle,
});

export default Pagination;
