const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  passengerName: String,
  seatCount: Number,
  totalPrice: Number,
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
