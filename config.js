"use strict";

const pdfCreationEndpoint = 'createPdf';
const contactEndpoint = 'contactSdg';

const envConfigs = {
    dev : {
        pdfCreationUrl: `http://localhost:8080/${pdfCreationEndpoint}`,
        contactUrl: `http://localhost:8080/${contactEndpoint}`
    },
    // test : {
    //     pdfCreationUrl: `http://localhost:8080/createPdf`,
    //     contactUrl: `http://localhost:8080/contact`
    // },
    prod : {
        pdfCreationUrl: `https://systemsdevelopmentgroup.com/${pdfCreationEndpoint}`,
        contactUrl: `https://systemsdevelopmentgroup.com/${contactEndpoint}`
    }
};

module.exports = { envConfigs };