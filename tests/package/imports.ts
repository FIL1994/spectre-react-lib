import {
  Button,
  type ButtonProps,
  type ButtonVariant,
  Container,
  type ContainerProps,
  type ContainerSize,
  type ControlSize,
  Grid,
  type GridAutoMargin,
  type GridColumnProps,
  type GridWidth,
  Parallax as LegacyParallax,
  Shape,
  type ShapeComponentProps,
  Table,
  type TableCellProps,
  type TableHeaderCellProps,
} from 'spectre-react-lib';
import * as icons from 'spectre-react-lib/icons';
import { Parallax, type ParallaxProps } from 'spectre-react-lib/experimental';

const buttonProps: ButtonProps = { type: 'button' };
const buttonVariant: ButtonVariant = 'primary';
const controlSize: ControlSize = 'lg';
const containerProps: ContainerProps = { size: 'md' };
const containerSize: ContainerSize = 'xl';
const gridColumnProps: GridColumnProps = { width: 6, md: 12, autoMargin: 'left' };
const gridWidth: GridWidth = 'auto';
const gridAutoMargin: GridAutoMargin = 'both';
const tableHeaderCellProps: TableHeaderCellProps = { scope: 'col' };
const tableCellProps: TableCellProps = { colSpan: 2 };
const shapeProps: ShapeComponentProps = {
  shape: 'circle',
  legacyDefaults: false,
  backgroundColor: 'primary',
};
const parallaxProps: ParallaxProps = { title: 'Package fixture' };

void Button;
void Container;
void Grid;
void Shape;
void Table;
void LegacyParallax;
void icons;
void Parallax;
void buttonProps;
void buttonVariant;
void controlSize;
void containerProps;
void containerSize;
void gridColumnProps;
void gridWidth;
void gridAutoMargin;
void tableHeaderCellProps;
void tableCellProps;
void shapeProps;
void parallaxProps;
