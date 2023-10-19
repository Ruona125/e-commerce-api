const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }, 
  ],
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = {
  Wishlist,
};
