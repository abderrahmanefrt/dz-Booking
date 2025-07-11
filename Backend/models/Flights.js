const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  departure: { 
    city: { type: String, required: true },
    date: { type: Date, required: true }
  },
  arrival: {
    city: { type: String, required: true },
    date: { type: Date, required: true }
  },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, default: 60 }
});

module.exports = mongoose.model('Flight', FlightSchema);