/* eslint-disable no-invalid-this */

'use strict';

const Application = require('spectron').Application;
const assert = require('assert');
const { customChannels } = require('./../../src/config');
const { AppOpts } = require('./_helpers');


describe('Spectron Intra-App IPC Integration Tests', function () {
    /** @type {Application} */
    let app;
    const mochaSuite = this;
    mochaSuite.timeout(10000)

    beforeEach(async function () {
        app = new Application(AppOpts);
        return await app.start();
    });

    afterEach(async function () {
        if (app && app.isRunning()) {
            return await app.stop();
        }
        return;
    });

    // NOTE: For the tests below, the intention was to test that clicking the buttons (at minimum)
    //       results in IPC communication that triggers native file dialogs, and the sending of data.
    //       I was unable to test the sending of data, and we can't drive native file dialogs with Spectron.

    // it('Top open button triggers valid inter-process communication', function () {
    //     const result = { actual: '' };
    //     const expected = 'recieved';
    //     /**
    //      * @param {{ actual: any; }} val
    //      */
    //     const eventCallback = (val) => {
    //         val.actual = expected;
    //     };
    //     app.electron.remote.ipcMain.on(customChannels.openFile, eventCallback(result));

    //     /**
    //      * @param {any} response
    //      */
    //     return app.client.waitUntilWindowLoaded().$('#importDataButton').click()
    //         .then(
    //             /**
    //              *
    //              * @param {string} response
    //              */
    //             function(response) {
    //                 // @ts-ignore
    //                 assert.strictEqual(
    //                     result.actual,
    //                     expected
    //                 );
    //             }
    //         );
    // });


    // it('Bottom open button triggers valid inter-process communication', function () {
    //     const result = { actual: '' };
    //     const expected = 'recieved';
    //     /**
    //      * @param {{ actual: any; }} val
    //      */
    //     const eventCallback = (val) => {
    //         val.actual = expected;
    //     };
    //     app.electron.remote.ipcMain.on(customChannels.openFile, eventCallback(result));

    //     /**
    //      * @param {any} response
    //      */
    //     return app.client.waitUntilWindowLoaded().$('#importDataButtonBottom').click()
    //         .then((response) => { assert.strictEqual(result.actual, expected); });
    // });


    // it('Top save button triggers valid inter-process communication', function () {
    //     const result = { actual: '' };
    //     const expected = 'recieved';
    //     /**
    //      * @param {{ actual: any; }} val
    //      */
    //     const eventCallback = (val) => {
    //         val.actual = expected;
    //     };
    //     app.electron.remote.ipcMain.on(customChannels.save, eventCallback(result));

    //     /**
    //      * @param {any} response
    //      */
    //     return app.client.waitUntilWindowLoaded().$('#saveFileButton').click()
    //         .then((response) => { assert.strictEqual(result.actual, expected); });
    // });


    // it('Bottom save button triggers valid inter-process communication', function () {
    //     const result = { actual: '' };
    //     const expected = 'recieved';
    //     const eventCallback = /**
    //      * @param {{ actual: any; }} val
    //      */
    //         function (val) {
    //             val.actual = expected;
    //         };
    //     app.electron.remote.ipcMain.on(customChannels.save, eventCallback(result));

    //     /**
    //      * @param {any} response
    //      */
    //     return app.client.waitUntilWindowLoaded().$('#saveFileButtonBottom').click()
    //         .then((response) => { assert.strictEqual(result.actual, expected); });
    // });


    // it('Top save-as button triggers valid inter-process communication', function () {
    //     const result = { actual: '' };
    //     const expected = 'recieved';
    //     const eventCallback = /**
    //      * @param {{ actual: any; }} val
    //      */
    //         function (val) {
    //             val.actual = expected;
    //         };
    //     app.electron.remote.ipcMain.on(customChannels.saveDialog, eventCallback(result));

    //     /**
    //      * @param {any} response
    //      */
    //     return app.client.waitUntilWindowLoaded().$('#saveAsFileButton').click()
    //         .then((response) => {
    //             assert.strictEqual(result.actual, expected);
    //         });
    // });


    // it('Bottom save-as button triggers valid inter-process communication', function () {
    //     const result = { actual: '' };
    //     const expected = 'recieved';
    //     const eventCallback = /**
    //      * @param {{ actual: any; }} val
    //      */
    //         function (val) {
    //             val.actual = expected;
    //         };
    //     app.electron.remote.ipcMain.on(customChannels.saveDialog, eventCallback(result));

    //     /**
    //      * @param {any} response
    //      */
    //     return app.client.waitUntilWindowLoaded().$('#saveAsFileButtonBottom').click()
    //         .then((response) => { assert.strictEqual(result.actual, expected); });
    // });

    // return;
});
