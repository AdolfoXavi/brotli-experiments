
/**[ツ]	brotli-experiments ${p.version}
	@url		http://github.com/replete/brotli-experiments
	@author		Phil Ricketts <phil@replete.nu> @replete
	@license	Unlicense
*/
var text = document.getElementById('text');
var timing = document.getElementById('timing');

function logXHR(t){
	var load = 'load time: ' +  (t.xhrFinish - t.xhrStart) + 'ms'
	var decompress = 'decompress time: ' +  (t.decompressFinish - t.decompressFinish) + 'ms'
	console.log(load);
	console.log(decompress);
	timing.textContent = load + '\n' + decompress;
}

function getAndDecompressBrotliText(filename,length) {

	var decompress = require('brotli/decompress');

	var t={};

	t.xhrStart = window.performance.now();
	var oReq = new XMLHttpRequest();
	oReq.open("GET", filename);
	oReq.overrideMimeType("text/plain; charset=x-user-defined");
	oReq.responseType = 'arraybuffer';
	oReq.onload = function(e) {

		t.xhrFinish = window.performance.now();

		var arrayBuffer = this.response;
		var responseArray = new Uint8Array(arrayBuffer);

		t.decompressStart = window.performance.now();
		var decompressedBuffer = decompress(responseArray, length).buffer;
		t.decompressFinish = window.performance.now();

		var dataView = new DataView(decompressedBuffer);
		var decoder = new TextDecoder();

		logXHR(t);

		text.textContent = decoder.decode(dataView);
	}
	oReq.send();
}

function clicky(e){
	var target = e.target;
	var load = target.getAttribute('data-load').split(',') || '';
	load[0] = load[0].replace(/\'/g,"");
	load[1] = parseInt(load[1],10);

	if (load) {
		getAndDecompressBrotliText(load[0],load[1]);
	}
}
var buttons = document.getElementsByTagName('button');

for (var i=0, button; button = buttons[i]; i++) {
	button.addEventListener('click',clicky, true);

}