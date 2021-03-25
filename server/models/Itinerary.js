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
  car:[Cars],
  flight: [Flights],
  hotel: [Hotels]
  });
  

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;