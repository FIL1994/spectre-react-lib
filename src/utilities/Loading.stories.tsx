import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta = {
  title: 'Utilities/Loading',
  component: Loading,
  tags: ['autodocs'],
  args: {
    label: 'Loading',
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    large: true,
    label: 'Loading a large result',
  },
};
