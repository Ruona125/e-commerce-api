const express = require("express");
const {
  createOrder,
  viewOrders,
  modifyOrder,
  deleteOrder,
  viewCertainUserOrder,
  viewCertainOrder,
} = require("./order.controller");
const {
  isAdmin,
  authorize,
  verifyCertainToken,
  verifyPostCertainToken,
} = require("../../utils/requireAuth");

const {validation} = require("../../utils/validationMiddleware")
const {createOrderSchema} = require("../../validations/orderValidation")

const orderRouter = express.Router();

orderRouter.post("/order", validation(createOrderSchema), authorize, verifyPostCertainToken, createOrder);
orderRouter.get("/orders", authorize, isAdmin, viewOrders);
orderRouter.get(
  "/find/:userId",
  authorize,
  verifyCertainToken,
  viewCertainUserOrder
);
orderRouter.get("/order/:id",authorize, isAdmin,  viewCertainOrder);
orderRouter.put("/order/:id", authorize, isAdmin, modifyOrder);
orderRouter.delete("/order/:id", authorize, isAdmin, deleteOrder);

module.exports = {
  orderRouter,
};
