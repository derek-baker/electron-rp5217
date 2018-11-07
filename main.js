// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const fs = require('fs') 
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const readFile = (event, filepath) => {   
  if (fs.existsSync(filepath)) {
    fs.readFile(filepath, 'utf-8', (err, data) => { 
      if(err){ 
          alert("An error ocurred reading the file :" + err.message) 
          return ;
      }         
      event.sender.send('fileData', data) 
    });
    // fs.unlink('fileToBeRemoved', function(err) {
    //   if(err && err.code == 'ENOENT') {
    //       console.info("File doesn't exist, won't remove it.");
    //   } else if (err) {
    //       console.error("Error occurred while trying to remove file");
    //   } else {
    //       console.info("removed");
    //   }
    // });
  }
}

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1000, height: 800}); //, frame: false})
  mainWindow.loadFile('index.html')
  // mainWindow.webContents.openDevTools()    
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('loaded', (event) => {
  readFile(event, path.join(__dirname, 'data.json') ); 
});

ipcMain.on('openFile', (event, path) => { 
  dialog.showOpenDialog(function (fileNames) { 
     // fileNames is an array that contains all the selected 
    if(fileNames === undefined) { 
      console.log("No file selected"); 
    } 
    else { 
      readFile(event, fileNames[0]); 
    } 
  });
});  