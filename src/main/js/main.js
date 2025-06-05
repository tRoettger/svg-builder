console.log("Hello from Electron");

const {app, BrowserWindow } = require('electron');
const path = require('node:path');
const { setupIpc } = require('./service/svg-handler');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    window.loadFile("src/main/html/index.html");
};

app.whenReady().then(() => {
    setupIpc();
    createWindow();
});