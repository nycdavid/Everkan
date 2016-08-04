'use strict';

// Modules
require('babel-register')({
  presets: ['react', 'es2015'],
});

import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpackConfig from '../webpack.config';
import passport from 'passport';
import { OAuthStrategy as GoogleStrategy } from 'passport-google-oauth';

// Passport setup
passport.use(new GoogleStrategy({
  consumerKey: '717689786379-emcfab27u4kaputt8m7onh418c71n4sh.apps.googleusercontent.com',
  consumerSecret: 'kEFKWycrM93jS0HUvLPx7ADI',
  callbackURL: 'http://localhost:3000/auth_redirect'
}, (token, tokenSecret, profile, done) => {
  User.findOrCreate({ 
    name: profile.name, 
    googleId: profile.id 
  }, (err, user, created) => {
    console.log(user); 
    return done(err, user);
  });
}));

const compiler = webpack(webpackConfig);
const app = express()
app.use(express.static('public')); // Look in the public folder for static files
app.use(bodyParser.json());
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  contentBase: './client'
}));

mongoose.connect('mongodb://127.0.0.1:27017/everkan_dev');
const List = require('./models/List');

app.use(require('webpack-hot-middleware')(compiler, { 
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

app.get('/auth/google', passport.authenticate('google', { 
  scope: [],
}));

app.get('/lists', function(req, res) {
  List.find(function(err, lists) {
    res.send(lists);
  });
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
