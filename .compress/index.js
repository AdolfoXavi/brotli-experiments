/**[ツ
	@author		Phil Ricketts <phil@replete.nu> @replete
	@license	Unlicense
*/
const fs = require('fs');
const compress = require('iltorb').compress

var filenames = [
	'assets/sherlock-holmes.txt'
];

for (var filename of filenames) {
	if (filename.match(/txt|html|css|js/)) {
		fs.readFile(filename, function (err, data) {
			compress(data, function(err,output){
				fs.writeFile(filename + '.bro', output, 'binary');
			});

		});	
	} else {

	}
}
