const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const fs = require('fs') 

// Keep global reference to window object else window will close when the JavaScript object is garbage collected.
let mainWindow

const readFile = (event, filepath) => {
  if (fs.existsSync(filepath)) {
    fs.readFile(filepath, 'utf-8', (err, data) => { 
      if(err){ 
          console.log(`An error ocurred reading the file ${filepath}\n` + err.message);
          return;
      }         
      event.sender.send('fileData', data) 
    });    
  }
}

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1000, height: 800}); 
  mainWindow.loadFile('index.html');
  if (process.env['NODE_ENV'] === 'dev') { mainWindow.webContents.openDevTools() } 
  
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


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
    if(fileNames === undefined) { 
      console.log("No file selected"); 
    } 
    else { 
      readFile(event, fileNames[0]); 
    } 
  });
});  


ipcMain.on('save-dialog', (event, data) => {
  const options = {
    title: 'Save Your Progress',
    filters: [
      { name: 'Sdg Data File', extensions: ['sdg'] }
    ]
  }
  dialog.showSaveDialog(options, (filename) => {
    // TODO: listen for use closing save dialog with X in top right
    fs.writeFile(filename, data, function(err) {
      if (err) {
        dialog.showErrorBox('Error', err);
        return;
      }
    });
    event.sender.send('saved-file');
  });
});

process.on('uncaughtException', function (exception) {
  console.log(exception);
});
