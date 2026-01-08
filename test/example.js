/* Example of a broken JS file that should trigger the additional rules contained in ./index.js */

/* eslint no-console: "off" -- node scripts use the console, so disable for the whole file */

/*
 * Since developers have the ability to disable linting in-line, we keep track of the times where this is done, because if done irresponsibly, this is a significant code smell.
 */
// eslint-disable-next-line
let unusedVariableThatTriggersLintingRule

// eslint-disable-next-line no-unused-vars -- A comment to remove the warning of "require-description"
let unusedVariableThatTriggersLintingRule2

// fixMe: Actually make this work
// todo: Add documentation
// Hack: Note that these work, regardless of case
// Here be Dragons

/**
 * As long as you separate the comment block from the declaration, JSDOC rules will not be applied. But the comment will still show through many IDE's definition hot-linking.
 */

function functionWithoutJSDocWarningsBecauseTheSectionWasCompletelyExcluded() {
  console.log('ASHLDKFJHASKFJSDHFKJSDHFKLSDJHFLJKSDHFLKSDJFHKSDLJFHLSDKJF')
  return true
}

/**
 * @description a somewhat valid description
 * @param {hobject} a
 * @param params
 * @param b
 * @returns
 */
function ONE_FUNCTION_TO_BRING_THEM_ALL_AND_IN_THE_DARKNESS_BIND_THEM(params) {}

const myPromise = new Promise()

/**
 * @note
 */
myPromise.then((a) => {
  if (true === false) {
    return Promise.resolve()
  } else {
    forgotToDefine()
  }
})

const variable = true ? true : true

export function ReturnEarly() {
  if (window === undefined && window === undefined && params === true) {
    ONE_FUNCTION_TO_BRING_THEM_ALL_AND_IN_THE_DARKNESS_BIND_THEM('a', 'b')
    const deprecatedImport = require('path/to/legacyModule')
    deprecatedImport.execute()
    deprecatedFunction()
    shortFunction()
    $.each()
    return
    debugger // Make sure we get in here to set the value correctly
  }
}

/* We value sonarjs rules enough to test them, here. Sorry for the mess. */

function shortFunction(arg) {
  if (arg) {
    console.log(true)
  }
  return true
}

// sonarjs/no-identical-functions checks function bodies of three lines and above
function duplicateFunction(arg) {
  if (arg) {
    console.log(true)
  }
  return true
}

// sonarjs/no-all-duplicated-branches
if (true) {
  shortFunction()
} else {
  shortFunction()
}

// sonarjs/max-switch-cases, sonarjs/no-duplicated-branches
switch (1) {
  case 1:
    break
  case 2:
  case 3:
    switch (2) {
      case 1:
        duplicateFunction()
        duplicateFunction()
        break
      case 1:
        duplicateFunction()
        duplicateFunction()
        break
    }
    break
  case 3:
    break
  case 4:
    break
  case 5:
    break
  case 6:
    break
  case 7:
    break
  case 8:
    break
  case 9:
    break
  case 10:
    break
  case 11:
    break
  case 12:
    break
  case 13:
    break
  case 14:
    break
  case 15:
    break
  case 16:
    break
  default:
    break
}
