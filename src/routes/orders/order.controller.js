const moment = require("moment");
const { User } = require("../../models/userModels");
const { Order } = require("../../models/orderModels");
const { Product } = require("../../models/productModels");
const { Cart } = require("../../models/cartModels");

//this is to create order and clear the carts
// async function createOrder(req, res) {
//   try {
//     const order = await Order.create(req.body);

//     // Get the userId from the created order
//     const userId = order.userId;

//     // Remove all carts associated with the user's userId
//     await Cart.deleteMany({ userId: userId });

//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("Error creating orders");
//   }
// }

//this is to create order
async function createOrder(req, res) {
  try {
    // Create a new order with the request body
    const order = await Order.create(req.body);

    // Add 7 days to the current time and set it as the delivery date
    const deliveryDate = moment().add(7, 'days');

    // Format the delivery date as per your requirements (adjust the format string)
    const formattedDeliveryDate = deliveryDate.format('YYYY-MM-DD HH:mm:ss');

    // Set the formatted delivery date in the order's delivery field
    order.delivery = formattedDeliveryDate;

    // Save the order with the formatted delivery date
    await order.save();

    // Delete items from the user's cart after creating the order
    const userId = order.userId;
    await Cart.deleteMany({ userId: userId });

    // Respond with the created order
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating orders" });
  }
}

//this is the controller to create order with totalAmount
// async function createOrder(req, res) {
//   try {
//     const orderData = req.body;
//     // Calculate the total amount by iterating over the products array
//     const totalAmount = orderData.products.reduce((total, product) => {
//       // Calculate the product's total price by multiplying quantity and price
//       const productTotal = product.quantity * product.price;
//       return total + productTotal;
//     }, 0); // Start with an initial total of 0

//     // Set the calculated totalAmount in the orderData
//     orderData.totalAmount = totalAmount;

//     // Create the order with the updated orderData
//     const order = await Order.create(orderData);

//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("error creating orders");
//   }
// }

async function viewOrders(req, res) {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
}

//this is for admin to view the order and the product details.
//it won't show the user details
// async function viewOrders(req, res) {
//   try {
//     // Aggregate the data from the two collections
//     const orders = await Order.aggregate([
//       {
//         $match: {},
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "products.productId",
//           foreignField: "_id",
//           as: "productDetails",
//         },
//       },
//       {
//         $unwind: "$productDetails",
//       },
//       {
//         $project: {
//           _id: 1,
//           userId: 1,
//           products: 1,
//           amount: 1,
//           address: 1,
//           status: 1,
//           productDetails: 1,
//         },
//       },
//     ]);

//     // Return the orders
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json("error getting user");
//   }
// }

//this is for the user to view their order with the product details

async function viewCertainUserOrder(req, res) {
  try {
    const { userId } = req.params;
    const certainOrder = await Order.find({ userId });

    if (certainOrder.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const orderDetails = [];

    for (const order of certainOrder) {
      const productIds = order.products.map((product) => product.productId);
      const products = await Product.find({ _id: { $in: productIds } });

      // Initialize mainTotal to 0 for this order
      let mainTotal = 0;

      // Combine order and product details
      const orderWithProductDetails = {
        userId: order.userId,
        status: order.status, // Include status in the response
        delivery: order.delivery,
        products: order.products.map((product) => {
          const productDetails = products.find((p) =>
            p._id.equals(product.productId)
          );
          const subTotal = productDetails.price * product.quantity;
          mainTotal += subTotal; // Add the subTotal to mainTotal
          return {
            productId: product.productId,
            quantity: product.quantity,
            productDetails: productDetails,
            // time: productDetails.createdAt
            // subTotal: subTotal,
          };
        }),
        mainTotal: mainTotal, // Include mainTotal in the response
      };
      orderDetails.push(orderWithProductDetails);
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function viewOnlyUserOrder(req, res) {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ userId: userId });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the user." });
    }

    // Populate product details for each product in all orders
    const populatedOrders = await Order.populate(orders, {
      path: "products.productId",
      model: "Product", // The name of the Product model
    });

    // Calculate the totalAmount by iterating over all orders
    const totalAmount = populatedOrders.reduce((total, order) => {
      return total + order.totalAmount;
    }, 0);

    // Extract userId and status from the first order
    const {
      userId: firstUserId,
      status: firstStatus,
      _id: _id,
    } = populatedOrders[0];

    // Extract product details (name, price, description) from the populated orders
    const productsWithDetails = populatedOrders.reduce((acc, order) => {
      order.products.forEach((product) => {
        const { name, price, description, category, image } = product.productId;
        acc.push({
          productId: product.productId,
          name,
          price,
          description,
          image,
          category,
          quantity: product.quantity,
          price: product.price,
        });
      });
      return acc;
    }, []);

    res.json({
      _id: _id,
      userId: firstUserId,
      status: firstStatus,
      totalAmount: totalAmount,
      products: productsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
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
      res
        .status(404)
        .json({ message: "No orders found for the specified userId" });
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
          userId: 1,
          quantity: { $arrayElemAt: ["$products.quantity", 0] }, // Extract the quantity of the first product
          address: 1,
          status: 1,
          user: {
            _id: 1,
            username: 1,
            email: 1,
            isAdmin: 1,
            createdAt: 1,
            __v: 1,
          },
          productDetails: 1, // Include the entire product details object
        },
      },
    ]);

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
  viewOnlyUserOrder,
};
