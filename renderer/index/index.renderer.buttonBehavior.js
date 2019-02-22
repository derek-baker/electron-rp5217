"use strict";

const { ipcRenderer } = require('electron');

// TODO: remove use of global viewModel.$data from this file

const createButtonListeners = function() {
    // Specify behavior for 'Open File' buttons
    const openFileButton = document.getElementById('importDataButton')
    openFileButton.addEventListener("click", (event) => {
        ipcRenderer.send('openFile', () => { return; }); 
    });
    const openFileBottomButton = document.getElementById('importDataButtonBottom')
    openFileBottomButton.addEventListener("click", (event) => {
        ipcRenderer.send('openFile', () => { return; }); 
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
};

module.exports = { createButtonListeners };

