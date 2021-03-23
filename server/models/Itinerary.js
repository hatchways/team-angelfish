const mongoose = require('mongoose');

const { Schema } = mongoose;

const itinerarySchema = new Schema({
    airline: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    gate: {type: String, required: true},
    departureTime: {type: Date, required: true},
    passenger:[{
        ticketNumber:{type: String},
        name:{type: String, required: true},
        seat: {type: String, required: true}
    }]
  });
  

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;