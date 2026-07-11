const assert = require('node:assert/strict');

const root = require('spectre-react-lib');
const icons = require('spectre-react-lib/icons');
const experimental = require('spectre-react-lib/experimental');

assert.ok('Button' in root, 'the CommonJS root entrypoint should export Button');
assert.ok('Parallax' in root, 'the CommonJS root should retain the legacy Parallax export');
assert.equal(typeof icons, 'object', 'the CommonJS icons boundary should be importable');
assert.ok(
  'Parallax' in experimental,
  'the CommonJS experimental entrypoint should export Parallax'
);
