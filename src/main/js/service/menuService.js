class MenuService {
    constructor() {
        this.getWebContents = () => console.error("Window not yet loaded.");

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
        console.log("Menu Action call: new");
    }

    open() {
        console.log("Menu Action call: open");
    }

    save() {
        console.log("Menu Action call: save");
    }

    saveAs() {
        console.log("Menu Action call: saveAs");
    }

    undo() {
        console.log("Menu Action call: undo");
    }

    redo() {
        console.log("Menu Action call: redo");
    }

    reload() {
        this.getWebContents().reloadIgnoringCache();
    }

    openDevTools() {
        this.getWebContents().openDevTools({ mode: "detach" });
    }

}

exports.menuService = new MenuService();