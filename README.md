# eslint-config-tree

This is a shared configuration for all Tree repositories. Contains overrides and enhancements on top of the base configuration located at [https://github.com/fs-webdev/eslint-config-frontier](https://github.com/fs-webdev/eslint-config-frontier).

## Unit tests

This central configuration is a potential breaking point for _all_ of our code if we suddenly break our rules, so we have tests in place that verify that our configuration remains consistent between upgrades (primarily that we _know_ what changed), and that the extended cases that we care about are still caught. We do this by utilizing ava's snapshot ability against exported (and slightly modified) linting output and linting configuration. These files are not committed, as they are re-created on each test run, but the resulting snapshot and summary markdown file are part of version control, to make it easier to see changes.

The fixtures we lint live in two places, because the config treats them differently: [demo/](/demo) covers ordinary
application code, and [test/](/test) covers the acceptance-test overrides in [qa.js](/qa.js). Neither directory is
published (see the `files` array in `package.json`).

Three layers make up the suite, and they catch different things:

1. **Resolved-configuration snapshots** — four full `eslint --print-config` dumps. These catch losing configuration
   we care about, but only prove a rule is _set_; they say nothing about whether it misfires.
2. **The rule matrix** — generated into `local-rule-matrix.txt` from [config-probes.js](/demo/test/snapshots/config-probes.js) — a compact,
   readable table of which jest/mocha/wdio rules resolve for each file shape that exists in a consumer repo. This
   is the contract for "which files are Jest and which are acceptance tests", and it is the thing to check when
   changing a selector in `qa.js`. Prefer adding a probe here over adding a fifth full dump: each dump is several
   thousand lines of unreviewable snapshot.
3. **Behavioural fixtures** — [test/](/test) contains real mocha + chai + WDIO source that gets linted, so the
   snapshot records which rules actually _fire_. This layer is what catches a correctly-configured rule that
   misreads mocha, which is invisible to layers 1 and 2. Each fixture deliberately contains a couple of known
   violations so that "the override is working" can be told apart from "this file was never linted".

Separately, [published-config.test.js](/demo/test/published-config.test.js) loads the config the way a **consumer**
gets it, with `useEslintrc: false`. This repo's own `.eslintrc.js` is not published, so anything it supplies is
something no consumer receives — that gap once hid a crash that made the package unusable for any repo without
`jest` installed. Those tests keep the fixture environment honest about the real one.

**Process:**

1. Run `npm test` (to determine if any significant rules have changed since the last release)

- The tests will likely fail. Verify newly-consumed rules against the current [snapshot](/demo/test/snapshots/linting-config.test.js.md) file.

1. After verifying, run `npm run test:update`.
1. Make dependency/configuration updates.
1. Run `npm test` (to determine new changes in linting results or configuration).

- The tests should likely fail. Verify your expectations against the current [snapshot](/demo/test/snapshots/linting-config.test.js.md) file.

1. After you have your results how you want them, run `npm run test:update`.

- The tests should now pass.

<!--1. If you want see how your changes would impact a codebase, you can either `npm link` or copy+paste the contents of `local-linting-final-config.json` temporarily into the target `.eslintrc` file.
-->

Why extra rules? Because we believe in linting, and we have become converted to the additional rules enforced by the following plugins:

- [eslint-plugin-bestpractices](https://github.com/skye2k2/eslint-plugin-bestpractices)
- [eslint-plugin-deprecate](https://github.com/AlexMost/eslint-plugin-deprecate)
- [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) (implemented by Frontier)
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)
- [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json) (adopted by Frontier)
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)

> POTENTIALLY WORTH CONSIDERING IN THE FUTURE (MAY NOT WORK BECAUSE OF NEEDING SOMETHING EXTRA?):

> - 'eslint-plugin-i18next' // SEEMS LIKE TOO MANY FALSE POSITIVES
> - 'eslint-plugin-json-format' // DOESN'T SEEM TO WORK
> - 'eslint-plugin-package-json' // undefined TypeErrors while parsing package.json
> - 'eslint-plugin-sort-keys-fix' // RUINS INDENTATION, DOES NOT BRING JSDOCS ALONG

![alt text](demo/example-eslint-results.png 'Example linting infractions for things the Tree team cares about')

## Usage:

1.  Add the package as a devDependency:

    > "@fs/eslint-config-tree": "^7.0.0",

1.  Add an `eslintrc.js` file, with the following:
<pre><code>module.exports = {
  extends: [
    '@fs/eslint-config-tree'
  ]
}</code></pre>

1.  Enjoy.

> Installing from a git URL (`github:fs-webdev/eslint-config-tree#semver:^6`) still works and is what older
> instructions described, but every current consumer uses the registry package above.

## HOWTOs:

### How to lint WDIO/QA suites:

**A file is an acceptance test if it lives in an acceptance-test directory. Period — the name does not matter.**

The acceptance-test directory is `test/`, resolved relative to your `.eslintrc` rather than the repo root. That
distinction matters for a repo whose suite lives somewhere else — say `ui-tests/` — but keeps its own eslintrc
inside it: what counts is the path from that config file, so `ui-tests/test/` is matched while a root-level
`ui-tests/` is not. Files in it pick up `eslint-plugin-wdio`, `eslint-plugin-mocha`, the WDIO globals, and a set of relaxations for patterns that
are normal in acceptance tests but not in application code — see [qa.js](/qa.js), which documents each one.

The Jest configuration is not merely relaxed for these files, it is never loaded on them: [jest.js](/jest.js)
scopes it so `eslint-plugin-jest` never sees an acceptance test. That is why `qa.js` carries no list of
`jest/*: 'off'` entries to keep up to date. (`jest.js` is its own entry point, composed into the default
`index`; a repo with no Jest at all — vitest, say — can extend `@fs/eslint-config-tree/es6` directly and get a
configuration with no `jest/*` rules anywhere.)

The `*.test.*` naming convention buys no exception: `test/helpers.test.js` gets the mocha/WDIO treatment like
any other file in the directory, so a genuine Jest unit test should not live there — no supported consumer keeps
one there today. Note the deliberate asymmetry — a nested `src/**/test/**` directory is **not** an acceptance
directory, because that is where Jest unit tests live in this org.

**Why mocha rules instead of Jest rules.** WDIO suites are mocha + chai, but the base configuration applies
`plugin:jest/recommended` to every file in every repo. `eslint-plugin-jest` cannot tell mocha's `describe`/`it`
from Jest's, so it applies Jest semantics to mocha code and reports things that are not real: chai's matchers are
accessed properties (`expect(x).to.be.true`) rather than called methods (`expect(x).toBe(true)`), so
`jest/valid-expect` reads them as a matcher you forgot to call, and `jest/no-done-callback` rejects mocha's
`function (done)` signature outright. Those rules are therefore switched off for acceptance tests and the mocha
equivalents enabled in their place — `mocha/no-exclusive-tests` for `jest/no-focused-tests`,
`mocha/no-skipped-tests` for `jest/no-disabled-tests`, and `mocha/handle-done-callback`, which checks that `done`
is actually called rather than banning the signature.

**TypeScript suites need a tsconfig, not config here.** The WDIO globals (`browser`, `$`, `$$`, …) are declared for
`.js` suites, where `no-undef` is on. They have no effect on `.ts` suites, where `no-undef` is disabled in favor of
the compiler. A TypeScript suite should instead have a `tsconfig.json` in its acceptance directory with:

```json
{
  "extends": "@fs/qa-ts-config/tsconfig.test.json",
  "compilerOptions": { "types": ["node", "mocha", "@wdio/globals/types"] },
  "include": ["**/*.ts", "**/*.js"],
  "exclude": ["node_modules"]
}
```

Two details matter more than they look. The `include` has to reach the suites themselves — a tsconfig that only
covers a runner script leaves them outside the project, so the globals never arrive. And overriding `types` is
deliberate: `@fs/qa-ts-config/tsconfig.test.json` ships `jest` in that array, while a WDIO suite wants `mocha`.

This package applies the equivalent configuration to its own fixtures — see
[test/tsconfig.json](/test/tsconfig.json), which inlines the same compiler options rather than extending
`@fs/qa-ts-config` — so the advice is exercised rather than just written down.

**One trap worth knowing before you convert a suite.** `@wdio/globals/types` declares a global `expect` typed as
expect-webdriverio, and it shadows chai's. A chai-style `expect(x).to.be.true` therefore will not type-check,
and adding `chai` to the `types` array does not change that — verified. Suites asserting with chai should import
it explicitly:

```ts
import { expect } from 'chai'
```

which is already how most existing suites are written. ESLint is happy either way; this is purely a
type-checking concern.

### How to override linting rules for a directory and all of its contents:

Add an `eslintrc.js` file to that directory with the necessary overrides, like so:

```
module.exports = {
  rules: {
    'bestpractices/no-eslint-disable': 'off|warn|error',
  }
}
```

### How to override linting rules for specific files:

Add an `overrides` section to your `eslintrc.js` file to target those files with the necessary overrides, like so:

```
overrides: [
	{
	  files: ['*.stories.js', '*.test.js'],
	  rules: {
		// We do not need to enforce selector rules in test/demo files
	    'test-selectors/button': 'off',
	    'test-selectors/onChange': 'off',
	  },
	},
],
```

### How to disable a linting rule inline without triggering the `no-eslint-disable` rule:

Utilize a file linting config modifier like so:

```
/* eslint no-console: "off" -- node scripts use the console */

```

Note that `--` comments are permitted and a very good idea to include.

<!--
DOES NOT CURRENTLY WORK, AND bestpractices/no-eslint-disable SHOULD PROBABLY BE MODIFIED TO TAKE THIS INTO ACCOUNT.
Or disable BOTH the desired rule and the no-eslint-disable rule:

```
// eslint-disable-next-line bestpractices/no-eslint-disable, no-console
```
-->

### How to deal with `Definition for rule '{RULE}' was not found.` errors:

If you are seeing these warnings when linting locally, you may have `eslint` installed globally, but not the additional dependency. We do not recommend running `eslint` globally for this reason (see: https://github.com/eslint/eslint/issues/6732). All Tree repositories should include all dependencies required to be able to run `eslint` locally in their respective directories.

If you have recently updated dependencies and see this error locally, then there is a possibility that your editor's linting integration is out-of-sync that can be resolved by restarting your editor.

### How to not have tons of `jsdoc` warnings:

The `jsdoc` warnings are only triggered for functions that have an jsdoc extended comment block (`/** */`) directly above the function declaration. Omit this, add an extra space, or just use a short comment (`//`) or a standard extended comment (`/* */`) to keep from applying `jsdoc` rules to functions not requiring fastidious documentation. Or follow all of the rules.

<details>
<summary>Maintenance Notes</summary>

## Testing/Updating:

Occasionally, there may be an update which breaks a rule in particular or linting in general. To this end, when running `npm test`, we output the current linting results to a text file, clean it up a little, and employ ava to run a snapshot comparison unit test to determine if our linting output has changed from the previous run.

If there has been a change (say you added a new rule, or there is a new valid violation triggered), you can update the snapshot via `npm run test:update`.

## Notes

- Why no lockfile? Because we (currently) trust our dependencies, and do not want to constantly have to be verifying and manually releasing new versions of this convenience configuration. We may decide to be more precise in the future.
- As noted in the `Testing/Updating` section, the only validation we do is to run linting against a file with a set of known failures. So we make sure to run `npm test` via a pre-push hook, and releases are automatically performed by a GitHub webhook.
- Because this is a public repository, there are complications in adding references to private services and communications channels, so there is no Travis CI build.
- Coverage reporting ends up reporting on `lint-output.js`, instead of `index.js`, which is unhelpful, and so is also not used, for now.

</details>

## Changelog:

<details>
<summary>Version 7 </summary>

- QA/WDIO suites are linted as mocha instead of jest. Chai assertions and `function (done)` are no longer misreported, and ten `mocha/*` rules take the place of the jest ones. The jest plugin is no longer loaded on them at all.
- TypeScript QA suites are now linted. The override previously matched `test/**/*.js` only.
- QA directories are matched relative to your `.eslintrc` rather than the repo root, so a suite whose eslintrc sits inside its own directory is matched from there.
- A file inside a QA directory is an acceptance test regardless of its name — the previous `*.test.*` Jest carve-out is gone. No supported consumer has such a file; if you do, move it out of the QA directory (or rename the directory's role), because it will now be linted as mocha.
- The Jest configuration moved into its own `jest.js` entry point (composed into the default `index`), so extending `@fs/eslint-config-tree/es6` directly now yields a configuration with no `jest/*` rules at all. Vitest repos that disabled every jest rule by hand can delete that workaround.
- Fixed a crash for consumers without jest installed (`jest/no-deprecated-functions` threw on every file).
- `eslint-plugin-mocha` is now a dependency of this package rather than something you happened to get via hoisting.
- Deliberately given up, all on QA files only: `jest/no-commented-out-tests` and `jest/no-jasmine-globals` (the price of not loading the plugin), and `import/no-unresolved` no longer flags a relative `./x.js` import in a TypeScript suite that resolves to nothing — it cannot be told apart from the legitimate `.js`-means-`.ts` case. Package imports are still checked.

</details>

<details>
<summary>Version 6 - ESLint 8</summary>

- Update all linting subdependencies. Remove redundant plugins (eslint-plugin-json adopted by Frontier).
- Remove Code Climate/Polymer-related configurations and documentation.
- Add new final configuration test.
- Inherit more configuration from frontier (finally).

</details>

<details>
<summary>Version 5 </summary>

- Update all linting subdependencies.
- Add new rules.
- Set more reasonable defaults for some rules.
- Add best practices and examples for managing linting in varying projects.

</details>

<details>
<summary>Version 4 </summary>

- `eslint-plugin-no-only-tests` & `eslint-plugin-no-skip-tests` are redundant to to newly-implemented `jest/no-focused-tests` & `jest/no-disabled-tests` and have been removed.

</details>

<details>
<summary>Version 3 - ESLint 7</summary>

- ESLint and dependencies updated to version 7.

</details>

<details>
<summary>Version 2 - ESLint 6</summary>

- ESLint and dependencies based on version 6.

</details>

<details>
<summary>Version 1 - ESLint 5</summary>

- ESLint and dependencies based on version 5.
- Add eslint-plugin-bestpractices, eslint-plugin-deprecate, eslint-plugin-html, eslint-plugin-jsdoc, eslint-plugin-json, eslint-plugin-promise, eslint-plugin-sonarjs, eslint-config-standard

</details>
