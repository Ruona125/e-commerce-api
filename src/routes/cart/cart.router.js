const express = require("express");
const {createCart, viewCart,viewCertainCart, deleteCart, modifyCart} = require("./cart.controller")
const {isAdmin, authorize, verifyCertainToken, verifyPostCertainToken} = require("../../utils/requireAuth")
const cartRouter = express.Router();

cartRouter.post("/cart", authorize, verifyPostCertainToken, createCart);
cartRouter.get("/cart", authorize, isAdmin, viewCart)
cartRouter.get("/cart/:userId", authorize, verifyCertainToken, viewCertainCart)
cartRouter.put("/cart/:id",  modifyCart)//come back to fix this bug later
cartRouter.delete("/cart/:id", authorize, isAdmin, deleteCart)
 
module.exports = {
    cartRouter
}