const { Product } = require("../../models/productModels");
const mongoose = require("mongoose");
const multer = require("multer");
const crypto = require("crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const {getObjectSignedUrl} = require("../../utils/s3-setup")
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
  const buffer = req.file.buffer;

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: randomImageName(),
    Body: buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  await s3.send(command);

  const { name, price, description, category, reviews, ratings } = req.body;
  try {
    // const product = await Product.create(req.body);
    const product = await Product.create({
      name,
      price,
      category,
      reviews,
      ratings,
      description,
      image: params.Key,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json("error creating users");
  }
}

function test(req, res) {
  res.status(200).json("test");
  console.log(test);
}

async function getCertainProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function getAllProducts(req, res) { 
  try {
    const products = await Product.find({});

    for (let product of products) {
      console.log("Product Image:", product.image); // Log the image for debugging
      const imageLink = await getObjectSignedUrl(product.image);
      console.log("Image Link:", imageLink); // Log the image link for debugging
      product.imageLink = imageLink;
    } 

    // Set the Content-Type header to indicate JSON data
    res.setHeader('Content-Type', 'application/json');

    // Send the JSON response with a 200 status code
    res.status(200).send(JSON.stringify(products));
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}






async function deleteCertainProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json("can't find product with this particular id");
    }
    return res.status(200).json("order deleted");
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
