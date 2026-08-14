// The Jest half of the configuration, published standalone the way frontier ships its granular exports.
// `index.js` composes this alongside `./es6` and `./qa`; a consumer that extends `/es6` directly gets no Jest
// configuration at all -- which is the point for vitest repos (prerender-service, prerender-deliver) that
// previously had to switch every `jest/*` rule off by hand.

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
      rules: {
        // Must live HERE, in this override's own `rules`, not at this file's top level: `@eslint/eslintrc`
        // flattens an extended config AFTER the extending file's top-level entries, so a top-level 'off' here
        // would be overwritten by the `error` that `plugin:jest/recommended` sets inside frontier's override.
        // This block is the last element flattened for every file the frontier config reaches, so it wins.
        //
        // Why off at all: the rule calls `detectJestVersion()` eagerly in `create()`, which THROWS "Unable to
        // detect Jest version" when `jest/package.json` cannot be resolved. Consumers on vitest, or with no
        // unit-test runner at all, therefore cannot lint a single file. The rule only flags APIs that were
        // deprecated in Jest 15-26, so it is not worth that blast radius.
        //
        // Do NOT "fix" this by publishing `settings.jest.version` instead: there is no single true value
        // across consumers, and this package's own `.eslintrc.js` is excluded from the tarball by
        // `files: ["!.*"]`, which is precisely how the bug stayed hidden.
        'jest/no-deprecated-functions': 'off',
      },
    },
  ],
}
