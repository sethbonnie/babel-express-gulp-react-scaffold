var path = require( 'path' );
var fs = require( 'fs' );
var gulp = require( 'gulp' );
var less = require( 'gulp-less' );
var babel = require( 'gulp-babel' );
var concat = require( 'gulp-concat' );
var buffer = require( 'vinyl-buffer' );
var source = require( 'vinyl-source-stream' );
var plumber = require( 'gulp-plumber' );
var browserify = require( 'browserify' );

/**
  * Main source paths for easy access. Long patterns, especially of
  * files in node_modules/ are better off here. Destinations should be
  * in the source, since those are usually specific to a task and not
  * usually shareable. It's also more readable to have exact paths with
  * destinations.
  */
var paths = {
	cssSrc: ['src/**/*.css', 'src/**/*.less'],
	jsSrc: ['src/**/*.js']
};


/**
  * After we have babelfied our sources, we browserify them
  * starting from the AppContainer and dump them into `public/js/`
  * for all the world to consume.
  */
gulp.task( 'js', ['babel'], function() {
	var b = browserify({
    entries: './build/js/AppContainer.js',
    paths: ['./build/js/']
  });

  return b.bundle()
    .pipe( plumber() )
    .pipe( source('bundle.js') )
    .pipe( buffer() )
    .pipe( gulp.dest('public/js/') );
});// /gulp.task('js')


/**
  * Process all our JavaScript sources through babel and dump
  * them into the `build/` folder.
  */
gulp.task( 'babel', function() {
	return gulp.src( paths.jsSrc )
		.pipe( plumber() )
		.pipe( babel() )
		.pipe( gulp.dest('build/') );
});// /gulp.task('babel')


/**
  * Process all our LESS and CSS files through less and drop them into
  * the `public/css/` directory.
  */
gulp.task( 'css', function() {
	return gulp.src( paths.cssSrc )
		.pipe( plumber() )
		.pipe(less({
      paths: [ path.join(__dirname, 'src/less/includes') ]
    }))
		.pipe( concat('bundle.css') )
    .pipe( gulp.dest('public/css/') );		
});


/**
  * This task is for tasks that bring in external dependencies, for
  * example, copying bootstrap files to `public/lib`. So the dependencies
  * array will be filled with the various tasks we use to copy those files
  * to the the lib directory, e.g.:
  * 	gulp.task('lib',['bootstrap', 'font-awesome']);
  */
gulp.task( 'lib', []);


gulp.task( 'default', ['js', 'css', 'lib', 'watch']);


gulp.task( 'watch', function() {
	gulp.watch(paths.jsSrc, ['js']);
	gulp.watch(paths.cssSrc, ['css']);
});// /gulp.task('watch')