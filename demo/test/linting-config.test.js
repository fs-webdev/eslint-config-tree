// NOTE: This test file runs against untracked files in an attempt to be an early warning system against making changes that would lose configuration that we care about. See the README for more information.

import test from 'ava';
const fileManager = require('file-manager-js');

function processFile (t, filename) {
  // Run previously via npm test, save off results, and read output
  return fileManager.readFile(`./demo/test/snapshots/${filename}`)
    .then((content) => {
      const output = content.toString(); // content is instance of Buffer, so it needs to be parsed
      return t.snapshot(output);
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console -- Tests use the console.
      return t.fail();
    });
}

test('Should apply our custom linting rules consistently', async t => {
  return processFile(t, 'local-linting-output.txt');
});

test('Should apply a consistent overall eslint configuration', async t => {
  return processFile(t, 'local-linting-final-config.json'); // If this fails, go cry to mommy
});
