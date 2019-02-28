"use strict";

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const Application = require('spectron').Application;
const electronPath = require('electron'); 
const PDFParser = require("pdf2json");
const { testPdfFilePath } = require('../config');


const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


describe('Spectron PDF-Related Integration Tests', function () {
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
        return this.app.start();
        // return this.app.client.waitUntilWindowLoaded().execute('document.getElementById("printToPdfButton").click()');
    });

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
    });


    it('can create a blank PDF with correct layout', async function() {
        // Arrange
        let actual;
        const expected = fs.readFileSync( 
            ( path.join(__dirname, 'Assets', 'blankPdfAsTextForTest.Expected.json') ), 
            {encoding: 'utf-8'} 
        );
        const outputTextFileForTest = path.join(__dirname, "pdfTextForBlankTest.json");  

        // We want a textual representation of the PDF that we can Diff
        let pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData) => { 
            console.error(errData.parserError) 
        });
        pdfParser.on("pdfParser_dataReady", (pdfData) => {            
            fs.writeFileSync(outputTextFileForTest, JSON.stringify(pdfData), {encoding: 'utf-8'});
            actual = fs.readFileSync(outputTextFileForTest, {encoding: 'utf-8'});                                              
        }); 

        // Act
        this.app.client.waitUntilWindowLoaded().execute('document.getElementById("printToPdfButton").click()');
        await wait(2000) // <== We think the pdf should have been written in 2 seconds
            .then( (response) => pdfParser.loadPDF(testPdfFilePath) )
            .catch( (err) => console.log(err));       
        await wait(2000) // <== And we wait some more because "Callback Hell"
        // Assert       
        assert.strictEqual(actual, expected);
        
        // Tear Down
        if (fs.existsSync(testPdfFilePath)) { fs.unlinkSync(testPdfFilePath) };
        if (fs.existsSync(outputTextFileForTest)) { fs.unlinkSync(outputTextFileForTest) }; 
    });

    it('can create a filled PDF with correct values', async function() {
        // NOTE: I validated the file ./assets/filledPdfForTest.Expected.pdf against ./assets/NYS_filledPdfForTest.Expected.pdf
        //       by filling them with equivalent data, then manually decoding both of the generated barcodes using
        //       this app: https://online-barcode-reader.inliteresearch.com/  
        //       I then generated the file ./assets/filledPdfAsTextForTest.Expected.json from the validated
        //       ./assets/filledPdfForTest.Expected.pdf
        //       The strategy for this test is to generate a new PDF on the fly using specific inputs(see ./assets/filledPdfForTest.Expected.pdf)
        //       , then to convert that to a textual representation that we can diff against ./assets/filledPdfAsTextForTest.Expected.json  

        // Arrange
        let actual;
        const expected = fs.readFileSync( 
            ( path.join(__dirname, 'Assets', 'filledPdfAsTextForTest.Expected.json') ), 
            {encoding: 'utf-8'} 
        );
        const outputTextFileForTest = path.join(__dirname, "pdfTextForFilledTest.json");  

        let pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData) => { 
            console.error(errData.parserError) 
        });
        pdfParser.on("pdfParser_dataReady", (pdfData) => {            
            fs.writeFileSync(outputTextFileForTest, JSON.stringify(pdfData), {encoding: 'utf-8'});
            actual = fs.readFileSync(outputTextFileForTest, {encoding: 'utf-8'});                                              
        }); 

        // Act
        this.app.client.waitUntilWindowLoaded().execute('Utils.initDevValues(viewModel); document.getElementById("printToPdfButton").click()');
        await wait(2000) // <== We think the pdf should have been written in 2 seconds
            .then( (response) => pdfParser.loadPDF(testPdfFilePath) )
            .catch( (err) => console.log(err));       
        await wait(2000) // <== And we wait some more because "Callback Hell"
        // Assert       
        assert.strictEqual(actual, expected);
        
        // Tear Down
        if (fs.existsSync(testPdfFilePath)) { fs.unlinkSync(testPdfFilePath) };
        if (fs.existsSync(outputTextFileForTest)) { fs.unlinkSync(outputTextFileForTest) }; 
    });

    return;
});