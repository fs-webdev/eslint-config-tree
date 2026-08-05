// How this configuration tells acceptance tests (WDIO + mocha + chai) apart from unit tests (Jest).
//
// A file is treated as an acceptance test when it lives in an acceptance-test directory, UNLESS it is named
// `*.test.*` -- the org-wide Jest convention, which always wins and is excluded from every override below so
// those files keep frontier's untouched `plugin:jest/recommended` treatment.
//
// Why the rules below are a list of `off`s rather than a clean swap: `@fs/eslint-config-frontier-react/jest.js`
// applies `plugin:jest/recommended` to `files: ['*']` -- every file in every repo -- excluding only
// `cypress/**/*`, `**/*.spec.*` and `**/*.cy.*`. A downstream eslintrc config cannot undo that. Two constraints
// in `@eslint/eslintrc` make it impossible:
//   * `mergePlugins` is a pure union, so a plugin an inherited override loaded can never be unloaded. Once the
//     jest plugin is on a file it stays on, and only rule severity can be changed.
//   * An inherited override's `excludedFiles` cannot be amended -- match criteria are baked at load time -- so
//     we cannot simply add our directories to frontier's exclusion list.
// Hence: suppress the jest rules that misread mocha, and enable the mocha equivalents in their place.
//
// Note that these directory patterns resolve against the CONSUMING repo's `.eslintrc.*` directory, not against
// this file. `@eslint/eslintrc` threads `matchBasePath` down from the root config and never recomputes it for
// extended shareable configs, which is what makes directory-based selection possible from inside a shared
// config at all.

const acceptanceTestDirectories = [
  'test/**',
  'tests/**',
  'ui-tests/**',
  // Monorepo packages. Deliberately NOT `**/test/**`: that also matches `src/**/test/**`, which is where Jest
  // unit tests live in this org, and `demo/test/**` in this repo.
  'packages/*/test/**',
  'packages/*/tests/**',
  'packages/*/ui-tests/**',
]

// Excluded from every override in this file, so a genuine Jest test under an acceptance-test directory keeps the
// full Jest treatment instead of the WDIO relaxations.
const jestTestFilenames = ['**/*.test.[tj]s?(x)', '**/*.test.[cm]js']

// Frontier's curated mocha set for `**/*.spec.*` (see @fs/eslint-config-frontier-react/cypress.js), reused
// verbatim so an acceptance test gets the same linting whichever way it was selected.
//
// Deliberately NOT `plugin:mocha/recommended`: that also enables `mocha/no-mocha-arrows`,
// `mocha/no-setup-in-describe`, `mocha/max-top-level-suites`, `mocha/no-global-tests` and
// `mocha/no-pending-tests`, all of which fight how WDIO suites are actually written. `no-mocha-arrows` alone
// would flag 427 `it`/`describe` arrow callbacks across the Tree repos, and ancestors-r9 uses arrows
// exclusively. Frontier's list omits every one of those, which is the main reason to copy it rather than invent.
const mochaSuiteRules = {
  'mocha/consistent-spacing-between-blocks': 'error', // Good for readability and consistence.
  'mocha/no-async-describe': 'error', // Replaces jest/valid-describe-callback.
  'mocha/no-empty-description': 'error', // Replaces jest/valid-title, without rejecting data-driven titles.
  'mocha/no-exclusive-tests': 'error', // Replaces jest/no-focused-tests.
  'mocha/no-identical-title': 'error', // Replaces jest/no-identical-title.
  'mocha/no-nested-tests': 'error', // A developer error; the nested tests are silently ignored.
  'mocha/no-return-and-callback': 'error', // Mocha errors on this as it is confusing to do.
  'mocha/no-skipped-tests': 'error', // Replaces jest/no-disabled-tests and jest/no-test-prefixes.

  // `warn`, not `error`, and deliberately out of step with frontier. Two `before` hooks at the same level is
  // genuinely confusing -- mocha runs both -- but frontier only ever applied this to `*.spec.*`, which no file
  // in the Tree repos is named, so it has never actually been enforced. Piloting the change against
  // tree-person-r9, ancestors-r9, sources-r9 and group-management produced 164 violations, and the rule is not
  // auto-fixable, so shipping it at `error` would simply block four repos. Raise it once they are clean.
  'mocha/no-sibling-hooks': 'warn',

  // Not in frontier's set. `function (done)` is ordinary mocha -- roughly 90 files across the Tree repos use it
  // -- and this rule does not ban the signature. It catches a `done` parameter that is never called, which is
  // the actual bug jest/no-done-callback was firing on for the wrong reason.
  'mocha/handle-done-callback': 'error',

  // Frontier has this at `error`, but it has never been live on Tree code (no file is named `*.spec.*`), and
  // page objects and shared helpers under an acceptance-test directory export on purpose.
  'mocha/no-exports': 'off',
}

// Each of these is either a Jest matcher-grammar rule that misreads chai, or a Jest-runner concept that has no
// mocha equivalent, or has a mocha replacement enabled above.
//
// Deliberately LEFT ON: `jest/no-commented-out-tests` and `jest/no-jasmine-globals`. Both are framework-agnostic
// -- the first is a regex over comments, and the second flags `spyOn`/`jasmine.*`/`fail`, none of which exist
// under WDIO. `jest/no-deprecated-functions` is off globally in index.js because it crashes; see the note there.
const jestRulesThatDoNotApply = {
  // Assertion grammar. Jest matchers are called methods (`expect(x).toBe(true)`); chai's are accessed
  // properties (`expect(x).to.be.true`), which these rules read as a matcher that was never called.
  'jest/expect-expect': 'off',
  'jest/valid-expect': 'off',
  'jest/valid-expect-in-promise': 'off',
  // Silent under chai but live under expect-webdriverio, where asserting in a helper or inside a
  // retry/branching flow is normal.
  'jest/no-standalone-expect': 'off',
  'jest/no-conditional-expect': 'off',

  // Runner semantics that differ between mocha and Jest.
  'jest/no-done-callback': 'off', // Rejects mocha's `function (done)`; see mocha/handle-done-callback.
  'jest/no-disabled-tests': 'off', // Frontier raises this to error; it flags mocha pending tests, `it('todo')`.
  'jest/no-test-prefixes': 'off', // `xit`/`xdescribe` are legitimate mocha.
  'jest/valid-title': 'off', // Rejects titles built from fixture data.
  'jest/no-export': 'off', // Page objects and helpers under an acceptance-test directory export on purpose.

  // Superseded by the mocha rules above.
  'jest/no-focused-tests': 'off',
  'jest/no-identical-title': 'off',
  'jest/valid-describe-callback': 'off',

  // Jest-API-specific and meaningless here.
  'jest/no-alias-methods': 'off',
  'jest/no-mocks-import': 'off',
  'jest/no-interpolation-in-snapshots': 'off',
}

module.exports = {
  overrides: [
    {
      files: acceptanceTestDirectories,
      excludedFiles: jestTestFilenames,
      plugins: ['mocha', 'wdio'],
      extends: ['plugin:wdio/recommended'], // wdio/await-expect, wdio/no-debug, wdio/no-pause, and wdio globals
      // `describe`, `it`, `before`, `after`, `beforeEach`, `afterEach`, `xit`, `specify` and `context` all come
      // from here. They currently resolve only because frontier applies `env: { 'cypress/globals': true }` at
      // the top level and cypress's globals happen to include the whole mocha set; declaring it here means
      // acceptance suites stop depending on that accident.
      env: { mocha: true },
      globals: {
        // `browser`, `$`, `$$`, `driver` and `expect` also come from plugin:wdio/recommended. Declared here as
        // well on purpose: if that plugin's shipped config ever changes shape, silently losing these would mean
        // `no-undef` errors across roughly 500 consumer `.js` files. The duplication is cheap insurance.
        browser: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        // Protractor holdovers, supplied by nothing else.
        element: 'readonly',
        by: 'readonly',
      },
      rules: {
        ...jestRulesThatDoNotApply,
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
      files: acceptanceTestDirectories.map((directory) => directory.replace('/**', '/**/*.ts?(x)')),
      excludedFiles: jestTestFilenames,
      rules: {
        // `type: module` plus TypeScript means a relative import is written `./page.js` while the file on disk
        // is `page.ts`, which eslint-plugin-import's node resolver cannot follow -- it reports every one as
        // unresolved. ancestors-r9 already disables this by hand for exactly this reason.
        'import/no-unresolved': 'off',
      },
    },
  ],
}
