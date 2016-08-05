'use strict'
const electron = require('electron');
const gameOfLife = require('./game.js')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const ipc = electron.ipcMain
const Menu = electron.Menu
const Tray = electron.Tray

const ipcMain = require('electron').ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.     19*n + 20       19*n + 72
  mainWindow = new BrowserWindow({width: 400, height: 452, frame: true, resizable: true})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/game.html`)

  // Open the DevTools.
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
app.on('ready', function() {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : '16x16.png'
  const iconPath = path.join(__dirname, iconName)
  let appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Remove',
    click: function () {
      event.sender.send('tray-removed')
      appIcon.destroy()
    }
    }]);
  appIcon.setToolTip('Conways Game of Life.')
  appIcon.setContextMenu(contextMenu)





  var setApplicationMenu = [
    {
      label: 'Actions',
      submenu: [
        // {
        //   label: 'Close',
        //   role: mainWindow.close()
        // },

        {
          label: 'Step',
          click: function() {
            mainWindow.webContents.send('Step')
          }
        },
        {
          label: 'Play',
          click: function() {
            mainWindow.webContents.send('Play')
          }
        },
        {
          label: 'Random',
          click: function() {
            mainWindow.webContents.send('Random')
          }
        },
        {
          label: 'Clear',
          click: function() {
            mainWindow.webContents.send('Clear')
          }
        },
        {
          label: 'Close',
          click: function() {
            mainWindow.webContents.send('Close')
          }
        }
      ]
    }
  ];
  if (process.platform === 'darwin') {
    const name = 'Life';
    setApplicationMenu.unshift({
      label: name,
      submenu: [
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => { app.quit(); }
        },
      ]
    });
  }

  let menu = Menu.buildFromTemplate(setApplicationMenu);
  Menu.setApplicationMenu(menu);

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
    app.quit()
  // }
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
