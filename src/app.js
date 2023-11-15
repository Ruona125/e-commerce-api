const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const {productRouter} = require("./routes/products/product.router")
const {userRouter}= require("./routes/users/user.router")
const {orderRouter} = require("./routes/orders/order.router")
const {cartRouter} = require("./routes/cart/cart.router")
const { wishlistRouter } = require("./routes/wishlists/wishlist.router")
const {reviewRouter} = require("./routes/reviews/reviews.router")
const {stripePaymentRouter} = require("./routes/stripe/stripe.router")
const app = express();

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use(productRouter)
app.use(userRouter)
app.use(orderRouter)
app.use(cartRouter)
app.use(wishlistRouter)
app.use(stripePaymentRouter)
app.use(reviewRouter)

module.exports ={
    app,
}