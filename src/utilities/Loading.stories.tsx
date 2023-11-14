import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './Loading';

const meta = {
  title: 'Utilities/Loading',
  component: Loading,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    large: true,
  },
};
