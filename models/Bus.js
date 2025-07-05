const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  name: String,
  from: String,
  to: String,
  date: String,
  time: String,
  seats: Number,
  price: Number
});

module.exports = mongoose.model('Bus', busSchema);
