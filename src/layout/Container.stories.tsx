import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const meta = {
  title: 'Core/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  args: {
    children: 'Container content',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fluid: Story = {};

export const Constrained: Story = {
  args: {
    size: 'md',
  },
};
