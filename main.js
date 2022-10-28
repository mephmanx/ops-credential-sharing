// Modules to control application life and create native browser window
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();
const {app, BrowserWindow,
  ipcMain} = require('electron')
const fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform === 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    resizable:true,
    movable:true,
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 200,
    acceptFirstMouse: true,
    titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  });

  remoteMain.enable(mainWindow.webContents)
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then(r => {console.log(r !== undefined ? r : ""); return 0;});

  // Open the DevTools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

ipcMain.on("toMain", (event, args) => {
  console.log(event + " args -> " + args);
  fs.readFile("path/to/file", (error, data) => {
    if (error) throw error;
    console.log(data);
    // Do something with file contents

    // Send result back to renderer process
    mainWindow.webContents.send("fromMain", {});
  });
});
