const mongoose = require('mongoose');

const Course = new mongoose.Schema({
  number: { type: String },
  title: { type: String },
  description: { type: String },
  link: { type: String },
  type: { type: String },
  instructor: { type: String },
  selectedPathways: { type: Array },
});

module.exports = mongoose.model('Course', Course);
