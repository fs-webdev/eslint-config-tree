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
    why: 'TypeScript acceptance test. Verified against a real in-flight conversion of a consumer suite, which lints clean against this configuration.',
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
    why: 'newspapers, public-dev-portal and the qa-campaign repos use `tests/` (plural). Before widening, the acceptance override silently never applied to any of them.',
  },
  {
    path: 'ui-tests/tests/login-spec.ts',
    why: 'ade-abbie-hints and ade-abbie-ws put their WDIO suite in `ui-tests/` beside a Python backend.',
  },
  {
    path: 'packages/app/test/login-spec.js',
    why: 'Monorepo nesting one level under `packages/`, which zion-style layouts need.',
  },
]
