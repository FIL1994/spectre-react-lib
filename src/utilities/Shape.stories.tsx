import type { Meta, StoryObj } from '@storybook/react';
import { Shape } from './Shape';
import { Colors, type Color } from '../utils';

const meta = {
  title: 'Utilities/Shape',
  component: Shape,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: {
    shape: 'circle',
    style: {
      width: 96,
      height: 96,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
} satisfies Meta<typeof Shape>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
  args: {
    shape: 'circle',
    children: 'circle',
  },
};

export const Rounded: Story = {
  args: {
    shape: 'rounded',
    children: 'rounded',
  },
};

export const AllShapes: Story = {
  args: {
    children: 'shape',
  },
  render({ children, style, className }) {
    return (
      <div style={{ display: 'flex', gap: 32 }}>
        <Shape {...{ className, style }} shape="rounded">
          {children}
        </Shape>
        <Shape {...{ className, style }} shape="circle">
          {children}
        </Shape>
      </div>
    );
  },
};

export const ColorsStory: Story = {
  name: 'Colors',
  args: {
    style: {
      width: 120,
      height: 120,
      padding: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    children: 'shape',
  },
  render({ children, style, className }) {
    const colors = Object.values(Colors);
    const bgColorToTextColorMap = {
      [Colors.Primary]: Colors.Light,
      [Colors.Secondary]: Colors.Dark,
      [Colors.Dark]: Colors.Light,
      [Colors.Gray]: Colors.Dark,
      [Colors.Success]: Colors.Light,
      [Colors.Warning]: Colors.Light,
      [Colors.Error]: Colors.Light,
      [Colors.Light]: Colors.Dark,
    } satisfies Record<Color, Color>;

    function getTextColor(bgColor: Color): Color {
      return bgColorToTextColorMap[bgColor];
    }

    return (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {colors.map((color) => {
          return (
            <>
              <Shape
                {...{
                  className,
                  style,
                  backgroundColor: color,
                  textColor: getTextColor(color),
                }}
                shape="rounded"
              >
                {color} rounded: {children}
              </Shape>
              <Shape
                {...{
                  className,
                  style,
                  backgroundColor: color,
                  textColor: getTextColor(color),
                }}
                shape="circle"
              >
                {color} circle: {children}
              </Shape>
            </>
          );
        })}
      </div>
    );
  },
};
