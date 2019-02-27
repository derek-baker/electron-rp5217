"use strict";

const fs = require('fs');
const util = require('util');

fs.readFileAsync = util.promisify(fs.readFile);

const readFile = async (filepath, result) => {
	if (fs.existsSync(filepath)) {
		await fs.readFileAsync(filepath, 'utf-8')
			.then( (data) => {				
				result.dataFromFile = data;
				result.currentFileTarget = filepath;								
			})
			.catch( (err) => { console.log(`An error ocurred reading the file ${filepath}\n` + err.message); } );		
	}
};

const saveFile = (event, filename, data, dialog) => {
	if (filename) {
		fs.writeFile(filename, data, function (err) {
			if (err) {			
				dialog.showErrorBox('Error', err);
				return;
			}
		});
		if (event) { // <== added to allow tests to run
			event.sender.send('saved-file');
        }
        return data;
	}	
}; 

module.exports = { readFile, saveFile };