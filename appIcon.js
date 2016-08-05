'use strict';
// Set up the tray icon for the Electron app
const path = require('path')
const electron = require('electron');
const Tray = electron.Tray

module.exports = function(app, mainWindow) {
      const iconName = process.platform === 'win32' ? 'windows-icon.png' : '16x16.png'
  const iconPath = path.join(__dirname, iconName)
  let appIcon = new Tray(iconPath)
  // const contextMenu = Menu.buildFromTemplate([{
  //   label: 'Remove',
  //   click: function () {
  //     event.sender.send('tray-removed')
  //     appIcon.destroy()
  //   }
  //   }]);
  appIcon.setToolTip('Conways Game of Life.')
 // appIcon.setContextMenu(contextMenu)
}