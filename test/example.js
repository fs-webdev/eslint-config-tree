// NOTE: A fixture, not a real suite. This is the JavaScript half of the acceptance-test coverage, and it is the
// half that matters most: `no-undef` is ON for `.js` (it is off for `.ts`, where the compiler owns that check),
// so the `globals` block in qa.js is only load-bearing here. Roughly 500 of the ~540 acceptance-test files
// across consumer repos are `.js`, so this file covers the common case and `example.ts` covers the TS one.
//
// Everything up to the last `it` is a pattern the override deliberately allows and must produce no output. The
// last block holds intentional violations, which is how we tell "the override is working" apart from "this file
// was never linted" -- an ignored file and a clean file both produce zero output.

describe('WDIO suite fixture', () => {
  before(function (done) {
    // mocha/handle-done-callback is satisfied because `done` is actually called. jest/no-done-callback would
    // have rejected this signature outright, which is why it is switched off.
    done()
  })

  it('allows the patterns the acceptance override opts into', async function () {
    // Unnamed async function expression above: func-names is off so the suite can keep `this`.
    console.log('acceptance suites log freely') // no-console is off
    // The globals block is what keeps no-undef quiet on all four of these.
    await browser.url('/tree/find')
    const button = await $('[data-testid="search-button"]')
    const rows = await $$('.result-row')
    await element(by.id('legacy-protractor-locator')).isDisplayed()
    // chai assertions are bare expression statements, and its matchers are properties rather than called
    // methods -- @babel/no-unused-expressions and jest/valid-expect are both off for that reason.
    expect(await button.isDisplayed()).to.be.true
    expect(rows).to.have.lengthOf(1)
  })

  it.only('reports through mocha rather than jest', async () => {
    // Two violations, and which rule names appear is the point:
    //   - mocha/no-exclusive-tests fires on `it.only` above, proving eslint-plugin-mocha is loaded here.
    //   - jest/no-focused-tests must NOT appear, proving the jest suppression is in effect. Both rules catch
    //     `.only`, so seeing exactly one of them is the assertion.
    await browser.pause(500) // wdio/no-pause -- proves plugin:wdio/recommended is loaded
    const unusedVar = 3 // no-unused-vars -- proves ordinary rules still apply
  })
})
