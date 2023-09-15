const express = require("express");
const {createCart, viewCart,viewCertainCart, deleteCart} = require("./cart.controller")
const {isAdmin, authorize} = require("../../utils/requireAuth")
const cartRouter = express.Router();

cartRouter.post("/cart", authorize, createCart);
cartRouter.get("/cart", authorize, viewCart)
cartRouter.get("/cart/:userId", authorize, viewCertainCart)
cartRouter.delete("/cart/:id", authorize, deleteCart)

module.exports = {
    cartRouter
}