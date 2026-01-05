module.exports = {
  overrides: [
    {
      files: ['test/**/*.js'],
      plugins: ['wdio'],
      extends: ['plugin:wdio/recommended'],
      globals: {
        browser: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        element: 'readonly',
        by: 'readonly',
        after: 'readonly',
      },
      rules: {
        'jest/expect-expect': 'off',
        'global-require': 'off',
        'no-console': 'off',
        'object-shorthand': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'testing-library/no-await-sync-query': 'off', // All @testing-library/webdriverio queries are async (https://testing-library.com/docs/webdriverio-testing-library/intro/)
        'testing-library/prefer-screen-queries': 'off', // We use browser instead of screen for @testing-library/webdriverio
        '@babel/no-unused-expressions': 'off', // to allow expressions like this: tree.expect(await (await $(tree.MBTpageObjects.getBCButton())).isDisplayed()).to.be.true
        'func-names': 'off', // to allow for how WDIO does "it" functions: "it('Login', async function () {". We need "this" and we can keep "this" by using "unnamed async function"
      },
    },
  ],
}
