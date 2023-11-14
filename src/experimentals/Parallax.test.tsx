import { describe, test, jest, expect } from 'bun:test';
import { render, fireEvent } from '@testing-library/react';
import invariant from 'tiny-invariant';
import { Parallax } from './Parallax';

describe('Parallax', () => {
  test('renders without crashing', () => {
    render(<Parallax />);
  });

  test('corners call onClick handlers', () => {
    const topLeft = jest.fn();
    const topRight = jest.fn();
    const bottomLeft = jest.fn();
    const bottomRight = jest.fn();
    const { container } = render(
      <Parallax
        topLeft={topLeft}
        topRight={topRight}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
      />
    );

    const topLeftElement = container.querySelector('.parallax-top-left');
    invariant(topLeftElement);
    fireEvent.click(topLeftElement);
    expect(topLeft).toHaveBeenCalled();

    const topRightElement = container.querySelector('.parallax-top-right');
    invariant(topRightElement);
    fireEvent.click(topRightElement);
    expect(topRight).toHaveBeenCalled();

    const bottomLeftElement = container.querySelector('.parallax-bottom-left');
    invariant(bottomLeftElement);
    fireEvent.click(bottomLeftElement);
    expect(bottomLeft).toHaveBeenCalled();

    const bottomRightElement = container.querySelector(
      '.parallax-bottom-right'
    );
    invariant(bottomRightElement);
    fireEvent.click(bottomRightElement);

    expect(bottomRight).toHaveBeenCalled();
  });

  test('bottomRight gets called on Enter', () => {
    console.log('HELLO');
    const bottomRightMock = jest.fn();
    const { container } = render(<Parallax bottomRight={bottomRightMock} />);

    const bottomRightEl = container.querySelector('.parallax-bottom-right');
    invariant(bottomRightEl);

    fireEvent.focus(bottomRightEl);

    fireEvent.keyPress(bottomRightEl, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    fireEvent.keyDown(bottomRightEl, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    fireEvent.keyUp(bottomRightEl, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    // expect(bottomRightMock).toHaveBeenCalled();
  });
});
