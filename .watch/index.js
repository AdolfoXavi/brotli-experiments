/**[ツ
	@author		Phil Ricketts <phil@replete.nu> @replete
	@license	Unlicense
*/
const bs = require('browser-sync').create();


bs.init({
	server: "./"
});


bs.watch('**/*.*').on('change', bs.reload);