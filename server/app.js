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
import database from '../config/database.json';

// Controllers
import ListsController from './controllers/ListsController';
import ListCardsController from './controllers/ListCardsController';

// Database config
mongoose.connect(database[process.env.NODE_ENV]);
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
if (process.env.NODE_ENV === 'dev') {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    contentBase: './client'
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

// Routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login'],
}));

// Lists
app.get('/lists', ListsController.Index);
app.post('/lists', ListsController.Create);
app.put('/lists/:id', ListsController.Update);
app.delete('/lists/:id', ListsController.Delete);

// ListCards
app.get('/lists/:id/cards', ListCardsController.Index);
app.post('/lists/:id/cards', ListCardsController.Create);
app.put('/lists/:id/cards/:cardId', ListCardsController.Update);
app.delete('/lists/:id/cards/:cardId', ListCardsController.Delete);

app.get(
  '/auth_redirect',
  passport.authenticate('google', { falureRedirect: '/auth/google' }),
  (req, res) => {
    res.redirect('/');
  }
);

export default app;
