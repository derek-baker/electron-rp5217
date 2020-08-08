// <!-- Electron-specific manipulations of the browser runtime -->
// <!-- https://electronjs.org/docs/faq#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron -->

// @ts-ignore
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
// @ts-ignore
nodeRequire('./renderer-process/index/index.renderer.main.js');

