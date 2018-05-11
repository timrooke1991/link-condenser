const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alias: { type: String, unique: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Url', urlSchema);
