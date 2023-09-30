const { Cart } = require("../../models/cartModels");
const{mongoose} = require("mongoose");
const { Product } = require("../../models/productModels");


async function createCart(req, res) {
  try {
    const cart = await Cart.create(req.body);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.staus(500).json("error creating cart");
  }
}

async function viewCart(req, res) {
  try {
    const cart = await Cart.find({});
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
}

async function viewCertainUserCart(req, res) {
  try {
    const { userId } = req.params;

    // Find all carts that belong to the user based on userId
    const carts = await Cart.find({ userId });

    if (carts.length === 0) {
      return res.status(404).json({ message: "Carts not found" });
    }

    // Create an array to store cart details
    const cartDetails = [];

    for (const cart of carts) {
      const productIds = cart.products.map((product) => product.productId);

      const products = await Product.find({ _id: { $in: productIds } });

      // Combine the cart and product details
      const cartWithProductDetails = {
        userId: cart.userId,
        products: cart.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          productDetails: products.find((p) => p._id.equals(product.productId)),
        })),
      };

      cartDetails.push(cartWithProductDetails);
    }

    res.status(200).json(cartDetails);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
}





async function deleteCart(req, res) {
  try {
    const { id } = req.params;
    const deleteCart = await Cart.findByIdAndDelete(id);
    if (!deleteCart) {
      return res.status(404).json("cart not found");
    }
    return res.status(200).json("cart deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function modifyCart(req, res) {
  try {
    const { id } = req.params;
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedCart) {
      return res.status(404).json("Can't find cart");
    }

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
} 


module.exports = {
  createCart,
  viewCart,
  viewCertainUserCart,
  deleteCart,
  modifyCart
};
