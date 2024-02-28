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
  phoneNumber: {
    type: Number, 
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }, 
  reset_token: {
    type: String,  
    default: null,
  },
  reset_token_expiration: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
