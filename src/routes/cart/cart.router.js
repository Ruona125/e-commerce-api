const express = require("express");
const {createCart, viewCart,viewCertainUserCart, deleteCart, modifyCart} = require("./cart.controller")
const {isAdmin, authorize, verifyCertainToken, verifyPostCertainToken} = require("../../utils/requireAuth")
const {createCartSchema} = require("../../validations/cartValidation")
const {validation} = require("../../utils/validationMiddleware")
const cartRouter = express.Router();

cartRouter.post("/cart", validation(createCartSchema), authorize, verifyPostCertainToken, createCart);
cartRouter.get("/cart", authorize, isAdmin, viewCart)
cartRouter.get("/cart/:userId", authorize, verifyCertainToken, viewCertainUserCart)
cartRouter.put("/cart/:id", validation(createCartSchema), authorize, modifyCart)//come back to fix this bug later
cartRouter.delete("/cart/:id", authorize, deleteCart)
 
module.exports = {
    cartRouter
}