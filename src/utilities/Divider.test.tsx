import { describe, test, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  test('renders without crashing', () => {
    render(<Divider />);
  });

  test('size prop works', () => {
    const { container } = render(<Divider size="4" />);

    expect(container.querySelector('.col-4')).not.toBeNull();
  });
});
