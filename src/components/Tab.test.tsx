import { describe, test, expect } from 'bun:test';
import { render } from '@testing-library/react';
import { Tab } from './Tab';

describe('Tab', () => {
  test('renders without crashing', () => {
    render(<Tab />);
  });

  test('props work', () => {
    const { container } = render(<Tab block />);

    expect(container.querySelector('.tab-block')).not.toBeNull();
  });
});
