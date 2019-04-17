// NOTE: At one point, there was another remote endpoint being called here, and 
//       the plan was to have configs for local dev, staging, and prod.
//       Upon revisiting this looks confusing.

"use strict";

const { ipcRenderer, shell } = require('electron');
const { envConfigs } = require('../../config');

const envConfig = function() {
    // Set environment-specific values (Prod is default) 
    let env = 'prod';
    const contactButtonListenerCallback = function(clickEvent){
        clickEvent.preventDefault();
        shell.openExternal(envConfigs[env].contactUrl);
    };
    let supportLink = document.getElementById('supportLink');
    supportLink.addEventListener('click', contactButtonListenerCallback);
    // If we're running in Dev or Test, we'll adjust URLs of services we depend on accordingly.
    // Event below sent after parent DomContentLoaded listener communicates over 'loaded' channel with main process.
    ipcRenderer.on('runningInDevOrTestChannel', function(event, runtimeEnv) {        
        env = runtimeEnv;              

        // Remove the old listener to avoid having two conflicting callbacks.
        supportLink.removeEventListener('click', contactButtonListenerCallback);
        supportLink.addEventListener('click', contactButtonListenerCallback);
    });
};

module.exports = { envConfig };