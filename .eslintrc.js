module.exports = {
  extends: ['./index.js'],
  // jest is deliberately NOT a dependency of this package, but `./index` composes `./jest`, whose
  // `jest/no-deprecated-functions` needs a version to work at all -- without one it throws on every file it
  // reaches. Declaring the version here is what any jest-less repo extending the full `index` must do, and it
  // lets the demo fixtures actually exercise the rule (see demo/example.test.js).
  //
  // This file is not published (`files: ["!.*"]` in package.json), so nothing here reaches a consumer. That gap
  // once hid the v6 crash from this repo's own suite -- which is why published-config.test.js loads the entry
  // points with `useEslintrc: false` and pins the consumer experience, with and without this setting.
  settings: { jest: { version: 29 } },
  overrides: [
    {
      files: ['demo/test/**/*.js'],
      rules: {
        // Allow importing devDependencies in test files without requiring them to be resolvable
        // This is needed because AVA v6 uses modern package.json exports that older resolvers don't understand
        'import/no-unresolved': ['error', { ignore: ['^ava$'] }],
      },
    },
  ],
}
