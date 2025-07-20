const { webContents } = require('electron');
const { MENU_OPEN_FILE, GET_WEBCONTENTS, createLogger } = require('./common/serviceCenter');

const LOGGER = createLogger("MenuService");

class MenuService {
    constructor() {
        this.new = this.new.bind(this);
        this.open = this.open.bind(this);
        this.save = this.save.bind(this);
        this.saveAs = this.saveAs.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        this.reload = this.reload.bind(this);
        this.openDevTools = this.openDevTools.bind(this);
    }

    new() {
        LOGGER.info("Menu Action call: new");
    }

    open() {
        LOGGER.info("Menu Action call: open");
        MENU_OPEN_FILE.send();
    }

    save() {
        LOGGER.info("Menu Action call: save");
    }

    saveAs() {
        LOGGER.info("Menu Action call: saveAs");
    }

    undo() {
        LOGGER.info("Menu Action call: undo");
    }

    redo() {
        LOGGER.info("Menu Action call: redo");
    }

    reload() {
        GET_WEBCONTENTS.request(webContents => webContents.reloadIgnoringCache());
    }

    openDevTools() {
        GET_WEBCONTENTS.request(webContents => webContents.openDevTools({ mode: "detach" }));
    }

}

exports.menuService = new MenuService();