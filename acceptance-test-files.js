// Which files are acceptance tests (WDIO + mocha + chai) rather than unit tests (Jest).
//
// This lives in its own module because two configurations need the same answer and must not drift: `es6.js`
// uses it to keep frontier's Jest configuration away from acceptance tests, and `qa.js` uses it to apply the
// WDIO and mocha treatment to exactly the same set.
//
// Note these patterns resolve against the CONSUMING repo's `.eslintrc.*` directory, not against this file.
// `@eslint/eslintrc` threads `matchBasePath` down from the root config and never recomputes it for extended
// shareable configs, which is what makes directory-based selection possible from inside a shared config at all.
// It also means a repo whose eslintrc sits inside its test directory is matched relative to that directory.

// Deliberately NOT `**/test/**`: that also matches `src/**/test/**`, which is where Jest unit tests live in this
// org, and `demo/test/**` in this repo.
//
// Just `test/`, because a census of every consumer found nothing else in use. No repo this package supports has
// a top-level `packages/` or `tests/` directory; the `tests/` (plural) layouts belong to repos outside the Tree
// team's support boundary, whose suites were never covered by the v6 selector either.
//
// Speculative entries are not free. Each one is a directory name we have silently promised to treat as an
// acceptance test, and taking one back later is a breaking change -- the relaxations stop applying and come back
// as errors. Cheaper to add one when a repo actually needs it.
const acceptanceTestDirectories = ['test/**']

// `*.test.*` is the org-wide Jest convention and always wins, even inside an acceptance-test directory.
const jestTestFilenames = ['**/*.test.[tj]s?(x)', '**/*.test.[cm]js', '**/*.test.[cm]ts']

// The same exception expressed positively -- the Jest files that live inside an acceptance-test directory.
// `es6.js` needs this to hand those files back to frontier's Jest configuration after excluding the directory
// as a whole, which `excludedFiles` alone cannot express (it cannot say "this directory AND NOT this name").
const jestTestFilesInAcceptanceDirectories = acceptanceTestDirectories.flatMap((directory) =>
  jestTestFilenames.map((filename) => `${directory}/${filename.replace('**/', '')}`)
)

module.exports = {
  acceptanceTestDirectories,
  jestTestFilenames,
  jestTestFilesInAcceptanceDirectories,
}
