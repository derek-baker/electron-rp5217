// "use strict";

// const fs = require('fs');

// const readFile = (event, filepath) => {
// 	if (fs.existsSync(filepath)) {
// 		fs.readFile(filepath, 'utf-8', (err, data) => {
// 			if (err) {
// 				console.log(`An error ocurred reading the file ${filepath}\n` + err.message);
// 				return;
// 			}
// 			event.sender.send('fileData', data);
// 			event.sender.send('setTitle', filepath);
// 			currentFilePath = filepath;
// 			snapshotData(data);
// 		});
// 	}
// }
// const saveFile = (event, filename, data) => {
// 	if(filename){
// 		fs.writeFile(filename, data, function (err) {
// 			if (err) {			
// 				dialog.showErrorBox('Error', err);
// 				return;
// 			}
// 		});
// 		snapshotData(data);
// 		event.sender.send('saved-file');
// 	}	
// } 

// module.exports = { readFile, saveFile };