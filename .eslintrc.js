module.exports = {
  extends: ['./index.js'],
  // Neither jest nor react is a dependency of this package, so both versions are declared rather than
  // detected. jest: `./index` composes `./jest`, whose `jest/no-deprecated-functions` needs a version to work
  // at all -- without one it throws on every file it reaches. Declaring it is what any jest-less repo
  // extending the full `index` must do, and it lets the demo fixtures actually exercise the rule (see
  // demo/example.test.js). react: frontier sets `version: 'detect'`, and with no react installed
  // eslint-plugin-react assumes "latest" (with a warning on every run) -- so what the fixtures are linted
  // against would silently drift as the plugin updates. Pinned to 18, which is what the Tree repos run.
  //
  // This file is not published (`files: ["!.*"]` in package.json), so nothing here reaches a consumer. That gap
  // once hid the v6 crash from this repo's own suite -- which is why published-config.test.js loads the entry
  // points with `useEslintrc: false` and pins the consumer experience, with and without these settings.
  settings: { jest: { version: 29 }, react: { version: '18.3.1' } },
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
