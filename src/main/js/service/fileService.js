const fs = require('fs');
const { dialog } = require('electron');

const { MENU_OPEN_FILE, GET_MAIN_WINDOW, createLogger, SELECTED_SVG_PATH, LOAD_SVG_CONTENT } = require('./common/serviceCenter');
const LOGGER = createLogger("FileService");
class FileService {

    constructor() {
        this.selectFileToOpen = this.selectFileToOpen.bind(this);
        this.readFileContent = this.readFileContent.bind(this);
    }

    selectFileToOpen() {
        GET_MAIN_WINDOW.request((window) => {
            dialog.showOpenDialog(window, {
                properties: ['openFile'],
                filters: [
                    { name: 'SVG Files', extensions: ['svg'] },
                    { name: 'All Files', extensions: ['*'] }
                ]
            })
            .then(result => result.filePaths[0])
            .then(path => SELECTED_SVG_PATH.send(path))
            .catch(error => LOGGER.error(`SB-002 Error while opening file`, error));

        });
    }

    readFileContent(path) {
        fs.readFile(path, {}, (err, data) => {
            if (err) {
                LOGGER.error(`SB-001 Error while reading file ${path}`, err);
            } else {
                LOGGER.debug(`Content of ${path} successfully loaded`);
                LOAD_SVG_CONTENT.send(data);
            }
        });
    }
}

const fileService = new FileService();
MENU_OPEN_FILE.subscribe(fileService.selectFileToOpen);
SELECTED_SVG_PATH.subscribe(path => fileService.readFileContent(path));