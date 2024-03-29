const express = require("express");
const {
  createOrder,
  viewOrders,
  modifyOrder,
  deleteOrder,
  viewCertainUserOrder,
  viewCertainOrder,
  getOrdersWithUsers,
  viewOnlyUserOrder
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
orderRouter.get("/user/order/:userId", viewOnlyUserOrder)
orderRouter.get("/user/order", authorize, isAdmin, getOrdersWithUsers)//this is to get the user, order details and the product the user ordered
orderRouter.get("/order/:id",authorize, isAdmin,  viewCertainOrder);
orderRouter.put("/order/:id", validation(createOrderSchema), authorize, isAdmin, modifyOrder);
orderRouter.delete("/order/:userId", authorize, verifyCertainToken, deleteOrder);
 
module.exports = { 
  orderRouter,
};
