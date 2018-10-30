let formNames = null;
document.addEventListener("DOMContentLoaded", function(){
    'use strict';
    
    formNames = new Vue({
        el: '#persistenceModals',
        data: {
            localStorageKeys : []
        },
        methods: {
            setKeyArray : function() {                
                while(this.localStorageKeys.length > 0) { this.localStorageKeys.pop(); }
                this.localStorageKeys.push.apply(this.localStorageKeys, Object.keys(localStorage));
                // this.localStorageKeys = Object.keys(localStorage);
                console.log(this.localStorageKeys);
            }
        }        
    });
});