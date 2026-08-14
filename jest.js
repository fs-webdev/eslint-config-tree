// The Jest half of the configuration, published standalone the way frontier ships its granular exports.
// `index.js` composes this alongside `./es6` and `./qa`; a consumer that extends `/es6` directly gets no Jest
// configuration at all -- which is the point for vitest repos (prerender-service, prerender-deliver) that
// previously had to switch every `jest/*` rule off by hand.
//
// Extending this entry point is a statement that the repo is a Jest repo. In particular,
// `jest/no-deprecated-functions` calls `detectJestVersion()` eagerly in `create()` and THROWS on every file
// when `jest/package.json` cannot be resolved -- so a repo without jest installed must either not extend this
// (use `/es6`) or declare `settings: { jest: { version: <n> } }` in its own eslintrc. This repo does the
// latter for its own fixtures, since jest is deliberately not one of its dependencies. The v6 behavior --
// jest configuration forced on every consumer, crashing the jest-less ones -- is the thing the split fixes.

const { acceptanceTestDirectories } = require('./acceptance-test-files')

module.exports = {
  overrides: [
    // Frontier applies `plugin:jest/recommended` to `files: ['*']` -- every file in every repo. Extending it
    // here inside an override scopes it instead: `@eslint/eslintrc` ANDs this entry's criteria with the ones
    // inside the config being extended, so the Jest plugin is simply never loaded on acceptance tests.
    //
    // This is why qa.js does not carry a list of `jest/*: 'off'` entries. Suppressing rules one at a time only
    // works until eslint-plugin-jest adds another one; not loading the plugin cannot rot the same way.
    //
    // Frontier's jest.js carries slightly more than jest: `plugins: ['@fs/zion']` and
    // `@fs/zion/logical-over-directional: 'warn'` ride along at its top level, and nothing else in the chain
    // loads that plugin -- so acceptance files lose that warn too. Considered and accepted: WDIO suites are
    // not React code, so the rule has nothing to say there.
    {
      files: ['*'],
      excludedFiles: acceptanceTestDirectories,
      extends: ['@fs/eslint-config-frontier-react/jest'],
    },
  ],
}
