import { describe, expect, test } from 'bun:test';
import { render, fireEvent } from '@testing-library/react';
import { ControlledTab } from './ControlledTab';

describe('Controlled Tab', () => {
  test('renders options', () => {
    const { getByText } = render(
      <ControlledTab options={[{ label: 'label', value: 'test', render: () => 'test' }]} />
    );

    getByText('label');
  });

  test('handles click', () => {
    const { getByText } = render(
      <ControlledTab
        options={[
          {
            label: 'Option 1',
            value: '1',
            render: () => <div>render 1</div>,
          },
          {
            label: 'Option 2',
            value: '2',
            render: () => <div>render 2</div>,
          },
        ]}
        defaultActive="2"
      />
    );

    getByText('render 2');
    const option1Tab = getByText('Option 1');
    fireEvent.click(option1Tab);
    getByText('render 1');
  });

  test('associates tabs with their panel and supports arrow navigation', () => {
    const { getByRole, getAllByRole } = render(
      <ControlledTab
        options={[
          { label: 'Option 1', value: '1', render: () => 'render 1' },
          { label: 'Option 2', value: '2', render: () => 'render 2' },
        ]}
      />
    );

    const tabs = getAllByRole('tab');
    const panel = getByRole('tabpanel');

    expect(tabs[0]?.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(tabs[0]?.id);
    expect(tabs[0]?.getAttribute('tabindex')).toBe('0');
    expect(tabs[1]?.getAttribute('tabindex')).toBe('-1');

    fireEvent.keyDown(tabs[0]!, { key: 'ArrowRight' });

    expect(tabs[1]?.getAttribute('aria-selected')).toBe('true');
    expect(panel.getAttribute('aria-labelledby')).toBe(tabs[1]?.id);
    expect(document.activeElement).toBe(tabs[1]!);
  });
});
