const { Menu } = require('electron');
const { menuService } = require('../service/menuService');

//exports.setupMenu = () => {

Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
        label: "File",
        submenu: [
            {label: "New", accelerator: "Ctrl+N", click: () => menuService.new()},
            {label: "Open", accelerator: "Ctrl+O", click: () => menuService.open()},
            {label: "Save", accelerator: "Ctrl+S", click: () => menuService.save()},
            {label: "Save As", accelerator: "Ctrl+Shift+S", click: () => menuService.saveAs()}
        ]
    },
    {
        label: "Edit",
        submenu: [
            {label: "Undo", accelerator: "Ctrl+Z", click: () => menuService.undo()},
            {label: "Redo", accelerator: "Ctrl+Y", click: () => menuService.redo()}
        ]
    },
    {
        label: "DevTools",
        submenu: [
            {label: "Reload", accelerator: "Ctrl+R", click: () => menuService.reload()},
            {label: "Open Developer Tools", accelerator: "Ctrl+Shift+I", click: () => menuService.openDevTools()}
        ]
    }
]));

//};