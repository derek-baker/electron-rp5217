'use strict';

const path = require('path');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const mainPath = require('./../../src/config').mainPath;

/** @type {import('spectron').AppConstructorOptions} */
const appOptions = {
    // Your electron path can be any binary
    // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
    // But for the sake of the example we fetch it from our node_modules.

    // @ts-ignore
    path: electronPath,

    args: [path.join(__dirname, mainPath)]
};

// Exported for use in tests
module.exports = { appOptions };

