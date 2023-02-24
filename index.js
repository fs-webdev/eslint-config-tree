module.exports = {
  env: {
    mocha: true, // Do we really need this?
  },
  extends: ['@fs/eslint-config-frontier-react/react', './es6', '@fs/eslint-config-frontier-react/prettierSetup'],
}
