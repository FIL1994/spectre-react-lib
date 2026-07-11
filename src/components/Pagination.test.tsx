import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { Pagination } from './Pagination';

const visiblePageNumbers = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLAnchorElement>('a[aria-label^="Page "]')).map(
    (link) => link.textContent
  );

describe('Pagination', () => {
  test('renders every page in a small range with current-page semantics', () => {
    const { container, getByLabelText } = render(<Pagination totalPages={5} activePage={3} />);

    expect(visiblePageNumbers(container)).toEqual(['1', '2', '3', '4', '5']);
    expect(getByLabelText('Page 3').getAttribute('aria-current')).toBe('page');
    expect(container.querySelectorAll('.page-item')).toHaveLength(7);
  });

  test('renders bounded first, middle, and last large-page windows', () => {
    const { container, rerender } = render(<Pagination totalPages={10} activePage={1} />);

    expect(visiblePageNumbers(container)).toEqual(['1', '2', '3', '4', '5', '10']);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);

    rerender(<Pagination totalPages={10} activePage={5} />);
    expect(visiblePageNumbers(container)).toEqual(['1', '4', '5', '6', '10']);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);

    rerender(<Pagination totalPages={10} activePage={10} />);
    expect(visiblePageNumbers(container)).toEqual(['1', '6', '7', '8', '9', '10']);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
  });

  test('keeps very large pagination DOM bounded', () => {
    const { container } = render(<Pagination totalPages={10_000} activePage={5_000} />);

    expect(container.querySelectorAll('.page-item').length).toBeLessThanOrEqual(9);
    expect(visiblePageNumbers(container)).toEqual(['1', '4999', '5000', '5001', '10000']);
  });

  test('supports custom sibling and boundary counts', () => {
    const { container } = render(
      <Pagination totalPages={20} activePage={10} siblingCount={2} boundaryCount={2} />
    );

    expect(visiblePageNumbers(container)).toEqual([
      '1',
      '2',
      '8',
      '9',
      '10',
      '11',
      '12',
      '19',
      '20',
    ]);
  });

  test('normalizes totals and clamps the active page', () => {
    const { container, getByLabelText, rerender } = render(
      <Pagination totalPages={2.2} activePage={99} />
    );

    expect(visiblePageNumbers(container)).toEqual(['1', '2', '3']);
    expect(getByLabelText('Page 3').getAttribute('aria-current')).toBe('page');

    rerender(<Pagination totalPages={Number.POSITIVE_INFINITY} activePage={1} />);
    expect(visiblePageNumbers(container)).toEqual([]);
  });

  test('keeps previous and next links disabled for zero pages', () => {
    const onPageChange = jest.fn();
    const { container, getByLabelText } = render(
      <Pagination totalPages={0} onPageChange={onPageChange} />
    );
    const previous = getByLabelText('Previous page');
    const next = getByLabelText('Next page');

    expect(visiblePageNumbers(container)).toEqual([]);
    for (const control of [previous, next]) {
      expect(control.hasAttribute('href')).toBe(false);
      expect(control.getAttribute('role')).toBe('link');
      expect(control.getAttribute('aria-disabled')).toBe('true');
      expect(control.getAttribute('tabindex')).toBe('-1');
      fireEvent.click(control);
    }
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test('renders one current page with both controls disabled', () => {
    const { container, getByLabelText } = render(<Pagination totalPages={1} />);

    expect(visiblePageNumbers(container)).toEqual(['1']);
    expect(getByLabelText('Page 1').getAttribute('aria-current')).toBe('page');
    expect(getByLabelText('Previous page').getAttribute('aria-disabled')).toBe('true');
    expect(getByLabelText('Next page').getAttribute('aria-disabled')).toBe('true');
  });

  test('disables only unavailable controls on the first and last pages', () => {
    const { getByLabelText, rerender } = render(<Pagination totalPages={3} activePage={1} />);

    expect(getByLabelText('Previous page').hasAttribute('href')).toBe(false);
    expect(getByLabelText('Next page').getAttribute('href')).toBe('#page-2');

    rerender(<Pagination totalPages={3} activePage={3} />);
    expect(getByLabelText('Previous page').getAttribute('href')).toBe('#page-2');
    expect(getByLabelText('Next page').hasAttribute('href')).toBe(false);
  });

  test('uses preferred callbacks without invoking the legacy callback twice', () => {
    const onPageChange = jest.fn();
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <Pagination totalPages={3} activePage={1} onPageChange={onPageChange} onClick={onClick} />
    );

    fireEvent.click(getByLabelText('Page 2'));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange.mock.calls[0]?.[0]).toBe(2);
    expect(onPageChange.mock.calls[0]?.[1].defaultPrevented).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('retains the legacy callback signature', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <Pagination totalPages={3} activePage={2} onClick={onClick} />
    );

    fireEvent.click(getByLabelText('Previous page'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0]?.[1]).toBe(1);
  });

  test('allows fallback fragment navigation when no callback handles the page', () => {
    const { getByLabelText } = render(<Pagination totalPages={3} activePage={1} />);
    const page = getByLabelText('Page 2');
    let clickEvent: MouseEvent | undefined;

    page.addEventListener('click', (event) => {
      clickEvent = event;
    });
    fireEvent.click(page);

    expect(page.getAttribute('href')).toBe('#page-2');
    expect(clickEvent?.defaultPrevented).toBe(false);
  });

  test('provides real hrefs and customizable labels', () => {
    const onPageChange = jest.fn();
    const { getByLabelText, getByText } = render(
      <Pagination
        totalPages={3}
        activePage={2}
        getHref={(page) => `/pages/${page}`}
        onPageChange={onPageChange}
        previousLabel="Back"
        nextLabel="Forward"
        previousAriaLabel="Go back"
        nextAriaLabel="Go forward"
        getPageAriaLabel={(page, current) => `${current ? 'Current' : 'Go to'} ${page}`}
      />
    );

    expect(getByText('Back')).toBeTruthy();
    expect(getByText('Forward')).toBeTruthy();
    expect(getByLabelText('Go back').getAttribute('href')).toBe('/pages/1');
    expect(getByLabelText('Go forward').getAttribute('href')).toBe('/pages/3');
    expect(getByLabelText('Current 2').getAttribute('href')).toBe('/pages/2');

    fireEvent.click(getByLabelText('Go to 3'));
    expect(onPageChange.mock.calls[0]?.[1].defaultPrevented).toBe(false);
  });

  test('supports canonical previous and next composition with refs', () => {
    const previousRef = createRef<HTMLLIElement>();
    const nextRef = createRef<HTMLLIElement>();
    const titleRef = createRef<HTMLDivElement>();
    const subtitleRef = createRef<HTMLDivElement>();
    const { getByText } = render(
      <Pagination aria-label="Guide pages">
        <Pagination.Previous ref={previousRef}>
          <a href="/start">
            <Pagination.Subtitle ref={subtitleRef}>Previous</Pagination.Subtitle>
            <Pagination.Title ref={titleRef}>Getting started</Pagination.Title>
          </a>
        </Pagination.Previous>
        <Pagination.Next ref={nextRef}>
          <a href="/layout">Layout</a>
        </Pagination.Next>
      </Pagination>
    );

    expect(previousRef.current?.className).toBe('page-item page-prev');
    expect(nextRef.current?.className).toBe('page-item page-next');
    expect(titleRef.current?.className).toBe('page-item-title h5');
    expect(subtitleRef.current?.className).toBe('page-item-subtitle');
    expect(getByText('Getting started').closest('a')?.getAttribute('href')).toBe('/start');
  });

  test('children override generated pagination', () => {
    const { queryByLabelText, getByText } = render(
      <Pagination totalPages={10}>
        <li>Custom pagination</li>
      </Pagination>
    );

    expect(getByText('Custom pagination')).toBeTruthy();
    expect(queryByLabelText('Page 1')).toBeNull();
  });

  test('merges centered styles and forwards native props and its ref', () => {
    const ref = createRef<HTMLUListElement>();
    const { getByTestId } = render(
      <Pagination
        ref={ref}
        totalPages={1}
        centered
        style={{ gap: 4, justifyContent: 'flex-end' }}
        className="custom"
        data-testid="pagination"
      />
    );
    const pagination = getByTestId('pagination');

    expect(ref.current === pagination).toBe(true);
    expect(pagination.classList.contains('custom')).toBe(true);
    expect(pagination.style.gap).toBe('4px');
    expect(pagination.style.justifyContent).toBe('flex-end');
  });
});
