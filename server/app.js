'use strict';

var express = require('express')
  , app = express();

// Server configuration
app.use(express.static('public')); // Look in the public folder for static files

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.listen(3000, function() {
  console.log('Express server now listening on port 3000');
});
