"use strict";

const fs = require('fs');
const util = require('util');


fs.readFilePromisified = util.promisify(fs.readFile);
fs.writeFilePromisified = util.promisify(fs.writeFile);


const readFile = async (filepath, result) => {
	if (fs.existsSync(filepath)) {
		await fs.readFilePromisified(filepath, 'utf-8')
			.then( (data) => {				
				result.dataFromFile = data;
				result.currentFileTarget = filepath;								
			})
			.catch( (err) => { console.log(`An error ocurred reading the file ${filepath}\n` + err.message); } );		
	}
};

const saveFile = async (filename, data, dialog) => {
	if (filename) {
		await fs.writeFilePromisified(filename, data)
			// .then( () => { 
			// 	if (event) { event.sender.send('saved-file'); } 
			// 	// return data;
			// })
			.catch( (err) => { dialog.showErrorBox('Error', err); } );
        // return data;
	}	
}; 

module.exports = { readFile, saveFile };