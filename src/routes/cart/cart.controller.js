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

//this is the one that returns an array
// async function viewCertainUserCart(req, res) {
//   try {
//     const { userId } = req.params;
//     const certainCart = await Cart.find({ userId });

//     if (certainCart.length === 0) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const cartDetails = [];

//     for (const cart of certainCart) {
//       const productIds = cart.products.map((product) => product.productId);
//       const products = await Product.find({ _id: { $in: productIds } });

//       let mainTotal = 0;

//       const cartWithProductDetails = {
//         userId: cart.userId,
//         totalProducts: cart.products.length, // Total number of products in the cart
//         products: cart.products.map((product) => {
//           const productDetails = products.find((p) =>
//             p._id.equals(product.productId)
//           );
//           const subTotal = productDetails.price * product.quantity;
//           mainTotal += subTotal;
//           return {
//             productId: product.productId,
//             quantity: product.quantity,
//             productDetails: productDetails,
//             subTotal: subTotal,
//           };
//         }),
//         mainTotal: mainTotal,
//       };
//       cartDetails.push(cartWithProductDetails);
//     }

//     res.status(200).json(cartDetails);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

async function viewCertainUserCart(req, res) {
  try {
    const { userId } = req.params;

    // Find all carts that belong to the user based on userId
    const carts = await Cart.find({ userId });

    // if (carts.length === 0) {
    //   return res.status(404).json({ message: "Carts not found" });
    // }

    // Initialize an array to store cart details
    const cartDetails = [];

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
    }

    // Calculate the total cart count
    const totalCartCount = cartDetails.length;

    // Return the response as an array including totalCartCount
    const response = [
      {
        totalCarts: totalCartCount,
        cartDetails: cartDetails,
      },
    ];

    res.status(200).json(response);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
}

//this is the one that returns an object
// async function viewCertainUserCart(req, res) {
//   try {
//     const { userId } = req.params;

//     // Find all carts that belong to the user based on userId
//     const carts = await Cart.find({ userId });

//     if (carts.length === 0) {
//       return res.status(404).json({ message: "Carts not found" });
//     }

//     // Initialize an array to store cart details
//     const cartDetails = [];

//     for (const cart of carts) {
//       const productIds = cart.products.map((product) => product.productId);

//       const products = await Product.find({ _id: { $in: productIds } });

//       // Combine the cart and product details
//       const cartWithProductDetails = {
//         id: cart.id,
//         userId: cart.userId,
//         products: cart.products.map((product) => ({
//           productId: product.productId,
//           quantity: product.quantity,
//           productDetails: products.find((p) => p._id.equals(product.productId)),
//         })),
//       };

//       cartDetails.push(cartWithProductDetails);
//     }

//     // Calculate the total cart count
//     const totalCartCount = cartDetails.length;

//     // Return the cart details as an array along with totalCartCount
//     const response = {
//       totalCarts: totalCartCount,
//       cartDetails: cartDetails,
//     };

//     res.status(200).json(response);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

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
      return res
        .status(403)
        .json("Unauthorized: You can only modify your own cart");
    }

    // Update the cart based on the request body
    const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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
  console.log(decodedToken.userId);
  console.log("hello");
  return decodedToken.userId;
}

async function cartCount(req, res) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = getUserIdFromToken(req.headers.authorization);
    const cartCount = userCartCounts[userId] || 0;

    res.status(200).json({ count: cartCount });
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
  modifyCart,
  cartCount,
};
