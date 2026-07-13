import { describe, expect, jest, spyOn, test } from 'bun:test';
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { ControlledTab, type ControlledTabOption } from './ControlledTab';

const options: ControlledTabOption[] = [
  { label: 'First tab', value: 'first', render: () => 'First panel' },
  { label: 'Disabled tab', value: 'disabled', disabled: true, render: () => 'Disabled panel' },
  { label: 'Third tab', value: 'third', render: () => 'Third panel' },
];

describe('ControlledTab', () => {
  test('selects the first enabled option and exposes complete relationships', () => {
    const { getByRole, getAllByRole, getByText } = render(<ControlledTab options={options} />);
    const tablist = getByRole('tablist', { name: 'Tabs' });
    const tabs = getAllByRole('tab');
    const panel = getByRole('tabpanel');

    expect(tablist.classList.contains('tab-block')).toBe(true);
    expect(tablist.getAttribute('aria-orientation')).toBe('horizontal');
    expect(tabs[0]?.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0]?.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(tabs[0]?.id);
    expect(panel.getAttribute('tabindex')).toBe('0');
    expect(getByText('First panel')).toBeTruthy();
  });

  test('supports defaultValue and the legacy defaultActive fallback', () => {
    const { getByText, unmount } = render(
      <ControlledTab options={options} defaultActive="third" />
    );

    expect(getByText('Third panel')).toBeTruthy();
    unmount();

    const preferred = render(
      <ControlledTab options={options} defaultValue="first" defaultActive="third" />
    );
    expect(preferred.getByText('First panel')).toBeTruthy();
  });

  test('defaultValue preserves an explicit empty string', () => {
    const { getByRole } = render(<ControlledTab options={options} defaultValue="" />);

    expect(getByRole('tabpanel').textContent).toBe('');
  });

  test('updates uncontrolled state and calls onValueChange on click', () => {
    const onValueChange = jest.fn();
    const { getByRole, getByText } = render(
      <ControlledTab options={options} onValueChange={onValueChange} />
    );

    fireEvent.click(getByRole('tab', { name: 'Third tab' }));
    expect(getByText('Third panel')).toBeTruthy();
    expect(onValueChange).toHaveBeenCalledWith('third');
  });

  test('controlled mode requests changes without mutating selection', () => {
    const onValueChange = jest.fn();
    const { getByRole, getByText, queryByText, rerender } = render(
      <ControlledTab options={options} value="first" onValueChange={onValueChange} />
    );

    fireEvent.click(getByRole('tab', { name: 'Third tab' }));
    expect(onValueChange).toHaveBeenCalledWith('third');
    expect(getByText('First panel')).toBeTruthy();
    expect(queryByText('Third panel')).toBeNull();

    rerender(<ControlledTab options={options} value="third" onValueChange={onValueChange} />);
    expect(getByText('Third panel')).toBeTruthy();
  });

  test('synchronizes roving focus when controlled selection changes externally', () => {
    const { getAllByRole, rerender } = render(<ControlledTab options={options} value="first" />);

    rerender(<ControlledTab options={options} value="third" />);
    const tabs = getAllByRole('tab');
    expect(tabs[0]?.getAttribute('tabindex')).toBe('-1');
    expect(tabs[2]?.getAttribute('tabindex')).toBe('0');
  });

  test('synchronizes manual-mode controlled selection when focus is outside the tablist', () => {
    const { getAllByRole, rerender } = render(
      <ControlledTab options={options} value="first" activationMode="manual" />
    );

    rerender(<ControlledTab options={options} value="third" activationMode="manual" />);
    const tabs = getAllByRole('tab');
    expect(tabs[0]?.getAttribute('tabindex')).toBe('-1');
    expect(tabs[2]?.getAttribute('tabindex')).toBe('0');
  });

  test('horizontal automatic navigation wraps and skips disabled tabs', () => {
    const { getAllByRole, getByText } = render(<ControlledTab options={options} />);
    const tabs = getAllByRole('tab');

    fireEvent.keyDown(tabs[0]!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[2]!);
    expect(getByText('Third panel')).toBeTruthy();
    expect(tabs[2]?.getAttribute('tabindex')).toBe('0');

    fireEvent.keyDown(tabs[2]!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[0]!);
    expect(getByText('First panel')).toBeTruthy();

    fireEvent.keyDown(tabs[0]!, { key: 'End' });
    expect(document.activeElement).toBe(tabs[2]!);
    fireEvent.keyDown(tabs[2]!, { key: 'Home' });
    expect(document.activeElement).toBe(tabs[0]!);
    fireEvent.keyDown(tabs[0]!, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(tabs[2]!);
  });

  test('horizontal mode ignores vertical arrow keys', () => {
    const { getAllByRole } = render(<ControlledTab options={options} />);
    const tabs = getAllByRole('tab');
    tabs[0]?.focus();

    fireEvent.keyDown(tabs[0]!, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(tabs[0]!);
    expect(tabs[0]?.getAttribute('aria-selected')).toBe('true');
  });

  test('vertical manual mode moves focus without selection until activation', () => {
    const onValueChange = jest.fn();
    const { getByRole, getAllByRole, getByText } = render(
      <ControlledTab
        options={options}
        orientation="vertical"
        activationMode="manual"
        onValueChange={onValueChange}
      />
    );
    const tabs = getAllByRole('tab');

    expect(getByRole('tablist').getAttribute('aria-orientation')).toBe('vertical');
    fireEvent.keyDown(tabs[0]!, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(tabs[2]!);
    expect(getByText('First panel')).toBeTruthy();
    expect(onValueChange).not.toHaveBeenCalled();

    fireEvent.keyDown(tabs[2]!, { key: 'Enter' });
    expect(getByText('Third panel')).toBeTruthy();
    expect(onValueChange).toHaveBeenCalledWith('third');

    fireEvent.keyDown(tabs[2]!, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(tabs[0]!);
  });

  test('manual mode supports Space activation', () => {
    const { getAllByRole, getByText } = render(
      <ControlledTab options={options} activationMode="manual" />
    );
    const tabs = getAllByRole('tab');

    fireEvent.keyDown(tabs[0]!, { key: 'ArrowRight' });
    fireEvent.keyDown(tabs[2]!, { key: ' ' });
    expect(getByText('Third panel')).toBeTruthy();
  });

  test('disabled tabs cannot be focused or activated', () => {
    const onValueChange = jest.fn();
    const { getByRole } = render(<ControlledTab options={options} onValueChange={onValueChange} />);
    const disabled = getByRole('tab', { name: 'Disabled tab' });

    expect(disabled.getAttribute('aria-disabled')).toBe('true');
    expect(disabled.getAttribute('tabindex')).toBe('-1');
    expect(disabled.hasAttribute('href')).toBe(false);
    fireEvent.click(disabled);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  test('handles an all-disabled option set without a roving tab stop', () => {
    const onValueChange = jest.fn();
    const { getAllByRole } = render(
      <ControlledTab
        options={options.map((option) => ({ ...option, disabled: true }))}
        onValueChange={onValueChange}
      />
    );

    for (const tab of getAllByRole('tab')) {
      expect(tab.getAttribute('tabindex')).toBe('-1');
      fireEvent.click(tab);
    }
    expect(onValueChange).not.toHaveBeenCalled();
    expect(document.querySelector('[role="tabpanel"]')?.getAttribute('tabindex')).toBe('-1');
  });

  test('uses explicit stable IDs and custom accessible naming', () => {
    const { getByRole, getAllByRole } = render(
      <>
        <span id="account-label">Account sections</span>
        <ControlledTab id="account-tabs" aria-labelledby="account-label" options={options} />
      </>
    );
    const tablist = getByRole('tablist', { name: 'Account sections' });
    const tabs = getAllByRole('tab');
    const panel = getByRole('tabpanel');

    expect(tablist.id).toBe('account-tabs');
    expect(tablist.hasAttribute('aria-label')).toBe(false);
    expect(tabs[0]?.id).toBe('account-tabs-tab-0');
    expect(panel.id).toBe('account-tabs-panel');
  });

  test('generates unique IDs for multiple instances', () => {
    const { getAllByRole } = render(
      <>
        <ControlledTab options={options} />
        <ControlledTab options={options} />
      </>
    );
    const tablists = getAllByRole('tablist');
    const panels = getAllByRole('tabpanel');

    expect(tablists[0]?.id).not.toBe(tablists[1]?.id);
    expect(panels[0]?.id).not.toBe(panels[1]?.id);
  });

  test('forwards root props/ref and merges panel props over default styles', () => {
    const ref = createRef<HTMLUListElement>();
    const { getByRole } = render(
      <ControlledTab
        ref={ref}
        options={options}
        block={false}
        className="custom-tabs"
        data-testid="tabs"
        panelProps={{
          className: 'custom-panel',
          style: { marginTop: 24, color: 'red' },
          tabIndex: -1,
        }}
      />
    );
    const tablist = getByRole('tablist');
    const panel = getByRole('tabpanel');

    expect(ref.current === tablist).toBe(true);
    expect(tablist.classList.contains('tab-block')).toBe(false);
    expect(tablist.classList.contains('custom-tabs')).toBe(true);
    expect(panel.classList.contains('custom-panel')).toBe(true);
    expect(panel.style.marginTop).toBe('24px');
    expect(panel.style.color).toBe('red');
    expect(panel.getAttribute('tabindex')).toBe('-1');
  });

  test('warns once when switching between controlled and uncontrolled modes', () => {
    const consoleError = spyOn(console, 'error').mockImplementation(() => undefined);
    const { rerender } = render(<ControlledTab options={options} />);

    rerender(<ControlledTab options={options} value="first" />);
    rerender(<ControlledTab options={options} value="third" />);

    expect(consoleError).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });
});
