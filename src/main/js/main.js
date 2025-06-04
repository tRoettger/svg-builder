console.log("Hello from Electron");

const {app, BrowserWindow } = require('electron');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800, height: 600
    });
    window.loadFile("src/main/html/index.html");
};

app.whenReady().then(createWindow);