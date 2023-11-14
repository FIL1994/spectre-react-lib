import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Pagination',
  component: Pagination,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  args: {
    activePage: 1,
    totalPages: 3,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render(args) {
    return (
      <div style={{ margin: 20 }}>
        <Pagination {...args} />
      </div>
    );
  },
};
