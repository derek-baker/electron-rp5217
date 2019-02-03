// Module pattern because JS export/import isn't as supported as widely as I'd like as of 5/19/18
const Utils = (function(){
    'use strict';

    let checkForIE = function (){
        if(navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0){
            alert(
                'Internet Explorer does not render this site properly. Please use Firefox, Chrome, or Edge instead.'
            );
            window.location.replace('https://www.mozilla.org/en-US/firefox/new/');            
        }
    } 
    checkForIE();

    return {
        CheckForWindows: () => {
            return navigator.platform.indexOf('Win') > -1
        },
        InitDevValues: () => {
            viewModel.swisCode = '123456'
            viewModel.propertyLocationStreetNumber  = '1'
            viewModel.propertyLocationStreetName = '2'
            viewModel.propertyLocationCityTown = '3'
            viewModel.propertyLocationVillage = '4'
            viewModel.propertyLocationZipcode = '5'
            viewModel.buyerLastNameCompanyOne = '6'
            viewModel.buyerFirstNameOne = '7'
            viewModel.buyerLastNameCompanyTwo = '8'
            viewModel.buyerFirstNameTwo = '9'
            viewModel.taxAddressBuyerLastNameCompany = '10'
            viewModel.taxAddressBuyerFirstName = '11'
            viewModel.taxAddressStreetNumberAndName = '12'
            viewModel.taxAddressCityTown = '13'
            viewModel.taxAddressState = '14'
            viewModel.taxAddressZipCode = '15'
            viewModel.fourNumberOfParcels = '1'
            viewModel.fourPartOfParcelCheckbox = true
            viewModel.fourSubDivAuthExists = true
            viewModel.fourSubDivApprovalRequired = true
            viewModel.fourParcelApprovedWithMap = true
            viewModel.fourFrontFeet = '17.1'
            viewModel.fourDepth = '18.2'
            viewModel.fourAcres= '19'
            viewModel.sellerNameLastNameCompany = '20'
            viewModel.sellerNameFirstName = '21'
            viewModel.sellerNameLastNameCompanyTwo = '22'
            viewModel.sellerNameFirstNameTwo  = '23'
            viewModel.propertyUseSelect = '1'
            viewModel.ownershipIsCondo = true
            viewModel.constructionOnVacant = true
            viewModel.locatedWithinAg = true
            viewModel.buyerReceivedDisclosureNotice = true
            viewModel.saleContractDate = '2018-07-14'
            viewModel.saleTransferDate = '2018-07-15'                
            viewModel.salePrice = '24'
            viewModel.salePersonalPropertyVal = '23'
            viewModel.saleInfoCheckA = true
            viewModel.saleInfoCheckB = true
            viewModel.saleInfoCheckC = true
            viewModel.saleInfoCheckD = true
            viewModel.saleInfoCheckE = true
            viewModel.saleInfoCheckF = true
            viewModel.saleInfoCheckG = true
            viewModel.saleInfoCheckH = true
            viewModel.saleInfoCheckI = true
            viewModel.saleInfoCheckJ = false
            viewModel.saleConditionComments = 'null'
            viewModel.assessmentRollYear = '25'            
            viewModel.assessmentTotalValue = '26'            
            viewModel.assessmentPropClassFirstInput = '270'
            viewModel.assessmentSchoolDistrict = '28'
            viewModel.taxMapIdOne = '29'
            viewModel.taxMapIdTwo = '30'
            viewModel.taxMapIdThree = '31'
            viewModel.taxMapIdFour = '32'
            viewModel.contactInfoLastName = '33'
            viewModel.contactInfoFirstName = '34'
            viewModel.contactInfoStreetNumber = '37'
            viewModel.contactInfoStreetName = '38'
            viewModel.contactInfoCityTown = '39'
            viewModel.contactInfoState = '40'
            viewModel.contactInfoZipCode = '41'            
            viewModel.contactInfoAreaCode = '350'
            viewModel.contactInfoPhoneNumber = '360-0000'
            viewModel.contactAttorneyInfoLastName = '42'
            viewModel.contactInfoAttorneyFirstName = '43'
            viewModel.contactInfoAttorneyAreaCode = '440'
            viewModel.contactInfoAttorneyPhoneNum = '450-0000'
        },
        CheckForInternetExplorer : checkForIE
    };
})();