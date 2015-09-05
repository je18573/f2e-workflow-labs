var gulp = require('gulp');
gulp.task('default', ['mytask1', 'mytask2'], function() {
	console.log('My Default Task');
});

//!!! 若傳入cb, 則一定要在function中加上cb()，否則此task不執行。
gulp.task('mytask1', function(cb) {
	console.log('Task1 Output');
	cb();
});

gulp.task('mytask2', function() {
	console.log('Task2 Output');
});