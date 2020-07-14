import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import backgroundWebpackConfig from './background/webpack.config';
import contentWebpackConfig from './content/webpack.config';

gulp.task('popup-js', ['clean'], cb => {
  webpack(popupWebpackConfig, (err, stats) => {
    if (err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('background-js', ['clean'], cb => {
  webpack(backgroundWebpackConfig, (err, stats) => {
    if (err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('content-js', ['clean'], cb => {
  webpack(contentWebpackConfig, (err, stats) => {
    if (err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('popup-html', ['clean'], () => {
  return gulp
    .src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json').pipe(gulp.dest('./build'));
});

gulp.task('copy-icon-16', ['clean'], () => {
  return gulp.src('icon-16.png').pipe(gulp.dest('./build'));
});

gulp.task('copy-icon-48', ['clean'], () => {
  return gulp.src('icon-48.png').pipe(gulp.dest('./build'));
});

gulp.task('copy-icon-128', ['clean'], () => {
  return gulp.src('icon-128.png').pipe(gulp.dest('./build'));
});

gulp.task('clean', cb => {
  rimraf('./build', cb);
});

gulp.task('build', [
  'copy-manifest',
  'copy-icon-16',
  'copy-icon-48',
  'copy-icon-128',
  'popup-js',
  'popup-html',
  'background-js',
  'content-js',
]);

gulp.task('watch', ['default'], () => {
  gulp.watch('popup/**/*', ['build']);
  gulp.watch('content/**/*', ['build']);
  gulp.watch('background/**/*', ['build']);
});

gulp.task('default', ['build']);
