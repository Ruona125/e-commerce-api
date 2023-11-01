const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
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
    status: { type: String, default: "pending" },
    totalAmount: {type: Number}
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
    Order
}
