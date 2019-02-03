document.addEventListener("DOMContentLoaded", function(){
    'use strict';

    Vue.component('version-display', { 
        template: `
        <p>App Version: 1.0.7</p>
        `
    });
    
    new Vue({
        el: '#versionDisplay'
    });
});