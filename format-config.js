// This sorts the eslint final config rules in an alphabetical order to compare easier
const finalConfig = require('./demo/test/snapshots/new-lint-final-config.json');
const FS = require('fs');

const formattedRules = Object.fromEntries(Object.entries(finalConfig?.rules ?? {}).sort(([ruleNameA], [ruleNameB]) => {
  if (ruleNameA > ruleNameB) return 1;
  if (ruleNameB > ruleNameA) return -1;
  return 0;
})
);

// eslint-disable-next-line no-console -- We want to have the console.log here.
FS.writeFile(
  './demo/test/snapshots/new-lint-final-config.json',
  JSON.stringify(
    { ...finalConfig, rules: formattedRules, parser: finalConfig.parser?.split('eslint-config-tree')[1] },
    null,
    2
  ),
  (err) => {
    if (err) console.log('There was an error writing to new-lint-final-config.json file:', err);
  }
);
