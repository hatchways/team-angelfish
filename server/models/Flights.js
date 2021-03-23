const mongoose = require("mongoose");

const { Schema } = mongoose;

const flightsSchema = new Schema({
  departureDate: { type: Date, required: true },
  // In case its not a round-trip
  returnDate: { type: Date },
  departureLocation: { type: String, required: true },
  destinationLocation: { type: String, required: true },
  carrier: { type: String, require: true },
  price: { type: Number, required: true },
});

const Flights = mongoose.model("Flights", flightsSchema);

module.exports = Flights;
