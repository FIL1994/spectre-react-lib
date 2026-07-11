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
