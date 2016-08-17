/**
 * Created by gzavaleta on 17/08/16.
 */

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({
        script: './bin/www',
        ext: 'js',
        env: {
            PORT: 8001
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('Changes Detected, Restarting Server');
        })
});
