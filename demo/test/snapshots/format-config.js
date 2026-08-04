// Process the exported linting results and final configuration files:
// Sort final configuration rules alphabetically to compare changes easier.
// Remove any developer-specific directory paths for both files.

/* eslint no-console: "off" -- node scripts use the console, so disable for the whole file */

const FS = require('fs')

// One entry per configuration exported by the `lint:snapshot` script.
const finalConfigNames = [
  'local-linting-final-config',
  'local-linting-final-config-ts',
  'local-linting-final-config-qa',
  'local-linting-final-config-qa-ts',
]

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
    // Keep this idempotent: re-running against already-formatted output must not drop the parser entirely.
    parser: config?.parser?.includes('node_modules') ? config.parser.split('node_modules')[1] : config?.parser,
  }
}

finalConfigNames.forEach((configName) => {
  const filePath = `./demo/test/snapshots/${configName}.json`
  const config = JSON.parse(FS.readFileSync(filePath, 'utf8'))
  FS.writeFile(filePath, JSON.stringify(parseConfig(config), null, 2), (err) => {
    if (err) console.log(`There was an error writing to ${configName}.json file:`, err)
  })
})

FS.readFile('./demo/test/snapshots/local-linting-output.txt', 'utf8', (err, eslintOutput) => {
  if (err) {
    console.log('There was an error reading local-linting-output.txt', err)
  } else {
    FS.writeFile('./demo/test/snapshots/local-linting-output.txt', eslintOutput.replace(/.*demo\//g, ''), (err2) => {
      if (err2) console.log('There was an error writing to local-linting-output.txt file:', err)
    })
  }
})
