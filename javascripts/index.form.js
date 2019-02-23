window.addEventListener("load", function(){
    'use strict';    

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
            viewModel[conditionCheckboxCollection[i].id] = true; 
        });
    }    

    const cleanMarkup = function(webMarkup){
        return webMarkup.replace(
            "window.nodeRequire = require; delete window.require; delete window.exports; delete window.module; nodeRequire('./renderer/index/index.renderer.main.js');"
            ,''
        );
    };


    let hiddenInput = document.getElementById('markupInput');
    let markup = undefined;
    const postButtonActionOverride = function(){
        // We clean out the hidden input to avoid unwanted data-growth
        hiddenInput.setAttribute('value', '');
        markup = document.documentElement.outerHTML;
        markup = cleanMarkup(markup);
        hiddenInput.setAttribute('value', JSON.stringify(markup));
        let submitBtn = document.getElementById('submitBtn');
        console.log(`POSTing form data to : ${document.getElementById('form').action}`)
        submitBtn.click();
    };
    // Specify behavior for 'Create PDF' buttons
    let downloadButton = document.getElementById('postButton');    
    downloadButton.addEventListener('click', function (event) {
        postButtonActionOverride();        
    });
    let downloadButtonBottom = document.getElementById('postButtonBottom');    
    downloadButtonBottom.addEventListener('click', function (event) {
        postButtonActionOverride();        
    });
    

    // Event fires before file-download dialog opens(to hide spinner)
    // Spinner is triggered by Vue instance's validateBeforeSubmit method
    window.addEventListener('beforeunload', function() {
        setTimeout(() => {
            document.getElementById('spinner').className = '';    
            // alert('Please be patient. A file dialog will open shortly.')                                
        }, 1000);
    });

    // init Bootstrap tooltip(s) (has to be done manually)
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
});

