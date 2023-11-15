const {Rating} = require("../../models/ratings");

async function createRating(req, res){
    try{
        const ratings = await Rating.create(req.body);
        res.status(200).json(ratings)
    }catch(error){
        console.log(error);
        res.stauts(500).json("error creating rating")
    }
}

async function viewRatings(req, res){
    try{
        const ratings = await Rating.find({})
        res.status(200).json(ratings);
    }catch(error){
        console.log(error);
        res.status(500).json("error")
    }
}

module.exports = {
    createRating, 
    viewRatings
}