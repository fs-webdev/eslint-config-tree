# eslint-config-tree

This is a shared configuration for all Tree repositories. Contains overrides and enhancements on top of the base configuration located at [https://github.com/fs-webdev/eslint-config-frontier](https://github.com/fs-webdev/eslint-config-frontier).

Utilizes the following plugins:

 - [eslint-plugin-deprecate](https://github.com/AlexMost/eslint-plugin-deprecate)
 - [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)
 - [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
 - [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)
 - [eslint-plugin-json](https://github.com/azeemba/eslint-plugin-json)
 - [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node)
 - [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
 - [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
 - [eslint-config-standard](https://github.com/standard/eslint-config-standard)


![alt text](demo/example-eslint-results.png "Example linting infractions for things the Tree team cares about")

## Usage:

 1. Add either `eslint-config-tree` or `eslint-config-frontier-react` as a devDependency.

 1. Add this repository as a package devDependency:
    
    > "eslint-config-tree": "github:fs-webdev/eslint-config-tree#semver:^1",

 1. In your `eslintrc.js` file, put the following:
<pre><code>module.exports = {
  extends: [
    'frontier',
    'tree'
  ],
  plugins: [
    'eslint-plugin-deprecate',
    'eslint-plugin-sonarjs'
  ]
}</code></pre>

 1. Add both `tree` and the frontier eslint configuration of your choice as Code Climate `prepare` resources (see: [extended eslint docs](https://www.familysearch.org/frontier/legacy/ui-components/eslint-config-frontier/)).

 1. Enjoy.
