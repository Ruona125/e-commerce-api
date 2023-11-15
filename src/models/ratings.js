const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  ratings: { type: Number, required: true },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = {
  Rating,
};
