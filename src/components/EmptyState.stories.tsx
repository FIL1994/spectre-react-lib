import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../elements/Button';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Core/Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Canonical: Story = {
  render() {
    return (
      <EmptyState>
        <EmptyState.Icon aria-hidden="true">✉️</EmptyState.Icon>
        <EmptyState.Title>No messages</EmptyState.Title>
        <EmptyState.Subtitle>Start a conversation to see it here.</EmptyState.Subtitle>
        <EmptyState.Action>
          <Button variant="primary">Compose</Button>
        </EmptyState.Action>
      </EmptyState>
    );
  },
};

export const Convenience: Story = {
  args: {
    icon: '🔍',
    title: 'No results',
    subtitle: 'Try another search term.',
    children: <Button>Clear search</Button>,
  },
};
