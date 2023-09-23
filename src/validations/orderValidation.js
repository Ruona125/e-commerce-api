const yup = require("yup");

const createOrderSchema = yup.object({
    userId: yup.string(),
    products: yup.array(),
    amount: yup.number(),
    address: yup.object(),
    status: yup.string()
})

module.exports = {
    createOrderSchema
}