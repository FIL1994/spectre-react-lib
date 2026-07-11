/// <reference lib="dom" />

import { describe, test, expect, jest } from 'bun:test';
import { render, fireEvent, screen } from '@testing-library/react';
import invariant from 'tiny-invariant';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  test('renders without crashing', () => {
    render(<Pagination onClick={jest.fn()} totalPages={3} />);
  });

  test('calls onClick', () => {
    const onClickMock = jest.fn();

    const { getByText, container } = render(
      <Pagination onClick={onClickMock} totalPages={10} activePage={2} centered />
    );

    const page1 = getByText('4');
    fireEvent.click(page1);

    const firstPageItem = container.querySelector('.page-item:first-of-type');
    const lastPageItem = container.querySelector('.page-item:last-of-type');

    invariant(firstPageItem);
    invariant(lastPageItem);

    fireEvent.click(firstPageItem);
    fireEvent.click(lastPageItem);

    expect(onClickMock).toHaveBeenCalled();
  });

  test('handles one page', () => {
    const onClickMock = jest.fn();
    const { container } = render(<Pagination onClick={onClickMock} totalPages={1} centered />);

    screen.getAllByText('1');

    const pageItems = container.querySelectorAll('.page-item');
    expect(pageItems).toHaveLength(3);

    fireEvent.click(pageItems[0]);
    fireEvent.keyPress(pageItems[0], { key: 'Enter', code: 'Enter' });
    fireEvent.click(pageItems[2]);
    fireEvent.keyPress(pageItems[2], { key: 'Enter', code: 'Enter' });

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
