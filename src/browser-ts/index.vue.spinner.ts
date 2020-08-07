import Vue from "vue";

document.addEventListener("DOMContentLoaded", function(): any {
    Vue.component("progress-spinner", {
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

    const spinner: any = new Vue({
        el: "#spinnerContainer"
    });
});