import { describe, test, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  test('renders without crashing', () => {
    render(<Loading />);
  });

  test('large prop works', () => {
    const { container } = render(<Loading large />);

    expect(container.querySelector('.loading-lg')).not.toBeNull();
  });
});
