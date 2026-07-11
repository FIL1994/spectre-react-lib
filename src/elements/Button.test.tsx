import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { Button, type ButtonVariant, type ControlSize } from './Button';

describe('Button', () => {
  test('renders a native button with safe defaults and forwarded props', () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = jest.fn();
    const { getByRole } = render(
      <Button ref={ref} className="custom" data-testid="button" onClick={onClick}>
        Save
      </Button>
    );
    const button = getByRole('button', { name: 'Save' });

    expect(ref.current === button).toBe(true);
    expect(button.getAttribute('type')).toBe('button');
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('custom')).toBe(true);
    expect(button.getAttribute('data-testid')).toBe('button');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('supports every preferred variant', () => {
    const variants: ButtonVariant[] = ['default', 'primary', 'success', 'error', 'link'];

    for (const variant of variants) {
      const { getByRole, unmount } = render(<Button variant={variant}>{variant}</Button>);
      const button = getByRole('button');

      if (variant === 'default') {
        expect(button.className).toBe('btn');
      } else {
        expect(button.classList.contains(`btn-${variant}`)).toBe(true);
      }

      unmount();
    }
  });

  test('supports canonical modifiers and loading semantics', () => {
    const { getByRole } = render(
      <Button action clear active block loading>
        Action
      </Button>
    );
    const button = getByRole('button');

    for (const className of ['btn-action', 'btn-clear', 'active', 'btn-block', 'loading']) {
      expect(button.classList.contains(className)).toBe(true);
    }
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  test('supports preferred control sizes', () => {
    const sizes: Array<[ControlSize, string | undefined]> = [
      ['sm', 'btn-sm'],
      ['md', undefined],
      ['lg', 'btn-lg'],
    ];

    for (const [controlSize, expectedClass] of sizes) {
      const { getByRole, unmount } = render(
        <Button controlSize={controlSize}>{controlSize}</Button>
      );
      const button = getByRole('button');

      expect(button.classList.contains('btn-sm')).toBe(expectedClass === 'btn-sm');
      expect(button.classList.contains('btn-lg')).toBe(expectedClass === 'btn-lg');
      unmount();
    }
  });

  test('preferred variant and size props override legacy booleans', () => {
    const { getByRole } = render(
      <Button variant="default" primary success error link controlSize="md" large small>
        Default
      </Button>
    );
    const button = getByRole('button');

    for (const className of [
      'btn-primary',
      'btn-success',
      'btn-error',
      'btn-link',
      'btn-sm',
      'btn-lg',
    ]) {
      expect(button.classList.contains(className)).toBe(false);
    }
  });

  test('retains legacy modifier behavior', () => {
    const { getByRole } = render(
      <Button large block primary success error link loading centered inputGroup size="4">
        Legacy
      </Button>
    );
    const button = getByRole('button');

    for (const className of [
      'btn-lg',
      'btn-block',
      'btn-primary',
      'btn-success',
      'btn-error',
      'btn-link',
      'loading',
      'centered',
      'text-center',
      'input-group-btn',
      'col-4',
    ]) {
      expect(button.classList.contains(className)).toBe(true);
    }
  });

  test('retains explicit native state props', () => {
    const { getByRole } = render(
      <Button disabled type="submit" tabIndex={3} loading aria-busy={false}>
        Submit
      </Button>
    );
    const button = getByRole('button');

    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.getAttribute('tabindex')).toBe('-1');
    expect(button.getAttribute('type')).toBe('submit');
    expect(button.getAttribute('aria-busy')).toBe('false');
  });

  describe('Group', () => {
    test('renders grouped buttons and forwards its ref', () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <Button.Group ref={ref} block className="custom-group">
          <Button>One</Button>
          <Button>Two</Button>
        </Button.Group>
      );
      const group = container.querySelector('.btn-group');

      expect(group).toBe(ref.current);
      expect(group?.classList.contains('btn-group-block')).toBe(true);
      expect(group?.classList.contains('custom-group')).toBe(true);
      expect(group?.querySelectorAll('button')).toHaveLength(2);
    });
  });
});
