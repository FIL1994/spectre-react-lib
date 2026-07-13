import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../elements/Button';
import { Tab } from './Tab';

const meta = {
  title: 'Core/Components/Tab',
  component: Tab,
  tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Navigation: Story = {
  render() {
    return (
      <Tab>
        <Tab.Item active>
          <a href="#profile">Profile</a>
        </Tab.Item>
        <Tab.Item>
          <a href="#settings">Settings</a>
        </Tab.Item>
        <Tab.Item action>
          <Button clear aria-label="Close tabs" />
        </Tab.Item>
      </Tab>
    );
  },
};

export const Block: Story = {
  render() {
    return (
      <Tab block>
        <Tab.Item active>
          <a href="#one">One</a>
        </Tab.Item>
        <Tab.Item>
          <a href="#two">Two</a>
        </Tab.Item>
        <Tab.Item>
          <a href="#three">Three</a>
        </Tab.Item>
      </Tab>
    );
  },
};
