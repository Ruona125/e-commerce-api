const { User } = require("../../models/userModels");
const { Order } = require("../../models/orderModels");
const { Product } = require("../../models/productModels");

//this is to create order
async function createOrder(req, res) {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json("error creating orders");
  }
}

// async function viewOrders(req, res) {
//   try {
//     const orders = await Order.find({});
//     res.status(200).json(orders);
//   } catch (error) {
//     console.log(error);
//   }
// }

//this is for admin to view the order and the product details.
//it won't show the user details
async function viewOrders(req, res) {
  try {
    // Aggregate the data from the two collections
    const orders = await Order.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          products: 1,
          amount: 1,
          address: 1,
          status: 1,
          productDetails: 1,
        },
      },
    ]);

    // Return the orders
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json("error getting user");
  }
}

//this is for the user to view their order with the product details
async function viewCertainUserOrder(req, res) {
  try {
    const { userId } = req.params;
    const certainOrder = await Order.find({ userId });

    if(certainOrder.length === 0){
      return res.status(404).json({message: "order not found"})
    }

    const orderDetails = [];

    for (const order of certainOrder){
      const productIds = order.products.map((product) => product.productId)
      const products = await Product.find({ _id: { $in: productIds } });
      
      //conbine order and product details
      const orderWithProductDetails = {
        userId: order.userId,
        products: order.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          productDetails: products.find((p) => p._id.equals(product.productId)),
        })),
      }
      orderDetails.push(orderWithProductDetails)
    }
    res.status(200).json(orderDetails)
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
}

//this is to view certain order
async function viewCertainOrder(req, res) {
  try {
    const { id } = req.params;
    const certainOrder = await Order.findById(id);
    res.status(200).json(certainOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//this is to modify the order
async function modifyOrder(req, res) {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json("can't find order with this id");
    }
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

//this is to delete the order of the user
async function deleteOrder(req, res) {
  try {
    const { userId } = req.params;

    // Find and delete orders that match the userId
    const result = await Order.deleteMany({ userId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Orders deleted successfully" });
    } else {
      res.status(404).json({ message: "No orders found for the specified userId" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } 
}

//this is for admin to get the user, order details and the product the user ordered
async function getOrdersWithUsers(req, res) {
  try {
    const ordersWithUsers = await Order.aggregate([
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Deconstruct the user array created by $lookup
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },

      {
        $project: {
          _id: 1,
          products: 1,
          amount: 1,
          address: 1,
          status: 1,
          "user.username": 1, // Include the username from the user document
          "user.email": 1, // Include the email from the user document
          productDetails: 1,
        },
      },
    ]);
    // console.log(ordersWithUsers);
    res.status(200).json(ordersWithUsers);
  } catch (error) {
    throw error;
  }
}

// async function getOrdersWithUsers(req, res) {
//   try {
//     const orders = await Order.find({});
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error:", error); // Log the error for debugging
//     res.status(500).json("error getting data");
//   }
// }

// Example usage:
// getOrdersWithUsers()
//   .then((result) => {
//     console.log("Orders with user details:", result);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

module.exports = {
  createOrder,
  viewOrders,
  modifyOrder,
  deleteOrder,
  viewCertainUserOrder,
  viewCertainOrder,
  getOrdersWithUsers,
};
