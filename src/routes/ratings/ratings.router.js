const express = require("express");

const {createRating, viewRatings} = require("./ratings.controller")

const {
    isAdmin,
  authorize,
  verifyCertainToken,
  verifyPostCertainToken,
} = require("../../utils/requireAuth")

const ratingRouter = express.Router();

ratingRouter.post("/rating", authorize, verifyPostCertainToken, createRating)
ratingRouter.get("/rating/:productId", authorize, viewRatings);

module.exports = {
    ratingRouter
}