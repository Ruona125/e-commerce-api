const express = require("express");
const {createCart, viewCart,viewCertainUserCart, deleteCart, modifyCart, cartCount} = require("./cart.controller")
const {isAdmin, authorize, verifyCertainToken, verifyPostCertainToken,authorizeUser} = require("../../utils/requireAuth")
const {createCartSchema} = require("../../validations/cartValidation")
const {validation} = require("../../utils/validationMiddleware")
const cartRouter = express.Router();

cartRouter.post("/cart", validation(createCartSchema), authorize, verifyPostCertainToken, createCart);
cartRouter.get("/cart", authorize, isAdmin, viewCart)
cartRouter.get("/cart/:userId", authorize, verifyCertainToken, viewCertainUserCart)
cartRouter.get("/cart/count", cartCount)
cartRouter.put("/cart/:id", authorize, authorizeUser, modifyCart)//come back and fix this bug later
cartRouter.delete("/cart/:id", authorize, authorizeUser, deleteCart)

module.exports = {
    cartRouter
}