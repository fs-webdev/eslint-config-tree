// Tests the configuration as a CONSUMER receives it, which is not what the rest of this suite tests.
//
// Everything else here runs through this repo's own `.eslintrc.js`. That file is excluded from the published
// tarball (`files: ["!.*"]` in package.json), so anything it contributes is something no consumer ever gets --
// and for a long time it contributed `settings: { jest: { version: 29 } }`, which single-handedly hid a crash
// that made the published package unusable for any repo without jest installed. These tests exist so that class
// of bug cannot come back: they load the published entry points with `useEslintrc: false`, so this repo's own
// config cannot participate.
//
// Note that `jest` is deliberately NOT a dependency of this package, so when these tests run, `jest` is not
// resolvable -- which is exactly the situation of a consumer on vitest (prerender-service, prerender-deliver)
// or with no unit-test runner at all.

import test from 'ava'
import { execFile } from 'node:child_process'
import { createRequire } from 'node:module'
import { promisify } from 'node:util'
import { ESLint } from 'eslint'

const require = createRequire(import.meta.url)
const execFileAsync = promisify(execFile)

const publishedConfigPath = require.resolve('../../index.js')

const lintAs = async (code, filePath) => {
  const eslint = new ESLint({
    // The whole point: do not let this repo's unpublished .eslintrc.js contribute anything.
    useEslintrc: false,
    baseConfig: { extends: [publishedConfigPath] },
  })
  return eslint.lintText(code, { filePath })
}

test('jest should not be resolvable, so these tests reflect a consumer without it', (t) => {
  t.throws(() => require.resolve('jest/package.json'), {
    message: /Cannot find module/,
    // If this ever starts resolving, these tests silently stop testing the thing they exist for.
  })
})

// Regression test for the crash: `jest/no-deprecated-functions` calls detectJestVersion() eagerly in create()
// and throws when jest is unresolvable. Because frontier applies plugin:jest/recommended to `files: ['*']`, it
// fired on every file -- not just tests -- so an affected consumer could not lint anything at all.
test('Should lint ordinary source without a resolvable jest', async (t) => {
  await t.notThrowsAsync(() => lintAs('const answer = 42\nexport default answer\n', 'src/answer.js'))
})

test('Should lint an acceptance test without a resolvable jest', async (t) => {
  const code = 'describe("suite", function () {\n  it("works", function () {})\n})\n'
  await t.notThrowsAsync(() => lintAs(code, 'test/client/login-spec.js'))
})

test('Should lint a jest unit test without a resolvable jest', async (t) => {
  const code = 'describe("suite", () => {\n  it("works", () => {\n    expect(1).toBe(1)\n  })\n})\n'
  await t.notThrowsAsync(() => lintAs(code, 'src/answer.test.js'))
})

// The acceptance-test relaxations must survive into the published package too, not just work locally. A chai
// assertion is the sharpest case: its matchers are properties rather than called methods, so jest/valid-expect
// reads `to.be.true` as a matcher that was never called.
test('Should accept chai assertions in an acceptance test as published', async (t) => {
  const code = 'describe("suite", function () {\n  it("asserts", function () {\n    expect(true).to.be.true\n  })\n})\n'
  const [result] = await lintAs(code, 'test/client/login-spec.js')
  const offendingRules = result.messages.map((message) => message.ruleId).filter((id) => id && id.startsWith('jest/'))
  t.deepEqual(offendingRules, [], 'no jest rule should fire on a mocha + chai acceptance test')
})

// The test above asserts an absence, which would also pass if the acceptance override stopped applying at all.
// This one asserts the override is actually present, so the pair cannot both be satisfied by a config that does
// nothing: `it.only` must be caught, and it must be caught by mocha rather than by jest.
test('Should apply the mocha rules to an acceptance test as published', async (t) => {
  const code = 'describe("suite", function () {\n  it.only("focused", function () {})\n})\n'
  const [result] = await lintAs(code, 'test/client/login-spec.js')
  const reported = result.messages.map((message) => message.ruleId)
  t.true(reported.includes('mocha/no-exclusive-tests'), 'mocha rules should be live on acceptance tests')
  t.false(reported.includes('jest/no-focused-tests'), 'the jest equivalent should be suppressed')
})

// Guards the publish surface itself. If a load-bearing file stops being published, or something that should stay
// private starts being published, this fails rather than silently shipping.
//
// `--ignore-scripts` matters for two reasons. `npm pack` otherwise runs the `prepare` lifecycle script, which
// here is `husky` -- so without it a unit test rewrites `.husky/_` and the repo's `core.hooksPath`, which is not
// something a test should do to somebody's machine. It also keeps stdout clean: anything a lifecycle script
// prints lands in front of the JSON and turns `JSON.parse` into a confusing failure.
test('Should publish exactly the config entry points', async (t) => {
  const { stdout } = await execFileAsync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    cwd: new URL('../../', import.meta.url),
    maxBuffer: 10 * 1024 * 1024,
  })
  const published = JSON.parse(stdout)[0]
    .files.map((file) => file.path)
    .sort()
  t.deepEqual(published, ['README.md', 'acceptance-test-files.js', 'es6.js', 'index.js', 'package.json', 'qa.js'])
})
