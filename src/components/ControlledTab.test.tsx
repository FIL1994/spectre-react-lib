import { describe, test } from 'bun:test';
import { render, fireEvent } from '@testing-library/react';
import { ControlledTab } from './ControlledTab';

describe('Controlled Tab', () => {
  test('renders options', () => {
    const { getByText } = render(
      <ControlledTab
        options={[{ label: 'label', value: 'test', render: () => 'test' }]}
      />
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
});
