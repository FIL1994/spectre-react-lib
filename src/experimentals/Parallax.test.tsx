import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Parallax } from './Parallax';

describe('Parallax', () => {
  test('keeps all four CSS corner siblings inert when callbacks are absent', () => {
    const { container, queryAllByRole } = render(<Parallax title="Title">Back</Parallax>);
    const root = container.querySelector('.parallax');
    const children = Array.from(root?.children ?? []);

    expect(children.map((element) => element.className)).toEqual([
      'parallax-top-left',
      'parallax-top-right',
      'parallax-bottom-left',
      'parallax-bottom-right',
      'parallax-content',
    ]);
    expect(queryAllByRole('button')).toHaveLength(0);
    expect(
      children.slice(0, 4).every((element) => element.getAttribute('aria-hidden') === 'true')
    ).toBe(true);
  });

  test('renders exactly one labeled native button per callback', async () => {
    const user = userEvent.setup();
    const topLeft = jest.fn();
    const { getByRole, queryAllByRole } = render(
      <Parallax topLeft={topLeft} controlLabels={{ topLeft: 'Tilt toward profile' }} />
    );
    const button = getByRole('button', { name: 'Tilt toward profile' });

    expect(queryAllByRole('button')).toHaveLength(1);
    expect(button.getAttribute('type')).toBe('button');
    expect(button.style.outlineStyle).toBe('revert');

    button.focus();
    await user.keyboard('{Enter}');
    expect(topLeft).toHaveBeenCalledTimes(1);
  });

  test('retains all legacy callback names', () => {
    const callbacks = {
      topLeft: jest.fn(),
      topRight: jest.fn(),
      bottomLeft: jest.fn(),
      bottomRight: jest.fn(),
    };
    const { container } = render(<Parallax {...callbacks} />);

    for (const [className, callback] of [
      ['.parallax-top-left', callbacks.topLeft],
      ['.parallax-top-right', callbacks.topRight],
      ['.parallax-bottom-left', callbacks.bottomLeft],
      ['.parallax-bottom-right', callbacks.bottomRight],
    ] as const) {
      const button = container.querySelector(className);
      expect(button?.tagName).toBe('BUTTON');
      if (button) fireEvent.click(button);
      expect(callback).toHaveBeenCalledTimes(1);
    }
  });

  test('preserves convenience front and back rendering', () => {
    const { container, getByText } = render(<Parallax title="Foreground">Background</Parallax>);

    expect(getByText('Foreground').closest('.parallax-front')).not.toBeNull();
    expect(getByText('Background').closest('.parallax-back')).not.toBeNull();
    expect(container.querySelector('.parallax-front h2')?.textContent).toBe('Foreground');
  });

  test('compound content takes precedence over convenience rendering', () => {
    const { container, queryByText, getByText } = render(
      <Parallax title="Ignored title">
        <Parallax.Content className="custom-content">
          <Parallax.Front>Compound front</Parallax.Front>
          <Parallax.Back>Compound back</Parallax.Back>
        </Parallax.Content>
      </Parallax>
    );

    expect(queryByText('Ignored title')).toBeNull();
    expect(getByText('Compound front').closest('.parallax-content')).not.toBeNull();
    expect(getByText('Compound back').closest('.parallax-back')).not.toBeNull();
    expect(
      Array.from(container.querySelector('.parallax')?.children ?? []).map(
        (element) => element.className
      )
    ).toEqual([
      'parallax-top-left',
      'parallax-top-right',
      'parallax-bottom-left',
      'parallax-bottom-right',
      'parallax-content custom-content',
    ]);
  });

  test('forwards root and compound refs, classes, native props, and events', () => {
    const rootRef = createRef<HTMLDivElement>();
    const contentRef = createRef<HTMLDivElement>();
    const frontRef = createRef<HTMLDivElement>();
    const backRef = createRef<HTMLDivElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Parallax ref={rootRef} className="custom-root" data-testid="parallax" onClick={onClick}>
        <Parallax.Content ref={contentRef}>
          <Parallax.Front ref={frontRef}>Front</Parallax.Front>
          <Parallax.Back ref={backRef}>Back</Parallax.Back>
        </Parallax.Content>
      </Parallax>
    );
    const root = getByTestId('parallax');

    expect(rootRef.current === root).toBe(true);
    expect(contentRef.current?.classList.contains('parallax-content')).toBe(true);
    expect(frontRef.current?.classList.contains('parallax-front')).toBe(true);
    expect(backRef.current?.classList.contains('parallax-back')).toBe(true);
    expect(root.classList.contains('custom-root')).toBe(true);
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
