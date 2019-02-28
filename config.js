"use strict";

const path = require('path');

const devHost = 'http://localhost:8080';
const testHost = 'http://35.196.192.252:8080'
const prodHost = 'https://systemsdevelopmentgroup.com'

// const pdfCreationEndpoint = 'createPdf';
const contactEndpoint = 'contactSdg';

const testPdfFilePath = path.join(__dirname, 'test', 'pdfWriteTest.pdf');

const envConfigs = {
    dev : {
        // pdfCreationUrl: `${devHost}/${pdfCreationEndpoint}`,
        contactUrl: `${devHost}/${contactEndpoint}`
        // fileName: testFilePath
    },
    test : {
        // pdfCreationUrl: `${testHost}/${pdfCreationEndpoint}`,
        contactUrl: `${testHost}/${contactEndpoint}`
        // fileName: testFilePath
    },
    prod : {
        // pdfCreationUrl: `${prodHost}/${pdfCreationEndpoint}`,
        contactUrl: `${prodHost}/${contactEndpoint}`
        // fileName: testFilePath
    }
};

module.exports = { envConfigs, testPdfFilePath };