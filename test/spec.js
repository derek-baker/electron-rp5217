"use strict";

const Application = require('spectron').Application;
const assert = require('assert');
const electronPath = require('electron'); 
const path = require('path');


describe('Spectron Intra-App Integration Tests', function () {
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

    it('shows an initial window', function () {
        return this.app.client.getWindowCount()
            .then( function(count) { assert.strictEqual(count, 1); } 
        );        
    });

    
    it('Top open button triggers valid inter-process communication', function() {
        let result = {actual: ''};
        const expected = 'recieved'
        const eventCallback = function(val) {
            val.actual = expected;
        } 
        this.app.electron.remote.ipcMain.on('openFile', eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#importDataButton').click()
                   .then( (response) => { assert.strictEqual(result.actual, expected); });        
    });


    it('Bottom open button triggers valid inter-process communication', function() {
        let result = {actual: ''};
        const expected = 'recieved'
        const eventCallback = function(val) {
            val.actual = expected;
        } 
        this.app.electron.remote.ipcMain.on('openFile', eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#importDataButtonBottom').click()
                   .then( (response) => { assert.strictEqual(result.actual, expected); });        
    });


    it('Top save button triggers valid inter-process communication', function() {
        let result = {actual: ''};
        const expected = 'recieved'
        const eventCallback = function(val) {
            val.actual = expected;
        } 
        this.app.electron.remote.ipcMain.on('save', eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#saveFileButton').click()
                   .then( (response) => { assert.strictEqual(result.actual, expected); });        
    });


    it('Bottom save button triggers valid inter-process communication', function() {
        let result = {actual: ''};
        const expected = 'recieved'
        const eventCallback = function(val) {
            val.actual = expected;
        } 
        this.app.electron.remote.ipcMain.on('save', eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#saveFileButtonBottom').click()
                   .then( (response) => { assert.strictEqual(result.actual, expected); });        
    });

    
    it('Top save-as button triggers valid inter-process communication', function() {
        let result = {actual: '', data: undefined};
        const expected = 'recieved'
        const eventCallback = function(data, val) {
            val.actual = expected;
            val.data = data;
        } 
        // this.app.electron.remote.ipcMain.on('save-dialog', eventCallback(data, result));
        this.app.electron.remote.ipcMain.on('save-dialog', function(){console.log('test: '); console.log(arguments)});

        return this.app.client.waitUntilWindowLoaded().$('#saveAsFileButton').click()
                .then( (response) => { 
                    assert.strictEqual(result.actual, expected); 
                    assert.strictEqual( ((result.data) ? true : false), true);
                });        
    });


    it('Bottom save-as button triggers valid inter-process communication', function() {
        let result = {actual: ''};
        const expected = 'recieved'
        const eventCallback = function(val) {
            val.actual = expected;
        } 
        this.app.electron.remote.ipcMain.on('save-dialog', eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#saveAsFileButtonBottom').click()
                   .then( (response) => { assert.strictEqual(result.actual, expected); });        
    });

    return;
})