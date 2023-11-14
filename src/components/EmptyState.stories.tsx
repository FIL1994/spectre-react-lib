import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    icon: {
      control: { type: 'text' },
    },
  },
  args: {
    title: 'Title',
    children: 'No results found',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
