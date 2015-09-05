var gulp = require('gulp');
gulp.task('default', ['mytask1', 'mytask2'], function() {
	console.log('My Default Task');
});

//!!! 若傳入cb, 則一定要在function中加上cb()，否則此task不執行。
gulp.task('mytask1', function(cb) {
	console.log('Task1 Output');
	//cb();
});

gulp.task('mytask2', function(cb) {
	console.log('Task2 Output');
	cb();
});
/*
執行結果：
[14:58:54] Using gulpfile ~\Code\f2e-workflow-labs\gulpfile.js
[14:58:54] Starting 'mytask1'...
Task1 Output
[14:58:54] Starting 'mytask2'...
Task2 Output
[14:58:54] Finished 'mytask2' after 238 μs
 */
 
 /*
 解釋：
 因是採非同步處理，因此mytask1, mytask2同時執行，
 但mytask1因有傳cb但無執行cb()，會導致一直沒有完成，
 再因相依關係，mytask1&mytask2要同時跑完才會執行default的log，
 而mytask1無完成,所以不會跑出My Default task。
*/