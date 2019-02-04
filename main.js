"use strict;"

const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron')
const { autoUpdater } = require("electron-updater")
const log = require('electron-log');
const fs = require('fs');
const { CompareObjectsForEquality } = require('./main.modules/main.utils')

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


// Keep global reference to window object else window will  
// close when the JavaScript object is garbage collected.
let mainWindow;

let currentFilePath;
let dataSnapshot;
const snapshotData = (data) => {
	dataSnapshot = data;
}

const readFile = (event, filepath) => {
	if (fs.existsSync(filepath)) {
		fs.readFile(filepath, 'utf-8', (err, data) => {
			if (err) {
				console.log(`An error ocurred reading the file ${filepath}\n` + err.message);
				return;
			}
			event.sender.send('fileData', data);
			event.sender.send('setTitle', filepath);
			currentFilePath = filepath;
			snapshotData(data);
		});
	}
}

const saveFile = (event, filename, data) => {
	if(filename){
		fs.writeFile(filename, data, function (err) {
			if (err) {			
				dialog.showErrorBox('Error', err);
				return;
			}
		});
		snapshotData(data);
		event.sender.send('saved-file');
	}	
} 


const createWindow = () => {
	mainWindow = new BrowserWindow({ width: 1000, height: 800 });
	// globalShortcut.register('CommandOrControl+S', () => {
	// 	if(currentFilePath){ saveFile(event, filename, data); }		
	// });
	// mainWindow.loadFile(`index.html#v${app.getVersion()}`);
	mainWindow.loadURL(`file://${__dirname}/index.html#${app.getVersion()}`);
	if (process.env['NODE_ENV'] === 'dev') { mainWindow.webContents.openDevTools() }
	mainWindow.once('close', (event) => {
		event.preventDefault();
		event.sender.send('stateRequest');  // event.defaultPrevented = false;
	});
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
		mainWindow = null;
	});	
};

ipcMain.on('stateResponse', (event, data) => {
	if (CompareObjectsForEquality(dataSnapshot, data) === false) {
		let choice = dialog.showMessageBox(mainWindow, {
			type: 'question',
			buttons: ['Yes', 'No'],
			title: 'Confirm',
			message: 'You have unsaved progress. Are you sure you want to close the application?'
		});
		if (choice === 0) {
			mainWindow.close();
			return
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

// This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.

app.on('ready', function()  {
	autoUpdater.checkForUpdatesAndNotify();
});
  

app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
});

ipcMain.on('loaded', (event) => {
	// When running app via 'npm start', the args are different so...
	readFile(
		event,
		(process.env['NODE_ENV'] === 'dev') ? process.argv[2] : process.argv[1]
	);
});

ipcMain.on('openFile', (event, path) => {
	dialog.showOpenDialog(function (fileNames) {
		// fileNames is an array that contains all the selected files
		if (fileNames !== undefined) {
			readFile(event, fileNames[0]);
		}
		return console.log("No file selected");
	});
});

const options = {
	title: 'Save Your Progress',
	filters: [
		{ name: 'Sdg Data File', extensions: ['sdg'] }
	]
}
ipcMain.on('save-dialog', (event, data) => {
	dialog.showSaveDialog(options, (filename) => {
		// TODO: listen for use closing save dialog with X in top right
		saveFile(event, filename, data);		
		readFile(event, filename);
	});
	
});
ipcMain.on('save', (event, data) => {
	if(!currentFilePath){
		dialog.showSaveDialog(options, (filename) => {
			// TODO: listen for use closing save dialog with X in top right
			saveFile(event, filename, data);		
		});
		return;
	}
	saveFile(event, currentFilePath, data);
});

// process.on('uncaughtException', function (exception) {
// 	console.log(exception);
// });
