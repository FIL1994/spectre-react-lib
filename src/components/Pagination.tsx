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

interface PaginationControlProps {
  enabled: boolean;
  page: number;
  label: React.ReactNode;
  ariaLabel: string;
  getHref?: PaginationProps['getHref'];
  onSelect(page: number, event: React.MouseEvent<HTMLAnchorElement>): void;
}

function PaginationControl({
  enabled,
  page,
  label,
  ariaLabel,
  getHref,
  onSelect,
}: PaginationControlProps) {
  return (
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
          onSelect(page, event);
        }}
      >
        {label}
      </a>
    </li>
  );
}

interface PaginationItemProps {
  token: PageToken;
  activePage: number;
  ellipsisLabel: React.ReactNode;
  getHref?: PaginationProps['getHref'];
  getPageAriaLabel: NonNullable<PaginationProps['getPageAriaLabel']>;
  onSelect(page: number, event: React.MouseEvent<HTMLAnchorElement>): void;
}

function PaginationItem({
  token,
  activePage,
  ellipsisLabel,
  getHref,
  getPageAriaLabel,
  onSelect,
}: PaginationItemProps) {
  if (typeof token !== 'number') {
    return (
      <li className="page-item" aria-hidden="true">
        <span>{ellipsisLabel}</span>
      </li>
    );
  }

  const current = token === activePage;

  return (
    <li className={addClass('page-item', current ? 'active' : undefined)}>
      <a
        href={getHref?.(token) ?? `#page-${token}`}
        aria-current={current ? 'page' : undefined}
        aria-label={getPageAriaLabel(token, current)}
        onClick={(event) => onSelect(token, event)}
      >
        {token}
      </a>
    </li>
  );
}

interface NormalizedPagination {
  activePage: number;
  nextEnabled: boolean;
  previousEnabled: boolean;
  tokens: PageToken[];
}

function normalizeCount(value: number, fallback: number) {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : fallback;
}

function normalizeTotalPages(totalPages: number) {
  return Number.isFinite(totalPages) && totalPages > 0 ? Math.ceil(totalPages) : 0;
}

function normalizeActivePage(activePage: number, totalPages: number) {
  if (totalPages === 0) return 0;
  const finiteActivePage = Number.isFinite(activePage) ? Math.floor(activePage) : 1;
  return Math.min(totalPages, Math.max(1, finiteActivePage));
}

function normalizePagination(
  totalPages: number,
  activePage: number,
  siblingCount: number,
  boundaryCount: number
): NormalizedPagination {
  const normalizedTotal = normalizeTotalPages(totalPages);
  const normalizedActive = normalizeActivePage(activePage, normalizedTotal);
  const normalizedSiblings = normalizeCount(siblingCount, 1);
  const normalizedBoundaries = normalizeCount(boundaryCount, 1);

  return {
    activePage: normalizedActive,
    previousEnabled: normalizedActive > 1,
    nextEnabled: normalizedActive > 0 && normalizedActive < normalizedTotal,
    tokens: createPageWindow(
      normalizedTotal,
      normalizedActive,
      normalizedSiblings,
      normalizedBoundaries
    ),
  };
}

type PageChangeHandler = (page: number, event: React.MouseEvent<HTMLAnchorElement>) => void;

function createPageChangeHandler(
  getHref: PaginationProps['getHref'],
  onPageChange: PaginationProps['onPageChange'],
  onClick: PaginationProps['onClick']
): PageChangeHandler {
  return (page, event) => {
    if (!getHref && (onPageChange || onClick)) event.preventDefault();
    if (onPageChange) onPageChange(page, event);
    else onClick?.(event, page);
  };
}

interface GeneratedPaginationProps {
  pagination: NormalizedPagination;
  previousLabel: React.ReactNode;
  nextLabel: React.ReactNode;
  ellipsisLabel: React.ReactNode;
  previousAriaLabel: string;
  nextAriaLabel: string;
  getHref: PaginationProps['getHref'];
  getPageAriaLabel: NonNullable<PaginationProps['getPageAriaLabel']>;
  onSelect: PageChangeHandler;
}

function GeneratedPagination({
  pagination,
  previousLabel,
  nextLabel,
  ellipsisLabel,
  previousAriaLabel,
  nextAriaLabel,
  getHref,
  getPageAriaLabel,
  onSelect,
}: GeneratedPaginationProps) {
  return (
    <>
      <PaginationControl
        enabled={pagination.previousEnabled}
        page={pagination.activePage - 1}
        label={previousLabel}
        ariaLabel={previousAriaLabel}
        getHref={getHref}
        onSelect={onSelect}
      />
      {pagination.tokens.map((token) => (
        <PaginationItem
          key={token}
          token={token}
          activePage={pagination.activePage}
          ellipsisLabel={ellipsisLabel}
          getHref={getHref}
          getPageAriaLabel={getPageAriaLabel}
          onSelect={onSelect}
        />
      ))}
      <PaginationControl
        enabled={pagination.nextEnabled}
        page={pagination.activePage + 1}
        label={nextLabel}
        ariaLabel={nextAriaLabel}
        getHref={getHref}
        onSelect={onSelect}
      />
    </>
  );
}

function getPaginationStyle(centered: boolean | undefined, style: React.CSSProperties | undefined) {
  return centered ? { justifyContent: 'center', ...style } : style;
}

function getPaginationAriaLabel(ariaLabel: string | undefined) {
  return ariaLabel ?? 'Pagination';
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
  const pagination = normalizePagination(totalPages, activePage, siblingCount, boundaryCount);
  const style = getPaginationStyle(centered, props.style);
  const onSelect = createPageChangeHandler(getHref, onPageChange, onClick);

  return (
    <ul
      {...props}
      ref={ref}
      style={style}
      className={className}
      aria-label={getPaginationAriaLabel(props['aria-label'])}
    >
      {children !== undefined ? (
        children
      ) : (
        <GeneratedPagination
          pagination={pagination}
          previousLabel={previousLabel}
          nextLabel={nextLabel}
          ellipsisLabel={ellipsisLabel}
          previousAriaLabel={previousAriaLabel}
          nextAriaLabel={nextAriaLabel}
          getHref={getHref}
          getPageAriaLabel={getPageAriaLabel}
          onSelect={onSelect}
        />
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
