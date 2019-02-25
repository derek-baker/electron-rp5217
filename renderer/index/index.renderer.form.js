"use strict";

const { ipcRenderer } = require('electron');

const _postButtonActionOverride = function() { 
    if (       
        document.getElementById('form').reportValidity()
        &&
        viewModel.validateBeforeSubmit()
    ) {
        alert(
            'Before printing, please set paper size in printer settings to ' + 
            'legal paper(8.5" x 14") for the filing document.'
        );
        ipcRenderer.send('triggerPrintChannel');
    }    
};

const addTriggerPrintListener = function() {
    // Specify behavior for 'Create PDF' buttons
    let downloadButton = document.getElementById('postButton');    
    downloadButton.addEventListener('click', function (event) {
        _postButtonActionOverride();        
    });
    let downloadButtonBottom = document.getElementById('postButtonBottom');    
    downloadButtonBottom.addEventListener('click', function (event) {
        _postButtonActionOverride();        
    });
};

module.exports = { addTriggerPrintListener };
