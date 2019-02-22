"use strict";

const { ipcRenderer } = require('electron');

const startSpinner = function() {
    document.getElementById('spinner').className = 'spinner';
};


ipcRenderer.on('saveComplete', function() {
    document.getElementById('spinner').className = '';  
});


module.exports = { startSpinner };