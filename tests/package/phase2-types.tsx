import { createRef } from 'react';
import {
  ControlledTab,
  EmptyState,
  Pagination,
  Panel,
  Tab,
  Toast,
  type ControlledTabProps,
  type PaginationComponentProps,
  type ToastProps,
} from 'spectre-react-lib';
import { Parallax, type ParallaxControlLabels } from 'spectre-react-lib/experimental';

const listRef = createRef<HTMLUListElement>();
const divRef = createRef<HTMLDivElement>();
const paragraphRef = createRef<HTMLParagraphElement>();

export const preferredPhaseTwoConsumer = (
  <>
    <EmptyState ref={divRef}>
      <EmptyState.Title ref={paragraphRef}>Nothing here</EmptyState.Title>
      <EmptyState.Subtitle>Add the first item.</EmptyState.Subtitle>
      <EmptyState.Action>Add item</EmptyState.Action>
    </EmptyState>
    <Pagination ref={listRef} totalPages={100} activePage={50} onPageChange={() => undefined} />
    <Pagination>
      <Pagination.Previous>
        <a href="/previous">
          <Pagination.Title>Previous</Pagination.Title>
        </a>
      </Pagination.Previous>
    </Pagination>
    <Panel ref={divRef}>
      <Panel.Header>
        <Panel.Title>Title</Panel.Title>
        <Panel.Subtitle>Subtitle</Panel.Subtitle>
      </Panel.Header>
      <Panel.Nav aria-label="Sections">Navigation</Panel.Nav>
      <Panel.Body>Body</Panel.Body>
      <Panel.Footer>Footer</Panel.Footer>
    </Panel>
    <Tab ref={listRef}>
      <Tab.Item active action />
    </Tab>
    <ControlledTab
      ref={listRef}
      options={[
        { label: 'First', value: 'first', render: () => 'First' },
        { label: 'Second', value: 'second', disabled: true, render: () => 'Second' },
      ]}
      value="first"
      onValueChange={() => undefined}
      orientation="vertical"
      activationMode="manual"
      panelProps={{ className: 'panel' }}
    />
    <Toast ref={divRef} variant="error" liveRegion="assertive" onDismiss={() => undefined} />
    <Parallax ref={divRef} controlLabels={{ topLeft: 'Tilt left' }}>
      <Parallax.Content>
        <Parallax.Front>Front</Parallax.Front>
        <Parallax.Back>Back</Parallax.Back>
      </Parallax.Content>
    </Parallax>
  </>
);

// @ts-expect-error ControlledTab orientation is finite.
const invalidOrientation: ControlledTabProps = { options: [], orientation: 'diagonal' };
// @ts-expect-error ControlledTab activation mode is finite.
const invalidActivation: ControlledTabProps = { options: [], activationMode: 'focus' };
// @ts-expect-error Generated Pagination requires a page count.
const invalidPagination: PaginationComponentProps = { activePage: 1 };
// @ts-expect-error Toast variants match Spectre's compiled classes.
const invalidToast: ToastProps = { variant: 'info' };
// @ts-expect-error Parallax labels use only canonical corner names.
const invalidLabels: ParallaxControlLabels = { center: 'Center' };

void invalidOrientation;
void invalidActivation;
void invalidPagination;
void invalidToast;
void invalidLabels;
