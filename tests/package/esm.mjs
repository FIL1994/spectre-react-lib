import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = await import('spectre-react-lib');
const icons = await import('spectre-react-lib/icons');
const experimental = await import('spectre-react-lib/experimental');

assert.ok('Button' in root, 'the ESM root entrypoint should export Button');
assert.ok('Container' in root, 'the ESM root entrypoint should export Container');
assert.ok('Grid' in root, 'the ESM root entrypoint should export Grid');
assert.ok('Shape' in root, 'the ESM root entrypoint should export Shape');
assert.ok('Table' in root, 'the ESM root entrypoint should export Table');
assert.ok('Caption' in root.Table, 'the ESM Table export should include Caption');
assert.ok('HeaderCell' in root.Table, 'the ESM Table export should include HeaderCell');
assert.ok('Cell' in root.Table, 'the ESM Table export should include Cell');
assert.ok('Item' in root.Tab, 'the ESM Tab export should include Item');
assert.equal(root.Tab.Item, root.Tab.Heading, 'the ESM Tab aliases should be identical');
assert.ok('Title' in root.EmptyState, 'the ESM EmptyState export should include Title');
assert.ok('Body' in root.Panel, 'the ESM Panel export should include Body');
assert.ok('Previous' in root.Pagination, 'the ESM Pagination export should include Previous');
assert.ok('Parallax' in root, 'the ESM root should retain the legacy Parallax export');
assert.equal(typeof icons, 'object', 'the ESM icons boundary should be importable');
assert.ok('Parallax' in experimental, 'the ESM experimental entrypoint should export Parallax');
assert.ok('Content' in root.Parallax, 'the root Parallax export should include Content');
assert.ok('Content' in experimental.Parallax, 'the experimental Parallax should include Content');

const packageDirectory = fileURLToPath(new URL('../..', import.meta.url));
const declarations = ['index.d.ts', 'icons.d.ts', 'experimental.d.ts'];

for (const declaration of declarations) {
  assert.ok(
    existsSync(`${packageDirectory}/dist/${declaration}`),
    `dist/${declaration} should be emitted`
  );
}

const deprecatedDeclarations = [
  ['components/Pagination.d.ts', 'onPageChange'],
  ['components/ControlledTab.d.ts', 'defaultValue'],
  ['components/Tab.d.ts', 'Tab.Item'],
  ['components/Toast.d.ts', 'variant="primary"'],
];

for (const [declaration, replacement] of deprecatedDeclarations) {
  const contents = readFileSync(`${packageDirectory}/dist/${declaration}`, 'utf8');
  assert.match(contents, /@deprecated/, `dist/${declaration} should retain its deprecation`);
  assert.ok(
    contents.includes(replacement),
    `dist/${declaration} should name the ${replacement} replacement`
  );
}

assert.deepEqual(
  readdirSync(`${packageDirectory}/dist`).filter((file) => file.endsWith('.css')),
  [],
  'package entrypoints should not emit or inject CSS'
);
