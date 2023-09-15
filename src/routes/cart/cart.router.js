const express = require("express");
const {createCart, viewCart,viewCertainCart, deleteCart} = require("./cart.controller")

const cartRouter = express.Router();

cartRouter.post("/cart", createCart);
cartRouter.get("/cart", viewCart)
cartRouter.get("/cart/:userId", viewCertainCart)
cartRouter.delete("/cart/:id", deleteCart)

module.exports = {
    cartRouter
}