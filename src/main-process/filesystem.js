'use strict';

const fs = require('fs');
const util = require('util');

const readFilePromisified = util.promisify(fs.readFile);
const writeFilePromisified = util.promisify(fs.writeFile);

/**
 * @param {*} filepath
 * @param {*} result - Changes to this param are both visible to the caller and used by the caller.
 * @return {Promise<void>}
 */
const readFile = async (filepath, result) => {
    await readFilePromisified(filepath, 'utf-8')
        .then((data) => {
            result.dataFromFile = data;
            result.currentFileTarget = filepath;
        })
        .catch((err) => {
            console.log(
                `An error ocurred reading the file ${filepath}\n` + err.message
            );
        });
};

/**
 *
 * @param {string} filename
 * @param {*} data
 * @param {Electron.Dialog} dialog
 * @return {Promise<void>}
 */
const saveFile = async (filename, data, dialog) => {
    if (filename) {
        await writeFilePromisified(filename, data)
            .catch((err) => { dialog.showErrorBox('Error', err); });
    }
};

module.exports = { readFile, saveFile };
