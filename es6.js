// We use `data-testid` instead of `data-test-id`, in order to match React Native and Testing Library https://testing-library.com/docs/dom-testing-library/api-queries#bytestid
const testSelectorsConfiguration = [
  'warn',
  'always',
  //  htmlOnly: true will exempt components containing the text "Button" from this rule
  { ignoreDisabled: false, ignoreReadonly: false, testAttribute: 'data-testid' },
]

module.exports = {
  extends: [
    '@fs/eslint-config-frontier-react/es6',
    '@fs/eslint-config-frontier-react/json',
    '@fs/eslint-config-frontier-react/jsdoc',
    '@fs/eslint-config-frontier-react/dont-need-lodash',
    '@fs/eslint-config-frontier-react/typescript',
    '@fs/eslint-config-frontier-react/prettierSetup', // Always have prettier last so it can override format rules in the extends before it
  ],
  plugins: [
    'eslint-plugin-bestpractices',
    'eslint-plugin-deprecate',
    'eslint-plugin-html',
    'eslint-plugin-promise',
    'eslint-plugin-sonarjs',
    'eslint-plugin-test-selectors',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'trace', 'time'] }], // Allow warn on top of what eslint-config-frontier-react allows

    'bestpractices/no-eslint-disable': 'warn',

    'promise/always-return': 'warn',
    'promise/no-return-wrap': 'warn',
    'promise/param-names': 'warn',
    'promise/catch-or-return': ['warn', { allowFinally: true }],
    // promise/no-native
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/no-new-statics': 'warn',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',

    'sonarjs/cognitive-complexity': ['warn', 25],
    // sonarjs/elseif-without-else
    'sonarjs/max-switch-cases': ['warn', 10],
    'sonarjs/no-all-duplicated-branches': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    // sonarjs/no-collection-size-mischeck
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-element-overwrite': 'warn',
    'sonarjs/no-empty-collection': 'warn',
    'sonarjs/no-extra-arguments': 'warn',
    'sonarjs/no-gratuitous-expressions': 'warn',
    'sonarjs/no-identical-conditions': 'warn',
    'sonarjs/no-identical-expressions': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    // sonarjs/no-ignored-return
    // sonarjs/no-inverted-boolean-check
    'sonarjs/no-nested-switch': 'warn',
    'sonarjs/no-nested-template-literals': 'warn',
    'sonarjs/no-one-iteration-loop': 'warn',
    'sonarjs/no-redundant-boolean': 'warn',
    'sonarjs/no-redundant-jump': 'warn',
    'sonarjs/no-same-line-conditional': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sonarjs/no-unused-collection': 'warn',
    'sonarjs/no-use-of-empty-return-value': 'warn',
    'sonarjs/no-useless-catch': 'warn',
    'sonarjs/non-existent-operator': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    'sonarjs/prefer-object-literal': 'warn',
    'sonarjs/prefer-single-boolean-return': 'warn',
    'sonarjs/prefer-while': 'warn',

    'test-selectors/anchor': testSelectorsConfiguration,
    'test-selectors/button': testSelectorsConfiguration,
    'test-selectors/input': testSelectorsConfiguration,
    'test-selectors/onChange': testSelectorsConfiguration,
    'test-selectors/onClick': testSelectorsConfiguration,
    'test-selectors/onKeyDown': testSelectorsConfiguration,
    'test-selectors/onKeyUp': testSelectorsConfiguration,
    'test-selectors/onSubmit': testSelectorsConfiguration,

    // Example deprecation rules:
    // 'deprecate/function': ['error',
    //   {'name': 'deprecatedFunction', 'use': 'function x from package y'}
    // ],
    // 'deprecate/import': ['error',
    //   {'name': 'path/to/legacyModule', 'use': 'module x'}
    // ],
    // 'deprecate/member-expression': ['error',
    //   {'name': '$.each', 'use': 'native forEach'}
    // ]
  },
  overrides: [
    {
      files: ['*.stories.*', '*test*', '**/test/**', '**/*mock*/**', '*mock*', '**/setupTests.*'],
      extends: ['@fs/eslint-config-frontier-react/jest'],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off',
        'test-selectors/anchor': 'off',
        'test-selectors/button': 'off',
        'test-selectors/input': 'off',
        'test-selectors/onChange': 'off',
        'test-selectors/onClick': 'off',
        'test-selectors/onKeyDown': 'off',
        'test-selectors/onKeyUp': 'off',
        'test-selectors/onSubmit': 'off',
        'import/prefer-default-export': 'off',
      },
    },
  ],
}
