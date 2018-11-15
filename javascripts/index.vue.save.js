let formNames = null;
document.addEventListener("DOMContentLoaded", function(){
    'use strict';
    
    formNames = new Vue({
        el: '#persistenceModals',
        data: {
            localStorageKeys : [],
            newFormName : ' ' 
        },
        methods: {
            setKeyArray : function() {                
                while(this.localStorageKeys.length > 0) { this.localStorageKeys.pop(); }
                this.localStorageKeys.push.apply(this.localStorageKeys, Object.keys(localStorage));
            },
            persistData : function(localStorageKey){
                let modelData = viewModel.$data;   
                let formName = (localStorageKey === undefined) ? this.newFormName : localStorageKey;
                localStorage.setItem( formName, JSON.stringify(modelData) );                
                document.title = 'RP5217 - ' + formName;
                this.newFormName = ' ';
            },
            deleteData : function(localStorageKey){
                localStorage.removeItem(localStorageKey);
                this.localStorageKeys = this.localStorageKeys.filter(key => key !== localStorageKey);                
            },
            loadData : function(localStorageKey){
                let data = JSON.parse(localStorage.getItem(localStorageKey));
                document.title = 'RP5217 - ' + localStorageKey;
                viewModel.InitModelWithValsFromMongo(          
                    data.swisCode,
                    data.propertyLocationStreetNumber,
                    data.propertyLocationStreetName,
                    data.propertyLocationCityTown,
                    data.propertyLocationVillage,
                    data.propertyLocationZipcode,
                    data.buyerLastNameCompanyOne,
                    data.buyerFirstNameOne,
                    data.buyerLastNameCompanyTwo,
                    data.buyerFirstNameTwo,
                    data.taxAddressBuyerLastNameCompany,
                    data.taxAddressBuyerFirstName,
                    data.taxAddressStreetNumberAndName,
                    data.taxAddressCityTown,
                    data.taxAddressState,
                    data.taxAddressZipCode,
                    data.fourNumberOfParcels,
                    data.fourPartOfParcelCheckbox,
                    data.fourFrontFeet,
                    data.fourDepth,
                    data.fourAcres,
                    data.fourSubDivAuthExists,
                    data.fourSubDivApprovalRequired,
                    data.fourParcelApprovedWithMap,
                    data.sellerNameLastNameCompany,
                    data.sellerNameFirstName,
                    data.sellerNameLastNameCompanyTwo,
                    data.sellerNameFirstNameTwo,
                    data.propertyUseSelect,
                    data.ownershipIsCondo,
                    data.constructionOnVacant,
                    data.locatedWithinAg,
                    data.buyerReceivedDisclosureNotice,
                    data.saleContractDate,
                    data.saleTransferDate,
                    data.salePrice,
                    data.salePersonalPropertyVal,
                    data.saleConditionComments,
                    data.saleInfoCheckA,
                    data.saleInfoCheckB,
                    data.saleInfoCheckC,
                    data.saleInfoCheckD,
                    data.saleInfoCheckE,
                    data.saleInfoCheckF,
                    data.saleInfoCheckG,
                    data.saleInfoCheckH,
                    data.saleInfoCheckI,
                    data.saleInfoCheckJ,
                    data.assessmentRollYear,
                    data.assessmentPropClassFirstInput,
                    data.assessmentTotalValue,
                    data.assessmentSchoolDistrict,
                    data.taxMapIdOne,
                    data.taxMapIdTwo,
                    data.taxMapIdThree,
                    data.taxMapIdFour,
                    data.contactInfoLastName,
                    data.contactInfoFirstName,
                    data.contactInfoAreaCode,
                    data.contactInfoPhoneNumber,
                    data.contactInfoStreetNumber,
                    data.contactInfoStreetName,
                    data.contactInfoCityTown,
                    data.contactInfoState,
                    data.contactInfoZipCode,
                    data.contactAttorneyInfoLastName,
                    data.contactInfoAttorneyFirstName,
                    data.contactInfoAttorneyAreaCode,
                    data.contactInfoAttorneyPhoneNum
                );
            }
        }        
    });
});