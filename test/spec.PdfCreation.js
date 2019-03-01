"use strict";

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const util = require('util')
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
    });

    afterEach(function () {
        if (fs.existsSync(testPdfFilePath)) { fs.unlinkSync(testPdfFilePath) };
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }        
    });    


    it('can create a filled PDF with correct layout and filled values', async function() {
        // NOTE: I validated the file ./assets/filledPdfForTest.Expected.pdf against ./assets/NYS_filledPdfForTest.Expected.pdf
        //       by filling them with equivalent data, then manually decoding both of the generated barcodes using
        //       this app: https://online-barcode-reader.inliteresearch.com/  
        //       I then generated the file ./assets/filledPdfAsTextForTest.Expected.json from the validated
        //       ./assets/filledPdfForTest.Expected.pdf. The strategy for this test is to generate a new PDF on the fly using specific inputs
        //       (see ./assets/filledPdfForTest.Expected.pdf)
        //       , then to convert that to a textual representation that we can diff against ./assets/filledPdfAsTextForTest.Expected.json  

        // Arrange
        let actualForFillTest;
        const expectedForFillTest = fs.readFileSync( 
            ( path.join(__dirname, 'Assets', 'filledPdfAsTextForTest.Expected.json') ), 
            {encoding: 'utf-8'} 
        );
        const outputTextFileForFillTest = path.join(__dirname, "pdfTextForFilledTest.json");  

        let pdfParserForFillTest = new PDFParser();
        pdfParserForFillTest.on("pdfParser_dataError", (errData) => { 
            console.error(errData.parserError) 
        });
        pdfParserForFillTest.on("pdfParser_dataReady", (pdfData) => {            
            fs.writeFileSync(outputTextFileForFillTest, JSON.stringify(pdfData), {encoding: 'utf-8'});
            actualForFillTest = fs.readFileSync(outputTextFileForFillTest, {encoding: 'utf-8'});                                              
        }); 

        // Act
        this.app.client.waitUntilWindowLoaded().execute(
            'Utils.initDevValues(viewModel); document.getElementById("printToPdfButton").click()'
        );
        await wait(2000) // <== We think the pdf should have been written in 2 seconds

        // TODO: check for existence of PDF we load below
        pdfParserForFillTest.loadPDF(testPdfFilePath);
        await wait(2000) // <== And we wait some more because "Callback Hell"

        // Tear Down
        if (fs.existsSync(outputTextFileForFillTest)) { fs.unlinkSync(outputTextFileForFillTest) }; 
        
        // Assert       
        assert.strictEqual(actualForFillTest, expectedForFillTest);        
    });

    
    // NOTE: I tried to have a separate test for the layout, but I can't run these tests in sequence,
    //       even when the tests are in separate files. The test below runs, just not after running the above test.
    //       If you run this test before that test above, the test above will fail instead.
    // it('can create a blank PDF with correct layout', async function() {
    //     // Arrange
    //     let actualForBlank;
    //     const expectedForBlank = fs.readFileSync( 
    //         ( path.join(__dirname, 'Assets', 'blankPdfAsTextForTest.Expected.json') ), 
    //         {encoding: 'utf-8'} 
    //     );
    //     const outputTextFileForTest = path.join(__dirname, "pdfTextForBlankTest.json");  

    //     // We want a textual representation of the PDF that we can Diff
    //     let pdfParserForBlank = new PDFParser();
    //     pdfParserForBlank.on("pdfParser_dataError", (errData) => { 
    //         console.error(errData.parserError) 
    //     });
    //     pdfParserForBlank.on("pdfParser_dataReady", (pdfData) => {            
    //         fs.writeFileSync(outputTextFileForTest, JSON.stringify(pdfData), {encoding: 'utf-8'});
    //         actualForBlank = fs.readFileSync(outputTextFileForTest, {encoding: 'utf-8'});                                              
    //     }); 

    //     // Act
    //     this.app.client.waitUntilWindowLoaded().execute(
    //         'document.getElementById("printToPdfButton").click()'
    //     );
    //     await wait(2000) // <== We think the pdf should have been written in 2 seconds
        
    //     var stats = fs.statSync(testPdfFilePath);
    //     var mtime = new Date(util.inspect(stats.mtime));
    //     console.log(mtime);

    //     // TODO: check for existence of PDF we load below
    //     pdfParserForBlank.loadPDF(testPdfFilePath);
    //     await wait(2000) // <== And we wait some more because "Callback Hell"
        
    //     // Tear Down
    //     if (fs.existsSync(outputTextFileForTest)) { fs.unlinkSync(outputTextFileForTest) };

    //     // Assert       
    //     assert.strictEqual(actualForBlank, expectedForBlank);
    // });

    return;
});