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

var paths = {
	cssSrc: ['src/**/*.css', 'src/**/*.less'],
	jsSrc: ['src/**/*.js']
};

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
});

gulp.task( 'babel', function() {
	return gulp.src( paths.jsSrc )
		.pipe( plumber() )
		.pipe( babel() )
		.pipe( gulp.dest('build/') );
});

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
  * example, copying bootstrap files to `public/lib`
  */
gulp.task( 'lib', []);

gulp.task( 'default', ['js', 'css', 'lib', 'watch']);

gulp.task( 'watch', function() {
	gulp.watch(paths.jsSrc, ['js']);
	gulp.watch(paths.cssSrc, ['css']);
});