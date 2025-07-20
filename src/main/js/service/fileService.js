const fs = require('fs');
const { dialog } = require('electron');

const { MENU_OPEN_FILE, GET_MAIN_WINDOW, LOAD_SVG, createLogger } = require('./common/serviceCenter');
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
            .then(path => this.readFileContent(path))
            .catch(error => LOGGER.error(`SB-002 Error while opening file`, error));

        });
    }

    readFileContent(path) {
        fs.readFile(path, { encoding: 'utf-8'}, (error, data) => {
            if (error) {
                LOGGER.error(`SB-001 Error while reading file ${path}`, error);
            } else {
                LOGGER.debug(`File ${path} was successfully read`);
            }
        });
    }
}

const fileService = new FileService();
MENU_OPEN_FILE.subscribe(fileService.selectFileToOpen);