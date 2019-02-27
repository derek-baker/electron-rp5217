// import viewModel from '../dist/build.js';

window.addEventListener("load", function() {
    'use strict';
    const blockWidthInPixels = 1;
    const blockHeightInPixels = 1;

    function _initBarcodePrereqs(mergedData){
        let textToEncode = mergedData;  
        PDF417.init(textToEncode);          
        let barcode = PDF417.getBarcodeArray();
        return barcode;
    }

    function _paintBarcode(barcode, canvas) {
        let ctx = canvas.getContext('2d');                    
        // graph barcode elements
        let y = 0;
        for (let row = 0; row < barcode['num_rows']; ++row) {
            let x = 0;
            for (let column = 0; column < barcode['num_cols']; ++column) {
                if (barcode['bcode'][row][column] == 1) {                        
                    ctx.fillRect(x, y, blockWidthInPixels, blockHeightInPixels);
                }
                x += blockWidthInPixels;
            }
            y += blockHeightInPixels;
        }
    }

    function _generate() {
        let barcode = _initBarcodePrereqs( viewModel.mergeData() );
        // create canvas element based on number of columns and rows in barcode
        let canvasBarcodeContainer = document.getElementById('barcode');
        if(document.getElementById('barcode').firstChild !== null) {
            canvasBarcodeContainer.removeChild(canvasBarcodeContainer.firstChild);
        }
        let canvas = document.createElement('canvas');
        canvas.width = blockWidthInPixels * barcode['num_cols'];
        canvas.height = blockHeightInPixels * barcode['num_rows'];
        canvasBarcodeContainer.appendChild(canvas);
        _paintBarcode(barcode, canvas);
        return canvas;
    }  
    
    _generate();

    const _createHiddenDataUrl = () => {
        let canvas = _generate();
        let barcodeImg = document.getElementById('barcodeImg');
        if(document.getElementById('hiddenImage') !== null) {
            let element = document.getElementById('hiddenImage');
            element.outerHTML = '';            
        }
        let img = document.createElement('img');
        img.setAttribute('id', 'hiddenImage');
        img.setAttribute('src', canvas.toDataURL());
        barcodeImg.appendChild(img);       
    };

    let form = document.getElementById('form');
    
    let isFirstKeyup = true;
    form.addEventListener('keyup', function() {
        _createHiddenDataUrl();
        if (isFirstKeyup) {
            isFirstKeyup = false;
            return;
        }  
        document.title = 
                `${document.title.replace(' (YOUR WORK IS UNSAVED)', '')} (YOUR WORK IS UNSAVED)`;       
                // string added above removed from title in renderer.js
    });
    // Hack to trigger barcode to display 
    form.dispatchEvent(new KeyboardEvent('keyup')); 

    form.addEventListener('click', function() {
        // Added setTimeout() to ensure the viewModel modification resulting from the click was complete. 
        // Couldn't get blur() to work.
        setTimeout(function() {
            _createHiddenDataUrl();            
        }, 200);
        // TODO: find better way to avoid this race condition
    });
    //form.dispatchEvent(new MouseEvent('click')); 
});

