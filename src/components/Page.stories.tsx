import type { Meta, StoryObj } from '@storybook/react-vite';
import { Page } from './Page';

const meta = {
  title: 'Core/Layout/Page (Legacy)',
  component: Page,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Deprecated compatibility helper. Use the canonical Container component instead.',
      },
    },
  },
  args: {
    children: 'Legacy page content',
    centered: true,
    size: 'md',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LegacyPage: Story = {};
