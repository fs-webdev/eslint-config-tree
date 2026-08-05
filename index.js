module.exports = {
  extends: ['@fs/eslint-config-frontier-react/react', './es6', './qa'],
  rules: {
    // Must stay a TOP-LEVEL rule, not an override: frontier applies `plugin:jest/recommended` to
    // `files: ['*']`, so this rule lands on every file and has to be switched off just as broadly.
    //
    // `plugin:jest/recommended` sets it to `error`, and the rule calls `detectJestVersion()` eagerly in
    // `create()`, which THROWS "Unable to detect Jest version" when `jest/package.json` cannot be
    // resolved. Consumers on vitest, or with no unit-test runner at all, therefore cannot lint a single
    // file -- `prerender-service` and `prerender-deliver` both hand-patch this today by looping over
    // `Object.keys(jestPlugin.rules)` and setting every one to 'off'. The rule only flags APIs that were
    // deprecated in Jest 15-26, so it is not worth that blast radius.
    //
    // Do NOT "fix" this by publishing `settings.jest.version` instead: there is no single true value
    // across consumers, and this package's own `.eslintrc.js` is excluded from the tarball by
    // `files: ["!.*"]`, which is precisely how the bug stayed hidden.
    'jest/no-deprecated-functions': 'off',
  },
  overrides: [{ files: ['src/**'], extends: ['@fs/eslint-config-frontier-react/esx'] }],
}
