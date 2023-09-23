const { Wishlist } = require("../../models/wishlistModels");

async function createWishlist(req, res) {
  try {
    const wishlist = await Wishlist.create(req.body);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json("error creating wishlist");
  }
}

async function viewWishlist(req, res) {
  try {
    const wishlist = await Wishlist.find({});
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json("error creating wishlist");
  }
}

async function viewCertainWishlist(req, res) {
  try {
    const { userId } = req.params;
    const certainWishlist = await Wishlist.findOne({ userId });
    if (certainWishlist) {
      res.status(200).json(certainWishlist);
    } else {
      res.status(404).json({ message: "Wishlist not found" });
    }
  } catch (error) {
    res.status(400).json("wishlist not found");
  }
}

async function deleteWishlist(req, res) {
  try {
    const { id } = req.params;
    const deleteWishlist = await Wishlist.findByIdAndDelete(id);
    if (!deleteWishlist) {
      return res.status(404).json("wishlist not found");
    }
    return res.status(200).json("wishlist deleted");
  } catch (error) {
    return res.status(500).json("error deleting wishlist");
  }
}

async function modifyWishlist(req, res){
    try{
        const {id} = req.params;
        const updatedWishlist = await Wishlist.findByIdAndUpdate(id, req.body, {new: true}) 

        if(!updatedWishlist){
            return res.status(404).json("can't find wishlist")
        }
        return res.status(200).json(updatedWishlist)
    }catch(error){
        res.status(400).json("error modifying wishlist")
    }
}

module.exports ={
    createWishlist, 
    viewCertainWishlist,
    viewWishlist,
    modifyWishlist,
    deleteWishlist
}