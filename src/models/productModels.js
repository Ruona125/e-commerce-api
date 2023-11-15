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
    images: [{
      type: String,
      required: false,
    }],
    imageLinks: [{  // Add a new property for image links
      type: String,
      required: false,
    }],
    category: {
      type: String, 
      required: true
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
