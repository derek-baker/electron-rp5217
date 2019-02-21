"use strict";

const { shell } = require('electron');

const configureInstructions = function() {
    const instructions = [
        { 
            id: "saveInstructions", 
            href: "https://github.com/systems-development-group/RP5217/wiki/Saving-A-Partially-Filled-RP5217-To-Your-Computer-For-Later-Editing" 
        },
        { 
            id: "fillingInstructions", 
            href: "https://www.tax.ny.gov/pdf/current_forms/orpts/rp5217pdfins.pdf"
        },
        { 
            id: "pdfInstructions", 
            href: "https://github.com/systems-development-group/RP5217/wiki/Producing-an-RP5217-PDF-from-the-RP5217-Editor" 
        },
        { 
            id: "printInstructions", 
            href: "https://github.com/systems-development-group/RP5217/wiki/Printing-the-RP5217-Form" 
        }
    ];    
    
    instructions.forEach( function(pair) {        
        document.getElementById(pair.id).addEventListener('click', function(clickEvent) {            
            clickEvent.preventDefault();
            shell.openExternal(pair.href);
        });         
    });           
}
module.exports = { configureInstructions }
