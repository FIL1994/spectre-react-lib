import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { Toast, type ToastVariant } from './Toast';

describe('Toast', () => {
  test('supports every exclusive variant and never emits a button variant', () => {
    const variants: ToastVariant[] = ['default', 'primary', 'success', 'warning', 'error'];

    for (const variant of variants) {
      const { getByTestId, unmount } = render(<Toast variant={variant} data-testid="toast" />);
      const toast = getByTestId('toast');

      expect(toast.classList.contains('toast')).toBe(true);
      expect(toast.classList.contains('btn-primary')).toBe(false);
      expect(toast.classList.contains('toast-primary')).toBe(variant === 'primary');
      expect(toast.classList.contains('toast-success')).toBe(variant === 'success');
      expect(toast.classList.contains('toast-warning')).toBe(variant === 'warning');
      expect(toast.classList.contains('toast-error')).toBe(variant === 'error');
      unmount();
    }
  });

  test('preferred variant overrides the legacy primary prop', () => {
    const { getByTestId } = render(<Toast variant="default" primary data-testid="toast" />);

    expect(getByTestId('toast').classList.contains('toast-primary')).toBe(false);
  });

  test('retains legacy primary and centered behavior', () => {
    const { getByTestId } = render(<Toast primary centered data-testid="toast" />);
    const toast = getByTestId('toast');

    expect(toast.classList.contains('toast-primary')).toBe(true);
    expect(toast.classList.contains('centered')).toBe(true);
    expect(toast.classList.contains('text-center')).toBe(true);
  });

  test('adds a labeled native dismiss button only when requested', () => {
    const onDismiss = jest.fn();
    const { getByRole, rerender, queryByRole } = render(
      <Toast onDismiss={onDismiss} dismissLabel="Close message">
        Message
      </Toast>
    );
    const button = getByRole('button', { name: 'Close message' });

    expect(button.getAttribute('type')).toBe('button');
    expect(button.className).toBe('btn btn-clear float-right');
    fireEvent.click(button);
    expect(onDismiss).toHaveBeenCalledTimes(1);

    rerender(<Toast>Message</Toast>);
    expect(queryByRole('button')).toBeNull();
  });

  test('opts into polite or assertive live-region semantics', () => {
    const { getByTestId, rerender } = render(<Toast liveRegion="polite" data-testid="toast" />);
    let toast = getByTestId('toast');

    expect(toast.getAttribute('role')).toBe('status');
    expect(toast.getAttribute('aria-live')).toBe('polite');
    expect(toast.getAttribute('aria-atomic')).toBe('true');

    rerender(<Toast liveRegion="assertive" data-testid="toast" />);
    toast = getByTestId('toast');
    expect(toast.getAttribute('role')).toBe('alert');
    expect(toast.getAttribute('aria-live')).toBe('assertive');
  });

  test('has no live semantics by default and lets native ARIA props win', () => {
    const { getByTestId, rerender } = render(<Toast data-testid="toast" />);
    let toast = getByTestId('toast');

    expect(toast.hasAttribute('role')).toBe(false);
    expect(toast.hasAttribute('aria-live')).toBe(false);

    rerender(
      <Toast
        liveRegion="polite"
        role="log"
        aria-live="assertive"
        aria-atomic={false}
        data-testid="toast"
      />
    );
    toast = getByTestId('toast');
    expect(toast.getAttribute('role')).toBe('log');
    expect(toast.getAttribute('aria-live')).toBe('assertive');
    expect(toast.getAttribute('aria-atomic')).toBe('false');
  });

  test('forwards native props, classes, events, and its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Toast ref={ref} className="custom" data-testid="toast" onClick={onClick} />
    );
    const toast = getByTestId('toast');

    expect(ref.current === toast).toBe(true);
    expect(toast.classList.contains('custom')).toBe(true);
    fireEvent.click(toast);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
