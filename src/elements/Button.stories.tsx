import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Elements/Button',
  component: Button,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    children: 'button',
    loading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Primary: Story = {
  args: {
    primary: true,
  },
};

export const Success: Story = {
  args: {
    success: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Sizes: Story = {
  render() {
    return (
      <>
        <Button size={12}>Size 12</Button>

        <Button size={6}>Size 6</Button>
        <Button size={4}>Size 4</Button>
        <Button size={2}>Size 2</Button>

        <Button size={3}>Size 3</Button>
        <Button size={1}>Size 1</Button>
        <Button size={5}>Size 5</Button>
        <Button size={2}>Size 2</Button>
        <Button size={1}>Size 1</Button>
      </>
    );
  },
};

export const Group: Story = {
  render() {
    return (
      <Button.Group>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Button.Group>
    );
  },
};
