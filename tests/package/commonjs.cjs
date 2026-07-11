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
assert.ok('Parallax' in root, 'the CommonJS root should retain the legacy Parallax export');
assert.equal(typeof icons, 'object', 'the CommonJS icons boundary should be importable');
assert.ok(
  'Parallax' in experimental,
  'the CommonJS experimental entrypoint should export Parallax'
);
