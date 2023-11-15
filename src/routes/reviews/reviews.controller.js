const { Reviews } = require("../../models/reviews");

async function createReview(req, res) {
  try {
    const review = await Reviews.create(req.body);
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json("error creating review");
  }
}

async function viewReviews(req, res) {
  try {
    const { productId } = req.params;
    const reviews = await Reviews.find({productId});
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json("error");
  }
}

module.exports = {
  createReview,
  viewReviews,
};
