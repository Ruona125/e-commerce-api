const express = require("express")
const {createProduct, getCertainProduct, getAllProducts, test, deleteCertainProduct, updateProduct} = require("./product.controller")


const productRouter = express.Router()

productRouter.post("/product", createProduct)
productRouter.get("/", test)
productRouter.get("/product", getAllProducts)
productRouter.get("/product/:id", getCertainProduct)
productRouter.delete("/product/:id", deleteCertainProduct)
productRouter.put("/product/:id", updateProduct)

module.exports = {
    productRouter
}
