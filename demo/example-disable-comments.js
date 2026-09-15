/* eslint-disable no-console -- node scripts use the console; a whole-file disable needs no matching enable (allowWholeFile) */

/*
 * Fixture for the eslint-comments rules. The whole-file disable above must produce NO output. The mid-file disable
 * below deliberately has no matching `eslint-enable`, so disable-enable-pair must fire exactly once — that is how we
 * tell "allowWholeFile is working" apart from "the pairing check was switched off".
 */

console.log('a whole-file disable with a reason is the sanctioned idiom')

/* eslint-disable no-unused-vars -- intentional violation: a scoped disable that is never re-enabled */
const silencedForTheRestOfTheFile = true
