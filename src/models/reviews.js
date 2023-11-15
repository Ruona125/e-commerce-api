const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  reviews: { type: String, required: true },
});

const Reviews = mongoose.model("Reviews", ReviewSchema);

module.exports = {
  Reviews,
};
