const { contextBridge, ipcRenderer } = require('electron');
const { REQUEST_SVG, PROVIDE_SVG } = require('./service/channels')

contextBridge.exposeInMainWorld('service', {
    requestSvg: () => REQUEST_SVG.invoke(),
    subscribeSvg: (listener) => PROVIDE_SVG.subscibe(listener)
});