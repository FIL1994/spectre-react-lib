import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { useControllableState } from '../internal/useControllableState';
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
    const generatedId = useId();
    const baseId = id ?? `controlled-tab-${generatedId}`;
    const panelId = `${baseId}-panel`;
    const firstEnabledIndex = options.findIndex((option) => !option.disabled);
    const initialValue =
      defaultValue !== undefined
        ? defaultValue
        : defaultActive !== undefined
          ? defaultActive
          : options[firstEnabledIndex]?.value;
    const [selectedValue, setSelectedValue] = useControllableState({
      value,
      defaultValue: initialValue,
      onValueChange,
      componentName: 'ControlledTab',
    });
    const selectedIndex = options.findIndex((option) => option.value === selectedValue);
    const activeOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;
    const initialFocusValue =
      selectedIndex >= 0 && !activeOption?.disabled
        ? selectedValue
        : options[firstEnabledIndex]?.value;
    const [focusValue, setFocusValue] = useState(initialFocusValue);
    const storedFocusIndex = options.findIndex(
      (option) => option.value === focusValue && !option.disabled
    );
    const rovingIndex =
      storedFocusIndex >= 0
        ? storedFocusIndex
        : selectedIndex >= 0 && !activeOption?.disabled
          ? selectedIndex
          : firstEnabledIndex;
    const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
      if (selectedIndex < 0 || activeOption?.disabled) return;

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

    const onTabKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
      let nextIndex = -1;

      if (
        (orientation === 'horizontal' && event.key === 'ArrowRight') ||
        (orientation === 'vertical' && event.key === 'ArrowDown')
      ) {
        nextIndex = findEnabledIndex(options, index, 1);
      } else if (
        (orientation === 'horizontal' && event.key === 'ArrowLeft') ||
        (orientation === 'vertical' && event.key === 'ArrowUp')
      ) {
        nextIndex = findEnabledIndex(options, index, -1);
      } else if (event.key === 'Home') {
        nextIndex = firstEnabledIndex;
      } else if (event.key === 'End') {
        nextIndex = findLastEnabledIndex(options);
      } else if (activationMode === 'manual' && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        activateOption(index);
        return;
      }

      if (nextIndex < 0) return;

      event.preventDefault();
      focusOption(nextIndex, activationMode === 'automatic');
    };

    return (
      <>
        <Tab
          {...props}
          ref={ref}
          id={baseId}
          block={block}
          role="tablist"
          aria-orientation={orientation}
          aria-label={ariaLabel !== undefined || ariaLabelledBy !== undefined ? ariaLabel : 'Tabs'}
          aria-labelledby={ariaLabelledBy}
        >
          {options.map((option, index) => {
            const active = selectedValue === option.value;
            const tabId = `${baseId}-tab-${index}`;

            return (
              <Tab.Item
                key={`${option.value}-${index}`}
                active={active}
                className={option.disabled ? 'disabled' : undefined}
                role="presentation"
              >
                <a
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={tabId}
                  href={option.disabled ? undefined : `#${panelId}`}
                  role="tab"
                  aria-selected={active}
                  aria-controls={panelId}
                  aria-disabled={option.disabled || undefined}
                  tabIndex={!option.disabled && index === rovingIndex ? 0 : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    if (option.disabled) return;
                    setFocusValue(option.value);
                    activateOption(index);
                  }}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  {option.label}
                </a>
              </Tab.Item>
            );
          })}
        </Tab>
        <div
          {...panelProps}
          id={panelId}
          role="tabpanel"
          aria-labelledby={selectedIndex >= 0 ? `${baseId}-tab-${selectedIndex}` : undefined}
          tabIndex={panelProps?.tabIndex ?? (activeOption ? 0 : -1)}
          style={{ marginTop: 10, ...panelProps?.style }}
        >
          {activeOption?.render()}
        </div>
      </>
    );
  }
);
