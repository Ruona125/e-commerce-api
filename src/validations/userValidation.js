const yup = require("yup");

const createUserSchema = yup.object({
    username: yup.string(),
    email: yup.string().email(),
    isAdmin: yup.boolean(),
})

module.exports = {
    createUserSchema
}