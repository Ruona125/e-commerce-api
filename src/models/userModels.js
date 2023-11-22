// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // address: {
  //   street: String,
  //   city: String,
  //   state: String,
  //   postalCode: String,
  //   country: String,
  // },
  phoneNumber: {
    type: Number, 
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
