'use strict';

const { ipcRenderer } = require('electron');
const { customChannels } = require('../../config');

const spinnerId = 'spinner';

/**
 * @return {HTMLElement}
 */
const getSpinner = () => {
    const spinner = document.getElementById(spinnerId);
    if (!spinner) {
        throw new Error('Element with ID spinner not found');
    }
    return spinner;
};

const startSpinner = () => {
    const spinner = getSpinner();
    spinner.className = 'spinner';
};


ipcRenderer.on(customChannels.saveComplete, () => {
    const spinner = getSpinner();
    spinner.className = '';
});


module.exports = { startSpinner };
