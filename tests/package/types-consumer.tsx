import { createRef } from 'react';
import {
  Button,
  Container,
  ControlledTab,
  EmptyState,
  Pagination,
  Panel,
  Shape,
  Tab,
  Table,
  Toast,
  type ShapeProps,
} from 'spectre-react-lib';
import { Parallax } from 'spectre-react-lib/experimental';

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
    <EmptyState title="Empty" subtitle="Nothing here" />
    <Pagination totalPages={10} activePage={5} />
    <Panel>
      <Panel.Body>Body</Panel.Body>
    </Panel>
    <Tab>
      <Tab.Item active />
    </Tab>
    <ControlledTab
      options={[{ label: 'First', value: 'first', render: () => 'Panel' }]}
      defaultValue="first"
    />
    <Toast variant="success" liveRegion="polite" />
    <Parallax>
      <Parallax.Content>
        <Parallax.Front>Front</Parallax.Front>
        <Parallax.Back>Back</Parallax.Back>
      </Parallax.Content>
    </Parallax>
  </Container>
);
