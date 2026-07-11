const assert = require('node:assert/strict');

const root = require('spectre-react-lib');
const icons = require('spectre-react-lib/icons');
const experimental = require('spectre-react-lib/experimental');

assert.ok('Button' in root, 'the CommonJS root entrypoint should export Button');
assert.ok('Container' in root, 'the CommonJS root entrypoint should export Container');
assert.ok('Grid' in root, 'the CommonJS root entrypoint should export Grid');
assert.ok('Shape' in root, 'the CommonJS root entrypoint should export Shape');
assert.ok('Table' in root, 'the CommonJS root entrypoint should export Table');
assert.ok('Caption' in root.Table, 'the CommonJS Table export should include Caption');
assert.ok('HeaderCell' in root.Table, 'the CommonJS Table export should include HeaderCell');
assert.ok('Cell' in root.Table, 'the CommonJS Table export should include Cell');
assert.ok('Item' in root.Tab, 'the CommonJS Tab export should include Item');
assert.equal(root.Tab.Item, root.Tab.Heading, 'the CommonJS Tab aliases should be identical');
assert.ok('Title' in root.EmptyState, 'the CommonJS EmptyState export should include Title');
assert.ok('Body' in root.Panel, 'the CommonJS Panel export should include Body');
assert.ok('Previous' in root.Pagination, 'the CommonJS Pagination should include Previous');
assert.ok('Parallax' in root, 'the CommonJS root should retain the legacy Parallax export');
assert.equal(typeof icons, 'object', 'the CommonJS icons boundary should be importable');
assert.ok(
  'Parallax' in experimental,
  'the CommonJS experimental entrypoint should export Parallax'
);
assert.ok('Content' in root.Parallax, 'the root CommonJS Parallax should include Content');
assert.ok(
  'Content' in experimental.Parallax,
  'the experimental CommonJS Parallax should include Content'
);
