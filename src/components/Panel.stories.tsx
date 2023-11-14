import type { Meta, StoryObj } from '@storybook/react';
import Panel from './Panel';

const meta = {
  title: 'Panel',
  component: Panel,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    footer: {
      control: { type: 'text' },
    },
  },
  args: {
    title: 'Title',
    footer: 'Footer',
    children: 'content',
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
