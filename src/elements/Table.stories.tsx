import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './Button';
import { Table } from './Table';

const meta = {
  title: 'Core/Elements/Table',
  component: Table,
  tags: ['autodocs'],
  args: {
    striped: true,
    hover: true,
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { name: 'Ada Lovelace', role: 'Mathematician' },
  { name: 'Grace Hopper', role: 'Computer scientist' },
  { name: 'Katherine Johnson', role: 'Mathematician' },
];

export const Canonical: Story = {
  render(args) {
    return (
      <Table {...args}>
        <Table.Caption>Project members</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell scope="col">Name</Table.HeaderCell>
            <Table.HeaderCell scope="col">Role</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row, index) => (
            <Table.Row key={row.name} active={index === 1}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

function SortableExample() {
  const [ascending, setAscending] = useState(true);
  const sortedRows = [...rows].sort((first, second) =>
    ascending ? first.name.localeCompare(second.name) : second.name.localeCompare(first.name)
  );

  return (
    <Table scrollable>
      <Table.Caption>Keyboard-safe sortable headings</Table.Caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell scope="col" aria-sort={ascending ? 'ascending' : 'descending'}>
            <Button variant="link" onClick={() => setAscending((value) => !value)}>
              Name
            </Button>
          </Table.HeaderCell>
          <Table.HeaderCell scope="col">Role</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedRows.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export const SortableHeading: Story = {
  render: () => <SortableExample />,
};
