// NOTE: This is a fixture, not a real test suite. It lives in `test/` because that is the directory the WDIO/QA
// override in qa.js targets, and it is linted by the `lint:snapshot` script so that local-linting-output.txt proves
// the override applies to TypeScript suites -- not just that it resolves in the --print-config snapshots.
//
// It is deliberately NOT named `*.spec.ts`. The base frontier configuration swaps the jest plugin out for mocha on
// `*.spec.*` and already sets `@babel/no-unused-expressions: off` there, so under that name the chai assertion below
// would lint clean whether or not qa.js existed. Under this name the relaxation is qa.js's alone, and the file also
// exercises the jest-plugin branch of the config. The trade-off is that the mocha branch that a conventionally-named
// `test/*.spec.ts` suite resolves to is not covered here -- see the known gaps noted at the bottom of this file.
//
// Everything in the first `it` block is a pattern the override deliberately allows, so it should produce no output.
// The second `it` block violates rules the override leaves on, which is how we tell "the override is working" apart
// from "this file was never linted at all" -- an ignored file and a clean file both produce zero output.

describe('WDIO suite fixture', () => {
  it('allows the patterns the qa override opts into', async function () {
    // Unnamed async function expression above: func-names is off, so WDIO suites can keep `this`. This one and
    // the chai assertion below are the two relaxations this fixture actually pins down -- both are `warn` here
    // without qa.js.
    console.log('WDIO suites log freely')
    await browser.url('/tree/find')
    const button = await $('[data-testid="search-button"]')
    // Chai-style assertions are bare expression statements: @babel/no-unused-expressions is off
    expect(await button.isDisplayed()).to.be.true
    expect(await $$('.result-row')).to.have.lengthOf(1)
  })

  it('still reports rules the qa override leaves on', async () => {
    await browser.pause(500) // wdio/no-pause -- proves plugin:wdio/recommended is loaded here
    const unusedVar = 3 // @typescript-eslint/no-unused-vars -- proves the TS rules still apply
  })
})

// Known gaps this fixture does not close:
// 1. The `globals` block in qa.js is inert for TypeScript, because `no-undef` is off for `.ts` (see the README).
//    `browser`/`$`/`$$` above would lint clean even with that block deleted. Only a `.js` fixture can pin it down,
//    and that would also cover the `test/**/*.js` half of the override, which today has no lint-level coverage.
// 2. No fixture or --print-config snapshot covers `test/*.spec.ts`, which is how WDIO suites are conventionally
//    named and which resolves to a different (mocha, no jest plugin) branch of the configuration.
