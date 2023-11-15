const { Rating } = require("../../models/ratings");

async function createRating(req, res) {
  try {
    const ratings = await Rating.create(req.body);
    res.status(200).json(ratings);
  } catch (error) {
    console.log(error);
    res.stauts(500).json("error creating rating");
  }
}

//this is the normal one
// async function viewRatings(req, res){
//     try{
//         const ratings = await Rating.find({})
//         res.status(200).json(ratings);
//     }catch(error){
//         console.log(error);
//         res.status(500).json("error")
//     }
// }

//this is the one that'll return the average
// async function viewRatings(req, res) {
//   try {
//     const ratings = await Rating.aggregate([
//       {
//         $group: {
//           _id: "$productId",
//           averageRating: { $avg: "$ratings" },
//           allRatings: { $push: "$$ROOT" }, // This will include all rating documents in the result
//         },
//       },
//     ]);

//     res.status(200).json(ratings);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("error");
//   }
// }

async function viewRatings(req, res) {
  try {
    const { productId } = req.params;
    const ratings = await Rating.find({ productId });

    if (ratings.length === 0) {
      return res.status(404).json({ message: "No ratings found for the given product." });
    }

    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, rating) => sum + rating.ratings, 0);
    const averageRating = sumRatings / totalRatings;

    const result = {
      ratings,
      averageRating,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("error");
  }
}


module.exports = {
  createRating,
  viewRatings,
};
