const yup = require("yup");

const createProductSchema = yup.object({
    name: yup.string(),
    price: yup.number(),
    description: yup.description(),
    image: yup.string(),
    reviews: yup.array(),
    ratings: yup.number()
})

module.exports = {
    createProductSchema,
}