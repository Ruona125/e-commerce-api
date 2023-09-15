const express = require("express")
const {createOrder, viewOrders, modifyOrder, deleteOrder, viewCertainOrder} = require("./order.controller")
const {adminAuth, authorize} = require("../../utils/requireAuth")

const orderRouter = express.Router();

orderRouter.post("/order", adminAuth, createOrder)
orderRouter.get("/order", authorize, adminAuth, viewOrders)
orderRouter.get("/order/:id",adminAuth, viewCertainOrder)
orderRouter.put("/order/:id", adminAuth, modifyOrder)
orderRouter.delete("/order/:id", adminAuth, deleteOrder)


module.exports = {
    orderRouter
}