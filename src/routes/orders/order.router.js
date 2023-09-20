const express = require("express")
const {createOrder, viewOrders, modifyOrder, deleteOrder, viewCertainOrder} = require("./order.controller")
const {isAdmin, authorize, verifyCertainToken, verifyPostCertainToken} = require("../../utils/requireAuth")

const orderRouter = express.Router();

orderRouter.post("/order", authorize, verifyPostCertainToken, createOrder)
orderRouter.get("/order", authorize, isAdmin, viewOrders)
orderRouter.get("/order/:userId", authorize, verifyCertainToken, viewCertainOrder)
orderRouter.put("/order/:id", authorize, isAdmin, modifyOrder)
orderRouter.delete("/order/:id",authorize, isAdmin, deleteOrder)


module.exports = {
    orderRouter
}