const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const {productRouter} = require("./routes/products/product.router")
const {userRouter}= require("./routes/users/user.router")
const {orderRouter} = require("./routes/orders/order.router")
const {cartRouter} = require("./routes/cart/cart.router")
const { wishlistRouter } = require("./routes/wishlists/wishlist.router")
const {reviewRouter} = require("./routes/reviews/reviews.router")
const {ratingRouter} = require("./routes/ratings/ratings.router")
const {stripePaymentRouter} = require("./routes/stripe/stripe.router")
const app = express();

const corsOptions = {
    origin: 'https://www.admin.bucollections.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie
  };

app.use(express.json())
app.use(helmet())
app.use(cors(corsOptions));

app.use(productRouter)
app.use(userRouter)
app.use(orderRouter)
app.use(cartRouter)
app.use(wishlistRouter)
app.use(stripePaymentRouter)
app.use(reviewRouter)
app.use(ratingRouter)

module.exports ={
    app,
}