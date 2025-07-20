const { ipcRenderer, ipcMain } = require("electron");
const { GET_WEBCONTENTS, LOAD_SVG_CONTENT, SVG_DOCUMENT_ELEMENT } = require("./common/serviceCenter");

const backendSubscriptions = [];
exports.setupIpcMain = () => {
    for (let subscription of backendSubscriptions) {
        subscription();
    }
}

const invokeOnly = (channelId) => ({
    invoke: () => ipcRenderer.invoke(channelId),
    handle: (handler) => ipcMain.handle(channelId, handler)
});

const broadcast = (channelId) => ({
    send: (payload) => GET_WEBCONTENTS.request(webContents => webContents.send(channelId, payload)),
    subscibe: (listener) => ipcRenderer.on(channelId, (_event, payload) => listener(payload))
});

const frontendToBackend = (channelId, serviceChannel) => {
    backendSubscriptions.push(() => ipcMain.on(channelId, (_event, payload) => serviceChannel.send(payload)));
    return {
        send: (payload) => ipcRenderer.send(channelId, payload)
    };
};

/* Invoke Channels */
exports.REQUEST_SVG = invokeOnly("request-svg");

/* Backend-to-Frontend Broadcast Channels  */
exports.PROVIDE_SVG = broadcast("provide-svg");
LOAD_SVG_CONTENT.subscribe(data => this.PROVIDE_SVG.send(data.toString()));

/* Frontend-to-Backend Channels */
exports.SVG_DISPLAYED = frontendToBackend("SVG_DISPLAYED", SVG_DOCUMENT_ELEMENT);