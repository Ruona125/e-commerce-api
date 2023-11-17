const express = require("express")
const {createProduct, getCertainProduct, getAllProducts, test, deleteCertainProduct, updateProduct, findAllGiftBoxes, findAllAccessories, upload} = require("./product.controller")
const {isAdmin, authorize, verifyCertainToken} = require("../../utils/requireAuth")
const {createProductSchema} = require("../../validations/productValidation")
const {validation} = require("../../utils/validationMiddleware")
const productRouter = express.Router()

productRouter.post(
    "/product",
    validation(createProductSchema),
    authorize,
    isAdmin,
    upload.array("images", 5), // "images" is the field name for the images, and 5 is the maximum number of files
    createProduct
  );
productRouter.get("/", test)
// productRouter.get("/product",authorize, isAdmin, getAllProducts)
// productRouter.get("/product/:id", authorize, verifyCertainToken, getCertainProduct)
productRouter.get("/product", getAllProducts)
productRouter.get("/giftboxes", findAllGiftBoxes )
productRouter.get("/accessories", findAllAccessories )
productRouter.get("/product/:id", getCertainProduct)
productRouter.delete("/product/:id", isAdmin, deleteCertainProduct)
productRouter.put("/product/:id", isAdmin, updateProduct)
    
module.exports = { 
    productRouter 
}
