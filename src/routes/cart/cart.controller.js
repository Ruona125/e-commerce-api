const { Cart } = require("../../models/cartModels");
const mongoose = require("mongoose");
const { Product } = require("../../models/productModels");
const jwt = require("jsonwebtoken");

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

    // Initialize variables to store cart details and total cart count
    const cartDetails = [];
    let totalCartCount = 0;

    for (const cart of carts) {
      const productIds = cart.products.map((product) => product.productId);

      const products = await Product.find({ _id: { $in: productIds } });

      // Combine the cart and product details
      const cartWithProductDetails = {
        id: cart.id,
        userId: cart.userId,
        products: cart.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          productDetails: products.find((p) => p._id.equals(product.productId)),
        })),
      };

      cartDetails.push(cartWithProductDetails);

      // Increment the total cart count
      totalCartCount += 1;
    }

    // Return the cart details along with the total cart count
    res.status(200).json({
      totalCarts: totalCartCount,
      cartDetails: cartDetails,
    });
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
    const { userId } = req.user;
    
    // Check if the user has the correct permissions to modify the cart
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json("Can't find cart");
    }

    if (cart.userId !== userId) {
      return res.status(403).json("Unauthorized: You can only modify your own cart");
    }

    // Update the cart based on the request body
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

const userCartCounts = {};

// Middleware to extract user ID from JWT token
function getUserIdFromToken(token) {
  const decodedToken = jwt.verify(token, "your-secret-key");
  console.log(decodedToken.userId)
  console.log("hello")
  return decodedToken.userId;
}

async function cartCount(req, res){
  try{
    
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const userId = getUserIdFromToken(req.headers.authorization);
    const cartCount = userCartCounts[userId] || 0;
  
    res.status(200).json({ count: cartCount });
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}



module.exports = {
  createCart,
  viewCart,
  viewCertainUserCart,
  deleteCart,
  modifyCart,
  cartCount
};
