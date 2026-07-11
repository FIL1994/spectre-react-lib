import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ControlledTab, type ControlledTabOption } from './ControlledTab';

const options: ControlledTabOption[] = [
  { label: 'Overview', value: 'overview', render: () => 'Overview panel' },
  { label: 'Disabled', value: 'disabled', disabled: true, render: () => 'Disabled panel' },
  { label: 'Activity', value: 'activity', render: () => 'Activity panel' },
];

const meta = {
  title: 'Core/Components/ControlledTab',
  component: ControlledTab,
  tags: ['autodocs'],
  args: {
    options,
  },
} satisfies Meta<typeof ControlledTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Automatic: Story = {};

function ControlledExample() {
  const [value, setValue] = useState('overview');
  return <ControlledTab options={options} value={value} onValueChange={setValue} />;
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const ManualActivation: Story = {
  args: {
    activationMode: 'manual',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    activationMode: 'manual',
    style: { flexDirection: 'column', alignItems: 'stretch' },
  },
};
