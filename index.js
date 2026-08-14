// Composed from granular exports, the way frontier builds its own `index`: `./es6` is the framework-agnostic
// base, `./jest` scopes frontier's Jest configuration away from acceptance tests, and `./qa` supplies the
// mocha + WDIO treatment those acceptance tests get instead. A consumer that wants no Jest configuration at
// all (vitest, no unit-test runner) extends `./es6` directly.
module.exports = {
  extends: ['@fs/eslint-config-frontier-react/react', './es6', './jest', './qa'],
  overrides: [{ files: ['src/**'], extends: ['@fs/eslint-config-frontier-react/esx'] }],
}
