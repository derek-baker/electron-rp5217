// NOTE: there's also some validation in index.form.js
window.addEventListener("load", function() {
    'use strict';
    // Vue.use(VeeValidate);    

    // If the validate methods eval to true, the validation passes and the getMessage function doesn't trigger

    // VeeValidate.Validator.extend('compareTransferAndSaleDate', {
    //     getMessage: (field) => { 
    //         alert(
    //             'Transfer-Date (12) cannot occur before Contract-Date (11). If you are using Chrome, and experiencing this error while typing a date, please use the date-picker widget on the right side of that input instead.'
    //         )
    //     },
    //     validate: (value) => (new Date(viewModel.saleContractDate)) <= (new Date(viewModel.saleTransferDate))
    // });    

    VeeValidate.Validator.extend('salePriceGreaterThanPropertyPrice', {
        getMessage: () => { 
            viewModel.salePersonalPropertyVal = 0; 
            alert('Sale-Price (13) should be greater than Personal-Property-Value (14)'); 
        },
        validate: () => true
        // Effectively disabled
        //parseInt(viewModel.salePrice, 10) >= parseInt(viewModel.salePersonalPropertyVal, 10)
    });

    VeeValidate.Validator.extend('parcelIdCountEqualToNumParcelsSpecifiedIfTwo', {
        getMessage: () => { 
            viewModel.taxMapIdTwo = null; 
            alert('Please Ensure That Number of Parcels (4) is equal to the Tax-Map-Id count (20)'); 
        },
        validate: () => 
            true
            // Effectively disabled
            // Number(viewModel.fourNumberOfParcels) === viewModel.comparefourNumberOfParcelsWithParcelIdCount()
            // ||
            // Number(viewModel.fourNumberOfParcels) > 4            
    });

    VeeValidate.Validator.extend('parcelIdCountEqualToNumParcelsSpecifiedIfThree', {
        getMessage: () => { 
            viewModel.taxMapIdThree = null; 
            alert('Please Ensure That Number of Parcels (4) is equal to the Tax-Map-Id count (20)'); 
        },
        validate: () => 
            true
            // Number(viewModel.fourNumberOfParcels) === viewModel.comparefourNumberOfParcelsWithParcelIdCount()
            // ||
            // Number(viewModel.fourNumberOfParcels) > 4
    });

    VeeValidate.Validator.extend('parcelIdCountEqualToNumParcelsSpecifiedIfFour', {
        getMessage: () => { 
            viewModel.taxMapIdFour = null; 
            alert('Please Ensure That Number of Parcels (4) is equal to the Tax-Map-Id count (20)'); 
        },
        validate: () => 
            true
            // Number(viewModel.fourNumberOfParcels) === viewModel.comparefourNumberOfParcelsWithParcelIdCount()
            // ||
            // Number(viewModel.fourNumberOfParcels) > 4
    });

    VeeValidate.Validator.extend('ifParcelIdCountIsGreaterThanFour', {
        getMessage: () => { 
            viewModel.validationCounterForNumberOfParcels++;
            alert('Please attach an additional sheet with additional identifiers (Item 20)'); 
        },
        validate: () => 
            Number(viewModel.fourNumberOfParcels) < 5 || viewModel.validationCounterForNumberOfParcels !== 0   
    });
});

