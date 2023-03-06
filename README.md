# eslint-config-tree

This is a shared configuration for all Tree repositories. Contains overrides and enhancements on top of the base configuration located at [https://github.com/fs-webdev/eslint-config-frontier](https://github.com/fs-webdev/eslint-config-frontier).

## Unit tests

This central configuration is a potential breaking point for _all_ of our code if we suddenly break our rules, so we have tests in place that verify that our configuration remains consistent between upgrades (primarily that we _know_ what changed), and that the extended cases that we care about are still caught. We do this by utilizing ava's snapshot ability against exported (and slightly modified) linting output and linting configuration. These files are not committed, as they are re-created on each test run, but the resulting snapshot and summary markdown file are part of version control, to make it easier to see changes.

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

![alt text](demo/example-eslint-results.png "Example linting infractions for things the Tree team cares about")

## Usage:

 1. Add this repository as a package devDependency:

    > "eslint-config-tree": "github:fs-webdev/eslint-config-tree#semver:^6",

 1. Add an `eslintrc.js` file, with the following:
<pre><code>module.exports = {
  extends: [
    'eslint-config-tree'
  ]
}</code></pre>

 1. Enjoy.

## HOWTOs:

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
