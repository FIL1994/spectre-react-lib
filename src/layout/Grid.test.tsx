import { describe, test, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  test('renders without crashing', () => {
    render(<Grid />);
  });

  test('gapless prop works', () => {
    const { container } = render(<Grid gapless />);

    expect(container.querySelector('.col-gapless')).not.toBeNull();
  });

  describe('Column', () => {
    test('renders without crashing', () => {
      render(<Grid.Column width="4" />);
    });
  });
});
