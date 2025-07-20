const { REQUEST_SVG } = require('./channels');

const fs = require('fs');
const { createLogger, SELECTED_SVG_PATH } = require('./common/serviceCenter');

const LOGGER = createLogger("SVG-Handlers");

const loadSvg = async (path) => {
    return await new Promise((resolve, reject) => fs.readFile(path, {}, (err, data) => {
        if (err) {
            console.error("An error occured", err);
            reject(err);
        } else {
            LOGGER.debug("loaded svg from ", path);
            resolve(data.toString());
        }
    }));
};

exports.setupIpc = () => {
    REQUEST_SVG.handle(async () => {
        LOGGER.debug("loading SVG");
        return await loadSvg("./experiments/test.svg");
    });
};