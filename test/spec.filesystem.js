"use strict";

const Application = require('spectron').Application;
const assert = require('assert');
const electronPath = require('electron'); 
const path = require('path');
const fs = require('fs');


describe('Spectron Intra-App Filesystem Integration Tests', function () {
    this.timeout(100000)

    beforeEach(function () {
        this.app = new Application({            
            path: electronPath,
            // args tells spectron to look and use the main.js file and the package.json located 1 level above.
            args: [path.join(__dirname, '..')],
            env: {
                NODE_ENV: "test"
            },
            requireName: "nodeRequire"
        });
        return this.app.start()
    });

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
    });    


    it('Can save a file', function() {
        const mockData = {
            "swisCode":"123456","propertyLocationStreetNumber":"1773","propertyLocationStreetName":"1222","propertyLocationCityTown":"122ddd","propertyLocationVillage":"1133ss","propertyLocationZipcode":"1","buyerLastNameCompanyOne":"145","buyerFirstNameOne":"1","buyerLastNameCompanyTwo":"1sssss","buyerFirstNameTwo":"1","taxAddressBuyerLastNameCompany":"1","taxAddressBuyerFirstName":"11","taxAddressStreetNumberAndName":"122","taxAddressCityTown":"","taxAddressState":"11","taxAddressZipCode":"","fourNumberOfParcels":"4","fourPartOfParcelCheckbox":false,"fourFrontFeet":"1","fourDepth":"1","fourAcres":"1","fourSubDivAuthExists":false,"fourSubDivApprovalRequired":false,"fourParcelApprovedWithMap":false,"sellerNameLastNameCompany":"1","sellerNameFirstName":"1","sellerNameLastNameCompanyTwo":"1","sellerNameFirstNameTwo":"1","propertyUseSelect":"3","ownershipIsCondo":null,"constructionOnVacant":null,"locatedWithinAg":null,"buyerReceivedDisclosureNotice":null,"saleContractDate":"0001-01-01","saleTransferDate":"0001-01-01","salePrice":"12,222,222","salePersonalPropertyVal":"222,222","saleConditionComments":"1","saleInfoCheckA":false,"saleInfoCheckB":false,"saleInfoCheckC":false,"saleInfoCheckD":false,"saleInfoCheckE":false,"saleInfoCheckF":false,"saleInfoCheckG":false,"saleInfoCheckH":false,"saleInfoCheckI":false,"saleInfoCheckJ":true,"assessmentRollYear":"12","assessmentPropClassFirstInput":"100","assessmentTotalValue":"33,333,333","assessmentSchoolDistrict":"1","taxMapIdOne":"1","taxMapIdTwo":"1","taxMapIdThree":"1","taxMapIdFour":"1","contactInfoLastName":"1","contactInfoFirstName":"1","contactInfoAreaCode":"133","contactInfoPhoneNumber":"133-3333","contactInfoStreetNumber":"1","contactInfoStreetName":"1","contactInfoCityTown":"1","contactInfoState":"1","contactInfoZipCode":"1","contactAttorneyInfoLastName":"1","contactInfoAttorneyFirstName":"1","contactInfoAttorneyAreaCode":"133","contactInfoAttorneyPhoneNum":"133-3333","validationCounterForNumberOfParcels":false
        };
        const filePath = 'writtenFile.sdg';

        let actual = { value:undefined };
        const expected = mockData;

        const readFileCallback = (error, datas, actualVal) => {
            if (error) {
                console.log(`An error ocurred reading the file ${filepath}\n` + err.message);
                return;
            }
            actualVal.value = JSON.parse(datas);
        };
        
        console.log(this.app.mainProcess)
        // this.app.electron.remote.ipcMain.on('openFile', eventCallback(result));
        return this.app.electron.remote.app.saveFile(undefined, filePath, JSON.stringify(mockData))
                   .then( (response) => { 
                        fs.readFile(filepath, 'utf-8', readFileCallback(e, d, actual));
                        assert.strictEqual(actual.value, expected); 
                    });        
    });

    return;
});