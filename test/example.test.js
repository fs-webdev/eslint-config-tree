// NOTE: A fixture, not a real suite. A file in an acceptance-test directory is an acceptance test, period --
// the `*.test.*` Jest naming convention buys no exception (see acceptance-test-files.js). This file proves that
// at lint level rather than only in the resolved-config snapshots: despite the name, the mocha rules fire here
// and the WDIO globals resolve.
//
// The violation below is intentional; the absence of `no-undef` on `browser` is the other half of the proof.

describe('No Jest carve-out fixture', function () {
  // mocha/no-exclusive-tests -- fires despite the `.test.` filename, proving the mocha treatment applies. Its
  // jest equivalent (jest/no-focused-tests) must NOT be the one reporting it.
  it.only('gets the mocha rules despite its name', function () {
    expect(true).to.be.true
  })

  it('receives the WDIO globals', async function () {
    // `browser` resolves without a `no-undef` error only because this file picked up the acceptance override.
    await browser.url('/tree/find')
  })
})
