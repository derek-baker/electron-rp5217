'use strict';

const { app, ipcMain } = require('electron');
const { initElectronAppAndListeners } = require('./main-process/event-handlers-default');
const { initCustomEventHandlers } = require('./main-process/event-handlers-custom');
const { initLogger } = require('./main-process/logger');

initLogger();

const env = process.env['NODE_ENV'];

/** @type {boolean} */
const isRunningInDev = (env === 'dev') ? true : false;

/**
 * Keep global reference to window object else window will
 * close when the JavaScript object is garbage collected.
 */
const windowWrapper = { mainWindow: undefined };
const appVersion = app.getVersion();

initElectronAppAndListeners(app, isRunningInDev, windowWrapper, appVersion);
initCustomEventHandlers(ipcMain, isRunningInDev, windowWrapper, appVersion);

// process.on('uncaughtException', function (exception) {
//     console.log(exception);
// });
