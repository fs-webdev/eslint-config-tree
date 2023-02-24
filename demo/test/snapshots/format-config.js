// Process the exported linting results and final configuration files:
// Sort final configuration rules alphabetically to compare changes easier.
// Remove any developer-specific directory paths for both files.

/* eslint no-console: "off" -- node scripts use the console, so disable for the whole file */

const finalConfig = require('./local-linting-final-config.json');

const FS = require('fs');

const formattedRules = Object.fromEntries(
  Object.entries(finalConfig?.rules ?? {}).sort(([ruleNameA], [ruleNameB]) => {
    if (ruleNameA > ruleNameB) return 1;
    if (ruleNameB > ruleNameA) return -1;
    return 0;
  })
);

FS.writeFile(
  './demo/test/snapshots/local-linting-final-config.json',
  JSON.stringify(
    { ...finalConfig, rules: formattedRules, parser: finalConfig.parser?.split('eslint-config-tree')[1] },
    null,
    2
  ),
  (err) => {
    if (err) console.log('There was an error writing to local-linting-final-config.json file:', err);
  }
);

FS.readFile('./demo/test/snapshots/local-linting-output.txt', 'utf8', (err, eslintOutput) => {
  if (err) {
    console.log('There was an error reading local-linting-output.txt', err);
  } else {
    FS.writeFile(
      './demo/test/snapshots/local-linting-output.txt',
      eslintOutput.replace(/.*demo\//g, ''),
      (err2) => {
        if (err2) console.log('There was an error writing to local-linting-output.txt file:', err);
      }
    );
  }
});
