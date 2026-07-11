import { createRef } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Loading,
  Page,
  Shape,
  Table,
  type ButtonProps,
  type ContainerProps,
  type GridColumnProps,
  type ShapeComponentProps,
  type ShapeProps,
  type TableCellProps,
  type TableHeaderCellProps,
} from 'spectre-react-lib';

const buttonRef = createRef<HTMLButtonElement>();
const containerRef = createRef<HTMLDivElement>();
const tableRef = createRef<HTMLTableElement>();
const cellRef = createRef<HTMLTableCellElement>();

const buttonProps: ButtonProps = {
  variant: 'success',
  controlSize: 'sm',
  action: true,
  active: true,
  'aria-label': 'Add',
};
const containerProps: ContainerProps = { size: 'lg' };
const columnProps: GridColumnProps = {
  width: 'auto',
  xs: 12,
  sm: 10,
  md: 8,
  lg: 6,
  xl: 4,
  autoMargin: 'both',
};
const headerCellProps: TableHeaderCellProps = { scope: 'col' };
const cellProps: TableCellProps = { colSpan: 2 };
const shapeProps: ShapeComponentProps = {
  shape: 'rounded',
  legacyDefaults: false,
  backgroundColor: 'warning',
  textColor: 'dark',
};

export const preferredPhaseOneConsumer = (
  <Container {...containerProps} ref={containerRef}>
    <Button {...buttonProps} ref={buttonRef}>
      Add
    </Button>
    <Grid oneline>
      <Grid.Column {...columnProps} />
    </Grid>
    <Table ref={tableRef} scrollable>
      <Table.Caption>Data</Table.Caption>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell {...headerCellProps} ref={cellRef}>
            Heading
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row active>
          <Table.Cell {...cellProps} ref={cellRef}>
            Cell
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    <Divider orientation="vertical" content="or" />
    <Loading label="Saving" />
    <Shape {...shapeProps} />
    <Page size="md" />
  </Container>
);

// @ts-expect-error Button variants are intentionally exclusive and finite.
const invalidButton: ButtonProps = { variant: 'warning' };
// @ts-expect-error Container sizes map only to Spectre's compiled max-widths.
const invalidContainer: ContainerProps = { size: '2xl' };
// @ts-expect-error Grid width must match Spectre's 12-column contract.
const invalidColumn: GridColumnProps = { width: 13 };
// @ts-expect-error Spectre 0.5.9 has no bg-light utility in canonical mode.
const invalidShape: ShapeComponentProps = {
  shape: 'circle',
  legacyDefaults: false,
  backgroundColor: 'light',
};

void invalidButton;
void invalidContainer;
void invalidColumn;
void invalidShape;

interface WrappedShapeProps extends ShapeProps {
  wrapperName?: string;
}

const wrappedShapeProps: WrappedShapeProps = {
  shape: 'rounded',
  wrapperName: 'compatible interface extension',
};

void wrappedShapeProps;
