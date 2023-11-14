import { describe, test, expect, jest } from 'bun:test';
import { render, fireEvent } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  test('renders without crashing', () => {
    render(<Table />);
  });

  test('is working', () => {
    const onHeadingClick = jest.fn();

    const { getByText } = render(
      <Table striped hover centered>
        <Table.Head
          headings={['heading', 'heading2']}
          onHeadingClick={onHeadingClick}
        />
        <Table.Body>
          <Table.Row />
        </Table.Body>
      </Table>
    );

    const heading = getByText('heading');
    fireEvent.click(heading);

    expect(onHeadingClick).toHaveBeenCalledTimes(1);

    const heading2 = getByText('heading2');
    fireEvent.click(heading2);

    expect(onHeadingClick).toHaveBeenCalledTimes(2);
  });
});
