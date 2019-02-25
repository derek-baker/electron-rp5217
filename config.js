"use strict";

const devHost = 'http://localhost:8080';
const testHost = 'http://35.196.192.252:8080'
const prodHost = 'https://systemsdevelopmentgroup.com'


// const pdfCreationEndpoint = 'createPdf';
const contactEndpoint = 'contactSdg';


const envConfigs = {
    dev : {
        // pdfCreationUrl: `${devHost}/${pdfCreationEndpoint}`,
        contactUrl: `${devHost}/${contactEndpoint}`
    },
    test : {
        // pdfCreationUrl: `${testHost}/${pdfCreationEndpoint}`,
        contactUrl: `${testHost}/${contactEndpoint}`
    },
    prod : {
        // pdfCreationUrl: `${prodHost}/${pdfCreationEndpoint}`,
        contactUrl: `${prodHost}/${contactEndpoint}`
    }
};

module.exports = { envConfigs };