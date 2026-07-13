import { describe, expect, test } from 'bun:test';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Divider } from './Divider';

describe('Divider', () => {
  test('renders a semantic horizontal divider by default', () => {
    const { getByRole } = render(<Divider />);
    const divider = getByRole('separator');

    expect(divider.className).toBe('divider');
    expect(divider.getAttribute('aria-orientation')).toBe('horizontal');
  });

  test('supports vertical orientation and visible CSS content', () => {
    const { getByRole } = render(<Divider orientation="vertical" content="or" />);
    const divider = getByRole('separator', { name: 'or' });

    expect(divider.classList.contains('divider-vert')).toBe(true);
    expect(divider.getAttribute('aria-orientation')).toBe('vertical');
    expect(divider.getAttribute('data-content')).toBe('or');
  });

  test('allows explicit native accessibility and data props to win', () => {
    const { getByRole } = render(
      <Divider
        content="visual"
        role="presentation"
        aria-label="custom label"
        aria-orientation="vertical"
        data-content="custom content"
      />
    );
    const divider = getByRole('presentation');

    expect(divider.getAttribute('aria-label')).toBe('custom label');
    expect(divider.getAttribute('aria-orientation')).toBe('vertical');
    expect(divider.getAttribute('data-content')).toBe('custom content');
  });

  test('retains legacy size and forwards classes and its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Divider ref={ref} size="4" className="custom" data-testid="divider" />
    );
    const divider = getByTestId('divider');

    expect(ref.current === divider).toBe(true);
    expect(divider.classList.contains('col-4')).toBe(true);
    expect(divider.classList.contains('centered')).toBe(true);
    expect(divider.classList.contains('custom')).toBe(true);
  });
});
