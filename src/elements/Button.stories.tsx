import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonVariant } from './Button';

const meta = {
  title: 'Core/Elements/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'default',
    controlSize: 'md',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Variants: Story = {
  render() {
    const variants: ButtonVariant[] = ['default', 'primary', 'success', 'error', 'link'];

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    );
  },
};

export const ControlSizes: Story = {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button controlSize="sm">Small</Button>
        <Button controlSize="md">Medium</Button>
        <Button controlSize="lg">Large</Button>
      </div>
    );
  },
};

export const Actions: Story = {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button action aria-label="Add">
          +
        </Button>
        <Button action className="s-circle" aria-label="Add circular item">
          +
        </Button>
        <Button clear aria-label="Dismiss" />
      </div>
    );
  },
};

export const States: Story = {
  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Button active>Active</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <Button block>Block</Button>
      </div>
    );
  },
};

export const Group: Story = {
  render() {
    return (
      <Button.Group>
        <Button active>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </Button.Group>
    );
  },
};

/** @deprecated Use Grid.Column for layout width. */
export const LegacyGridWidths: Story = {
  render() {
    return (
      <div className="columns">
        <Button size={6}>Legacy size 6</Button>
        <Button size={4}>Legacy size 4</Button>
        <Button size={2}>Legacy size 2</Button>
      </div>
    );
  },
};
