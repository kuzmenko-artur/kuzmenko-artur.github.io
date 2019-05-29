//Закомментированы: "browserSync", "pretty" в Pug
//Подключаем модули Gulp
const gulp = require('gulp');
//Подключаем модули Gulp
const concat = require('gulp-concat'), // Объединение файлов - конкатенация
	autoprefixer = require('gulp-autoprefixer'), //Добавить префиксы
	cleanCSS = require('gulp-clean-css'), //Минификация CSS
	uglify = require('gulp-uglify'), //Минификация JS
	del = require('del'), //Удалить всё в указанной папке
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),//Переводит SASS в CSS
	//sourcemaps = require('gulp-sourcemaps'), //В браузере из одной строки в нормальный css
	pug = require('gulp-pug'), // Pug
	imagemin = require('gulp-imagemin'); //Сжатие изображений

//Порядок подключения css файлов
const cssFiles = [
	'./src/sass/main.sass'
]

//Порядок подключения js файлов
const jsFiles = [
	'./src/js/lib.js',
	'./src/js/main.js'
]

// Pug
gulp.task('pug', function () {
	//Шаблон для поиска файлов pug
	return gulp.src('src/pug/pages/*.pug')
	//Настройки pug
	.pipe(pug({
		//pretty: true  //Без минификации
	}))
	//Выходная папка для pug файлов
	.pipe(gulp.dest('./dist/'))
	//Автоперезагрузка страницы в браузере
	.pipe(browserSync.stream());
});

// Копирование файлов Bootstrap css в папку dist
gulp.task('bootstrapcss', function() {
	return gulp.src('./src/bootstrap/css/**/*')
	.pipe(gulp.dest('./dist/css/'));
});

// Копирование файлов Bootstrap js в папку dist
gulp.task('bootstrapjs', function() {
	return gulp.src('./src/bootstrap/js/**/*')
	.pipe(gulp.dest('./dist/js/'));
});

//Таск на шрифты
gulp.task('fonts', function() {
	return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('./dist/fonts/'))
});
gulp.task('fontscss', function() {
	return gulp.src('./src/css/**/*')
	.pipe(gulp.dest('./dist/css/'))
});

//Таск на стили CSS
gulp.task('styles', function styles() {
	//Шаблон для поиска файлов CSS
	return gulp.src(cssFiles)
	//В браузере из одной строки в нормальный css
	//.pipe(sourcemaps.init())
	// Объединение файлов - конкатенация
	.pipe(concat('main.css'))
	//Переводит SASS в CSS
	.pipe(sass({indentedSyntax: true}).on('error', sass.logError))
	//Добавить префиксы
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	//Минификация CSS
	.pipe(cleanCSS({
		level: 2
	}))
	//В браузере из одной строки в нормальный css
	//.pipe(sourcemaps.write())
	//Выходная папка для стилей
	.pipe(gulp.dest('./dist/css/'))
	//Автоперезагрузка страницы в браузере
	.pipe(browserSync.stream());
});

//Таск на скрипты JS
gulp.task('scripts', function scripts() {
	//Шаблон для поиска файлов CSS
	return gulp.src(jsFiles)
	// Объединение файлов - конкатенация
	.pipe(concat('script.js'))
	//Минификация JS
	.pipe(uglify())
	//Выходная папка для стилей
	.pipe(gulp.dest('./dist/js/'))
	//Автоперезагрузка страницы в браузере
	.pipe(browserSync.stream());
});

//Сжатие изображений
gulp.task('imgs', function imgs() {
	//Шаблон для поиска изображений
	return gulp.src('./src/images/**/*')
	//Сжатие изображений
    .pipe(imagemin({ 
    	progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true
    }))
    //Выходная папка для изображений
    .pipe(gulp.dest('./dist/images/'))
    //Автоперезагрузка страницы в браузере
	.pipe(browserSync.stream());
});

//Просматривать файлы
gulp.task('watch', function watch() {
	browserSync.init({
        server: {
            baseDir: "./dist/"
        }
		});
		//Следить за pug файлами
		gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    //Следить за CSS файлами
    gulp.watch('./src/sass/**/*.sass', gulp.series('styles'));
    //Следить за JS файлами
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
    //Следить за изображениями
    gulp.watch('./src/images/**/*', gulp.series('imgs'));
});

//Удалить всё в указанной папке
gulp.task('clean', function clean() {
	return del(['dist/*'])
});

gulp.task('default', gulp.series(gulp.parallel('pug', 'bootstrapcss', 'bootstrapjs', 'fonts', 'fontscss', 'styles', 'scripts', 'imgs'), 'watch'));