// We use `data-testid` instead of `data-test-id`, in order to match React Native and Testing Library https://testing-library.com/docs/dom-testing-library/api-queries#bytestid
const dataTestId = 'data-testid';

module.exports = {

  // NOTE: See .eslintrc.js for example `extends` and `plugins` sections, which have to be done individually by each repository because of Code Climate not supporting everything we use.

  extends: [
    'eslint-config-standard'
  ],

  /**
   * @property {object} env - Base environments to enable associated globals.
   */
  env: {
    'browser': true,
    'mocha': true
  },
  /**
   * @property {object} globals - Tree set of typical global variables, to avoid numerous `no-undef` errors.
   */
  globals: {
    '__services__': true,
    'assert': true,
    'axe': true,
    'customElements': true,
    'CustomEvent': true,
    'd3': true,
    'Event': true,
    'expect': true,
    'fixture': true,
    'google': true, // Used for google.maps API
    'FS': true,
    'FsBehaviors': true,
    'FSResearchHelpService': true,
    'FSTreeCommonRoutingService': true,
    'Headers': true,
    'HF': true,
    'HTMLElement': true,
    'indexedDB': true,
    'location': true,
    'Polymer': true,
    'ResettablePropertiesBehavior': true,
    'sessionStorage': true,
    'sinon': true,
    'WCI18n': true,
    'WCT': true
  },
  parser: 'babel-eslint',
  /**
   * @property {object} plugins - Tree additional linter plugins.
   * @note - Code Climate does not yet support bestpractices, deprecate, no-only-tests, no-skip-tests, sonarjs, and test-selectors, and breaks if they are present. You will need to add these plugins individually in your .eslintrc.js file. The first time you add a file, Code Climate will complain about not being able to find the definitions for these extra rules once for every new file. Obnoxious, but the best we have, for now.
   */
  plugins: [
    // 'eslint-plugin-bestpractices',
    // 'eslint-plugin-deprecate',
    'eslint-plugin-html',
    'eslint-plugin-jsdoc',
    'eslint-plugin-json'
    // 'eslint-plugin-no-only-tests',
    // 'eslint-plugin-no-skip-tests',
    // 'eslint-plugin-promise',
    // 'eslint-plugin-sonarjs',
    // 'eslint-plugin-test-selectors' // NOTE: Only runs against JSX
  ],
  /**
   * @property {object} rules - Tree custom rule and additional linter configuration.
   */
  rules: {
    'jsdoc/check-access': 'off',
    'jsdoc/check-alignment': 'warn',
    'jsdoc/check-examples': 'warn',
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
    'array-bracket-spacing': 'warn',
    'import/no-absolute-path': 'warn',
    'lines-between-class-members': 'warn',
    'no-case-declarations': 'off',
    'no-else-return': 'off',
    'no-extra-semi': 'error',
    'no-invalid-this': 'off',
    'no-prototype-builtins': 'warn',
    'no-shadow': 'warn',
    'no-undefined': 'warn',
    'no-warning-comments': ['warn', { 'terms': ['FIXME', 'TODO', 'TO-DO', 'HACK', 'HERE BE DRAGONS'], 'location': 'anywhere' }],
    'object-curly-newline': 'warn',
    'object-curly-spacing': 'off',
    'prefer-const': 'warn',
    'quote-props': 'off',
    'quotes': 'off',
    'semi': ['error', 'always'],

    'bestpractices/no-eslint-disable': 'warn',

    'no-only-tests/no-only-tests': 'error',
    'no-skip-tests/no-skip-tests': 'warn',

    'promise/always-return': 'warn',
    'promise/no-return-wrap': 'warn',
    'promise/param-names': 'warn',
    'promise/catch-or-return': 'warn',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/avoid-new': 'warn',
    'promise/no-new-statics': 'warn',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',

    'sonarjs/cognitive-complexity': 'warn',
    'sonarjs/max-switch-cases': 'warn',
    'sonarjs/no-all-duplicated-branches': 'warn',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-element-overwrite': 'warn',
    'sonarjs/no-extra-arguments': 'warn',
    'sonarjs/no-identical-conditions': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-identical-expressions': 'warn',
    'sonarjs/no-inverted-boolean-check': 'off',
    'sonarjs/no-one-iteration-loop': 'warn',
    'sonarjs/no-redundant-boolean': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sonarjs/no-use-of-empty-return-value': 'warn',
    'sonarjs/no-useless-catch': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    'sonarjs/prefer-object-literal': 'warn',
    'sonarjs/prefer-single-boolean-return': 'warn',
    'sonarjs/prefer-while': 'warn',

    'test-selectors/anchor': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false, "testAttribute": dataTestId }],
    'test-selectors/button': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false, "testAttribute": dataTestId }],
    'test-selectors/input': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false, "testAttribute": dataTestId }],
    'test-selectors/onChange': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false, "testAttribute": dataTestId }],
    'test-selectors/onClick': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false, "testAttribute": dataTestId }],
    'test-selectors/onKeyDown': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false, "testAttribute": dataTestId }],
    'test-selectors/onKeyUp': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false, "testAttribute": dataTestId }]

    // See eslint-config-tree/.eslintrc.js for example deprecation rules.
  }
};
