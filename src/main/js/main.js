const {app, BrowserWindow } = require('electron');
const path = require('node:path');
const { setupIpc } = require('./service/svg-handler');
require('./frontend/menu');
const { GET_MAIN_WINDOW, GET_WEBCONTENTS, createLogger } = require('./service/common/serviceCenter');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    window.loadFile("src/main/html/index.html");
    
    GET_WEBCONTENTS.register(() => window.webContents);
    GET_MAIN_WINDOW.register(() => window);
    loadService();
};

const loadService = () => {
    require('./service/loggingService');
    createLogger('MAIN').info("Logging Service loaded");
    require('./service/fileService');
    require('./service/menuService');
};

app.whenReady().then(() => {
    setupIpc();
    createWindow();
});