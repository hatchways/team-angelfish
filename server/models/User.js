const mongoose = require("mongoose");

const { Schema } = mongoose;

const customerSchema = new mongoose.Schema({
  stripeId: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pictureUrl: { type: String },
  customer: {
    type: customerSchema,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
