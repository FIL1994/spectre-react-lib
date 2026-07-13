import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { Shape } from './Shape';
import type { BackgroundColor, TextColor } from '../utils';

describe('Shape', () => {
  test('retains historical defaults through the 0.x compatibility mode', () => {
    const { getByTestId } = render(<Shape shape="circle" data-testid="shape" />);
    const shape = getByTestId('shape');

    expect(shape.className).toBe('centered text-center s-circle bg-primary text-light');
  });

  test('canonical mode only applies the requested shape by default', () => {
    const { getByTestId } = render(
      <Shape shape="rounded" legacyDefaults={false} data-testid="shape" />
    );

    expect(getByTestId('shape').className).toBe('s-rounded');
  });

  test('canonical mode supports every valid background color', () => {
    const colors: BackgroundColor[] = [
      'primary',
      'secondary',
      'dark',
      'gray',
      'success',
      'warning',
      'error',
    ];

    for (const backgroundColor of colors) {
      const { getByTestId, unmount } = render(
        <Shape
          shape="circle"
          legacyDefaults={false}
          backgroundColor={backgroundColor}
          data-testid="shape"
        />
      );

      expect(getByTestId('shape').classList.contains(`bg-${backgroundColor}`)).toBe(true);
      unmount();
    }
  });

  test('canonical mode supports every valid text color', () => {
    const colors: TextColor[] = [
      'primary',
      'secondary',
      'dark',
      'gray',
      'success',
      'warning',
      'error',
      'light',
    ];

    for (const textColor of colors) {
      const { getByTestId, unmount } = render(
        <Shape shape="circle" legacyDefaults={false} textColor={textColor} data-testid="shape" />
      );

      expect(getByTestId('shape').classList.contains(`text-${textColor}`)).toBe(true);
      unmount();
    }
  });

  test('retains the historical light background class only in compatibility mode', () => {
    const { getByTestId } = render(
      <Shape shape="rounded" backgroundColor="light" data-testid="shape" />
    );

    expect(getByTestId('shape').classList.contains('bg-light')).toBe(true);
  });

  test('forwards native props, classes, styles, events, and its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Shape
        ref={ref}
        shape="circle"
        legacyDefaults={false}
        className="custom"
        style={{ width: 20 }}
        data-testid="shape"
        onClick={onClick}
      />
    );
    const shape = getByTestId('shape');

    expect(ref.current === shape).toBe(true);
    expect(shape.classList.contains('custom')).toBe(true);
    expect(shape.style.width).toBe('20px');
    fireEvent.click(shape);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
