const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    imageLink: { // Add imageLink property to the schema
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true
    }, 
    reviews: [{
      type: String,
      required: false,
    }],
    ratings: {
      type: Number,
      required: false,
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product
};
