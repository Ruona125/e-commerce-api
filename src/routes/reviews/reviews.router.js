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
reviewRouter.get("/review", authorize, viewReviews)

module.exports = {
    reviewRouter
}