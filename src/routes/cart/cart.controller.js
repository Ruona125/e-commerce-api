const { Cart } = require("../../models/cartModels");

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

async function viewCertainCart(req, res) {
  try {
    const { userId } = req.params;
    const certainCart = await Cart.findOne({ userId }); // Provide a query object here
    if (certainCart) {
      res.status(200).json(certainCart);
    } else {
      res.status(404).json({ message: 'Cart not found' }); // Handle the case when the cart is not found
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' }); // Handle other errors
  }
}


async function deleteCart(req, res) {
  try {
    const { id } = req.params;
    const deleteCart = await Cart.findByIdAndDelete(id);
    if (!deleteCart) {
      return res.status(404).json("cart not found");
    }
    return res.status(200).json(deleteCart);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCart,
  viewCart,
  viewCertainCart,
  deleteCart
};
