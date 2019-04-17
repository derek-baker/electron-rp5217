"use strict";

const { ipcRenderer, shell } = require('electron');
const { sdgBrochureSiteUrl } = require('../../config');

// TODO: remove use of global viewModel.$data from this file

const createButtonListeners = function() {
    
    let brandLink = document.getElementById('supportLink');
    brandLink.addEventListener('click', () => {
        clickEvent.preventDefault();
        shell.openExternal(sdgBrochureSiteUrl);
    });



    // Specify behavior for 'Open File' buttons
    const openFileButton = document.getElementById('importDataButton')
    openFileButton.addEventListener("click", (event) => {
        ipcRenderer.send('openFile'); 
    });
    const openFileBottomButton = document.getElementById('importDataButtonBottom')
    openFileBottomButton.addEventListener("click", (event) => {
        ipcRenderer.send('openFile'); 
    });

    // Specify behavior for 'Save' buttons
    const saveBtn = document.getElementById('saveFileButton');
    saveBtn.addEventListener('click', (event) => {
        ipcRenderer.send('save', JSON.stringify(viewModel.$data) );
    });
    const saveBtnBottom = document.getElementById('saveFileButtonBottom');
    saveBtnBottom.addEventListener('click', (event) => {
        ipcRenderer.send('save', JSON.stringify(viewModel.$data) );
    });

    // Specify behavior for 'Save As' buttons
    const saveAsBtn = document.getElementById('saveAsFileButton');
    saveAsBtn.addEventListener('click', (event) => {
        ipcRenderer.send('save-dialog', JSON.stringify(viewModel.$data) );
    });
    const saveAsBtnBottom = document.getElementById('saveAsFileButtonBottom');
    saveAsBtnBottom.addEventListener('click', (event) => {
        ipcRenderer.send('save-dialog', JSON.stringify(viewModel.$data) );
    });

    // Hidden button used only as a hook for testing
    const printToPdfButton = document.getElementById('printToPdfButton');
    printToPdfButton.addEventListener('click', (event) => {
        ipcRenderer.send('triggerPrintChannel');
    });
};

module.exports = { createButtonListeners };

