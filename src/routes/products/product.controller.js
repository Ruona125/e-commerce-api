const { Product } = require("../../models/productModels");
const multer = require("multer");
const crypto = require("crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getObjectSignedUrl } = require("../../utils/s3-setup");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_REGION,
});

async function createProduct(req, res) {
  try {
    const files = req.files;

    const imageKeys = await Promise.all(
      files.map(async (file) => {
        const buffer = file.buffer;
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: randomImageName(),
          Body: buffer,
          ContentType: file.mimetype,
        };
        const command = new PutObjectCommand(params);
        await s3.send(command);
        return params.Key;
      })
    );

    const { name, price, description, category, reviews, ratings } = req.body;

    const product = await Product.create({
      name,
      price,
      category, 
      reviews,
      ratings,
      description,
      images: imageKeys,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error creating product");
  }  
}

function test(req, res) {
  res.status(200).json("test");
  console.log(test);
}

async function getCertainProduct(req, res) {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

    // Create an array of promises for fetching image links and updating products
    const updatePromises = products.map(async (product) => {
      try {
        if (product.images && product.images.length > 0) {
          // Assuming getObjectSignedUrl is a function that works correctly
          const imageLinks = await Promise.all(
            product.images.map(async (image) => await getObjectSignedUrl(image))
          );
          product.imageLinks = imageLinks;
        } else {
          console.warn("Product has no images:", product._id);
        }

        // Save the updated product and return the result
        return product.save();
      } catch (error) {
        console.error("Error fetching imageLinks:", error);
        // Return the original product if an error occurs
        return product;
      }
    });

    // Wait for all promises to resolve
    const updatedProducts = await Promise.all(updatePromises);

    // Set the Content-Type header to indicate JSON data
    res.setHeader("Content-Type", "application/json");

    // Send the JSON response with the updated products
    res.json(updatedProducts);
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}





async function deleteCertainProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json("can't find product with this particular id");
    }
    return res.status(200).json("product deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
} 

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json("can't find product with this id");
    }
    const updatedProduct = await Product.findById(id);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createProduct,
  getCertainProduct,
  getAllProducts,
  test,
  deleteCertainProduct,
  updateProduct,
  upload,
};
