'use strict';

// Modules
require('babel-register')({
  presets: ['react', 'es2015'],
});

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpackConfig from '../webpack.config';
import passport from 'passport';
import _ from 'lodash';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Database config
mongoose.connect('mongodb://127.0.0.1:27017/everkan_dev');
import List from './models/List';
import Card from './models/Card';
import User from './models/User';

// Passport setup
passport.use(new GoogleStrategy({
  clientID: '717689786379-emcfab27u4kaputt8m7onh418c71n4sh.apps.googleusercontent.com',
  clientSecret: 'kEFKWycrM93jS0HUvLPx7ADI',
  callbackURL: 'http://localhost:3000/auth_redirect'
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({
    name: profile.displayName,
    googleId: profile.id
  }, (err, user) => {
    return done(err, user);
  });
}));
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findOne({ '_id': id }, (err, user) => {
    done(err, user);
  });
});

// App & Middleware
const compiler = webpack(webpackConfig);
const app = express()
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'devsecret', cookie: { maxAge: 6 * 60 * 60 * 1000 } }));
app.use(passport.initialize());
app.use(passport.session());
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

// Routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login'],
}));

app.get('/lists', function(req, res) {
  if (!req.user) { return res.redirect('/auth/google') };
  List.find({ userId: req.user._id }, (err, lists) => {
    if (err) return res.status(500).send('Server problem...');
    res.send(lists);
  });
});

app.put('/lists/:id', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    list.cards = req.body.cards;
    list.save(err => {
      if (err) return res.status(500).send('Problem updating...');
      res.send(list);
    });
  });
});

app.post('/lists/:id/cards', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    if (err) return res.status(500).send('Problem finding list');
    const card = new Card({ name: req.body.name });
    list.cards.push(card);
    list.save(err => {
      if (err) return res.status(500).send('Problem creating...');
      res.send(card)
    });
  });
});

app.put('/lists/:id/cards/:cardId', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    const cards = _.compact(list.cards);
    if (err) return res.status(500).send('Problem finding list');
    const newCards = cards.map(card => {
      return card._id.toString() === req.params.cardId ?
        Object.assign({ _id: card._id }, req.body.card) :
        card
    });
    list.cards = newCards;
    list.save((err, updatedList) => {
      if (err) return res.status(500).send('Problem updating list');
      res.send(_.find(updatedList.cards, card => (
        card._id.toString() === req.params.cardId
      )));
    });
  });
});

app.get(
  '/auth_redirect',
  passport.authenticate('google', { falureRedirect: '/auth/google' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.post('/lists', function(req, res) {
  const list = new List({ name: req.body.name, userId: req.user._id });
  list.save(function(err, list) {
    res.send(list);
  });
});

app.listen(3000, function() {
  console.log('Express server now listening on port 3000');
});
