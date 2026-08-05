// NOTE: A fixture, not a real suite. A `*.test.*` file inside an acceptance-test directory is a genuine Jest
// unit test, not a WDIO suite, so `qa.js` excludes it from every acceptance override via `excludedFiles`. This
// file proves that carve-out at lint level rather than only in the resolved-config snapshots.
//
// Both violations below are intentional, and each one proves a different half of the carve-out.

describe('Jest carve-out fixture', () => {
  it('keeps the Jest assertion checks', () => {
    // jest/valid-expect -- a matcher that is never called asserts nothing. It is switched off for acceptance
    // suites because chai's property-style matchers look identical to this; it must stay ON here.
    expect(1).toBe
  })

  it('does not receive the WDIO globals', async () => {
    // no-undef -- `browser` is only declared for acceptance tests. Its absence here is the point: this file did
    // not pick up the WDIO override.
    await browser.url('/tree/find')
  })
})
