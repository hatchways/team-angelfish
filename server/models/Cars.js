const mongoose = require("mongoose");

const { Schema } = mongoose;

const carSchema = new Schema({
  name: {type: String, required: true,},
  total: {type: String,},
  imageUrl: {type: String,},
  rentOutDate: {type: Date},
  returnRentalDate: {type: Date},
  image: {type: String,},
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
