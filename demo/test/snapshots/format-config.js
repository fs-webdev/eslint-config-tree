// Process the final eslint config file:
// Sort rules alphabetically to compare changes easier.
// Remove any developer-specific directory paths.

const finalConfig = require('./local-linting-final-config.json');
const FS = require('fs');

const formattedRules = Object.fromEntries(Object.entries(finalConfig?.rules ?? {}).sort(([ruleNameA], [ruleNameB]) => {
  if (ruleNameA > ruleNameB) return 1;
  if (ruleNameB > ruleNameA) return -1;
  return 0;
}));

FS.writeFile(
  './demo/test/snapshots/local-linting-final-config.json',
  JSON.stringify(
    { ...finalConfig, rules: formattedRules, parser: finalConfig.parser?.split('eslint-config-tree')[1] },
    null,
    2
  ),
  (err) => {
    if (err) console.log('There was an error writing to local-linting-final-config.json file:', err); // eslint-disable-line no-console -- Node scripts use the console.
  }
);
