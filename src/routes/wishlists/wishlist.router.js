const express = require("express");
const {createWishlist, viewCertainWishlist, viewWishlist, modifyWishlist, deleteWishlist, getWishlistWithUsers} = require("./wishlist.controller")
const {isAdmin, authorize, verifyCertainToken, verifyPostCertainToken, authorizeUser} = require("../../utils/requireAuth")
const {createWishlistSchema} = require("../../validations/wishlistValidation")
const {validation} = require("../../utils/validationMiddleware")

const wishlistRouter = express.Router();

wishlistRouter.post("/wishlist", validation(createWishlistSchema), authorize, verifyPostCertainToken, createWishlist);
wishlistRouter.get("/wishlist", authorize, isAdmin, viewWishlist)
wishlistRouter.get("/user/wishlist", authorize, isAdmin, getWishlistWithUsers)
wishlistRouter.get("/wishlist/:userId", authorize, verifyCertainToken, viewCertainWishlist)
wishlistRouter.put("/wishlist/:id", validation(createWishlistSchema), authorize, authorizeUser, modifyWishlist)//come back and fix this bug later
wishlistRouter.delete("/wishlist/:id", authorize, deleteWishlist)

module.exports = {
    wishlistRouter
}