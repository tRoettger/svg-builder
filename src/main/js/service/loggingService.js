const { LOG_ENDPOINT } = require("./common/serviceCenter");

LOGGERS = {
    "ERROR": console.error,
    "WARNING": console.warn,
    "INFO": console.info,
    "DEBUG": console.debug,
    "TRACE": console.trace
}

LOG_ENDPOINT.subscribe((source, timestamp, message, severity, error) => {
    const logMessage = `${timestamp} ${source} ${message}`;
    if (error) {
        LOGGERS[severity](logMessage, error)
    } else {
        LOGGERS[severity](logMessage);
    }
});