const express = require("express");
const {createWishlist, viewCertainWishlist, viewWishlist, modifyWishlist, deleteWishlist} = require("./wishlist.controller")
const {isAdmin, authorize, verifyCertainToken, verifyPostCertainToken} = require("../../utils/requireAuth")
const {createWishlistSchema} = require("../../validations/wishlistValidation")
const {validation} = require("../../utils/validationMiddleware")

const wishlistRouter = express.Router();

wishlistRouter.post("/wishlist", validation(createWishlistSchema), authorize, verifyPostCertainToken, createWishlist);
wishlistRouter.get("/wishlist", authorize, isAdmin, viewWishlist)
wishlistRouter.get("/wishlist/:userId", authorize, verifyCertainToken, viewCertainWishlist)
wishlistRouter.put("/wishlist/:id", validation(createWishlistSchema), authorize, modifyWishlist)//come back to fix this bug later
wishlistRouter.delete("/wishlist/:id", authorize, deleteWishlist)

module.exports = {
    wishlistRouter
}