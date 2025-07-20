const { ipcRenderer, ipcMain } = require("electron");
const { GET_WEBCONTENTS, LOAD_SVG_CONTENT } = require("./common/serviceCenter");

const invokeOnly = (channelId) => ({
    invoke: () => ipcRenderer.invoke(channelId),
    handle: (handler) => ipcMain.handle(channelId, handler)
});

const broadcast = (channelId) => ({
    send: (payload) => GET_WEBCONTENTS.request(webContents => webContents.send(channelId, payload)),
    subscibe: (listener) => ipcRenderer.on(channelId, (_event, payload) => listener(payload))
})

exports.REQUEST_SVG = invokeOnly("request-svg");

exports.PROVIDE_SVG = broadcast("provide-svg");
LOAD_SVG_CONTENT.subscribe(data => this.PROVIDE_SVG.send(data.toString()));