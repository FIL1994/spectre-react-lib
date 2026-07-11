# Spectre.css Component Coverage Plan

| Field                    | Value               |
| ------------------------ | ------------------- |
| Status                   | In progress         |
| Last updated             | 2026-07-11          |
| React library            | `spectre-react-lib` |
| CSS compatibility target | `spectre.css@0.5.9` |
| Canonical CSS commit     | `8847251`           |

## 1. Executive summary

The library should expand toward complete, useful React coverage of Spectre.css without mechanically wrapping every CSS class. We should:

1. Repair the existing components before adding more public API.
2. Add stable core components in dependency order, beginning with Forms and common composition primitives.
3. Keep icons and experimental components on explicit subpath exports.
4. Prefer semantic native HTML where it already provides correct behavior.
5. Add controlled React behavior where Spectre only supplies visual CSS, especially for Dropdown, Modal, Off-canvas, and Autocomplete.
6. Require tests, Storybook examples, accessibility behavior, public types, and CSS-loading documentation for a family to count as covered.

The work should be delivered as small, independently releasable PRs rather than one large component dump. Existing APIs should remain functional during the `0.x` series; obsolete or cross-concern props should be deprecated and removed only as part of a documented `1.0` migration.

## 2. Source of truth

The ignored local clone in `spectre/` is a reference copy, not a runtime or build dependency. It is identical to the installed package and should not be published.

Use these files as the authoritative compatibility manifests:

| CSS layer      | Canonical manifest               | Consumer stylesheet                      |
| -------------- | -------------------------------- | ---------------------------------------- |
| Stable core    | `spectre/src/spectre.scss`       | `spectre.css/dist/spectre.min.css`       |
| Optional icons | `spectre/src/spectre-icons.scss` | `spectre.css/dist/spectre-icons.min.css` |
| Experimentals  | `spectre/src/spectre-exp.scss`   | `spectre.css/dist/spectre-exp.min.css`   |

The project must continue to build and test against the npm/Bun dependency rather than importing from `spectre/`. Pin the development dependency to exactly `0.5.9` so a future upstream or forked CSS release cannot silently change the class contract.

### Important classification details

- **Dropdown is stable core**, even though the public Spectre documentation presents it alongside Menu.
- **Bar is stable core**, including its custom slider structure.
- **Progress, Meter, Slider, and Timeline are experimental**, despite using common or native HTML concepts.
- Parallax is also experimental and requires `spectre-exp.css`.
- Icons are an independent optional CSS layer.

## 3. Goals

- Cover every meaningful structural family imported by Spectre's core, icon, and experimental manifests.
- Match Spectre.css v0.5.9 markup and modifier classes.
- Make invalid or inaccessible markup harder to produce than valid markup.
- Preserve native React controlled/uncontrolled behavior for form controls.
- Use consistent compound APIs such as `Card.Header`, `Menu.Item`, and `Modal.Body`.
- Forward refs and native DOM props from every public wrapper.
- Preserve custom `className`, `style`, `data-*`, ARIA attributes, and event handlers.
- Keep global CSS loading explicit and free from JavaScript side effects.
- Maintain a visible coverage matrix and a definition of done for every family.
- Keep current public APIs working while adding preferred replacements.

## 4. Non-goals

- Forking, patching, or modernizing Spectre.css itself.
- Automatically injecting global Spectre styles from component modules.
- Bundling a Sass compiler, theme editor, or design-token system.
- Adding a generic utility-prop or `Box` API for every Spectre utility class.
- Building a form state library, data grid, date engine, remote-search client, or carousel autoplay system.
- Reproducing Spectre's historical IE10 browser support; this package currently targets ES2021.
- Making the ignored `spectre/` clone part of CI, package resolution, or the published tarball.
- Claiming full accessibility for CSS structures whose interaction model cannot support it. Those limitations must be documented or replaced with real React behavior.

## 5. What counts as covered

A component family is complete only when all of the following are true:

- [ ] Its canonical structure and supported v0.5.9 modifiers are represented.
- [ ] It uses appropriate semantic HTML.
- [ ] Required interaction and keyboard behavior is implemented.
- [ ] Public root and subcomponent prop types are exported.
- [ ] Refs target the meaningful native element.
- [ ] Native props and custom classes pass through correctly.
- [ ] Unit tests cover structure, modifiers, refs, and prop passthrough.
- [ ] Interaction tests cover controlled and uncontrolled behavior where applicable.
- [ ] Accessibility assertions cover names, roles, states, and relationships.
- [ ] Storybook includes a canonical story and modifier/composition stories.
- [ ] The required CSS layer is documented.
- [ ] Package exports and declaration output are smoke-tested.

Typography, Asian-language text rules, animations, colors, cursors, display, position, spacing, and text helpers should be documented as global class-based coverage. They should not receive arbitrary React wrappers solely to increase a component count.

## 6. Current coverage audit

### 6.1 Existing public families

| Family         | Current file                                          | Current status       | Required work                                                                                                                                                    |
| -------------- | ----------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button         | `src/elements/Button.tsx`                             | Covered (Phase 1)    | Canonical variants, action/clear/active states, control sizes, refs/native props, tests, and compatibility deprecations are complete.                            |
| Table          | `src/elements/Table.tsx`                              | Covered (Phase 1)    | Scrollable tables, semantic compounds, active rows, refs/native props, and keyboard-safe legacy sortable headings are complete.                                  |
| Grid           | `src/layout/Grid.tsx`                                 | Covered (Phase 1)    | Equal/fixed/auto/responsive widths, one-line/gapless rows, auto margins, refs/native props, tests, and canonical stories are complete.                           |
| Page/Container | `src/components/Page.tsx`, `src/layout/Container.tsx` | Covered (Phase 1)    | Canonical Container is available; Page remains as a deprecated, tested compatibility helper through `1.0`.                                                       |
| EmptyState     | `src/components/EmptyState.tsx`                       | Partial              | Add subtitle and canonical compound parts; stop emitting empty sections; preserve convenience props and children-as-actions behavior.                            |
| Pagination     | `src/components/Pagination.tsx`                       | Partial              | Add large-range windowing and ellipses, real/configurable links, current/disabled semantics, preferred callback naming, and canonical previous/next composition. |
| Panel          | `src/components/Panel.tsx`                            | Partial              | Add Header, Nav, Body, Footer, Title, and Subtitle compounds; render valid falsy content; retain convenience props.                                              |
| Tab            | `src/components/Tab.tsx`                              | Partial              | Add action support and preferred `Tab.Item` alias while preserving `Tab.Heading`.                                                                                |
| ControlledTab  | `src/components/ControlledTab.tsx`                    | Partial              | Add true controlled mode, disabled options, orientation, activation mode, stable IDs, and preferred callback names.                                              |
| Toast          | `src/components/Toast.tsx`                            | Buggy/partial        | Fix `primary` from `btn-primary` to `toast-primary`; add success, warning, and error; add optional dismiss and live-region behavior.                             |
| Divider        | `src/utilities/Divider.tsx`                           | Covered (Phase 1)    | Horizontal/vertical orientation, content, separator semantics, refs/native props, and deprecated grid sizing are complete.                                       |
| Loading        | `src/utilities/Loading.tsx`                           | Covered (Phase 1)    | Standalone status/name semantics and Button's distinct loading/busy behavior are tested and documented.                                                          |
| Shape          | `src/utilities/Shape.tsx`                             | Covered (Phase 1)    | Canonical opt-in behavior, valid foreground/background types, refs/native props, and pre-1.0 compatibility defaults are tested and documented.                   |
| Parallax       | `src/experimentals/Parallax.tsx`                      | Partial experimental | Add composable Front/Back/Content parts; avoid four focusable controls unless callbacks exist; document experimental CSS.                                        |

### 6.2 Cross-cutting gaps

- Stories are missing for Tab, ControlledTab, and Parallax.
- Most tests assert class presence only; ref behavior, prop passthrough, controlled state, keyboard behavior, SSR, and package imports have little coverage.
- Browser and automated accessibility test scaffolding remains an open foundation task.
- Happy DOM cannot validate CSS visibility, focus overlays, native control styling, pointer geometry, or responsive layout.

### 6.3 Missing stable core families

#### Elements and layout

- Form
- Label
- Code
- Media
- Hero
- Navbar

Typography and Asian text are global styles rather than component candidates.

#### Components

- Accordion
- Avatar
- Badge
- Breadcrumb
- Bar
- Card
- Chip
- Dropdown
- Menu
- Modal
- Nav
- Popover
- Step
- Tile
- Tooltip

Existing EmptyState, Pagination, Panel, Tab, and Toast need parity work listed above.

#### Optional icons

- Icon, with the canonical v0.5.9 icon-name union and size modifiers.

### 6.4 Missing experimentals

- Autocomplete
- Calendar
- Carousel
- ComparisonSlider
- Filter
- Meter
- OffCanvas
- Progress
- Slider
- Timeline
- Viewer360

Parallax exists but needs repair.

## 7. Public API and implementation conventions

### 7.1 Naming and composition

- Use singular PascalCase roots: `Breadcrumb`, `Step`, `Card`, `Modal`.
- Use namespaced subcomponents for required structure:

  ```tsx
  <Card>
    <Card.Image>{image}</Card.Image>
    <Card.Header>
      <Card.Title>Title</Card.Title>
      <Card.Subtitle>Subtitle</Card.Subtitle>
    </Card.Header>
    <Card.Body>Content</Card.Body>
    <Card.Footer>Actions</Card.Footer>
  </Card>
  ```

- Export each public prop type, including subcomponent prop types.
- Co-locate each family as:

  ```text
  Component.tsx
  Component.test.tsx
  Component.stories.tsx
  ```

- Prefer fixed semantic tags. Add a limited `as` prop only when the visual primitive is genuinely tag-agnostic, such as Label, Badge, Tooltip trigger, or Navbar brand.
- Do not introduce a universal polymorphic component system until it is proven across React 18/19 refs and declaration output.

### 7.2 Props and modifiers

- Use exclusive unions instead of combinations of conflicting booleans:

  ```ts
  type ToastVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
  ```

- Keep existing booleans operational. When a new union and a legacy boolean are both supplied, the preferred union must have documented deterministic precedence.
- Use component-specific types instead of a shared ambiguous `Size` type:
  - `GridWidth = 1 | ... | 12 | 'auto'`
  - `ControlSize = 'sm' | 'md' | 'lg'`
  - `AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'`
- Default action controls to `<button type="button">`.
- Use `<a href>` for navigation rather than button-styled anchors without destinations.
- Never overwrite consumer-provided handlers, data attributes, ARIA attributes, styles, or custom classes without documented composition behavior.

### 7.3 State conventions

Use consistent controlled/uncontrolled contracts:

```ts
interface OpenStateProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}

interface ValueStateProps<Value> {
  value?: Value;
  defaultValue?: Value;
  onValueChange?(value: Value): void;
}
```

- A component is controlled when `open` or `value` is supplied.
- Do not switch silently between controlled and uncontrolled modes.
- Native form controls keep React's native `value/defaultValue`, `checked/defaultChecked`, and change behavior rather than using a library state abstraction.
- Permit explicit IDs and generate IDs only for required associations.
- All ID generation must be SSR/hydration-safe for every advertised React version.

### 7.4 Internal helpers

Add focused internal helpers before many components duplicate behavior:

```text
src/internal/classNames.ts
src/internal/useControllableState.ts
src/internal/useStableId.ts
src/internal/focus.ts
src/internal/events.ts
```

Responsibilities:

- `classNames`: deterministic conditional class joining while retaining consumer classes.
- `useControllableState`: shared open/value contract for non-native widgets.
- `useStableId`: React-version-compatible IDs after the React support decision.
- `focus`: tabbable descendants, initial focus, focus restoration, and containment for Modal/OffCanvas.
- `events`: compose internal and consumer event handlers without firing internal behavior after `preventDefault()`.

Keep these private unless a clear consumer need appears.

## 8. CSS, dependencies, and exports

### 8.1 CSS-loading policy

Component modules must not import global CSS. Consumers load only the layers they use:

```ts
// Required for stable/core components
import 'spectre.css/dist/spectre.min.css';

// Optional when using Icon
import 'spectre.css/dist/spectre-icons.min.css';

// Required in addition to core for experimental components
import 'spectre.css/dist/spectre-exp.min.css';
```

Recommended order: core, icons, experimentals.

Reasons:

- Applications may use a customized Sass build or CDN stylesheet.
- Automatic global imports are surprising for a component library.
- `package.json` declares `sideEffects: false`, so bundlers could remove implicit CSS imports.
- Explicit layers make experimental and icon costs visible.

### 8.2 Dependency policy

In the foundation PR:

1. Pin the development dependency to `spectre.css: "0.5.9"`.
2. Decide whether to add an optional exact peer dependency using `peerDependenciesMeta`.
3. Do not depend on or package the ignored `spectre/` clone.
4. Require a dedicated compatibility audit before supporting any CSS version other than `0.5.9`.

The recommended starting point is an exact development dependency plus explicit documentation. Add an optional peer only if package-manager behavior is verified in tarball fixtures and does not obstruct custom Sass/CDN users.

### 8.3 JavaScript entry points

Target public boundaries:

```ts
import { Button, Card, Form } from 'spectre-react-lib';
import { Icon } from 'spectre-react-lib/icons';
import { Progress, Slider, Timeline } from 'spectre-react-lib/experimental';
```

Policy:

- Stable/core components remain available from the root export.
- `Icon` is exported from `./icons`, not the stable root.
- New experimental families are exported from `./experimental`, not the stable root.
- Keep the existing root `Parallax` export for compatibility; document the experimental subpath as preferred.
- Update `vite.config.ts`, `tsconfig.build.json`, and `package.json` for multi-entry ESM, CJS, and declaration output.
- Add package smoke tests for every public subpath.
- Consider individual stable component subpaths only after category subpaths work reliably; they are not a blocker for component coverage.

## 9. Accessibility and behavior decisions

### 9.1 Native-first components

| Family                   | Decision                                                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Form                     | Render native form controls and preserve native React state behavior. The library supplies structure, classes, labels, hints, and validation relationships only. |
| Accordion                | Use `<details>` and `<summary>`, not hidden checkbox/radio tricks. Add optional controlled `open` support without replacing native keyboard behavior.            |
| Progress                 | Use native `<progress>`; omit `value` for indeterminate state.                                                                                                   |
| Meter                    | Use native `<meter>` and pass through `min`, `max`, `low`, `high`, and `optimum`.                                                                                |
| Experimental Slider      | Use native `<input type="range">`; do not reuse the custom core Bar slider.                                                                                      |
| Breadcrumb/Nav/Step/Menu | Use semantic lists and links/buttons. Do not force application-style ARIA menu roles onto ordinary navigation.                                                   |

### 9.2 React-managed components

| Family       | Decision                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dropdown     | Add controlled/uncontrolled open state. Focus-only CSS is insufficient once focus moves into the menu. Support Escape, outside click, focus return, and opening/focusing from the keyboard. |
| Modal        | Require controlled state, use a portal, apply `.active`, trap/restore focus, handle Escape and overlay dismissal, and expose dialog label/description relationships. Avoid hash `:target`.  |
| Bar.Slider   | Do not publish an inert `role="slider"`. Implement complete keyboard, pointer, clamping, step, disabled, and accessible-value behavior before exposing it.                                  |
| Autocomplete | Implement a real controlled combobox/listbox interaction rather than only styled input/menu markup. Fetching and ranking remain consumer concerns.                                          |
| OffCanvas    | Add controlled state, Escape, overlay dismissal, expanded/controls relationships, and focus return. Reuse Modal infrastructure where appropriate.                                           |

### 9.3 CSS-limited overlays

- **Tooltip:** retain Spectre's hover/focus CSS on the actual focusable trigger. Add an assistive description because `data-tooltip` pseudo-content is not reliably announced. Tooltip text remains a string and does not receive React open state.
- **Popover:** support descriptive, noninteractive content only. Spectre's CSS hover/focus behavior cannot reliably retain focus inside an interactive popover. Direct interactive use cases to Dropdown or Modal.
- **Badge and Avatar initials:** do not rely on generated CSS content as the only accessible text. Provide an assistive DOM equivalent without duplicating speech.

### 9.4 General requirements

- No positive `tabIndex`.
- Icon-only controls require accessible labels.
- Disabled links must not remain activatable.
- Current navigation items use the appropriate `aria-current` value.
- Validation errors associate hints using `aria-describedby` and `aria-invalid`.
- Presence/status indicators have text and do not communicate through color alone.
- Portal/document access must be guarded for SSR.
- Focus restoration must still occur when a trigger unmounts or becomes disabled, with a documented fallback.

## 10. Proposed component APIs

These are direction-setting APIs. Exact names should be finalized in each implementation PR after type and Storybook prototypes.

### 10.1 Existing families

| Family         | Preferred API additions                                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button         | `variant`, `action`, `clear`, `active`; retain `Button.Group`; add a semantic `Button.Anchor` only if consumers need link styling without a broad `as` API. |
| Table          | `scrollable`; `Caption`, `Head`, `Body`, `Row`, `HeaderCell`, `Cell`; `Row.active`; preserve legacy `headings` while allowing children.                     |
| Container/Grid | `Container size`; `Grid oneline`; `Grid.Column width?/xs?/sm?/md?/lg?/xl?`, plus auto margins.                                                              |
| EmptyState     | `subtitle`; `Icon`, `Title`, `Subtitle`, `Action`; retain `title`, `icon`, and children convenience API.                                                    |
| Pagination     | `onPageChange`, `getHref`, `siblingCount`, `boundaryCount`, labels, ellipses; preserve legacy `onClick(event, page)`.                                       |
| Panel          | `Header`, `Nav`, `Body`, `Footer`, `Title`, `Subtitle`; retain convenience props.                                                                           |
| Tab            | `Tab.Item` alias, `action`; retain `Tab.Heading`.                                                                                                           |
| ControlledTab  | `value`, `defaultValue`, `onValueChange`, disabled options, orientation, automatic/manual activation, ID override; deprecate `defaultActive`.               |
| Toast          | `variant`, optional `onDismiss`, `dismissLabel`, and opt-in live-region mode.                                                                               |
| Divider        | `orientation`, `content`; deprecate `size`.                                                                                                                 |
| Loading        | `large`, `label`, standalone status semantics.                                                                                                              |
| Shape          | Canonical shape plus independently valid text/background colors; preserve historical defaults until `1.0`.                                                  |
| Parallax       | `Front`, `Back`, `Content`; keep title and corner callback convenience props.                                                                               |

### 10.2 Stable elements and layout

#### Form

```tsx
<Form onSubmit={handleSubmit}>
  <Form.Group validation="error">
    <Form.Label htmlFor="email">Email</Form.Label>
    <Form.Input id="email" type="email" aria-describedby="email-hint" />
    <Form.Hint id="email-hint">Enter a valid email address.</Form.Hint>
  </Form.Group>
</Form>
```

Planned parts:

- `Form`
- `Form.Fieldset`
- `Form.Group`
- `Form.Label`
- `Form.Input`
- `Form.Textarea`
- `Form.Select`
- `Form.Checkbox`
- `Form.Radio`
- `Form.Switch`
- `Form.Hint`
- `Form.InputGroup`
- `Form.Addon`
- `Form.Icon`

Support control sizes, inline/horizontal layout, input groups, left/right icons, success/error states, disabled/readonly, and checkbox indeterminate state. Do not add schema validation or form value management.

#### Other elements/layout

| Family    | Planned API                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Label     | `variant`, `rounded`, limited `as`.                                                                                                         |
| Code      | `Code.Inline`; `Code.Block language` mapping to semantic `<pre><code>` and Spectre's language label attribute.                              |
| Media     | `Media.Image` with responsive/fit modifiers; `Media.Figure`, `Media.Caption`; responsive video/embed wrapper with `16:9`, `4:3`, and `1:1`. |
| Container | Canonical `.container` wrapper and responsive size modifiers.                                                                               |
| Hero      | `size` accepts `sm`, `md`, or `lg`; `Hero.Body`.                                                                                            |
| Navbar    | Semantic header root; `Navbar.Section`, `Navbar.Center`, `Navbar.Brand`.                                                                    |

### 10.3 Stable components

| Family     | Planned API                                                                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion  | Native details root; `Accordion.Header` summary and `Accordion.Body`; optional `open/defaultOpen/onOpenChange`.                                                      |
| Avatar     | `size`, `src`, `alt`, `initials`; `Avatar.Image`, `Avatar.Icon`, `Avatar.Presence status/label`.                                                                     |
| Badge      | `value` accepts a string or number; `dot`, assistive label, limited `as`.                                                                                            |
| Breadcrumb | List root and `Breadcrumb.Item`; current item supplies `aria-current="page"`.                                                                                        |
| Bar        | `small`, `max`; `Bar.Item value`; segmented bars; later `Bar.Slider`.                                                                                                |
| Card       | `Image`, `Header`, `Title`, `Subtitle`, `Body`, `Footer`.                                                                                                            |
| Chip       | `active`, optional avatar/content, `onRemove`, required/default remove label, native clear button.                                                                   |
| Menu       | `nav`; `Menu.Item active`, `Menu.Badge`, `Menu.Divider`; semantic list by default.                                                                                   |
| Dropdown   | `open/defaultOpen/onOpenChange`, `align`; `Dropdown.Trigger`, `Dropdown.Menu`.                                                                                       |
| Modal      | Required controlled `open/onOpenChange`; `size`, `fullHeight`, dismissal/focus options, portal container; `Container`, `Header`, `Title`, `Body`, `Footer`, `Close`. |
| Nav        | Nested semantic list with `Nav.Item active/current`.                                                                                                                 |
| Popover    | `placement`; `Popover.Trigger`, `Popover.Content`; descriptive content only.                                                                                         |
| Step       | Ordered-list root and `Step.Item active/current`; consumers provide links or buttons.                                                                                |
| Tile       | `centered`; `Icon`, `Content`, `Title`, `Subtitle`, `Action`.                                                                                                        |
| Tooltip    | Focusable/polymorphic trigger, string `content`, `placement`, generated descriptor ID.                                                                               |
| Icon       | Typed canonical name union; `size` accepts 1 through 4; decorative by default and named only when a label is supplied.                                               |

### 10.4 Experimentals

| Family           | Planned boundary                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Progress         | Thin native `<progress>` wrapper; require an accessible name.                                                                                                                   |
| Meter            | Thin native `<meter>` wrapper.                                                                                                                                                  |
| Slider           | Native range input with optional Spectre tooltip text.                                                                                                                          |
| Timeline         | `Item`, `Left`, `Icon`, `Content`; semantic ordered sequence and `<time>` examples.                                                                                             |
| Autocomplete     | Generic controlled multiselect combobox with options, selected values, input value, render/label functions, loading and disabled states; no fetching.                           |
| Calendar         | Presentational `Nav`, `Header`, `Body`, `Date`, `Events`, and `Event` shell; consumer owns date math/selection unless a full keyboard date-grid project is separately approved. |
| Filter           | Controlled/native radio selection with `Option`, `Body`, `Item`, and tags; document compiled limit.                                                                             |
| Carousel         | Controlled/uncontrolled selected slide, previous/next controls, and slide status; no autoplay initially.                                                                        |
| ComparisonSlider | Controlled percentage backed by a native range input; reflect width into Spectre's before/after structure.                                                                      |
| OffCanvas        | Controlled drawer with `Toggle`, `Sidebar`, `Overlay`, and `Content`; Escape and focus return.                                                                                  |
| Viewer360        | Native range input plus sprite; controlled frame and accessible label; document fixed frame count.                                                                              |
| Parallax         | Existing family with the revised compound API and experimental stylesheet requirement.                                                                                          |

## 11. Delivery phases

Each phase should have one primary concern, pass CI independently, and be releasable. Avoid combining unrelated component families merely to reduce PR count.

### Phase 0 — Contract and test foundation

**Suggested branch:** `chore/component-foundation`

**Scope**

- Add this plan and a maintained coverage matrix.
- Pin CSS compatibility and document explicit CSS loading.
- Resolve React 17 support versus `useId`.
- Add internal class/state/ID/focus/event helpers.
- Establish root, icons, and experimental entrypoint build tests.
- Add browser and automated accessibility test scaffolding.

**Likely files**

- `package.json`
- `bun.lockb`
- `vite.config.ts`
- `tsconfig.build.json`
- `.storybook/main.ts`
- `.storybook/preview.ts`
- `README.md`
- `src/internal/*`
- package/SSR/browser test configuration

**Decisions to close**

1. Recommended: change the peer range to React 18/19 in a documented `0.7.0` prerelease rather than create an unproven React 17 ID fallback.
2. Verify whether `spectre.css` should be an optional exact peer or documented exact external dependency.
3. Choose Playwright plus `@axe-core/playwright`, or an equivalent browser/a11y stack.

**Acceptance criteria**

- Component modules import no CSS.
- README demonstrates all three CSS layers.
- ESM and CJS root imports still work.
- Icons and experimental subpath entry points build and produce declarations.
- SSR can import the package without `document` access.
- Every advertised React major has a package/runtime fixture, or the unsupported major is removed.

### Phase 1 — Existing primitives, layout, and utilities

**Suggested branch:** `fix/core-primitive-parity`

**Status:** Complete

**Scope**

- Button
- Table
- Container and Grid
- Legacy Page
- Divider
- Loading
- Shape

**Key work**

- Introduce component-specific modifier types.
- Preserve and deprecate cross-concern props rather than deleting them.
- Add missing stories and ref/prop-passthrough tests.
- Ensure canonical Grid examples support equal, fixed, auto, responsive, gapless, one-line, nested, and auto-margin columns.

**Acceptance criteria**

- Every canonical modifier has a class-contract test.
- Equal-width `Grid.Column` no longer requires `width`.
- Table heading interactions use a native focusable control.
- Legacy prop type fixtures compile unchanged.
- Deprecations appear in generated declarations/JSDoc.
- No current root export is removed.

### Phase 2 — Existing component parity

**Suggested branch:** `fix/core-component-parity`

**Scope**

- EmptyState
- Pagination
- Panel
- Tab and ControlledTab
- Toast
- Parallax

**Key work**

- Correct Toast classes and add all variants.
- Add canonical compound structures while preserving convenience rendering.
- Add true controlled tabs and complete keyboard behavior.
- Make Pagination scale to large page counts.
- Remove unused Parallax tab stops and add compound composition.

**Acceptance criteria**

- Toast never emits `btn-primary` for its variant.
- EmptyState/Panel omit absent sections and support all canonical sections.
- ControlledTab tests cover click, arrows, Home/End, disabled tabs, controlled state, and manual activation.
- Pagination tests cover zero, one, first, middle, last, and large page sets.
- Parallax has an experimental CSS story and only interactive controls are focusable.
- Every currently exported family has a unit test and Storybook story.

### Phase 3 — Forms, labels, code, media, and icons

**Suggested branch:** `feat/core-elements`

**Scope**

- Form family
- Label
- Code
- Media
- Icon subpath

Forms may be split into two PRs if review size becomes excessive: basic native controls first, then groups/layout/icons/validation.

**Dependency**

- Phase 0 internal helpers
- Phase 1 Grid for horizontal form stories

**Acceptance criteria**

- Stories cover input, textarea, select, checkbox, radio, switch, sizes, inline/horizontal layout, input groups, icons, validation, disabled, readonly, and indeterminate states.
- Labels, controls, hints, and errors have correct ID relationships.
- Controls work in both native React controlled and uncontrolled modes.
- `Form` contains no form-state or schema dependency.
- Icon tests enumerate every canonical v0.5.9 name.
- The icons subpath package test passes without adding Icon to the root export.

### Phase 4 — Static core content and layout

**Suggested branch:** `feat/core-content-components`

**Scope**

- Hero
- Navbar
- Avatar
- Badge
- Card
- Chip
- Tile

**Acceptance criteria**

- Canonical structures and modifiers are represented in stories and DOM tests.
- Avatar image, initials, icon, and presence combinations are covered.
- Badge generated content has an assistive equivalent.
- Chip dismissal uses a labeled native button.
- Card and Tile parts accept arbitrary valid React content without hard-coded headings.
- No component requires icon CSS for its basic rendering.

### Phase 5 — Disclosure, navigation, menus, and static Bar

**Suggested branch:** `feat/core-navigation-components`

**Scope**

- Accordion
- Breadcrumb
- Nav
- Step
- Menu
- Bar and Bar.Item

**Acceptance criteria**

- Accordion uses details/summary and retains native keyboard behavior.
- Navigation families use valid list nesting and real links/buttons.
- Current items expose the correct `aria-current` state.
- Menu supports links, controls, badges, and valid divider markup without forcing `role="menu"`.
- Bar supports small, single, and segmented values, clamps invalid values, and exposes value metadata.
- Bar is marked core-complete except for the interactive slider subpart.

### Phase 6 — Core Dropdown and Bar.Slider interactions

**Suggested branch:** `feat/core-interactions`

**Scope**

- Dropdown
- Bar.Slider

These belong to core CSS but require substantially more interaction testing than static wrappers.

**Acceptance criteria**

- Dropdown supports controlled/uncontrolled state, trigger adjacency required by CSS, right alignment, outside click, Escape, focus movement, and focus return.
- Dropdown remains usable with ordinary list/link semantics and does not require application-menu ARIA roles.
- Bar.Slider supports one/two handles, arrows, Home/End, PageUp/PageDown, step/clamping, pointer drag, disabled state, and accessible value text.
- Browser tests verify `.active` visibility and pointer geometry.
- Experimental native Slider remains a separate component and CSS layer.

### Phase 7 — Core overlays

**Suggested branch:** `feat/core-overlays`

**Scope**

- Modal
- Tooltip
- Popover

**Acceptance criteria**

- Modal tests cover portal rendering, initial focus, focus containment, Escape, overlay close, close button, focus restoration, labels/descriptions, stacked scroll-lock accounting, and SSR-safe access.
- Tooltip is discoverable by pointer and keyboard focus and supplies an assistive description.
- Tooltip does not create an extra tab stop solely for styling.
- Popover stories contain no interactive descendants.
- Documentation directs interactive popover use cases to Dropdown or Modal.
- Every structural family in the stable core manifest is now accounted for.

### Phase 8 — Native and structural experimentals

**Suggested branch:** `feat/experimental-native-components`

**Scope**

- Progress
- Meter
- Slider
- Timeline

**Acceptance criteria**

- Components export only through `spectre-react-lib/experimental`.
- Native attributes, events, and refs pass through unchanged.
- Progress indeterminate behavior comes from an omitted `value`.
- Slider retains native keyboard behavior and synchronizes the attribute required by Spectre's tooltip CSS.
- Chromium, Firefox, and WebKit visual/interaction checks cover native controls.

### Phase 9 — Data-oriented experimentals

**Suggested branch:** `feat/experimental-data-components`

**Scope**

- Autocomplete
- Calendar
- Filter

**Dependencies**

- Form
- Chip
- Menu
- Tile
- Avatar
- controlled-state and ID helpers

**Acceptance criteria**

- Autocomplete follows the combobox/listbox pattern with active descendant, arrows, Enter, Escape, chip removal, disabled options, and controlled state.
- Autocomplete does not own network fetching, ranking, or caching.
- Calendar is explicitly presented as a display/composition shell unless complete date-grid keyboard semantics are implemented.
- Filter uses collision-safe radio IDs and controlled/uncontrolled selection.
- Compiled tag-count limitations are documented and tested.

### Phase 10 — Media/navigation experimentals

**Suggested branch:** `feat/experimental-media-components`

**Scope**

- Carousel
- ComparisonSlider
- OffCanvas
- Viewer360

**Acceptance criteria**

- Carousel has named previous/next controls, selected-slide state, slide count/status, and no autoplay by default.
- ComparisonSlider has a native range keyboard equivalent and synchronized visual percentage.
- OffCanvas supports controlled state, Escape, overlay dismissal, expanded/controls associations, and focus return.
- Viewer360 keeps the range value/frame synchronized and has an accessible label.
- Fixed Sass compilation limits are documented.
- All families in `spectre-exp.scss`, including repaired Parallax, are accounted for.

### Phase 11 — Coverage closeout and stable release

**Suggested branch:** `chore/component-coverage-closeout`

**Scope**

- Audit all three canonical manifests against the coverage matrix.
- Finish migration and CSS-loading documentation.
- Validate all package formats/subpaths and the generated tarball.
- Run consumer fixtures before promoting the release.

**Acceptance criteria**

- No unaccounted structural family remains.
- Root, icons, and experimental ESM/CJS/type imports pass.
- The package tarball excludes `spectre/`, Storybook output, tests, and development-only files.
- SSR/hydration and all advertised React-version fixtures pass.
- Browser and axe checks pass for every canonical story, with any upstream CSS limitation explicitly documented.
- A prerelease has received consumer feedback for Forms, Dropdown, Modal, and Autocomplete before a stable release.

## 12. Dependency order

```text
Foundation helpers and package exports
├── Existing parity
├── Grid/Container
│   └── Horizontal Forms and responsive stories
├── Form + Chip + Menu + Tile + Avatar
│   └── Autocomplete
├── Menu
│   └── Dropdown
│       └── Interactive-popover guidance
├── Card
│   └── Popover examples
├── Modal focus/dismiss infrastructure
│   └── OffCanvas
├── Static Bar
│   └── Bar.Slider
└── Experimental native Slider
    ├── ComparisonSlider
    └── Viewer360
```

Additional constraints:

- Core Bar must not import experimental Slider.
- Icons remain optional; no stable component may require them.
- Browser pointer tests must exist before Bar.Slider or ComparisonSlider ships.
- Portal/focus utilities must be proven by Modal before OffCanvas reuses them.
- Calendar date math and Autocomplete fetching remain outside this dependency graph.

## 13. Testing strategy

### 13.1 Unit and DOM contract tests

Use Bun plus Testing Library for:

- Default tag and class.
- Every supported modifier.
- Custom class merging.
- Native prop/event passthrough.
- Ref target.
- Compound structure and valid DOM nesting.
- Controlled/uncontrolled transitions.
- ID and ARIA relationships.
- Edge values, clamping, disabled state, and absent optional sections.

Prefer `user-event` for user behavior. Use `fireEvent` only when simulating a low-level event that `user-event` cannot express. Avoid broad snapshots; assert semantic output and class contracts directly.

### 13.2 Keyboard interaction tests

Required for:

- ControlledTab
- Dropdown
- Modal
- Accordion
- Bar.Slider
- Autocomplete
- Carousel
- OffCanvas

Each keyboard test must include focus location and state changes, not only callback invocation.

### 13.3 Accessibility automation

- Add Storybook accessibility checks or Playwright plus axe for every canonical story.
- Assert accessible name, role, state, and relationships in unit tests.
- Treat accessibility failures as CI failures unless the limitation is in upstream Spectre CSS and documented with a focused exception.
- Do not suppress duplicate-ID, invalid-nesting, or missing-label failures globally.

### 13.4 Browser tests

Happy DOM is insufficient for:

- CSS-driven visibility.
- Portals and real focus containment.
- Pointer dragging and geometry.
- Responsive Grid/OffCanvas behavior.
- Native progress, meter, and range rendering.

Use Playwright or equivalent:

- Chromium for every interactive family.
- Firefox and WebKit for native Progress, Meter, and Slider.
- Mobile viewport coverage for Grid, Dropdown, Modal, Navbar, and OffCanvas.

### 13.5 Type tests

Add compile-only fixtures that verify:

- Valid native props are accepted.
- Ref types match rendered elements.
- Compound prop types are exported.
- Invalid variants and incompatible props fail with `@ts-expect-error`.
- Required labels/state callbacks are represented where the API requires them.
- Existing consumer examples continue to compile during the deprecation window.

### 13.6 Package and SSR tests

Test the built package, not only source modules:

- Root ESM import.
- Root CommonJS require.
- Icons subpath ESM/CJS/types.
- Experimental subpath ESM/CJS/types.
- Tree-shaking/no automatic CSS side effects.
- Generated declaration maps.
- npm/Bun tarball contents.
- Import and server render without `window` or `document`.
- Hydration with generated IDs.

### 13.7 Proposed CI commands

The exact tools are a Phase 0 decision, but the intended split is:

```jsonc
{
  "test": "bun test --coverage",
  "test:types": "tsc --project <type-test-config>",
  "test:package": "<build-and-import-fixtures>",
  "test:browser": "playwright test",
  "test:a11y": "<storybook-or-playwright-axe-checks>",
  "ci": "format + lint + tsc + unit + package + browser + build + storybook + audit",
}
```

## 14. Storybook and documentation

### 14.1 Story organization

Organize stories under:

```text
Core/Elements
Core/Layout
Core/Components
Utilities
Icons
Experimental
```

Every family should include, where applicable:

- Basic canonical markup.
- All modifiers.
- Compound composition.
- Disabled/loading/empty/error states.
- Responsive example.
- Controlled and uncontrolled examples.
- Keyboard interaction `play` test.
- CSS-layer note.

Storybook may load all three stylesheets in canonical order for demonstration, but stories and docs must clearly label which layer a consumer actually needs. Package tests remain responsible for proving that JavaScript does not inject CSS.

### 14.2 README and migration docs

Update `README.md` with:

- Installation of the React package and compatible `spectre.css@0.5.9`.
- Core, icon, and experimental CSS import examples.
- Stable, icon, and experimental JavaScript import examples.
- A statement that the React package does not inject styles.
- Links to Storybook and the coverage matrix.

Add migration documentation for:

- Toast's corrected class and visual change.
- Button legacy booleans and numeric grid `size`.
- Divider `size`.
- Page to Container.
- `ControlledTab.defaultActive` to `defaultValue`.
- Root Parallax to the preferred experimental subpath.
- Any React peer-range change.

### 14.3 Fixed Spectre compilation limits

Document limits that come from v0.5.9's compiled CSS rather than React:

- Carousel supports eight compiled slide selectors.
- Filter supports eight compiled tag selectors.
- Viewer360's default sprite contract uses 36 frames.

Do not silently generate unsupported markup beyond those limits. Either validate and warn/throw in development or document a custom Sass requirement, depending on the family.

## 15. Backwards compatibility and releases

### 15.1 Compatibility rules

- Preserve every current named root export, including Parallax.
- Keep current compound names and add aliases instead of renaming immediately, such as `Tab.Item` alongside `Tab.Heading`.
- Preserve current callbacks while adding preferred callbacks with clearer names.
- Preserve convenience rendering paths even when compounds become preferred.
- Correct visual bugs, but call them out in release notes.
- Mark obsolete props using JSDoc `@deprecated` and provide replacements.

Recommended deprecations:

- Button numeric `size`, `centered`, and `inputGroup`.
- Divider `size`.
- Page in favor of Container.
- `ControlledTab.defaultActive` in favor of `defaultValue`.
- Any Shape color/default behavior that does not map to a real Spectre class.

Remove deprecated behavior only in `1.0`.

### 15.2 Release sequence

1. Use Conventional Commits for every PR.
2. Introduce the foundation, peer-range decision, and first component phases in `0.7.0-beta.x` releases.
3. Gather feedback especially on Forms, Dropdown, Modal, and experimental APIs.
4. Publish `0.7.0` after stable core interactions pass browser/a11y fixtures.
5. Continue experimental coverage in later `0.x` minors if needed; do not hold stable core fixes for every experimental.
6. Reserve removal of deprecated APIs and normalized markup defaults for `1.0.0`.

Experimental APIs remain semver-governed, but their docs should state that they may evolve faster and always include migration notes.

## 16. Risks and mitigations

| Risk                                                                       | Mitigation                                                                                                |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| React 17 is advertised but incompatible with current `useId` usage.        | Resolve in Phase 0; recommended peer range is React 18/19 with a documented pre-1 minor release.          |
| Universal polymorphism produces complex or incorrect ref types.            | Restrict `as` to a few tag-agnostic wrappers and add type fixtures.                                       |
| Modal focus/portal/scroll-lock behavior is easy to get wrong.              | Keep API controlled, centralize focus utilities, and require real-browser tests before release.           |
| CSS generated content is invisible or duplicated for assistive technology. | Render an explicit assistive equivalent for Tooltip, Badge, Avatar initials, and similar families.        |
| Spectre CSS-only sibling/ID hacks conflict with React state.               | Encapsulate required ordering/IDs and prefer native or controlled behavior over hash/hidden-input tricks. |
| Interactive Popover cannot retain focus with canonical CSS.                | Limit Popover to descriptive content and use Dropdown/Modal for interaction.                              |
| Calendar grows into a date library.                                        | Ship a clearly named/documented presentational shell unless full date-grid behavior is separately scoped. |
| Autocomplete ships as styled but inaccessible markup.                      | Require the complete combobox/listbox pattern or defer it.                                                |
| Happy DOM gives false confidence in visual behavior.                       | Add Playwright before overlays, custom sliders, and native experimental controls.                         |
| Root bundle/API grows substantially.                                       | Keep icons and experimentals on subpaths; verify tree-shaking and built output.                           |
| Upstream Spectre is inactive.                                              | Pin v0.5.9 and require an explicit compatibility review for any fork/version change.                      |
| The ignored clone leaks into published artifacts.                          | Test tarball contents and keep package `files` restricted to `dist`.                                      |

## 17. Decisions

### 17.1 Closed in Phase 0

1. **React support:** Support React and React DOM 18/19. React 17 is removed from the peer range because the existing `ControlledTab` contract uses React's hydration-safe `useId`.
2. **CSS package relationship:** Pin `spectre.css` 0.5.9 as an exact development dependency and document it as an exact external consumer dependency. Do not add it as a peer dependency, so custom Sass and CDN consumers do not encounter package-manager conflicts.

### 17.2 Open decisions

These decisions must be recorded in Phase 0 before implementation spreads their consequences:

1. **Browser/a11y tooling:** Exact Playwright/axe/Storybook integration and CI cost.
2. **Polymorphic scope:** Final list of wrappers allowed to use `as`.
3. **Modal implementation:** Internal implementation versus a small headless dependency. Any dependency must be justified by bundle size, peer compatibility, SSR, and API stability.
4. **Calendar naming/scope:** `Calendar` as a presentational shell versus deferring the name until it is a complete date grid.
5. **Bar.Slider range API:** One component with one/two values versus separate single/range roots.
6. **Development-time limit handling:** Warning versus throwing for compiled Filter/Carousel/Viewer360 limits.
7. **Stable individual subpaths:** Add after category exports, or defer until `1.0`.

## 18. Coverage checklist by phase

### Existing parity

- [x] Button — Phase 1
- [x] Table — Phase 1
- [x] Grid — Phase 1
- [x] Page/Container — Phase 1
- [x] Divider — Phase 1
- [x] Loading — Phase 1
- [x] Shape — Phase 1
- [ ] EmptyState — Phase 2
- [ ] Pagination — Phase 2
- [ ] Panel — Phase 2
- [ ] Tab/ControlledTab — Phase 2
- [ ] Toast — Phase 2
- [ ] Parallax — Phase 2

### Stable core additions

- [ ] Form — Phase 3
- [ ] Label — Phase 3
- [ ] Code — Phase 3
- [ ] Media — Phase 3
- [ ] Icon — Phase 3, optional CSS/subpath
- [ ] Hero — Phase 4
- [ ] Navbar — Phase 4
- [ ] Avatar — Phase 4
- [ ] Badge — Phase 4
- [ ] Card — Phase 4
- [ ] Chip — Phase 4
- [ ] Tile — Phase 4
- [ ] Accordion — Phase 5
- [ ] Breadcrumb — Phase 5
- [ ] Nav — Phase 5
- [ ] Step — Phase 5
- [ ] Menu — Phase 5
- [ ] Bar/Bar.Item — Phase 5
- [ ] Dropdown — Phase 6
- [ ] Bar.Slider — Phase 6
- [ ] Modal — Phase 7
- [ ] Tooltip — Phase 7
- [ ] Popover — Phase 7

### Experimentals

- [ ] Progress — Phase 8
- [ ] Meter — Phase 8
- [ ] Slider — Phase 8
- [ ] Timeline — Phase 8
- [ ] Autocomplete — Phase 9
- [ ] Calendar — Phase 9
- [ ] Filter — Phase 9
- [ ] Carousel — Phase 10
- [ ] ComparisonSlider — Phase 10
- [ ] OffCanvas — Phase 10
- [ ] Viewer360 — Phase 10

### Global/class-based coverage

- [ ] Typography documentation
- [ ] Asian-language typography documentation
- [ ] Animation documentation
- [ ] Color utility documentation
- [ ] Cursor utility documentation
- [ ] Display/responsive visibility documentation
- [ ] Position/spacing utility documentation
- [ ] Text utility documentation

## 19. Definition of done for the initiative

The initiative is complete when:

1. Every structural import in `spectre.scss`, `spectre-icons.scss`, and `spectre-exp.scss` is represented by a component or an explicit documented non-component decision.
2. All existing parity defects in this document are fixed or have a documented compatibility exception.
3. Stable, icons, and experimental APIs have tested export boundaries.
4. Consumers can identify the exact required stylesheet for every component.
5. Unit, type, package, SSR, browser, and accessibility checks are part of CI.
6. Every public family has canonical Storybook examples.
7. Deprecated APIs have migration guidance and no accidental removals occurred.
8. A prerelease has been validated by at least one real consumer application before stable promotion.
