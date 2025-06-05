const { ipcMain } = require('electron');
const { SvgChannel } = require('./channels');

const fs = require('fs');

const loadSvg = async (path) => {
    return await new Promise((resolve, reject) => fs.readFile(path, {}, (err, data) => {
        if (err) {
            console.error("An error occured", err);
            reject(err);
        } else {
            console.log("loaded svg from ", path);
            resolve(data.toString());
        }
    }));
}

exports.setupIpc = () => {
    ipcMain.handle(SvgChannel.REQUEST_SVG, async () => {
        console.log("loading SVG");
        return await loadSvg("./experiments/test.svg");
    });
};