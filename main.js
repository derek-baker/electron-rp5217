'use strict';

const fs = require('fs');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
// eslint-disable-next-line max-len
const { compareObjectsForEquality } = require('./mainProcess.modules/main.utils');
const { readFile, saveFile } = require('./mainProcess.modules/main.filesystem');
const { testPdfFilePath } = require('./config');


const logfilePath = log.transports.file.findLogPath();
console.log(`Logging to: ${logfilePath}`);
fs.unlink(logfilePath, (err) => { if (err) throw err; });

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.logger.info('App starting...');


const env = process.env['NODE_ENV'];
const runningInDev = (env === 'dev') ? true : false;
const runningInTest = (env === 'test') ? true : false;
const runningInDevOrTest = (env === 'dev' || env === 'test') ? true : false;

/**
 * Keep global reference to window object else window will  
 * close when the JavaScript object is garbage collected.
 * @type BrowserWindow
 */
let mainWindow;
let currentFilePath;
let dataSnapshot;


const createWindow = () => {
    mainWindow = new BrowserWindow({ 
        width: 1000, 
        height: 800, 
        minWidth: 1000, 
        webPreferences: { nodeIntegration: true } 
    });
    // Passing version as GET param so we can display it to the user
    mainWindow.loadURL(`file://${__dirname}/index.html#${app.getVersion()}`);
    if (runningInDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.once('close', (event) => {
        event.preventDefault();
        event.sender.send('stateRequest');
    });
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        //  when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished initialization and
// is ready to create browser windows. Some APIs can only be used after this 
// event occurs.
app.on('ready', function() {
    createWindow();
});

app.on('window-all-closed', function() {
    app.quit();
});


const readFileWrapper = function(event, fileToOpen) {
    const res = {};
    // Using res to imitate pass-by-ref
    console.log('Attempting to open file: ' + fileToOpen);
    if (fs.existsSync(fileToOpen)) {
        readFile(fileToOpen, res)
            .then(() => {
                dataSnapshot = res.dataFromFile;
                currentFilePath = res.currentFileTarget;
                event.sender.send('fileData', dataSnapshot);
                event.sender.send('setTitle', currentFilePath);
            })
            .catch((err) => console.log(err));
    }
};


ipcMain.on('loaded', (event) => {
    // When running app via 'npm start-<config>', the args are different
    // than when we run the installed app, but we want a fast way to load 
    // data during dev and while testing ReleaseCandidates.
    const targetFile = (runningInDev) ? process.argv[2] : process.argv[1];
    readFileWrapper(event, targetFile);
    if (runningInDevOrTest) {
        event.sender.send('runningInDevOrTestChannel', env);
    }

    // Wait until mainWindow content is loaded so that we can use browser 
    // alerts because native notifications are broken-ish. Also, note that 
    // this method won't be invoked while the app is running in Dev mode.
    let functionToExecutePeriodically;
    autoUpdater.checkForUpdatesAndNotify()
        .then((updateCheckResult) => {
            if (
                !runningInDevOrTest 
                && 
                updateCheckResult.versionInfo.version !== app.getVersion()
            ) {
                const updateDownloaded = 
                    'A new version of the SDG-RP5217 Editor was downloaded.' + 
                    'The SDG-RP5217 Editor will update once closed';
                // mainWindow.webContents.send('alertChannel');
                functionToExecutePeriodically = setInterval(function(filePath) {
                    fs.readFile(filePath, (err, data) => {
                        if (err) { throw err; };
                        if (data.indexOf('has been downloaded') >= 0) {
                            mainWindow.webContents.send(
                                'alertChannel',
                                updateDownloaded
                            );                            
                            clearInterval(functionToExecutePeriodically);
                        }
                    });
                }, 2000, logfilePath);
            }
        })
        .catch((reason) => mainWindow.webContents.send('alertChannel', reason));
});


ipcMain.on('stateResponse', (event, data) => {
    if (runningInTest === false
        &&
        compareObjectsForEquality(dataSnapshot, data) === false
    ) {
        const unsavedMsg = 
            'You have unsaved progress.' +  
            'Are you sure you want to close the application?';
        const choice = dialog.showMessageBox(mainWindow, {
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'Confirm',
            message: unsavedMsg
        });
        if (choice === 0) {
            mainWindow.close();
            return;
        }
        // event.preventDefault();
        dataSnapshot = data;
        mainWindow.once('close', (event) => {
            event.preventDefault();
            event.sender.send('stateRequest');
        }); // event.defaultPrevented = false;         
        return;
    }
    mainWindow.close();
});


const openOptions = {
    filters: [
        { name: 'Sdg Data File', extensions: ['sdg'] }
    ]
};
ipcMain.on('openFile', (event) => {
    dialog.showOpenDialog(mainWindow, openOptions, (filepaths) => {
        if (filepaths !== undefined) {
            readFileWrapper(event, filepaths[0]);
        }
    });
});


const saveOptions = {
    filters: [
        { name: 'Sdg Data File', extensions: ['sdg'] }
    ]
};
ipcMain.on('save-dialog', (event, data) => {
    dialog.showSaveDialog(saveOptions, (filename) => {
        // TODO: listen for use closing save dialog with X in top right
        saveFile(filename, data, dialog)
            .then(() => {
                event.sender.send('saved-file');
                dataSnapshot = data;
                // Reading file back in to trigger behaviors 
                readFileWrapper(event, filename);
            })
            .catch((err) => { console.log(err); });
    });
});
ipcMain.on('save', (event, data) => {
    // Check to see if the user has previously saved the file...
    if (!currentFilePath) {
        // Emit event to stop spinner
        event.sender.send('saveComplete');
        // ...and show the Save As dialog if they have not.
        dialog.showSaveDialog(saveOptions, (filename) => {
            // TODO: listen for use closing save dialog with X in top right
            saveFile(filename, data, dialog)
                .then(() => {
                    event.sender.send('saved-file');
                    readFileWrapper(event, filename);
                })
                .catch((err) => { console.log(err); });
        });
        return;
    }
    saveFile(currentFilePath, data, dialog)
        .then(() => {
            event.sender.send('saved-file');
            readFileWrapper(event, currentFilePath);
            event.sender.send('saveComplete');
        })
        .catch((err) => { console.log(err); });
});


// Triggered only by integration tests
ipcMain.on('triggerPrintChannel', function(event) {
    // For page size options, see URL below
    // https://github.com/electron/electron/blob/master/lib/browser/api/web-contents.js#L25
    // eslint-disable-next-line max-len
    mainWindow.webContents.printToPDF({ marginsType: 1, pageSize: 'Legal', landscape: false }, (error, data) => {
        if (error) { throw error; }
        const fileName = testPdfFilePath;
        console.log(fileName);
        fs.writeFile(fileName, data, (error) => {
            if (error) { throw error; }
            // shell.openExternal(fileName);
        });
    });
});

ipcMain.on('toggleDevTools', function() {
    try { mainWindow.webContents.closeDevTools(); }
    catch (err) { console.log('DevTools not open, so cannot close...'); }
    mainWindow.webContents.openDevTools();
});

// process.on('uncaughtException', function (exception) {
//     console.log(exception);
// });
