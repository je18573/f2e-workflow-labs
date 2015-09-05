var gulp = require('gulp');
gulp.task('default', ['mytask1', 'mytask2'], function() {
	console.log('My Default Task');
});

//!!! 若傳入cb, 則一定要在function中加上cb()，否則此task不執行。
gulp.task('mytask1', function(cb) {
	console.log('Task1 Output');
	cb();
});

gulp.task('mytask2', function(cb) {
	console.log('Task2 Output');
	cb();
});
/*
執行結果：
[14:57:30] Using gulpfile ~\Code\f2e-workflow-labs\gulpfile.js
[14:57:30] Starting 'mytask1'...
Task1 Output
[14:57:30] Finished 'mytask1' after 2.44 ms
[14:57:30] Starting 'mytask2'...
Task2 Output
[14:57:30] Finished 'mytask2' after 172 μs
[14:57:30] Starting 'default'...
My Default Task
[14:57:30] Finished 'default' after 277 μs
 */