const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const {productRouter} = require("./routes/products/product.router")
const {userRouter}= require("./routes/users/user.router")
const {orderRouter} = require("./routes/orders/order.router")
const app = express();

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(productRouter)
app.use(userRouter)
app.use(orderRouter)

module.exports ={
    app,
}