import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDirectory = fileURLToPath(new URL('../..', import.meta.url));
const fixtureSource = fileURLToPath(new URL('./react-consumer.mjs', import.meta.url));
const typesFixtureSource = fileURLToPath(new URL('./types-consumer.tsx', import.meta.url));
const typesConfigSource = fileURLToPath(new URL('./types-consumer-tsconfig.json', import.meta.url));
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'spectre-react-lib-'));

/**
 * @param {string} command
 * @param {string[]} arguments_
 * @param {string} cwd
 */
const run = (command, arguments_, cwd) => {
  const result = spawnSync(command, arguments_, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, CI: 'true' },
  });

  assert.equal(
    result.status,
    0,
    [`${command} ${arguments_.join(' ')} failed in ${cwd}`, result.stdout, result.stderr]
      .filter(Boolean)
      .join('\n')
  );
};

try {
  run(
    'bun',
    ['pm', 'pack', '--destination', temporaryDirectory, '--ignore-scripts'],
    packageDirectory
  );

  const tarballName = readdirSync(temporaryDirectory).find((file) => file.endsWith('.tgz'));
  assert.ok(tarballName, 'bun pm pack should produce a tarball');
  const tarball = join(temporaryDirectory, tarballName);

  for (const version of ['18.3.1', '19.2.7']) {
    const reactMajor = version.split('.')[0];
    const fixtureDirectory = join(temporaryDirectory, `react-${version}`);
    const fixturePackage = {
      name: `spectre-react-lib-react-${version}-fixture`,
      private: true,
      type: 'module',
      dependencies: {
        react: version,
        'react-dom': version,
        'spectre-react-lib': `file:${tarball}`,
      },
      devDependencies: {
        '@types/react': reactMajor === '18' ? '^18.3.0' : '^19.2.0',
        '@types/react-dom': reactMajor === '18' ? '^18.3.0' : '^19.2.0',
        'happy-dom': '20.10.6',
        typescript: '7.0.2',
      },
    };

    mkdirSync(fixtureDirectory, { recursive: true });
    writeFileSync(
      join(fixtureDirectory, 'package.json'),
      `${JSON.stringify(fixturePackage, null, 2)}\n`
    );
    copyFileSync(fixtureSource, join(fixtureDirectory, 'react-consumer.mjs'));
    copyFileSync(typesFixtureSource, join(fixtureDirectory, 'types-consumer.tsx'));
    copyFileSync(typesConfigSource, join(fixtureDirectory, 'tsconfig.json'));

    run('bun', ['install', '--ignore-scripts', '--no-progress'], fixtureDirectory);
    run('node', ['react-consumer.mjs', reactMajor], fixtureDirectory);
    run('bunx', ['tsc', '--project', 'tsconfig.json'], fixtureDirectory);
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
