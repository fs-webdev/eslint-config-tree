// NOTE: deliberately no `settings: { jest: { version: 29 } }` here. This file is not published
// (`files: ["!.*"]` in package.json), so anything it supplies is something consumers never receive --
// and that gap is exactly what hid the `jest/no-deprecated-functions` crash from this repo's own test
// suite. Keeping this file as close as possible to what a consumer gets keeps the suite honest.
module.exports = {
  extends: ['./index.js'],
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
