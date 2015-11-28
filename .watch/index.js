/**[ツ
	@author		Phil Ricketts <phil@replete.nu> @replete
	@license	Unlicense
*/
const bs = require('browser-sync').create();

bs.init({
	server: "./"
});



bs.watch('./**/*.*').on('change', bs.reload);


// const childProcess = require('child_process');

// bs.watch('**/*.*').on('change', function(stream){

// 	runScript('.build', function (err) {
// 	    if (err) throw err;
// 	    bs.reload();
// 	});
// });




// function runScript(scriptPath, callback) {

//     // keep track of whether callback has been invoked to prevent multiple invocations
//     var invoked = false;

//     var process = childProcess.fork(scriptPath);

//     // listen for errors as they may prevent the exit event from firing
//     process.on('error', function (err) {
//         if (invoked) return;
//         invoked = true;
//         callback(err);
//     });

//     // execute the callback once the process has finished running
//     process.on('exit', function (code) {
//         if (invoked) return;
//         invoked = true;
//         var err = code === 0 ? null : new Error('exit code ' + code);
//         callback(err);
//     });

// }
