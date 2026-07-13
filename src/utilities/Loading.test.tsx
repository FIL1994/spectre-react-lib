import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { Loading } from './Loading';

describe('Loading', () => {
  test('renders a named status by default', () => {
    const { getByRole } = render(<Loading />);
    const loading = getByRole('status', { name: 'Loading' });

    expect(loading.className).toBe('loading');
  });

  test('supports large mode and a custom label', () => {
    const { getByRole } = render(<Loading large label="Saving profile" />);
    const loading = getByRole('status', { name: 'Saving profile' });

    expect(loading.classList.contains('loading-lg')).toBe(true);
  });

  test('supports aria-labelledby without adding a competing label', () => {
    const { getByRole } = render(
      <>
        <span id="loading-label">Uploading</span>
        <Loading aria-labelledby="loading-label" />
      </>
    );
    const loading = getByRole('status', { name: 'Uploading' });

    expect(loading.hasAttribute('aria-label')).toBe(false);
  });

  test('allows explicit roles and labels and forwards native props and its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Loading
        ref={ref}
        role="progressbar"
        aria-label="Explicit"
        className="custom"
        data-testid="loading"
        onClick={onClick}
      />
    );
    const loading = getByTestId('loading');

    expect(ref.current === loading).toBe(true);
    expect(loading.getAttribute('role')).toBe('progressbar');
    expect(loading.getAttribute('aria-label')).toBe('Explicit');
    expect(loading.classList.contains('custom')).toBe(true);
    fireEvent.click(loading);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
