import Vue from "vue";

// wanted viewModel to be accessible outside the listener block
let viewModel : any = null;
export default viewModel;

document.addEventListener("DOMContentLoaded", function(): void {
    "use strict";

    const dummyValue: string = new Date().toLocaleDateString("en-US");
    function _mapEmptyStringToStringNull(stringToEval: string): string {
        return (stringToEval === "") ? "null" : stringToEval;
    }

    let pad: Function = (number: number) => {
        if (number < 10) {
          return "0" + number;
        }
        return number;
    };

    // interface Date{
    //     toISO: () => void;
    // }
    // date.prototype.toISO = function(): void {
    //     return pad(this.getUTCDate()) +
    //         "-" + pad(this.getUTCMonth() + 1) +
    //         "-" + this.getUTCFullYear();
    // };

    // precondition: dateToUnformat should arrive formatted as: mm/dd/yyyy or m/d/yyyy
    // postcondition: function returns date formatted as: yyyy-mm-dd
    let _unformatDate: Function = function _unformatDate(dateToUnformat: string): string {
        if(dateToUnformat.includes("/")) {
            let datePartsArr : Array<string> = dateToUnformat.split("/");
            let date: Date = new Date(
                Number(datePartsArr[2]), Number(datePartsArr[0]) - 1, Number(datePartsArr[1])
            );
            return pad(date.getUTCDate())
                    + "-" + pad(date.getUTCMonth() + 1)
                    + "-" + date.getUTCFullYear();
        }
        return (dateToUnformat.includes("-") === true) ? dateToUnformat : "null";
    };

    viewModel = new Vue({
        el: "#app",
        data: {
            swisCode: ""
            ,propertyLocationStreetNumber: ""
            ,propertyLocationStreetName: ""
            ,propertyLocationCityTown: ""
            ,propertyLocationVillage: ""
            ,propertyLocationZipcode: ""
            ,buyerLastNameCompanyOne: ""
            ,buyerFirstNameOne: ""
            ,buyerLastNameCompanyTwo: ""
            ,buyerFirstNameTwo: ""
            ,taxAddressBuyerLastNameCompany: ""
            ,taxAddressBuyerFirstName: ""
            ,taxAddressStreetNumberAndName: ""
            ,taxAddressCityTown: ""
            ,taxAddressState: ""
            ,taxAddressZipCode: ""
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
            ,saleContractDate: "0001-01-01"
            ,saleTransferDate: null
            ,salePrice: ""
            ,salePersonalPropertyVal: ""
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
            ,assessmentPropClassFirstInput: ""
            ,assessmentTotalValue: ""
            ,assessmentSchoolDistrict: null
            ,taxMapIdOne: null
            ,taxMapIdTwo: null
            ,taxMapIdThree: null
            ,taxMapIdFour: null
            ,contactInfoLastName: null
            ,contactInfoFirstName: null
            ,contactInfoAreaCode: null
            ,contactInfoPhoneNumber: ""
            ,contactInfoStreetNumber: null
            ,contactInfoStreetName: null
            ,contactInfoCityTown: null
            ,contactInfoState: null
            ,contactInfoZipCode: null
            ,contactAttorneyInfoLastName: null
            ,contactInfoAttorneyFirstName: null
            ,contactInfoAttorneyAreaCode: null
            ,contactInfoAttorneyPhoneNum: ""
            ,validationCounterForNumberOfParcels: 0
        },
        methods: {
            // runs after load event
            // tslint:disable-next-line:comment-format
            // InitModelWithValsFromImo: function(
            // tslint:disable-next-line:comment-format
            //     SwisCode
            //     ,PropLocStreetNumber
            //     ,PropLocStreetName
            //     ,PropLocCityTown
            //     ,PropLocZipcode
            //     ,PropLocVillage
            //     ,ParcelsTransferredOnDeed
            //     ,DeedPropertySizeFrontFeet
            //     ,DeedPropertySizeDepth
            //     ,Acres
            //     ,SellerLastNameOrCompany
            //     ,SellerFirstName
            //     ,SellerLastNameOrCompanyTwo
            //     ,SellerFirstNameTwo
            //     ,DescriptionDropDown
            //     ,IsCondominium
            //     ,IsInAgriculturalDistrict
            //     ,AssessmentRollYear
            //     ,TotalAssessedValue
            //     ,PropertyClass
            //     ,SchoolDistrictName
            //     ,TaxMapIdentifier
            // ){
            //     this.swisCode = SwisCode;
            //     this.propertyLocationStreetNumber = PropLocStreetNumber;
            //     this.propertyLocationStreetName = PropLocStreetName.replace("&amp;", "&");
            //     this.propertyLocationCityTown = PropLocCityTown;
            //     this.propertyLocationZipcode = PropLocZipcode;
            //     this.propertyLocationVillage = PropLocVillage;
            //     this.fourNumberOfParcels = ParcelsTransferredOnDeed;
            //     this.fourFrontFeet = DeedPropertySizeFrontFeet.replace(",", "");
            //     this.fourDepth = DeedPropertySizeDepth.replace(",", "");
            //     this.fourAcres = Acres;
            //     this.sellerNameLastNameCompany = SellerLastNameOrCompany.replace("&amp;", "&");
            //     this.sellerNameFirstName = SellerFirstName.replace("&amp;", "&");
            //     this.sellerNameLastNameCompanyTwo = SellerLastNameOrCompanyTwo.replace("&amp;", "&");
            //     this.sellerNameFirstNameTwo = SellerFirstNameTwo.replace("&amp;", "&");
            //     this.propertyUseSelect = DescriptionDropDown;
            //     this.ownershipIsCondo = (IsCondominium.length > 0) ? true : false;
            //     this.locatedWithinAg = (IsInAgriculturalDistrict.length > 0) ? true : false;
            //     this.assessmentRollYear = AssessmentRollYear;
            //     this.assessmentTotalValue = TotalAssessedValue;
            //     this.assessmentPropClassFirstInput = PropertyClass;
            //     this.assessmentSchoolDistrict = SchoolDistrictName;
            //     this.taxMapIdOne = TaxMapIdentifier;
            //     setTimeout(() => {
            //         document.getElementById("assessmentTotalValue").dispatchEvent(new KeyboardEvent("keyup"));
            //     }, 500);
            // },
            InitModelWithValsFromMongo: function (
                swisCode: any,
                propertyLocationStreetNumber: any,
                propertyLocationStreetName: any,
                propertyLocationCityTown: any,
                propertyLocationVillage: any,
                propertyLocationZipcode: any,
                buyerLastNameCompanyOne: any,
                buyerFirstNameOne: any,
                buyerLastNameCompanyTwo: any,
                buyerFirstNameTwo: any,
                taxAddressBuyerLastNameCompany: any,
                taxAddressBuyerFirstName: any,
                taxAddressStreetNumberAndName: any,
                taxAddressCityTown: any,
                taxAddressState: any,
                taxAddressZipCode: any,
                fourNumberOfParcels: any,
                fourPartOfParcelCheckbox: any,
                fourFrontFeet: any,
                fourDepth: any,
                fourAcres: any,
                fourSubDivAuthExists: any,
                fourSubDivApprovalRequired: any,
                fourParcelApprovedWithMap: any,
                sellerNameLastNameCompany: any,
                sellerNameFirstName: any,
                sellerNameLastNameCompanyTwo: any,
                sellerNameFirstNameTwo: any,
                propertyUseSelect: any,
                ownershipIsCondo: any,
                constructionOnVacant: any,
                locatedWithinAg: any,
                buyerReceivedDisclosureNotice: any,
                saleContractDate: any,
                saleTransferDate: any,
                salePrice: any,
                salePersonalPropertyVal: any,
                saleConditionComments: any,
                saleInfoCheckA: any,
                saleInfoCheckB: any,
                saleInfoCheckC: any,
                saleInfoCheckD: any,
                saleInfoCheckE: any,
                saleInfoCheckF: any,
                saleInfoCheckG: any,
                saleInfoCheckH: any,
                saleInfoCheckI: any,
                saleInfoCheckJ: any,
                assessmentRollYear: any,
                assessmentPropClassFirstInput: any,
                assessmentTotalValue: any,
                assessmentSchoolDistrict: any,
                taxMapIdOne: any,
                taxMapIdTwo: any,
                taxMapIdThree: any,
                taxMapIdFour: any,
                contactInfoLastName: any,
                contactInfoFirstName: any,
                contactInfoAreaCode: any,
                contactInfoPhoneNumber: any,
                contactInfoStreetNumber: any,
                contactInfoStreetName: any,
                contactInfoCityTown: any,
                contactInfoState: any,
                contactInfoZipCode: any,
                contactAttorneyInfoLastName: any,
                contactInfoAttorneyFirstName: any,
                contactInfoAttorneyAreaCode: any,
                contactInfoAttorneyPhoneNum: any,
            ): void {
                this.swisCode = swisCode;
                this.propertyLocationStreetNumber = propertyLocationStreetNumber;
                this.propertyLocationStreetName = propertyLocationStreetName.replace("&amp;", "&");
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
                this.fourPartOfParcelCheckbox = fourPartOfParcelCheckbox ;
                this.fourFrontFeet = (fourFrontFeet) ? fourFrontFeet.replace(",", "") : null;
                this.fourDepth = (fourDepth) ? fourDepth.replace(",", "") : null;
                this.fourAcres = fourAcres;
                this.fourSubDivAuthExists = fourSubDivAuthExists ;
                this.fourSubDivApprovalRequired = fourSubDivApprovalRequired ;
                this.fourParcelApprovedWithMap = fourParcelApprovedWithMap ;

                this.sellerNameLastNameCompany = (sellerNameLastNameCompany) ? sellerNameLastNameCompany.replace("&amp;", "&") : null;
                this.sellerNameFirstName = (sellerNameFirstName) ? sellerNameFirstName.replace("&amp;", "&") : null;
                this.sellerNameLastNameCompanyTwo
                    = (sellerNameLastNameCompanyTwo)
                        ? sellerNameLastNameCompanyTwo.replace("&amp;", "&") : null;
                this.sellerNameFirstNameTwo
                    = (sellerNameFirstNameTwo)
                        ? sellerNameFirstNameTwo.replace("&amp;", "&") : null;

                this.propertyUseSelect = propertyUseSelect;
                this.ownershipIsCondo = ownershipIsCondo ;
                this.constructionOnVacant = constructionOnVacant ;
                this.locatedWithinAg = locatedWithinAg;
                this.buyerReceivedDisclosureNotice = buyerReceivedDisclosureNotice;
                this.saleContractDate = saleContractDate;
                this.saleTransferDate = saleTransferDate;
                this.salePrice = salePrice;
                this.salePersonalPropertyVal = salePersonalPropertyVal;
                this.saleConditionComments = saleConditionComments;
                this.saleInfoCheckA = saleInfoCheckA ;
                this.saleInfoCheckB = saleInfoCheckB ;
                this.saleInfoCheckC = saleInfoCheckC ;
                this.saleInfoCheckD = saleInfoCheckD ;
                this.saleInfoCheckE = saleInfoCheckE ;
                this.saleInfoCheckF = saleInfoCheckF ;
                this.saleInfoCheckG = saleInfoCheckG ;
                this.saleInfoCheckH = saleInfoCheckH ;
                this.saleInfoCheckI = saleInfoCheckI ;
                this.saleInfoCheckJ = saleInfoCheckJ ;
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
                    let assmntVal: any = document.getElementById("assessmentTotalValue");
                    if(assmntVal) {
                        assmntVal.dispatchEvent(new KeyboardEvent("keyup"));
                    }
                }, 500);
            },
            addCommaFormatting: function(event: any): void {
                let propName: string = event.target.attributes[1].nodeValue;
                let assessmentValue: string = event.target._value;
                if(assessmentValue != null && assessmentValue.toString() !== "") {
                    let components: Array<string> = event.target._value.toString().split(".");
                    components[0] = components[0].replace(/[^0-9]/g, "");
                    let nStr: string = components[0].replace(/,/g, "");
                    nStr += "";
                    let x: Array<string> = nStr.split(".");
                    let x1: string = x[0];
                    let x2: string = x.length > 1 ? "." + x[1] : "";
                    let rgx: any = /(\d+)(\d{3})/;
                    while (rgx.test(x1)) {
                        x1 = x1.replace(rgx, "$1" + "," + "$2");
                    }
                    viewModel[propName] = x1 + x2;
                }
            },
            formatAsPhoneNumber: function(event: any): void {
                let propName: string = event.target.attributes[0].nodeValue;
                if(event.target._value.toString() !== "") {
                // if(event.target._value){
                    let input: string = event.target._value.toString();
                    input = input.replace(/\D/g,"");
                    input = input.substring(0, 7);

                    const size: number = input.length;
                    if(size <= 3) {
                        input = input;
                    } else if(size <= 7 && size > 3) {
                        input = input.substring(0,3) + "-" + input.substring(3,size);
                    }
                    viewModel[propName] = input;
                }
            },
            // called by index.barcode._initBarcodePrereqs() to create a string to encode in the barcode
            mergeData: function (): string {
                // purpose of the ternaries that check for null below attempt
                // to avoid calling .replace() on null values
                let contractDate: string = (this.saleContractDate === null) ? dummyValue : this.saleContractDate;
                let transferDate: any = (this.saleTransferDate === null) ? dummyValue : this.saleTransferDate;

                const propertyCodes: Array<string> = this.assessmentPropClassFirstInput.split("-");
                const propertyClassBeforeHyphen: string = (propertyCodes[0] === "") ? "null" : propertyCodes[0];
                const propertyClassAfterHyphen: string = (propertyCodes[1] === undefined)
                    ? "null" : propertyCodes[1].toUpperCase();

                const _salePrice: string = (this.salePrice === null)
                    ? "" : this.salePrice.toString().replace(/[^0-9]/g, "");
                const _salePersonalPropertyVal: string = (this.salePersonalPropertyVal === null)
                    ? "" : this.salePersonalPropertyVal.toString().replace(/[^0-9]/g, "");
                const _assessmentTotalValue: string = (this.assessmentTotalValue === null)
                    ? "" : this.assessmentTotalValue.toString().replace(/[^0-9]/g, "");

                const _contactInfoPhoneNumber: string = (this.contactInfoPhoneNumber === null)
                    ? "" : this.contactInfoPhoneNumber.replace("-", "");
                const _contactInfoAttorneyPhoneNum: string = (this.contactInfoAttorneyPhoneNum === null)
                    ? "" : this.contactInfoAttorneyPhoneNum.replace("-", "");

                let stringToEncode: string =
                    _mapEmptyStringToStringNull(this.propertyLocationStreetNumber) + "|" +
                    _mapEmptyStringToStringNull(this.propertyLocationStreetName) + "|" +
                    _mapEmptyStringToStringNull(this.propertyLocationCityTown) + "|" +
                    _mapEmptyStringToStringNull(this.propertyLocationVillage) + "|" +
                    _mapEmptyStringToStringNull(this.propertyLocationZipcode) + "|" +
                    _mapEmptyStringToStringNull(this.buyerLastNameCompanyOne) + "|" +
                    _mapEmptyStringToStringNull(this.buyerLastNameCompanyTwo) + "|" +
                    _mapEmptyStringToStringNull(this.buyerFirstNameTwo) + "|" +
                    _mapEmptyStringToStringNull(this.taxAddressBuyerLastNameCompany) + "|" +
                    _mapEmptyStringToStringNull(this.taxAddressBuyerFirstName) + "|" +
                    _mapEmptyStringToStringNull(this.taxAddressStreetNumberAndName) + "|" +
                    _mapEmptyStringToStringNull(this.taxAddressCityTown) + "|" +
                    _mapEmptyStringToStringNull(this.taxAddressState) + "|" +
                    _mapEmptyStringToStringNull(this.taxAddressZipCode) + "|" +
                    _mapEmptyStringToStringNull(this.fourNumberOfParcels || "") + "|" +

                    // need to check the order on the following four checkboxes
                    // cast Boolean to int-like value
                    Number(this.fourPartOfParcelCheckbox) + "|" +
                    Number(this.fourSubDivAuthExists) + "|" +
                    Number(this.fourSubDivApprovalRequired) + "|" +
                    Number(this.fourParcelApprovedWithMap) + "|" +

                    _mapEmptyStringToStringNull(this.fourFrontFeet || "") + "|" +
                    _mapEmptyStringToStringNull(this.fourDepth || "") + "|" +

                    // tt looks like on the PDF they enforce the presence of two decimal places,
                    // and then they strip the decimal when encoding in the barcode
                    //  (ex: 23 becomes 23.00 becomes 2300)
                    (Number(this.fourAcres) * 100) + "|" +

                    _mapEmptyStringToStringNull(this.sellerNameLastNameCompany || "") + "|" +
                    _mapEmptyStringToStringNull(this.sellerNameFirstName || "") + "|" +
                    _mapEmptyStringToStringNull(this.sellerNameLastNameCompanyTwo || "") + "|" +
                    _mapEmptyStringToStringNull(this.sellerNameFirstNameTwo || "") + "|" +

                    _mapEmptyStringToStringNull(this.propertyUseSelect || "") + "|" +
                    // cast Boolean
                    Number(this.ownershipIsCondo) + "|" +
                    Number(this.constructionOnVacant) + "|" +
                    Number(this.locatedWithinAg) + "|" +
                    Number(this.buyerReceivedDisclosureNotice) + "|" +

                    // these vars were created at the beginning of this method
                    // we have to unformat them because the user insisted on particular formatting
                    // on the PDF, but the barcode requires a short-version ISO format
                    _unformatDate(contractDate) + "|" +
                    _unformatDate(transferDate) + "|" +

                    // todo: I think the function invocation below is irrelevant...
                    _mapEmptyStringToStringNull(
                        _salePrice.replace("$", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "")
                    ) + "|" +
                    _mapEmptyStringToStringNull(
                        _salePersonalPropertyVal.replace("$", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "")
                    ) + "|" +
                    Number(this.saleInfoCheckA) + "|" +
                    Number(this.saleInfoCheckB) + "|" +
                    Number(this.saleInfoCheckC) + "|" +
                    Number(this.saleInfoCheckD) + "|" +
                    Number(this.saleInfoCheckE) + "|" +
                    Number(this.saleInfoCheckF) + "|" +
                    Number(this.saleInfoCheckG) + "|" +
                    Number(this.saleInfoCheckH) + "|" +
                    Number(this.saleInfoCheckI) + "|" +
                    Number(this.saleInfoCheckJ) + "|" +
                    _mapEmptyStringToStringNull(this.saleConditionComments || "") + "|" +
                    _mapEmptyStringToStringNull(this.assessmentRollYear || "") + "|" +

                    // todo: I think the function invocation below is irrelevant...
                    _mapEmptyStringToStringNull(
                        _assessmentTotalValue.replace("$", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "")
                    ) + "|" +
                    propertyClassBeforeHyphen + "|" +
                    propertyClassAfterHyphen + "|" +
                    _mapEmptyStringToStringNull(this.assessmentSchoolDistrict || "") + "|" +
                    _mapEmptyStringToStringNull(this.taxMapIdOne || "") + "|" +
                    _mapEmptyStringToStringNull(this.taxMapIdTwo || "") + "|" +
                    _mapEmptyStringToStringNull(this.taxMapIdThree || "") + "|" +
                    _mapEmptyStringToStringNull(this.taxMapIdFour || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoStreetNumber || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoStreetName || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoCityTown || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoState || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoZipCode || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoLastName || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoFirstName || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoAreaCode || "") + "|" +
                    _mapEmptyStringToStringNull(_contactInfoPhoneNumber) + "|" +
                    _mapEmptyStringToStringNull(this.contactAttorneyInfoLastName || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoAttorneyFirstName || "") + "|" +
                    _mapEmptyStringToStringNull(this.contactInfoAttorneyAreaCode || "") + "|" +
                    _mapEmptyStringToStringNull(_contactInfoAttorneyPhoneNum) + "|~r";
                // console.log(stringToEncode)
                return stringToEncode;
            },
            comparefourNumberOfParcelsWithParcelIdCount: function(): number {
                const values: Array<string> = [
                    this.taxMapIdOne || "",
                    this.taxMapIdTwo || "",
                    this.taxMapIdThree || "",
                    this.taxMapIdFour|| ""
                ];
                let count: number = 0;
                values.map((x) => { if(!(x === null || x === undefined || x === "")) {count++;} });
                return count;
            },
            // this is used to create a mutex between option J and all other options
            uncheckSaleConditionsCheckboxes: function(): void {
                (this.saleInfoCheckA as any) = false;
                (this.saleInfoCheckB as any) = false;
                (this.saleInfoCheckC as any) = false;
                (this.saleInfoCheckD as any) = false;
                (this.saleInfoCheckE as any) = false;
                (this.saleInfoCheckF as any) = false;
                (this.saleInfoCheckG as any) = false;
                (this.saleInfoCheckH as any) = false;
                (this.saleInfoCheckI as any) = false;
            },
            ensureThatAtLeastOneSaleConditionIsSelected: function(): Boolean {
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
                ) {
                    alert("You must select at least one condition for section 15");
                    return false;
                }
                return true;
            },
            ensureThatSaleDatePrecedesTransferDate(): Boolean {
                if((new Date(this.saleContractDate)) > (new Date(this.saleTransferDate as any))) {
                    alert("Transfer-Date (12) cannot occur before Contract-Date (11)");
                    return false;
                }
                return true;
            },
            validateBeforeSubmit: function(): void {
                // makes use of vee-validator.js
                // this.$validator.validateAll().then((result: any) => {
                    // if(result && this.ensureThatAtLeastOneSaleConditionIsSelected()
                    if(this.ensureThatAtLeastOneSaleConditionIsSelected()
                       && this.ensureThatSaleDatePrecedesTransferDate()) {
                        // note that a listener in index.form.js will remove the class below before file-dialog opens
                        let spinner: any = document.getElementById("spinner");
                        spinner.className = "spinner";
                        alert(
                            "Before printing, please set paper size in printer settings to " +
                            "legal paper(8.5\" x 14\") for the filing document."
                        );
                        // the click-listener on the download button fires before this
                        // and builds part of the payload
                        let form: any = document.getElementById("form");
                        if(form) {form.submit();}
                        return;
                    }
                    // if you find yourself here trying to debug a vee-validator, consider removing the "required"
                // });
            }
        }
    });
});