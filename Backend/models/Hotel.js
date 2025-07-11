const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  roomsAvailable: { type: Number, default: 20 }
});

module.exports = mongoose.model('Hotel', HotelSchema);