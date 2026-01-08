module.exports = {
  extends: ['./index.js'],
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
