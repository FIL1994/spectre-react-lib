import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Utilities/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const WithContent: Story = {
  args: {
    content: 'or',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    content: 'or',
  },
  decorators: [
    (Story) => (
      <div style={{ height: 160, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

/** @deprecated Use Grid.Column for layout sizing. */
export const LegacySize: Story = {
  args: {
    size: 6,
  },
};
