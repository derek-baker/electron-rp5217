document.addEventListener("DOMContentLoaded", function(){
    'use strict';

    let version = window.location.hash.substring(1);

    Vue.component('version-display', { 
        template: `
        <p>App Version: v${version}</p>
        `
    });
    
    new Vue({
        el: '#versionDisplay'
    });
});