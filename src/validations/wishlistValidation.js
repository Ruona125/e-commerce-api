const yup = require("yup");

const createWishlistSchema = yup.object({
    userId: yup.string(),
    products: yup.array()
})

module.exports = {
    createWishlistSchema
}