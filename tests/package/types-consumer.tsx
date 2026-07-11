import { createRef } from 'react';
import { Button, Container, Shape, Table, type ShapeProps } from 'spectre-react-lib';

interface WrappedShapeProps extends ShapeProps {
  wrapperName?: string;
}

const buttonRef = createRef<HTMLButtonElement>();
const shapeProps: WrappedShapeProps = { shape: 'circle', wrapperName: 'fixture' };

export const packageTypesFixture = (
  <Container size="md">
    <Button ref={buttonRef} variant="primary" controlSize="lg">
      Save
    </Button>
    <Table scrollable>
      <Table.Body>
        <Table.Row active>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    <Shape {...shapeProps} />
    <Shape shape="rounded" legacyDefaults={false} backgroundColor="success" />
  </Container>
);
