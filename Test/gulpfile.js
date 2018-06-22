'use strict';

var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    csso         = require('gulp-csso'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    cache        = require('gulp-cache'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    sourcemaps   = require('gulp-sourcemaps'),
    sass         = require('gulp-sass'),
    pngquant     = require('imagemin-pngquant'),
    spritesmith  = require('gulp.spritesmith'),
    pug          = require('gulp-pug'),
    cssnano      = require('gulp-cssnano'),
    concatCss    = require('gulp-concat-css'),
    uglify       = require('gulp-uglify');


   

gulp.task('browser-sync', function() {				
	browserSync({
		server: {
			baseDir: 'app'
		},
		browser: "chrome",
		notify: false
	});
});


gulp.task('html', function(){
	return gulp.src([
		'app/pug/index.pug'
		])
	.pipe(plumber())
	.pipe(pug({pretty: true}))
	.pipe(browserSync.reload({stream: true}))
	.pipe(gulp.dest('app'))
});


gulp.task('sprite', ['delSprite'], function () {
  var spriteData = gulp.src('app/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('app/images/sprites'));
});


gulp.task('delSprite', function() {
	return del.sync('app/images/sprites/***')
});

gulp.task('sass', function(){
	return gulp.src('app/sass/style.scss')
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest('app/css'))
	.pipe(sourcemaps.write())
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('cleanCss', function() {					
	del('app/css/*.css')
});

gulp.task('css',['sass','cleanCss'], function() {			
	return gulp.src('app/css/*.css')
	.pipe(csso())
	.pipe(gulp.dest('app/css'));
});

gulp.task('css-libs', function() {
	return gulp.src([
		'app/libs/OwlCarousel2-2.3.4/dist/assets/owl.carousel.css',
		'app/libs/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.css'
	])
	.pipe(concatCss('libs.min.css'))
	.pipe(cssnano({
		 keepSpecialComments: 1
	}))
	.pipe(gulp.dest('app/css'))
});


gulp.task('js-libs', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.js',
		'app/libs/OwlCarousel2-2.3.4/dist/owl.carousel.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
});


gulp.task('clean', function() {					
	return del.sync('dist');
});

gulp.task('clear', function() {					
	return cache.clearAll();
});

gulp.task('img', function() {					
	return gulp.src('app/images/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une:[pngquant()]
	})))
	.pipe(gulp.dest('dist/images'));
});

gulp.task('watch',['clear', 'browser-sync', 'css', 'css-libs', 'js-libs', 'html', 'img'], function() { 
	gulp.watch('app/pug/**/*.pug', ['html']);
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});


gulp.task('build',['clean'], function() {			
	var buildCss = gulp.src([
			'app/css/style.css',
			'app/css/libs.min.css'
		]).pipe(gulp.dest('dist/css'));
	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	var buildImg = gulp.src('app/images/**')
		.pipe(gulp.dest('dist/images'));

	var buildFontsIcon = gulp.src('app/icon-font/**')
		.pipe(gulp.dest('dist/icon-font'));

	var buildVideo = gulp.src('app/video/**')
		.pipe(gulp.dest('dist/video'));

});