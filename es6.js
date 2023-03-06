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
    '@fs/eslint-config-frontier-react/dont-need-lodash',
    '@fs/eslint-config-frontier-react/typescript',
    '@fs/eslint-config-frontier-react/prettierSetup', // Always have prettier last so it can override format rules in the extends before it
  ],
  plugins: [
    'eslint-plugin-bestpractices',
    'eslint-plugin-deprecate',
    'eslint-plugin-html',
    'eslint-plugin-jsdoc',
    'eslint-plugin-promise',
    'eslint-plugin-sonarjs',
    'eslint-plugin-test-selectors',
  ],
  rules: {
    'no-restrictive-imports': 'off', // We re-export default imports all the time
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

    'sonarjs/cognitive-complexity': ['warn', 50],
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
      files: ['*.js?(x)', '*.html'],
      rules: {
        'valid-jsdoc': ['warn'],
        // jsdoc/check-access
        'jsdoc/check-alignment': 'warn',
        // jsdoc/check-indentation
        // jsdoc/check-line-alignment
        'jsdoc/check-param-names': 'warn',
        // jsdoc/check-property-names
        'jsdoc/check-syntax': 'warn',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        // jsdoc/check-values
        // jsdoc/empty-tags
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/match-description': 'warn',
        // jsdoc/match-name
        // jsdoc/multiline-blocks
        // jsdoc/newline-after-description
        // jsdoc/no-bad-blocks
        // jsdoc/no-defaults
        // jsdoc/no-missing-syntax
        // jsdoc/no-multi-asterisks
        // jsdoc/no-restricted-syntax
        // jsdoc/no-types
        // jsdoc/no-undefined-types - 2020-01-23: This was broken in eslint-plugin-jsdoc#8 in 2019-06, and hasn't gotten much better. Disabled, for now. Check back later.
        // jsdoc/require-asterisk-prefix
        // jsdoc/require-description-complete-sentence
        'jsdoc/require-description': 'warn',
        // jsdoc/require-example
        // jsdoc/require-file-overview
        'jsdoc/require-hyphen-before-param-description': 'warn',
        // jsdoc/require-jsdoc
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-param': 'warn',
        // 'jsdoc/require-property': 'warn',
        // 'jsdoc/require-property-description': 'warn',
        // 'jsdoc/require-property-name': 'warn',
        // 'jsdoc/require-property-type': 'warn'
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn',
        'jsdoc/require-returns': 'warn',
        // jsdoc/require-throws
        // jsdoc/require-yields
        // jsdoc/require-yields-check
        // jsdoc/sort-tags
        // jsdoc/tag-lines
        // jsdoc/text-escaping
        'jsdoc/valid-types': 'warn',
      },
    },
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
