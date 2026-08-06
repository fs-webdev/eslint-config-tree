// Process the exported linting results and final configuration files:
// Sort final configuration rules alphabetically to compare changes easier.
// Remove any developer-specific directory paths for both files.

/* eslint no-console: "off" -- node scripts use the console, so disable for the whole file */

const FS = require('fs')

// A checkout path can legally contain regex metacharacters (`+`, `(`, ...), so escape before interpolating.
const escapeForRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

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
    // Drop the developer-specific path up to the repo root, then the `demo/` prefix, so demo files stay bare
    // (`example.js`) while fixtures outside demo keep the directory that selects their override (`test/example.ts`
    // is only a QA/WDIO file because of where it lives). Both replacements are anchored to the start of a line,
    // which is where eslint's stylish formatter puts the file path -- an unanchored replace could rewrite text
    // inside a rule message. `demo/test/` is left alone so it cannot collapse onto the real top-level `test/`.
    const relativeOutput = eslintOutput
      .replace(new RegExp(`^${escapeForRegExp(process.cwd())}/`, 'gm'), '')
      .replace(/^demo\/(?!test\/)/gm, '')
    FS.writeFile('./demo/test/snapshots/local-linting-output.txt', relativeOutput, (err2) => {
      if (err2) console.log('There was an error writing to local-linting-output.txt file:', err2)
    })
  }
})
