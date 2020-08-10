const fs = require('fs');
const log = require('electron-log');
const { autoUpdater } = require('electron');

/**
 * @return {string}
 */
const getLogPath = () => {
    return log.transports.file.findLogPath();
};

const initLogger = (logfilePath = getLogPath()) => {
    try {
        fs.unlink(logfilePath, (err) => { if (err) throw err; });
    }
    catch(error) {
        console.error(error);
    }

    // @ts-ignore
    autoUpdater.logger = log;
    // @ts-ignore
    autoUpdater.logger.transports.file.level = 'info';
    // @ts-ignore
    autoUpdater.logger.info('App starting...');
};

module.exports = { initLogger, getLogPath };
