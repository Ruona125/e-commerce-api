const yup = require("yup");

const createProductSchema = yup.object({
    name: yup.string(),
    price: yup.number(),
    description: yup.string(),
    image: yup.string(),
    category: yup.string(),
    // reviews: yup.array(),
    ratings: yup.number()
})
 
module.exports = {
    createProductSchema,
}   