import { describe, expect, test } from 'bun:test';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Container, type ContainerSize } from './Container';

describe('Container', () => {
  test('renders the canonical container and forwards native props and its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Container ref={ref} className="custom" data-testid="container" title="Content" />
    );
    const container = getByTestId('container');

    expect(ref.current === container).toBe(true);
    expect(container.className).toBe('container custom');
    expect(container.getAttribute('title')).toBe('Content');
  });

  test('supports every canonical max-width', () => {
    const sizes: ContainerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    for (const size of sizes) {
      const { getByTestId, unmount } = render(<Container size={size} data-testid="container" />);

      expect(getByTestId('container').classList.contains(`grid-${size}`)).toBe(true);
      unmount();
    }
  });
});
