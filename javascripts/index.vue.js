// Wanted viewModel to be accessible outside the listener block
let viewModel = null;
document.addEventListener("DOMContentLoaded", function(){
    'use strict';

    const dummyValue = new Date().toLocaleDateString('en-US');
    const spinner = document.getElementById('spinner');                            

    function _mapEmptyStringToStringNull(stringToEval){
        return (stringToEval === '') ? 'null' : stringToEval;
    }

    let pad = function pad(number) {
        if (number < 10) {
          return '0' + number;
        }
        return number;
    }    
    Date.prototype.toISO = function() {
        return pad(this.getUTCDate()) +
            '-' + pad(this.getUTCMonth() + 1) +
            '-' + this.getUTCFullYear();
    };    
    // Precondition: dateToUnformat should arrive formatted as: mm/dd/yyyy or m/d/yyyy
    // Postcondition: function returns date formatted as: yyyy-mm-dd
    let _unformatDate = function _unformatDate(dateToUnformat){
        if(dateToUnformat.includes('/')){
            let datePartsArr = dateToUnformat.split('/');
            return new Date(
                Number(datePartsArr[2]), Number(datePartsArr[0]) - 1, Number(datePartsArr[1])     
            ).toISO();
        }
        return (dateToUnformat.includes('-') === true) ? dateToUnformat : 'null';
    }

    // TODO: populate this with data POSTed from IMO
    viewModel = new Vue({
        el: '#app',
        data: {
            swisCode: ''
            ,propertyLocationStreetNumber: ''
            ,propertyLocationStreetName: ''
            ,propertyLocationCityTown: ''
            ,propertyLocationVillage: ''
            ,propertyLocationZipcode: ''
            ,buyerLastNameCompanyOne: ''   
            ,buyerFirstNameOne: ''   
            ,buyerLastNameCompanyTwo: ''   
            ,buyerFirstNameTwo: ''   
            ,taxAddressBuyerLastNameCompany: ''
            ,taxAddressBuyerFirstName: ''
            ,taxAddressStreetNumberAndName: ''
            ,taxAddressCityTown: ''
            ,taxAddressState: ''
            ,taxAddressZipCode: ''
            ,fourNumberOfParcels: null
            ,fourPartOfParcelCheckbox: false
            ,fourFrontFeet: null
            ,fourDepth: null
            ,fourAcres: null
            ,fourSubDivAuthExists: false
            ,fourSubDivApprovalRequired: false
            ,fourParcelApprovedWithMap: false
            ,sellerNameLastNameCompany: null
            ,sellerNameFirstName: null
            ,sellerNameLastNameCompanyTwo: null
            ,sellerNameFirstNameTwo: null
            ,propertyUseSelect: null
            ,ownershipIsCondo: null
            ,constructionOnVacant: null
            ,locatedWithinAg: null
            ,buyerReceivedDisclosureNotice: null
            ,saleContractDate: '0001-01-01'
            ,saleTransferDate: null
            ,salePrice: null
            ,salePersonalPropertyVal: null
            ,saleConditionComments: null
            ,saleInfoCheckA: null
            ,saleInfoCheckB: null
            ,saleInfoCheckC: null
            ,saleInfoCheckD: null
            ,saleInfoCheckE: null
            ,saleInfoCheckF: null
            ,saleInfoCheckG: null
            ,saleInfoCheckH: null
            ,saleInfoCheckI: null   
            ,saleInfoCheckJ: null   
            ,assessmentRollYear: null
            ,assessmentPropClassFirstInput: ''
            ,assessmentTotalValue: null
            ,assessmentSchoolDistrict: null
            ,taxMapIdOne: null
            ,taxMapIdTwo: null
            ,taxMapIdThree: null
            ,taxMapIdFour: null            
            ,contactInfoLastName: null
            ,contactInfoFirstName: null
            ,contactInfoAreaCode: null
            ,contactInfoPhoneNumber: null
            ,contactInfoStreetNumber: null
            ,contactInfoStreetName: null
            ,contactInfoCityTown: null
            ,contactInfoState: null
            ,contactInfoZipCode: null
            ,contactAttorneyInfoLastName: null
            ,contactInfoAttorneyFirstName: null
            ,contactInfoAttorneyAreaCode: null
            ,contactInfoAttorneyPhoneNum: null
            ,validationCounterForNumberOfParcels: 0
        },
        methods: {
            // Runs after load event
            InitModelWithValsFromImo: function(
                SwisCode
                ,PropLocStreetNumber
                ,PropLocStreetName
                ,PropLocCityTown
                ,PropLocZipcode
                ,PropLocVillage
                ,ParcelsTransferredOnDeed
                ,DeedPropertySizeFrontFeet
                ,DeedPropertySizeDepth
                ,Acres
                ,SellerLastNameOrCompany
                ,SellerFirstName
                ,SellerLastNameOrCompanyTwo
                ,SellerFirstNameTwo
                ,DescriptionDropDown
                ,IsCondominium
                ,IsInAgriculturalDistrict
                ,AssessmentRollYear
                ,TotalAssessedValue
                ,PropertyClass
                ,SchoolDistrictName
                ,TaxMapIdentifier
            ){  
                this.swisCode = SwisCode;
                this.propertyLocationStreetNumber = PropLocStreetNumber;
                this.propertyLocationStreetName = PropLocStreetName.replace('&amp;', '&');
                this.propertyLocationCityTown = PropLocCityTown;
                this.propertyLocationZipcode = PropLocZipcode;
                this.propertyLocationVillage = PropLocVillage;
                this.fourNumberOfParcels = ParcelsTransferredOnDeed;
                this.fourFrontFeet = DeedPropertySizeFrontFeet.replace(',', '');
                this.fourDepth = DeedPropertySizeDepth.replace(',', '');
                this.fourAcres = Acres;                
                this.sellerNameLastNameCompany = SellerLastNameOrCompany.replace('&amp;', '&');
                this.sellerNameFirstName = SellerFirstName.replace('&amp;', '&');
                this.sellerNameLastNameCompanyTwo = SellerLastNameOrCompanyTwo.replace('&amp;', '&');
                this.sellerNameFirstNameTwo = SellerFirstNameTwo.replace('&amp;', '&');  
                this.propertyUseSelect = DescriptionDropDown;                
                this.ownershipIsCondo = (IsCondominium.length > 0) ? true : false;
                this.locatedWithinAg = (IsInAgriculturalDistrict.length > 0) ? true : false;
                this.assessmentRollYear = AssessmentRollYear;
                this.assessmentTotalValue = TotalAssessedValue;
                this.assessmentPropClassFirstInput = PropertyClass;
                this.assessmentSchoolDistrict = SchoolDistrictName;
                this.taxMapIdOne = TaxMapIdentifier;
                setTimeout(() => {
                    document.getElementById('assessmentTotalValue').dispatchEvent(new KeyboardEvent('keyup')); 
                }, 500);
            },
            InitModelWithValsFromMongo: function(
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
                fourPartOfParcelCheckbox,
                fourFrontFeet,
                fourDepth,
                fourAcres,
                fourSubDivAuthExists,
                fourSubDivApprovalRequired,
                fourParcelApprovedWithMap,
                sellerNameLastNameCompany,
                sellerNameFirstName,
                sellerNameLastNameCompanyTwo,
                sellerNameFirstNameTwo,
                propertyUseSelect,
                ownershipIsCondo,
                constructionOnVacant,
                locatedWithinAg,
                buyerReceivedDisclosureNotice,
                saleContractDate,
                saleTransferDate,
                salePrice,
                salePersonalPropertyVal,
                saleConditionComments,
                saleInfoCheckA,
                saleInfoCheckB,
                saleInfoCheckC,
                saleInfoCheckD,
                saleInfoCheckE,
                saleInfoCheckF,
                saleInfoCheckG,
                saleInfoCheckH,
                saleInfoCheckI,
                saleInfoCheckJ,
                assessmentRollYear,
                assessmentPropClassFirstInput,
                assessmentTotalValue,
                assessmentSchoolDistrict,
                taxMapIdOne,
                taxMapIdTwo,
                taxMapIdThree,
                taxMapIdFour,
                contactInfoLastName,
                contactInfoFirstName,
                contactInfoAreaCode,
                contactInfoPhoneNumber,
                contactInfoStreetNumber,
                contactInfoStreetName,
                contactInfoCityTown,
                contactInfoState,
                contactInfoZipCode,
                contactAttorneyInfoLastName,
                contactInfoAttorneyFirstName,
                contactInfoAttorneyAreaCode,
                contactInfoAttorneyPhoneNum,    
            ){  
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
                this.fourPartOfParcelCheckbox = (fourPartOfParcelCheckbox === 'true');
                this.fourFrontFeet = (fourFrontFeet) ? fourFrontFeet.replace(',', '') : null;
                this.fourDepth = (fourDepth) ? fourDepth.replace(',', '') : null;
                this.fourAcres = fourAcres;
                this.fourSubDivAuthExists = (fourSubDivAuthExists === 'true');
                this.fourSubDivApprovalRequired = (fourSubDivApprovalRequired === 'true');
                this.fourParcelApprovedWithMap = (fourParcelApprovedWithMap === 'true');                

                this.sellerNameLastNameCompany = (sellerNameLastNameCompany) ? sellerNameLastNameCompany.replace('&amp;', '&') : null;
                this.sellerNameFirstName = (sellerNameFirstName) ? sellerNameFirstName.replace('&amp;', '&') : null;
                this.sellerNameLastNameCompanyTwo = (sellerNameLastNameCompanyTwo) ? sellerNameLastNameCompanyTwo.replace('&amp;', '&') : null;
                this.sellerNameFirstNameTwo = (sellerNameFirstNameTwo) ? sellerNameFirstNameTwo.replace('&amp;', '&') : null;  

                this.propertyUseSelect = propertyUseSelect;                
                this.ownershipIsCondo = (ownershipIsCondo === 'true');
                this.constructionOnVacant = (constructionOnVacant === 'true');
                this.locatedWithinAg = (locatedWithinAg === 'true');
                this.buyerReceivedDisclosureNotice = (buyerReceivedDisclosureNotice === 'true');
                this.saleContractDate = saleContractDate;
                this.saleTransferDate = saleTransferDate;
                this.salePrice = salePrice;
                this.salePersonalPropertyVal = salePersonalPropertyVal;
                this.saleConditionComments = saleConditionComments;
                this.saleInfoCheckA = (saleInfoCheckA === 'true');
                this.saleInfoCheckB = (saleInfoCheckB === 'true');
                this.saleInfoCheckC = (saleInfoCheckC === 'true');
                this.saleInfoCheckD = (saleInfoCheckD === 'true');
                this.saleInfoCheckE = (saleInfoCheckE === 'true');
                this.saleInfoCheckF = (saleInfoCheckF === 'true');
                this.saleInfoCheckG = (saleInfoCheckG === 'true');
                this.saleInfoCheckH = (saleInfoCheckH === 'true');
                this.saleInfoCheckI = (saleInfoCheckI === 'true');
                this.saleInfoCheckJ = (saleInfoCheckJ === 'true');
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
                setTimeout(() => {
                    document.getElementById('assessmentTotalValue').dispatchEvent(new KeyboardEvent('keyup')); 
                }, 500);
            },
            addCommaFormatting: function(event){
                let propName = event.target.attributes[1].nodeValue;
                let assessmentValue = event.target._value;
                if(assessmentValue != null && assessmentValue.toString() !== ''){
                    let components = event.target._value.toString().split(".");
                    components[0] = components[0].replace(/[^0-9]/g, '');
                    let nStr = components[0].replace(/,/g, '')
                    nStr += '';
                    let x = nStr.split('.');
                    let x1 = x[0];
                    let x2 = x.length > 1 ? '.' + x[1] : '';
                    var rgx = /(\d+)(\d{3})/;
                    while (rgx.test(x1)){
                        x1 = x1.replace(rgx, '$1' + ',' + '$2');                    
                    }
                    this[propName] = x1 + x2;                    
                }
            },
            formatAsPhoneNumber: function(event){
                let propName = event.target.attributes[0].nodeValue;
                if(event.target._value.toString() !== ''){
                // if(event.target._value){
                    let input = event.target._value.toString();
                    input = input.replace(/\D/g,'');
                    input = input.substring(0, 7);

                    const size = input.length;
                    if(size <= 3){
                        input = input;                        
                    }
                    else if(size <= 7 && size > 3){
                        input = input.substring(0,3) + '-' + input.substring(3,size);                        
                    }       
                    this[propName] = input;                    
                }
            },
            // Called by index.barcode._initBarcodePrereqs() to create a string to encode in the barcode
            mergeData: function () {
                // Purpose of the ternaries that check for null below attempt 
                // to avoid calling .replace() on null values
                let contractDate = (this.saleContractDate === null) ? dummyValue : this.saleContractDate;
                let transferDate = (this.saleTransferDate === null) ? dummyValue : this.saleTransferDate;

                const propertyCodes = this.assessmentPropClassFirstInput.split('-');
                const propertyClassBeforeHyphen = (propertyCodes[0] === '') ? 'null' : propertyCodes[0];                
                const propertyClassAfterHyphen = (propertyCodes[1] === undefined) ? 'null' : propertyCodes[1].toUpperCase();

                const _salePrice = (this.salePrice === null) ? '' : this.salePrice.toString().replace(/[^0-9]/g, '');
                const _salePersonalPropertyVal = (this.salePersonalPropertyVal === null) ? '' : this.salePersonalPropertyVal.toString().replace(/[^0-9]/g, '');
                const _assessmentTotalValue = (this.assessmentTotalValue === null) ? '' : this.assessmentTotalValue.toString().replace(/[^0-9]/g, '');

                const _contactInfoPhoneNumber = (this.contactInfoPhoneNumber === null) ? '' : this.contactInfoPhoneNumber.replace('-', '');
                const _contactInfoAttorneyPhoneNum = (this.contactInfoAttorneyPhoneNum === null) ? '' : this.contactInfoAttorneyPhoneNum.replace('-', '');

                let stringToEncode = 
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
                    _unformatDate(contractDate) + '|' + 
                    _unformatDate(transferDate) + '|' + 

                    // TODO: I think the function invocation below is irrelevant...
                    _mapEmptyStringToStringNull(_salePrice.replace('$', '').replace(',', '').replace(',', '').replace(',', '').replace(',', '')) + '|' +
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

                    // TODO: I think the function invocation below is irrelevant...
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
                // console.log(stringToEncode)
                return stringToEncode;
            },
            comparefourNumberOfParcelsWithParcelIdCount: function(){
                const values = [this.taxMapIdOne, this.taxMapIdTwo, this.taxMapIdThree, this.taxMapIdFour];
                let count = 0;
                values.map((x) => { if(!(x === null || x === undefined || x === '')){count++;} });
                return count;
            },
            // This is used to create a mutex between option J and all other options
            uncheckSaleConditionsCheckboxes: function(){
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
            ensureThatAtLeastOneSaleConditionIsSelected: function(){
                if(
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
                ){
                    alert('You must select at least one condition for section 15');
                    return false;
                }
                return true;
            },            
            ensureThatSaleDatePrecedesTransferDate(){
                if((new Date(this.saleContractDate)) > (new Date(this.saleTransferDate))){
                    alert('Transfer-Date (12) cannot occur before Contract-Date (11)');
                    return false;
                }
                return true;
            },
            validateBeforeSubmit: function(){
                // Makes use of vee-validator.js
                this.$validator.validateAll().then((result) => {
                    if(result && this.ensureThatAtLeastOneSaleConditionIsSelected() && this.ensureThatSaleDatePrecedesTransferDate()){
                        // Note that a listener in index.form.js will remove the class below before file-dialog opens
                        document.getElementById('spinner').className = 'spinner';
                        alert(
                            'Before printing, please set paper size in printer settings to ' + 
                            'legal paper(8.5" x 14") for the filing document.'
                        );
                        // The click-listener on the download button fires before this and builds part of the payload                                                 
                        document.getElementById('form').submit();                        
                        return;
                    }
                    // If you find yourself here trying to debug a vee-validator, consider removing the 'required'                    
                });
            }
        }
    });    
});