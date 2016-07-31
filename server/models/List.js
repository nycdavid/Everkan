const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  name: String,
  cards: [],
});

module.exports = mongoose.model('List', listSchema);
