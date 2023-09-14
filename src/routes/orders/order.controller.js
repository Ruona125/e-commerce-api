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

async function viewCertainOrder(req, res) {
  try {
    const { id } = req.params;
    const certainOrder = await Order.findById(id);
    res.status(200).json(certainOrder);
  } catch (error) {
    console.log(error);
  }
}

async function modifyOrder(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body);
    if (!order) {
      return res.status(404).json("can't find order with this id");
    }
    const updatedOrder = await Order.findById(id);
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
    return res.status(200).json(order);
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
  viewCertainOrder
};
