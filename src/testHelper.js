//Mocha throws a syntax error (because it tries to import and parse the CSS file as JS). Here is a solution for this.
// Prevent mocha from interpreting CSS @import files
function noop() {
    return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;