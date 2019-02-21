'use strict';

document.addEventListener("DOMContentLoaded", function(){

    Vue.component('navbar-buttonbottom', { 
        props: ['text', 'identifier', 'target', 'buttonclasses', 'glyphclasses'],
        template: `<div class="btn-group" role="group">
                        <button style="border-radius:0;" v-bind:id='identifier' class="btn btn-md" 
                            v-bind:class='buttonclasses' data-toggle="modal" data-target="" 
                            v-bind:data-target='target' type="button">
                            {{ text }} 
                            <span class="glyphicon glyphicon" v-bind:class='glyphclasses'></span>
                        </button>
                    </div>
                    `
    });

    new Vue({ 
        el: '#navbarBottom'
    });
});