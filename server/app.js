'use strict';

// Modules
var express = require('express')
  , webpack = require('webpack')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , webpackConfig = require('../webpack.config')

var app = express()
  , compiler = webpack(webpackConfig);

// DB configuration
mongoose.connect('mongodb://127.0.0.1:27017/everkan_dev');

// Server configuration
app.use(express.static('public')); // Look in the public folder for static files
app.use(bodyParser.json());
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  contentBase: './client'
}));

// Models
var List = require('./models/List');

app.use(require('webpack-hot-middleware')(compiler, { 
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.post('/lists', function(req, res) {
  const list = new List({ name: req.body.name });
  list.save(function(err, list) {
    res.send(list); 
  });
});

app.listen(3000, function() {
  console.log('Express server now listening on port 3000');
});
