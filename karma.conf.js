var path = require('path');

// Set node environment to testing
process.env.NODE_ENV = 'test';

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    files: [
      'tests/**/*.js'
    ],
    port: 8000,
    captureTimeout: 60000,
    frameworks: [
      'jasmine'
    ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha' ],
    preprocessors: {
      'client/**/*.js': [ 'webpack', 'sourcemap' ],
      'tests/**/*.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
              presets: ['airbnb']
            }
          },
          {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    },
    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },
    externals: {
      'cheerio': 'window',
      'jsdom': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  });
};
