"use strict";

const Application = require('spectron').Application;
const assert = require('assert');
const electronPath = require('electron'); 
const path = require('path');
const fs = require('fs');
const { testPdfFilePath } = require('../config');
const PDFParser = require("pdf2json");

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


describe('Spectron Intra-App IPC Integration Tests', function () {
    this.timeout(100000)

    beforeEach(function () {
        this.app = new Application({            
            path: electronPath,
            // args tells spectron to look and use the main.js file and the package.json located 1 level above.
            args: [path.join(__dirname, '..')],
            env: {
                NODE_ENV: "test"
            },
            requireName: "nodeRequire"
        });
        return this.app.start()
    });

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
    });

    
    // it('creates PDF as Expected', function() {
    //     // Arrange
    //     let actual;
    //     const expected = true;
        
    //     // Act
    //     this.app.client.waitUntilWindowLoaded().execute('document.getElementById("printToPdfButton").click()')

    //     return wait(2000)                
    //         .then( (response) => { 
    //             actual = fs.existsSync(testPdfFilePath);
    //             // Tear Down
    //             if (fs.existsSync(testPdfFilePath)) { fs.unlinkSync(testPdfFilePath) };
    //             // Assert
    //             assert.strictEqual(actual, expected); 
    //          });
    // });


    it('creates a blank PDF with correct layout', function() {
        // Arrange
        let actual;
        const expected = fs.readFileSync( 
            ( path.join(__dirname, 'Assets', 'blankPdfAsTextForTest.Expected.json') ), 
            {encoding: 'utf-8'} 
        );

        const outputTextFile = path.join(__dirname, "pdfTextForTest.json");  
        let pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData) => { 
            console.error(errData.parserError) 
        });
        pdfParser.on("pdfParser_dataReady", async (pdfData) => {
            try{
                fs.writeFileSync(outputTextFile, JSON.stringify(pdfData), {encoding: 'utf-8'});
                actual = fs.readFileSync(outputTextFile, {encoding: 'utf-8'});
                // Tear Down
                if (fs.existsSync(testPdfFilePath)) { fs.unlinkSync(testPdfFilePath) };
                if (fs.existsSync(outputTextFile)) { fs.unlinkSync(outputTextFile) };
                // Assert
                assert.strictEqual(actual, expected); 
            }
            catch (err) {
                console.error(err);
            }
        });
        
        // Act
        this.app.client.waitUntilWindowLoaded().execute('document.getElementById("printToPdfButton").click()');
        return wait(2000) // <== We think the pdf should have been written in 2 seconds
            .then( async (response) => { 
                await pdfParser.loadPDF(testPdfFilePath);  
                // See pdfParser listeners for Assert
             })
             .catch( (err) => console.log(err));
    });

    return;
});