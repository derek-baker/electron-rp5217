"use strict";

const assert = require('assert');
const fs = require('fs');
const { readFile, saveFile } = require('../main.modules/main.filesystem');
const path = require('path');
const util = require('util');
// const saveFilePromisified = util.promisify(saveFile);
// fs.readFilePromisified = util.promisify(fs.readFile);

describe('Intra-App Filesystem Integration Tests', function () {
    this.timeout(10000)

    beforeEach(function () {        
    });

    afterEach(function () {        
    });    

    it('Can save a file', function() {
        // Arrange
        const mockData = {
            swisCode:"123456",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        const filePath = path.resolve(__dirname, 'writtenFileForWriteTest.sdg');

        let actual;
        const expected = JSON.stringify(mockData);
        
        return saveFile(undefined, filePath, JSON.stringify(mockData), undefined)
            .then( () => { 
                actual = fs.readFileSync(filePath, {encoding: "utf-8"}); 
                // Assert
                assert.strictEqual(actual, 'fail') 
            })
            .catch( (err) => { console.log(err) });                
    });


    it('Can read a file', function() {
        // Arrange
        const mockData = {
            swisCode:"123456",propertyLocationStreetNumber:"1773",propertyLocationStreetName:"1222",propertyLocationCityTown:"122ddd",propertyLocationVillage:"1133ss",propertyLocationZipcode:"1",buyerLastNameCompanyOne:"145",buyerFirstNameOne:"1",buyerLastNameCompanyTwo:"1sssss",buyerFirstNameTwo:"1",taxAddressBuyerLastNameCompany:"1",taxAddressBuyerFirstName:"11",taxAddressStreetNumberAndName:"122",taxAddressCityTown:"",taxAddressState:"11",taxAddressZipCode:"",fourNumberOfParcels:"4",fourPartOfParcelCheckbox:false,fourFrontFeet:"1",fourDepth:"1",fourAcres:"1",fourSubDivAuthExists:false,fourSubDivApprovalRequired:false,fourParcelApprovedWithMap:false,sellerNameLastNameCompany:"1",sellerNameFirstName:"1",sellerNameLastNameCompanyTwo:"1",sellerNameFirstNameTwo:"1",propertyUseSelect:"3",ownershipIsCondo:null,constructionOnVacant:null,locatedWithinAg:null,buyerReceivedDisclosureNotice:null,saleContractDate:"0001-01-01",saleTransferDate:"0001-01-01",salePrice:"12,222,222",salePersonalPropertyVal:"222,222",saleConditionComments:"1",saleInfoCheckA:false,saleInfoCheckB:false,saleInfoCheckC:false,saleInfoCheckD:false,saleInfoCheckE:false,saleInfoCheckF:false,saleInfoCheckG:false,saleInfoCheckH:false,saleInfoCheckI:false,saleInfoCheckJ:true,assessmentRollYear:"12",assessmentPropClassFirstInput:"100",assessmentTotalValue:"33,333,333",assessmentSchoolDistrict:"1",taxMapIdOne:"1",taxMapIdTwo:"1",taxMapIdThree:"1",taxMapIdFour:"1",contactInfoLastName:"1",contactInfoFirstName:"1",contactInfoAreaCode:"133",contactInfoPhoneNumber:"133-3333",contactInfoStreetNumber:"1",contactInfoStreetName:"1",contactInfoCityTown:"1",contactInfoState:"1",contactInfoZipCode:"1",contactAttorneyInfoLastName:"1",contactInfoAttorneyFirstName:"1",contactInfoAttorneyAreaCode:"133",contactInfoAttorneyPhoneNum:"133-3333",validationCounterForNumberOfParcels:false
        };
        const filePath = path.resolve(__dirname, 'writtenFileForReadTest.sdg');

        let actual;
        const expected = JSON.stringify(mockData);

        fs.writeFileSync(filePath, JSON.stringify(mockData), {encoding:"utf-8"});
        // Act
        let res = {};
        readFile( filePath, res )
            .then( () => {
                actual = res.dataFromFile;
                // Assert
                assert.strictEqual(actual, expected);
            })
            .catch( (err) => { console.log(err); });
    });

    return;
});