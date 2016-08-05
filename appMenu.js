'use strict';
// Set up the bar menu for the Electron app


const electron = require('electron');
const Menu = electron.Menu

module.exports = function(app, mainWindow) {
let menu;

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
        },
        {
          label: 'Unlock',
          click: function(a, b, c) {
              menu.items[1].submenu.items[5].enabled = false;
              mainWindow.webContents.openDevTools();
              mainWindow.setResizable(true);
              let bounds = mainWindow.getBounds();
              bounds.width += 500;
              mainWindow.setBounds(bounds);
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

  menu = Menu.buildFromTemplate(setApplicationMenu);
  Menu.setApplicationMenu(menu);

}
