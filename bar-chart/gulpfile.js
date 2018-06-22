var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	del          = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	cache        = require('gulp-cache'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	cssnano      = require('gulp-cssnano'),
	uglify       = require('gulp-uglifyjs');


gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});


gulp.task('cleanCss', function() {					//таск cleanCss
	del('app/css/*.css')
});

gulp.task('css',['sass','cleanCss'], function() {			//таск css-libs
	return gulp.src('app/css/*.css')
	.pipe(cssnano({
		 keepSpecialComments: 1
	}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function() {					//таск scripts
	return gulp.src([
			'app/js/jquery.js',
		])
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});



gulp.task('browser-sync', function() {				
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false 
	});
});

gulp.task('clean', function() {					
	return del.sync('dist');
});

gulp.task('clear', function() {					
	return cache.clearAll();
});


gulp.task('watch',['clear', 'browser-sync', 'css'], function() { 
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});


gulp.task('build',['clean', 'sass', 'scripts'], function() {			
	var buildCss = gulp.src([
			'app/css/style.css',
		])
		.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

});