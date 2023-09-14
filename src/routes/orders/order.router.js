const express = require("express")
const {createOrder, viewOrders, modifyOrder, deleteOrder, viewCertainOrder} = require("./order.controller")

const orderRouter = express.Router();

orderRouter.post("/order", createOrder)
orderRouter.get("/order", viewOrders)
orderRouter.get("/order/:id", viewCertainOrder)
orderRouter.put("/order/:id", modifyOrder)
orderRouter.delete("/order/:id", deleteOrder)


module.exports = {
    orderRouter
}