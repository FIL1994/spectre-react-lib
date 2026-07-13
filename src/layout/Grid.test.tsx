import { describe, expect, test } from 'bun:test';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Grid, type GridAutoMargin, type GridWidth } from './Grid';

describe('Grid', () => {
  test('supports gapless and one-line rows while forwarding native props and refs', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Grid ref={ref} gapless oneline className="custom-grid" data-testid="grid" />
    );
    const grid = getByTestId('grid');

    expect(ref.current === grid).toBe(true);
    expect(grid.className).toBe('columns col-gapless col-oneline custom-grid');
  });

  describe('Column', () => {
    test('supports equal-width columns without a width prop', () => {
      const { getByTestId } = render(<Grid.Column data-testid="column" />);

      expect(getByTestId('column').className).toBe('column');
    });

    test('supports every fixed width and auto width', () => {
      const widths: GridWidth[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'];

      for (const width of widths) {
        const { getByTestId, unmount } = render(<Grid.Column width={width} data-testid="column" />);

        expect(getByTestId('column').classList.contains(`col-${width}`)).toBe(true);
        unmount();
      }
    });

    test('retains legacy string widths', () => {
      const { getByTestId } = render(<Grid.Column width="4" data-testid="column" />);

      expect(getByTestId('column').classList.contains('col-4')).toBe(true);
    });

    test('supports every responsive breakpoint', () => {
      const { getByTestId } = render(
        <Grid.Column xs={12} sm={10} md={8} lg={6} xl="auto" data-testid="column" />
      );
      const column = getByTestId('column');

      for (const className of ['col-xs-12', 'col-sm-10', 'col-md-8', 'col-lg-6', 'col-xl-auto']) {
        expect(column.classList.contains(className)).toBe(true);
      }
    });

    test('supports every auto margin and forwards native props and refs', () => {
      const margins: Array<[GridAutoMargin, string]> = [
        ['left', 'col-ml-auto'],
        ['right', 'col-mr-auto'],
        ['both', 'col-mx-auto'],
      ];

      for (const [autoMargin, expectedClass] of margins) {
        const ref = createRef<HTMLDivElement>();
        const { getByTestId, unmount } = render(
          <Grid.Column
            ref={ref}
            autoMargin={autoMargin}
            className="custom-column"
            data-testid="column"
          />
        );
        const column = getByTestId('column');

        expect(ref.current === column).toBe(true);
        expect(column.classList.contains(expectedClass)).toBe(true);
        expect(column.classList.contains('custom-column')).toBe(true);
        unmount();
      }
    });
  });
});
