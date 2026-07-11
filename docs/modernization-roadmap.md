# Modernization Roadmap

Follow-up improvements to modernize this library after the Bun/dev-stack upgrade.

## 1. Accessibility and React cleanup

- Replace `href="javascript:void(0);"` in `src/components/Pagination.tsx`.
- Replace `onKeyPress` with `onKeyDown`.
- Prefer real `<button>` elements where components trigger actions.
- Add stronger ARIA support for interactive components:
  - `aria-current` for active pagination items.
  - `aria-disabled` for disabled pagination controls.
  - Labels for pagination, tabs, and parallax controls.

## 2. Modern component typings

- Export public prop types for all public components.
- Prefer intrinsic element props over manually redefining `className`, `style`, and `children`.

  ```ts
  type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    primary?: boolean;
    loading?: boolean;
  };
  ```

- Add `forwardRef` support for DOM wrapper components.
- Rename internal misnamed prop types, such as `LoadingProps` in `src/utilities/Shape.tsx`.

## 3. Package export improvements

- Add subpath exports for individual components, for example:

  ```ts
  import { Button } from 'spectre-react-lib/button';
  ```

- Add smoke tests that verify ESM and CommonJS imports from the built package.
- Consider testing the generated npm tarball with `bun pm pack --dry-run` or an equivalent package smoke test.

## 4. Documentation modernization

- Update old badges and project links.
- Document that consumers need to load Spectre CSS.
- Add component usage examples.
- Add standard project docs:
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - Optional `CODE_OF_CONDUCT.md`

## 5. CI consolidation and dependency maintenance

- Combine separate `lint.yml`, `test.yml`, `tsc.yml`, and `build.yml` workflows into one `ci.yml`.
- Add Dependabot or Renovate for:
  - Bun/npm dependencies.
  - GitHub Actions.

## 6. Library API cleanup

- Convert `ControlledTab` from a class component to a function component with hooks.
- Reduce duplicated `className` composition logic.
- Keep public API compatibility where possible, and reserve breaking changes for a major release.

## Recommended next PR

Phase 1 completed accessibility, typing, ref, and native-prop work for the existing primitives, layout, and utilities. Continue with Phase 2 of the component coverage plan: repair EmptyState, Pagination, Panel, Tab/ControlledTab, Toast, and Parallax while preserving their current APIs.
