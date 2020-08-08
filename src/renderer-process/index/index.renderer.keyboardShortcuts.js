'use strict';

const { ipcRenderer } = require('electron');
const { startSpinner } = require('./index.renderer.spinner');
const { customChannels } = require('../../config');

/**
 * Promisified wrapper of setTimeout()
 * @param {*} ms
 * @return {Promise<any>}
 */
const wait = (ms) => new Promise(
    (resolve) => setTimeout(resolve, ms)
);

const getViewModelData = function() {
    return JSON.stringify(viewModel.$data);
};

const addKeyupListener = function() {
    document.addEventListener('keydown', function(keyboardEvent) {
        if (keyboardEvent.ctrlKey && (keyboardEvent.key === 's' || keyboardEvent.key === 'S')) {
            startSpinner();
            // Hack to avoid race condition with other listeners
            wait(500)
                .then( () => {
                    ipcRenderer.send(customChannels.save, getViewModelData() );
                })
                .catch((reason) => console.log(reason) );
        }
        // TODO: did I mean for this to be the ctrl key on the right?
        if (keyboardEvent.ctrlKey && (keyboardEvent.key === 's' || keyboardEvent.key === 'S')) {
            startSpinner();
            // Hack to avoid race condition with other listeners
            wait(500)
                .then( () => {
                    ipcRenderer.send(customChannels.save, getViewModelData() );
                })
                .catch((reason) => console.log(reason) );
        }


        if (keyboardEvent.ctrlKey && (keyboardEvent.key === 'd' || keyboardEvent.key === 'D')) {
            ipcRenderer.send('toggleDevTools');
        }
    });
};

ipcRenderer.on(customChannels.saveComplete, function() {
    // TODO: ?
});

module.exports = { addKeyupListener };
