var gulp = require('gulp');
gulp.task('default', ['mytask1'], function() {
	console.log('My Default Task');
});

gulp.task('mytask1', ['mytask2'], function() {
	console.log('Task1 Output');
});

gulp.task('mytask2', function() {
	console.log('Task2 Output');
});

/*
 因是非同步處理，因此必須用相依性做順序
 所以當執行default時發生有相依，會先去執行mytask1
 去執行mytask1時發生又有相依, 於是再先去執行mytask2
 如此執行上才會是：mytask2, mytask1, default
*/

/*
執行結果
[15:08:09] Using gulpfile ~\Code\f2e-workflow-labs\gulpfile.js
[15:08:09] Starting 'mytask2'...
Task2 Output
[15:08:09] Finished 'mytask2' after 305 μs
[15:08:09] Starting 'mytask1'...
Task1 Output
[15:08:09] Finished 'mytask1' after 183 μs
[15:08:09] Starting 'default'...
My Default Task
[15:08:09] Finished 'default' after 263 μs
 */