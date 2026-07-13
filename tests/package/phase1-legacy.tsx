import { Button, Divider, Grid, Loading, Page, Shape, Table, type Color } from 'spectre-react-lib';

const color: Color = 'light';

export const legacyPhaseOneConsumer = (
  <Page centered>
    <Button large small primary success error link centered inputGroup size="4">
      Legacy button
    </Button>
    <Table>
      <Table.Head
        headings={['Name']}
        headingProps={{ className: 'headings' }}
        onHeadingClick={() => undefined}
      />
    </Table>
    <Grid>
      <Grid.Column width="4" />
    </Grid>
    <Divider size="6" />
    <Loading large />
    <Shape shape="circle" backgroundColor={color} textColor={color} />
  </Page>
);
