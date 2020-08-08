/* eslint-disable no-invalid-this */

'use strict';

const Application = require('spectron').Application;
const assert = require('assert');
const electronPath = require('electron');
const path = require('path');
const { customChannels } = require('../src/config');


describe('Spectron Intra-App IPC Integration Tests', function() {
    this.timeout(100000);

    beforeEach(function() {
        this.app = new Application({
            path: electronPath,
            // args tells spectron to look and use the main.js file and the package.json located 1 level above.
            args: [path.join(__dirname, '..')],
            env: {
                NODE_ENV: 'test'
            },
            requireName: 'nodeRequire'
        });
        return this.app.start();
    });

    afterEach(function() {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    it('shows an initial window', function() {
        return this.app.client.getWindowCount()
            .then(function(count) { assert.strictEqual(count, 1); }
            );
    });

    // NOTE: For the tests below, the intention was to test that clicking the buttons (at minimum)
    //       results in IPC communication that triggers native file dialogs, and the sending of data.
    //       I was unable to test the sending of data, and we can't drive native file dialogs with Spectron.

    it('Top open button triggers valid inter-process communication', function() {
        const result = { actual: '' };
        const expected = 'recieved';
        const eventCallback = (val) => {
            val.actual = expected;
        };
        this.app.electron.remote.ipcMain.on(customChannels.openFile, eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#importDataButton').click()
            .then((response) => { assert.strictEqual(result.actual, expected); });
    });


    it('Bottom open button triggers valid inter-process communication', function() {
        const result = { actual: '' };
        const expected = 'recieved';
        const eventCallback = (val) => {
            val.actual = expected;
        };
        this.app.electron.remote.ipcMain.on(customChannels.openFile, eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#importDataButtonBottom').click()
            .then((response) => { assert.strictEqual(result.actual, expected); });
    });


    it('Top save button triggers valid inter-process communication', function() {
        const result = { actual: '' };
        const expected = 'recieved';
        const eventCallback = (val) => {
            val.actual = expected;
        };
        this.app.electron.remote.ipcMain.on(customChannels.save, eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#saveFileButton').click()
            .then((response) => { assert.strictEqual(result.actual, expected); });
    });


    it('Bottom save button triggers valid inter-process communication', function() {
        const result = { actual: '' };
        const expected = 'recieved';
        const eventCallback = function(val) {
            val.actual = expected;
        };
        this.app.electron.remote.ipcMain.on(customChannels.save, eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#saveFileButtonBottom').click()
            .then((response) => { assert.strictEqual(result.actual, expected); });
    });


    it('Top save-as button triggers valid inter-process communication', function() {
        const result = { actual: '' };
        const expected = 'recieved';
        const eventCallback = function(val) {
            val.actual = expected;
        };
        this.app.electron.remote.ipcMain.on(customChannels.saveDialog, eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#saveAsFileButton').click()
            .then((response) => {
                assert.strictEqual(result.actual, expected);
            });
    });


    it('Bottom save-as button triggers valid inter-process communication', function() {
        const result = { actual: '' };
        const expected = 'recieved';
        const eventCallback = function(val) {
            val.actual = expected;
        };
        this.app.electron.remote.ipcMain.on(customChannels.saveDialog, eventCallback(result));

        return this.app.client.waitUntilWindowLoaded().$('#saveAsFileButtonBottom').click()
            .then((response) => { assert.strictEqual(result.actual, expected); });
    });

    return;
});
