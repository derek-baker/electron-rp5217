// This file is required by the index.html file and will be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer, shell} = require('electron') 

document.addEventListener("DOMContentLoaded", (event) => {
    // ipcRenderer.send('requestForMainProcessArgs');
    // ipcRenderer.on('responseWithMainProcessArgs', (event, data) => {
    //     console.log('renderer callback')
    //     console.log(data);
    // });
    ipcRenderer.send('loaded', viewModel.$data); 

    const openFileButton = document.getElementById('importDataButton')
    openFileButton.addEventListener("click", (event) => {
        ipcRenderer.send('openFile', () => { return; }); 
    });


    const saveBtn = document.getElementById('saveAsFileButton');
    saveBtn.addEventListener('click', (event) => {
        ipcRenderer.send('save-dialog', JSON.stringify(viewModel.$data) )
    });
    ipcRenderer.on('saved-file', (event) => {
        // if (!path) path = 'No path'
        // document.getElementById('file-saved').innerHTML = `Path selected: ${path}`
    });

    // ipcRenderer.on('requestDataSnapshot', () => {
    //     console.log('request for data recieved');
    //     ipcRenderer.send('dataSnapshot', viewModel.$data);
    // }); 

    document.getElementById('supportLink').addEventListener('click', (event) => {
        event.preventDefault();
        shell.openExternal('https://systemsdevelopmentgroup.com/contact');
    });
});
// const generateGuid = () => {
//     function _p8(s) {
//         var p = (Math.random().toString(16)+"000000000").substr(2,8);
//         return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
//     }
//     return _p8() + _p8(true) + _p8(true) + _p8();
// }
ipcRenderer.on('fileData', (event, data) => { 
    result = JSON.parse(data); 
    // localStorage.setItem(
    //     result.buyerFirstNameOne + '_' + result.buyerLastNameCompanyOne + '_' + generateGuid()
    //     ,JSON.stringify(result)
    // );
    viewModel.InitModelWithValsFromMongo(          
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
}) 