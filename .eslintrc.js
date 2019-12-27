// Basic .eslintrc.js file that loads the the frontier shared eslint configuration, and then the extension/override provided by the configuration in index.js just for local demonstration purposes. Also contains example `deprecate` rules.
module.exports = {
  extends: [
    'eslint-config-frontier',
    'plugin:eslint-plugin-sonarjs/recommended',
    'plugin:promise/recommended',
    './index.js'
  ],
  plugins: [
    // Enable plugins that are not natively supported by Code Climate. Otherwise results in build errors.
    'eslint-plugin-bestpractices',
    'eslint-plugin-deprecate',
    'eslint-plugin-no-only-tests',
    'eslint-plugin-no-skip-tests',
    'eslint-plugin-promise',
    'eslint-plugin-sonarjs',
    'eslint-plugin-test-selectors' // NOTE: Only runs against JSX
  ],
  rules: {
    'deprecate/function': ['error',
      {'name': 'deprecatedFunction', 'use': 'function x from package y'}
    ],
    'deprecate/import': ['error',
      {'name': 'path/to/legacyModule', 'use': 'module x'}
    ],
    'deprecate/member-expression': ['error',
      {'name': '$.each', 'use': 'native forEach'}
    ]
  }
}
