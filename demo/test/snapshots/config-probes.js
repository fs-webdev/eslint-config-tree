// The single source of truth for which file shapes we assert a resolved configuration for.
//
// These paths do not need to exist on disk -- ESLint resolves a configuration for any path -- so covering a new
// file shape costs nothing in fixture files. Each entry exists because some consumer repo actually looks like
// it; the `why` is the reason we care, and it is what a reviewer should check the matrix against.
//
// This drives the compact rule matrix (see rule-matrix.js), which is the contract this package is asserting.
// The four full `--print-config` dumps in the `lint:snapshot` script are kept separately, and deliberately not
// grown: each one is several thousand lines of snapshot, so they provide breadth while this list provides the
// per-file-shape detail in a form a human can actually read in a diff.

module.exports = [
  {
    path: 'file.js',
    why: 'Ordinary application code. Must keep the full Jest ruleset -- nothing here is an acceptance test.',
  },
  {
    path: 'file.ts',
    why: 'Ordinary TypeScript application code.',
  },
  {
    path: 'src/component.test.js',
    why: 'A Jest unit test in its normal home. Baseline for what untouched Jest treatment looks like.',
  },
  {
    path: 'src/features/test/helper.js',
    why: 'NEGATIVE CASE. A nested `test/` dir inside `src/` holds Jest unit tests, so it must NOT be treated as an acceptance test. This is why qa.js does not use `**/test/**`.',
  },
  {
    path: 'test/file.js',
    why: 'The common acceptance-test shape: top-level `test/`, JavaScript.',
  },
  {
    path: 'test/file.ts',
    why: 'TypeScript acceptance test: top-level `test/`, TypeScript. Pins the TS branch of the config, which resolves a different parser and is otherwise easy to break without noticing.',
  },
  {
    path: 'test/client/login-spec.js',
    why: 'The real-world shape in tree-r9, tree-person-r9 and group-management: nested a level deeper, hyphen-`-spec` suffix. 394 consumer files look like this.',
  },
  {
    path: 'test/client/login-spec.ts',
    why: 'TypeScript variant of the deeper-nested shape, which is how a converted suite is laid out: test/client/suites/**/*-spec.ts.',
  },
  {
    path: 'test/client/login.spec.js',
    why: 'Dot-`.spec.` inside an acceptance dir. Frontier unloads the jest plugin entirely for this shape, so our jest suppressions are harmless no-ops -- this probe proves the two paths converge rather than conflict.',
  },
  {
    path: 'test/pageObjects/LoginPage.js',
    why: 'A helper rather than a suite. Must still get the WDIO globals, and must not be flagged for exporting.',
  },
  {
    path: 'test/component.test.js',
    why: 'THE CARVE-OUT. A genuine Jest test inside an acceptance dir must fall through to the full Jest treatment and must NOT get the WDIO globals or relaxations.',
  },
  {
    path: 'tests/login-spec.js',
    why: 'NEGATIVE CASE. `tests/` (plural) is NOT an acceptance directory -- no supported consumer uses it, and adding a directory name is a promise that is breaking to take back. This probe exists so that adding one is a visible decision rather than a silent one.',
  },
  {
    path: 'ui-tests/tests/login-spec.ts',
    why: 'NEGATIVE CASE. A repo keeping its suite under `ui-tests/` is covered only if its own eslintrc sits inside that directory, which makes the suite `test/` from the config\'s point of view. Resolved from the repo root, as here, it is ordinary source.',
  },
  {
    path: 'packages/app/test/login-spec.js',
    why: 'NEGATIVE CASE. Monorepo nesting is NOT covered -- no consumer has a top-level `packages/` directory. A monorepo package needing this should put an eslintrc in the package, where its `test/` is matched relative to that.',
  },
]
