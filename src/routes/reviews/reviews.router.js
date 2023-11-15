const express = require("express");

const { createReview, viewReviews } = require("./reviews.controller");

const {
  isAdmin,
  authorize,
  verifyCertainToken,
  verifyPostCertainToken,
} = require("../../utils/requireAuth");

const reviewRouter = express.Router();

reviewRouter.post("/review", authorize, verifyPostCertainToken, createReview)
reviewRouter.get("/review/:productId", authorize, viewReviews)

module.exports = {
    reviewRouter
}