import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Grid } from './Grid';

const meta = {
  title: 'Core/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

function ExampleContent({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: 8, background: '#eef0f3', border: '1px solid #dadee4' }}>{children}</div>
  );
}

export const EqualWidth: Story = {
  render() {
    return (
      <Grid>
        <Grid.Column>
          <ExampleContent>Equal</ExampleContent>
        </Grid.Column>
        <Grid.Column>
          <ExampleContent>Equal</ExampleContent>
        </Grid.Column>
        <Grid.Column>
          <ExampleContent>Equal</ExampleContent>
        </Grid.Column>
      </Grid>
    );
  },
};

export const FixedWidths: Story = {
  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <ExampleContent>6 columns</ExampleContent>
        </Grid.Column>
        <Grid.Column width={4}>
          <ExampleContent>4 columns</ExampleContent>
        </Grid.Column>
        <Grid.Column width={2}>
          <ExampleContent>2 columns</ExampleContent>
        </Grid.Column>
      </Grid>
    );
  },
};

export const AutoWidth: Story = {
  render() {
    return (
      <Grid>
        <Grid.Column width="auto">
          <ExampleContent>Content width</ExampleContent>
        </Grid.Column>
        <Grid.Column>
          <ExampleContent>Remaining width</ExampleContent>
        </Grid.Column>
      </Grid>
    );
  },
};

export const Responsive: Story = {
  render() {
    return (
      <Grid>
        <Grid.Column width={6} md={12}>
          <ExampleContent>6 columns, 12 at md</ExampleContent>
        </Grid.Column>
        <Grid.Column width={6} md={12}>
          <ExampleContent>6 columns, 12 at md</ExampleContent>
        </Grid.Column>
      </Grid>
    );
  },
};

export const Gapless: Story = {
  render() {
    return (
      <Grid gapless>
        <Grid.Column width={6}>
          <ExampleContent>No gap</ExampleContent>
        </Grid.Column>
        <Grid.Column width={6}>
          <ExampleContent>No gap</ExampleContent>
        </Grid.Column>
      </Grid>
    );
  },
};

export const OneLine: Story = {
  render() {
    return (
      <Grid oneline>
        <Grid.Column width={8}>
          <ExampleContent>8 columns</ExampleContent>
        </Grid.Column>
        <Grid.Column width={8}>
          <ExampleContent>8 columns without wrapping</ExampleContent>
        </Grid.Column>
      </Grid>
    );
  },
};

export const Nested: Story = {
  render() {
    return (
      <Grid>
        <Grid.Column width={8}>
          <ExampleContent>
            Parent
            <Grid>
              <Grid.Column width={6}>Nested 6</Grid.Column>
              <Grid.Column width={6}>Nested 6</Grid.Column>
            </Grid>
          </ExampleContent>
        </Grid.Column>
      </Grid>
    );
  },
};

export const AutoMargins: Story = {
  render() {
    return (
      <Grid>
        <Grid.Column width={4} autoMargin="left">
          <ExampleContent>Left auto margin</ExampleContent>
        </Grid.Column>
      </Grid>
    );
  },
};
