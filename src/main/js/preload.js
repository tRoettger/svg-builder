const { contextBridge, ipcRenderer } = require('electron');
const { SvgChannel } = require('./service/channels')

contextBridge.exposeInMainWorld('service', {
    requestSvg: () => {
        /* Trigger sending of response to frontend */
        console.log("requestSvg received");
        return ipcRenderer.invoke(SvgChannel.REQUEST_SVG);
    }
});