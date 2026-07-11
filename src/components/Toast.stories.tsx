import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../elements/Button';
import { Toast, type ToastVariant } from './Toast';

const meta = {
  title: 'Core/Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: {
    children: 'A useful notification',
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Variants: Story = {
  render() {
    const variants: ToastVariant[] = ['default', 'primary', 'success', 'warning', 'error'];
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        {variants.map((variant) => (
          <Toast key={variant} variant={variant}>
            {variant} notification
          </Toast>
        ))}
      </div>
    );
  },
};

function DismissibleExample() {
  const [visible, setVisible] = useState(true);

  return visible ? (
    <Toast variant="success" onDismiss={() => setVisible(false)}>
      Changes saved.
    </Toast>
  ) : (
    <Button onClick={() => setVisible(true)}>Show toast</Button>
  );
}

export const Dismissible: Story = {
  render: () => <DismissibleExample />,
};

export const LiveRegion: Story = {
  args: {
    variant: 'error',
    liveRegion: 'assertive',
    children: 'The operation failed.',
  },
};
