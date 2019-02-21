"use strict";

// This file is required by the index.html file and will be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer, shell} = require('electron');
const { envConfigs } = require('./config');
const { checkConnectivity } = require('./index.renderer.connectivity');
const { configureInstructions } = require('./index.renderer.instructions');

// import viewModel from './dist/build.js';

document.addEventListener("DOMContentLoaded", (event) => {
    ipcRenderer.send('loaded'); 

    // Specify behavior for 'Open File' buttons
    const openFileButton = document.getElementById('importDataButton')
    openFileButton.addEventListener("click", (event) => {
        ipcRenderer.send('openFile', () => { return; }); 
    });
    const openFileBottomButton = document.getElementById('importDataButtonBottom')
    openFileBottomButton.addEventListener("click", (event) => {
        ipcRenderer.send('openFile', () => { return; }); 
    });

    // Specify behavior for 'Save' buttons
    const saveBtn = document.getElementById('saveFileButton');
    saveBtn.addEventListener('click', (event) => {
        ipcRenderer.send('save', JSON.stringify(viewModel.$data) );
    });
    const saveBtnBottom = document.getElementById('saveFileButtonBottom');
    saveBtnBottom.addEventListener('click', (event) => {
        ipcRenderer.send('save', JSON.stringify(viewModel.$data) );
    });

    // Specify behavior for 'Save As' buttons
    const saveAsBtn = document.getElementById('saveAsFileButton');
    saveAsBtn.addEventListener('click', (event) => {
        ipcRenderer.send('save-dialog', JSON.stringify(viewModel.$data) );
    });
    const saveAsBtnBottom = document.getElementById('saveAsFileButtonBottom');
    saveAsBtnBottom.addEventListener('click', (event) => {
        ipcRenderer.send('save-dialog', JSON.stringify(viewModel.$data) );
    });
    
    ipcRenderer.on('saved-file', (event) => {
        document.title = document.title.replace(' (YOUR WORK IS UNSAVED)', '');
        // string removed above added to title in index.barcode.js (TODO)        
    });


    // Prod is default.... 
    let env = 'prod';
    const contactButtonListenerCallback = function(clickEvent){
        clickEvent.preventDefault();
        shell.openExternal(envConfigs[env].contactUrl);
    };
    let supportLink = document.getElementById('supportLink');
    supportLink.addEventListener('click', contactButtonListenerCallback);
    // ...but if we're running in Dev, we'll adjust URLs of services we depend on accordingly.
    // Event below sent after parent DomContentLoaded listener communicates over 'loaded' channel with main process.
    ipcRenderer.on('runningDevLocal', function(){        
        env = 'dev'; 
        // The form is pointed at prod by default
        document.getElementById('form').action = envConfigs[env].pdfCreationUrl;       
        // Remove the old listener to avoid having two.
        supportLink.removeEventListener('click', contactButtonListenerCallback);
        supportLink.addEventListener('click', contactButtonListenerCallback);
    });    
    checkConnectivity();
    configureInstructions();
});

ipcRenderer.on('stateRequest', () => {
    // TODO: should not be using $data property
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