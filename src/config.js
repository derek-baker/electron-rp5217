'use strict';

const path = require('path');

/** Added to facilitate a test */
const testPdfFilePath = path.join(__dirname, 'test', 'pdfWriteTest.pdf');

const sdgBrochureSiteUrl = 'https://www.sdgnys.com/';
const sdgContactUrl = 'https://systemsdevelopmentgroup.com/contactSdg';

const customChannels = Object.freeze({
    domLoaded: 'loaded',
    /** Channel used to send messages to trigger the opening of files */
    openFile: 'openFile',
    save: 'save',
    saveDialog: 'save-dialog',
    triggerPrint: 'triggerPrintChannel',
    formStateRequest: 'stateRequest',
    formStateResponse: 'formStateResponse',
    setTitle: 'setTitle',
    fileData: 'fileData',
    savedFile: 'saved-file',
    /** Channel used to send messages to stop a spinner */
    saveComplete: 'saveComplete',
    alert: 'alertChannel'
});

const mainPath = './../../src/main.js';

module.exports = {
    testPdfFilePath,
    sdgBrochureSiteUrl,
    customChannels,
    mainPath,
    sdgContactUrl
};
