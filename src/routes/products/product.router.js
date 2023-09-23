const express = require("express")
const {createProduct, getCertainProduct, getAllProducts, test, deleteCertainProduct, updateProduct} = require("./product.controller")
const {isAdmin, authorize, verifyCertainToken} = require("../../utils/requireAuth")
const {createProductSchema} = require("../../validations/productValidation")
const {validation} = require("../../utils/validationMiddleware")
const productRouter = express.Router()

productRouter.post("/product", validation(createProductSchema), authorize, isAdmin, createProduct)
productRouter.get("/", test)
productRouter.get("/product",authorize, isAdmin, getAllProducts)
productRouter.get("/product/:id", authorize, verifyCertainToken, getCertainProduct)
productRouter.delete("/product/:id", isAdmin, deleteCertainProduct)
productRouter.put("/product/:id", isAdmin, updateProduct)

module.exports = {
    productRouter
}
