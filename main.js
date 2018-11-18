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
          console.log(`An error ocurred reading the file ${filepath}\n` + err.message);
          return;
      }         
      event.sender.send('fileData', data) 
    });    
  }
}

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1000, height: 800}); //, frame: false})
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()    
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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
// ipcMain.on('loaded', (event, args) => {
  // readFile(event, path.join(__dirname, 'data.json') ); 
  console.log('main')
  // console.log(args)
  console.log(process.argv)
  readFile(event, process.argv[1]);
});


ipcMain.on('requestForMainProcessArgs', function(event) {
  console.log('reqest from renderer recvd')
  event.sender.send('responseWithMainProcessArgs', process.argv);
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
