document.addEventListener("DOMContentLoaded", function(){
    'use strict';

    Vue.component('progress-spinner', { 
        template: `
        <div id="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <p>test</p>
        `
    });
    
    new Vue({
        el: '#spinnerContainer'
    });
});