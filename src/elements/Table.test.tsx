import { describe, expect, jest, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Table } from './Table';

describe('Table', () => {
  test('supports canonical structure, modifiers, active rows, and native props', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <Table striped hover centered scrollable className="custom-table" data-testid="table">
        <Table.Caption>Account balances</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell scope="col">Name</Table.HeaderCell>
            <Table.HeaderCell scope="col">Balance</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row active className="custom-row">
            <Table.Cell>Ada</Table.Cell>
            <Table.Cell onClick={onClick}>$10</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    const table = getByRole('table', { name: 'Account balances' });
    const row = getByText('Ada').closest('tr');

    for (const className of [
      'table',
      'table-striped',
      'table-hover',
      'table-scroll',
      'text-center',
      'custom-table',
    ]) {
      expect(table.classList.contains(className)).toBe(true);
    }
    expect(table.getAttribute('data-testid')).toBe('table');
    expect(row?.classList.contains('active')).toBe(true);
    expect(row?.classList.contains('custom-row')).toBe(true);

    fireEvent.click(getByText('$10'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('forwards refs for every table part', () => {
    const tableRef = createRef<HTMLTableElement>();
    const captionRef = createRef<HTMLTableCaptionElement>();
    const headRef = createRef<HTMLTableSectionElement>();
    const bodyRef = createRef<HTMLTableSectionElement>();
    const rowRef = createRef<HTMLTableRowElement>();
    const headerCellRef = createRef<HTMLTableCellElement>();
    const cellRef = createRef<HTMLTableCellElement>();

    render(
      <Table ref={tableRef}>
        <Table.Caption ref={captionRef}>Caption</Table.Caption>
        <Table.Head ref={headRef}>
          <Table.Row>
            <Table.HeaderCell ref={headerCellRef}>Heading</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body ref={bodyRef}>
          <Table.Row ref={rowRef}>
            <Table.Cell ref={cellRef}>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    expect(tableRef.current?.tagName).toBe('TABLE');
    expect(captionRef.current?.tagName).toBe('CAPTION');
    expect(headRef.current?.tagName).toBe('THEAD');
    expect(bodyRef.current?.tagName).toBe('TBODY');
    expect(rowRef.current?.tagName).toBe('TR');
    expect(headerCellRef.current?.tagName).toBe('TH');
    expect(cellRef.current?.tagName).toBe('TD');
  });

  test('retains keyboard-safe legacy sortable headings', async () => {
    const user = userEvent.setup();
    const onHeadingClick = jest.fn();
    const { getByRole } = render(
      <Table>
        <Table.Head
          headings={['Name', 'Balance']}
          headingProps={{ className: 'heading-row' }}
          onHeadingClick={onHeadingClick}
        />
      </Table>
    );
    const nameButton = getByRole('button', { name: 'Name' });
    const nameHeader = getByRole('columnheader', { name: 'Name' });

    expect(nameHeader.getAttribute('scope')).toBe('col');
    expect(nameHeader.parentElement?.classList.contains('heading-row')).toBe(true);

    nameButton.focus();
    await user.keyboard('{Enter}');
    expect(onHeadingClick).toHaveBeenCalledWith('Name');

    await user.click(getByRole('button', { name: 'Balance' }));
    expect(onHeadingClick).toHaveBeenCalledWith('Balance');
    expect(onHeadingClick).toHaveBeenCalledTimes(2);
  });

  test('prefers compound children over legacy headings', () => {
    const { getByText, queryByText } = render(
      <Table>
        <Table.Head headings={['Legacy']}>
          <Table.Row>
            <Table.HeaderCell>Preferred</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
      </Table>
    );

    expect(getByText('Preferred')).toBeTruthy();
    expect(queryByText('Legacy')).toBeNull();
  });
});
