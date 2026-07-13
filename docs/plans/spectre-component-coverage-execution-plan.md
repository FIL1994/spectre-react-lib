# Spectre.css Component Coverage Execution Plan

| Field                    | Value                                                           |
| ------------------------ | --------------------------------------------------------------- |
| Status                   | Ready to execute                                                |
| Last updated             | 2026-07-12                                                      |
| CSS compatibility target | `spectre.css@0.5.9`                                             |
| Scope source             | [Component coverage plan](./spectre-component-coverage-plan.md) |

## 1. Purpose

This document turns the canonical component coverage plan into an implementation sequence. The
coverage plan remains the source of truth for scope, public API direction, compatibility policy,
and the definition of done. This companion owns:

- merge order and small-PR boundaries;
- concrete source, test, story, and export locations;
- prerequisites and dependencies between component families;
- implementation choices for native and React-managed behavior;
- batch-specific browser and accessibility risks;
- release gates.

Do not duplicate or redefine the coverage matrix here. Update the canonical checklist only after a
family satisfies its complete acceptance criteria.

## 2. Implementation principles

### 2.1 Match the exact CSS contract

Review the relevant Sass partial under `spectre/src/` selector by selector before implementing a
family. The local clone is a reference only; production code and CI continue to use the pinned npm
package.

Important v0.5.9 details include:

- default medium sizes often have no modifier class, including Hero, Avatar, form controls, Modal,
  and Icon's `1x` size;
- Form controls, Dropdown, Popover, Carousel, Filter, and OffCanvas rely on exact sibling order;
- Media has no `.media` root class and should be a namespace of image, video, and figure primitives;
- Menu has no dedicated divider selector, so `Menu.Divider` composes the core Divider contract;
- Carousel compiles eight slide positions, Filter compiles eight tags plus `tag-0`, and Viewer360
  compiles 36 frames;
- experimental Slider uses `attr(value)`, while Viewer360 uses `max` and `value` attribute selectors,
  so React property changes must also synchronize the required DOM attributes.

Components must not import CSS. Stable components use the package root, Icon uses the `icons`
subpath, and experimentals use the `experimental` subpath.

### 2.2 Prefer native behavior

Keep native React state and browser behavior for:

- Form controls;
- Accordion through `details` and `summary`;
- Breadcrumb, Nav, Step, and Menu links or buttons;
- Progress, Meter, experimental Slider, Filter, ComparisonSlider, and Viewer360 native inputs.

React should add structure, classes, relationships, and state synchronization without replacing
native form contracts.

Use controlled/uncontrolled React state for Dropdown, Bar.Slider, Autocomplete, Carousel, and
OffCanvas. Modal remains controlled-only as defined by the canonical plan.

### 2.3 Follow the existing component pattern

For each public root and compound part:

- inherit the meaningful intrinsic element's props;
- use `forwardRef` with the corresponding DOM target;
- preserve consumer classes, styles, data attributes, ARIA attributes, and handlers;
- use `Object.assign(Root, { Part })` for compound APIs;
- export every public root and compound prop type;
- prefer fixed semantic tags and use only a finite, tested `as` union where justified;
- avoid a repository-wide polymorphic component abstraction.

Co-locate each family:

```text
Component.tsx
Component.test.tsx
Component.stories.tsx
```

Use these category directories:

| Family type       | Directory            | Public entry point    |
| ----------------- | -------------------- | --------------------- |
| Elements          | `src/elements/`      | `src/index.ts`        |
| Layout            | `src/layout/`        | `src/index.ts`        |
| Stable components | `src/components/`    | `src/index.ts`        |
| Icons             | `src/icons/`         | `src/icons.ts`        |
| Experimentals     | `src/experimentals/` | `src/experimental.ts` |

## 3. Shared foundations

These are small enabling PRs, not a general component-framework rewrite.

### F1 — Browser and accessibility tests

**Suggested branch:** `chore/component-browser-tests`

Add Playwright and `@axe-core/playwright`, using Storybook stories as the browser fixtures.

Likely files:

```text
package.json
bun.lockb
playwright.config.ts
tests/browser/a11y.spec.ts
tests/browser/existing-interactions.spec.ts
.github/workflows/build.yml
.circleci/config.yml
```

Required outcomes:

- Chromium runs axe against every canonical existing story.
- ControlledTab has a real-focus keyboard smoke test.
- Firefox and WebKit projects exist for later native-control tests.
- Mobile viewports are available for responsive components.
- CI installs the required browser/system dependencies and retains Playwright traces for failures.
- Accessibility exceptions are story-specific and document an upstream limitation; there are no
  global suppressions for duplicate IDs, invalid nesting, or missing accessible names.
- `test:browser` is part of `ci`.

F1 blocks CSS-driven interactions, overlays, custom pointer controls, and experimental native
controls. Static Phase 3 work may proceed in parallel.

### F2 — Shared internal contracts

**Suggested branch:** `chore/component-internals`

Add only helpers needed repeatedly by the remaining families:

```text
src/internal/classNames.ts
src/internal/events.ts
src/internal/mergeRefs.ts
src/internal/useStableId.ts
```

Keep `src/internal/useControllableState.ts` and extend it only when a concrete component needs a
functional state update or comparable behavior.

Required outcomes:

- `classNames` joins conditional tokens deterministically and preserves consumer classes;
- composed handlers call the consumer first and skip internal behavior after `preventDefault()`;
- merged refs support callback and object refs;
- stable IDs accept explicit overrides, use React's hydration-safe IDs, and pass React 18/19 SSR and
  hydration fixtures;
- existing components keep using `addClass` unless touched for a functional reason.

Add focus, portal, dismissable-layer, and scroll-lock helpers with Modal rather than creating an
unused widget framework in F2.

## 4. Standard PR recipe

Every component batch follows the same workflow:

1. Read the canonical API direction and the exact Sass partials.
2. Write the public prop contracts and compile-only type examples before interaction code.
3. Implement semantic markup and exact class/order behavior.
4. Add focused DOM and interaction tests; avoid broad snapshots.
5. Add canonical, modifier, composition, and state stories with the required CSS-layer note.
6. Export the family and all public types from the correct entry point.
7. Extend ESM, CommonJS, declaration, SSR, and React-version package fixtures.
8. Run the universal checks and then mark the canonical family checklist complete.

Tests for each family cover:

- default tag and canonical class;
- every modifier in the corresponding v0.5.9 partial;
- compound ordering and valid nesting;
- class, style, data, ARIA, and event passthrough;
- root and compound ref targets;
- controlled/uncontrolled state where applicable;
- accessible names, roles, states, and relationships;
- disabled, absent-content, edge-value, and clamping behavior.

Package fixture updates normally include:

```text
tests/package/imports.ts
tests/package/esm.mjs
tests/package/commonjs.cjs
tests/package/types-consumer.tsx
tests/package/phase<N>-types.tsx
```

## 5. Execution order

The canonical phases remain release milestones. The batches below are intentionally smaller PRs.
Independent batches may run in parallel after their listed dependencies land.

```text
F2 ── Form ── Chip/Menu/Tile/Avatar ── Autocomplete
 │                └── Menu ── Dropdown
 ├── static Bar ── Bar.Slider
 ├── Card ── Popover examples
 └── Icon, content, layout, and navigation primitives

F1 ── Dropdown, Bar.Slider, Modal, Tooltip/Popover
 ├── native experimentals ── ComparisonSlider/Viewer360
 └── Modal infrastructure ── OffCanvas
```

### Phase 3 — Elements, media, and icons

#### 3A — Form primitives

**Suggested branch:** `feat/form-primitives`

Create `src/elements/Form.tsx` with Form root, Fieldset, Group, Label, Input, Textarea, Select, and
Hint. Review `spectre/src/_forms.scss`.

Exit criteria beyond the standard recipe:

- native controlled and uncontrolled input behavior is unchanged;
- labels, hints, errors, `aria-describedby`, and `aria-invalid` compose correctly;
- small, medium, large, inline, horizontal, success, error, disabled, readonly, file, and multiple
  select states match the compiled classes;
- Form owns no values, validation schema, or submission state.

#### 3B — Form structured controls

**Suggested branch:** `feat/form-controls`

Add Checkbox, Radio, Switch, Icon, InputGroup, and Addon to the same family.

Exit criteria beyond the standard recipe:

- each input is immediately followed by the required `.form-icon` sibling;
- Checkbox synchronizes the native `indeterminate` property through a merged ref;
- input icon placement and input-group adjacency are tested;
- disabled and validation states work for every structured control;
- the complete Phase 3 Form type fixture compiles on React 18 and 19.

#### 3C — Label, Code, and Media

**Suggested branch:** `feat/core-elements`

Create:

```text
src/elements/Label.tsx
src/elements/Code.tsx
src/elements/Media.tsx
```

Review `_labels.scss`, `_codes.scss`, and `_media.scss`.

Exit criteria beyond the standard recipe:

- Label variants and rounded state use a finite API;
- Code produces valid inline `code` and block `pre > code` markup, with `data-lang` used only as a
  visual supplement;
- Media exposes image, figure/caption, video, and responsive embed primitives without inventing a
  `.media` root;
- iframe stories require a meaningful `title`.

#### 3D — Icon subpath

**Suggested branch:** `feat/icon-component`

Create `src/icons/Icon.tsx` and export it only from `src/icons.ts`. Review all files under
`spectre/src/icons/`.

Exit criteria beyond the standard recipe:

- the typed name union covers all 39 canonical icon names;
- sizes 1 through 4 map to the base class and `2x`/`3x`/`4x` modifiers correctly;
- icons are decorative by default and receive image semantics only when named;
- the icons ESM, CommonJS, declarations, and React fixtures pass;
- importing the icon subpath injects no CSS and Icon is not added to the root export.

### Phase 4 — Static content and layout

#### 4A — Hero and Navbar

**Suggested branch:** `feat/core-layout-components`

Create `src/layout/Hero.tsx` and `src/layout/Navbar.tsx` from `_hero.scss` and `_navbar.scss`.

Hero's medium size emits no modifier. Navbar uses a semantic header and exposes Section, Center, and
Brand without forcing Brand to be a non-navigational element.

#### 4B — Avatar, Badge, and Chip

**Suggested branch:** `feat/core-identity-components`

Create the three families under `src/components/`.

- Avatar covers images, initials, Icon, and named Presence states without color-only meaning.
- Badge exposes an assistive equivalent for CSS-generated content.
- Chip uses a labeled native remove button and must not require icon CSS.

#### 4C — Card and Tile

**Suggested branch:** `feat/core-content-components`

Create Card and Tile compound families under `src/components/`. Keep titles and subtitles as
consumer-selected content rather than hard-coded heading levels. Browser stories verify image
placement, centered tiles, and text-overflow layouts.

### Phase 5 — Disclosure, navigation, menus, and static Bar

#### 5A — Accordion and navigation lists

**Suggested branch:** `feat/core-navigation-components`

Create Accordion, Breadcrumb, Nav, and Step.

- Accordion uses `details`/`summary`; controlled mode must resynchronize the native `open` property
  if a parent declines a toggle.
- Navigation families render valid list nesting and leave navigation to real links or buttons.
- Current items apply the appropriate `aria-current` value.

#### 5B — Menu and static Bar

**Suggested branch:** `feat/menu-and-bar-components`

Create Menu, Bar, and Bar.Item.

- Menu supports navigation links, action buttons, form controls, badges, and valid dividers without
  forcing `role="menu"`.
- `Menu.Divider` composes Divider behavior rather than inventing an unsupported menu class.
- Bar supports small, single, and segmented values, clamps invalid values, and exposes value
  metadata to assistive technology.

### Phase 6 — Core interactions

#### 6A — Dropdown

**Suggested branch:** `feat/dropdown-component`

Dependency: F1, F2, and Menu.

Preserve Trigger/Menu adjacency while adding controlled/uncontrolled open state, right alignment,
outside-pointer dismissal, Escape, keyboard opening, initial menu focus, and focus return. Keep
ordinary list/link semantics instead of application-menu roles. Verify `.active` visibility and a
mobile viewport in Chromium.

#### 6B — Bar.Slider

**Suggested branch:** `feat/bar-slider-component`

Dependency: F1, F2, and static Bar.

Prototype the one-value/two-value discriminated API before implementation. Do not ship an inert
slider role: cover arrows, Home/End, PageUp/PageDown, step and clamping, one or two handles, disabled
state, accessible value text, overlapping-handle selection, pointer capture, and real geometry.

### Phase 7 — Core overlays

#### 7A — Modal

**Suggested branch:** `feat/modal-component`

Dependency: F1 and F2.

Add private portal, focus, dismissable-layer, merged-ref, and reference-counted scroll-lock
infrastructure with Modal. A small focus-trap dependency is acceptable only after SSR, React 18/19,
nested-dialog, bundle, and audit checks; keep the choice behind a private hook.

Browser acceptance covers portal rendering, initial focus, containment, Escape, overlay and close
button dismissal, focus restoration with a missing/disabled trigger fallback, labels/descriptions,
nested modals, stacked scroll locking, SSR, and hydration.

#### 7B — Tooltip and Popover

**Suggested branch:** `feat/core-overlay-hints`

Dependency: F1, F2, and Card for canonical Popover composition.

- Tooltip places Spectre classes and `data-tooltip` on the actual trigger, composes
  `aria-describedby`, and adds no extra tab stop.
- Popover preserves trigger/content adjacency and supports descriptive content only.
- Interactive popover use cases are documented as Dropdown or Modal use cases.
- Browser tests cover pointer and keyboard-focus visibility in every placement.

### Phase 8 — Native and structural experimentals

**Suggested branch:** `feat/experimental-native-components`

Dependency: F1 and F2.

Create Progress, Meter, Slider, and Timeline under `src/experimentals/`, exported only from
`src/experimental.ts`.

- Progress uses native indeterminate behavior when `value` is omitted.
- Meter passes through its complete native range attributes.
- Slider preserves native range keyboard behavior and synchronizes the `value` attribute used by
  Spectre's tooltip CSS.
- Timeline is a semantic ordered sequence with compound layout parts.
- Chromium, Firefox, and WebKit cover the native controls.

### Phase 9 — Data-oriented experimentals

#### 9A — Calendar and Filter

**Suggested branch:** `feat/experimental-data-shells`

Dependency: Form, Chip, Card, and F2.

Calendar is explicitly a presentational composition shell and must not emit `role="grid"` or claim
date-grid keyboard behavior. Filter retains real radio selection, supports controlled/uncontrolled
state, and must prototype collision-safe multiple instances before its API is frozen. Keep the
v0.5.9 limit of eight filter tags visible in types, validation, tests, and docs; do not reuse global
`tag-1` IDs across instances.

#### 9B — Autocomplete

**Suggested branch:** `feat/autocomplete-component`

Dependency: F1, F2, Form, Chip, Menu, Tile, and Avatar.

Implement the complete combobox/listbox pattern or defer the family. DOM focus remains on the input
while `aria-activedescendant` tracks options. Cover arrows, Enter, Escape, selection/removal,
disabled options, loading and empty states, controlled values and input text, duplicate values,
unique IDs, and IME-safe Enter handling. Fetching, ranking, and caching remain consumer concerns.

### Phase 10 — Media and navigation experimentals

#### 10A — Carousel

**Suggested branch:** `feat/carousel-component`

Dependency: F1 and F2.

Use controlled/uncontrolled selected-slide state while retaining the sibling ordering required by
Spectre's radio-based selectors. Generate collision-safe locator IDs. Previous, next, and indicator
controls need accessible names; inactive slides and their descendants must leave the accessibility
and tab sequence. Enforce and document the eight-slide CSS limit.

#### 10B — ComparisonSlider and Viewer360

**Suggested branch:** `feat/experimental-range-media`

Dependency: F1, F2, and the experimental native Slider contract.

Back both components with labeled native range inputs and synchronize their visual percentage or
frame. Test pointer and keyboard paths in real browsers. Viewer360 must keep `max="36"` and the
`value` attribute synchronized with the selected frame and document its fixed sprite contract.

#### 10C — OffCanvas

**Suggested branch:** `feat/off-canvas-component`

Dependency: F1, F2, and proven Modal dismissal/focus infrastructure.

Preserve Sidebar-before-Overlay ordering and add controlled/uncontrolled state, expanded/controls
relationships, Escape and overlay dismissal, focus return, SSR guards, and responsive desktop/mobile
coverage. Reuse private Modal infrastructure only where the interaction is actually shared.

### Phase 11 — Coverage closeout

**Suggested branch:** `chore/component-coverage-closeout`

After all component batches:

- audit every import in `spectre.scss`, `spectre-icons.scss`, and `spectre-exp.scss`;
- document typography, Asian-language text, animation, color, cursor, display, responsive
  visibility, position, spacing, and text classes as CSS-only coverage;
- finish README and migration examples for every package boundary and CSS layer;
- validate ESM, CommonJS, declarations, SSR, hydration, React 18/19, tree-shaking, Storybook, axe,
  browser interactions, and tarball contents;
- publish a prerelease and validate Forms, Dropdown, Modal, and Autocomplete in a consumer app before
  stable promotion.

## 6. Risk-driven browser coverage

| Risk                                       | Families                                             | Required proof                                                      |
| ------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------- |
| CSS-sensitive sibling order                | Form, Dropdown, Popover, Filter, Carousel, OffCanvas | DOM-order assertions plus rendered visibility checks                |
| Property/attribute synchronization         | Slider, Viewer360                                    | Attribute assertions after keyboard and pointer changes             |
| Generated CSS content                      | Badge, Avatar, Code, Tooltip                         | Explicit accessible DOM text without duplicate speech               |
| Portals, focus, and stacked global effects | Modal, OffCanvas                                     | Real-focus, nested-layer, restoration, scroll-lock, and SSR tests   |
| Pointer geometry                           | Bar.Slider, ComparisonSlider                         | Real bounding boxes, pointer capture, clamping, and keyboard parity |
| Visually hidden focusable descendants      | Carousel, OffCanvas                                  | Tab-sequence and accessibility-tree assertions                      |
| Composite widget semantics                 | Autocomplete                                         | Complete keyboard, active-descendant, IME, disabled-option tests    |
| Native control rendering                   | Progress, Meter, Slider                              | Chromium, Firefox, and WebKit checks                                |
| Responsive behavior                        | Grid, Navbar, Dropdown, Modal, OffCanvas             | Desktop and mobile viewport stories                                 |

Happy DOM remains appropriate for semantic DOM and state tests, but none of these browser gates may
be replaced with Happy DOM assertions.

## 7. Merge and release gates

Every batch must pass:

```text
bun run format:check
bun run lint
bun run tsc
bun run test
bun run test:package
bun run build-storybook
bun run test:browser   # after F1 lands
bun run audit
```

Additionally:

- no public module imports CSS or accesses `window`/`document` at module evaluation time;
- every public prop type is available from the correct package boundary;
- no stable component requires Icon or experimental CSS for basic rendering;
- package tests inspect the built output, not source aliases;
- Sass compilation limits are enforced or documented rather than silently exceeded;
- changes use Conventional Commit branches and commits;
- one family is marked complete only when its tests, stories, package fixtures, browser/a11y gates,
  and CSS-layer documentation land together.

Stable static batches, icons, and independent experimental work may be released incrementally. Do
not hold stable fixes for all experimentals, but do not publish Dropdown, Bar.Slider, Modal,
Autocomplete, Carousel, or OffCanvas before their required browser gates pass.
