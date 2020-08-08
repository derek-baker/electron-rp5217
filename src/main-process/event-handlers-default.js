const { BrowserWindow, ipcRenderer } = require('electron');
const { customChannels } = require('../config');
const path = require('path');

/**
 * @param {boolean} isRunningInDev
 * @param {string} appVersion
 * @param {*} browserWindowOptions
 * @return {BrowserWindow}
 */
const createWindow = (
    isRunningInDev,
    appVersion,
    browserWindowOptions = {
        width: 1000,
        height: 800,
        minWidth: 1000,
        webPreferences: { nodeIntegration: true }
    }
) => {
    let mainWindow = new BrowserWindow(browserWindowOptions);
    // Passing version as GET param so we can display it to the user
    mainWindow.loadURL(`file://${path.join(__dirname, '..')}/index.html#${appVersion}`);

    if (isRunningInDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.once(
        'close',
        /**
         * @param {Electron.Event} event
         */
        (event) => {
            event.preventDefault();
            ipcRenderer.send(customChannels.formStateRequest);
            // event.sender.send(customChannels.formStateRequest);
        }
    );
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        // @ts-ignore
        mainWindow = null;
    });
    return mainWindow;
};

/**
 * Called when Electron has finished initialization and is ready to
 * create browser windows. Some APIs can only be used after this event occurs.
 * @param {Electron.App} app
 * @param {boolean} isRunningInDev
 * @param {any} windowWrapper
 * @param {string} appVersion
 */
const initElectronAppListeners = (app, isRunningInDev, windowWrapper, appVersion) => {
    app.on(
        'ready',
        () => { windowWrapper.mainWindow = createWindow(isRunningInDev, appVersion); }
    );
    app.on(
        'window-all-closed',
        () => { app.quit(); }
    );
};

module.exports = { initElectronAppListeners };
