import {
  ControlledTab,
  EmptyState,
  Pagination,
  Panel,
  Parallax,
  Tab,
  Toast,
} from 'spectre-react-lib';

export const legacyPhaseTwoConsumer = (
  <>
    <EmptyState icon="Icon" title="Title">
      Action
    </EmptyState>
    <Pagination totalPages={3} activePage={1} onClick={() => undefined} centered />
    <Panel title="Title" footer="Footer">
      Body
    </Panel>
    <Tab block>
      <Tab.Heading active>
        <a href="#legacy">Legacy heading</a>
      </Tab.Heading>
    </Tab>
    <ControlledTab
      defaultActive="first"
      options={[{ label: 'First', value: 'first', render: () => 'First panel' }]}
    />
    <Toast primary centered>
      Legacy toast
    </Toast>
    <Parallax
      title="Legacy parallax"
      topLeft={() => undefined}
      topRight={() => undefined}
      bottomLeft={() => undefined}
      bottomRight={() => undefined}
    >
      Back layer
    </Parallax>
  </>
);
