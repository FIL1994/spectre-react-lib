import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../elements/Button';
import { Panel } from './Panel';

const meta = {
  title: 'Core/Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Canonical: Story = {
  render() {
    return (
      <Panel>
        <Panel.Header>
          <Panel.Title>Project Alpha</Panel.Title>
          <Panel.Subtitle>Updated today</Panel.Subtitle>
        </Panel.Header>
        <Panel.Nav aria-label="Project sections">
          <Button variant="link">Overview</Button>
          <Button variant="link">Activity</Button>
        </Panel.Nav>
        <Panel.Body>Panel content grows to fill the available space.</Panel.Body>
        <Panel.Footer>
          <Button variant="primary">Save</Button>
        </Panel.Footer>
      </Panel>
    );
  },
};

export const Convenience: Story = {
  args: {
    title: 'Convenience title',
    children: 'Convenience body',
    footer: 'Convenience footer',
  },
};
