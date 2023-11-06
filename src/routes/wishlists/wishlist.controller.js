const { Product } = require("../../models/productModels");
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

//this is for the users view the wishlist that belongs to them
async function viewCertainWishlist(req, res) {
  try {
    const { userId } = req.params; 

    const wishlists = await Wishlist.find({ userId });

    if (wishlists.length === 0) {
      return res.status(404).json({ message: "wishlist not found" });
    }
    const wishlistDetails = [];

    for (const wishlist of wishlists) {
      const productIds = wishlist.products.map((product) => product.productId);

      const products = await Product.find({ _id: { $in: productIds } });

      const wishlistWithProductDetails = {
        id: wishlist.id,
        userId: wishlist.userId,
        products: wishlist.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          productDetails: products.find((p) => p._id.equals(product.productId)),
        })),
      };
      wishlistDetails.push(wishlistWithProductDetails);
    }
    res.status(200).json(wishlistDetails)
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

async function modifyWishlist(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    //check if the user has the correct permission to modify the wishlist
    const withList = await Wishlist.findById(id)
    if(!withList){
      return res.status(404).json("can't find witshlist with this id")
    }

    if(withList.userId !== userId){
      return res.status(403).json("unauthorized: You can't see this")
    }
    const updatedWishlist = await Wishlist.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // if (!updatedWishlist) {
    //   return res.status(404).json("can't find wishlist");
    // }
    return res.status(200).json(updatedWishlist);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function getWishlistWithUsers(req, res) {
  try {
    const wishlistWithUsers = await Wishlist.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          // quantity: '$products.quantity',
          user: {
            _id: 1,
            username: 1,
            email: 1,
            isAdmin: 1,
            createdAt: 1,
          },
          productDetails: 1,
        },
      },
    ]);

    res.status(200).json(wishlistWithUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  createWishlist,
  viewCertainWishlist,
  viewWishlist,
  modifyWishlist,
  deleteWishlist,
  getWishlistWithUsers
};
