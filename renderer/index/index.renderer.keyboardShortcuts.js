"use strict";

const { ipcRenderer } = require('electron');
const { startSpinner } = require('./index.renderer.spinner');

// "Promisify" setTimeout()
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 

const getViewModelData = function() {
    return JSON.stringify(viewModel.$data);
};

const addKeyupListener = function() {
    document.addEventListener("keydown", function(keyboardEvent) {    
        if (keyboardEvent.ctrlKey && (keyboardEvent.key === 's' || keyboardEvent.key === 'S')) {
            startSpinner();
            // Hack to avoid race condition with other listeners
            wait(500)
                .then( () => { 
                    ipcRenderer.send('save', getViewModelData() );
                })
                .catch((reason) => console.log(reason) );
        }

        if (keyboardEvent.ctrlKey && (keyboardEvent.key === 's' || keyboardEvent.key === 'S')) {
            startSpinner();
            // Hack to avoid race condition with other listeners
            wait(500)
                .then( () => { 
                    ipcRenderer.send('save', getViewModelData() );
                })
                .catch((reason) => console.log(reason) );
        }
    });
};

ipcRenderer.on('saveComplete', function() {

});

module.exports = { addKeyupListener };
                                     