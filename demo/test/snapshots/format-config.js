// Process the exported linting results and final configuration files:
// Sort final configuration rules alphabetically to compare changes easier.
// Remove any developer-specific directory paths for both files.

/* eslint no-console: "off" -- node scripts use the console, so disable for the whole file */

const FS = require('fs')
const finalJsConfig = require('./local-linting-final-config.json')
const finalTsConfig = require('./local-linting-final-config-ts.json')

const parseConfig = (config) => {
  return {
    ...config,
    rules: Object.fromEntries(
      Object.entries(config?.rules ?? {}).sort(([ruleNameA], [ruleNameB]) => {
        if (ruleNameA > ruleNameB) return 1
        if (ruleNameB > ruleNameA) return -1
        return 0
      })
    ),
    parser: config?.parser?.split('node_modules')[1],
  }
}

const finalJsConfigName = 'local-linting-final-config'
FS.writeFile(
  `./demo/test/snapshots/${finalJsConfigName}.json`,
  JSON.stringify(parseConfig(finalJsConfig), null, 2),
  (err) => {
    if (err) console.log(`There was an error writing to ${finalJsConfigName}.json file:`, err)
  }
)

const finalTsConfigName = 'local-linting-final-config-ts'
FS.writeFile(
  `./demo/test/snapshots/${finalTsConfigName}.json`,
  JSON.stringify(parseConfig(finalTsConfig), null, 2),
  (err) => {
    if (err) console.log(`There was an error writing to ${finalTsConfigName}.json file:`, err)
  }
)

FS.readFile('./demo/test/snapshots/local-linting-output.txt', 'utf8', (err, eslintOutput) => {
  if (err) {
    console.log('There was an error reading local-linting-output.txt', err)
  } else {
    FS.writeFile('./demo/test/snapshots/local-linting-output.txt', eslintOutput.replace(/.*demo\//g, ''), (err2) => {
      if (err2) console.log('There was an error writing to local-linting-output.txt file:', err)
    })
  }
})
