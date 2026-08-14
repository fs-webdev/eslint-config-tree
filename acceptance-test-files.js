// Which files are acceptance tests (WDIO + mocha + chai) rather than unit tests (Jest).
//
// This lives in its own module because two configurations need the same answer and must not drift: `jest.js`
// uses it to keep frontier's Jest configuration away from acceptance tests, and `qa.js` uses it to apply the
// WDIO and mocha treatment to exactly the same set.
//
// A file in an acceptance-test directory is an acceptance test, period -- there is no carve-out for the
// org-wide `*.test.*` Jest naming convention. A census of every consumer found zero supported repos with a
// `*.test.*` file inside an acceptance directory, so the exception defended a case that does not exist, at the
// cost of a second override and this module having three exports instead of one.
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

module.exports = {
  acceptanceTestDirectories,
}
