import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ControlledTab } from 'spectre-react-lib';
import * as icons from 'spectre-react-lib/icons';
import { Parallax } from 'spectre-react-lib/experimental';

const expectedMajor = process.argv[2];
const require = createRequire(import.meta.url);
const commonJsRoot = require('spectre-react-lib');
const commonJsIcons = require('spectre-react-lib/icons');
const commonJsExperimental = require('spectre-react-lib/experimental');

assert.equal(
  React.version.split('.')[0],
  expectedMajor,
  `fixture should run with React ${expectedMajor}`
);
assert.equal(typeof icons, 'object', 'the icons boundary should import without browser globals');
assert.ok('Button' in commonJsRoot, 'the CommonJS root should load in the React fixture');
assert.equal(
  typeof commonJsIcons,
  'object',
  'the CommonJS icons boundary should load in the React fixture'
);
assert.ok(
  'Parallax' in commonJsExperimental,
  'the CommonJS experimental boundary should load in the React fixture'
);

const tabs = React.createElement(ControlledTab, {
  options: [
    {
      label: 'First tab',
      value: 'first',
      render: () => React.createElement('p', null, 'First panel'),
    },
  ],
});
const tabsHtml = renderToString(tabs);

assert.match(tabsHtml, /role="tablist"/, 'ControlledTab should server render');
assert.match(tabsHtml, /aria-controls=/, 'useId relationships should server render');

const parallaxHtml = renderToString(
  React.createElement(Parallax, { title: 'Experimental fixture' }, 'Back layer')
);

assert.match(parallaxHtml, /class="parallax"/, 'the experimental entrypoint should server render');
