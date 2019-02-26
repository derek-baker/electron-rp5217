"use strict;"

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
const fs = require('fs');
const { CompareObjectsForEquality } = require('./main.modules/main.utils');
// const { readFile, saveFile } = require('./main.modules/main.fileManipulation');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const env = process.env['NODE_ENV'];
const runningInDev = (env === 'dev') ? true : false; 
const runningInTest = (env === 'test') ? true : false; 
const runningInDevOrTest = (env === 'dev' || env === 'test') ? true : false; 


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
};
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
}; 

const createWindow = () => {
	mainWindow = new BrowserWindow({ width: 1000, height: 800, minWidth: 800, webPreferences: {nodeIntegration: true} });
	// Passing version as GET param so we can display it to the user
	mainWindow.loadURL(`file://${__dirname}/index.html#${app.getVersion()}`);
	if (runningInDev) { 
		mainWindow.webContents.openDevTools(); 		
	}
	mainWindow.once('close', (event) => {
		event.preventDefault();
		event.sender.send('stateRequest');  // event.defaultPrevented = false;
	});
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows in an array if your app supports multi windows, 
		// this is the time when you should delete the corresponding element.
		mainWindow = null;
	});
};

// This method will be called when Electron has finished initialization and is ready to create browser windows. 
// Some APIs can only be used after this event occurs.
app.on('ready', function() {	
	createWindow();	
});

app.on('window-all-closed', function () {
	app.quit()
});


ipcMain.on('loaded', (event) => {
	// When running app via 'npm start', the args are different than when we run the installed app, 
	// but we want a fast way to load data during dev and while testing ReleaseCandidates.
	readFile(
		event,
		(runningInDev) ? process.argv[2] : process.argv[1]
	);
	if (runningInDevOrTest) { 		
		event.sender.send('runningInDevOrTestChannel', env);	
	}
	// Wait until mainWindow content is loaded so that we can use browser alerts because native notifications are broken-ish.
	// Also, note that this method won't be invoked while the app is running in Dev mode.	
	autoUpdater.checkForUpdatesAndNotify()
		.then( ( updateCheckResult ) =>  { 
			if ( !runningInDevOrTest && updateCheckResult.versionInfo.version !== app.getVersion() ) {
				mainWindow.webContents.send(
					'alertChannel', 
					'A new version of therp RP5217 Editor is being downloaded in the background. ' +  
					'To use the new version, please close and re-open the RP5217 Editor.' 
				); 
			}
		})
		.catch( (reason) => mainWindow.webContents.send('alertChannel', reason) );
});


ipcMain.on('stateResponse', (event, data) => {
	if (runningInTest === false 
		&& 
		CompareObjectsForEquality(dataSnapshot, data) === false
	) {
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


const openOptions = {
	filters: [
		{ name: 'Sdg Data File', extensions: ['sdg'] }
	]
};
ipcMain.on('openFile', (event, path) => {
	// ipcMain.emit('openDialogTriggered');
	dialog.showOpenDialog(mainWindow, openOptions, (filepaths) => {
		// TODO: app should only open .sdg files
		if (filepaths !== undefined) {
			readFile(event, filepaths[0]);
		}
		console.log("No file selected");
		return; 
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
		saveFile(event, filename, data);		
		readFile(event, filename);
	});
	
});
ipcMain.on('save', (event, data) => {
	// Check to see if the user has previously saved the file...
	if(!currentFilePath) {
		event.sender.send('saveComplete'); 
		// ...and show the Save As dialog if they have not.
		dialog.showSaveDialog(saveOptions, (filename) => {
			// TODO: listen for use closing save dialog with X in top right
			saveFile(event, filename, data);		
		});
		return;
	}
	saveFile(event, currentFilePath, data);
	event.sender.send('saveComplete');
});

// ipcMain.on('triggerPrintChannel', function(event) {
// 	// For page size options, see URL below
// 	// https://github.com/electron/electron/blob/master/lib/browser/api/web-contents.js#L25
// 	// mainWindow.webContents.printToPDF({ marginsType:1, pageSize:"Legal", landscape:false }, (error, data) => {
// 	// 	if (error) { throw error; }
// 	// 	const fileName = `${app.getPath('userData')}\\pdfTest_${Date.now().toString()}.pdf`;
// 	// 	fs.writeFile(fileName, data, (error) => {
// 	// 		if (error) { throw error; }
// 	// 		shell.openExternal(fileName);
// 	// 	});
// 	// });
// });

// process.on('uncaughtException', function (exception) {
// 	console.log(exception);
// });
