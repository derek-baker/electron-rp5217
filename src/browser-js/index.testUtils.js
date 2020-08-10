// Faux-module pattern due to MIME-type issues with Electron when trying to run <script type="module">
const Utils = (function () {
    return {
        /**
         * @param {any} viewModel
         */
        initDevValues: (
            // @ts-ignore
            viewModel
        ) => {
            if (!viewModel) throw new Error('Param viewModel is falsy.');

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
            viewModel.fourNumberOfParcels = '4'
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
            viewModel.saleConditionComments = 'mock comment here'
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

            const form = document.getElementById('form')
            if (!form) {
                throw new Error('Element with ID form not found.');
            }
            form.dispatchEvent(new KeyboardEvent('keyup'));
        }
    }
})();


