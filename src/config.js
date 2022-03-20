'use strict';

const path = require('path');

const devHost = 'http://localhost:8080';
const testHost = 'http://35.196.192.252:8080';
const prodHost = 'https://systemsdevelopmentgroup.com';

const contactEndpoint = 'contactSdg';

/** Added to facilitate a test */
const testPdfFilePath = path.join(__dirname, 'test', 'pdfWriteTest.pdf');

const sdgBrochureSiteUrl = 'https://www.sdgnys.com/';

const envConfigs = {
    dev: {
        contactUrl: `${devHost}/${contactEndpoint}`
    },
    test: {
        contactUrl: `${testHost}/${contactEndpoint}`
    },
    prod: {
        contactUrl: `${prodHost}/${contactEndpoint}`
    }
};

const customChannels = {
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
    runningInDevOrTest: 'runningInDevOrTest',
    alert: 'alertChannel'
};

module.exports = {
    envConfigs,
    testPdfFilePath,
    sdgBrochureSiteUrl,
    customChannels
};
