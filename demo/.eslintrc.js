// Example directory override (still has access to all configuration, extensions, and plugins at the root level, but overrides the settings for this directory and below, if no other .eslintrc.js file exists)
// Common uses are to loosen our normally tight linting ruleset for code that is under development so that TODOs and the like do not crowd out more important warnings (provided that such overrides are removed upon production release)
module.exports = {
  rules: {
    'bestpractices/no-eslint-disable': 'error',
    'sonarjs/no-duplicated-branches': 'error'
  }
};
