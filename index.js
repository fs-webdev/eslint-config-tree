// We use `data-testid` instead of `data-test-id`, in order to match React Native and Testing Library https://testing-library.com/docs/dom-testing-library/api-queries#bytestid
const dataTestId = 'data-testid'

module.exports = {
  env: {
    mocha: true, // Do we really need this?
  },
  extends: ['@fs/eslint-config-frontier-react'],
  plugins: ['bestpractices', 'deprecate', 'html', 'import', 'jsdoc', 'promise', 'sonarjs', 'test-selectors'],
  /**
   * @property {object} rules - Tree custom rule and additional linter configuration.
   */
  rules: {
    'default-case': ['warn'], // frontier has this as error
    'lines-between-class-members': 'warn', // frontier has this as error
    'no-case-declarations': 'off', // frontier has this as error
    'no-else-return': 'off', // frontier has this as error
    'no-prototype-builtins': 'warn', // frontier has this as error
    'no-undefined': 'warn', // frontier has this as error
    'prefer-const': 'warn', // frontier has this as error

    'no-warning-comments': [
      'warn',
      // eslint-disable-next-line no-warning-comments -- I don't want a warning here currently
      { terms: ['FIXME', 'TODO', 'TO-DO', 'HACK', 'HERE BE DRAGONS'], location: 'anywhere' }, // frontier removed HERE BE DRAGONS and TO-DO
    ],

    'no-shadow': 'warn', // frontier has this as error, tw-blue has this as off

    'valid-jsdoc': ['warn'], // frontier has this as off

    'jsdoc/check-access': 'off',
    'jsdoc/check-alignment': 'warn',
    'jsdoc/check-indentation': 'off',
    'jsdoc/check-param-names': 'warn',
    // 'jsdoc/check-property-names': 'warn',
    'jsdoc/check-syntax': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-types': 'warn',
    // 'jsdoc/check-values': 'warn',
    // 'jsdoc/empty-tags': 'warn',
    'jsdoc/implements-on-classes': 'warn',
    'jsdoc/match-description': 'warn',
    'jsdoc/newline-after-description': 'off',
    'jsdoc/no-types': 'off',
    'jsdoc/no-undefined-types': 'off', // 2020-01-23: This was broken in eslint-plugin-jsdoc#8 in 2019-06, and hasn't gotten much better. Disabled, for now. Check back later.
    'jsdoc/require-description-complete-sentence': 'off',
    'jsdoc/require-description': 'warn',
    'jsdoc/require-example': 'off',
    'jsdoc/require-file-overview': 'off',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-type': 'warn',
    'jsdoc/require-param': 'warn',
    // 'jsdoc/require-property-description': 'warn',
    // 'jsdoc/require-property-name': 'warn',
    // 'jsdoc/require-property-type': 'warn',
    // 'jsdoc/require-property': 'warn',
    'jsdoc/require-returns-check': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/require-returns-type': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/require-throws': 'off',
    'jsdoc/valid-types': 'warn',

    'import/no-absolute-path': 'warn', // frontier has this as error

    'bestpractices/no-eslint-disable': 'warn',

    'promise/always-return': 'warn',
    'promise/no-return-wrap': 'warn',
    'promise/param-names': 'warn',
    'promise/catch-or-return': ['warn', { allowFinally: true }],
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/avoid-new': 'warn',
    'promise/no-new-statics': 'warn',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',

    'sonarjs/cognitive-complexity': ['warn', 25],
    'sonarjs/max-switch-cases': ['warn', 10],
    'sonarjs/no-all-duplicated-branches': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-element-overwrite': 'warn',
    'sonarjs/no-empty-collection': 'warn',
    'sonarjs/no-extra-arguments': 'warn',
    'sonarjs/no-gratuitous-expressions': 'warn',
    'sonarjs/no-identical-conditions': 'warn',
    'sonarjs/no-identical-expressions': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-inverted-boolean-check': 'off',
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

    'test-selectors/anchor': [
      'warn',
      'always',
      { ignoreDisabled: false, ignoreReadonly: false, testAttribute: dataTestId },
    ],
    'test-selectors/button': [
      'warn',
      'always',
      { ignoreDisabled: false, ignoreReadonly: false, testAttribute: dataTestId },
    ],
    'test-selectors/input': [
      'warn',
      'always',
      { ignoreDisabled: false, ignoreReadonly: false, testAttribute: dataTestId },
    ],
    'test-selectors/onChange': [
      'warn',
      'always',
      { ignoreDisabled: false, ignoreReadonly: false, testAttribute: dataTestId },
    ],
    'test-selectors/onClick': [
      'warn',
      'always',
      { ignoreDisabled: false, ignoreReadonly: false, testAttribute: dataTestId },
    ],
    'test-selectors/onKeyDown': [
      'warn',
      'always',
      { ignoreDisabled: false, ignoreReadonly: false, testAttribute: dataTestId },
    ],
    'test-selectors/onKeyUp': [
      'warn',
      'always',
      { ignoreDisabled: false, ignoreReadonly: false, testAttribute: dataTestId },
    ],

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

  // overrides: [
  //   {
  //     files: ['*.stories.js', '*.test.js', '**/*mock*/**', '*mock*'],
  //     rules: {
  //       'no-alert': 'off',
  //       'no-console': 'off',
  //       'no-unused-vars': 'off',
  //       'sonarjs/no-duplicate-string': 'off',
  //       'sonarjs/no-identical-functions': 'off',
  //       'test-selectors/button': 'off',
  //       'test-selectors/onChange': 'off',
  //     },
  //   },
  // ],
}
