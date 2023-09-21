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

async function viewOrders(req, res) {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
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
    res.status(200).json(certainOrder)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message})
  }
}
async function modifyOrder(req, res) {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {new: true});
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

module.exports = {
  createOrder,
  viewOrders,
  modifyOrder,
  deleteOrder,
  viewCertainUserOrder,
  viewCertainOrder
};
