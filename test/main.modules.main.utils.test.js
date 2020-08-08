const assert = require('assert');
const { compareObjectsForEquality } = require('./../src/main-process/utils');

describe('Object-Comparison Unit Tests', function() {
    this.timeout(10000);

    beforeEach(function() {
    });

    afterEach(function() {
    });


    it('returns true when objects are the same', function() {
        // Arrange
        const objA = {
            swisCode:"123456",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        const objB = {
            swisCode:"123456",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        let actual;
        const expected = true;
        // Act
        actual = compareObjectsForEquality(objA, objB);
        // Assert
        assert.strictEqual(actual, expected);
    });


    it('returns false when number of keys not the same in both objects', function() {
        // Arrange
        const objA = {
            swisCode:"123456",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        const objB = {
            propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        let actual;
        const expected = false;
        // Act
        actual = compareObjectsForEquality(objA, objB);
        // Assert
        assert.strictEqual(actual, expected);
    });


    it('returns false when a value is not the same in both object parameters', function() {
        // Arrange
        const objA = {
            swisCode:"123457",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        const objB = {
            swisCode:"123456",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        let actual;
        const expected = false;
        // Act
        actual = compareObjectsForEquality(objA, objB);
        // Assert
        assert.strictEqual(actual, expected);
    });

    it('returns false if objA is undefined', function() {
        // Arrange
        const objA = undefined;
        const objB = {
            swisCode:"123456",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        let actual;
        const expected = false;
        // Act
        actual = compareObjectsForEquality(objA, objB);
        // Assert
        assert.strictEqual(actual, expected);
    });


    it('returns false if objB is undefined', function() {
        // Arrange
        const objB = undefined;
        const objA = {
            swisCode:"123456",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        let actual;
        const expected = false;
        // Act
        actual = compareObjectsForEquality(objA, objB);
        // Assert
        assert.strictEqual(actual, expected);
    });

    return;
});
