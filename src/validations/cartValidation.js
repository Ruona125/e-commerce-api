const yup = require("yup");

const createCartSchema = yup.object({
    userId: yup.string(),
    products: yup.array()
})

module.exports = {
    createCartSchema
}