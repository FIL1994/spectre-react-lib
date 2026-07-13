import type { Meta, StoryObj } from '@storybook/react-vite';
import { Shape } from './Shape';

const shapeStyle = {
  width: 96,
  height: 96,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

const meta = {
  title: 'Utilities/Shape',
  component: Shape,
  tags: ['autodocs'],
  args: {
    shape: 'circle',
    legacyDefaults: false,
    style: shapeStyle,
  },
} satisfies Meta<typeof Shape>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
  args: {
    children: 'circle',
    backgroundColor: 'primary',
    textColor: 'light',
  },
};

export const Rounded: Story = {
  args: {
    shape: 'rounded',
    children: 'rounded',
    backgroundColor: 'secondary',
    textColor: 'dark',
  },
};

export const CanonicalShapes: Story = {
  render() {
    return (
      <div style={{ display: 'flex', gap: 32 }}>
        <Shape
          shape="rounded"
          legacyDefaults={false}
          backgroundColor="success"
          textColor="light"
          style={shapeStyle}
        >
          rounded
        </Shape>
        <Shape
          shape="circle"
          legacyDefaults={false}
          backgroundColor="warning"
          textColor="dark"
          style={shapeStyle}
        >
          circle
        </Shape>
      </div>
    );
  },
};

/** @deprecated Set legacyDefaults to false and compose layout styles explicitly. */
export const LegacyDefaults: Story = {
  args: {
    legacyDefaults: true,
    children: 'legacy',
  },
};
