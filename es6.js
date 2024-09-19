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
    '@fs/eslint-config-frontier-react/jest',
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

    'sonarjs/cognitive-complexity': ['warn', 30], // If your component or service gets beyond this point, you should consider scoping functionality differently.
    'sonarjs/max-switch-cases': ['warn', 15], // Yes, reducers are complicated, but if you have this many states, you may need to rethink your architecture. And anything else should generally be much simpler than this.
    'sonarjs/no-all-duplicated-branches': 'warn', // This is both inefficient and confusing. (ERROR in zion)
    'sonarjs/no-collapsible-if': 'warn', // This is still readable, so not high priority.
    'sonarjs/no-collection-size-mischeck': 'warn', // fixable // Unnecessary evaluation. (ERROR in zion)
    'sonarjs/no-duplicate-string': ['warn', { threshold: 4 }], // Maintainability. The more individual instances you have of a string literal, the more likely you miss/misspell one when refactoring.
    'sonarjs/no-duplicated-branches': 'warn', // This is both inefficient and confusing. NOTE: sonarjs's current implementation incorrectly flags single line duplications, sometimes.
    'sonarjs/no-element-overwrite': 'warn', // Unconditional overwrites are usually in error. (ERROR in zion)
    'sonarjs/no-empty-collection': 'warn', // You're not doing what you think you're doing. (ERROR in zion)
    'sonarjs/no-extra-arguments': 'warn', // This mismatch implies lost data somewhere. (ERROR in zion)
    'sonarjs/no-gratuitous-expressions': 'warn', // Unnecessary evaluations, often from later logic revisions.
    'sonarjs/no-identical-conditions': 'warn', // Unreachable code. (ERROR in zion)
    'sonarjs/no-identical-expressions': 'warn', // Unnecessary evaluations, often from copy+paste. (ERROR in zion)
    'sonarjs/no-identical-functions': ['warn', 4], // Inefficient and confusing. (ERROR in zion)
    'sonarjs/no-ignored-return': 'warn', // Inefficient. If you don't use a function's result, don't call it.
    'sonarjs/no-inverted-boolean-check': 'warn', // Complexity. Extra unnecessary cognitive overhead. Usually a result of logic reduction refactors.
    'sonarjs/no-nested-switch': 'warn', // There are a few limited cases where this pattern is preferable to the alternative, but it's mostly a bad idea.
    'sonarjs/no-one-iteration-loop': 'warn', // Complexity. Single loops are unnecessary complications of synchronous code execution. (ERROR in zion)
    'sonarjs/no-redundant-boolean': 'warn', // Readability.
    'sonarjs/no-redundant-jump': 'warn', // fixable // Redundant. We don't need to tell the flow what it would do anyway. (ERROR in zion)
    'sonarjs/no-same-line-conditional': 'warn', // fixable // Readability. Usually a result of an else-y path being removed/modified. (ERROR in zion)
    'sonarjs/no-small-switch': 'warn', // If your logic is not more than an if-else-if-else, it is usually more readable as such.
    'sonarjs/no-unused-collection': 'warn', // Inefficient. If you set up a collection, you should also use it.
    'sonarjs/no-use-of-empty-return-value': 'warn', // Fragility. You are not getting anything to use, so don't use it, otherwise you make your code fragile. (ERROR in zion)
    'sonarjs/no-useless-catch': 'warn', // Redundant, if all you do is re-throw a caught exception.
    'sonarjs/non-existent-operator': 'warn', // fixable // Almost always the result of a typo. (ERROR in zion)
    'sonarjs/prefer-object-literal': 'warn', // Inefficient. If this were auto-fixable, we would care more.
    'sonarjs/prefer-while': 'warn', // fixable // Readability. (ERROR in zion)

    // Disabled Rules:
    'sonarjs/elseif-without-else': 'off', // Disabled. Conflicts with our other autoformatting configuration.
    'sonarjs/no-nested-template-literals': 'off', // We do this a lot, most often with translations.
    'sonarjs/prefer-immediate-return': 'off', // fixable // Disabled. Violations can often be helpful by adhering to a consistent format, or adding a bit of additional context that would otherwise be lost.
    'sonarjs/prefer-single-boolean-return': 'off', // fixable // This is already addressed by our base configuration.

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
      files: ['*.stories.*', '*test*', '**/test/**', '**/*mock*/**', '*mock*', '**/setupTests.*', '**/fixtures/**'],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
        'sonarjs/cognitive-complexity': ['warn', 50],
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
