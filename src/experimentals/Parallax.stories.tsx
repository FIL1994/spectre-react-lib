import type { Meta, StoryObj } from '@storybook/react-vite';
import { Parallax } from './Parallax';

const meta = {
  title: 'Experimental/Parallax',
  component: Parallax,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Requires spectre.min.css followed by spectre-exp.min.css. Corner overlays are focusable only when a callback is supplied.',
      },
    },
  },
} satisfies Meta<typeof Parallax>;

export default meta;
type Story = StoryObj<typeof meta>;

const layerStyle = {
  width: 420,
  minHeight: 220,
  display: 'grid',
  placeItems: 'center',
} as const;

export const Convenience: Story = {
  args: {
    title: 'Front layer',
    children: (
      <div style={{ ...layerStyle, background: '#5755d9', color: 'white' }}>Back layer</div>
    ),
  },
};

export const Compound: Story = {
  render() {
    return (
      <Parallax>
        <Parallax.Content>
          <Parallax.Front style={layerStyle}>Compound front</Parallax.Front>
          <Parallax.Back style={{ ...layerStyle, background: '#32b643', color: 'white' }}>
            Compound back
          </Parallax.Back>
        </Parallax.Content>
      </Parallax>
    );
  },
};

export const InteractiveCorner: Story = {
  args: {
    title: 'Keyboard-operable corner',
    children: <div style={{ ...layerStyle, background: '#ffb700' }}>Back layer</div>,
    topLeft: () => undefined,
    controlLabels: { topLeft: 'Activate top-left effect' },
  },
};
