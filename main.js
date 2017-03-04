const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

var mainWindow = null;

// listen for the "ping" event
ipcMain.on('ping', function (event, arg) {
  if (arg === 'hello') {
    // send a back greeting
    event.sender.send('pong', 'Hello, World!');
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600,
  webPreferences: {
    nodeIntegration: false,
    preload: __dirname + '/preload.js' // this is our preload script;
  }});

  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
