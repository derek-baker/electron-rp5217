"use strict";

// This file is required by the index.html file and will be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer, shell} = require('electron');
const { envConfigs } = require('./config');
const { checkConnectivity } = require('./index.renderer.connectivity');

// import viewModel from './dist/build.js';

document.addEventListener("DOMContentLoaded", (event) => {
    ipcRenderer.send('loaded'); 

    const openFileButton = document.getElementById('importDataButton')
    openFileButton.addEventListener("click", (event) => {
        ipcRenderer.send('openFile', () => { return; }); 
    });

    const saveAsBtn = document.getElementById('saveAsFileButton');
    saveAsBtn.addEventListener('click', (event) => {
        ipcRenderer.send('save-dialog', JSON.stringify(viewModel.$data) );
    });
    const saveBtn = document.getElementById('saveFileButton');
    saveBtn.addEventListener('click', (event) => {
        ipcRenderer.send('save', JSON.stringify(viewModel.$data) );
    });

    ipcRenderer.on('saved-file', (event) => {
        document.title = document.title.replace(' (YOUR WORK IS UNSAVED)', '');
        // string removed above added to title in index.barcode.js
        // if (!path) path = 'No path' // document.getElementById('file-saved').innerHTML = `Path selected: ${path}`
    });


    let env = 'prod';
    const contactButtonListener = function(clickEvent){
        clickEvent.preventDefault();
        shell.openExternal(envConfigs[env].contactEndpoint);
    };
    let supportLink = document.getElementById('supportLink');
    supportLink.addEventListener('click', contactButtonListener);
    // Event below sent after parent DomContentLoaded listener communicates over 'loaded' channel with main process.
    ipcRenderer.on('runningDevLocal', function(){        
        env = 'dev'; 
        // The form is pointed at prod by default
        document.getElementById('form').action = envConfigs[env].pdfCreationEndpoint;       
        // Remove the old listener to avoid having two.
        supportLink.removeEventListener('click', contactButtonListener);
        supportLink.addEventListener('click', contactButtonListener);
    });    
    checkConnectivity()
    // if (env === 'prod') {
    //     if ( !checkConnectivity() ) {
    //         alert(
    //             'It appears you do not have internet connectivity. ' + 
    //             'You\'ll be unable to generate PDFs if you aren\'t connected to the internet.'
    //         );
    //     }
    // };
});

ipcRenderer.on('stateRequest', () => {
    ipcRenderer.send('stateResponse', viewModel.$data);    
});

ipcRenderer.on('setTitle', (event, formName) => {
    document.title = 'RP5217 - ' + formName;
});

ipcRenderer.on('fileData', (event, data) => { 
    let result = JSON.parse(data);     
    viewModel.InitModelWithValsFromDataStore(          
        result.swisCode,
        result.propertyLocationStreetNumber,
        result.propertyLocationStreetName,
        result.propertyLocationCityTown,
        result.propertyLocationVillage,
        result.propertyLocationZipcode,
        result.buyerLastNameCompanyOne,
        result.buyerFirstNameOne,
        result.buyerLastNameCompanyTwo,
        result.buyerFirstNameTwo,
        result.taxAddressBuyerLastNameCompany,
        result.taxAddressBuyerFirstName,
        result.taxAddressStreetNumberAndName,
        result.taxAddressCityTown,
        result.taxAddressState,
        result.taxAddressZipCode,
        result.fourNumberOfParcels,
        result.fourPartOfParcelCheckbox,
        result.fourFrontFeet,
        result.fourDepth,
        result.fourAcres,
        result.fourSubDivAuthExists,
        result.fourSubDivApprovalRequired,
        result.fourParcelApprovedWithMap,
        result.sellerNameLastNameCompany,
        result.sellerNameFirstName,
        result.sellerNameLastNameCompanyTwo,
        result.sellerNameFirstNameTwo,
        result.propertyUseSelect,
        result.ownershipIsCondo,
        result.constructionOnVacant,
        result.locatedWithinAg,
        result.buyerReceivedDisclosureNotice,
        result.saleContractDate,
        result.saleTransferDate,
        result.salePrice,
        result.salePersonalPropertyVal,
        result.saleConditionComments,
        result.saleInfoCheckA,
        result.saleInfoCheckB,
        result.saleInfoCheckC,
        result.saleInfoCheckD,
        result.saleInfoCheckE,
        result.saleInfoCheckF,
        result.saleInfoCheckG,
        result.saleInfoCheckH,
        result.saleInfoCheckI,
        result.saleInfoCheckJ,
        result.assessmentRollYear,
        result.assessmentPropClassFirstInput,
        result.assessmentTotalValue,
        result.assessmentSchoolDistrict,
        result.taxMapIdOne,
        result.taxMapIdTwo,
        result.taxMapIdThree,
        result.taxMapIdFour,
        result.contactInfoLastName,
        result.contactInfoFirstName,
        result.contactInfoAreaCode,
        result.contactInfoPhoneNumber,
        result.contactInfoStreetNumber,
        result.contactInfoStreetName,
        result.contactInfoCityTown,
        result.contactInfoState,
        result.contactInfoZipCode,
        result.contactAttorneyInfoLastName,
        result.contactInfoAttorneyFirstName,
        result.contactInfoAttorneyAreaCode,
        result.contactInfoAttorneyPhoneNum
    );
    // Need to ensure that barcode is in sync with data, and this triggers a regeneration
    document.getElementById('form').dispatchEvent(new KeyboardEvent('keyup')); 
}) 