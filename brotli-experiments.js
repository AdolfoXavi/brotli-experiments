
var decompress = require('brotli/decompress');


(function(w){
	/**[ツ]	brotli-experiments 0.0.1
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

		var t={};

		t.xhrStart = window.performance.now();
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", reqListener);
		oReq.open("GET", filename);
		oReq.overrideMimeType("text/plain; charset=x-user-defined");
		oReg.responseType = 'arrayBuffer';
		oReg.onload = function(e) {

			t.xhrFinish = window.performance.now();
			var buffer = new Uint8Array(this.response);
			var fileString;
			t.decompressStart = window.performance.now();
			fileString = decompress(buffer, length);
			t.decompressFinish = window.performance.now();

			logXHR(t);

			text.textContent = fileString;
		}
		oReq.send();
	}

	w.getBrotliText = getAndDecompressBrotliText;

})(this);

