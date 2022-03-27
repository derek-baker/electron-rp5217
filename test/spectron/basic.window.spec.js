const Application = require('spectron').Application
const assert = require('assert')
const { appOptions } = require('./_helpers');

describe('Application launch', function () {
    /** @type {Application} */
    let app;
    const mochaSuite = this;
    mochaSuite.timeout(10000)

    beforeEach(async () => {
        app = new Application(appOptions);
        try {
            await app.start();
        }
        catch (err) {
            // console.error(err);
        }

    });

    afterEach(async () => {
        if (app && app.isRunning()) {
            try {
                await app.stop()
            }
            catch (err) {
                // console.error(err);
            }
        }
    });

    it('shows an initial window', async () => {
        /** @type {number} */
        const expected = 1;
        try {
            // NOTE: getWindowCount() will return 2 if `dev tools` are opened.
            const actual = await app.client.getWindowCount()
            assert.strictEqual(actual, expected);
        }
        catch (err) {
            // throw new Error(err);
        }
    })
})
