'use strict';

const path = require('path');

const devHost = 'http://localhost:8080';
const testHost = 'http://35.196.192.252:8080';
const prodHost = 'https://systemsdevelopmentgroup.com';

const contactEndpoint = 'contactSdg';

/** Added to facilitate a test? */
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

module.exports = { envConfigs, testPdfFilePath, sdgBrochureSiteUrl };
