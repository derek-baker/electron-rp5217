// Wanted viewModel to be accessible outside the listener block

/** @type {any} */
let viewModel;

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /**
     * @param {*} stringToEval
     * @return {boolean}
     */
    const _mapEmptyStringToStringNull = function(stringToEval) {
        return (stringToEval === '' || stringToEval === ' ') ? 'null' : stringToEval;
    };

    /**
     * @param {*} number
     * @return {string}
     */
    const _pad = function(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    };

    /**
     * @param {Date} dateToConvert
     * @return {string}
     */
    const toISO = (dateToConvert) => {
        const isoDate =
            _pad(dateToConvert.getUTCDate()) + '-' +
            _pad(dateToConvert.getUTCMonth() + 1) + '-' +
            dateToConvert.getUTCFullYear();

        return isoDate;
    };

    /**
     * Precondition: dateToUnformat should arrive formatted as: mm/dd/yyyy or m/d/yyyy
     * Postcondition: function returns date formatted as: yyyy-mm-dd
     * @param {string} dateToUnformat
     * @return {Date | string}
     */
    const _unformatDate = function(dateToUnformat) {
        if (dateToUnformat.includes('/')) {
            const datePartsArr = dateToUnformat.split('/');
            return toISO(
                new Date(
                    Number(datePartsArr[2]), Number(datePartsArr[0]) - 1, Number(datePartsArr[1])
                )
            );
        }
        return (dateToUnformat.includes('-') === true) ? dateToUnformat : 'null';
    };

    viewModel = new Vue({
        el: '#app',
        data: {
            swisCode: '',
            propertyLocationStreetNumber: '',
            propertyLocationStreetName: '',
            propertyLocationCityTown: '',
            propertyLocationVillage: '',
            propertyLocationZipcode: '',
            buyerLastNameCompanyOne: '',
            buyerFirstNameOne: '',
            buyerLastNameCompanyTwo: '',
            buyerFirstNameTwo: '',
            taxAddressBuyerLastNameCompany: '',
            taxAddressBuyerFirstName: '',
            taxAddressStreetNumberAndName: '',
            taxAddressCityTown: '',
            taxAddressState: '',
            taxAddressZipCode: '',
            fourNumberOfParcels: null,
            fourPartOfParcelCheckbox: false,
            fourFrontFeet: null,
            fourDepth: null,
            fourAcres: null,
            fourSubDivAuthExists: false,
            fourSubDivApprovalRequired: false,
            fourParcelApprovedWithMap: false,
            sellerNameLastNameCompany: null,
            sellerNameFirstName: null,
            sellerNameLastNameCompanyTwo: null,
            sellerNameFirstNameTwo: null,
            propertyUseSelect: null,
            ownershipIsCondo: null,
            constructionOnVacant: null,
            locatedWithinAg: null,
            buyerReceivedDisclosureNotice: null,
            saleContractDate: null,
            saleTransferDate: null,
            salePrice: null,
            salePersonalPropertyVal: null,
            saleConditionComments: null,
            saleInfoCheckA: null,
            saleInfoCheckB: null,
            saleInfoCheckC: null,
            saleInfoCheckD: null,
            saleInfoCheckE: null,
            saleInfoCheckF: null,
            saleInfoCheckG: null,
            saleInfoCheckH: null,
            saleInfoCheckI: null,
            saleInfoCheckJ: null,
            assessmentRollYear: null,
            assessmentPropClassFirstInput: '',
            assessmentTotalValue: null,
            assessmentSchoolDistrict: null,
            taxMapIdOne: null,
            taxMapIdTwo: null,
            taxMapIdThree: null,
            taxMapIdFour: null,
            contactInfoLastName: null,
            contactInfoFirstName: null,
            contactInfoAreaCode: null,
            contactInfoPhoneNumber: null,
            contactInfoStreetNumber: null,
            contactInfoStreetName: null,
            contactInfoCityTown: null,
            contactInfoState: null,
            contactInfoZipCode: null,
            contactAttorneyInfoLastName: null,
            contactInfoAttorneyFirstName: null,
            contactInfoAttorneyAreaCode: null,
            contactInfoAttorneyPhoneNum: null,
            validationCounterForNumberOfParcels: false
        },
        watch: {
            // Note that the string represents the name of a method on this class
            fourPartOfParcelCheckbox: 'updateTitle',
            fourSubDivAuthExists: 'updateTitle',
            fourSubDivApprovalRequired: 'updateTitle',
            fourParcelApprovedWithMap: 'updateTitle',
            ownershipIsCondo: 'updateTitle',
            constructionOnVacant: 'updateTitle',
            locatedWithinAg: 'updateTitle',
            buyerReceivedDisclosureNotice: 'updateTitle',
            saleInfoCheckA: 'updateTitle',
            saleInfoCheckB: 'updateTitle',
            saleInfoCheckC: 'updateTitle',
            saleInfoCheckD: 'updateTitle',
            saleInfoCheckE: 'updateTitle',
            saleInfoCheckF: 'updateTitle',
            saleInfoCheckG: 'updateTitle',
            saleInfoCheckH: 'updateTitle',
            saleInfoCheckI: 'updateTitle',
            saleInfoCheckJ: 'updateTitle'
        },
        methods: {
            updateTitle: function() {
                document.title =
                    `${document.title.replace(' (YOUR WORK IS UNSAVED)', '')} (YOUR WORK IS UNSAVED)`;
                // string added above removed from title in renderer.js
            },
            InitModelWithValsFromDataStore: function(
                swisCode,
                propertyLocationStreetNumber,
                propertyLocationStreetName,
                propertyLocationCityTown,
                propertyLocationVillage,
                propertyLocationZipcode,
                buyerLastNameCompanyOne,
                buyerFirstNameOne,
                buyerLastNameCompanyTwo,
                buyerFirstNameTwo,
                taxAddressBuyerLastNameCompany,
                taxAddressBuyerFirstName,
                taxAddressStreetNumberAndName,
                taxAddressCityTown,
                taxAddressState,
                taxAddressZipCode,
                fourNumberOfParcels,
                fourPartOfParcelCheckbox = false,
                fourFrontFeet,
                fourDepth,
                fourAcres,
                fourSubDivAuthExists = false,
                fourSubDivApprovalRequired = false,
                fourParcelApprovedWithMap = false,
                sellerNameLastNameCompany,
                sellerNameFirstName,
                sellerNameLastNameCompanyTwo,
                sellerNameFirstNameTwo,
                propertyUseSelect,
                ownershipIsCondo = false,
                constructionOnVacant = false,
                locatedWithinAg = false,
                buyerReceivedDisclosureNotice = false,
                saleContractDate,
                saleTransferDate,
                salePrice,
                salePersonalPropertyVal,
                saleConditionComments = '',
                saleInfoCheckA = false,
                saleInfoCheckB = false,
                saleInfoCheckC = false,
                saleInfoCheckD = false,
                saleInfoCheckE = false,
                saleInfoCheckF = false,
                saleInfoCheckG = false,
                saleInfoCheckH = false,
                saleInfoCheckI = false,
                saleInfoCheckJ = false,
                assessmentRollYear,
                assessmentPropClassFirstInput,
                assessmentTotalValue,
                assessmentSchoolDistrict,
                taxMapIdOne = '',
                taxMapIdTwo = '',
                taxMapIdThree = '',
                taxMapIdFour = '',
                contactInfoLastName = '',
                contactInfoFirstName = '',
                contactInfoAreaCode = '',
                contactInfoPhoneNumber = '',
                contactInfoStreetNumber = '',
                contactInfoStreetName = '',
                contactInfoCityTown = '',
                contactInfoState = '',
                contactInfoZipCode = '',
                contactAttorneyInfoLastName = '',
                contactInfoAttorneyFirstName = '',
                contactInfoAttorneyAreaCode = '',
                contactInfoAttorneyPhoneNum = '',
            ) {
                this.swisCode = swisCode;
                this.propertyLocationStreetNumber = propertyLocationStreetNumber;
                this.propertyLocationStreetName = propertyLocationStreetName.replace('&amp;', '&');
                this.propertyLocationCityTown = propertyLocationCityTown;
                this.propertyLocationZipcode = propertyLocationZipcode;
                this.propertyLocationVillage = propertyLocationVillage;
                this.buyerLastNameCompanyOne = buyerLastNameCompanyOne;
                this.buyerFirstNameOne = buyerFirstNameOne;
                this.buyerLastNameCompanyTwo = buyerLastNameCompanyTwo;
                this.buyerFirstNameTwo = buyerFirstNameTwo;
                this.taxAddressBuyerLastNameCompany = taxAddressBuyerLastNameCompany;
                this.taxAddressBuyerFirstName = taxAddressBuyerFirstName;
                this.taxAddressStreetNumberAndName = taxAddressStreetNumberAndName;
                this.taxAddressCityTown = taxAddressCityTown;
                this.taxAddressState = taxAddressState;
                this.taxAddressZipCode = taxAddressZipCode;
                this.fourNumberOfParcels = fourNumberOfParcels;
                this.fourPartOfParcelCheckbox = fourPartOfParcelCheckbox;
                this.fourFrontFeet = (fourFrontFeet) ? fourFrontFeet.replace(',', '') : null;
                this.fourDepth = (fourDepth) ? fourDepth.replace(',', '') : null;
                this.fourAcres = fourAcres;
                this.fourSubDivAuthExists = fourSubDivAuthExists;
                this.fourSubDivApprovalRequired = fourSubDivApprovalRequired;
                this.fourParcelApprovedWithMap = fourParcelApprovedWithMap;

                // eslint-disable-next-line max-len
                this.sellerNameLastNameCompany = (sellerNameLastNameCompany) ? sellerNameLastNameCompany.replace('&amp;', '&') : null;
                this.sellerNameFirstName = (sellerNameFirstName) ? sellerNameFirstName.replace('&amp;', '&') : null;
                // eslint-disable-next-line max-len
                this.sellerNameLastNameCompanyTwo = (sellerNameLastNameCompanyTwo) ? sellerNameLastNameCompanyTwo.replace('&amp;', '&') : null;
                // eslint-disable-next-line max-len
                this.sellerNameFirstNameTwo = (sellerNameFirstNameTwo) ? sellerNameFirstNameTwo.replace('&amp;', '&') : null;

                this.propertyUseSelect = propertyUseSelect;
                this.ownershipIsCondo = ownershipIsCondo;
                this.constructionOnVacant = constructionOnVacant;
                this.locatedWithinAg = locatedWithinAg;
                this.buyerReceivedDisclosureNotice = buyerReceivedDisclosureNotice;
                this.saleContractDate = saleContractDate;
                this.saleTransferDate = saleTransferDate;
                this.salePrice = salePrice;
                this.salePersonalPropertyVal = salePersonalPropertyVal;
                this.saleConditionComments = saleConditionComments;
                this.saleInfoCheckA = saleInfoCheckA;
                this.saleInfoCheckB = saleInfoCheckB;
                this.saleInfoCheckC = saleInfoCheckC;
                this.saleInfoCheckD = saleInfoCheckD;
                this.saleInfoCheckE = saleInfoCheckE;
                this.saleInfoCheckF = saleInfoCheckF;
                this.saleInfoCheckG = saleInfoCheckG;
                this.saleInfoCheckH = saleInfoCheckH;
                this.saleInfoCheckI = saleInfoCheckI;
                this.saleInfoCheckJ = saleInfoCheckJ;
                this.assessmentRollYear = assessmentRollYear;
                this.assessmentTotalValue = assessmentTotalValue;
                this.assessmentPropClassFirstInput = assessmentPropClassFirstInput;
                this.assessmentSchoolDistrict = assessmentSchoolDistrict;
                this.taxMapIdOne = taxMapIdOne;
                this.taxMapIdTwo = taxMapIdTwo;
                this.taxMapIdThree = taxMapIdThree;
                this.taxMapIdFour = taxMapIdFour;
                this.contactInfoLastName = contactInfoLastName;
                this.contactInfoFirstName = contactInfoFirstName;
                this.contactInfoAreaCode = contactInfoAreaCode;
                this.contactInfoPhoneNumber = contactInfoPhoneNumber;
                this.contactInfoStreetNumber = contactInfoStreetNumber;
                this.contactInfoStreetName = contactInfoStreetName;
                this.contactInfoCityTown = contactInfoCityTown;
                this.contactInfoState = contactInfoState;
                this.contactInfoZipCode = contactInfoZipCode;
                this.contactAttorneyInfoLastName = contactAttorneyInfoLastName;
                this.contactInfoAttorneyFirstName = contactInfoAttorneyFirstName;
                this.contactInfoAttorneyAreaCode = contactInfoAttorneyAreaCode;
                this.contactInfoAttorneyPhoneNum = contactInfoAttorneyPhoneNum;
                // Trigger barcode regeneration
                setTimeout(() => {
                    document.getElementById('assessmentTotalValue').dispatchEvent(new KeyboardEvent('keyup'));
                }, 500);
            },
            addCommaFormatting: function(event) {
                const propName = event.target.attributes[1].nodeValue;
                const assessmentValue = event.target._value;
                // Why would I use this condition?
                if (assessmentValue != null && assessmentValue.toString() !== '') {
                    const components = event.target._value.toString().split('.');
                    components[0] = components[0].replace(/[^0-9]/g, '');
                    let nStr = components[0].replace(/,/g, '');
                    nStr += '';
                    const x = nStr.split('.');
                    let x1 = x[0];
                    const x2 = x.length > 1 ? '.' + x[1] : '';
                    const rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');
                    }
                    this[propName] = x1 + x2;
                }
            },
            formatAsPhoneNumber: function(event) {
                const propName = event.target.attributes[0].nodeValue;
                if (event.target._value && event.target._value.toString() !== '') {
                    let input = event.target._value.toString();
                    input = input.replace(/\D/g, '');
                    input = input.substring(0, 7);

                    const size = input.length;
                    if (size <= 3) {
                        input = input;
                    }
                    else if (size <= 7 && size > 3) {
                        input = input.substring(0, 3) + '-' + input.substring(3, size);
                    }
                    this[propName] = input;
                }
            },
            // Called by index.barcode._initBarcodePrereqs() to create a string to encode in the barcode
            mergeData: function() {
                try {
                    const dummyValue = new Date().toLocaleDateString('en-US');
                    // Purpose of the ternaries that check for null below attempt
                    // to avoid calling methods on null
                    const contractDate = (!this.saleContractDate) ? dummyValue : this.saleContractDate;
                    const transferDate = (!this.saleTransferDate) ? dummyValue : this.saleTransferDate;

                    const propertyCodes = this.assessmentPropClassFirstInput.split('-');
                    const propertyClassBeforeHyphen = (propertyCodes[0] === '') ? 'null' : propertyCodes[0];
                    // eslint-disable-next-line max-len
                    const propertyClassAfterHyphen = (propertyCodes[1] === undefined) ? 'null' : propertyCodes[1].toUpperCase();

                    const _salePrice = (!this.salePrice) ? '' : this.salePrice.toString().replace(/[^0-9]/g, '');
                    // eslint-disable-next-line max-len
                    const _salePersonalPropertyVal = (!this.salePersonalPropertyVal) ? '' : this.salePersonalPropertyVal.toString().replace(/[^0-9]/g, '');
                    // eslint-disable-next-line max-len
                    const _assessmentTotalValue = (!this.assessmentTotalValue) ? '' : this.assessmentTotalValue.toString().replace(/[^0-9]/g, '');

                    // eslint-disable-next-line max-len
                    const _contactInfoPhoneNumber = (!this.contactInfoPhoneNumber) ? '' : this.contactInfoPhoneNumber.replace('-', '');
                    // eslint-disable-next-line max-len
                    const _contactInfoAttorneyPhoneNum = (!this.contactInfoAttorneyPhoneNum) ? '' : this.contactInfoAttorneyPhoneNum.replace('-', '');

                    const stringToEncode =
                        _mapEmptyStringToStringNull(this.propertyLocationStreetNumber) + '|' +
                        _mapEmptyStringToStringNull(this.propertyLocationStreetName) + '|' +
                        _mapEmptyStringToStringNull(this.propertyLocationCityTown) + '|' +
                        _mapEmptyStringToStringNull(this.propertyLocationVillage) + '|' +
                        _mapEmptyStringToStringNull(this.propertyLocationZipcode) + '|' +
                        _mapEmptyStringToStringNull(this.buyerLastNameCompanyOne) + '|' +
                        _mapEmptyStringToStringNull(this.buyerFirstNameOne) + '|' +
                        _mapEmptyStringToStringNull(this.buyerLastNameCompanyTwo) + '|' +
                        _mapEmptyStringToStringNull(this.buyerFirstNameTwo) + '|' +
                        _mapEmptyStringToStringNull(this.taxAddressBuyerLastNameCompany) + '|' +
                        _mapEmptyStringToStringNull(this.taxAddressBuyerFirstName) + '|' +
                        _mapEmptyStringToStringNull(this.taxAddressStreetNumberAndName) + '|' +
                        _mapEmptyStringToStringNull(this.taxAddressCityTown) + '|' +
                        _mapEmptyStringToStringNull(this.taxAddressState) + '|' +
                        _mapEmptyStringToStringNull(this.taxAddressZipCode) + '|' +
                        _mapEmptyStringToStringNull(this.fourNumberOfParcels) + '|' +

                        // Need to check the order on the following four checkboxes
                        // Cast Boolean to int-like value
                        Number(this.fourPartOfParcelCheckbox) + '|' +
                        Number(this.fourSubDivAuthExists) + '|' +
                        Number(this.fourSubDivApprovalRequired) + '|' +
                        Number(this.fourParcelApprovedWithMap) + '|' +

                        _mapEmptyStringToStringNull(this.fourFrontFeet) + '|' +
                        _mapEmptyStringToStringNull(this.fourDepth) + '|' +

                        // It looks like on the PDF they enforce the presence of two decimal places,
                        // and then they strip the decimal when encoding in the barcode
                        //  (ex: 23 becomes 23.00 becomes 2300)
                        (Number(this.fourAcres) * 100) + '|' +

                        _mapEmptyStringToStringNull(this.sellerNameLastNameCompany) + '|' +
                        _mapEmptyStringToStringNull(this.sellerNameFirstName) + '|' +
                        _mapEmptyStringToStringNull(this.sellerNameLastNameCompanyTwo) + '|' +
                        _mapEmptyStringToStringNull(this.sellerNameFirstNameTwo) + '|' +

                        _mapEmptyStringToStringNull(this.propertyUseSelect) + '|' +
                        // Cast Boolean
                        Number(this.ownershipIsCondo) + '|' +
                        Number(this.constructionOnVacant) + '|' +
                        Number(this.locatedWithinAg) + '|' +
                        Number(this.buyerReceivedDisclosureNotice) + '|' +


                        // These vars were created at the beginning of this method
                        // We have to unformat them because the user insisted on particular formatting
                        // on the PDF, but the barcode requires a short-version ISO format
                        // eslint-disable-next-line max-len
                        ((_unformatDate(contractDate) === '0001-01-01') ? 'null' : (_unformatDate(contractDate))) + '|' +
                        // eslint-disable-next-line max-len
                        // transferDate is mandatory, so there will never be a case where it's actually null in the barcode
                        _unformatDate(transferDate) + '|' +

                        // eslint-disable-next-line max-len
                        _mapEmptyStringToStringNull(_salePrice.replace('$', '').replace(',', '').replace(',', '').replace(',', '').replace(',', '')) + '|' +
                        // eslint-disable-next-line max-len
                        _mapEmptyStringToStringNull(_salePersonalPropertyVal.replace('$', '').replace(',', '').replace(',', '').replace(',', '').replace(',', '')) + '|' +
                        Number(this.saleInfoCheckA) + '|' +
                        Number(this.saleInfoCheckB) + '|' +
                        Number(this.saleInfoCheckC) + '|' +
                        Number(this.saleInfoCheckD) + '|' +
                        Number(this.saleInfoCheckE) + '|' +
                        Number(this.saleInfoCheckF) + '|' +
                        Number(this.saleInfoCheckG) + '|' +
                        Number(this.saleInfoCheckH) + '|' +
                        Number(this.saleInfoCheckI) + '|' +
                        Number(this.saleInfoCheckJ) + '|' +
                        _mapEmptyStringToStringNull(this.saleConditionComments) + '|' +
                        _mapEmptyStringToStringNull(this.assessmentRollYear) + '|' +

                        // eslint-disable-next-line max-len
                        _mapEmptyStringToStringNull(_assessmentTotalValue.replace('$', '').replace(',', '').replace(',', '').replace(',', '').replace(',', '')) + '|' +
                        propertyClassBeforeHyphen + '|' +
                        propertyClassAfterHyphen + '|' +
                        _mapEmptyStringToStringNull(this.assessmentSchoolDistrict) + '|' +
                        _mapEmptyStringToStringNull(this.taxMapIdOne) + '|' +
                        _mapEmptyStringToStringNull(this.taxMapIdTwo) + '|' +
                        _mapEmptyStringToStringNull(this.taxMapIdThree) + '|' +
                        _mapEmptyStringToStringNull(this.taxMapIdFour) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoStreetNumber) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoStreetName) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoCityTown) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoState) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoZipCode) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoLastName) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoFirstName) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoAreaCode) + '|' +
                        _mapEmptyStringToStringNull(_contactInfoPhoneNumber) + '|' +
                        _mapEmptyStringToStringNull(this.contactAttorneyInfoLastName) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoAttorneyFirstName) + '|' +
                        _mapEmptyStringToStringNull(this.contactInfoAttorneyAreaCode) + '|' +
                        _mapEmptyStringToStringNull(_contactInfoAttorneyPhoneNum) + '|~r';
                    // console.log(stringToEncode);
                    return stringToEncode;
                }
                catch (err) {
                    console.log(err);
                    alert('An error occurred. Please submit a support request using the \'Help\' button.');
                }
            },
            comparefourNumberOfParcelsWithParcelIdCount: function() {
                const values = [this.taxMapIdOne, this.taxMapIdTwo, this.taxMapIdThree, this.taxMapIdFour];
                let count = 0;
                // Should probably just have the if below check if x is truthy
                values.map((x) => { if (!(x === null || x === undefined || x === '')) { count++; } });
                return count;
            },
            // This is used in a mutex between option J and all other options
            uncheckSaleConditionsCheckboxes: function() {
                this.saleInfoCheckA = false;
                this.saleInfoCheckB = false;
                this.saleInfoCheckC = false;
                this.saleInfoCheckD = false;
                this.saleInfoCheckE = false;
                this.saleInfoCheckF = false;
                this.saleInfoCheckG = false;
                this.saleInfoCheckH = false;
                this.saleInfoCheckI = false;
            },
            ensureThatAtLeastOneSaleConditionIsSelected: function() {
                if (
                    this.saleInfoCheckA !== true &&
                    this.saleInfoCheckB !== true &&
                    this.saleInfoCheckC !== true &&
                    this.saleInfoCheckD !== true &&
                    this.saleInfoCheckE !== true &&
                    this.saleInfoCheckF !== true &&
                    this.saleInfoCheckG !== true &&
                    this.saleInfoCheckH !== true &&
                    this.saleInfoCheckI !== true &&
                    this.saleInfoCheckJ !== true
                ) {
                    alert('You must select at least one condition for section 15');
                    return false;
                }
                return true;
            },
            ensureThatSaleDatePrecedesTransferDate() {
                if ((new Date(this.saleContractDate)) > (new Date(this.saleTransferDate))) {
                    alert('Transfer-Date (12) cannot occur before Contract-Date (11)');
                    return false;
                }
                return true;
            },
            ensureThatSalePriceGreaterThanPropertyValueInSale(
                salePrice,
                salePersonalPropertyVal
            ) {
                if (
                    (salePrice && salePersonalPropertyVal)
                    &&
                    parseInt(salePrice.replace(/,/g, ''), 10)
                    <
                    parseInt(salePersonalPropertyVal.replace(/,/g, ''), 10)
                ) {
                    alert('Personal property(14) cannot be greater than Sale Price(13)');
                    return false;
                }
                return true;
            },
            checkIfParcelIdCountIsGreaterThanFour() {
                if (
                    fourNumberOfParcels
                    &&
                    Number(this.fourNumberOfParcels) > 4
                    &&
                    this.validationCounterForNumberOfParcels !== true
                ) {
                    this.validationCounterForNumberOfParcels = true;
                    alert(
                        'When filling out question 20, Please attach an additional sheet that ' +
                        'lists the relevant tax-map identifiers, as this form only has space ' +
                        'for four tax-map identifiers by default.'
                    );
                }
            },
            validateBeforeSubmit: function() {
                if (
                    this.ensureThatAtLeastOneSaleConditionIsSelected()
                    &&
                    this.ensureThatSaleDatePrecedesTransferDate()
                    &&
                    this.ensureThatSalePriceGreaterThanPropertyValueInSale(
                        this.salePrice,
                        this.salePersonalPropertyVal
                    )
                ) {
                    // Note that a listener in index.form.js will remove the class below before file-dialog opens
                    // document.getElementById('spinner').className = 'spinner';
                    return true;
                }
                return false;
            }
        }
    });
});
