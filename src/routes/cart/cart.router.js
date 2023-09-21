const express = require("express");
const {createCart, viewCart,viewCertainUserCart, deleteCart, modifyCart} = require("./cart.controller")
const {isAdmin, authorize, verifyCertainToken, verifyPostCertainToken} = require("../../utils/requireAuth")
const cartRouter = express.Router();

cartRouter.post("/cart", authorize, verifyPostCertainToken, createCart);
cartRouter.get("/cart", authorize, isAdmin, viewCart)
cartRouter.get("/cart/:userId", authorize, verifyCertainToken, viewCertainUserCart)
cartRouter.put("/cart/:id", authorize, modifyCart)//come back to fix this bug later
cartRouter.delete("/cart/:id", authorize, deleteCart)
 
module.exports = {
    cartRouter
}