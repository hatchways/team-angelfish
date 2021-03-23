const mongoose = require('mongoose');
const { Schema } = mongoose;
const Cars = require("./Cars")
const Flights = require("./Flights")
const Hotels = require("./Hotel")
const User = require("./User")

const itinerarySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Cars,
    required: false,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Flights,
    required: false,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Hotels,
    required: false,
  },
  });
  

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;