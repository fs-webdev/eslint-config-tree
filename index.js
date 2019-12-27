module.exports = {
  extends: [
    'eslint-config-standard',
    'plugin:promise/recommended'
    // 'plugin:eslint-plugin-sonarjs/recommended' // Disabled globally, for now, because it is a much higher standard than Tree's existing code currently adheres to. Enable on a case-by-case basis, if you wish.
  ],
  env: {
    'browser': true,
    'mocha': true
  },
  /**
   * @property globals - Tree set of typical global variables, to avoid numerous `no-undef` errors.
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
   * @property plugins - Tree additional linter plugins.
   * @note - Code Climate does not support deprecate and sonarjs, and breaks if they are present. You will need to add these plugins individually in your .eslintrc.js file.
   */
  plugins: [
    // 'eslint-plugin-bestpractices',
    // 'eslint-plugin-deprecate',
    'eslint-plugin-html',
    'eslint-plugin-jsdoc',
    'eslint-plugin-json'
    // 'eslint-plugin-no-only-tests',
    // 'eslint-plugin-no-skip-tests',
    // 'eslint-plugin-sonarjs',
    // 'eslint-plugin-test-selectors' // NOTE: Only runs against JSX
  ],
  /**
   * @property rules - Tree custom rule and additional linter configuration.
   */
  rules: {
    'jsdoc/check-alignment': 'warn',
    'jsdoc/check-examples': 'warn',
    'jsdoc/check-indentation': 'off',
    'jsdoc/check-param-names': 'warn',
    'jsdoc/check-syntax': 'warn',
    'jsdoc/check-tag-names': 'warn',
    'jsdoc/check-types': 'warn',
    'jsdoc/implements-on-classes': 'warn',
    'jsdoc/match-description': 'warn',
    'jsdoc/newline-after-description': 'off',
    'jsdoc/no-types': 'off',
    'jsdoc/no-undefined-types': 'off', // This was broken in eslint-plugin-jsdoc#8 in 2019-06. Disabled, for now. Check back later.
    'jsdoc/require-description-complete-sentence': 'off',
    'jsdoc/require-description': 'warn',
    'jsdoc/require-example': 'off',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-jsdoc': 'warn',
    'jsdoc/require-param-description': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-param-type': 'warn',
    'jsdoc/require-param': 'warn',
    'jsdoc/require-returns-check': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/require-returns-type': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/valid-types': 'warn',

    'jsx-quotes': 'off',

    'no-else-return': 'off',
    'no-extra-semi': 'error',
    'no-shadow': 'warn',
    'no-invalid-this': 'off',
    'no-warning-comments': ['warn', { 'terms': ['FIXME', 'TODO', 'TO-DO', 'HACK', 'HERE BE DRAGONS'], 'location': 'anywhere' }],
    'no-undefined': 'warn',
    'no-case-declarations': 'off',
    'object-curly-spacing': 'off',
    'semi': ['error', 'always'],

    'bestpractices/no-eslint-disable': 'warn',

    'no-only-tests/no-only-tests': 'error',
    'no-skip-tests/no-skip-tests': 'warn',

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

    'test-selectors/anchor': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false }],
    'test-selectors/button': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false }],
    'test-selectors/input': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false }],
    'test-selectors/onChange': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false }],
    'test-selectors/onClick': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false }],
    'test-selectors/onKeyDown': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false }],
    'test-selectors/onKeyUp': ['warn', 'always', { 'ignoreDisabled': false, 'ignoreReadonly': false }]

    // See eslint-config-tree/.eslintrc.js for example deprecation rules.
  }
};
