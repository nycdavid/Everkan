'use strict';

// Modules
var express = require('express')
  , webpack = require('webpack')
  , webpackConfig = require('../webpack.config')

var app = express()
  , compiler = webpack(webpackConfig);

// Server configuration
app.use(express.static('public')); // Look in the public folder for static files
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  contentBase: './client'
}));

app.use(require('webpack-hot-middleware')(compiler, { 
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.listen(3000, function() {
  console.log('Express server now listening on port 3000');
});
