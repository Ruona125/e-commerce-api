const express = require("express")
const {createOrder, viewOrders, modifyOrder, deleteOrder, viewCertainOrder} = require("./order.controller")
const {isAdmin, authorize} = require("../../utils/requireAuth")

const orderRouter = express.Router();

orderRouter.post("/order", isAdmin, createOrder)
orderRouter.get("/order", authorize, isAdmin, viewOrders)
orderRouter.get("/order/:id",isAdmin, viewCertainOrder)
orderRouter.put("/order/:id", isAdmin, modifyOrder)
orderRouter.delete("/order/:id", isAdmin, deleteOrder)


module.exports = {
    orderRouter
}