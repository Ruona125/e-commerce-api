const { User } = require("../../models/userModels");
const { Order } = require("../../models/orderModels");

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

async function viewCertainUserOrder(req, res) {
  try {
    const { userId } = req.params;
    const certainOrder = await Order.findOne({ userId });

    if (certainOrder) {
      return res.status(200).json(certainOrder);
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
}

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

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json("can't find product with this particular id");
    }
    return res.status(200).json("order deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

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
        $project: {
          _id: 1,
          products: 1,
          amount: 1,
          address: 1,
          status: 1,
          "user.username": 1, // Include the username from the user document
          "user.email": 1, // Include the email from the user document
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
