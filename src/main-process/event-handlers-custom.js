const { customChannels, testPdfFilePath } = require('../config');
const fs = require('fs');
const log = require('electron-log');
const { saveFile, readFile } = require('./filesystem');
// eslint-disable-next-line no-unused-vars
const { dialog, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const { getLogPath } = require('./logger');
const { compareObjectsForEquality } = require('./utils');
// eslint-disable-next-line no-unused-vars
const typedefs = require('./_typedefs');

const env = process.env['NODE_ENV'];
const runningInDev = (env === 'dev') ? true : false;

/** @type {string} */
let currentFilePath;

/** @type {any} */
let dataSnapshot;


/**
 * @param {Electron.IpcMain} ipcMain
 * @param {boolean} isRunningInDev
 * @param {typedefs.WindowWrapper} windowWrapper
 * @param {string} appVersion
 * @param {string} logfilePath;
 */
const initCustomEventHandlers = (
    ipcMain,
    isRunningInDev,
    windowWrapper,
    appVersion,
    logfilePath = getLogPath()
) => {
    /**
     * @param {Electron.IpcMainEvent} event
     * @param {string} fileToOpen
     */
    const readFileWrapper = async (event, fileToOpen) => {
        /** @type {any} */
        const res = {};

        // HACK: While running Spectron tests, we have to specify the path to main.js as the first process arg.
        if (fileToOpen && fileToOpen.includes('main.js') === false && fs.existsSync(fileToOpen)) {
            // await dialog.showMessageBox(
            //     {message: 'Attempting to open file: ' + fileToOpen }
            // );

            readFile(fileToOpen, res)
                .then(() => {
                    dataSnapshot = res.dataFromFile;
                    currentFilePath = res.currentFileTarget;
                    event.sender.send(customChannels.fileData, dataSnapshot);
                    event.sender.send(customChannels.setTitle, currentFilePath);
                })
                .catch(
                    /** @param {Error} err */
                    (err) => { console.log(err); }
                );
        }
        else {
            console.warn(
                'WARNING: Parameter fileToOpen is invalid. Ignore this warning at app load.'
            );
        }
    };

    ipcMain.on(
        customChannels.domLoaded,
        /** @param {Electron.IpcMainEvent} event */
        (event) => {
            // When running app via 'npm start-<config>', the args are different
            // than when we run the installed app, but we want a fast way to load
            // data during dev and while testing ReleaseCandidates.
            const targetFile = (isRunningInDev) ? process.argv[2] : process.argv[1];
            readFileWrapper(event, targetFile);

            /** @type {any} */
            let functionToExecutePeriodically;
            autoUpdater.checkForUpdatesAndNotify()
                .then((updateCheckResult) => {
                    Object.keys(key => log.info(updateCheckResult))

                    if (!runningInDev && updateCheckResult && updateCheckResult.versionInfo.version !== appVersion) {
                            const updateDownloaded =
                                'A new version of the SDG-RP5217 Editor was downloaded.' +
                                'The SDG-RP5217 Editor will update once closed';
                            functionToExecutePeriodically = setInterval((filePath) => {
                                fs.readFile(filePath, (err, data) => {
                                    if (err) { throw err; };
                                    if (data.indexOf('has been downloaded') >= 0) {
                                        if (!windowWrapper.mainWindow) {
                                            throw new Error('Reference to mainWindow falsy.');
                                        }
                                        windowWrapper.mainWindow.webContents.send(customChannels.alert, updateDownloaded);
                                        clearInterval(functionToExecutePeriodically);
                                    }
                                });
                            }, 2000, logfilePath);
                        }
                })
                .catch((reason) => {
                    log.error(reason)
                    windowWrapper.mainWindow.webContents.send(customChannels.alert, reason);
                });
        }
    );


    ipcMain.on(
        customChannels.formStateResponse,
        /**
         * @param {Electron.IpcMainEvent} ipcMainEvent
         * @param {*} data
         */
        async (ipcMainEvent, data) => {
            if (!windowWrapper.mainWindow) { throw new Error('Reference to mainWindow is falsy.'); }

            // runningInTest === false &&
            if (compareObjectsForEquality(dataSnapshot, data) === false) {
                const unsavedMsg =
                    'You have unsaved progress.' +
                    'Are you sure you want to close the application?';
                const choice = await dialog.showMessageBox(windowWrapper.mainWindow, {
                    type: 'question',
                    buttons: ['Yes', 'No'],
                    title: 'Confirm',
                    message: unsavedMsg
                });
                if (choice.response === 0) {
                    windowWrapper.mainWindow.close();
                    return;
                }
                dataSnapshot = data;
                windowWrapper.mainWindow.once(
                    'close',
                    /**
                     * @param {Event} event
                     */
                    (event) => {
                        event.preventDefault();
                        ipcMainEvent.sender.send(customChannels.formStateRequest);
                    }
                );
                return;
            }
            windowWrapper.mainWindow.close();
        }
    );


    const openOptions = {
        // TODO: Refactor these to config
        filters: [
            { name: 'Sdg Data File', extensions: ['sdg'] }
        ]
    };
    ipcMain.on(
        customChannels.openFile,
        /**
         * @param {Electron.IpcMainEvent} event
         */
        async (event) => {
            const result = await dialog.showOpenDialog(
                windowWrapper.mainWindow,
                openOptions
            );
            if (result.filePaths) {
                readFileWrapper(event, result.filePaths[0]);
            }
        }
    );


    const saveOptions = {
        title: 'Save',
        filters: [
            { name: 'Sdg Data File', extensions: ['sdg'] }
        ]
    };
    ipcMain.on(
        customChannels.saveDialog,
        /**
         * @param {Electron.IpcMainEvent} event
         * @param {any} data
         */
        async (event, data) => {
            const saveResult = await dialog.showSaveDialog(saveOptions);
            if (!saveResult.filePath) {
                throw new Error('filePath is falsy');
            }
            // TODO: listen for use closing save dialog with X in top right
            saveFile(saveResult.filePath, data, dialog)
                .then(() => {
                    event.sender.send(customChannels.savedFile);
                    dataSnapshot = data;
                    // Reading file back in to trigger behaviors
                    if (!saveResult.filePath) { throw new Error('filePath is falsy'); }
                    readFileWrapper(event, saveResult.filePath);
                })
                .catch(
                    /** @param {any} err */
                    (err) => { console.log(err); }
                );
        }
    );
    ipcMain.on(
        customChannels.save,
        /**
         * @param {Electron.IpcMainEvent} event
         * @param {any} data
         */
        async (event, data) => {
            // Check to see if the user has previously saved the file...
            if (!currentFilePath) {
                //
                event.sender.send(customChannels.saveComplete);
                // ...and show the Save As dialog if they have not.
                const result = await dialog.showSaveDialog(saveOptions);

                // TODO: listen for use closing save dialog with X in top right
                if (!result.filePath) { throw new Error('filePath is falsy'); }
                saveFile(result.filePath, data, dialog)
                    .then(() => {
                        event.sender.send(customChannels.savedFile);
                        if (!result.filePath) { throw new Error('filePath is falsy'); }
                        readFileWrapper(event, result.filePath);
                    })
                    .catch((err) => { console.log(err); });

                return;
            }
            saveFile(currentFilePath, data, dialog)
                .then(() => {
                    event.sender.send(customChannels.savedFile);
                    readFileWrapper(event, currentFilePath);
                    event.sender.send(customChannels.saveComplete);
                })
                .catch((err) => { console.log(err); });
        }
    );


    // Triggered only by integration tests
    ipcMain.on(
        customChannels.triggerPrint,
        async () => {
            // For page size options, see URL below
            // https://github.com/electron/electron/blob/master/lib/browser/api/web-contents.js#L25

            const result = await windowWrapper.mainWindow.webContents.printToPDF(
                { marginsType: 1, pageSize: 'Legal', landscape: false }
            );
            const fileName = testPdfFilePath;
            console.log(fileName);
            fs.writeFile(
                fileName,
                // @ts-ignore
                result.buffer,
                (error) => {
                    if (error) { throw error; }
                    // shell.openExternal(fileName);
                }
            );
        }
    );

    ipcMain.on('toggleDevTools', () => {
        try {
            windowWrapper.mainWindow.webContents.closeDevTools();
        }
        catch (err) { console.log('DevTools not open, so cannot close...'); }
        if (!windowWrapper.mainWindow) { throw new Error('Reference to mainWindow is falsy.'); }
        windowWrapper.mainWindow.webContents.openDevTools();
    });
};

module.exports = { initCustomEventHandlers };
