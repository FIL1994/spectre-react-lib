import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';
import 'spectre.css';

const meta = {
  title: 'Divider',
  component: Divider,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
  render(args) {
    return (
      <div
        style={{
          padding: 12,
          borderRadius: 4,
          background: 'grey',
          color: 'white',
        }}
      >
        <Divider {...args} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render() {
    return (
      <div
        style={{
          padding: 12,
          borderRadius: 4,
          background: 'grey',
          color: 'white',
        }}
      >
        12
        <Divider size={12} />
        6
        <Divider size={6} />
        3
        <Divider size={3} />
      </div>
    );
  },
};
