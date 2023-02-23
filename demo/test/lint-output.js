import test from 'ava'

const fileManager = require('file-manager-js')

function processFile (t, filename) {
  // Run previously via npm test, save off results, and read output
  return fileManager
    .readFile(`./demo/test/snapshots/${filename}`)
    .then((content) => {
      const output = content.toString() // content is instance of Buffer, so it needs to be parsed
      return t.snapshot(output)
    })
    .catch((err) => {
      console.log(err)
      return t.fail()
    })
}

test('Should have consistent rule output', async (t) => {
  return processFile(t, 'new-lint-results.txt')
})

test('Should have consistent eslint final config', async (t) => {
  return processFile(t, 'new-lint-final-config.json')
})
