const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number
      }
    }, 
  ],
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = {
  Wishlist,
};
