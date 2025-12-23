module.exports = {
  extends: ['@fs/eslint-config-frontier-react/react', './es6', './qa'],
  overrides: [{ files: ['src/**'], extends: ['@fs/eslint-config-frontier-react/esx'] }],
}
