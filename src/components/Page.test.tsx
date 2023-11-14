import { describe, test, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { Page } from './Page';

describe('Page', () => {
  test('renders without crashing', () => {
    render(<Page />);
  });

  test('props work', () => {
    const { container } = render(<Page centered />);

    expect(container.querySelector('.centered')).not.toBeNull();
  });
});
