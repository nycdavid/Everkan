'use strict';
var glob = require('glob');

module.exports = {
  entry: glob.sync('./client/**/*.js'),
  output: {
    path: 'public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
