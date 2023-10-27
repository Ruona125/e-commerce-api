const express = require("express")
const {stripePayment} = require("./stripe.controller")
const stripePaymentRouter = express.Router()

stripePaymentRouter.post("/payment", stripePayment)

module.exports={
    stripePaymentRouter
}