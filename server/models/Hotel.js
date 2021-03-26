const mongoose = require('mongoose');

const { Schema } = mongoose;


const hotelSchema = new Schema({
      name: { type: String, required: true,},
      numberOfOccupants: {type: Number, required: true},
      roomNumber: {type: String,},
      checkInDate: { type: Date,},
      checkOutDate: { type: Date, },
      image: {type: String},
      rating: {type: String},
      location: {type: String},
      reviews: {type: String},
      price: {type: String},
  });
  
  const Hotel = mongoose.model('Hotel', hotelSchema);
  
  module.exports = Hotel;
  