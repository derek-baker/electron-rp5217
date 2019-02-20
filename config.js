"use strict";

const envConfigs = {
    dev : {
        pdfCreationEndpoint: 'http://localhost:8080/createPdf',
        contactEndpoint: 'http://localhost:8080/contact'
    },
    // test : {
    //     pdfCreationEndpoint: 'http://localhost:8080/createPdf',
    //     contactEndpoint: 'http://localhost:8080/contact'
    // },
    prod : {
        pdfCreationEndpoint: 'https://systemsdevelopmentgroup.com/createPdf',
        contactEndpoint: 'https://systemsdevelopmentgroup.com/contact'
    }
};

module.exports = { envConfigs };