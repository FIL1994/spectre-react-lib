import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Core/Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    totalPages: 10,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledExample({ totalPages = 10 }: { totalPages?: number }) {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      totalPages={totalPages}
      activePage={page}
      onPageChange={setPage}
      aria-label="Example pages"
    />
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const LargeRange: Story = {
  render: () => <ControlledExample totalPages={10_000} />,
};

export const PreviousAndNext: Story = {
  render() {
    return (
      <Pagination aria-label="Documentation pages">
        <Pagination.Previous>
          <a href="#getting-started">
            <Pagination.Subtitle>Previous</Pagination.Subtitle>
            <Pagination.Title>Getting started</Pagination.Title>
          </a>
        </Pagination.Previous>
        <Pagination.Next>
          <a href="#layout">
            <Pagination.Subtitle>Next</Pagination.Subtitle>
            <Pagination.Title>Layout</Pagination.Title>
          </a>
        </Pagination.Next>
      </Pagination>
    );
  },
};
