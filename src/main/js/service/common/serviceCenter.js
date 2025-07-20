class ServiceCenter {
    
    constructor() {
        this.send = this.send.bind(this);
        this.subscriptions = new Map();
        this.providers = new Map();
        this.requesters = new Map();
    }

    #getListeners(channel) {
        const listeners = this.subscriptions.get(channel);
        return (listeners) ? listeners : []; 
    }

    #getRequesters(channel) {
        const listeners = this.requesters.get(channel);
        return (listeners) ? listeners : []; 
    }

    send(channel, payload) {
        for(let listener of this.#getListeners(channel)) {
            try {
                listener(payload);
            } catch (error) {
                console.error(error);
            }
        }
    }

    subscribe(channel, listener) {
        let listeners = this.#getListeners(channel);
        listeners.push(listener);
        this.subscriptions.set(channel, listeners);
    }

    register(channel, provider) {
        this.providers.set(channel, provider);
        const payload = provider();
        for(let listener of this.#getRequesters(channel)) {
            try {
                listener(payload);
            } catch (error) {
                console.error(error);
            }
        }
    }

    request(channel, listener) {
        const provider = this.providers.get(channel);
        if (provider) {
            listener(provider());
        } else {
            let listeners = this.#getRequesters(channel);
            listeners.push(listener);
            this.requesters.set(channel, listeners);
        }
    }
}

const center = new ServiceCenter();
const createBroadcastChannel = (channelId) => ({
    send: (payload) => center.send(channelId, payload),
    subscribe: (listener) => center.subscribe(channelId, listener)
});

const createInformationProvider = (channelId) => ({
    register: (provider) => center.register(channelId, provider),
    request: (listener) => center.request(channelId, listener)
});

/* BROADCAST CHANNELS */
exports.SELECTED_SVG_PATH = createBroadcastChannel("SELECTED_SVG_PATH");
exports.LOAD_SVG_CONTENT = createBroadcastChannel("LOAD_SVG_CONTENT");
exports.MENU_OPEN_FILE = createBroadcastChannel("MENU_OPEN_FILE");
const logger = createBroadcastChannel("LOG");
const log = (source, severity, message, error) => logger.send({
        source: source,
        timestamp: Date.now(),
        message: message,
        severity: severity,
        error: error
});
exports.LOG_ENDPOINT = ({
    subscribe: listener => logger.subscribe((payload) => listener(payload.source, payload.timestamp, payload.message, payload.severity, payload.error))
});
exports.createLogger = (source) => ({
    subscribe: logger.subscribe,
    error: (message, error) => log(source, "ERROR", message, error),
    warning: (message) => log(source, "WARNING", message),
    info: (message) => log(source, "INFO", message),
    debug: (message) => log(source, "DEBUG", message),
    trace: (message) => log(source, "TRACE", message)
});
exports.SVG_DOCUMENT_ELEMENT = createBroadcastChannel("SVG_DOCUMENT_ELEMENT");

/* REQUEST / RESPONSE CHANNELS */
exports.GET_MAIN_WINDOW = createInformationProvider("GET_MAIN_WINDOW");
exports.GET_WEBCONTENTS = createInformationProvider("GET_WEBCONTENTS");