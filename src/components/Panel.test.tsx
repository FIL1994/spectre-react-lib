import { describe, test } from 'bun:test';
import { render } from '@testing-library/react';
import { Panel } from './Panel';

describe('Panel', () => {
  test('renders without crashing', () => {
    render(<Panel />);
  });

  test('displays title and footer', () => {
    const { getByText } = render(<Panel title="title" footer="footer" />);

    getByText('title');
    getByText('footer');
  });
});
