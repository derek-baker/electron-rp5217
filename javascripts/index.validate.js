// NOTE: there's also some validation in index.form.js
window.addEventListener("load", function() {
    'use strict';

    VeeValidate.Validator.extend('ifParcelIdCountIsGreaterThanFour', {
        getMessage: () => { 
            viewModel.validationCounterForNumberOfParcels++;
            alert('Please attach an additional sheet with additional identifiers (Item 20)'); 
        },
        validate: () => 
            Number(viewModel.fourNumberOfParcels) < 5 || viewModel.validationCounterForNumberOfParcels !== 0   
    });
});

