'use strict';

const { shell } = require('electron');

const configureInstructions = function() {
    const instructions = [
        {
            id: 'fillingInstructions',
            href: 'https://www.tax.ny.gov/pdf/current_forms/orpts/rp5217pdfins.pdf'
        }
    ];

    instructions.forEach(
        (pair) => {
            const link = document.getElementById(pair.id);
            if (!link) { throw new Error('link is falsy'); }
            link.addEventListener('click', function(clickEvent) {
                clickEvent.preventDefault();
                shell.openExternal(pair.href);
            });
        }
    );
};
module.exports = { configureInstructions };
