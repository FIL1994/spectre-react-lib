import {
  Button,
  type ButtonProps,
  type ButtonVariant,
  Container,
  type ContainerProps,
  type ContainerSize,
  type ControlSize,
  ControlledTab,
  type ControlledTabActivationMode,
  type ControlledTabOption,
  type ControlledTabOrientation,
  type ControlledTabPanelProps,
  type ControlledTabProps,
  EmptyState,
  type EmptyStateActionProps,
  type EmptyStateIconProps,
  type EmptyStateProps,
  type EmptyStateSubtitleProps,
  type EmptyStateTitleProps,
  Grid,
  type GridAutoMargin,
  type GridColumnProps,
  type GridWidth,
  Pagination,
  type PaginationBaseProps,
  type PaginationComponentProps,
  type PaginationCompositionProps,
  type PaginationNextProps,
  type PaginationPreviousProps,
  type PaginationProps,
  type PaginationSubtitleProps,
  type PaginationTitleProps,
  Panel,
  type PanelBodyProps,
  type PanelFooterProps,
  type PanelHeaderProps,
  type PanelNavProps,
  type PanelProps,
  type PanelSubtitleProps,
  type PanelTitleProps,
  Parallax as LegacyParallax,
  Shape,
  type ShapeComponentProps,
  Table,
  Tab,
  type TabHeadingProps,
  type TabItemProps,
  type TabProps,
  type TableCellProps,
  type TableHeaderCellProps,
  Toast,
  type ToastLiveRegion,
  type ToastProps,
  type ToastVariant,
} from 'spectre-react-lib';
import * as icons from 'spectre-react-lib/icons';
import {
  Parallax,
  type ParallaxBackProps,
  type ParallaxContentProps,
  type ParallaxControlLabels,
  type ParallaxCorner,
  type ParallaxFrontProps,
  type ParallaxProps,
} from 'spectre-react-lib/experimental';

const buttonProps: ButtonProps = { type: 'button' };
const buttonVariant: ButtonVariant = 'primary';
const controlSize: ControlSize = 'lg';
const controlledTabActivation: ControlledTabActivationMode = 'manual';
const controlledTabOrientation: ControlledTabOrientation = 'vertical';
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
const paginationProps: PaginationComponentProps = { totalPages: 100, activePage: 50 };
const tabItemProps: TabItemProps = { active: true, action: true };
const toastVariant: ToastVariant = 'warning';
const parallaxProps: ParallaxProps = { title: 'Package fixture' };
const parallaxLabels: ParallaxControlLabels = { topLeft: 'Top left' };
type PhaseTwoPublicTypes = [
  ControlledTabOption,
  ControlledTabPanelProps,
  ControlledTabProps,
  EmptyStateActionProps,
  EmptyStateIconProps,
  EmptyStateProps,
  EmptyStateSubtitleProps,
  EmptyStateTitleProps,
  PaginationBaseProps,
  PaginationCompositionProps,
  PaginationNextProps,
  PaginationPreviousProps,
  PaginationProps,
  PaginationSubtitleProps,
  PaginationTitleProps,
  PanelBodyProps,
  PanelFooterProps,
  PanelHeaderProps,
  PanelNavProps,
  PanelProps,
  PanelSubtitleProps,
  PanelTitleProps,
  TabHeadingProps,
  TabProps,
  ToastLiveRegion,
  ToastProps,
  ParallaxBackProps,
  ParallaxContentProps,
  ParallaxCorner,
  ParallaxFrontProps,
];
const phaseTwoPublicTypes = null as unknown as PhaseTwoPublicTypes;

void Button;
void ControlledTab;
void EmptyState;
void Container;
void Grid;
void Pagination;
void Panel;
void Shape;
void Table;
void Tab;
void Toast;
void LegacyParallax;
void icons;
void Parallax;
void buttonProps;
void buttonVariant;
void controlSize;
void controlledTabActivation;
void controlledTabOrientation;
void containerProps;
void containerSize;
void gridColumnProps;
void gridWidth;
void gridAutoMargin;
void tableHeaderCellProps;
void tableCellProps;
void shapeProps;
void paginationProps;
void tabItemProps;
void toastVariant;
void parallaxProps;
void parallaxLabels;
void phaseTwoPublicTypes;
