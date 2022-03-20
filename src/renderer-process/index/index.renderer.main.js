'use strict';

// This file is required by the index.html file and will be executed
// in the renderer process for that window.

// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron');
const { configureInstructions } = require('./index.renderer.instructions');
const { createButtonListeners } = require('./index.renderer.buttonBehavior');
const { envConfig } = require('./index.renderer.alterConfig');
const { addKeyupListener } = require('./index.renderer.keyboardShortcuts');
const { customChannels } = require('../../config');


document.addEventListener('DOMContentLoaded', (event) => {
    // Some functionality needs the DOMContent to be loaded prior to proceeding.
    ipcRenderer.send(customChannels.domLoaded);

    createButtonListeners();
    envConfig();
    configureInstructions();
    addKeyupListener();

    ipcRenderer.on(customChannels.savedFile, () => {
        document.title = document.title.replace(' (YOUR WORK IS UNSAVED)', '');
        // string removed above added to title in index.barcode.js
        // (TODO: refactor behavior to single location)
    });
});

ipcRenderer.on(
    customChannels.alert,
    /**
     * @param {Event} event
     * @param {string} msg
     */
    (event, msg) => {
        alert(msg);
    }
);

ipcRenderer.on(customChannels.formStateRequest, () => {
    // TODO: should not be using $data property(externally anyway)
    ipcRenderer.send(
        customChannels.formStateResponse,
        // @ts-ignore
        viewModel.$data
    );
});

ipcRenderer.on(
    customChannels.setTitle,
    /**
     * @param {Electron.Event} event
     * @param {string} formName
     */
    (event, formName) => {
        document.title = 'SDG RP5217 Editor ' + ((formName) ? `- ${formName}` : '');
    }
);

ipcRenderer.on(
    customChannels.fileData,
    /**
     * @param {Electron.Event} event
     * @param {string} data
     */
    (event, data) => {
        let result = undefined;
        try {
            if (data.length < 2) {
                return;
            }
            result = JSON.parse(data);
        }
        catch (error) {
            // TODO: build Cloud function for so we can read error messages remotely
            console.error(error);
            alert(
                'The file you attempted to open appears to be corrupt. \n\n' +
                'If the issue persists, submit a support request.'
            );
            return;
        }
        if (result) {
            // TODO: pass in result as types object instead of all its props
            // @ts-ignore
            // eslint-disable-next-line new-cap
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
        }
        // Need to ensure that barcode is in sync with data,
        // and this triggers a regeneration
        const form5217 = document.getElementById('form');
        if (!form5217) { throw new Error('form5217 is falsy'); }
        form5217.dispatchEvent(new KeyboardEvent('keyup'));
    });
