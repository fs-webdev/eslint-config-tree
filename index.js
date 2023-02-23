// We use `data-testid` instead of `data-test-id`, in order to match React Native and Testing Library https://testing-library.com/docs/dom-testing-library/api-queries#bytestid
const dataTestId = 'data-testid'

module.exports = {
  env: { es2021: true, browser: true, mocha: true },
  extends: [
    '@fs/eslint-config-frontier-react/react',
    '@fs/eslint-config-frontier-react/es6',
    '@fs/eslint-config-frontier-react/jest',
    '@fs/eslint-config-frontier-react/dont-need-lodash',
    '@fs/eslint-config-frontier-react/prettierSetup',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false,
  },
  plugins: [
    'bestpractices',
    'deprecate',
    'html',
    'import',
    'jsdoc',
    'json',
    'node',
    'promise',
    'sonarjs',
    'test-selectors',
  ],
  /**
   * @property {object} rules - Tree custom rule and additional linter configuration.
   */
  rules: {
    // Remove following offs when we extend prettier via @fs/eslint-config-frontier-react/prettierSetup
    // These are conflicting/unnecessary rules for prettier as found out by npx eslint-config-prettier file.js
    'max-len': 'off',
    'array-bracket-spacing': 'off',
    'arrow-parens': 'off',
    'arrow-spacing': 'off',
    'block-spacing': 'off',
    'brace-style': 'off',
    'comma-dangle': 'off',
    'comma-spacing': 'off',
    'comma-style': 'off',
    'computed-property-spacing': 'off',
    'dot-location': 'off',
    'eol-last': 'off',
    'func-call-spacing': 'off',
    'function-call-argument-newline': 'off',
    'function-paren-newline': 'off',
    'generator-star-spacing': 'off',
    'implicit-arrow-linebreak': 'off',
    indent: 'off',
    'key-spacing': 'off',
    'keyword-spacing': 'off',
    'linebreak-style': 'off',
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-extra-semi': 'off',
    'no-floating-decimal': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-multi-spaces': 'off',
    'no-multiple-empty-lines': 'off',
    'no-spaced-func': 'off',
    'no-trailing-spaces': 'off',
    'no-whitespace-before-property': 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': 'off',
    'object-property-newline': 'off',
    'one-var-declaration-per-line': 'off',
    'operator-linebreak': 'off',
    'padded-blocks': 'off',
    'quote-props': 'off',
    'rest-spread-spacing': 'off',
    semi: 'off',
    'semi-spacing': 'off',
    'semi-style': 'off',
    'space-before-blocks': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': 'off',
    'space-infix-ops': 'off',
    'space-unary-ops': 'off',
    'switch-colon-spacing': 'off',
    'template-curly-spacing': 'off',
    'template-tag-spacing': 'off',
    'unicode-bom': 'off',
    'wrap-iife': 'off',
    'yield-star-spacing': 'off',
    curly: 'off',
    'no-confusing-arrow': 'off',
    'no-tabs': 'off',
    'no-mixed-operators': 'off',
    'no-unexpected-multiline': 'off',
    quotes: 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',

    'default-case': ['warn'],
    'valid-jsdoc': ['warn'],
    'no-console': 'warn',
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

    'json/undefined': 'error',
    'json/enum-value-mismatch': 'error',
    'json/unexpected-end-of-comment': 'error',
    'json/unexpected-end-of-string': 'error',
    'json/unexpected-end-of-number': 'error',
    'json/invalid-unicode': 'error',
    'json/invalid-escape-character': 'error',
    'json/invalid-character': 'error',
    'json/property-expected': 'error',
    'json/comma-expected': 'error',
    'json/colon-expected': 'error',
    'json/value-expected': 'error',
    'json/comma-or-close-backet-expected': 'error',
    'json/comma-or-close-brace-expected': 'error',
    'json/trailing-comma': 'error',
    'json/duplicate-key': 'error',
    'json/comment-not-permitted': 'error',
    'json/schema-resolve-error': 'error',
    'json/unknown': 'error',

    'jsx-quotes': 'off',

    // These rules went much more strict after updating on 2020-01-23, and are decreased in urgency due to the impact there would be on the existing codebase
    'import/no-absolute-path': 'warn',
    'lines-between-class-members': 'warn',
    'no-case-declarations': 'off',
    'no-else-return': 'off',
    'no-invalid-this': 'off',
    'no-prototype-builtins': 'warn',
    'no-shadow': 'warn',
    'no-undefined': 'warn',
    'no-warning-comments': [
      'warn',
      { terms: ['FIXME', 'TODO', 'TO-DO', 'HACK', 'HERE BE DRAGONS'], location: 'anywhere' },
    ],
    'object-curly-spacing': 'off',
    'prefer-const': 'warn',

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
