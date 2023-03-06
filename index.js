module.exports = {
  extends: [
    '@fs/eslint-config-frontier-react/react',
    './es6',
    '@fs/eslint-config-frontier-react/prettierSetup', // TODO: Please make note of why prettier goes *after* our custom linting configuration
  ],
}
