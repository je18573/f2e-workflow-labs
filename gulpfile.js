var gulp = require('gulp');
var del = require('del');

var $ = require('gulp-load-plugins');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');

var config = require('./config');

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
 
 
 
 /* 
 把src目錄指定的資料，複製(pipe)一份到指定的路徑(desk) 
 [Result]
 js
 	-bootstrap.js
 	-bootstrp.min.js
 	-npm.js
 */
 gulp.task('output1', function(){
	gulp.src('assets/bootstrap/**/*.js')
		.pipe(gulp.dest('output1'));
 });
 
 /* 
 把src目錄指定的資料，複製(pipe)一份到指定的路徑(desk)，
 但是指定路徑所長出來的資料夾是根據base裡的設定，
 即以assets為基底，建立assets之後指定的資料夾&檔案。
 [Result]
 bootstrap
 	-js
 		-bootstrap.js
 		-bootstrp.min.js
 		-npm.js
 */
// gulp.task('output2', function(){
//	gulp.src('assets/bootstrap/**/*.js', { base:"assets" })
//		.pipe(gulp.dest('output2'));
//});

 /*
 可以用[]傳入多個
  */
 gulp.task('output3', function(){
	gulp.src(['assets/vendor/**/*.js',
			  'assets/vendor/**/*.css'], { base:
			  'assets/vendor/' })
		.pipe(gulp.dest('output3'));	 
 });
 
 /*===========================================================*/
 /*
 使用 del 模組刪除資料夾或檔案
  */
 gulp.task('clean', function(cb){
	 
	//這會把bootstrap資料夾也整個砍掉
	//del(['output2/bootstrap/**']);
	
	//後面多加排除設定，可避免bootstrap資料夾被刪除
	//del(['output2/bootstrap/**', '!output2/bootstrap']);
	
	del(['output2/bootstrap/**/'])
		.then(function (paths) {
			console.log('Deleted files/folders:\n', paths.join('\n'));
		})
		.then(cb);
 });
 
 gulp.task('output2', ['clean'], function(){
	gulp.src('assets/bootstrap/**/*.js', { base:"assets" })
		.pipe(gulp.dest('output2'));
 });
 
 /*===========================================================*/
gulp.task('watch', function(){
	 gulp.watch(config.appPath + '/**/*.js',['default']);
});


gulp.task('concat-app', function(){
	gulp.src(config.appPath+'/**/*.module.js')
		.pipe($.concat('app.modules.js'))
		.pipe(gulp.dest('assets'));
	
	gulp.src([config.appPath+'/**/*.js','!'+config.appPath+'/**/*.module.js'])
		.pipe($.concat('app.bundles.js'))
		.pipe(gulp.dest('assets'));
});

gulp.task('uglify-app', function(){
	gulp.src(config.appPath+'/**/*.module.js')
		.pipe(gulp.dest('src/app'))
		.pipe($.concat('app.modules.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('assets'));
	
	gulp.src([config.appPath+'/**/*.js','!'+config.appPath+'/**/*.module.js'])
		.pipe($.gulp.dest('src/app'))
		.pipe($.concat('app.bundles.js'))
		.pipe($.uglify( {mangle: false} ))		
		.pipe(gulp.dest('assets'));
			
});


gulp.task('rename-app', function(){
	gulp.src(config.appPath+'/**/*.module.js')
		.pipe(gulp.dest('src/app'))
		.pipe($.concat('app.modules.js'))
		.pipe(gulp.dest('assets'))
		.pipe($.uglify())
		.pipe($.rename({extname: '.min.js'}))
		.pipe(gulp.dest('assets'));
	
	gulp.src([config.appPath+'/**/*.js','!'+config.appPath+'/**/*.module.js'])
		.pipe(gulp.dest('src/app'))
		.pipe($.concat('app.bundles.js'))
		.pipe(gulp.dest('assets'))		
		.pipe($.uglify( {mangle: false} ))	
		.pipe($.rename({extname: '.min.js'}))	
		.pipe(gulp.dest('assets'));
			
});