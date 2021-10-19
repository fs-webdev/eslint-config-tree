# eslint-config-tree

This is a shared configuration for all Tree repositories. Contains overrides and enhancements on top of the base configuration located at [https://github.com/fs-webdev/eslint-config-frontier](https://github.com/fs-webdev/eslint-config-frontier).

Why? Because we believe in linting, and we have become converted to the additional rules enforced by the following plugins:

 - [eslint-plugin-bestpractices](https://github.com/skye2k2/eslint-plugin-bestpractices)
 - [eslint-plugin-deprecate](https://github.com/AlexMost/eslint-plugin-deprecate)
 - [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)
 - [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)
 - [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json)
 - [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
 - [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
 - [eslint-config-standard](https://github.com/standard/eslint-config-standard)

> POTENTIALLY WORTH CONSIDERING IN THE FUTURE (MAY NOT WORK BECAUSE OF NEEDING SOMETHING LIKE BABEL?):

> - 'eslint-plugin-i18next' // SEEMS LIKE TOO MANY FALSE POSITIVES
> - 'eslint-plugin-json-format' // DOESN'T SEEM TO WORK
> - 'eslint-plugin-package-json' // undefined TypeErrors while parsing package.json
> - 'eslint-plugin-sort-keys-fix' // RUINS INDENTATION, DOES NOT BRING JSDOCS ALONG

![alt text](demo/example-eslint-results.png "Example linting infractions for things the Tree team cares about")

## Usage:

 1. Add either `eslint-config-frontier` or `eslint-config-frontier-react` as a devDependency.

 1. Add this repository as a package devDependency:

    > "eslint-config-tree": "github:fs-webdev/eslint-config-tree#semver:^4",

 1. In your `eslintrc.js` file, put the following:
<pre><code>module.exports = {
  extends: [
    'eslint-config-frontier', // or '@fs/eslint-config-frontier-react'
    'eslint-config-tree'
  ],
  plugins: [
    'eslint-plugin-bestpractices',
    'eslint-plugin-deprecate',
    'eslint-plugin-promise',
    'eslint-plugin-sonarjs',
    'eslint-plugin-test-selectors'
  ]
}</code></pre>

 1. Add a `.codeclimate.eslintrc.js`
 <pre><code>module.exports = {
  extends: [
    './eslint-config-frontier.js', // or '@fs/eslint-config-frontier-react'
    './eslint-config-tree.js'
  ]
}</code></pre>

 1. Add both `tree` and the frontier eslint configuration of your choice as Code Climate `prepare` resources (see: [extended eslint docs](https://www.familysearch.org/frontier/legacy/ui-components/eslint-config-frontier/)).

 1. Set this simplified eslint configuration as the chosen config in your Code Climate's `plugins`.
 <pre><code>plugins:
		eslint:
			enabled: true
			channel: "eslint-6"
			config:
				config: .codeclimate.eslintrc.js
			extensions:
				- .html
				- .js
				- .json
			ignore_warnings: true
 </code></pre>

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

Note that `--` comments are permitted and a good idea to include.

<!--
DOES NOT CURRENTLY WORK, AND bestpractices/no-eslint-disable SHOULD PROBABLY BE MODIFIED TO TAKE THIS INTO ACCOUNT.
Or disable BOTH the desired rule and the no-eslint-disable rule:

```
// eslint-disable-next-line bestpractices/no-eslint-disable, no-console
```
-->

### How to deal with `Definition for rule '{RULE}' was not found.` errors:

This is a known state when submitting a new file to Code Climate for the first time, since they do not support all of the linting extensions we wish to use. If you are seeing these warnings when linting locally, you may have `eslint` installed globally, but not the additional dependency. We do not recommend running `eslint` globally for this reason (see: https://github.com/eslint/eslint/issues/6732). All Tree repositories should include all dependencies required to be able to run `eslint` locally in their respective directories. 

If you have recently updated dependencies and see this error locally, then there is a possibility that your editor's linting integration is out-of-sync that can be resolved by restarting your editor.

### How to not have tons of `jsdoc` warnings:

The `jsdoc` warnings are only triggered for functions that have an jsdoc extended comment block (`/** */`) directly above the function declaration. Omit this, or just use a short comment (`//`) or a standard extended comment (`/* */`) to keep from applying `jsdoc` rules to functions not requiring fastidious documentation. Or follow all of the rules.

### How to do even trickier things with linting configuration:

Just read the manual: https://eslint.org/docs/7.0.0/user-guide/configuring

<details>
<summary>Maintenance Notes</summary>

## Testing/Updating:

Occasionally, there may be an update which breaks a rule in particular or linting in general. To this end, when running `npm test`, we output the current linting results to a text file, clean it up a little, and employ ava to run a snapshot comparison unit test to determine if our linting output has changed from the previous run.

If there has been a change (say you added a new rule, or there is a new valid violation triggered), you can update the snapshot via `npm run test:update`.

## Notes

- As noted in the `Testing/Updating` section, the only validation we do is to run linting against a file with a set of known failures. So we make sure to run `npm test` via a pre-push hook, and releases are automatically performed by a GitHub webhook.
- Because this is a public repository, there are complications in adding references to private services and communications channels, so there is no Travis CI build and no Code Climate integration.
- Coverage reporting ends up reporting on `lint-output.js`, instead of `index.js`, which is unhelpful, and so is also not used, for now.

</details>

## Changelog:

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
