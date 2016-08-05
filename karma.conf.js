var webpackCfg = require('./webpack.config');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['tests/**/*.js'],
    
  });
}
