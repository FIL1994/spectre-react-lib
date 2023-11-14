/// <reference lib="dom" />

import { it } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

it('renders', () => {
  render(<EmptyState title="title">child content</EmptyState>);

  screen.getByText('title');
  screen.getByText('child content');
});
