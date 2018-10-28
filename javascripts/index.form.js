window.addEventListener("load", function(){
    'use strict';              

    // const devHosts = ['localhost', '127.0.0.1', '35.196.192.252'];
    // if(devHosts.indexOf(location.hostname) !== -1){
    if(true){
        Utils.InitDevValues();
    }

    // Uncheck 4A-C if Parent checkbox is unchecked
    const fourPartOfParcelCheckbox = document.getElementById('fourPartOfParcelCheckbox');
    fourPartOfParcelCheckbox.addEventListener('click', () => {        
        if(viewModel.fourPartOfParcelCheckbox === true){
            viewModel.fourSubDivAuthExists = false;
            viewModel.fourSubDivApprovalRequired = false;
            viewModel.fourParcelApprovedWithMap = false;
            viewModel.fourPartOfParcelCheckbox = false;
        }    
    });
    
    var partialConditionCheckboxCollection = document.getElementsByClassName('partialConditionCheckboxes');
    for(let i = 0; i < partialConditionCheckboxCollection.length; i++){
        // Validation 
        partialConditionCheckboxCollection[i].addEventListener('click', () => {
            if(viewModel.fourPartOfParcelCheckbox === false){
                // Wait without blocking to avoid race condition
                setTimeout(() => {
                    viewModel.fourSubDivAuthExists = false;
                    viewModel.fourSubDivApprovalRequired = false;
                    viewModel.fourParcelApprovedWithMap = false;        
                }, 400);
                alert('Please check "Part of parcel" checkbox before checking this box.');                 
            }
        });
    };

    // Mutex Validation for 15A-I and 15J
    let noneConditionCheckbox = document.getElementById('saleInfoCheckJ');
    noneConditionCheckbox.addEventListener('click', function(){
        viewModel.uncheckSaleConditionsCheckboxes();
        viewModel.saleInfoCheckJ = true;
    });
    let conditionCheckboxCollection = document.getElementsByClassName('saleCondition');
    for(let i = 0; i < conditionCheckboxCollection.length; i++){
        conditionCheckboxCollection[i].addEventListener('click', function(){
            viewModel.saleInfoCheckJ = false;
            viewModel[element.id] = true; 
        });
    }    

    let hiddenInput = document.getElementById('markupInput');
    let downloadButton = document.getElementById('postButton');
    let markup = null;
    downloadButton.addEventListener('click', function (event) {
        // We clean out the hidden input to avoid unwanted data-growth
        hiddenInput.setAttribute('value', null);
        markup = document.documentElement.outerHTML;
        markup = markup.replace(
            'window.nodeRequire = require; delete window.require; delete window.exports; delete window.module;'
            ,''
        );
        // console.log(markup);
        hiddenInput.setAttribute('value', JSON.stringify(markup));
    });
    
    let saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function (event) {
        let vueData = viewModel.$data;       
        localStorage.setItem('recentForm', JSON.stringify(vueData));
        window.location.href = window.location.origin + '/saveForm'    
    });

    // Event fires before file-download dialog opens(to hide spinner)
    // Spinner is triggered by Vue instance's validateBeforeSubmit method
    window.addEventListener('beforeunload', function() {
        setTimeout(() => {
            document.getElementById('spinner').className = '';                        
        }, 1000);
    });
});

