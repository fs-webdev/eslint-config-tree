// NOTE: A fixture, not a real suite. A `*.test.*` file outside an acceptance directory gets frontier's full
// Jest treatment, and the violation below is intentional: `jest/no-deprecated-functions` only works when a
// jest version is known, and jest is deliberately not installed in this repo, so the version comes from
// `settings: { jest: { version } }` in the root `.eslintrc.js`. This error appearing in the lint snapshot is
// the proof that the settings plumbing works and the rule is live for jest repos.

describe('jest fixture', () => {
  it('flags deprecated jest APIs', () => {
    // jest/no-deprecated-functions -- deprecated since jest 26 in favor of jest.resetModules().
    jest.resetModuleRegistry()
    expect(true).toBe(true)
  })
})
