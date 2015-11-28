/**[ツ
	@author		Phil Ricketts <phil@replete.nu> @replete
	@license	Unlicense
*/
const browserify = require('browserify');
const p = require('../package');
const fs = require('fs');
const minify = js => require('uglify-js').minify(js,p.config.uglifyBuild).code;

// Method for rendering normal strings as if they were ES6 `template strings like ${this}`
String.prototype.toTemplate = function() { return this.replace(/(\$\{.*?\})/g, m => eval('`'+m+'`')); };

var license, mainScript;

// Javascript:
fs.readFile('src/src.js', 'utf8', function (err, data) {
	data = data.toTemplate();
	fs.writeFile(p.main + '.js', data);
	var header = data[0] === '/' ? data.match(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s])+\/\/(?:.*)$)/)[0] : '';
	
	// data = header + minify(data);
	// fs.writeFileSync(p.main + '.min.js', data);

	var b = browserify();
	b.add(p.main+'.js');
	b.bundle(function(err,buff){
		fs.writeFileSync(p.main + '.bundle.js', buff, 'utf8');
	});
});

// Documentation:
fs.readFile('src/src.md', 'utf8', function (err, data) {
	license = fs.readFileSync('src/src.license','utf8');
	license = license.toTemplate();
	fs.writeFileSync('LICENSE', license);
	license = license.replace(/\n/g,'<br/>');

	fs.readFile('src/src.html', 'utf8', function (err, data) {
		
		fs.writeFile('index.html', data.toTemplate());
	});

	fs.writeFile('README.md', data.toTemplate());
});


