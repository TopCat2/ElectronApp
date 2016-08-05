// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// In renderer process (web page).
const ipcRenderer = require('electron').ipcRenderer;


ipcRenderer.on('Step', function(event, data) {
    gameOfLife.step();
})
ipcRenderer.on('Play', function(event, data) {
    gameOfLife.enableAutoPlay();
})
ipcRenderer.on('Random', function(event, data) {
    gameOfLife.clear(true);
})
ipcRenderer.on('Clear', function(event, data) {
    gameOfLife.clear(false);
})
ipcRenderer.on('Close', function(event, data) {
    gameOfLife.close();
});

