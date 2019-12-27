/* Example of a broken JS file that should trigger the additional rules contained in ./index.js */

/*
 * Since developers have the ability to disable linting in-line, we keep track of the times where this is done.
 */
// eslint-disable-next

// fixMe: Actually make this work
// todo: Add documentation
// Hack: Note that these work, regardless of case
// Here be Dragons

/* Tree considers the following as errors:
no-unused-vars
*/

/* Tree considers the following as warnings:
no-undefined
*/

/**
 * @function _fetchPreferences - Fetch a user's tree-view-options preference so that we know what options to call the tree-data endpoint with.
 * @param {hobject} a
 * @param b
 * @returns
 */
function ONE_FUNCTION_TO_BRING_THEM_ALL_AND_IN_THE_DARKNESS_BIND_THEM (params) {
}

let myPromise = new Promise();

myPromise.then((a) => {
  if (a) {
    return Promise.resolve()
  } else {
    forgotToReturn()
  }
})

let variable = (true) ? true : true;

if (window === undefined && window === undefined && true === params) {
  ONE_FUNCTION_TO_BRING_THEM_ALL_AND_IN_THE_DARKNESS_BIND_THEM('a', 'b');
  const deprecatedImport = require('path/to/legacyModule');
  deprecatedImport.execute();
  deprecatedFunction();
  $.each();
  debugger;// Make sure we get in here to set the value correctly
}
