// How this configuration tells acceptance tests (WDIO + mocha + chai) apart from unit tests (Jest).
//
// A file is treated as an acceptance test when it lives in an acceptance-test directory, period -- even when
// named `*.test.*`. No supported consumer keeps Jest tests inside an acceptance directory, so the name buys
// no exception (see acceptance-test-files.js).
//
// There are no `jest/*: 'off'` entries here, and that is the point. `jest.js` scopes frontier's Jest
// configuration so it is never loaded on these files in the first place, which is strictly better than muting
// its rules: a suppression list has to be extended every time eslint-plugin-jest adds a rule, and nobody
// notices when it falls behind. What remains below is the positive half -- the mocha and WDIO treatment that
// acceptance tests should get instead.
//
// One consequence worth knowing: `jest/no-commented-out-tests` and `jest/no-jasmine-globals` are framework
// agnostic and were mildly useful here, and they go away too. That is the price of not owning a rule list.

const { acceptanceTestDirectories } = require('./acceptance-test-files')

// Frontier's curated mocha set for `**/*.spec.*` (see @fs/eslint-config-frontier-react/cypress.js), so an
// acceptance test gets the same linting whichever way it was selected. Three entries deviate from frontier --
// `no-exports`, `no-sibling-hooks` and the added `handle-done-callback` -- each explained where it appears.
//
// Deliberately NOT `plugin:mocha/recommended`: that also enables `mocha/no-mocha-arrows`,
// `mocha/no-setup-in-describe`, `mocha/max-top-level-suites`, `mocha/no-global-tests` and
// `mocha/no-pending-tests`, all of which fight how WDIO suites are actually written. `no-mocha-arrows` alone
// would flag 427 `it`/`describe` arrow callbacks across the Tree repos, and ancestors-r9 uses arrows
// exclusively. Frontier's list omits every one of those, which is the main reason to copy it rather than invent.
const mochaSuiteRules = {
  'mocha/consistent-spacing-between-blocks': 'error', // Good for readability and consistency.
  'mocha/no-async-describe': 'error', // Replaces jest/valid-describe-callback.
  'mocha/no-empty-description': 'error', // Replaces jest/valid-title, without rejecting data-driven titles.
  'mocha/no-exclusive-tests': 'error', // Replaces jest/no-focused-tests.
  'mocha/no-identical-title': 'error', // Replaces jest/no-identical-title.
  'mocha/no-nested-tests': 'error', // A developer error; the nested tests are silently ignored.
  'mocha/no-return-and-callback': 'error', // Mocha errors on this as it is confusing to do.
  'mocha/no-skipped-tests': 'error', // Replaces jest/no-disabled-tests and jest/no-test-prefixes.

  // `warn`, not `error`, and deliberately out of step with frontier. Two `before` hooks at the same level is
  // genuinely confusing -- mocha runs both -- but frontier only ever applied this to `*.spec.*`, and no file in
  // the Tree repos is named that way, so it has never actually been enforced. Measured across the five consumer
  // acceptance suites it fires 347 times (183 + 120 + 44, the rest zero), and it is not auto-fixable, so
  // shipping it at `error` would block three repos on a few hundred manual edits. Raise it once they are clean.
  'mocha/no-sibling-hooks': 'warn',

  // Not in frontier's set. `function (done)` is ordinary mocha -- roughly 90 files across the Tree repos use it
  // -- and this rule does not ban the signature. It catches a `done` parameter that is never called, which is
  // the actual bug jest/no-done-callback was firing on for the wrong reason.
  'mocha/handle-done-callback': 'error',

  // Frontier has this at `error`, but it has never been live on Tree code (no file is named `*.spec.*`), and
  // page objects and shared helpers under an acceptance-test directory export on purpose.
  'mocha/no-exports': 'off',
}

module.exports = {
  overrides: [
    {
      files: acceptanceTestDirectories,
      plugins: ['mocha', 'wdio'],
      extends: ['plugin:wdio/recommended'], // wdio/await-expect, wdio/no-debug, wdio/no-pause, and wdio globals
      // `describe`, `it`, `before`, `after`, `beforeEach`, `afterEach`, `xit`, `specify` and `context` all come
      // from here. They currently resolve only because frontier applies `env: { 'cypress/globals': true }` at
      // the top level and cypress's globals happen to include the whole mocha set; declaring it here means
      // acceptance suites stop depending on that accident.
      env: { mocha: true },
      globals: {
        // These five also come from plugin:wdio/recommended. Declared here as well on purpose: if that plugin's
        // shipped config ever changes shape, silently losing them would mean `no-undef` errors across every
        // JavaScript acceptance file in every consumer. `expect` is the one that would hurt most, since every
        // chai assertion depends on it, so the duplication is cheap insurance.
        browser: 'readonly',
        driver: 'readonly',
        expect: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        // Protractor holdovers, supplied by nothing else.
        element: 'readonly',
        by: 'readonly',
      },
      rules: {
        ...mochaSuiteRules,

        'global-require': 'off',
        'no-console': 'off',
        'object-shorthand': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        // chai assertions are bare expression statements: `expect(await x.isDisplayed()).to.be.true`
        '@babel/no-unused-expressions': 'off',
        // WDIO writes `it('Login', async function () {` so the suite can keep `this`.
        'func-names': 'off',
        // Acceptance-test directories use `type: module`, which for now requires explicit extensions. This may
        // stop being the case once everything we import is ESM.
        'import/extensions': 'off',
      },
    },
    {
      // TypeScript acceptance suites. `no-undef` is already off for `.ts` (frontier hands undefined-name
      // checking to the compiler), so the `globals` block above is inert here by design -- TS suites declare
      // `types: ["node", "mocha", "@wdio/globals/types"]` in their acceptance-directory tsconfig.json instead.
      // See the README.
      files: acceptanceTestDirectories.map((directory) => `${directory}/*.ts?(x)`),
      rules: {
        // `type: module` plus TypeScript means a relative import is written `./page.js` while the file on disk
        // is `page.ts`, which eslint-plugin-import's node resolver cannot follow -- it reports every such import
        // as unresolved. Rather than switch the rule off, ignore only that one specifier shape, so a mistyped or
        // unlisted PACKAGE import is still caught -- which is most of what this rule is worth.
        //
        // Residual gap, accepted knowingly: a relative `.js` import that resolves to nothing at all is no longer
        // reported either, because it is indistinguishable from the legitimate case by specifier alone. The
        // proper fix is `eslint-import-resolver-typescript`, which maps `.js` back to `.ts` and would catch both.
        // Deliberately not added here: it would be a new runtime dependency for every consumer of this config,
        // none of them currently has it, and it needs a tsconfig per acceptance directory to work well.
        'import/no-unresolved': ['error', { ignore: ['^\\.{1,2}/.*\\.js$'] }],
      },
    },
  ],
}
