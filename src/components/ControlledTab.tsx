import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useControllableState } from '../internal/useControllableState';
import { useStableId } from '../internal/useStableId';
import { Tab, type TabProps } from './Tab';

export type ControlledTabOrientation = 'horizontal' | 'vertical';
export type ControlledTabActivationMode = 'automatic' | 'manual';

export interface ControlledTabOption {
  label: React.ReactNode;
  value: string;
  render(): React.ReactNode;
  disabled?: boolean;
}

export interface ControlledTabPanelProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children' | 'id' | 'role' | 'aria-labelledby'
> {}

export interface ControlledTabProps extends Omit<
  TabProps,
  'children' | 'role' | 'aria-orientation'
> {
  options: readonly ControlledTabOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
  /** @deprecated Use `defaultValue` instead. */
  defaultActive?: string;
  orientation?: ControlledTabOrientation;
  activationMode?: ControlledTabActivationMode;
  panelProps?: ControlledTabPanelProps;
}

function findEnabledIndex(
  options: readonly ControlledTabOption[],
  startIndex: number,
  direction: 1 | -1
) {
  if (options.length === 0) return -1;

  for (let offset = 1; offset <= options.length; offset += 1) {
    const index = (startIndex + direction * offset + options.length) % options.length;
    if (!options[index]?.disabled) return index;
  }

  return -1;
}

function findLastEnabledIndex(options: readonly ControlledTabOption[]) {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!options[index]?.disabled) return index;
  }

  return -1;
}

type TabKeyboardAction =
  | { type: 'move'; direction: 1 | -1 }
  | { type: 'first' | 'last' | 'activate' };

const orientationKeyDirections: Record<
  ControlledTabOrientation,
  Partial<Record<string, 1 | -1>>
> = {
  horizontal: { ArrowRight: 1, ArrowLeft: -1 },
  vertical: { ArrowDown: 1, ArrowUp: -1 },
};

function getKeyboardAction(
  key: string,
  orientation: ControlledTabOrientation,
  activationMode: ControlledTabActivationMode
): TabKeyboardAction | undefined {
  const direction = orientationKeyDirections[orientation][key];
  if (direction) return { type: 'move', direction };
  if (key === 'Home') return { type: 'first' };
  if (key === 'End') return { type: 'last' };
  if (activationMode === 'manual' && (key === 'Enter' || key === ' ')) {
    return { type: 'activate' };
  }
  return undefined;
}

function getInitialValue(
  options: readonly ControlledTabOption[],
  firstEnabledIndex: number,
  defaultValue?: string,
  defaultActive?: string
) {
  return defaultValue ?? defaultActive ?? options[firstEnabledIndex]?.value;
}

function getRovingIndex(
  options: readonly ControlledTabOption[],
  focusValue: string | undefined,
  selectedIndex: number,
  firstEnabledIndex: number
) {
  const storedFocusIndex = options.findIndex(
    (option) => option.value === focusValue && !option.disabled
  );
  if (storedFocusIndex >= 0) return storedFocusIndex;
  if (selectedIndex >= 0 && !options[selectedIndex]?.disabled) return selectedIndex;
  return firstEnabledIndex;
}

interface ControlledTabBehaviorOptions {
  id?: string;
  options: readonly ControlledTabOption[];
  value?: string;
  defaultValue?: string;
  defaultActive?: string;
  onValueChange?(value: string): void;
  orientation: ControlledTabOrientation;
  activationMode: ControlledTabActivationMode;
}

function useControlledTabBehavior({
  id,
  options,
  value,
  defaultValue,
  defaultActive,
  onValueChange,
  orientation,
  activationMode,
}: ControlledTabBehaviorOptions) {
  const baseId = useStableId(id, 'controlled-tab');
  const firstEnabledIndex = options.findIndex((option) => !option.disabled);
  const [selectedValue, setSelectedValue] = useControllableState({
    value,
    defaultValue: getInitialValue(options, firstEnabledIndex, defaultValue, defaultActive),
    onValueChange,
    componentName: 'ControlledTab',
  });
  const selectedIndex = options.findIndex((option) => option.value === selectedValue);
  const activeOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const initialFocusValue = activeOption?.disabled
    ? options[firstEnabledIndex]?.value
    : (selectedValue ?? options[firstEnabledIndex]?.value);
  const [focusValue, setFocusValue] = useState(initialFocusValue);
  const rovingIndex = getRovingIndex(options, focusValue, selectedIndex, firstEnabledIndex);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (selectedIndex < 0 || activeOption?.disabled || selectedValue === undefined) return;

    const focusIsInside = tabRefs.current.some((tab) => tab === document.activeElement);
    if (activationMode === 'manual' && focusIsInside) return;

    setFocusValue(selectedValue);
  }, [activationMode, activeOption?.disabled, selectedIndex, selectedValue]);

  const activateOption = (index: number) => {
    const option = options[index];
    if (!option || option.disabled || option.value === selectedValue) return;
    setSelectedValue(option.value);
  };

  const focusOption = (index: number, activate: boolean) => {
    const option = options[index];
    if (!option || option.disabled) return;

    setFocusValue(option.value);
    tabRefs.current[index]?.focus();
    if (activate) activateOption(index);
  };

  const onTabClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();
    const option = options[index];
    if (!option || option.disabled) return;
    setFocusValue(option.value);
    activateOption(index);
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const action = getKeyboardAction(event.key, orientation, activationMode);
    if (!action) return;

    event.preventDefault();
    if (action.type === 'activate') {
      activateOption(index);
      return;
    }

    const nextIndex =
      action.type === 'move'
        ? findEnabledIndex(options, index, action.direction)
        : action.type === 'first'
          ? firstEnabledIndex
          : findLastEnabledIndex(options);
    if (nextIndex < 0) return;
    focusOption(nextIndex, activationMode === 'automatic');
  };

  const setTabRef = (index: number, element: HTMLAnchorElement | null) => {
    tabRefs.current[index] = element;
  };

  return {
    activeOption,
    baseId,
    onTabClick,
    onTabKeyDown,
    rovingIndex,
    selectedIndex,
    selectedValue,
    setTabRef,
  };
}

interface ControlledTabItemProps {
  option: ControlledTabOption;
  index: number;
  active: boolean;
  focusable: boolean;
  baseId: string;
  panelId: string;
  onClick(event: React.MouseEvent<HTMLAnchorElement>, index: number): void;
  onKeyDown(event: React.KeyboardEvent<HTMLAnchorElement>, index: number): void;
  setTabRef(index: number, element: HTMLAnchorElement | null): void;
}

function ControlledTabItem({
  option,
  index,
  active,
  focusable,
  baseId,
  panelId,
  onClick,
  onKeyDown,
  setTabRef,
}: ControlledTabItemProps) {
  return (
    <Tab.Item
      active={active}
      className={option.disabled ? 'disabled' : undefined}
      role="presentation"
    >
      <a
        ref={(element) => setTabRef(index, element)}
        id={`${baseId}-tab-${index}`}
        href={option.disabled ? undefined : `#${panelId}`}
        role="tab"
        aria-selected={active}
        aria-controls={panelId}
        aria-disabled={option.disabled || undefined}
        tabIndex={!option.disabled && focusable ? 0 : -1}
        onClick={(event) => onClick(event, index)}
        onKeyDown={(event) => onKeyDown(event, index)}
      >
        {option.label}
      </a>
    </Tab.Item>
  );
}

interface ControlledTabItemsProps {
  options: readonly ControlledTabOption[];
  selectedValue: string | undefined;
  rovingIndex: number;
  baseId: string;
  panelId: string;
  onClick: ControlledTabItemProps['onClick'];
  onKeyDown: ControlledTabItemProps['onKeyDown'];
  setTabRef: ControlledTabItemProps['setTabRef'];
}

function ControlledTabItems({
  options,
  selectedValue,
  rovingIndex,
  baseId,
  panelId,
  onClick,
  onKeyDown,
  setTabRef,
}: ControlledTabItemsProps) {
  return options.map((option, index) => (
    <ControlledTabItem
      key={`${option.value}-${index}`}
      option={option}
      index={index}
      active={selectedValue === option.value}
      focusable={index === rovingIndex}
      baseId={baseId}
      panelId={panelId}
      onClick={onClick}
      onKeyDown={onKeyDown}
      setTabRef={setTabRef}
    />
  ));
}

interface ControlledTabPanelViewProps extends ControlledTabPanelProps {
  activeOption: ControlledTabOption | undefined;
  baseId: string;
  panelId: string;
  selectedIndex: number;
}

function ControlledTabPanelView({
  activeOption,
  baseId,
  panelId,
  selectedIndex,
  ...panelProps
}: ControlledTabPanelViewProps) {
  return (
    <div
      {...panelProps}
      id={panelId}
      role="tabpanel"
      aria-labelledby={selectedIndex >= 0 ? `${baseId}-tab-${selectedIndex}` : undefined}
      tabIndex={panelProps.tabIndex ?? (activeOption ? 0 : -1)}
      style={{ marginTop: 10, ...panelProps.style }}
    >
      {activeOption?.render()}
    </div>
  );
}

function getTabListAriaLabel(ariaLabel?: string, ariaLabelledBy?: string) {
  if (ariaLabel !== undefined || ariaLabelledBy !== undefined) return ariaLabel;
  return 'Tabs';
}

export const ControlledTab = forwardRef<HTMLUListElement, ControlledTabProps>(
  function ControlledTab(
    {
      options,
      value,
      defaultValue,
      defaultActive,
      onValueChange,
      orientation = 'horizontal',
      activationMode = 'automatic',
      panelProps,
      block = true,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) {
    const behavior = useControlledTabBehavior({
      id,
      options,
      value,
      defaultValue,
      defaultActive,
      onValueChange,
      orientation,
      activationMode,
    });
    const panelId = `${behavior.baseId}-panel`;

    return (
      <>
        <Tab
          {...props}
          ref={ref}
          id={behavior.baseId}
          block={block}
          role="tablist"
          aria-orientation={orientation}
          aria-label={getTabListAriaLabel(ariaLabel, ariaLabelledBy)}
          aria-labelledby={ariaLabelledBy}
        >
          <ControlledTabItems
            options={options}
            selectedValue={behavior.selectedValue}
            rovingIndex={behavior.rovingIndex}
            baseId={behavior.baseId}
            panelId={panelId}
            onClick={behavior.onTabClick}
            onKeyDown={behavior.onTabKeyDown}
            setTabRef={behavior.setTabRef}
          />
        </Tab>
        <ControlledTabPanelView
          {...panelProps}
          activeOption={behavior.activeOption}
          baseId={behavior.baseId}
          panelId={panelId}
          selectedIndex={behavior.selectedIndex}
        />
      </>
    );
  }
);
