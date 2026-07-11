import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { Page } from './Page';

describe('Page', () => {
  test('retains its legacy classes and supports Container sizing', () => {
    const { getByTestId } = render(
      <Page centered size="lg" className="custom" data-testid="page" />
    );
    const page = getByTestId('page');

    for (const className of ['page', 'container', 'grid-lg', 'centered', 'text-center', 'custom']) {
      expect(page.classList.contains(className)).toBe(true);
    }
  });

  test('forwards native props, events, and its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(<Page ref={ref} data-testid="page" onClick={onClick} />);
    const page = getByTestId('page');

    expect(ref.current === page).toBe(true);
    fireEvent.click(page);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
