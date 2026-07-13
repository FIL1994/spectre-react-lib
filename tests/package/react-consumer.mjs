import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { Window } from 'happy-dom';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Container, ControlledTab, Shape, Table } from 'spectre-react-lib';
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
  id: 'fixture-tabs',
  defaultValue: 'first',
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
assert.match(
  tabsHtml,
  /aria-controls=/,
  'explicit ControlledTab relationships should server render'
);
assert.match(tabsHtml, /fixture-tabs-panel/, 'explicit ControlledTab IDs should server render');

const generatedTabs = React.createElement(ControlledTab, {
  options: [
    {
      label: 'Generated tab',
      value: 'generated',
      render: () => React.createElement('p', null, 'Generated panel'),
    },
  ],
});
const generatedTabsHtml = renderToString(generatedTabs);
assert.match(generatedTabsHtml, /aria-controls=/, 'generated IDs should server render');

const browserWindow = new Window({ url: 'http://localhost' });
const hydrationContainer = browserWindow.document.createElement('div');
hydrationContainer.innerHTML = generatedTabsHtml;
browserWindow.document.body.append(hydrationContainer);

const browserGlobals = {
  window: browserWindow,
  document: browserWindow.document,
  navigator: browserWindow.navigator,
  HTMLElement: browserWindow.HTMLElement,
  Node: browserWindow.Node,
};

for (const [name, value] of Object.entries(browserGlobals)) {
  Object.defineProperty(globalThis, name, { configurable: true, value });
}

const hydrationErrors = /** @type {unknown[]} */ ([]);
const { hydrateRoot } = await import('react-dom/client');
const hydrationTarget = /** @type {Parameters<typeof hydrateRoot>[0]} */ (
  /** @type {unknown} */ (hydrationContainer)
);
hydrateRoot(hydrationTarget, generatedTabs, {
  onRecoverableError(error) {
    hydrationErrors.push(error);
  },
});
await new Promise((resolve) => setTimeout(resolve, 10));

assert.deepEqual(hydrationErrors, [], 'generated ControlledTab IDs should hydrate cleanly');
const hydratedTab = hydrationContainer.querySelector('[role="tab"]');
const hydratedPanel = hydrationContainer.querySelector('[role="tabpanel"]');
assert.ok(hydratedTab, 'hydration should retain the generated tab');
assert.ok(hydratedPanel, 'hydration should retain the generated panel');
assert.equal(
  hydratedTab.getAttribute('aria-controls'),
  hydratedPanel.id,
  'hydrated generated ID relationships should match'
);

const parallaxHtml = renderToString(
  React.createElement(Parallax, { title: 'Experimental fixture' }, 'Back layer')
);

assert.match(parallaxHtml, /class="parallax"/, 'the experimental entrypoint should server render');
assert.doesNotMatch(
  parallaxHtml,
  /<button/,
  'Parallax should not server render interactive corners without callbacks'
);

const compoundParallaxHtml = renderToString(
  React.createElement(
    Parallax,
    null,
    React.createElement(
      Parallax.Content,
      null,
      React.createElement(Parallax.Front, null, 'Front'),
      React.createElement(Parallax.Back, null, 'Back')
    )
  )
);
assert.match(compoundParallaxHtml, /parallax-front/, 'Parallax compounds should server render');

const table = React.createElement(
  Table,
  { scrollable: true },
  React.createElement(Table.Caption, null, 'Phase 1 fixture'),
  React.createElement(
    Table.Body,
    null,
    React.createElement(Table.Row, { active: true }, React.createElement(Table.Cell, null, 'Cell'))
  )
);
const phaseOneHtml = renderToString(
  React.createElement(
    Container,
    { size: 'md' },
    table,
    React.createElement(Shape, {
      shape: 'circle',
      legacyDefaults: false,
      'aria-label': 'Shape',
    })
  )
);

assert.match(phaseOneHtml, /class="container grid-md"/, 'Container should server render');
assert.match(phaseOneHtml, /table-scroll/, 'Table compounds should server render');
assert.match(phaseOneHtml, /s-circle/, 'canonical Shape should server render');
