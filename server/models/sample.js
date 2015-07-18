var mongoose = require('mongoose');

var SampleSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  category: { type: String, default: 'CAR' }
});

module.exports = mongoose.model('Sample', SampleSchema);
