'use strict';

const { ipcRenderer, shell } = require('electron');
const { sdgBrochureSiteUrl, customChannels } = require('../../config');

// TODO: remove use of global viewModel.$data from this file

const createButtonListeners = function() {
    const brandButton = document.getElementById('brandFauxButton');
    brandButton.addEventListener('click', (clickEvent) => {
        clickEvent.preventDefault();
        shell.openExternal(sdgBrochureSiteUrl);
    });


    // Specify behavior for 'Open File' buttons
    const openFileButton = document.getElementById('importDataButton');
    openFileButton.addEventListener('click', (event) => {
        ipcRenderer.send(customChannels.openFile);
    });
    const openFileBottomButton =
        document.getElementById('importDataButtonBottom');
    openFileBottomButton.addEventListener('click', (event) => {
        ipcRenderer.send(customChannels.openFile);
    });

    // Specify behavior for 'Save' buttons
    const saveBtn = document.getElementById('saveFileButton');
    saveBtn.addEventListener('click', (event) => {
        ipcRenderer.send(customChannels.save, JSON.stringify(viewModel.$data) );
    });
    const saveBtnBottom = document.getElementById('saveFileButtonBottom');
    saveBtnBottom.addEventListener('click', (event) => {
        ipcRenderer.send(customChannels.save, JSON.stringify(viewModel.$data) );
    });

    // Specify behavior for 'Save As' buttons
    const saveAsBtn = document.getElementById('saveAsFileButton');
    saveAsBtn.addEventListener('click', (event) => {
        ipcRenderer.send(customChannels.saveDialog, JSON.stringify(viewModel.$data) );
    });
    const saveAsBtnBottom = document.getElementById('saveAsFileButtonBottom');
    saveAsBtnBottom.addEventListener('click', (event) => {
        ipcRenderer.send(customChannels.saveDialog, JSON.stringify(viewModel.$data) );
    });

    // Hidden button used only as a hook for testing
    const printToPdfButton = document.getElementById('printToPdfButton');
    printToPdfButton.addEventListener('click', (event) => {
        ipcRenderer.send(customChannels.triggerPrint);
    });
};

module.exports = { createButtonListeners };

