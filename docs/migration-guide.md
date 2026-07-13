# Migration guide

## Phase 1 primitive APIs

Phase 1 adds preferred APIs without removing existing `0.x` behavior. Deprecated props continue to work and are planned for removal in `1.0` only.

### Button

Prefer an exclusive `variant` and `controlSize`:

```tsx
<Button variant="primary" controlSize="lg">
  Save
</Button>
```

The `primary`, `success`, `error`, and `link` booleans are deprecated in favor of `variant`. When `variant` is present, it takes precedence over all legacy variant booleans; `variant="default"` explicitly clears them.

The `large` and `small` booleans are deprecated in favor of `controlSize`. When `controlSize` is present, it takes precedence. The legacy numeric/string `size`, `centered`, and `inputGroup` props remain available for compatibility but should be replaced with `Grid`, layout composition, or `className` as appropriate.

New canonical modifiers are `action`, `clear`, and `active`. A loading button sets `aria-busy="true"` unless the consumer supplies an explicit value.

### Table

Prefer semantic compound parts:

```tsx
<Table scrollable>
  <Table.Caption>Results</Table.Caption>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell scope="col">Name</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row active>
      <Table.Cell>Ada</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

`Table.Head headings` and `onHeadingClick` remain supported. Clickable legacy headings now render native buttons so they are keyboard accessible. Compound children take precedence when both forms are supplied.

### Container, Grid, and Page

Use `Container` instead of the noncanonical `Page` helper:

```tsx
<Container size="md">Content</Container>
```

`Page` remains exported and retains its historical `.page.container` classes, `centered` prop, and native props. It is deprecated for removal in `1.0`.

`Grid.Column.width` is now optional, enabling equal-width columns. Preferred widths are numeric values from 1 through 12 or `"auto"`; legacy numeric strings remain accepted. Responsive `xs`, `sm`, `md`, `lg`, and `xl` widths, one-line rows, and auto margins are also supported.

### Divider and Loading

Divider supports horizontal and vertical orientation plus Spectre's `data-content` rendering:

```tsx
<Divider orientation="vertical" content="or" />
```

The grid-oriented `Divider.size` prop is deprecated. Use `Grid.Column` for layout sizing.

Standalone `Loading` now defaults to a named `role="status"`. Use `label` or native ARIA props to provide a contextual accessible name:

```tsx
<Loading label="Saving profile" />
```

### Shape

Historical Shape defaults forced centering, `bg-primary`, and `text-light`. They remain the default during `0.x` for compatibility. New code should opt into canonical mode and compose layout explicitly:

```tsx
<Shape shape="circle" legacyDefaults={false} backgroundColor="success" textColor="light" />
```

Canonical mode restricts background colors to classes that exist in Spectre.css 0.5.9. In particular, `bg-light` does not exist. The legacy mode still accepts `backgroundColor="light"` so existing code continues to compile unchanged.

## Phase 2 component parity

Phase 2 repairs the existing component families while preserving their `0.x` convenience APIs. The changes below intentionally correct invalid, inaccessible, or noncanonical output.

### EmptyState and Panel

Both families now expose canonical compound parts:

```tsx
<EmptyState>
  <EmptyState.Title>No messages</EmptyState.Title>
  <EmptyState.Subtitle>Start a conversation.</EmptyState.Subtitle>
  <EmptyState.Action>Compose</EmptyState.Action>
</EmptyState>

<Panel>
  <Panel.Header>
    <Panel.Title>Account</Panel.Title>
    <Panel.Subtitle>Updated today</Panel.Subtitle>
  </Panel.Header>
  <Panel.Nav aria-label="Account sections">Navigation</Panel.Nav>
  <Panel.Body>Content</Panel.Body>
  <Panel.Footer>Actions</Panel.Footer>
</Panel>
```

The existing `icon`, `title`, `subtitle`, `footer`, and children convenience paths remain supported. Canonical section children take precedence over convenience rendering. Missing sections are no longer emitted as empty wrappers, while valid falsy content such as `0` is preserved.

### Pagination

Large page counts now render a bounded window with ellipses rather than one element per page. Add `getHref` for real navigation and use `onPageChange` for state updates:

```tsx
<Pagination
  totalPages={10_000}
  activePage={page}
  getHref={(nextPage) => `/results?page=${nextPage}`}
  onPageChange={(nextPage) => setPage(nextPage)}
/>
```

The legacy `onClick(event, page)` callback remains supported but is deprecated. If both callbacks are supplied, `onPageChange` takes precedence. Without `getHref`, generated fragment hrefs are retained; their default navigation is prevented when a callback handles the page change and remains available when no callback is supplied.

`Pagination.Previous`, `Pagination.Next`, `Pagination.Title`, and `Pagination.Subtitle` support Spectre's canonical previous/next composition. Disabled controls remain Spectre-compatible anchors but have no `href`, expose `aria-disabled`, and leave the tab order.

### Tab and ControlledTab

Use `Tab.Item`; `Tab.Heading` remains the same runtime component but is deprecated:

```tsx
<Tab>
  <Tab.Item active>
    <a href="/profile">Profile</a>
  </Tab.Item>
  <Tab.Item action>Action</Tab.Item>
</Tab>
```

`ControlledTab` now supports the standard controlled/uncontrolled contract:

```tsx
<ControlledTab
  options={options}
  value={value}
  onValueChange={setValue}
  orientation="horizontal"
  activationMode="manual"
/>
```

Use `defaultValue` instead of the deprecated `defaultActive`. Disabled options, Home/End, orientation-specific arrows, wrapping, automatic/manual activation, stable IDs, and roving focus are supported. A component must not switch between controlled and uncontrolled state during its lifetime.

### Toast

The legacy `primary` prop previously emitted the incorrect `btn-primary` class. It now correctly emits `toast-primary`; this is an intentional visual correction. Prefer `variant`:

```tsx
<Toast variant="error" liveRegion="assertive" onDismiss={dismiss}>
  Saving failed.
</Toast>
```

Supported variants are `default`, `primary`, `success`, `warning`, and `error`. `variant` takes precedence over the deprecated `primary` boolean. Dismissal remains consumer-controlled, and live-region semantics are opt-in through `liveRegion`.

### Parallax

Prefer the experimental entrypoint and compound layers:

```tsx
import { Parallax } from 'spectre-react-lib/experimental';

<Parallax>
  <Parallax.Content>
    <Parallax.Front>Foreground</Parallax.Front>
    <Parallax.Back>Background</Parallax.Back>
  </Parallax.Content>
</Parallax>;
```

The legacy root export, `title`, children, and four corner callback props remain supported. All four CSS corner siblings are still rendered, but a corner is now a focusable button only when its callback exists. This removes four unused tab stops from noninteractive Parallax instances. Load core CSS followed by `spectre-exp.min.css`.
