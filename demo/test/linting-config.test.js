// NOTE: This test file runs against untracked files in an attempt to be an early warning system against making changes that would lose configuration that we care about. See the README for more information.

import test from 'ava'
import fileManager from 'file-manager-js'

function processFile(t, filename) {
  // Run previously via npm test, save off results, and read output
  return fileManager
    .readFile(`./demo/test/snapshots/${filename}`)
    .then((content) => {
      const output = content.toString() // content is instance of Buffer, so it needs to be parsed
      return t.snapshot(output)
    })
    .catch((err) => {
      console.log(err) // eslint-disable-line no-console -- Tests use the console.
      return t.fail()
    })
}

test('Should apply a consistent overall eslint configuration', async (t) => {
  return processFile(t, 'local-linting-final-config.json') // If this fails, go cry to mommy
})

test('Should apply a consistent overall eslint configuration for TS', async (t) => {
  return processFile(t, 'local-linting-final-config-ts.json') // If this fails, go cry to mommy
})

// The `test/` directory is where WDIO/QA suites live, and those get their own override in qa.js.
test('Should apply a consistent eslint configuration to QA test files', async (t) => {
  return processFile(t, 'local-linting-final-config-qa.json')
})

test('Should apply a consistent eslint configuration to QA test files for TS', async (t) => {
  return processFile(t, 'local-linting-final-config-qa-ts.json')
})

test('Should apply our custom linting rules consistently', async (t) => {
  return processFile(t, 'local-linting-output.txt')
})

// This is the contract for "which files are Jest and which are WDIO/mocha". Unlike the full configuration dumps
// above, it is small enough to read in a diff, so it is the one to check when changing a selector in qa.js. See
// demo/test/snapshots/config-probes.js for why each file shape is in the matrix.
test('Should resolve test-framework rules consistently for every file shape', async (t) => {
  return processFile(t, 'local-rule-matrix.txt')
})
