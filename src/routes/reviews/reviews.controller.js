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

module.exports = {
  createReview,
};
