const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const factory = require("../factory/factory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Product = require("../models/product.model");
/*-----------------------------------------------------------------*/
// Upload single image
const uploadProductImage = uploadSingleImage("image");
/*-----------------------------------------------------------------*/
// Image processing
const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(500, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }

  next();
});
/*-----------------------------------------------------------------*/
// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
const getProducts = factory.getAll(Product, "Products");
/*-----------------------------------------------------------------*/
// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
const getProduct = factory.getOne(Product, "reviews");
/*-----------------------------------------------------------------*/
// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
const createProduct = factory.createOne(Product);
/*-----------------------------------------------------------------*/
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
const updateProduct = factory.updateOne(Product);
/*-----------------------------------------------------------------*/
// @desc    Delete specific product
// @route   DELETE /api/v1/product/:id
// @access  Private
const deleteProduct = factory.deleteOne(Product);
/*-----------------------------------------------------------------*/
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  resizeImage,
};
/*-----------------------------------------------------------------*/
