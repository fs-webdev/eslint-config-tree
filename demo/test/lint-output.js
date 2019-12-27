import test from 'ava';
const fileManager = require('file-manager-js');

test('Should have consistent rule output', async t => {
  // Run previously via npm test, save off results, and read output
  return fileManager.readFile('./demo/test/snapshots/new-lint-results.txt')
    .then((content) => {
      const eslintOutput = content.toString(); // content is instance of Buffer, so it needs to be parsed
      return t.snapshot(eslintOutput);
    })
    .catch((err) => {
      console.log(err);
      return t.fail();
    });
});
