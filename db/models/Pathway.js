const mongoose = require('mongoose');

const Pathway = new mongoose.Schema({
  name: { type: String },
  id: { type: String },
  color: { type: String },
  highlight: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Pathway', Pathway);