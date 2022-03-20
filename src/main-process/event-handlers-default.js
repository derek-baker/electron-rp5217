const { BrowserWindow } = require('electron');
const { customChannels } = require('../config');
const path = require('path');

/**
 * @param {boolean} isRunningInDev
 * @param {string} appVersion
 * @param {Electron.BrowserWindowConstructorOptions} browserWindowOptions
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
    mainWindow.loadURL(
        `file://${path.join(__dirname, '..')}/index.html#${appVersion}`
    );
    if (isRunningInDev) {
        mainWindow.webContents.openDevTools();
    }
    return mainWindow;
};

/**
 * @param {BrowserWindow} mainWindow
 */
const initWindowListeners = (mainWindow) => {

    // Set up guard for user not saving.
    // TODO: Refactor this to use DOM stuff?
    mainWindow.once(
        'close',
        /**
         * @param {Electron.Event} event
         */
        (event) => {
            event.preventDefault();
            if (
                !event
                ||
                // @ts-ignore
                !event.sender
            ) {
                throw new Error('event param lacks sender prop');
            }

            // @ts-ignore
            event.sender.send(customChannels.formStateRequest);
        }
    );

    // mainWindow.on('closed', () => {
    //     // Dereference the window object, usually you would store windows
    //     // in an array if your app supports multi windows, this is the time
    //     // when you should delete the corresponding element.
    //     // @ts-ignore
    //     // mainWindow = null;
    // });
};

/**
 * Called when Electron has finished initialization and is ready to
 * create browser windows. Some APIs can only be used after this event occurs.
 * @param {Electron.App} app
 * @param {boolean} isRunningInDev
 * @param {any} windowWrapper
 * @param {string} appVersion
 */
const initElectronAppAndListeners = async (app, isRunningInDev, windowWrapper, appVersion) => {
    await app.whenReady();
    windowWrapper.mainWindow = createWindow(isRunningInDev, appVersion);
    initWindowListeners(windowWrapper.mainWindow);
    // app.on(
    //     'ready',
    //     () => {
    //         windowWrapper.mainWindow = createWindow(isRunningInDev, appVersion);
    //         initWindowListeners(windowWrapper.mainWindow);
    //     }
    // );
    app.on(
        'window-all-closed',
        () => { app.quit(); }
    );
};

module.exports = { InitElectronAppAndListeners: initElectronAppAndListeners };
