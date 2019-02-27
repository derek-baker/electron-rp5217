"use strict";

// This file is required by the index.html file and will be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron');
const { configureInstructions } = require('./index.renderer.instructions');
const { createButtonListeners } = require('./index.renderer.buttonBehavior');
const { envConfig } = require('./index.renderer.alterConfig');
const { addKeyupListener } = require('./index.renderer.keyboardShortcuts');


document.addEventListener("DOMContentLoaded", (event) => {
    // Some functionality needs the DOMContented to be loaded prior to proceeding.
    ipcRenderer.send('loaded'); 

    createButtonListeners();
    // Display dirty file status
    envConfig();
    // Instructions-configuration is not environmentally-specific as the wiki is on GitHub
    configureInstructions();

    addKeyupListener();    

    ipcRenderer.on('saved-file', (event) => {
        document.title = document.title.replace(' (YOUR WORK IS UNSAVED)', '');
        // string removed above added to title in index.barcode.js (TODO: refactor behavior to single location)        
    });
});

ipcRenderer.on('alertChannel', function(event, msg){
    alert(
        'A new version of the RP5217 Editor is being downloaded in the background. To use the new version, close and re-open the app.'
    );
});

ipcRenderer.on('stateRequest', () => {
    // TODO: should not be using $data property
    ipcRenderer.send('stateResponse', viewModel.$data);    
});

ipcRenderer.on('setTitle', (event, formName) => {
    document.title = 'RP5217 Editor - ' + formName;
});

ipcRenderer.on('fileData', (event, data) => {
    let result = undefined;
    try {
        result = JSON.parse(data);     
    }
    catch (error) {
        // TODO: build Cloud function for getting remote error messages
        console.log(error);
        alert(
            'The file you attempted to open appears to be corrupt.' +  
            'If the issue persists, submit a support request at the following URL:' +
            'https://systemsdevelopmentgroup.com/contactSdg'
        );
        return;
    } 
    
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
}); 