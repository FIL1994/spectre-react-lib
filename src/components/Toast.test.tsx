import { describe, test } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  test('renders without crashing', () => {
    render(<Toast />);
  });

  test('works well', () => {
    render(
      <Toast primary centered>
        test
      </Toast>
    );

    screen.getAllByText('test');
  });
});
