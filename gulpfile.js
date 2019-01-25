const {task, src, dest, parallel} = require('gulp');
const uglify = require('gulp-uglify');

task('min', done => {
  src('./bld/**/*.js')
    .pipe(uglify())
    .pipe(dest('./bld'));

  done();
});

task('default', parallel('min'));
